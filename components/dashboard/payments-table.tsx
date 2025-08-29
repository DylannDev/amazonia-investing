"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/dashboard/table";
import { formatCurrency } from "@/lib/utils";
import { Payment, Contract } from "@/types/prisma";
import { PaymentsControls } from "@/components/dashboard/payments/payments-controls";
import { useSelectedPeriodStore } from "@/lib/stores/selected-period-store";
import { PaymentsStatsCards } from "@/components/dashboard/payments/payments-stats";
import { PaymentRow } from "@/components/dashboard/payments/payment-row";
import { usePaymentsDisplayData } from "@/hooks/payments/use-payments-display-data";
import { usePaymentsActions } from "@/hooks/payments/use-payments-actions";
import { usePaymentsStats } from "@/hooks/payments/use-payments-stats";

interface PaymentsTableProps {
  payments: Payment[];
  contracts: Contract[];
}

function PaymentsTable({ payments, contracts }: PaymentsTableProps) {
  const {
    selectedFrequency,
    setSelectedFrequency,
    searchFilter,
    setSearchFilter,
    displayData,
    filteredData,
    searchedData,
    weeklyItemsCount,
    totalWeeklySelected,
  } = usePaymentsDisplayData(payments, contracts);
  const {
    paymentsData,
    setPaymentsData,
    loadingPayments,
    handleMarkAsPaid,
    handleMarkAsPending,
  } = usePaymentsActions(payments, contracts);

  // Utiliser le store Zustand pour récupérer la période sélectionnée
  const { selectedWeekNumber, selectedMonth, selectedYear } =
    useSelectedPeriodStore();

  // Synchronize external table-local paymentsData with display hook when needed
  // (kept via actions hook)

  const isPeriodSelected =
    selectedMonth > 0 && selectedYear > 0 && selectedWeekNumber > 0;

  const stats = usePaymentsStats({
    contracts,
    payments: paymentsData,
    weeklyItemsCount,
    totalWeeklySelected,
    selectedWeek: selectedWeekNumber,
    selectedMonth,
    selectedYear,
  });

  return (
    <div className="container overflow-x-auto">
      <PaymentsStatsCards
        totalWeekly={formatCurrency(stats.totalWeekly)}
        totalMonthly={formatCurrency(stats.totalMonthly)}
        totalGlobal={formatCurrency(stats.totalGlobal)}
        totalRemaining={formatCurrency(stats.totalRemaining)}
        weeklySubtitle={stats.weeklySubtitle}
        monthlySubtitle={stats.monthlySubtitle}
        globalSubtitle={stats.globalSubtitle}
        remainingSubtitle={stats.remainingSubtitle}
      />

      {/* Contrôles */}
      <PaymentsControls
        selectedFrequency={selectedFrequency}
        onFrequencyChange={setSelectedFrequency}
        search={searchFilter}
        onSearchChange={setSearchFilter}
      />

      {/* Tableau */}
      {!isPeriodSelected ? (
        <div className="w-full py-10 text-center text-muted-foreground">
          Veuillez sélectionner une date (mois et semaine) pour afficher les
          paiements.
        </div>
      ) : (
        <div className="max-h-[56vh] overflow-y-auto border-b border-gray-200 pb-10">
          <Table className="w-full overflow-hidden">
            <TableHeader>
              <TableRow>
                <TableHead
                  className="w-[200px] whitespace-nowrap"
                  isFirst={true}
                >
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
                <TableHead className="w-[150px] whitespace-nowrap">
                  Montant à virer
                </TableHead>
                <TableHead className="w-[120px] whitespace-nowrap">
                  Statut
                </TableHead>
                <TableHead
                  className="w-[120px] whitespace-nowrap"
                  isLast={true}
                >
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {searchedData.length ? (
                searchedData.map((item) => (
                  <PaymentRow
                    key={item.id}
                    item={item as any}
                    loading={loadingPayments.has(item.id)}
                    onMarkPaid={() =>
                      handleMarkAsPaid(
                        item.id,
                        item.contractId,
                        item.weekNumber,
                        item.month,
                        item.year,
                        filteredData
                      )
                    }
                    onMarkPending={() => handleMarkAsPending(item.id)}
                  />
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6">
                    Aucun paiement trouvé pour cette semaine et cette fréquence.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

export default PaymentsTable;
