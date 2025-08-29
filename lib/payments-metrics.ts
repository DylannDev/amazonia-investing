import {
  isPeriodAfterPaymentStart,
  isWeekInLastFourOfMonth,
} from "@/lib/utils";
import { Contract, Payment } from "@/types/prisma";

export function getMonthWeeks(month: number, year: number): number[] {
  return Array.from({ length: 53 }, (_, i) => i + 1).filter((w) =>
    isWeekInLastFourOfMonth(w, month, year)
  );
}

export function totalMonthlyForMonth(
  contracts: Contract[],
  month: number,
  year: number,
  refWeek: number
): number {
  return contracts
    .filter((c) => c.frequency === "monthly")
    .filter((c) =>
      isPeriodAfterPaymentStart(c.createdAt, refWeek, month, year, c.frequency)
    )
    .reduce((sum, c) => sum + c.amountToPay, 0);
}

export function totalWeeklyForWholeMonth(
  contracts: Contract[],
  month: number,
  year: number
): number {
  const weeks = getMonthWeeks(month, year);
  const weeklies = contracts.filter((c) => c.frequency === "weekly");
  return weeks.reduce((acc, w) => {
    const s = weeklies.reduce(
      (s2, c) =>
        isPeriodAfterPaymentStart(c.createdAt, w, month, year, c.frequency)
          ? s2 + c.amountToPay
          : s2,
      0
    );
    return acc + s;
  }, 0);
}

export function countMonthlyForMonth(
  contracts: Contract[],
  month: number,
  year: number,
  refWeek: number
): number {
  return contracts
    .filter((c) => c.frequency === "monthly")
    .reduce(
      (n, c) =>
        n +
        (isPeriodAfterPaymentStart(
          c.createdAt,
          refWeek,
          month,
          year,
          c.frequency
        )
          ? 1
          : 0),
      0
    );
}

export function countWeeklyForWholeMonth(
  contracts: Contract[],
  month: number,
  year: number
): number {
  const weeks = getMonthWeeks(month, year);
  const weeklies = contracts.filter((c) => c.frequency === "weekly");
  return weeks.reduce((acc, w) => {
    const c = weeklies.reduce(
      (n, con) =>
        n +
        (isPeriodAfterPaymentStart(con.createdAt, w, month, year, con.frequency)
          ? 1
          : 0),
      0
    );
    return acc + c;
  }, 0);
}

export function sumPaidForMonth(
  payments: Payment[],
  contracts: Contract[],
  month: number,
  year: number
): number {
  const weeks = getMonthWeeks(month, year);
  const byId = new Map(contracts.map((c) => [c.id, c]));
  return payments
    .filter((p) => p.status === "paid" && p.year === year && p.month === month)
    .filter((p) => p.frequency === "monthly" || weeks.includes(p.weekNumber))
    .reduce((sum, p) => sum + (byId.get(p.contractId)?.amountToPay ?? 0), 0);
}

export function countPaidForMonth(
  payments: Payment[],
  month: number,
  year: number
): number {
  const weeks = getMonthWeeks(month, year);
  return payments
    .filter((p) => p.status === "paid" && p.year === year && p.month === month)
    .filter((p) => p.frequency === "monthly" || weeks.includes(p.weekNumber))
    .length;
}
