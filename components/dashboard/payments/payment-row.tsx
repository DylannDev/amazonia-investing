"use client";

import React from "react";
import { TableRow, TableCell } from "@/components/dashboard/table";
import { Button } from "@/components/dashboard/button";
import { Badge } from "@/components/dashboard/badge";
import { formatCurrency } from "@/lib/utils";

interface PaymentRowProps {
  item: {
    id: string;
    contractId: string;
    clientName: string;
    investedAmount: number;
    yieldRate: number;
    frequency: "weekly" | "monthly";
    amountToPay: number;
    weekNumber: number;
    month: number;
    year: number;
    status: "pending" | "paid" | "late";
  };
  loading: boolean;
  onMarkPaid: () => void;
  onMarkPending: () => void;
}

export function PaymentRow({
  item,
  loading,
  onMarkPaid,
  onMarkPending,
}: PaymentRowProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge variant="green">Payé</Badge>;
      case "pending":
        return <Badge variant="yellow">En attente</Badge>;
      default:
        return null;
    }
  };

  return (
    <TableRow>
      <TableCell className="whitespace-nowrap">{item.clientName}</TableCell>
      <TableCell className="whitespace-nowrap">
        {formatCurrency(item.investedAmount)}
      </TableCell>
      <TableCell className="whitespace-nowrap">
        {(item.yieldRate * 100).toFixed(1)}%
      </TableCell>
      <TableCell className="whitespace-nowrap">
        {item.frequency === "weekly" ? "Hebdomadaire" : "Mensuelle"}
      </TableCell>
      <TableCell className="whitespace-nowrap">
        {formatCurrency(item.amountToPay)}
      </TableCell>
      <TableCell className="whitespace-nowrap">
        {getStatusBadge(item.status)}
      </TableCell>
      <TableCell className="whitespace-nowrap">
        {item.status === "pending" || item.status === "late" ? (
          <Button
            size="sm"
            variant="green"
            onClick={onMarkPaid}
            disabled={loading}
            className="min-w-[150px]"
          >
            {loading ? "En cours..." : "Confirmer paiement"}
          </Button>
        ) : item.status === "paid" ? (
          <Button
            size="sm"
            variant="outline"
            onClick={onMarkPending}
            disabled={loading}
            className="min-w-[150px]"
          >
            {loading ? "En cours..." : "Annuler paiement"}
          </Button>
        ) : (
          <span className="text-sm text-gray-500">Aucune action</span>
        )}
      </TableCell>
    </TableRow>
  );
}
