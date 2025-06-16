"use client";

import { motion } from "framer-motion";
import { Shield, Users, ChartLine } from "lucide-react";

const benefits = [
  {
    icon: Shield,
    title: "Revenus réguliers sans dépendre des banques",
    description:
      "Générez des revenus mensuels stables indépendamment du système bancaire traditionnel.",
  },
  {
    icon: Users,
    title: "Accompagnement humain",
    description:
      "Un trader expérimenté gère votre investissement et reste à votre disposition pour toute question.",
  },
  {
    icon: ChartLine,
    title: "Approche fondée sur l'expérience",
    description:
      "Une stratégie de trading éprouvée, développée et optimisée sur plus de 7 ans d'expérience.",
  },
];

export function WhySection() {
  return (
    <section className="bg-muted/50 py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
            Une méthode éprouvée. Un engagement concret.
          </h2>
          <p className="mb-12 text-lg text-muted-foreground">
            Notre approche se distingue par sa transparence et sa fiabilité.
            Nous utilisons une stratégie de trading à faible risque, testée et
            optimisée au fil des années, pour garantir des rendements mensuels
            stables.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-4 rounded-full bg-primary/10 p-3">
                <benefit.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mx-auto mt-16 max-w-2xl rounded-lg bg-card p-8 text-center shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-lg text-muted-foreground">
            Notre engagement : vous offrir une solution d'investissement simple,
            transparente et performante, avec un accompagnement personnalisé à
            chaque étape de votre parcours.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
