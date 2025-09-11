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
    <div className="flex min-h-[100dvh] h-full">
      <Sidebar />
      <main className="w-full overflow-y-hidden px-6">{children}</main>
    </div>
  );
}

export default DashboardLayout;
