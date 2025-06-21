"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "../ui/section-header";
import { TestimonialCard } from "./testimonial-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { CallButton } from "../ui/call-button";

const testimonials = [
  {
    name: "Sophie D.",
    age: 32,
    role: "Professeure",
    content:
      "J'ai investi 500€ il y a 6 mois et je reçois maintenant 87,5€ chaque mois. C'est un complément de revenu très appréciable qui me permet de financer mes projets personnels.",
    investment: 500,
    monthlyReturn: 87.5,
    stars: 5,
  },
  {
    name: "Thomas X.",
    age: 45,
    role: "Entrepreneur",
    content:
      "Après avoir testé plusieurs investissements, Amazonia Investing se démarque par sa simplicité et sa régularité. Je perçois 175€ par mois depuis plus d'un an, sans aucune interruption.",
    investment: 1000,
    monthlyReturn: 175,
    stars: 5,
  },
  {
    name: "Marie D.",
    age: 28,
    role: "Infirmière",
    content:
      "En tant qu'infirmière, j'ai des horaires difficiles. Amazonia Investing me permet de générer des revenus passifs sans y penser. Je touche 262,5€ par mois depuis 8 mois.",
    investment: 1500,
    monthlyReturn: 262.5,
    stars: 5,
  },
  {
    name: "Pierre Z.",
    age: 52,
    role: "Retraité",
    content:
      "À la retraite, j'avais besoin d'un complément de revenu fiable. Amazonia Investing m'apporte 350€ par mois depuis 2 ans. C'est exactement ce que je cherchais.",
    investment: 2000,
    monthlyReturn: 350,
    stars: 4,
  },
  {
    name: "Emma L.",
    age: 35,
    role: "Architecte",
    content:
      "Je suis architecte freelance et mes revenus sont variables. Amazonia Investing me donne une stabilité financière avec 437,5€ par mois. C'est un vrai coup de pouce.",
    investment: 2500,
    monthlyReturn: 437.5,
    stars: 4,
  },
  {
    name: "Lucas J.",
    age: 41,
    role: "Ingénieur",
    content:
      "Après 15 ans dans l'ingénierie, j'ai décidé de diversifier mes revenus. Amazonia Investing m'apporte 525€ par mois depuis 18 mois. La régularité des paiements est impressionnante.",
    investment: 3000,
    monthlyReturn: 525,
    stars: 4,
  },
];

export function TestimonialsSection() {
  return (
    <section className="pt-20 pb-10 md:pt-32 md:pb-16">
      <div className="container mx-auto px-4">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <motion.div
            className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeader
              badge="Témoignages clients"
              title="Nos investisseurs témoignent"
              description="Découvrez les témoignages de ceux qui perçoivent déjà des revenus mensuels grâce à Amazonia Investing."
              textAlign="left"
            />
            <div className="flex items-center justify-center gap-4 mt-12">
              <CarouselPrevious className="static text-black hover:bg-blue-300 hover:text-white cursor-pointer border-2 border-black hover:border-blue-300 transition-colors duration-300" />
              <CarouselNext className="static text-black hover:bg-blue-300 hover:text-white cursor-pointer border-2 border-black hover:border-blue-300 transition-colors duration-300" />
            </div>
          </motion.div>

          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem
                key={index}
                className="md:basis-1/2 lg:basis-1/3 flex justify-center w-full"
              >
                <TestimonialCard
                  key={testimonial.name}
                  testimonial={testimonial}
                  index={index}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="flex justify-center mt-12">
          <CallButton variant="blue" className="w-fit" />
        </div>
      </div>
    </section>
  );
}
