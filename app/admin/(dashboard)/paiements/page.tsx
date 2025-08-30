import PaymentsTable from "@/components/dashboard/payments-table";
import { getContractsData, getPaymentsData } from "@/lib/payments";

export default async function paiementsPage() {
  const payments = await getPaymentsData();
  const contracts = await getContractsData();

  return (
    <div className="container mx-auto w-full flex flex-col gap-10">
      <div className="">
        <h1 className="text-2xl font-bold text-black">Gestion des paiements</h1>
        <p className="text-gray-600">
          Suivi des paiements hebdomadaires et mensuels
        </p>
      </div>

      <PaymentsTable payments={payments} contracts={contracts} />
    </div>
  );
}
