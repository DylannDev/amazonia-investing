"use client";

import { ReactNode } from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Typography } from "@/components/ui/typography";

type CardColor = "blue" | "green" | "red" | "yellow";

interface StepAccordionProps {
  icon: ReactNode;
  title: string;
  description: string;
  index: number;
  color?: CardColor;
}

const iconColorClasses: Record<CardColor, string> = {
  blue: "text-blue-600 bg-blue-200 border-blue-400",
  green: "text-green-600 bg-green-200 border-green-400",
  red: "text-red-600 bg-red-200 border-red-400",
  yellow: "text-yellow-600 bg-yellow-200 border-yellow-400",
};

export function StepAccordion({
  icon,
  title,
  description,
  index,
  color = "blue",
}: StepAccordionProps) {
  return (
    <AccordionItem
      value={`step-${index}`}
      className="cursor-pointer border-gray-700"
    >
      <AccordionTrigger className="hover:no-underline cursor-pointer">
        <div className="flex items-center gap-4">
          <span
            className={`rounded-full p-2 sm:p-3 text-xl sm:text-2xl border-2 ${iconColorClasses[color]}`}
          >
            {icon}
          </span>
          <div className="flex flex-col items-start">
            <span className="text-base font-medium text-white">
              Étape {index + 1}
            </span>
            <Typography
              as="h3"
              variant="2xl"
              weight="medium"
              className="text-left text-white mb-0"
            >
              {title}
            </Typography>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <Typography
          as="p"
          variant="lg"
          weight="normal"
          className="text-gray-400 pl-18"
        >
          {description}
        </Typography>
      </AccordionContent>
    </AccordionItem>
  );
}
