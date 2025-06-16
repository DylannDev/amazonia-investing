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
    sm: "h-[400px] w-[400px]",
    md: "h-[500px] w-[500px]",
    lg: "h-[600px] w-[600px]",
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
        "absolute rounded-full opacity-50 blur-[150px]",
        shadowVariants.color[color],
        shadowVariants.size[size],
        className,
        zIndex
      )}
    />
  );
}
