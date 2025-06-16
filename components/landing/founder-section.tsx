"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const keyPoints = [
  "7 ans d'expérience sur les marchés financiers",
  "Stratégie à faible risque",
  "Modèle testé avec des dizaines de clients",
];

export function FounderSection() {
  return (
    <section className="bg-muted/50 py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
              Un trader indépendant au service de votre performance
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="aspect-square overflow-hidden rounded-lg">
                <img
                  src="https://placekitten.com/600/600"
                  alt="Jonathan, fondateur d'Amazonia Investing"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 hidden rounded-lg bg-card p-4 shadow-lg md:block">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span className="text-sm font-medium">
                    Trader professionnel
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col justify-center"
            >
              <Card>
                <p className="mb-6 text-lg text-muted-foreground">
                  Jonathan, fondateur d'Amazonia Investing, a passé plus de 7
                  ans sur les marchés financiers à développer et perfectionner
                  sa stratégie de trading. Son approche unique, combinant
                  analyse technique et gestion rigoureuse du risque, lui a
                  permis d'obtenir des résultats exceptionnels pour ses clients.
                </p>

                <div className="space-y-4">
                  {keyPoints.map((point, index) => (
                    <motion.div
                      key={point}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span className="text-foreground">{point}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 rounded-lg bg-primary/5 p-4">
                  <p className="text-sm text-muted-foreground">
                    "Mon objectif est de rendre l'investissement accessible à
                    tous, tout en garantissant des rendements stables et
                    réguliers. Chaque client est unique, et je m'engage à
                    personnaliser l'accompagnement selon vos besoins."
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
