import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";

interface SimulatorResultsProps {
  monthlyReturn: number;
  yearlyReturn: number;
  threeYearReturn: number;
}

export function SimulatorResults({
  monthlyReturn,
  yearlyReturn,
  threeYearReturn,
}: SimulatorResultsProps) {
  const revenueCards = [
    {
      label: "Revenu mensuel estimé",
      value: monthlyReturn,
      variant: "blue" as const,
    },
    {
      label: "Revenu annuel estimé",
      value: yearlyReturn,
      variant: "green" as const,
    },
    {
      label: "Revenu sur 3 ans estimé",
      value: threeYearReturn,
      variant: "red" as const,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        {revenueCards.map((card) => (
          <Card key={card.label} variant={card.variant} className="rounded-xl">
            <div className="text-lg">{card.label}</div>
            <div className="text-2xl font-semibold">
              {formatNumber(card.value)} €
            </div>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
