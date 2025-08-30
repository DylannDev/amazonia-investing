"use client";

import React from "react";
import { StatsCard } from "@/components/dashboard/stats-card";
import {
  CalendarRange,
  Calendar1,
  CalendarPlus,
  WalletMinimal,
} from "lucide-react";

interface PaymentsStatsCardsProps {
  totalWeekly: string;
  totalMonthly: string;
  totalGlobal: string;
  totalRemaining: string;
  weeklySubtitle: string;
  monthlySubtitle: string;
  globalSubtitle: string;
  remainingSubtitle: string;
}

export function PaymentsStatsCards({
  totalWeekly,
  totalMonthly,
  totalGlobal,
  totalRemaining,
  weeklySubtitle,
  monthlySubtitle,
  globalSubtitle,
  remainingSubtitle,
}: PaymentsStatsCardsProps) {
  return (
    <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <StatsCard
        title="Total hebdomadaire"
        value={totalWeekly}
        subtitle={weeklySubtitle}
        icon={
          <CalendarRange
            strokeWidth={1.5}
            className="h-8 w-8 text-blue-600"
            aria-hidden="true"
          />
        }
        tone="blue"
      />
      <StatsCard
        title="Total mensuel"
        value={totalMonthly}
        subtitle={monthlySubtitle}
        icon={
          <Calendar1
            strokeWidth={1.5}
            className="h-8 w-8 text-blue-600"
            aria-hidden="true"
          />
        }
        tone="blue"
      />
      <StatsCard
        title="Total global"
        value={totalGlobal}
        subtitle={globalSubtitle}
        icon={
          <CalendarPlus
            strokeWidth={1.5}
            className="h-8 w-8 text-green-600"
            aria-hidden="true"
          />
        }
        tone="green"
      />
      <StatsCard
        title="Restant à payer"
        value={totalRemaining}
        subtitle={remainingSubtitle}
        icon={
          <WalletMinimal
            strokeWidth={1.5}
            className="h-8 w-8 text-orange-600"
            aria-hidden="true"
          />
        }
        tone="red"
      />
    </div>
  );
}
