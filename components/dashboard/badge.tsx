"use client";

import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "blue" | "green" | "red" | "yellow";
  isBgVisible?: boolean;
  isBlogCard?: boolean;
}

const variantStyles = {
  blue: "text-blue-400",
  green: "text-green-400",
  red: "text-red-400",
  yellow: "text-yellow-600",
};

const bgStyles = {
  blue: "bg-blue-100",
  green: "bg-green-100",
  red: "bg-red-100",
  yellow: "bg-yellow-200",
};

export function Badge({ children, className, variant = "blue" }: BadgeProps) {
  return (
    <div className="mb-3">
      <Typography
        as="span"
        weight="semibold"
        className={cn(
          "w-fit uppercase text-xs whitespace-nowrap",
          variantStyles[variant],
          bgStyles[variant],
          "px-2 py-1 rounded-sm",
          className
        )}
      >
        {children}
      </Typography>
    </div>
  );
}
