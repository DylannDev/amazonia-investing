"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SectionHeader } from "../ui/section-header";
import { Typography } from "../ui/typography";
import { cn } from "@/lib/utils";
import { StaggeredCards } from "../ui/animations";

const trustCards = [
  {
    image: "/trust-1.webp",
    imgClassName: "object-center",
    text: "Une stratégie solide, testée sur le long terme",
    alt: "Trader professionnel en train de travailler",
  },
  {
    image: "/trust-3.webp",
    imgClassName: "object-center",
    text: "Engagement contractuel clair, sans frais cachés",
    alt: "Client qui signe un contrat",
  },
  {
    image: "/trust-2.webp",
    imgClassName: "object-right",
    text: "Une équipe d'experts dédiée, pas un système automatisé",
    alt: "Trader professionnel qui appelle un client",
  },
  {
    image: "/trust-4.webp",
    imgClassName: "object-center",
    text: "Rendements mensuels versés sans interruption",
    alt: "Cliente heureuse qui reçoit sa rente",
  },
];

export function TrustSection() {
  return (
    <section className="pt-20 pb-10 md:pt-32 md:pb-20 relative">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <SectionHeader
            badge="pourquoi nous faire confiance ?"
            title="Des dizaines d'investisseurs nous font déjà confiance"
            description="Notre modèle repose sur la transparence, la stabilité, et l'humain, voici ce qui fait la force d'Amazonia Investing."
          />
        </div>

        <StaggeredCards
          stagger={0.2}
          delay={0.4}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {trustCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative h-[350px] sm:h-[550px] overflow-hidden rounded-4xl">
                <Image
                  src={card.image}
                  alt={`${card.alt} - Amazonia Investing`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className={cn(card.imgClassName, "object-cover")}
                  loading="lazy"
                />
                <div className="absolute top-0 flex items-center justify-center w-full p-6 bg-black/30 transition-all duration-150 group-hover:bg-black/40">
                  <Typography
                    as="p"
                    variant="2xl"
                    weight="normal"
                    lineHeight="tight"
                    className="text-white text-center"
                  >
                    {card.text}
                  </Typography>
                </div>
              </div>
            </motion.div>
          ))}
        </StaggeredCards>
      </div>
    </section>
  );
}
