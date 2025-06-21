"use client";

import { motion } from "framer-motion";
import { Typography } from "../ui/typography";
import { SectionHeader } from "../ui/section-header";
import { SimulatorCard } from "./simulator-card";

export function SimulatorSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader
            badge="Simulateur"
            title="Simulez vos revenus mensuels en quelques secondes"
            description="Découvrez combien vous pourriez gagner chaque mois avec Amazonia
            Investing."
          />
        </motion.div>

        <SimulatorCard />

        <motion.div
          className="rounded-3xl text-yellow-900 p-8 sm:p-12 text-center bg-yellow-200 col-span-3 mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
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
            que l'objectif soit un rendement de 17,5% par mois, ce niveau n'est
            pas garanti à 100%, comme tout investissement lié aux marchés
            financiers. Toutefois, un rendement minimum de 10% mensuel est
            contractuellement garanti, sauf conditions exceptionnelles de
            marché.
          </Typography>
        </motion.div>
      </div>
    </section>
  );
}
