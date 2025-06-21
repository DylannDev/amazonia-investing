"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Typography } from "../ui/typography";
import InfoCard from "../ui/infos-card";
import { Badge } from "../ui/badge";
import { FounderQuote } from "./founder-quote";

export function FounderSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse lg:flex-row gap-10 lg:gap-20 xl:pl-8">
          <div className="relative w-full lg:w-[55%] flex justify-end">
            <div className="relative w-full h-full aspect-square md:aspect-1/2 rounded-4xl overflow-hidden max-w-[700px] md:max-w-[800px] max-h-[400px] min-[500px]:max-h-[500px] sm:max-h-[600px] md:max-h-[800px]">
              <Image
                src="/founder.jpg"
                alt="Fondateur Amazonia Investing Lory Othily"
                fill
                className="object-cover"
                quality={80}
                sizes="100vw"
                priority
              />
            </div>

            <InfoCard
              image="/infocard-founder-1.svg"
              className="bottom-20 min-[500px]:bottom-30 sm:bottom-50 -left-8 min-[500px]:left-0 sm:left-6 xl:-left-8 scale-60 min-[500px]:scale-80 sm:scale-100 w-[239px] h-[84px]"
            />
            <InfoCard
              image="/infocard-founder-2.svg"
              className="bottom-5 min-[500px]:bottom-10 sm:bottom-25 -left-[42px] min-[500px]:-left-1 sm:left-6 xl:-left-8 scale-60 min-[500px]:scale-80 sm:scale-100 w-[291px] h-[84px]"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6 justify-center w-full lg:w-[45%]"
          >
            <div className="mb-2 text-center lg:text-left">
              <Badge>Notre expert des marchés</Badge>
              <Typography
                as="h2"
                variant="4xl"
                weight="semibold"
                lineHeight="tightest"
                className="text-balance mb-6"
              >
                Le fondateur met son expertise de trader au service de votre
                rentabilité
              </Typography>

              <Typography
                as="p"
                variant="xl"
                weight="normal"
                className="text-gray-600 text-balance px-4 min-[500px]:px-0 text-justify min-[500px]:text-center lg:text-left"
              >
                Lory, fondateur d'Amazonia Investing, a passé plus de 8 ans sur
                les marchés financiers à développer une stratégie de trading
                performante, alliant analyse technique et gestion rigoureuse du
                risque. Entouré d'une équipe de traders expérimentés, il pilote
                les opérations au quotidien afin d'assurer stabilité et
                performance dans la durée.
              </Typography>
            </div>
            <div className="hidden lg:flex">
              <FounderQuote />
            </div>
          </motion.div>
        </div>
        <div className="flex lg:hidden mt-10">
          <FounderQuote />
        </div>
      </div>
    </section>
  );
}
