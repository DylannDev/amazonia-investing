import React from "react";
import { Shadow } from "../ui/shadow";
import Image from "next/image";

export const DecorativeElements = () => {
  return (
    <>
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
    </>
  );
};
