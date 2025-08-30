"use server";

import { prisma } from "@/lib/prisma";
import { getUserFriendlyError } from "@/lib/errors";
import { revalidatePath } from "next/cache";
import { calculatePaymentAmount } from "@/lib/seed-payments";

export interface CreateClientWithContractInput {
  // Client
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: Date;
  address?: string | null;
  city?: string | null;
  zipCode?: string | null;
  country?: string | null;
  // Contract
  investedAmount: number;
  yieldRate: number;
  amountAlreadyPaid: number;
  frequency: "weekly" | "monthly";
  contractStartDate: Date;
}

export async function createClientWithContract(
  data: CreateClientWithContractInput
) {
  try {
    await prisma.client.create({
      data: {
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        email: data.email.trim().toLowerCase(),
        phone: data.phone.trim(),
        birthDate: data.birthDate,
        address: data.address ?? null,
        city: data.city ?? null,
        zipCode: data.zipCode ?? null,
        country: data.country ?? null,
        contract: {
          create: {
            investedAmount: data.investedAmount,
            yieldRate: data.yieldRate,
            amountToPay: calculatePaymentAmount(
              data.investedAmount,
              data.yieldRate,
              data.frequency
            ),
            amountAlreadyPaid: data.amountAlreadyPaid || 0,
            frequency: data.frequency,
            createdAt: data.contractStartDate,
          },
        },
      },
    });

    revalidatePath("/admin/clients");
    revalidatePath("/admin/contracts");

    return { success: true };
  } catch (error) {
    return { success: false, error: getUserFriendlyError(error) };
  }
}

export interface UpdateClientInput {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: Date;
  address?: string | null;
  city?: string | null;
  zipCode?: string | null;
  country?: string | null;
  // Contract fields (edit main/latest contract)
  investedAmount: number;
  yieldRate: number; // percentage (e.g., 10 for 10%)
  frequency: "weekly" | "monthly";
  contractStartDate: Date;
}

export async function updateClient(data: UpdateClientInput) {
  try {
    const updated = await prisma.client.update({
      where: { id: data.id },
      data: {
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        email: data.email.trim().toLowerCase(),
        phone: data.phone.trim(),
        birthDate: data.birthDate,
        address: data.address ?? null,
        city: data.city ?? null,
        zipCode: data.zipCode ?? null,
        country: data.country ?? null,
      },
    });

    // Update latest (main) contract if exists; otherwise create one
    const latest = await prisma.contract.findFirst({
      where: { clientId: data.id },
      orderBy: { createdAt: "desc" },
    });

    const amountToPay = calculatePaymentAmount(
      data.investedAmount,
      data.yieldRate,
      data.frequency
    );

    if (latest) {
      await prisma.contract.update({
        where: { id: latest.id },
        data: {
          investedAmount: data.investedAmount,
          yieldRate: data.yieldRate,
          amountToPay,
          frequency: data.frequency,
          createdAt: data.contractStartDate,
        },
      });
    } else {
      await prisma.contract.create({
        data: {
          clientId: data.id,
          investedAmount: data.investedAmount,
          yieldRate: data.yieldRate,
          amountToPay,
          amountAlreadyPaid: 0,
          frequency: data.frequency,
          createdAt: data.contractStartDate,
        },
      });
    }

    revalidatePath("/admin/clients");
    revalidatePath("/admin/contracts");
    revalidatePath("/admin/paiements");

    return { success: true as const, client: updated };
  } catch (error) {
    return { success: false as const, error: getUserFriendlyError(error) };
  }
}

export async function deleteClient(clientId: string) {
  try {
    await prisma.client.delete({ where: { id: clientId } });

    revalidatePath("/admin/clients");
    revalidatePath("/admin/contracts");
    revalidatePath("/admin/paiements");

    return { success: true as const };
  } catch (error) {
    return { success: false as const, error: getUserFriendlyError(error) };
  }
}
