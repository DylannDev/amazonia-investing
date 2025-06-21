"use client";

import { PiStar, PiStarDuotone, PiStarFill } from "react-icons/pi";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  className?: string;
}

export function StarRating({
  rating,
  maxRating = 5,
  className = "",
}: StarRatingProps) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {[...Array(maxRating)].map((_, index) => (
        <PiStarFill
          key={index}
          className={`text-xl ${
            index < rating ? "text-yellow-300" : "text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}
