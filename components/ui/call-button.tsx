"use client";

import { Button } from "@/components/ui/button";
import { VariantProps } from "class-variance-authority";
import { buttonVariants } from "./button";
import { RiWhatsappFill } from "react-icons/ri";
import Link from "next/link";

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
    <Link
      href="https://wa.me/+594694280529?text=Bonjour%20!%20Je%20souhaite%20en%20savoir%20plus%20sur%20Amazonia%20Investing.%20Pouvez-vous%20m'expliquer%20le%20fonctionnement%20?"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactez-nous sur WhatsApp"
    >
      <Button
        variant={variant}
        size={size}
        className={`group ${className}`}
        {...props}
      >
        <RiWhatsappFill className="text-xl mr-1" />
        Discuter maintenant
      </Button>
    </Link>
  );
}
