import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "default" | "white";
}

export function Logo({ className, variant = "default" }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "relative block w-[160px] sm:w-[300px] aspect-[5/1]",
        className
      )}
    >
      <Image
        src={variant === "white" ? "/logo-white.svg" : "/logo.svg"}
        alt="Amazonia Investing logo"
        fill
        priority
        className="object-contain"
      />
    </Link>
  );
}
