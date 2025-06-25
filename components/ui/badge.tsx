"use client";

import { Typography } from "./typography";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "blue" | "green" | "red";
  isBgVisible?: boolean;
  isBlogCard?: boolean;
}

const variantStyles = {
  blue: "text-blue-300",
  green: "text-green-300",
  red: "text-red-300",
};

const bgStyles = {
  blue: "bg-blue-100",
  green: "bg-green-100",
  red: "bg-red-100",
};

export function Badge({
  children,
  className,
  variant = "blue",
  isBgVisible = false,
  isBlogCard = false,
}: BadgeProps) {
  return (
    <div className="mb-3">
      <Typography
        as="span"
        weight="semibold"
        className={cn(
          "w-fit uppercase",
          variantStyles[variant],
          isBgVisible && "px-3 py-[6px] rounded-md",
          isBgVisible && bgStyles[variant],
          isBlogCard ? "text-sm" : "text-sm sm:text-base",

          className
        )}
      >
        {children}
      </Typography>
    </div>
  );
}
