"use client";

import { useMemo } from "react";
import { formatCurrency, formatMonthYear } from "@/lib/utils";
import { Contract, Payment } from "@/types/prisma";
import {
  countMonthlyForMonth,
  countWeeklyForWholeMonth,
  sumPaidForMonth,
  countPaidForMonth,
  totalMonthlyForMonth,
  totalWeeklyForWholeMonth,
} from "@/lib/payments-metrics";

export interface PaymentsStatsResult {
  totalWeekly: number;
  totalMonthly: number;
  totalGlobal: number;
  totalRemaining: number;
  weeklySubtitle: string;
  monthlySubtitle: string;
  globalSubtitle: string;
  remainingSubtitle: string;
}

export function usePaymentsStats(params: {
  contracts: Contract[];
  payments: Payment[];
  weeklyItemsCount: number;
  totalWeeklySelected: number;
  selectedWeek: number;
  selectedMonth: number;
  selectedYear: number;
}): PaymentsStatsResult {
  const {
    contracts,
    payments,
    weeklyItemsCount,
    totalWeeklySelected,
    selectedWeek,
    selectedMonth,
    selectedYear,
  } = params;

  return useMemo(() => {
    const totalMonthly = totalMonthlyForMonth(
      contracts,
      selectedMonth,
      selectedYear,
      selectedWeek
    );
    const totalWeeklyAll = totalWeeklyForWholeMonth(
      contracts,
      selectedMonth,
      selectedYear
    );
    const totalGlobal = totalMonthly + totalWeeklyAll;
    const totalPaid = sumPaidForMonth(
      payments,
      contracts,
      selectedMonth,
      selectedYear
    );

    const monthlyCount = countMonthlyForMonth(
      contracts,
      selectedMonth,
      selectedYear,
      selectedWeek
    );
    const weeklyCountAll = countWeeklyForWholeMonth(
      contracts,
      selectedMonth,
      selectedYear
    );
    const totalCount = weeklyCountAll + monthlyCount;
    const paidCount = countPaidForMonth(payments, selectedMonth, selectedYear);

    return {
      totalWeekly: totalWeeklySelected,
      totalMonthly,
      totalGlobal,
      totalRemaining: Math.max(0, totalGlobal - totalPaid),
      weeklySubtitle: `S ${selectedWeek} - ${formatMonthYear(
        selectedMonth,
        selectedYear
      )} — ${weeklyItemsCount} paiement(s)`,
      monthlySubtitle: `${formatMonthYear(
        selectedMonth,
        selectedYear
      )} — ${monthlyCount} paiement(s)`,
      globalSubtitle: `${formatMonthYear(selectedMonth, selectedYear)} — ${
        weeklyCountAll + monthlyCount
      } paiement(s)`,
      remainingSubtitle: `${formatCurrency(totalPaid)} payé / ${formatCurrency(
        totalGlobal
      )} dû — ${paidCount} / ${totalCount} paiements`,
    };
  }, [
    contracts,
    payments,
    weeklyItemsCount,
    totalWeeklySelected,
    selectedWeek,
    selectedMonth,
    selectedYear,
  ]);
}
