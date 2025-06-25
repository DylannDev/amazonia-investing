"use client";

import { cn } from "@/lib/utils";

type CardVariant = "default" | "blue" | "green" | "red" | "yellow";

interface CardProps {
  children: React.ReactNode;
  className?: string;
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
  variant = "default",
  ...props
}: CardProps) {
  return (
    <div
      {...props}
      className={cn(
        "rounded-3xl p-6 border-2 h-full",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </div>
  );
}
