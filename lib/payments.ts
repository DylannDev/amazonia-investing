import { Payment, Contract } from "@/types/prisma";
import { prisma } from "@/lib/prisma";

export async function getPaymentsData(): Promise<Payment[]> {
  try {
    const payments = await prisma.payment.findMany({
      include: {
        contract: {
          include: {
            client: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });

    return payments.map((payment) => ({
      id: payment.id,
      contractId: payment.contractId,
      clientName: `${payment.contract.client.firstName} ${payment.contract.client.lastName}`,
      investedAmount: Number(payment.contract.investedAmount),
      yieldRate: Number(payment.contract.yieldRate) / 100, // Conversion du pourcentage
      frequency: payment.contract.frequency as "weekly" | "monthly",
      amountToPay: Number(payment.contract.amountToPay),
      weekNumber: payment.weekNumber,
      month: payment.month,
      year: payment.year,
      status: payment.status as "pending" | "paid" | "late",
    }));
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données de paiement:",
      error
    );
    return [];
  }
}

export async function getContractsData(): Promise<Contract[]> {
  try {
    const contracts = await prisma.contract.findMany({
      include: {
        client: true,
      },
    });

    return contracts.map((contract) => ({
      id: contract.id,
      createdAt: contract.createdAt,
      clientName: `${contract.client.firstName} ${contract.client.lastName}`,
      investedAmount: Number(contract.investedAmount),
      yieldRate: Number(contract.yieldRate) / 100, // Conversion du pourcentage
      frequency: contract.frequency as "weekly" | "monthly",
      amountToPay: Number(contract.amountToPay),
      status: "pending",
    }));
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données de contrat:",
      error
    );
    return [];
  }
}
