import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={cn(
        "max-w-[1536px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-4",

        className
      )}
    >
      {children}
    </div>
  );
}
