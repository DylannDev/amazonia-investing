"use client";

import React, { useState, useEffect } from "react";
import { FileText, Users, Banknote, UserPlus } from "lucide-react";
import { NavigationItem } from "./navigation-item";
import { SidebarHeader } from "./sidebar-header";
import { SidebarFooter } from "./sidebar-footer";
import { MobileOverlay } from "./mobile-overlay";
import { usePathname } from "next/navigation";

interface NavigationItemType {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  badge?: string;
}

interface SidebarProps {
  className?: string;
}

// Navigation items
const navigationItems: NavigationItemType[] = [
  {
    id: "clients",
    name: "Clients",
    icon: Users,
    href: "clients",
  },
  {
    id: "contrats",
    name: "Contrats & Rendements",
    icon: FileText,
    href: "contrats",
  },
  {
    id: "paiements",
    name: "Suivi des paiements",
    icon: Banknote,
    href: "paiements",
  },
];

export function Sidebar({ className = "" }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  // Auto-open sidebar on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const handleItemClick = (itemId: string) => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  const handleLogout = () => {
    handleItemClick("logout");
    // Add logout logic here
  };

  function getActiveItemId(): string {
    if (!pathname) return "clients";
    if (pathname.startsWith("/admin/paiements")) return "paiements";
    if (pathname.startsWith("/admin/contrats")) return "contrats";
    if (pathname.startsWith("/admin/clients")) return "clients";
    return "clients";
  }
  const activeItemId = getActiveItemId();

  return (
    <>
      <MobileOverlay isOpen={isOpen} onToggle={toggleSidebar} />

      {/* Sidebar */}
      <div
        className={`
          sticky top-0 self-start h-[100dvh] bg-black border-r border-gray-700 z-40 transition-all duration-300 ease-in-out flex flex-col
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          ${isCollapsed ? "w-36" : "w-[320px]"}
          md:translate-x-0
          ${className}
        `}
      >
        <SidebarHeader
          isCollapsed={isCollapsed}
          onToggleCollapse={toggleCollapse}
        />

        {/* Navigation */}
        <nav className="flex-1 px-5 py-10 overflow-y-auto">
          <ul className="space-y-0.5">
            {navigationItems.map((item) => (
              <NavigationItem
                key={item.id}
                {...item}
                isActive={activeItemId === item.id}
                isCollapsed={isCollapsed}
                onClick={handleItemClick}
              />
            ))}
          </ul>
        </nav>

        <SidebarFooter isCollapsed={isCollapsed} onLogout={handleLogout} />
      </div>
    </>
  );
}
