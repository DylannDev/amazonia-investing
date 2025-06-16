import React from "react";
import FloatingCard from "./floating-card";
import Image from "next/image";

interface InfoCardProps {
  image: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ image }) => {
  return (
    <FloatingCard className=" bg-white/70 border-2 border-white backdrop-blur-sm absolute bottom-16 -left-19 rounded-2xl shadow-[0_0_20px_0_rgba(0,0,0,0.15)]">
      <div className="relative w-full">
        <Image
          src={image}
          alt="Informations gains et bénéfices du produit Amazonia Investing"
          height={116}
          width={270}
          quality={100}
          className="object-cover object-bottom rounded-4xl"
          priority
          fetchPriority="high"
        />
      </div>
    </FloatingCard>
  );
};

export default InfoCard;
