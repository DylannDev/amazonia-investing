"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { cn, formatNumber } from "@/lib/utils";
import { StarRating } from "../ui/star-rating";
import { BsChatSquareQuote } from "react-icons/bs";

interface TestimonialCardProps {
  testimonial: {
    name: string;
    age: number;
    role: string;
    content: string;
    investment: number;
    monthlyReturn: number;
    stars: number;
  };
  index?: number;
}

const getBackgroundColor = (index: number) => {
  const colors = ["bg-blue-200", "bg-green-200", "bg-red-200", "bg-yellow-200"];
  return colors[index % colors.length];
};

const getTextColor = (index: number) => {
  const colors = [
    "text-blue-500",
    "text-green-500",
    "text-red-500",
    "text-yellow-500",
  ];
  return colors[index % colors.length];
};

const getTextDarkColor = (index: number) => {
  const colors = [
    "text-blue-900",
    "text-green-900",
    "text-red-900",
    "text-yellow-900",
  ];
  return colors[index % colors.length];
};

const getBorderColor = (index: number) => {
  const colors = ["bg-blue-500", "bg-green-500", "bg-red-500", "bg-yellow-500"];
  return colors[index % colors.length];
};

export function TestimonialCard({
  testimonial,
  index = 0,
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="h-full flex flex-col justify-between gap-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold mb-2 text-xl">{testimonial.name}</div>

            <StarRating rating={testimonial.stars} />
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Investissement</div>
            <div className="font-semibold text-xl">
              {formatNumber(testimonial.investment)}€
            </div>
            <div className="text-gray-500 text-base">
              {formatNumber(testimonial.monthlyReturn)}€/mois
            </div>
          </div>
        </div>

        <div className={`p-6 flex-1 rounded-xl ${getBackgroundColor(index)}`}>
          <div
            className={cn("mb-4 flex items-center gap-2", getTextColor(index))}
          >
            <BsChatSquareQuote className="text-4xl" />
            <div className={cn("h-[2px] flex-1", getBorderColor(index))} />
          </div>

          <p className={cn("text-lg text-gray-600", getTextDarkColor(index))}>
            {testimonial.content}
          </p>
        </div>
      </Card>
    </motion.div>
  );
}
