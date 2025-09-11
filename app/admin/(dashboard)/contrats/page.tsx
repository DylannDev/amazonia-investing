import { getContractsWithAggregates } from "@/lib/contracts";
import ContractsTable from "@/components/dashboard/contracts-table";
import { StatsCard } from "@/components/dashboard/stats-card";
import { formatCurrency } from "@/lib/utils";
import { ArrowDownCircle, FileSpreadsheet, WalletMinimal } from "lucide-react";

export default async function ContractsPage() {
  const { rows, totalInvested, totalPaid, activeContracts } =
    await getContractsWithAggregates();
  return (
    <div className="container mx-auto w-full flex flex-col overflow-x-auto py-10">
      <div className="flex justify-between items-start gap-10 mb-10">
        <div className="w-1/3">
          <h1 className="text-2xl font-bold text-black">
            Gestion des contrats
          </h1>
          <p className="text-gray-600">
            Suivi des rendements, ROI et paiements associés
          </p>
        </div>
        <div className="flex gap-4 w-2/3">
          <StatsCard
            title="Total Investi"
            value={formatCurrency(totalInvested)}
            icon={
              <WalletMinimal
                strokeWidth={1.5}
                className="w-6 h-6 text-blue-500"
                aria-hidden="true"
              />
            }
            tone="blue"
          />
          <StatsCard
            title="Total Déjà Payé"
            value={formatCurrency(totalPaid)}
            icon={
              <ArrowDownCircle
                strokeWidth={1.5}
                className="w-6 h-6 text-green-500"
                aria-hidden="true"
              />
            }
            tone="green"
          />
          <StatsCard
            title="Contrats Actifs"
            value={String(activeContracts)}
            icon={
              <FileSpreadsheet
                strokeWidth={1.5}
                className="w-6 h-6 text-yellow-500"
                aria-hidden="true"
              />
            }
            tone="yellow"
          />
        </div>
      </div>
      <ContractsTable rowsData={rows} />
    </div>
  );
}
