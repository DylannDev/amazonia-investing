"use client";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useId } from "react";
import CustomCalendar from "./custom-calendar";
import { fr } from "date-fns/locale";
import { useSelectedPeriodStore } from "@/lib/stores/selected-period-store";
import { getDateFromWeekNumber } from "@/lib/utils";

export function DatePicker() {
  const id = useId();
  const { selectedMonth, selectedYear, selectedWeekNumber } =
    useSelectedPeriodStore();

  const hasSelection =
    selectedMonth > 0 && selectedYear > 0 && selectedWeekNumber > 0;

  const selectedMonthLabel = hasSelection
    ? format(new Date(selectedYear, selectedMonth - 1, 1), "MMMM yyyy", {
        locale: fr,
      }).replace(/^./, (c) => c.toUpperCase())
    : "";

  return (
    <div className="flex flex-col gap-2 items-start">
      <Label htmlFor={id} className="text-sm font-medium">
        Date
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <div
            id={id}
            className={cn(
              "cursor-pointer flex h-12 w-full items-center justify-between gap-2 rounded-lg border border-gray-300 bg-transparent px-3 text-sm font-normal whitespace-nowrap outline-offset-0 hover:bg-background focus-visible:border-ring focus-visible:outline-[3px] focus-visible:outline-ring/20",
              !hasSelection && "text-gray-500"
            )}
          >
            <span className={cn("truncate", !hasSelection && "text-gray-500")}>
              {hasSelection
                ? `Semaine ${selectedWeekNumber} - ${selectedMonthLabel}`
                : "Choisir une date"}
            </span>
            <CalendarIcon
              size={16}
              strokeWidth={2}
              className="shrink-0 text-gray-500/80 transition-colors group-hover:text-foreground"
              aria-hidden="true"
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto" align="start">
          <CustomCalendar
            singleDayMode={false}
            selected={getDateFromWeekNumber(selectedWeekNumber, selectedYear)}
            onSelect={() => {}}
            defaultMonth={
              hasSelection
                ? getDateFromWeekNumber(selectedWeekNumber, selectedYear)
                : new Date()
            }
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
