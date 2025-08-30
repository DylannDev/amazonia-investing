import { Sidebar } from "@/components/dashboard/modern-side-bar";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/admin");
  // Optional: role check if exposed by your auth config
  // if ((session as any).user?.role !== "ADMIN") redirect("/admin?error=unauthorized");

  return (
    <div className="flex h-screen w-screen overflow-y-hidden overflow-x-auto">
      <Sidebar />
      <main className="flex-1 px-6 pt-10">{children}</main>
    </div>
  );
}

export default DashboardLayout;
