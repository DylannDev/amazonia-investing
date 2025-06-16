"use client";

import Image from "next/image";
import { HighlightCard } from "@/components/ui/highlight-card";
import { SectionHeader } from "@/components/ui/section-header";

const highlights = [
  {
    number: "17,5%",
    label: "de rendement mensuel régulier versé à vie, sans gestion ni stress",
    color: "blue" as const,
  },
  {
    number: "6 mois",
    label: "pour rentabiliser totalement votre investissement initial",
    color: "green" as const,
  },
  {
    number: "+8 ans",
    label: "d'expérience en trading sur les marchés financiers",
    color: "red" as const,
  },
  {
    number: "+100",
    label:
      "clients accompagnés et satisfaits de leurs revenus mensuels passifs",
    color: "yellow" as const,
  },
];

export function HighlightsSection() {
  return (
    <section className="py-20 sm:py-32">
      <div className="container mx-auto px-4">
        <SectionHeader
          badge="Nos Forces"
          title="4 raisons d'investir chez Amazonia Investing"
          description="Rendement élevé, rentabilité rapide, gestion experte : découvrez pourquoi Amazonia Investing séduit autant d'investisseurs"
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Grille de cartes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {highlights.map((highlight, index) => (
              <HighlightCard
                key={index}
                number={highlight.number}
                label={highlight.label}
                color={highlight.color}
              />
            ))}
          </div>

          {/* Image à droite */}
          <div className="relative w-full h-full aspect-[4/3] rounded-4xl overflow-hidden">
            <Image
              src="/client-1.jpg"
              alt="Investisseur satisfait Amazonia Investing"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
