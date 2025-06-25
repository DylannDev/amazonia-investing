"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BlogFiltersProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function BlogFilters({
  categories,
  selectedCategory,
  onCategoryChange,
}: BlogFiltersProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      <Button
        variant={selectedCategory === "Tous" ? "blue" : "outline"}
        size="sm"
        className={cn(
          "max-[380px]:w-full w-auto",
          selectedCategory === "Tous"
            ? ""
            : "bg-white text-black hover:text-blue-300 hover:bg-blue-50 border-none"
        )}
        onClick={() => onCategoryChange("Tous")}
      >
        Tous
      </Button>
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "blue" : "outline"}
          size="sm"
          className={cn(
            "max-[380px]:w-full w-auto",
            selectedCategory === category
              ? ""
              : "bg-white text-black hover:text-blue-300 hover:bg-blue-50 border-none"
          )}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </Button>
      ))}
    </div>
  );
}
