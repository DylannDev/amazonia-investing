"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "../ui/section-header";
import {
  PiCellSignalFullDuotone,
  PiCellSignalHighDuotone,
  PiCellSignalMediumDuotone,
} from "react-icons/pi";
import { ArrowButton } from "../ui/arrow-button";
import { Typography } from "../ui/typography";
import { CallButton } from "../ui/call-button";
import { BenefitCard } from "../ui/benefit-card";

const benefits = [
  {
    icon: <PiCellSignalMediumDuotone />,
    investment: 150,
    monthlyReturn: 26.25,
    yearlyReturn: 315,
    threeYearReturn: 945,
    color: "blue" as const,
    image: "coin-3.svg",
    size: 55,
  },
  {
    icon: <PiCellSignalHighDuotone />,
    investment: 500,
    monthlyReturn: 87.5,
    yearlyReturn: 1050,
    threeYearReturn: 3150,
    color: "green" as const,
    image: "coin-1.svg",
    size: 65,
  },
  {
    icon: <PiCellSignalFullDuotone />,
    investment: 1000,
    monthlyReturn: 175,
    yearlyReturn: 2100,
    threeYearReturn: 6300,
    color: "red" as const,
    image: "coin-2.svg",
    size: 75,
  },
];

export function BenefitsSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <SectionHeader
          badge="Votre Investissement"
          title="Rentabilisez votre investissement en 6 mois et percevez des revenus à vie"
          description="Dès 150€, commencez à percevoir jusqu'à 17,5% de rendement mensuel à vie. Voici ce que ça représente concrètement :"
        />

        <div className="grid gap-6 md:grid-cols-3">
          {benefits.map((benefit, index) => (
            <BenefitCard key={benefit.investment} {...benefit} index={index} />
          ))}

          <div className="flex items-center justify-between gap-4 p-12 rounded-3xl bg-yellow-200 col-span-3">
            <div>
              <Typography
                as="h3"
                variant="4xl"
                weight="semibold"
                lineHeight="tightest"
                className="mb-4 text-balance"
              >
                Vous souhaitez investir un montant plus important ?
              </Typography>
              <Typography
                as="p"
                variant="xl"
                weight="normal"
                className="mb-0 text-balance text-gray-600"
              >
                Simulez votre retour sur investissement dès maintenant
              </Typography>
            </div>
            <div className="flex gap-4">
              <ArrowButton
                label="Simuler mes revenus"
                variant="black"
                className="w-fit"
              />
              <CallButton variant="outline" className="w-fit" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
