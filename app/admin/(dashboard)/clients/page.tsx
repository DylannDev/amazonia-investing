import ClientsTable from "@/components/dashboard/clients-table";
import { getClientsWithMainContract } from "@/lib/clients";
import AddClientDialogButton from "@/components/dashboard/clients/add-client-dialog-button";

export default async function ClientsPage() {
  const rows = await getClientsWithMainContract();
  return (
    <div className="container mx-auto w-full flex flex-col gap-10 overflow-x-hidden">
      <div className="flex justify-between w-full items-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-black">Gestion des clients</h1>
          <p className="text-gray-600">
            Liste complète des investisseurs et de leurs informations
          </p>
        </div>
        <AddClientDialogButton />
      </div>

      <ClientsTable data={rows} />
    </div>
  );
}
