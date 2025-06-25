import { Container } from "@/components/ui/container";
import { SectionHeader } from "../ui/section-header";
import {
  PiPiggyBankDuotone,
  PiHouseLineDuotone,
  PiBuildingsDuotone,
  PiChartLineDownDuotone,
} from "react-icons/pi";
import { PainCard } from "./pain-card";
import { StaggeredCards } from "../ui/animations";

const pains = [
  {
    icon: <PiPiggyBankDuotone />,
    title: "Livret A : un refuge devenu perdant",
    description:
      "3% de rendement quand l'inflation dépasse 5%. Résultat : votre pouvoir d'achat s'érode doucement, mais sûrement. Amazonia Investing vous propose un rendement net mensuel bien supérieur, sans que votre capital perde de sa valeur face à l'inflation.",
    color: "blue" as const,
  },
  {
    icon: <PiHouseLineDuotone />,
    title: "Immobilier : capital bloqué, rentabilité incertaine",
    description:
      "Entre impayés, travaux, fiscalité et gestion locative, ce pilier d'investissement perd en efficacité, surtout si vous débutez. Amazonia Investing offre un revenu mensuel sans gestion, sans frais cachés et sans immobilisation de plusieurs dizaines de milliers d'euros.",
    color: "green" as const,
  },
  {
    icon: <PiBuildingsDuotone />,
    title: "SCPI : faible rendement, frais élevés",
    description:
      "Des rendements bruts autour de 4,5% largement rognés par les frais d'entrée, de gestion, et une liquidité limitée. Avec Amazonia Investing, pas de frais d'entrée, un rendement plus élevé, et des versements mensuels dès le premier mois.",
    color: "red" as const,
  },
  {
    icon: <PiChartLineDownDuotone />,
    title: "Bourse : des gains possibles, mais pour les initiés",
    description:
      "Sans une vraie stratégie, la volatilité fait peur. Beaucoup achètent au plus haut, vendent au plus bas. Pas de revenus, que du stress. Amazonia Investing vous épargne l'analyse des marchés : votre argent est géré par une équipe expérimentée, et vous recevez vos gains chaque mois, sans stress.",
    color: "yellow" as const,
  },
];

export function PainSection() {
  return (
    <section className="relative pt-12 pb-20 sm:pt-32 sm:pb-20">
      <Container>
        <div className="text-center space-y-6 mb-12">
          <SectionHeader
            badge="Diversification"
            title="Diversifiez vos revenus intelligemment, encore faut-il choisir les bons leviers."
            description="Amazonia Investing s'intègre parfaitement à une stratégie de diversification, une porte d'entrée simple pour les novices, un complément performant pour les investisseurs confirmés, avec un rendement mensuel élevé et zéro gestion."
          />
        </div>

        <StaggeredCards
          stagger={0.2}
          delay={0.4}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4"
        >
          {pains.map((card, index) => (
            <PainCard
              key={index}
              icon={card.icon}
              title={card.title}
              description={card.description}
              color={card.color}
            />
          ))}
        </StaggeredCards>
      </Container>
    </section>
  );
}
