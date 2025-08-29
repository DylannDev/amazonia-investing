import React from "react";
import Tooltip from "./tooltip-sidebar";
import Link from "next/link";

interface NavigationItemProps {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  badge?: string;
  isActive: boolean;
  isCollapsed: boolean;
  onClick: (itemId: string) => void;
}

export function NavigationItem({
  id,
  name,
  icon: Icon,
  href,
  isActive,
  isCollapsed,
  onClick,
}: NavigationItemProps) {
  return (
    <li>
      <Link
        href={`/admin/${href}`}
        onClick={() => onClick(id)}
        className={`
          w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-md text-left transition-all duration-200 group cursor-pointer
          ${
            isActive
              ? "bg-white text-blue-300"
              : "text-gray-400 hover:text-white hover:bg-white/20"
          }
          ${isCollapsed ? "justify-center px-2" : ""}
        `}
      >
        <div className="flex items-center justify-center min-w-[24px]">
          <Icon
            className={`
              h-5 w-5 flex-shrink-0
              ${
                isActive
                  ? "text-blue-300"
                  : "text-gray-400 group-hover:text-white"
              }
            `}
          />
        </div>

        {!isCollapsed && (
          <div className="flex items-center justify-between w-full">
            <span
              className={`text-base ${
                isActive ? "font-medium" : "font-normal"
              }`}
            >
              {name}
            </span>
          </div>
        )}

        {/* Tooltip for collapsed state */}
        {isCollapsed && <Tooltip children={name} />}
      </Link>
    </li>
  );
}
