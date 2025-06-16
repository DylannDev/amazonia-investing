"use client";

import { Button } from "@/components/ui/button";
import { PiCalendarCheckDuotone } from "react-icons/pi";
import { VariantProps } from "class-variance-authority";
import { buttonVariants } from "./button";

interface CallButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  label?: React.ReactNode;
}

export function CallButton({
  label = "Simuler mes revenus",
  className,
  variant = "blue",
  size = "lg",
  ...props
}: CallButtonProps) {
  return (
    <Button
      variant={variant}
      size={size}
      className={`group ${className}`}
      {...props}
    >
      <PiCalendarCheckDuotone className="mr-1 text-xl" />
      Réserver un appel
    </Button>
  );
}
