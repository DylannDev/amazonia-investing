"use client";
import React from "react";
import { LogOut } from "lucide-react";
import Tooltip from "./tooltip-sidebar";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

interface SidebarFooterProps {
  isCollapsed: boolean;
  onLogout: () => void;
}

function computeInitials(name?: string, email?: string): string {
  const source = name?.trim() || email?.trim() || "";
  if (!source) return "";
  const parts = source.split(" ").filter(Boolean);
  if (parts.length >= 2)
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  const single = parts[0] || source;
  return single.slice(0, 2).toUpperCase();
}

export function SidebarFooter({ isCollapsed, onLogout }: SidebarFooterProps) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const displayName = session?.user?.name || session?.user?.email || "";
  const initials =
    computeInitials(session?.user?.name, session?.user?.email) || "";

  async function handleLogout() {
    await authClient.signOut();
    onLogout?.();
    router.push("/admin");
  }
  return (
    <div className="mt-auto border-t border-gray-700">
      {/* Profile Section */}
      <div
        className={`border-b border-gray-700 ${
          isCollapsed ? "py-3 px-2" : "p-3"
        }`}
      >
        {!isCollapsed ? (
          <div className="flex items-center px-3 py-2 rounded-md transition-colors duration-200">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-gray-700 font-medium text-sm">
                {initials}
              </span>
            </div>
            <div className="flex-1 min-w-0 ml-2.5">
              <p className="text-lg font-medium text-white">{displayName}</p>
              <p className="text-sm text-gray-400">Administrateur</p>
            </div>
            <div
              className="w-2 h-2 bg-green-500 rounded-full ml-2"
              title="Online"
            />
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-9 h-9 bg-slate-200 rounded-full flex items-center justify-center">
                <span className="text-slate-700 font-medium text-sm">
                  {initials}
                </span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
            </div>
          </div>
        )}
      </div>

      {/* Logout Button */}
      <div className="p-3">
        <button
          onClick={handleLogout}
          className={`
            w-full flex items-center rounded-md text-left transition-all duration-200 group cursor-pointer
            text-red-500 hover:bg-red-300/70 hover:text-white
            ${isCollapsed ? "justify-center p-2.5" : "space-x-2.5 px-3 py-2.5"}
          `}
          title={isCollapsed ? "Déconnexion" : undefined}
        >
          <div className="flex items-center justify-center min-w-[24px]">
            <LogOut className="h-5 w-5 flex-shrink-0 text-red-500 group-hover:text-white" />
          </div>

          {!isCollapsed && <span className="text-base">Déconnexion</span>}

          {/* Tooltip for collapsed state */}
          {isCollapsed && <Tooltip children="Déconnexion" />}
        </button>
      </div>
    </div>
  );
}
