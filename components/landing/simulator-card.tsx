"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ExampleCard } from "./example-card";
import { formatNumber } from "@/lib/utils";

const examples = [
  { investment: 1000, monthlyReturn: 175, variant: "blue" as const },
  { investment: 2000, monthlyReturn: 350, variant: "green" as const },
  { investment: 5000, monthlyReturn: 875, variant: "red" as const },
];

export function SimulatorCard() {
  const [investment, setInvestment] = useState<string>("");

  const calculateReturn = (amount: number) => {
    return amount * 0.175;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d*$/.test(value)) {
      setInvestment(value);
    }
  };

  const monthlyReturn = investment ? calculateReturn(Number(investment)) : 0;
  const yearlyReturn = monthlyReturn * 12;
  const threeYearReturn = yearlyReturn * 3;

  return (
    <div className="mx-auto max-w-4xl">
      <Card className="p-12">
        <div className="mb-8">
          <Label
            htmlFor="investment"
            className="mb-2 block text-xl font-medium"
          >
            Montant de votre investissement (€)
          </Label>
          <div className="relative">
            <Input
              id="investment"
              type="text"
              value={investment}
              onChange={handleChange}
              placeholder="Ex: 500"
              className="py-6 pr-12 text-lg placeholder:text-base placeholder:font-normal border-2 border-gray-200 rounded-lg focus:border-blue-300"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2">€</span>
          </div>
        </div>

        {investment ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Card
                variant="blue"
                className="flex items-center justify-between rounded-xl col-span-2"
              >
                <div className="text-lg">Revenu mensuel estimé</div>
                <div className="text-2xl font-semibold">
                  {formatNumber(monthlyReturn)} €
                </div>
              </Card>
              <Card variant="green" className="rounded-xl">
                <div className="text-lg">Revenu annuel estimé</div>
                <div className="text-2xl font-semibold">
                  {formatNumber(yearlyReturn)} €
                </div>
              </Card>
              <Card variant="red" className="rounded-xl">
                <div className="text-lg">Revenu sur 3 ans estimé</div>
                <div className="text-2xl font-semibold">
                  {formatNumber(threeYearReturn)} €
                </div>
              </Card>
            </div>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <div className="text-center text-lg text-gray-600">
              Exemples de rendements mensuels :
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {examples.map((example) => (
                <ExampleCard
                  key={example.investment}
                  investment={example.investment}
                  monthlyReturn={example.monthlyReturn}
                  variant={example.variant}
                />
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
