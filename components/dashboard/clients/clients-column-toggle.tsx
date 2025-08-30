"use client";

import React from "react";
import { ChevronDownIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/dashboard/dropdown-menu";

interface ClientsColumnToggleProps {
  allColumns: readonly string[];
  visibleColumns: string[];
  onToggle: (col: string) => void;
}

export function ClientsColumnToggle({
  allColumns,
  visibleColumns,
  onToggle,
}: ClientsColumnToggleProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <span>
          Afficher / Masquer <ChevronDownIcon className="w-4 h-4" />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        {allColumns.map((col) => (
          <DropdownMenuCheckboxItem
            key={col}
            checked={visibleColumns.includes(col)}
            onCheckedChange={() => onToggle(col)}
          >
            {col}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ClientsColumnToggle;
