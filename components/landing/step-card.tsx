"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { Typography } from "../ui/typography";

type CardColor = "blue" | "green" | "red" | "yellow";

interface StepCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  index: number;
  totalSteps: number;
  delay?: number;
  color?: CardColor;
}

const cardColorClasses: Record<CardColor, string> = {
  blue: "text-blue-200",
  green: "text-green-200",
  red: "text-red-200",
  yellow: "text-yellow-200",
};

const iconColorClasses: Record<CardColor, string> = {
  blue: "text-blue-600 bg-blue-200 border-blue-400",
  green: "text-green-600 bg-green-200 border-green-400",
  red: "text-red-600 bg-red-200 border-red-400",
  yellow: "text-yellow-600 bg-yellow-200 border-yellow-400",
};

export function StepCard({
  icon,
  title,
  description,
  index,
  totalSteps,
  delay = 0,
  color = "blue",
}: StepCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="p-10">
        <div className="mb-6 flex items-center justify-center relative">
          <span
            className={`rounded-full p-4 text-3xl border-2 ${iconColorClasses[color]}`}
          >
            {icon}
          </span>
          <span
            className={`absolute -top-10 right-0 text-6xl font-bold ${cardColorClasses[color]}`}
          >
            0{index + 1}
          </span>
        </div>
        <Typography
          as="h3"
          variant="2xl"
          weight="medium"
          className="mb-2 text-center"
        >
          {title}
        </Typography>
        <Typography
          as="p"
          variant="lg"
          weight="normal"
          className="mb-0 text-gray-400 text-center"
        >
          {description}
        </Typography>
      </div>
    </motion.div>
  );
}
