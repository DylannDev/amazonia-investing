"use client";

import { ReactNode } from "react";
import { FloatingCoins } from "./floating-coins";
import { ArrowButton } from "./arrow-button";
import { Card } from "./card";

type CardColor = "blue" | "green" | "red" | "yellow";

interface BenefitCardProps {
  icon: ReactNode;
  investment: number;
  monthlyReturn: number;
  yearlyReturn: number;
  threeYearReturn: number;
  color: CardColor;
  image: string;
  size: number;
  index?: number;
}

const colorClasses: Record<CardColor, string> = {
  blue: "text-blue-900 bg-blue-200 border-blue-300",
  green: "text-green-900 bg-green-200 border-green-300",
  red: "text-red-900 bg-red-200 border-red-300",
  yellow: "text-yellow-900 bg-yellow-200 border-yellow-300",
};

export function BenefitCard({
  icon,
  investment,
  monthlyReturn,
  yearlyReturn,
  threeYearReturn,
  color,
  image,
  size,
  index = 0,
}: BenefitCardProps) {
  return (
    <Card index={index}>
      <div className="pt-2 mb-4 flex flex-col items-center justify-center gap-2">
        <div className="relative w-full h-[75px] flex justify-center mb-4">
          <FloatingCoins
            src={image}
            alt="Icone pièce Amazonia Investing"
            className="top-[50%] translate-y-[-50%]"
            delay={0}
            size={size}
          />
        </div>
        <div className="text-4xl font-bold">{investment}€</div>
        <div className="text-lg text-gray-600">Investissement initial</div>
      </div>
      <div className={`rounded-xl px-6 ${colorClasses[color]}`}>
        <div
          className={`flex items-center justify-between py-6 border-b-2 border-dashed ${colorClasses[color]}`}
        >
          <span className="text-base">Revenu mensuel</span>
          <div className="text-2xl font-semibold">{monthlyReturn}€</div>
        </div>
        <div
          className={`flex items-center justify-between py-6 border-b-2 border-dashed ${colorClasses[color]}`}
        >
          <span className="text-base">Revenu annuel</span>
          <div className="text-2xl font-semibold">{yearlyReturn}€</div>
        </div>
        <div className="flex items-center justify-between py-6">
          <span className="text-base">Revenu sur 3 ans</span>
          <div className="text-2xl font-semibold">{threeYearReturn}€</div>
        </div>
      </div>
      <div className="mt-6">
        <ArrowButton
          label={`Investir ${investment}€`}
          variant="black"
          className="w-full"
        />
      </div>
    </Card>
  );
}
