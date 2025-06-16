"use client";

import { Badge } from "./badge";
import { Typography } from "./typography";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  className?: string;
  badgeVariant?: "blue" | "green" | "red";
  textAlign?: "center" | "left";
  sectionDark?: boolean;
}

export function SectionHeader({
  badge,
  title,
  description,
  className = "",
  badgeVariant = "blue",
  textAlign = "center",
  sectionDark = false,
}: SectionHeaderProps) {
  return (
    <div
      className={`space-y-4 mb-12 max-w-4xl mx-auto ${className} ${
        textAlign === "left" ? "text-left" : "text-center"
      } ${sectionDark ? "text-white" : "text-black"}`}
    >
      <Badge variant={badgeVariant}>{badge}</Badge>
      <Typography
        as="h2"
        variant="5xl"
        weight="semibold"
        lineHeight="tightest"
        className="text-balance"
      >
        {title}
      </Typography>
      {description && (
        <Typography
          as="p"
          variant="xl"
          weight="normal"
          className={`mb-0 text-balance ${
            sectionDark ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {description}
        </Typography>
      )}
    </div>
  );
}
