"use client";

import React from "react";
import { FrequencyFilter } from "@/components/dashboard/frequency-filter";
import { DatePicker } from "@/components/dashboard/datepicker";
import { SearchInput } from "@/components/dashboard/search-input";

interface PaymentsControlsProps {
  selectedFrequency: string;
  onFrequencyChange: (value: string) => void;
  search: string;
  onSearchChange: (value: string) => void;
}

export function PaymentsControls({
  selectedFrequency,
  onFrequencyChange,
  search,
  onSearchChange,
}: PaymentsControlsProps) {
  return (
    <div className="flex flex-wrap gap-4 items-end justify-between mb-6">
      <div className="flex gap-4 flex-wrap items-center justify-between">
        <FrequencyFilter
          selectedFrequency={selectedFrequency}
          onFrequencyChange={onFrequencyChange}
        />
        <DatePicker />
      </div>
      <SearchInput
        placeholder="Rechercher un client..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-64"
      />
    </div>
  );
}
