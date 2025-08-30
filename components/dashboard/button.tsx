import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "cursor-pointer active:scale-[0.98] inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all duration-150 ease-in-out focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        blue: "bg-blue-300 text-white",
        green: "bg-green-300 text-white",
        red: "bg-red-300 text-white",
        yellow: "bg-yellow-300/70 text-yellow-950",
        black: "bg-black text-white",
        outline:
          "rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm whitespace-nowrap",
        outline_blue:
          "bg-white border border-blue-200 text-blue-300 rounded-md hover:bg-blue-100",
        outline_red:
          "bg-white border border-red-200 text-red-300 rounded-md hover:bg-red-100",
        outline_green:
          "bg-white border border-green-200 text-green-300 rounded-md hover:bg-green-100",
        outline_yellow:
          "bg-white border border-yellow-200 text-yellow-300 rounded-md hover:bg-yellow-100",
      },
      size: {
        sm: "h-10 px-2 text-sm",
        lg: "h-12 px-6 text-base rounded-lg",
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
  ({ className, variant, size = "sm", asChild = false, ...props }, ref) => {
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
