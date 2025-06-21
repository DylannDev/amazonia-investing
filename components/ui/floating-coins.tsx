"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface FloatingCoinsProps {
  src: string;
  className?: string;
  delay?: number;
}

export function FloatingCoins({
  src,
  className = "",
  delay = 0,
}: FloatingCoinsProps) {
  return (
    <motion.div
      className={`absolute ${className}`}
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 3, repeat: Infinity, delay, ease: "easeInOut" }}
    >
      <Image
        src={src}
        alt="Pièces de monnaie décoratives - Amazonia Investing"
        fill
        sizes="100%"
        className="object-contain"
        priority
      />
    </motion.div>
  );
}
