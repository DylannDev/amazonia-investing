import React from "react";
import FloatingCard from "./floating-card";
import Image from "next/image";

interface InfoCardProps {
  image: string;
  className?: string;
  priority?: boolean;
  fetchPriority?: "high" | "low" | "auto";
  loading?: "lazy" | "eager" | undefined;
}

const InfoCard: React.FC<InfoCardProps> = ({
  image,
  className = "bottom-16 -left-19",
  priority = true,
  fetchPriority = "high",
  loading,
}) => {
  // Si priority est true, on ne peut pas utiliser loading="lazy"
  const imageLoading = priority ? undefined : loading || "lazy";

  return (
    <FloatingCard
      className={`absolute p-3 sm:p-5 bg-white/70 backdrop-blur-sm border-2 border-white rounded-2xl shadow-[0_0_20px_0_rgba(0,0,0,0.15)] ${className}`}
    >
      <div className="relative w-full h-full">
        <Image
          src={image}
          alt="Informations gains et bénéfices du produit Amazonia Investing"
          fill
          sizes="100%"
          className="object-contain"
          priority={priority}
          fetchPriority={fetchPriority}
          loading={imageLoading}
        />
      </div>
    </FloatingCard>
  );
};

export default InfoCard;
