import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "default" | "white" | "illustration";
  isFooter?: boolean;
}

export function Logo({
  className,
  variant = "default",
  isFooter = false,
}: LogoProps) {
  const getLogoSrc = () => {
    switch (variant) {
      case "white":
        return "/logo-white.svg";
      case "illustration":
        return "/logo-illustration.svg";
      case "default":
      default:
        return "/logo.svg";
    }
  };

  return (
    <Link
      href="/"
      className={cn(
        "relative block aspect-[5/1]",
        isFooter
          ? "w-[250px] sm:w-[300px]"
          : variant === "illustration"
          ? "w-auto"
          : "w-[220px] sm:w-[300px]",
        className
      )}
    >
      <Image
        src={getLogoSrc()}
        alt="Amazonia Investing logo"
        fill
        priority
        className="object-contain"
      />
    </Link>
  );
}
