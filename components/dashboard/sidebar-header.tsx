import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Logo } from "../ui/logo";

interface SidebarHeaderProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function SidebarHeader({
  isCollapsed,
  onToggleCollapse,
}: SidebarHeaderProps) {
  return (
    <div className="flex items-center gap-4 justify-between py-10 px-5 border-b border-gray-700">
      {!isCollapsed && (
        <div className="flex gap-4 items-center">
          <Logo variant="illustration" className="w-12 h-12" />

          <div className="flex flex-col">
            <span className="font-medium text-white text-lg whitespace-nowrap">
              Amazonia Investing
            </span>
            <span className="text-sm text-gray-400">Admin Dashboard</span>
          </div>
        </div>
      )}

      {isCollapsed && <Logo variant="illustration" className="w-12 h-12" />}

      {/* Desktop collapse button */}
      <div className="group cursor-pointer">
        <button
          onClick={onToggleCollapse}
          className="hidden md:flex p-1.5 rounded-md bg-white/20 group-hover:bg-white transition-all duration-200 cursor-pointer"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-300 cursor-pointer" />
          ) : (
            <ChevronLeft className="h-4 w-4 text-gray-400 group-hover:text-blue-300 cursor-pointer" />
          )}
        </button>
      </div>
    </div>
  );
}
