"use client";

import { ArrowButton } from "@/components/ui/arrow-button";
import { Typography } from "@/components/ui/typography";
import { Container } from "@/components/ui/container";
import Image from "next/image";
import { CallButton } from "../ui/call-button";
import HeroImage from "./hero-image";
import {
  PiChartLineUpDuotone,
  PiHandshakeDuotone,
  PiWalletDuotone,
} from "react-icons/pi";
import { Shadow } from "../ui/shadow";
import { DecorativeElements } from "./decorative-elements";

const benefits = [
  {
    text: "Revenus mensuels à vie",
    icon: <PiWalletDuotone />,
    color: "border-blue-300 bg-blue-100 text-blue-300",
  },
  {
    text: "À partir de 150€",
    icon: <PiChartLineUpDuotone />,
    color: "border-green-300 bg-green-100 text-green-300",
  },
  {
    text: "Gestion 100% déléguée",
    icon: <PiHandshakeDuotone />,
    color: "border-red-300 bg-red-100 text-red-300",
  },
];

export function HeroSection() {
  return (
    <section className="relative pt-12 pb-20 sm:py-32">
      <Container className="flex flex-col lg:flex-row items-center gap-10 sm:gap-20">
        <div className="flex flex-col gap-8 text-center lg:text-left w-full lg:w-[55%]">
          <div>
            <Typography
              as="h1"
              variant="6xl"
              weight="semibold"
              lineHeight="tightest"
              className="mb-4 text-balance text-"
            >
              Générez un revenu mensuel passif à vie grâce à un investissement
              unique
            </Typography>

            <Typography
              as="p"
              weight="normal"
              className="mb-0 text-balance text-gray-600 text-base sm:text-lg md:text-xl"
            >
              Investissez une seule fois à partir de 150€ et percevez jusqu'à
              17,5% de rendement mensuel à vie. Votre capital est investi dans
              un Fond Commun de Placement piloté par notre équipe de traders
              experts. On s'occupe de tout, vous encaissez !
            </Typography>
          </div>

          <HeroImage className="block sm:hidden" />

          <div>
            <div className="flex flex-wrap sm:flex-nowrap justify-center lg:justify-start gap-4 w-fit mx-auto lg:mx-0 mb-4 sm:mb-6">
              <CallButton className="w-full sm:w-[50%]" />
              <ArrowButton variant="black" className="w-full sm:w-[50%]" />
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 w-fit mx-auto lg:mx-0">
              {benefits.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span
                    className={`p-2 rounded-full text-lg border ${item.color}`}
                  >
                    {item.icon}
                  </span>
                  <Typography
                    as="span"
                    variant="sm"
                    weight="normal"
                    className="mb-0 text-gray-600"
                  >
                    {item.text}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        </div>

        <HeroImage className="hidden sm:block" />
      </Container>

      {/* Background images */}
      <div className="absolute -top-5 sm:top-10 -left-5 sm:left-0 -z-9 w-full h-full">
        <Image
          src="/shapes-small.svg"
          alt=""
          width={300}
          height={300}
          className="w-[200px] h-[200px] md:w-[300px] md:h-[300px] object-contain"
          priority
          fetchPriority="high"
        />
      </div>
      <Shadow className="-top-30 -left-30" />
      <DecorativeElements />
    </section>
  );
}
