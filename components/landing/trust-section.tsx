"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "../ui/section-header";
import { Typography } from "../ui/typography";
import { cn } from "@/lib/utils";

const trustCards = [
  {
    image: "/trust-1.jpg",
    imgClassName: "bg-center",
    text: "Une stratégie solide, testée sur le long terme",
  },
  {
    image: "/trust-3.jpg",
    imgClassName: "bg-center",
    text: "Engagement contractuel clair, sans frais cachés",
  },
  {
    image: "/trust-2.jpg",
    imgClassName: "bg-right",
    text: "Une équipe d'experts dédiée, pas un système automatisé",
  },
  {
    image: "/trust-4.jpg",
    imgClassName: "bg-center",
    text: "Rendements mensuels versés sans interruption",
  },
];

export function TrustSection() {
  return (
    <section className="pt-20 pb-10 md:pt-32 md:pb-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          className="mx-auto max-w-3xl text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader
            badge="pourquoi nous faire confiance ?"
            title="Des dizaines d'investisseurs nous font déjà confiance"
            description="Notre modèle repose sur la transparence, la stabilité, et l'humain, voici ce qui fait la force d'Amazonia Investing."
          />
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {trustCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative h-[350px] sm:h-[550px] overflow-hidden rounded-4xl transition-all duration-300">
                <div
                  className={cn("absolute inset-0 bg-cover", card.imgClassName)}
                  style={{ backgroundImage: `url(${card.image})` }}
                />
                <div className="absolute top-0 flex items-center justify-center w-full p-6 bg-black/30 transition-all duration-300 group-hover:bg-black/40">
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
        </div>
      </div>
    </section>
  );
}
