import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "cursor-pointer hover:translate-y-[-2px] active:scale-[0.98] inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-150 ease-in-out focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        blue: "bg-blue-300 text-white shadow-lg shadow-blue-300/20 hover:shadow-xl",
        green:
          "bg-green-300 text-white shadow-lg shadow-green-300/20 hover:shadow-xl",
        red: "bg-red-300 text-white shadow-lg shadow-red-300/20 hover:shadow-xl",
        yellow:
          "bg-yellow-300 text-black shadow-lg shadow-yellow-300/20 hover:shadow-xl",
        black: "bg-black text-white shadow-lg shadow-black/20 hover:shadow-xl",
        outline:
          "bg-transparent text-black border-2 border-black shadow-lg hover:shadow-xl",
      },
      size: {
        sm: "h-12 px-6 text-base",
        lg: "h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg",
      },
    },
    defaultVariants: {
      variant: "blue",
      size: "lg",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
