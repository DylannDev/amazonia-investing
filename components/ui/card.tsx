"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type CardVariant = "default" | "blue" | "green" | "red" | "yellow";

interface CardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  index?: number;
  animate?: boolean;
  variant?: CardVariant;
}

const variantClasses: Record<CardVariant, string> = {
  default: "bg-white border-gray-200",
  blue: "bg-blue-200 text-blue-900 border-blue-200",
  green: "bg-green-200 text-green-900 border-green-200",
  red: "bg-red-200 text-red-900 border-red-200",
  yellow: "bg-yellow-200 text-yellow-900 border-yellow-200",
};

export function Card({
  children,
  className,
  index = 0,
  animate = true,
  variant = "default",
  ...props
}: CardProps) {
  const motionProps = animate
    ? {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5, delay: index * 0.1 },
      }
    : {};

  return (
    <motion.div
      {...motionProps}
      {...props}
      className={cn(
        "rounded-3xl p-6 border-2",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </motion.div>
  );
}
