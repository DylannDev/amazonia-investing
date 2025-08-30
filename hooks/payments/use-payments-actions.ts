"use client";

import { useState } from "react";
import { confirmPayment, cancelPayment } from "@/actions/payments";
import { Payment, Contract } from "@/types/prisma";

export function usePaymentsActions(
  initialPayments: Payment[],
  contracts: Contract[]
) {
  const [paymentsData, setPaymentsData] = useState<Payment[]>(initialPayments);
  const [loadingPayments, setLoadingPayments] = useState<Set<string>>(
    new Set()
  );

  async function handleMarkAsPaid(
    paymentId: string,
    contractId: string,
    weekNumber: number,
    month: number,
    year: number,
    filteredDataSnapshot: Array<{
      contractId: string;
      weekNumber: number;
      month: number;
      year: number;
      clientName: string;
      investedAmount: number;
      yieldRate: number;
      frequency: "weekly" | "monthly";
      amountToPay: number;
    }>
  ) {
    setLoadingPayments((prev) => new Set(prev).add(paymentId));
    try {
      const result = await confirmPayment({
        paymentId,
        contractId,
        weekNumber,
        month,
        year,
      });
      if (result.success) {
        const saved = result.payment;
        setPaymentsData((prev) => {
          if (!saved) return prev;
          const exists = prev.some(
            (p) =>
              p.contractId === contractId &&
              p.weekNumber === weekNumber &&
              p.month === month &&
              p.year === year
          );
          if (exists) {
            return prev.map((p) =>
              p.contractId === contractId &&
              p.weekNumber === weekNumber &&
              p.month === month &&
              p.year === year
                ? { ...p, id: saved.id, status: "paid" as const }
                : p
            );
          }
          const displayItem = filteredDataSnapshot.find(
            (i) =>
              i.contractId === contractId &&
              i.weekNumber === weekNumber &&
              i.month === month &&
              i.year === year
          );
          const contract = contracts.find((c) => c.id === contractId);
          return [
            ...prev,
            {
              id: saved.id,
              contractId,
              clientName: displayItem?.clientName ?? contract?.clientName ?? "",
              investedAmount:
                displayItem?.investedAmount ?? contract?.investedAmount ?? 0,
              yieldRate: displayItem?.yieldRate ?? contract?.yieldRate ?? 0,
              frequency: (displayItem?.frequency ??
                contract?.frequency ??
                "weekly") as "weekly" | "monthly",
              amountToPay:
                displayItem?.amountToPay ?? contract?.amountToPay ?? 0,
              weekNumber,
              month,
              year,
              status: "paid" as const,
            },
          ];
        });
      }
    } finally {
      setLoadingPayments((prev) => {
        const next = new Set(prev);
        next.delete(paymentId);
        return next;
      });
    }
  }

  async function handleMarkAsPending(paymentId: string) {
    setLoadingPayments((prev) => new Set(prev).add(paymentId));
    try {
      const result = await cancelPayment(paymentId);
      if (result.success) {
        setPaymentsData((prev) =>
          prev.map((p) =>
            p.id === paymentId ? { ...p, status: "pending" as const } : p
          )
        );
      }
    } finally {
      setLoadingPayments((prev) => {
        const next = new Set(prev);
        next.delete(paymentId);
        return next;
      });
    }
  }

  return {
    paymentsData,
    setPaymentsData,
    loadingPayments,
    handleMarkAsPaid,
    handleMarkAsPending,
  };
}
