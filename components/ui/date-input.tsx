"use client";

import React from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CustomCalendar from "@/components/dashboard/custom-calendar";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";

interface DateInputProps {
  value?: Date;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
  defaultMonth?: Date;
  startMonth?: Date;
  endMonth?: Date;
}

export function DateInput({
  value,
  onChange,
  placeholder = "Choisir une date",
  className,
  defaultMonth,
  startMonth,
  endMonth,
}: DateInputProps) {
  const [open, setOpen] = React.useState(false);
  return (
    <Popover modal={false} open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          className={cn(
            "cursor-pointer flex h-12 w-full items-center justify-between gap-2 rounded-lg border border-gray-300 bg-transparent px-3 text-sm font-normal whitespace-nowrap outline-offset-0 hover:bg-background focus-visible:border-ring focus-visible:outline-[3px] focus-visible:outline-ring/20",
            !value && "text-gray-500",
            className
          )}
        >
          <span className={cn("truncate", !value && "text-gray-500")}>
            {value ? format(value, "PPP", { locale: fr }) : placeholder}
          </span>
          <CalendarIcon
            size={16}
            strokeWidth={2}
            className="shrink-0 text-gray-500/80 transition-colors group-hover:text-foreground"
            aria-hidden="true"
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <CustomCalendar
          selected={value}
          onSelect={(d) => {
            onChange(d);
            if (d) setOpen(false);
          }}
          singleDayMode={true}
          defaultMonth={defaultMonth}
          startMonth={startMonth}
          endMonth={endMonth}
        />
      </PopoverContent>
    </Popover>
  );
}
