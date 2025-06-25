"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeader } from "../ui/section-header";
import { CallButton } from "@/components/ui/call-button";
import { PiHeadsetDuotone } from "react-icons/pi";
import { Typography } from "@/components/ui/typography";
import { Shadow } from "../ui/shadow";
import { FadeInImage, StaggeredCards } from "../ui/animations";

const faqs = [
  {
    question: "Est-ce que les rendements sont garantis ?",
    answer:
      "Amazonia Investing applique une stratégie de trading à faible risque, conçue pour offrir une rentabilité durable. L'objectif est d'atteindre un rendement mensuel de 10%. Toutefois, comme tout investissement sur les marchés financiers, ce niveau de performance ne peut pas être garanti à 100%. Un rendement minimum de 10% par mois est cependant contractuellement garanti, sauf en cas de conditions exceptionnelles de marché.",
  },
  {
    question: "Puis-je récupérer mon capital plus tard ?",
    answer:
      "Non. Le capital investi est définitivement engagé et utilisé pour générer vos revenus mensuels. En signant le contrat, vous renoncez à la récupération de ce capital, en échange de rentes mensuelles à vie.",
  },
  {
    question: "Quels sont les risques liés à cet investissement ?",
    answer:
      "Comme tout placement financier, il existe un risque de perte partielle ou totale des fonds engagés. Cela dit, notre stratégie de trading est conçue pour limiter fortement les pertes, avec une approche prudente et optimisée depuis plusieurs années.",
  },
  {
    question: "Quand vais-je commencer à recevoir mes revenus ?",
    answer:
      "Dès que votre contrat est signé et vos fonds reçus, votre capital est investi. Vous commencez alors à percevoir vos revenus dès le mois suivant, selon la date précisée dans votre contrat.",
  },
  {
    question: "Comment les gains sont-ils versés ?",
    answer:
      "Les revenus mensuels sont versés directement par virement bancaire sur le compte que vous avez renseigné lors de la signature de votre contrat. Tout est automatisé et sécurisé.",
  },
  {
    question: "Puis-je investir plus que 1000€ ?",
    answer:
      "Oui. Il est tout à fait possible d'investir des montants plus élevés (5 000€, 10 000€, voire plus). Nous vous invitons dans ce cas à utiliser notre simulateur personnalisé ou à contacter notre équipe pour un accompagnement dédié.",
  },
  {
    question: "Qui gère mon argent et comment ?",
    answer:
      "Votre capital est géré par notre équipe de traders professionnels avec plus de 7 ans d'expérience sur les marchés financiers. Nous utilisons une stratégie éprouvée et sécurisée, conçue pour générer des revenus réguliers tout en minimisant les risques.",
  },
];

export function FaqSection() {
  return (
    <motion.section
      id="faq"
      className="py-20 md:py-32 text-white bg-black relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-150px" }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Shadow
          className="-top-40 left-[50%] -translate-x-[50%]"
          color="blue"
          size="lg"
          zIndex="z-0 opacity-30"
        />
      </div>

      <div className="container mx-auto px-4 relative">
        <SectionHeader
          badge="FAQ"
          title="Questions fréquentes sur Amazonia Investing"
          description="Tout ce que vous devez savoir avant d'investir."
          isSectionDark
        />

        <div className="relative">
          <div className="flex flex-col lg:flex-row gap-16 max-w-7xl mx-auto">
            <div className="w-full lg:w-[60%]">
              <Accordion
                type="single"
                collapsible
                className="w-full flex flex-col"
              >
                <StaggeredCards stagger={0.1} delay={0.4}>
                  {faqs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="border-gray-700 cursor-pointer"
                    >
                      <AccordionTrigger className="text-xl sm:text-2xl font-medium cursor-pointer">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-300 text-base sm:text-lg font-normal mb-4">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </StaggeredCards>
              </Accordion>
            </div>

            <div className="w-full lg:w-[40%]">
              <FadeInImage delay={0.4} className="lg:sticky lg:top-30">
                <div className="bg-blue-50 rounded-3xl p-8 text-black">
                  <div className="flex flex-col items-center text-center space-y-6">
                    <span className="rounded-full p-4 text-3xl border-2 text-blue-600 bg-blue-200 border-blue-400">
                      <PiHeadsetDuotone />
                    </span>

                    <Typography
                      as="h3"
                      variant="3xl"
                      weight="semibold"
                      className="mb-2"
                    >
                      Besoin de précisions avant d'investir ?
                    </Typography>

                    <Typography
                      as="p"
                      variant="xl"
                      weight="normal"
                      className="text-gray-600 mb-6"
                    >
                      Notre équipe est là pour répondre à toutes vos questions
                      et vous accompagner dans votre projet d'investissement.
                    </Typography>

                    <CallButton variant="blue" className="w-full" />
                  </div>
                </div>
              </FadeInImage>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
