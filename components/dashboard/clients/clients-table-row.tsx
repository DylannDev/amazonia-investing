"use client";

import React from "react";
import { TableCell, TableRow } from "@/components/dashboard/table";
import { formatCurrency, capitalizeWords } from "@/lib/utils";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/dashboard/dropdown-menu";
import { ClientRow } from "@/lib/clients";

function formatDate(date?: Date | null): string {
  if (!date) return "—";
  try {
    return new Intl.DateTimeFormat("fr-FR").format(new Date(date));
  } catch {
    return "—";
  }
}

interface ClientsTableRowProps {
  row: ClientRow;
  visibleColumns: string[];
  openMenuId: string | null;
  setOpenMenuId: (id: string | null) => void;
  onOpenProfile: (row: ClientRow) => void;
  onEdit: (row: ClientRow) => void;
  onDelete: (row: ClientRow) => void;
}

export function ClientsTableRow({
  row,
  visibleColumns,
  openMenuId,
  setOpenMenuId,
  onOpenProfile,
  onEdit,
  onDelete,
}: ClientsTableRowProps) {
  const freqLabel = row.frequency
    ? row.frequency === "weekly"
      ? "Hebdomadaire"
      : "Mensuelle"
    : "—";

  return (
    <TableRow
      className="cursor-pointer hover:bg-blue-100/30"
      onClick={() => onOpenProfile(row)}
    >
      {visibleColumns.includes("Nom Prénom") && (
        <TableCell isFirst={true} className="whitespace-nowrap">
          {capitalizeWords(`${row.firstName} ${row.lastName}`.trim())}
        </TableCell>
      )}
      {visibleColumns.includes("Email") && (
        <TableCell className="whitespace-nowrap">{row.email}</TableCell>
      )}
      {visibleColumns.includes("Téléphone") && (
        <TableCell className="whitespace-nowrap">{row.phone}</TableCell>
      )}
      {visibleColumns.includes("Date de naissance") && (
        <TableCell className="whitespace-nowrap">
          {formatDate(row.birthDate)}
        </TableCell>
      )}
      {visibleColumns.includes("Adresse") && (
        <TableCell
          className="max-w-[260px] truncate"
          title={row.address ? capitalizeWords(row.address) : undefined}
        >
          {row.address ? capitalizeWords(row.address) : "—"}
        </TableCell>
      )}
      {visibleColumns.includes("Montant investi") && (
        <TableCell className="whitespace-nowrap">
          {row.investedAmount != null
            ? formatCurrency(row.investedAmount)
            : "—"}
        </TableCell>
      )}
      {visibleColumns.includes("Rendement") && (
        <TableCell className="whitespace-nowrap">
          {row.yieldRate != null ? `${Number(row.yieldRate).toFixed(1)}%` : "—"}
        </TableCell>
      )}
      {visibleColumns.includes("Fréquence") && (
        <TableCell className="whitespace-nowrap">{freqLabel}</TableCell>
      )}
      {visibleColumns.includes("Montant déjà payé") && (
        <TableCell className="whitespace-nowrap">
          {formatCurrency(row.amountAlreadyPaid ?? 0)}
        </TableCell>
      )}
      {visibleColumns.includes("Début du contrat") && (
        <TableCell className="whitespace-nowrap">
          {formatDate(row.contractStartDate)}
        </TableCell>
      )}
      <TableCell
        isLast={true}
        className="whitespace-nowrap sticky right-0 z-20"
      >
        <DropdownMenu
          open={openMenuId === row.id}
          onOpenChange={(o) => setOpenMenuId(o ? row.id : null)}
        >
          <DropdownMenuTrigger
            asChild
            className="relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Actions"
              className="p-2 bg-white border border-blue-200 rounded-md hover:bg-blue-100 cursor-pointer"
            >
              <MoreHorizontal
                aria-hidden="true"
                className="w-4 h-4 text-blue-300"
              />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-40 absolute top-0 -right-10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-blue-100 rounded-md"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(row);
                setOpenMenuId(null);
              }}
            >
              <Pencil className="w-4 h-4" aria-hidden="true" />
              Modifier
            </button>
            <button
              className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-100 rounded-md"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(row);
                setOpenMenuId(null);
              }}
            >
              <Trash2 className="w-4 h-4" aria-hidden="true" />
              Supprimer
            </button>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}

export default ClientsTableRow;
