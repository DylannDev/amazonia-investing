"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface FloatingCornerProps {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
  size?: number;
}

export function FloatingCoins({
  src,
  alt,
  className,
  delay = 0,
  size = 100,
}: FloatingCornerProps) {
  return (
    <motion.div
      className={`absolute ${className}`}
      animate={{
        y: [0, -5, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className={`${size ? "" : "w-auto h-auto"}`}
        priority
      />
    </motion.div>
  );
}
