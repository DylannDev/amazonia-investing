import { Button } from "./button";
import { PiArrowRightBold } from "react-icons/pi";
import { VariantProps } from "class-variance-authority";
import { buttonVariants } from "./button";
import Link from "next/link";

interface ArrowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  label?: React.ReactNode;
  href?: string;
  target?: string;
  rel?: string;
}

export function ArrowButton({
  label = "Simuler mes revenus",
  className,
  variant = "blue",
  size = "lg",
  href = "/#simulator",
  target,
  rel,
  ...props
}: ArrowButtonProps) {
  return (
    <Link href={href} target={target} rel={rel}>
      <Button
        variant={variant}
        size={size}
        className={`group ${className}`}
        {...props}
      >
        {label}
        <PiArrowRightBold className="ml-1 text-lg group-hover:translate-x-1 transition-all duration-150 ease-in-out" />
      </Button>
    </Link>
  );
}
