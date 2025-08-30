"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

interface ConfirmPaymentInput {
  paymentId?: string;
  contractId: string;
  weekNumber: number;
  month: number;
  year: number;
}

export async function confirmPayment(input: ConfirmPaymentInput) {
  try {
    const { paymentId, contractId, weekNumber, month, year } = input;

    // 1) Chercher un paiement existant soit par id, soit par clé composite
    let existingPayment = null;

    if (paymentId) {
      existingPayment = await prisma.payment.findUnique({
        where: { id: paymentId },
      });
    }

    if (!existingPayment) {
      existingPayment = await prisma.payment.findFirst({
        where: { contractId, weekNumber, month, year },
      });
    }

    // 2) Mettre à jour si trouvé
    if (existingPayment) {
      const updatedPayment = await prisma.payment.update({
        where: { id: existingPayment.id },
        data: { status: "paid", paidAt: new Date() },
      });

      revalidatePath("/admin/paiements");
      return { success: true, payment: updatedPayment };
    }

    // 3) Sinon, créer
    const newPayment = await prisma.payment.create({
      data: {
        contractId,
        weekNumber,
        month,
        year,
        status: "paid",
        paidAt: new Date(),
      },
    });

    revalidatePath("/admin/paiements");
    return { success: true, payment: newPayment };
  } catch (error) {
    console.error("Erreur lors du marquage du paiement comme payé:", error);
    return {
      success: false,
      error: "Erreur lors de la mise à jour du paiement",
    };
  }
}

export async function cancelPayment(paymentId: string) {
  try {
    const updatedPayment = await prisma.payment.update({
      where: {
        id: paymentId,
      },
      data: {
        status: "pending",
        paidAt: null,
      },
    });

    // Revalider le cache pour la page des paiements
    revalidatePath("/admin/paiements");

    return { success: true, payment: updatedPayment };
  } catch (error) {
    console.error(
      "Erreur lors du marquage du paiement comme en attente:",
      error
    );
    return {
      success: false,
      error: "Erreur lors de la mise à jour du paiement",
    };
  }
}
