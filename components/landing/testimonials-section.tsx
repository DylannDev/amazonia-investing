"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sophie",
    age: 32,
    role: "Professeure",
    content:
      "J'ai investi 500€ il y a 6 mois et je reçois maintenant 87,5€ chaque mois. C'est un complément de revenu très appréciable qui me permet de financer mes projets personnels.",
    investment: 500,
    monthlyReturn: 87.5,
  },
  {
    name: "Thomas",
    age: 45,
    role: "Entrepreneur",
    content:
      "Après avoir testé plusieurs investissements, Amazonia Investing se démarque par sa simplicité et sa régularité. Je perçois 175€ par mois depuis plus d'un an, sans aucune interruption.",
    investment: 1000,
    monthlyReturn: 175,
  },
];

export function TestimonialsSection() {
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
            Nos clients parlent de leurs résultats
          </h2>
          <p className="mb-12 text-lg text-muted-foreground">
            Découvrez les retours d'expérience de nos investisseurs.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <div className="mb-4 flex items-center gap-2 text-primary">
                  <Quote className="h-5 w-5" />
                  <div className="h-px flex-1 bg-primary/20" />
                </div>

                <p className="mb-6 text-muted-foreground">
                  {testimonial.content}
                </p>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}, {testimonial.age} ans
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">
                      Investissement
                    </div>
                    <div className="font-semibold text-primary">
                      {testimonial.investment}€
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.monthlyReturn}€/mois
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mx-auto mt-12 max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-muted-foreground">
            Ces témoignages reflètent l'expérience personnelle de nos clients.
            Les performances passées ne garantissent pas les performances
            futures.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
