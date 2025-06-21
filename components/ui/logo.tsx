import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "default" | "white";
  isFooter?: boolean;
}

export function Logo({
  className,
  variant = "default",
  isFooter = false,
}: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "relative block aspect-[5/1]",
        isFooter ? "w-[250px] sm:w-[300px]" : "w-[220px] sm:w-[300px]",
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
