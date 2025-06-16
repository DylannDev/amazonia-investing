"use client";

import { Button } from "@/components/ui/button";
import { ArrowButton } from "@/components/ui/arrow-button";
import { Typography } from "@/components/ui/typography";
import Image from "next/image";
import InfoCard from "../ui/infos-card";
import { CallButton } from "../ui/call-button";
import { FloatingCoins } from "../ui/floating-coins";
import {
  PiChartLineUpDuotone,
  PiHandshakeDuotone,
  PiWalletDuotone,
} from "react-icons/pi";

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
    <section className="relative py-20 sm:py-32 overflow-hidden max-w-[1800px] mx-auto">
      <div className="container relative mx-auto px-4 flex items-center gap-20">
        <div className="flex flex-col gap-8 text-left w-[55%]">
          <div>
            <Typography
              as="h1"
              variant="6xl"
              weight="semibold"
              lineHeight="tightest"
              className="mb-4 text-balance"
            >
              Générez un revenu mensuel passif à vie grâce à un investissement
              unique
            </Typography>

            <Typography
              as="p"
              variant="xl"
              weight="normal"
              className="mb-0 text-balance text-gray-600"
            >
              Investissez une seule fois à partir de 150€ et percevez jusqu'à
              17,5% de rendement mensuel à vie. Votre capital est investi dans
              un Fond Commun de Placement piloté par notre équipe de traders
              experts. On s'occupe de tout, vous encaissez !
            </Typography>
          </div>

          <div className="flex gap-4 justify-center sm:justify-start max-w-[530px] ">
            <CallButton className="w-full" />
            <ArrowButton variant="black" className="w-full" />
          </div>

          <div className="flex gap-4 w-fit">
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

        {/* Hero image */}
        <div className="relative w-[45%] flex">
          <div className="relative w-full h-full aspect-1/2 max-h-[350px] sm:max-h-[600px]">
            <FloatingCoins
              src="/coin-1.svg"
              alt="Décoration coin supérieur gauche"
              className="-bottom-10 right-40"
              delay={0}
              size={60}
            />
            <FloatingCoins
              src="/coin-2.svg"
              alt="Décoration coin supérieur droit"
              className="-top-10 -right-6"
              delay={0.5}
              size={90}
            />
            <FloatingCoins
              src="/coin-3.svg"
              alt="Décoration coin inférieur droit"
              className="top-30 -left-10"
              delay={1}
              size={80}
            />
            <Image
              src="/client-1.jpg"
              alt="Client Amazonia Investing"
              fill
              quality={100}
              sizes="(max-width: 768px) 100vw, 1000px"
              className="object-cover object-bottom rounded-4xl -z-1"
              priority
              fetchPriority="high"
            />
          </div>
          <InfoCard image="/infocard-hero.svg" />
        </div>
      </div>

      {/* Background images */}
      <div className="absolute top-10 left-0 -z-9 w-full h-full">
        <Image
          src="/shapes-small.svg"
          alt=""
          width={400}
          height={400}
          className="absolute w-[400px] h-[400px] object-contain"
          priority
          fetchPriority="high"
        />
      </div>
    </section>
  );
}
