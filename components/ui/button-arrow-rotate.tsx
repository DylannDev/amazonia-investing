import { cn } from "@/lib/utils";
import { PiArrowRightBold } from "react-icons/pi";

export const ArrowRotateButton = ({ small }: { small?: boolean }) => {
  return (
    <span
      className={cn(
        "border-2 border-blue-300 bg-blue-300 transition-colors duration-150 rounded-full flex items-center justify-center h-10 w-10",
        small ? "sm:h-12 sm:w-12" : "sm:h-16 sm:w-16"
      )}
    >
      <PiArrowRightBold
        className={cn(
          "text-white inline-block transition-transform duration-150 group-hover:-rotate-45 text-xl",
          small ? "sm:text-2xl" : "sm:text-4xl"
        )}
      />
    </span>
  );
};
