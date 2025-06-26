"use client";

import React from "react";
import Image from "next/image";
import InfoCard from "@/components/ui/infos-card";
import { FloatingCoins } from "@/components/ui/floating-coins";
import { FadeInImage } from "../ui/animations";

interface HeroImageProps {
  className?: string;
}

const HeroImage: React.FC<HeroImageProps> = ({ className = "" }) => {
  return (
    <FadeInImage
      direction="y"
      className={`relative w-full lg:w-[45%] flex ${className}`}
    >
      <div className="relative w-full h-full aspect-1/2 max-[500px]:max-h-[350px] max-h-[450px] sm:max-h-[550px] md:max-h-[600px]">
        <FloatingCoins
          src="/coin-1.svg"
          className="-bottom-6 sm:-bottom-10 right-25 sm:right-40 w-[40px] h-[40px] sm:w-[60px] sm:h-[60px]"
        />
        <FloatingCoins
          src="/coin-2.svg"
          className="-top-5 sm:-top-10 -right-3 sm:-right-6 w-[60px] h-[60px] sm:w-[90px] sm:h-[90px]"
        />
        <FloatingCoins
          src="/coin-3.svg"
          className="top-30 -left-4 sm:-left-10 w-[50px] h-[50px] sm:w-[80px] sm:h-[80px]"
        />
        <Image
          src="/client-hero.webp"
          alt="Client recevant ses revenus mensuels sur son smartphone – Amazonia Investing"
          fill
          quality={100}
          sizes="(max-width: 768px) 100vw, 1000px"
          className="object-cover object-bottom rounded-3xl sm:rounded-4xl -z-1"
          priority
          fetchPriority="high"
        />
      </div>
      <InfoCard
        loading="eager"
        fetchPriority="high"
        image="/infocard-hero.svg"
        className="bottom-8 sm:bottom-16 -left-2 sm:left-10 lg:-left-10 scale-60 min-[500px]:scale-80 sm:scale-100 w-[274px] h-[119px]"
      />
    </FadeInImage>
  );
};

export default HeroImage;
