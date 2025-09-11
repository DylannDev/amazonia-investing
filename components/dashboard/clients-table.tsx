"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/dashboard/table";
import { SearchInput } from "@/components/dashboard/search-input";
import { useMemo, useState } from "react";
import ClientsColumnToggle from "@/components/dashboard/clients/clients-column-toggle";
import ClientsTableRow from "@/components/dashboard/clients/clients-table-row";
import EditClientDialog from "@/components/dashboard/clients/edit-client-dialog";
import DeleteClientDialog from "@/components/dashboard/clients/delete-client-dialog";
import ClientProfileDialog from "@/components/dashboard/clients/client-profile-dialog";

export interface ClientRow {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  birthDate?: Date | null;
  address?: string | null;
  city?: string | null;
  zipCode?: string | null;
  country?: string | null;
  investedAmount?: number | null;
  yieldRate?: number | null; // fraction (0.10)
  frequency?: "weekly" | "monthly" | null;
  amountAlreadyPaid?: number | null;
  contractStartDate?: Date | null;
  createdAt: Date;
}

interface ClientsTableProps {
  data: ClientRow[];
}

function formatDate(date?: Date | null): string {
  if (!date) return "—";
  try {
    return new Intl.DateTimeFormat("fr-FR").format(new Date(date));
  } catch {
    return "—";
  }
}

function ClientsTable({ data }: ClientsTableProps) {
  const [search, setSearch] = useState("");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [editingClient, setEditingClient] = useState<ClientRow | null>(null);
  const [deletingClient, setDeletingClient] = useState<{
    id: string;
    fullName: string;
  } | null>(null);
  const [profileClient, setProfileClient] = useState<ClientRow | null>(null);
  const defaultVisibleColumns = [
    "Nom Prénom",
    "Email",
    "Téléphone",
    "Montant investi",
    "Rendement",
    "Fréquence",
  ];
  const allColumns = [
    "Nom Prénom",
    "Email",
    "Téléphone",
    "Date de naissance",
    "Adresse",
    "Montant investi",
    "Rendement",
    "Fréquence",
    "Montant déjà payé",
    "Début du contrat",
  ] as const;
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    defaultVisibleColumns
  );
  function toggleColumn(col: string) {
    setVisibleColumns((prev) =>
      prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
    );
  }

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = !q
      ? data
      : data.filter((r) =>
          [r.fullName, r.email].some((v) => (v || "").toLowerCase().includes(q))
        );
    return [...list].sort((a, b) => {
      const da = new Date(a.createdAt).getTime();
      const db = new Date(b.createdAt).getTime();
      if (db !== da) return db - da;
      return a.id.localeCompare(b.id);
    });
  }, [data, search]);

  return (
    <div className="container space-y-4 overflow-x-auto">
      <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
        <div className="flex justify-between gap-2 w-full">
          <ClientsColumnToggle
            allColumns={allColumns}
            visibleColumns={visibleColumns}
            onToggle={toggleColumn}
          />
          <SearchInput
            placeholder="Rechercher un client..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64"
          />
        </div>
      </div>

      <div className="max-h-[calc(100dvh-260px)] overflow-y-auto relative border-b border-gray-200 pb-10">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              {visibleColumns.includes("Nom Prénom") && (
                <TableHead
                  className="w-[220px] whitespace-nowrap"
                  isFirst={true}
                >
                  Nom Prénom
                </TableHead>
              )}
              {visibleColumns.includes("Email") && (
                <TableHead className="w-[220px] whitespace-nowrap">
                  Email
                </TableHead>
              )}
              {visibleColumns.includes("Téléphone") && (
                <TableHead className="w-[140px] whitespace-nowrap">
                  Téléphone
                </TableHead>
              )}
              {visibleColumns.includes("Date de naissance") && (
                <TableHead className="w-[150px] whitespace-nowrap">
                  Date de naissance
                </TableHead>
              )}
              {visibleColumns.includes("Adresse") && (
                <TableHead className="w-[260px] whitespace-nowrap">
                  Adresse
                </TableHead>
              )}
              {visibleColumns.includes("Montant investi") && (
                <TableHead className="w-[150px] whitespace-nowrap">
                  Dépôt
                </TableHead>
              )}
              {visibleColumns.includes("Rendement") && (
                <TableHead className="w-[120px] whitespace-nowrap">
                  Rendement
                </TableHead>
              )}
              {visibleColumns.includes("Fréquence") && (
                <TableHead className="w-[140px] whitespace-nowrap">
                  Fréquence
                </TableHead>
              )}
              {visibleColumns.includes("Montant déjà payé") && (
                <TableHead className="w-[170px] whitespace-nowrap">
                  Montant déjà payé
                </TableHead>
              )}
              {visibleColumns.includes("Début du contrat") && (
                <TableHead className="w-[150px] whitespace-nowrap">
                  Début du contrat
                </TableHead>
              )}
              <TableHead
                className="w-[80px] whitespace-nowrap sticky right-0 z-30"
                isLast={true}
              ></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="mb-10">
            {filtered.length ? (
              filtered.map((row) => (
                <ClientsTableRow
                  key={row.id}
                  row={row}
                  visibleColumns={visibleColumns}
                  openMenuId={openMenuId}
                  setOpenMenuId={setOpenMenuId}
                  onOpenProfile={setProfileClient}
                  onEdit={(r) => setEditingClient(r)}
                  onDelete={(r) =>
                    setDeletingClient({
                      id: r.id,
                      fullName: `${r.firstName} ${r.lastName}`.trim(),
                    })
                  }
                />
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={visibleColumns.length + 1}
                  className="text-center py-6"
                >
                  Aucun client trouvé.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {editingClient && (
        <EditClientDialog
          open={true}
          onOpenChange={(o) => !o && setEditingClient(null)}
          client={{
            id: editingClient.id,
            firstName: editingClient.firstName,
            lastName: editingClient.lastName,
            email: editingClient.email,
            phone: editingClient.phone,
            birthDate: editingClient.birthDate ?? null,
            address: editingClient.address ?? null,
            city: editingClient.city ?? null,
            zipCode: editingClient.zipCode ?? null,
            country: editingClient.country ?? null,
            investedAmount: editingClient.investedAmount ?? null,
            yieldRate: editingClient.yieldRate ?? null,
            frequency: editingClient.frequency ?? null,
            contractStartDate: editingClient.contractStartDate ?? null,
          }}
        />
      )}
      {profileClient && (
        <ClientProfileDialog
          open={true}
          onOpenChange={(o) => !o && setProfileClient(null)}
          client={{
            id: profileClient.id,
            firstName: profileClient.firstName,
            lastName: profileClient.lastName,
            email: profileClient.email,
            phone: profileClient.phone,
            birthDate: profileClient.birthDate ?? null,
            address: profileClient.address ?? null,
            city: profileClient.city ?? null,
            zipCode: profileClient.zipCode ?? null,
            country: profileClient.country ?? null,
            investedAmount: profileClient.investedAmount ?? null,
            yieldRate: profileClient.yieldRate ?? null,
            frequency: profileClient.frequency ?? null,
            amountAlreadyPaid: profileClient.amountAlreadyPaid ?? null,
            contractStartDate: profileClient.contractStartDate ?? null,
          }}
        />
      )}
      {deletingClient && (
        <DeleteClientDialog
          open={true}
          onOpenChange={(o) => !o && setDeletingClient(null)}
          clientId={deletingClient.id}
          fullName={deletingClient.fullName}
        />
      )}
    </div>
  );
}

export default ClientsTable;
