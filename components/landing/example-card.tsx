"use client";

import { Card } from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";

interface ExampleCardProps {
  investment: number;
  monthlyReturn: number;
  variant: "blue" | "green" | "red" | "yellow";
}

export function ExampleCard({
  investment,
  monthlyReturn,
  variant,
}: ExampleCardProps) {
  return (
    <Card variant={variant} className="text-center rounded-xl border-none">
      <div className="text-xl font-normal">
        {formatNumber(investment)}€ investis
      </div>
      <div className="text-2xl font-semibold">
        {formatNumber(monthlyReturn)}€/mois
      </div>
    </Card>
  );
}
