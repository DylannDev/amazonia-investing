"use client";

import React from "react";
import {
  TableRow,
  TableCell,
  Table,
  TableHeader,
  TableHead,
  TableBody,
} from "@/components/dashboard/table";
import { Button } from "@/components/dashboard/button";
import { Badge } from "@/components/dashboard/badge";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { formatCurrency } from "@/lib/utils";

export interface ContractRowProps {
  row: {
    contractId: string;
    clientName: string;
    investedAmount: number;
    yieldRate: number; // fraction (0.10 for 10%)
    frequency: "weekly" | "monthly";
    amountToPay: number;
    amountAlreadyPaid: number;
    totalPaidSoFar: number;
    roiRemainingMonths: number;
  };
  openId: string | null;
  setOpenId: (id: string | null) => void;
  payments: Array<{
    id: string;
    contractId: string;
    weekNumber: number;
    month: number;
    year: number;
    status: string;
    paidAt: string | null;
    amount: number;
  }>;
  loading: boolean;
}

export default function ContractsTableRow({
  row,
  openId,
  setOpenId,
  payments,
  loading,
}: ContractRowProps) {
  const totalPayments = row.amountAlreadyPaid + row.totalPaidSoFar;
  const freqLabel = row.frequency === "weekly" ? "Hebdomadaire" : "Mensuelle";

  return (
    <TableRow>
      <TableCell className="whitespace-nowrap">{row.clientName}</TableCell>
      <TableCell className="whitespace-nowrap">
        {formatCurrency(row.investedAmount)}
      </TableCell>
      <TableCell className="whitespace-nowrap">
        {(row.yieldRate * 100).toFixed(1)}%
      </TableCell>
      <TableCell className="whitespace-nowrap">{freqLabel}</TableCell>
      <TableCell className="whitespace-nowrap">
        {formatCurrency(totalPayments)}
      </TableCell>
      <TableCell className="whitespace-nowrap">
        {row.roiRemainingMonths === 0 ? (
          <Badge variant="green">ROI atteint</Badge>
        ) : (
          <span>{row.roiRemainingMonths} mois</span>
        )}
      </TableCell>

      <TableCell className="whitespace-nowrap">
        <Dialog
          open={openId === row.contractId}
          onOpenChange={(o) => setOpenId(o ? row.contractId : null)}
        >
          <DialogTrigger asChild>
            <Button size="sm" variant="outline_blue">
              Afficher paiements
            </Button>
          </DialogTrigger>
          <DialogContent className="min-w-[600px] overflow-y-auto">
            <DialogHeader className="pb-4">
              <DialogTitle>Paiements de {row.clientName}</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              {loading ? (
                <div className="text-sm text-muted-foreground">
                  Chargement...
                </div>
              ) : (
                <div className="w-full">
                  <Table className="w-full table-fixed">
                    <TableHeader>
                      <TableRow>
                        <TableHead isFirst={true} className="w-[140px]">
                          Période
                        </TableHead>
                        <TableHead className="w-[120px]">Montant</TableHead>
                        <TableHead className="w-[120px]">Statut</TableHead>
                        <TableHead isLast={true} className="w-[140px]">
                          Payé le
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                  </Table>
                  <div className="max-h-[50vh] overflow-y-auto">
                    <Table className="w-full table-fixed">
                      <TableBody>
                        {payments.filter((p) => p.contractId === row.contractId)
                          .length ? (
                          payments
                            .filter((p) => p.contractId === row.contractId)
                            .map((p) => (
                              <TableRow key={p.id}>
                                <TableCell className="w-[140px]">
                                  {p.weekNumber > 0
                                    ? `S ${p.weekNumber} - ${String(
                                        p.month
                                      ).padStart(2, "0")}/${p.year}`
                                    : `${String(p.month).padStart(2, "0")}/${
                                        p.year
                                      }`}
                                </TableCell>
                                <TableCell className="w-[120px]">
                                  {formatCurrency(p.amount)}
                                </TableCell>
                                <TableCell className="w-[120px]">
                                  {p.status === "paid" ? (
                                    <Badge isBgVisible variant="green">
                                      Payé
                                    </Badge>
                                  ) : (
                                    <Badge isBgVisible variant="yellow">
                                      En attente
                                    </Badge>
                                  )}
                                </TableCell>
                                <TableCell className="w-[140px]">
                                  {p.paidAt
                                    ? new Date(p.paidAt).toLocaleDateString(
                                        "fr-FR"
                                      )
                                    : "—"}
                                </TableCell>
                              </TableRow>
                            ))
                        ) : (
                          <TableRow>
                            <TableCell
                              colSpan={4}
                              className="text-center py-4 text-muted-foreground"
                            >
                              Aucun paiement pour ce contrat.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-end pt-4 pb-4">
              <DialogClose asChild>
                <Button size="sm" variant="outline_red">
                  Fermer
                </Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </TableCell>
    </TableRow>
  );
}
