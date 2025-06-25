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
import InfoCard from "../ui/infos-card";
import { Shadow } from "../ui/shadow";
import { Container } from "../ui/container";
import { FadeInImage, StaggeredCards } from "../ui/animations";

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
      "Chaque mois, vous recevez jusqu'à 10% de rendement sur votre investissement initial, directement sur votre compte. Ces rentes mensuelles sont versées à vie, tant que les conditions du contrat sont respectées. C'est votre argent qui travaille pour vous, de façon automatique et régulière.",
    color: "red" as const,
  },
];

export function HowItWorksSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="py-20 md:py-32 bg-black text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Shadow
          className="-top-60 -left-60"
          color="blue"
          size="md"
          zIndex="z-0"
        />
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col lg:flex-row items-start gap-24">
          <div className="w-full lg:w-1/2">
            <SectionHeader
              badge="comment ça marche ?"
              title="3 étapes simples pour générer des revenus passifs chaque mois"
              textAlign="left"
              isSectionDark
            />

            <Accordion type="single" collapsible className="w-full mt-8">
              <StaggeredCards stagger={0.2} delay={0.4}>
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
              </StaggeredCards>
            </Accordion>
          </div>

          {/* Image à droite */}
          <FadeInImage delay={0.6} className="relative w-full lg:w-1/2 h-full">
            <div className="relative w-full h-full aspect-square lg:aspect-2/3 xl:aspect-square max-h-[700px] rounded-4xl overflow-hidden">
              <Image
                src="/client-1.jpg"
                alt="Investisseur satisfait consultant ses revenus mensuels Amazonia Investing"
                fill
                className="object-cover"
                quality={100}
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
              />
            </div>
            <InfoCard
              image="/infocard-process-1.svg"
              className="bottom-30 min-[500px]:bottom-36 sm:bottom-47 -left-[30px] min-[500px]:left-0 sm:-left-4 md:-left-8 scale-60 min-[500px]:scale-80 sm:scale-100 w-[232px] h-[85px]"
            />
            <InfoCard
              image="/infocard-process-2.svg"
              className="bottom-5 sm:bottom-10 -left-8 min-[500px]:left-0 sm:-left-4 md:-left-8 scale-60 min-[500px]:scale-80 sm:scale-100 w-[244px] h-[136px]"
            />
          </FadeInImage>
        </div>
      </Container>
    </motion.section>
  );
}
