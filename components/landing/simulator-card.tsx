"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SimulatorExamples } from "./simulator-examples";
import { SimulatorResults } from "./simulator-results";
import { CallButton } from "../ui/call-button";

export function SimulatorCard() {
  const [investment, setInvestment] = useState<string>("");

  const calculateReturn = (amount: number) => {
    return amount * 0.1;
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
      <Card className="p-6 sm:p-12">
        <div className="mb-8">
          <Label
            htmlFor="investment"
            className="mb-2 block text-xl font-medium"
          >
            Montant de votre investissement
          </Label>
          <div className="relative">
            <Input
              id="investment"
              type="text"
              value={investment}
              onChange={handleChange}
              placeholder="Ex: 500"
              className="py-6 pr-12 text-lg placeholder:text-base placeholder:font-normal rounded-lg focus:border-blue-300"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2">€</span>
          </div>
        </div>

        {investment ? (
          <SimulatorResults
            monthlyReturn={monthlyReturn}
            yearlyReturn={yearlyReturn}
            threeYearReturn={threeYearReturn}
          />
        ) : (
          <SimulatorExamples />
        )}
      </Card>
      <div className="flex justify-center mt-12">
        <CallButton className="w-fit" />
      </div>
    </div>
  );
}
