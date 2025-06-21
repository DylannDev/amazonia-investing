import { cn } from "@/lib/utils";

interface ShadowProps {
  color?: "blue" | "green" | "red" | "yellow" | "black";
  size?: "sm" | "md" | "lg";
  className?: string;
  zIndex?: string;
}

const shadowVariants = {
  color: {
    blue: "bg-blue-300",
    green: "bg-green-300",
    red: "bg-red-300",
    yellow: "bg-yellow-300",
    black: "bg-gradient-to-b from-black to-white",
  },
  size: {
    sm: "h-[200px] w-[200px] sm:h-[400px] sm:w-[400px]",
    md: "h-[300px] w-[300px] sm:h-[500px] sm:w-[500px]",
    lg: "h-[400px] w-[400px] sm:h-[600px] sm:w-[600px]",
  },
};

export function Shadow({
  color = "blue",
  size = "md",
  className,
  zIndex = "-z-10",
}: ShadowProps) {
  return (
    <div
      className={cn(
        "absolute rounded-full opacity-50 blur-[80px] sm:blur-[150px]",
        shadowVariants.color[color],
        shadowVariants.size[size],
        className,
        zIndex
      )}
    />
  );
}
