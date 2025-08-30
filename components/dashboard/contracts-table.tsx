"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/dashboard/table";
import { normalizeString } from "@/lib/utils";
import { SearchInput } from "@/components/dashboard/search-input";
import { getPaymentsByContractId } from "@/actions/contracts";
import ContractsTableRow from "@/components/dashboard/contracts/contracts-table-row";

type ContractRow = {
  contractId: string;
  clientName: string;
  investedAmount: number;
  yieldRate: number; // 0.10 pour 10%
  frequency: "weekly" | "monthly";
  amountToPay: number;
  amountAlreadyPaid: number;
  totalPaidSoFar: number;
  roiRemainingMonths: number;
};

interface ContractsTableProps {
  rowsData: ContractRow[];
}

export default function ContractsTable({ rowsData }: ContractsTableProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [payments, setPayments] = useState<
    Array<{
      id: string;
      contractId: string;
      weekNumber: number;
      month: number;
      year: number;
      status: string;
      paidAt: string | null;
      amount: number;
    }>
  >([]);
  const [loading, setLoading] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");

  async function loadPayments(contractId: string) {
    setLoading(true);
    try {
      const rows = await getPaymentsByContractId(contractId);
      setPayments(rows);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (openId) {
      loadPayments(openId);
    }
  }, [openId]);

  const rows = useMemo(() => {
    const sorted = [...rowsData].sort((a, b) =>
      a.clientName.localeCompare(b.clientName, "fr")
    );
    const q = normalizeString(searchFilter.trim());
    if (!q) return sorted;
    return sorted.filter((r) => normalizeString(r.clientName).includes(q));
  }, [rowsData, searchFilter]);

  return (
    <div className="container overflow-x-auto">
      <div className="mb-6 flex justify-end gap-4">
        <SearchInput
          placeholder="Rechercher un client..."
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          className="w-64"
        />
      </div>
      <div className="max-h-[68vh] overflow-y-auto border-b border-gray-200 pb-10">
        <Table className="w-full overflow-hidden">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[220px] whitespace-nowrap" isFirst={true}>
                Nom Prénom
              </TableHead>
              <TableHead className="w-[150px] whitespace-nowrap">
                Dépôt
              </TableHead>
              <TableHead className="w-[120px] whitespace-nowrap">
                Rendement
              </TableHead>
              <TableHead className="w-[140px] whitespace-nowrap">
                Fréquence
              </TableHead>
              <TableHead className="w-[180px] whitespace-nowrap">
                Total paiements
              </TableHead>
              <TableHead className="w-[160px] whitespace-nowrap">
                Durée restante ROI
              </TableHead>
              <TableHead className="w-[160px] whitespace-nowrap" isLast={true}>
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length ? (
              rows.map((row) => (
                <ContractsTableRow
                  key={row.contractId}
                  row={row}
                  openId={openId}
                  setOpenId={setOpenId}
                  payments={payments}
                  loading={loading}
                />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6">
                  Aucun contrat.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
