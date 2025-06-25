import React from "react";
import { Shadow } from "../ui/shadow";
import Image from "next/image";
import { FadeInImage } from "../ui/animations";

export const DecorativeElements = () => {
  return (
    <FadeInImage
      delay={0.8}
      className="absolute -top-5 sm:top-10 -left-5 sm:left-0 -z-9 w-full h-full"
    >
      <Shadow
        className="top-200 sm:top-150 -right-50 sm:-right-10"
        color="green"
        size="md"
      />
      <div className="absolute top-220 sm:top-180 -right-15 sm:-right-20 -z-9">
        <Image
          src="/shapes-small.svg"
          alt=""
          width={400}
          height={400}
          className="w-[200px] h-[200px] md:w-[300px] md:h-[300px] object-contain"
          priority
          fetchPriority="high"
        />
      </div>
    </FadeInImage>
  );
};
