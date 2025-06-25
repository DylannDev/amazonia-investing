"use client";

import { cn } from "@/lib/utils";

type TypographyVariant =
  | "xs"
  | "sm"
  | "base"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl";

type TypographyWeight =
  | "light"
  | "normal"
  | "medium"
  | "semibold"
  | "bold"
  | "extrabold";

type TypographyLineHeight = "tightest" | "tight" | "normal" | "relaxed";

type TypographyAs = "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface TypographyProps {
  variant?: TypographyVariant;
  weight?: TypographyWeight;
  lineHeight?: TypographyLineHeight;
  as: TypographyAs;
  className?: string;
  children: React.ReactNode;
  [key: string]: any;
}

export function Typography({
  variant = "base",
  weight = "normal",
  lineHeight = "normal",
  as,
  className,
  children,
  ...props
}: TypographyProps) {
  const getVariantClass = () => {
    switch (variant) {
      case "xs":
        return "text-xs";
      case "sm":
        return "text-sm";
      case "base":
        return "text-base";
      case "lg":
        return "text-base sm:text-lg";
      case "xl":
        return "text-lg md:text-xl";
      case "2xl":
        return "text-xl md:text-2xl";
      case "3xl":
        return "text-xl sm:text-2xl md:text-3xl";
      case "4xl":
        return "text-2xl sm:text-3xl md:text-4xl";
      case "5xl":
        return "text-3xl sm:text-4xl md:text-5xl";
      case "6xl":
        return "text-3xl sm:text-5xl md:text-6xl";
      default:
        return "text-base";
    }
  };

  const getWeightClass = () => {
    switch (weight) {
      case "light":
        return "font-light";
      case "normal":
        return "font-normal";
      case "medium":
        return "font-medium";
      case "semibold":
        return "font-semibold";
      case "bold":
        return "font-bold";
      case "extrabold":
        return "font-extrabold";
      default:
        return "font-normal";
    }
  };

  const getLineHeightClass = () => {
    switch (lineHeight) {
      case "tightest":
        return "leading-none";
      case "tight":
        return "leading-tight";
      case "normal":
        return "leading-normal";
      case "relaxed":
        return "leading-relaxed";
      default:
        return "leading-normal";
    }
  };

  const getTitleTrackingAndMargin = () => {
    switch (as) {
      case "h1":
        return "mb-6 tracking-tight";
      case "h2":
        return "mb-6 tracking-tight";
      case "h3":
        return "mb-4 tracking-tight";
      case "h4":
        return "mb-4 tracking-tight";
      case "h5":
        return "mb-2 tracking-tight";
      case "h6":
        return "mb-2 tracking-tight";
      default:
        return "";
    }
  };

  const Component = as;

  return (
    <Component
      className={cn(
        getVariantClass(),
        getWeightClass(),
        getLineHeightClass(),
        getTitleTrackingAndMargin(),
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
