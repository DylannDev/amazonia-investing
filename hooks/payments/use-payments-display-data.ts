"use client";

import { useMemo, useState } from "react";
import {
  normalizeString,
  isPeriodAfterPaymentStart,
  isWeekInLastFourOfMonth,
} from "@/lib/utils";
import { Payment, Contract } from "@/types/prisma";
import { useSelectedPeriodStore } from "@/lib/stores/selected-period-store";

export function usePaymentsDisplayData(
  payments: Payment[],
  contracts: Contract[]
) {
  const [selectedFrequency, setSelectedFrequency] = useState<string>("all");
  const [searchFilter, setSearchFilter] = useState("");
  const { selectedWeekNumber, selectedMonth, selectedYear } =
    useSelectedPeriodStore();

  const hasPaymentForContract = (
    clientName: string,
    frequency: string,
    list: Payment[]
  ) => {
    return list.some((payment) => {
      const clientMatch = payment.clientName === clientName;
      const frequencyMatch = payment.frequency === frequency;
      const weekMatch =
        payment.weekNumber === selectedWeekNumber &&
        payment.month === selectedMonth &&
        payment.year === selectedYear;
      const monthMatch =
        payment.month === selectedMonth &&
        payment.year === selectedYear &&
        payment.frequency === "monthly";
      return clientMatch && frequencyMatch && (weekMatch || monthMatch);
    });
  };

  const displayData = useMemo(() => {
    const fromPayments = payments.filter((payment) => {
      const weekMatch =
        payment.weekNumber === selectedWeekNumber &&
        payment.month === selectedMonth &&
        payment.year === selectedYear;
      const monthMatch =
        payment.month === selectedMonth &&
        payment.year === selectedYear &&
        payment.frequency === "monthly";
      return weekMatch || monthMatch;
    });

    const fromContracts = contracts
      .filter((contract) => {
        const isPaymentMissing = !hasPaymentForContract(
          contract.clientName,
          contract.frequency,
          payments
        );
        const isValidPeriod = isPeriodAfterPaymentStart(
          contract.createdAt,
          selectedWeekNumber,
          selectedMonth,
          selectedYear,
          contract.frequency
        );
        return isPaymentMissing && isValidPeriod;
      })
      .map((contract) => {
        const isInvalidWeeklyWeek =
          contract.frequency === "weekly" &&
          !isWeekInLastFourOfMonth(
            selectedWeekNumber,
            selectedMonth,
            selectedYear
          );
        if (isInvalidWeeklyWeek) return null;
        return {
          id: `${contract.id}_${selectedWeekNumber}_${selectedMonth}_${selectedYear}`,
          contractId: contract.id,
          clientName: contract.clientName,
          investedAmount: contract.investedAmount,
          yieldRate: contract.yieldRate,
          frequency: contract.frequency,
          amountToPay: contract.amountToPay,
          weekNumber: selectedWeekNumber,
          month: selectedMonth,
          year: selectedYear,
          status: "pending" as const,
        };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);

    return [...fromPayments, ...fromContracts];
  }, [payments, contracts, selectedWeekNumber, selectedMonth, selectedYear]);

  const filteredData = useMemo(() => {
    return displayData.filter((item) => {
      const frequencyMatch =
        selectedFrequency === "all" || item.frequency === selectedFrequency;
      return frequencyMatch;
    });
  }, [displayData, selectedFrequency]);

  const searchedData = useMemo(() => {
    const searchQuery = normalizeString(searchFilter.trim());
    const list = filteredData.filter((item) => {
      if (!searchQuery) return true;
      const name = normalizeString(item.clientName);
      return name.includes(searchQuery);
    });
    // Tri stable par nom client pour éviter les sauts d'ordre lors des changements de statut
    return [...list].sort((a, b) =>
      a.clientName.localeCompare(b.clientName, "fr", { sensitivity: "base" })
    );
  }, [filteredData, searchFilter]);

  const weeklyItemsCount = filteredData.filter(
    (p) => p.frequency === "weekly"
  ).length;
  const totalWeeklySelected = filteredData
    .filter((p) => p.frequency === "weekly")
    .reduce((sum, p) => sum + p.amountToPay, 0);

  return {
    selectedFrequency,
    setSelectedFrequency,
    searchFilter,
    setSearchFilter,
    displayData,
    filteredData,
    searchedData,
    weeklyItemsCount,
    totalWeeklySelected,
  };
}
