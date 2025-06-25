import { Typography } from "../ui/typography";
import { SectionHeader } from "../ui/section-header";
import { SimulatorCard } from "./simulator-card";
import FadeInText, { FadeInImage } from "../ui/animations";

export function SimulatorSection() {
  return (
    <section id="simulator" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <SectionHeader
          badge="Simulateur"
          title="Simulez vos revenus mensuels en quelques secondes"
          description="Découvrez combien vous pourriez gagner chaque mois avec Amazonia
            Investing."
        />
        <FadeInImage delay={0.4}>
          <SimulatorCard />
        </FadeInImage>

        <FadeInText
          delay={0.6}
          className="rounded-3xl text-yellow-900 p-8 sm:p-12 text-center bg-yellow-200 col-span-3 mt-16"
        >
          <Typography
            as="p"
            variant="xl"
            weight="normal"
            className="mb-0 text-justify"
          >
            <span className="font-semibold">⚠️ Important :</span> Le capital
            investi n'est pas récupérable, mais il permet de générer des revenus
            mensuels à vie. Amazonia Investing applique une stratégie de trading
            à faible risque, conçue pour offrir une rentabilité durable. Bien
            que l'objectif soit un rendement de 10% par mois, ce niveau n'est
            pas garanti à 100%, comme tout investissement lié aux marchés
            financiers. Toutefois, un rendement minimum de 10% mensuel est
            contractuellement garanti, sauf conditions exceptionnelles de
            marché.
          </Typography>
        </FadeInText>
      </div>
    </section>
  );
}
