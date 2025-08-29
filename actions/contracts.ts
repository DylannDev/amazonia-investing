"use server";

import { prisma } from "@/lib/prisma";

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
  const rows = await prisma.payment.findMany({
    where: { contractId },
    include: {
      contract: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return rows.map((p) => ({
    id: p.id,
    contractId: p.contractId,
    weekNumber: p.weekNumber,
    month: p.month,
    year: p.year,
    status: p.status,
    paidAt: p.paidAt ? p.paidAt.toISOString() : null,
    amount: Number(p.contract.amountToPay ?? 0),
  }));
}
