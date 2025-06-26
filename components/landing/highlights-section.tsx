import Image from "next/image";
import { HighlightCard } from "@/components/ui/highlight-card";
import { SectionHeader } from "@/components/ui/section-header";
import { FadeInImage, StaggeredCards } from "../ui/animations";

const highlights = [
  {
    number: "10%",
    label: "de rendement mensuel régulier versé à vie, sans gestion ni stress",
    color: "blue" as const,
  },
  {
    number: "10 mois",
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
          <StaggeredCards
            stagger={0.2}
            delay={0.4}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
          >
            {highlights.map((highlight, index) => (
              <HighlightCard
                key={index}
                number={highlight.number}
                label={highlight.label}
                color={highlight.color}
              />
            ))}
          </StaggeredCards>

          {/* Image à droite */}
          <FadeInImage
            delay={1}
            direction="y"
            className="relative w-full h-full aspect-[4/3] rounded-4xl overflow-hidden"
          >
            <Image
              src="/happy-trader.webp"
              alt="Trader professionnel célébrant ses résultats positifs en trading - Amazonia Investing"
              fill
              className="object-cover object-right"
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading="lazy"
            />
          </FadeInImage>
        </div>
      </div>
    </section>
  );
}
