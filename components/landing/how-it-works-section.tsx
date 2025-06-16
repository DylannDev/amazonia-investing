"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "../ui/section-header";
import { StepAccordion } from "./step-accordion";
import {
  PiChartLineUpDuotone,
  PiHandCoinsDuotone,
  PiWalletDuotone,
} from "react-icons/pi";
import Image from "next/image";
import { Accordion } from "@/components/ui/accordion";

const steps = [
  {
    icon: <PiWalletDuotone />,
    title: "Choix du montant et signature du contrat",
    description:
      "Vous pouvez investir à partir de 150€. Contactez-nous pour définir vos objectifs, puis si vous souhaitez investir, vous recevrez un contrat clair, qui vous engage et nous autorise à gérer votre capital sur les marchés financiers pour votre compte. En signant ce contrat, vous renoncez à la récupération de votre capital initial.",
    color: "blue" as const,
  },
  {
    icon: <PiChartLineUpDuotone />,
    title: "Votre capital est investi et géré pour vous",
    description:
      "Dès que vos fonds sont reçus, votre capital est investi sur les marchés financiers, selon une stratégie de trading rigoureuse et à faible risque. L'ensemble de la gestion est assurée par notre équipe de traders. Vous n'avez rien à faire, tout est géré pour vous.",
    color: "green" as const,
  },
  {
    icon: <PiHandCoinsDuotone />,
    title: "Vous percevez vos rentes chaque mois",
    description:
      "Chaque mois, vous recevez jusqu'à 17,5% de rendement sur votre investissement initial, directement sur votre compte. Ces rentes mensuelles sont versées à vie, tant que les conditions du contrat sont respectées. C'est votre argent qui travaille pour vous, de façon automatique et régulière.",
    color: "red" as const,
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-20 md:py-32 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-start gap-24">
          <div className="w-full lg:w-1/2">
            <motion.div
              className="mx-auto max-w-3xl text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <SectionHeader
                badge="comment ça marche ?"
                title="3 étapes simples pour générer des revenus passifs chaque mois"
                textAlign="left"
                sectionDark
              />
            </motion.div>

            <Accordion type="single" collapsible className="w-full mt-8">
              {steps.map((step, index) => (
                <StepAccordion
                  key={step.title}
                  icon={step.icon}
                  title={step.title}
                  description={step.description}
                  index={index}
                  color={step.color}
                />
              ))}
            </Accordion>
          </div>

          {/* Image à droite */}
          <div className="relative w-full lg:w-1/2 h-full aspect-square rounded-4xl overflow-hidden">
            <Image
              src="/client-1.jpg"
              alt="Investisseur satisfait Amazonia Investing"
              fill
              className="object-cover"
              quality={80}
              sizes="100vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
