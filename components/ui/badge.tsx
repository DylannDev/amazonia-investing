"use client";

import { Typography } from "./typography";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "blue" | "green" | "red";
}

export function Badge({ children, className, variant = "blue" }: BadgeProps) {
  return (
    <div className="mb-3">
      <Typography
        as="span"
        variant="base"
        weight="semibold"
        className={cn(
          "w-fit uppercase",
          variant === "blue" && "text-blue-300",
          variant === "green" && "text-green-300",
          variant === "red" && "text-red-300",
          className
        )}
      >
        {children}
      </Typography>
    </div>
  );
}
