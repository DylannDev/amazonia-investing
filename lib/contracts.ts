import { prisma } from "@/lib/prisma";

export interface ContractAggregateRow {
  contractId: string;
  clientName: string;
  investedAmount: number;
  yieldRate: number; // 0.10 for 10%
  frequency: "weekly" | "monthly";
  amountToPay: number;
  amountAlreadyPaid: number;
  totalPaidSoFar: number;
  roiRemainingMonths: number;
}

export interface DrawerPaymentRow {
  id: string;
  contractId: string;
  weekNumber: number;
  month: number;
  year: number;
  status: "pending" | "paid" | "late" | string;
  paidAt: Date | null;
  amount: number; // using contract.amountToPay as unit amount
}

function toNumber(value: any): number {
  if (value === null || value === undefined) return 0;
  return Number(value);
}

export interface ContractsSummary {
  rows: ContractAggregateRow[];
  totalInvested: number;
  totalPaid: number;
  activeContracts: number;
}

export async function getContractsWithAggregates(): Promise<ContractsSummary> {
  const contracts = await prisma.contract.findMany({
    include: {
      client: true,
      payment: true,
    },
    orderBy: { createdAt: "desc" },
  });

  const rows: ContractAggregateRow[] = contracts.map((c) => {
    const investedAmount = toNumber(c.investedAmount);
    const yieldRate = toNumber(c.yieldRate) / 100; // DB stores percentage, convert to fraction (e.g., 10 -> 0.10)
    const amountToPay = toNumber(c.amountToPay);
    const amountAlreadyPaid = toNumber(c.amountAlreadyPaid);
    const frequency = c.frequency as "weekly" | "monthly";

    const totalPaidSoFar = c.payment
      .filter((p) => p.status === "paid")
      .reduce((sum) => sum + amountToPay, 0); // each paid payment counts the contract amountToPay

    const alreadyReceived = amountAlreadyPaid + totalPaidSoFar;
    const remainingToROI = Math.max(0, investedAmount - alreadyReceived);
    const monthlyExpected =
      frequency === "monthly" ? amountToPay : amountToPay * 4;
    const roiRemainingMonths =
      monthlyExpected > 0 ? Math.ceil(remainingToROI / monthlyExpected) : 0;

    return {
      contractId: c.id,
      clientName: `${c.client.firstName} ${c.client.lastName}`.trim(),
      investedAmount,
      yieldRate,
      frequency,
      amountToPay,
      amountAlreadyPaid,
      totalPaidSoFar,
      roiRemainingMonths,
    };
  });

  // Sort by clientName asc for a consistent UI
  rows.sort((a, b) => a.clientName.localeCompare(b.clientName, "fr"));

  // Aggregates
  const totalInvested = rows.reduce((sum, r) => sum + r.investedAmount, 0);
  const totalPaid = rows.reduce(
    (sum, r) => sum + (r.amountAlreadyPaid + r.totalPaidSoFar),
    0
  );
  const activeContracts = contracts.length; // adjust if there's an "active" flag later

  return { rows, totalInvested, totalPaid, activeContracts };
}
