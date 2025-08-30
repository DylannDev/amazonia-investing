"use server";

import { prisma } from "@/lib/prisma";
// Avoid importing Prisma types at build time on platforms without generated client

interface PaymentLight {
  id: string;
  contractId: string;
  weekNumber: number;
  month: number;
  year: number;
  status: string;
  paidAt: string | null;
  amount: number;
}

export async function getPaymentsByContractId(
  contractId: string
): Promise<PaymentLight[]> {
  interface PaymentWithContractMinimal {
    id: string;
    contractId: string;
    weekNumber: number;
    month: number;
    year: number;
    status: string;
    paidAt: Date | null;
    contract: { amountToPay?: unknown };
  }

  const rows = await prisma.payment.findMany({
    where: { contractId },
    include: {
      contract: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (rows as PaymentWithContractMinimal[]).map((p) => ({
    id: p.id,
    contractId: p.contractId,
    weekNumber: p.weekNumber,
    month: p.month,
    year: p.year,
    status: p.status,
    paidAt: p.paidAt ? p.paidAt.toISOString() : null,
    amount: Number(p.contract?.amountToPay ?? 0),
  }));
}
