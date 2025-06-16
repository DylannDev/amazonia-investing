"use client";

import { motion } from "framer-motion";
import { Typography } from "./typography";

interface HighlightCardProps {
  number: string;
  label: string;
  color?: CardColor;
}

const colorClasses: Record<CardColor, string> = {
  blue: "text-blue-900 bg-blue-300/80",
  green: "text-green-900 bg-green-300/80",
  red: "text-red-900 bg-red-300/70",
  yellow: "text-yellow-900 bg-yellow-300/80",
};

export function HighlightCard({
  number,
  label,
  color = "blue",
}: HighlightCardProps) {
  return (
    <motion.div
      transition={{ type: "spring", stiffness: 300 }}
      className={`rounded-3xl p-6 h-full flex flex-col justify-center items-center ${colorClasses[color]}`}
    >
      <Typography
        as="p"
        variant="6xl"
        weight="bold"
        className="mb-0 text-center"
      >
        {number}
      </Typography>
      <Typography as="p" variant="lg" weight="normal" className="text-center">
        {label}
      </Typography>
    </motion.div>
  );
}
