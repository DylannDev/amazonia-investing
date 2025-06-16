import { Button } from "./button";
import { PiArrowRightBold } from "react-icons/pi";
import { VariantProps } from "class-variance-authority";
import { buttonVariants } from "./button";

interface ArrowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  label?: React.ReactNode;
}

export function ArrowButton({
  label = "Simuler mes revenus",
  className,
  variant = "blue",
  size = "lg",
  ...props
}: ArrowButtonProps) {
  return (
    <Button
      variant={variant}
      size={size}
      className={`group ${className}`}
      {...props}
    >
      {label}
      <PiArrowRightBold className="ml-1 text-lg group-hover:translate-x-1 transition-all duration-300 ease-in-out" />
    </Button>
  );
}
