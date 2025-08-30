"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useCallback } from "react";
import { DateRange, DayPicker, rangeIncludesDate } from "react-day-picker";
import { cn, getSelectedWeekMetadata } from "@/lib/utils";
import { buttonVariants } from "@/components/dashboard/button";
import { endOfWeek, Month, startOfWeek } from "date-fns";
import { useSelectedPeriodStore } from "@/lib/stores/selected-period-store";
import { fr } from "react-day-picker/locale";
import { format } from "date-fns";

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  singleDayMode?: boolean;
  onDaySelect?: (date: Date | undefined) => void;
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  components: userComponents,
  singleDayMode = false,
  onDaySelect,
  ...props
}: CalendarProps) {
  const [selectedWeek, setSelectedWeek] = React.useState<
    DateRange | undefined
  >();
  const [selectedDay, setSelectedDay] = React.useState<Date | undefined>();

  const setPeriod = useSelectedPeriodStore((state) => state.setPeriod);
  const currentMonth = useSelectedPeriodStore((state) => state.selectedMonth);
  const currentYear = useSelectedPeriodStore((state) => state.selectedYear);
  const currentWeekNumber = useSelectedPeriodStore(
    (state) => state.selectedWeekNumber
  );

  // Mettre à jour le store Zustand quand selectedWeek change (seulement si pas en mode jour unique)
  useEffect(() => {
    if (!singleDayMode && selectedWeek) {
      const metadata = getSelectedWeekMetadata(selectedWeek);
      if (metadata) {
        // Vérifier si les valeurs ont vraiment changé avant d'appeler setPeriod
        if (
          metadata.selectedMonth !== currentMonth ||
          metadata.selectedYear !== currentYear ||
          metadata.selectedWeekNumber !== currentWeekNumber
        ) {
          setPeriod({
            selectedMonth: metadata.selectedMonth,
            selectedYear: metadata.selectedYear,
            selectedWeekNumber: metadata.selectedWeekNumber,
          });
        }
      }
    }
  }, [
    selectedWeek,
    setPeriod,
    singleDayMode,
    currentMonth,
    currentYear,
    currentWeekNumber,
  ]);

  // Note: onDaySelect est appelé directement dans handleDayClick pour éviter les boucles

  const defaultClassNames = {
    months: "relative flex flex-col sm:flex-row gap-4",
    month: "w-full",
    month_caption:
      "relative mx-11 mb-1 flex h-9 items-center justify-center z-20",
    caption_label: "text-sm font-medium",
    nav: "absolute top-0 w-full flex justify-between z-10 cursor-pointer",
    button_previous: cn(
      buttonVariants({ variant: "outline", size: "sm" }),
      "size-9 text-gray-500 hover:text-black p-0"
    ),
    button_next: cn(
      buttonVariants({ variant: "outline", size: "sm" }),
      "size-9 text-gray-500 hover:text-black p-0"
    ),
    weekday: "size-9 p-0 text-xs font-medium text-gray-500",
    day_button:
      "relative flex size-9 items-center justify-center whitespace-nowrap rounded-lg p-0 text-foreground outline-offset-2 group-[[data-selected]:not(.range-middle)]:[transition-property:color,background-color,border-radius,box-shadow] group-[[data-selected]:not(.range-middle)]:duration-150 focus:outline-none group-data-[disabled]:pointer-events-none focus-visible:z-10 hover:bg-accent group-data-[selected]:bg-primary hover:text-foreground group-data-[selected]:text-primary-foreground group-data-[disabled]:text-foreground/30 group-data-[disabled]:line-through group-[.range-middle]:text-foreground/30 group-[.range-middle]:group-data-[selected]:text-primary-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 group-[.range-start:not(.range-end)]:rounded-e-none group-[.range-end:not(.range-start)]:rounded-s-none group-[.range-middle]:rounded-none group-data-[selected]:group-[.range-middle]:bg-accent group-data-[selected]:group-[.range-middle]:text-foreground",
    day: "group size-9 px-0 text-sm",
    range_start: "range-start",
    range_end: "range-end",
    range_middle: "range-middle",
    today:
      "*:after:pointer-events-none *:after:absolute *:after:bottom-1 *:after:start-1/2 *:after:z-10 *:after:size-[3px] *:after:-translate-x-1/2 *:after:rounded-full *:after:bg-primary [&[data-selected]:not(.range-middle)>*]:after:bg-background [&[data-disabled]>*]:after:bg-foreground/30 *:after:transition-colors",
    outside:
      "text-gray-300 opacity-30 data-selected:bg-accent data-selected:text-white",
    hidden: "invisible",
    week_number: "size-9 p-0 text-xs font-medium text-gray-500",
  };

  const mergedClassNames: typeof defaultClassNames = Object.keys(
    defaultClassNames
  ).reduce(
    (acc, key) => ({
      ...acc,
      [key]: classNames?.[key as keyof typeof classNames]
        ? cn(
            defaultClassNames[key as keyof typeof defaultClassNames],
            classNames[key as keyof typeof classNames]
          )
        : defaultClassNames[key as keyof typeof defaultClassNames],
    }),
    {} as typeof defaultClassNames
  );

  const defaultComponents = {
    Chevron: ({ orientation, ...props }: any) => {
      const ChevronIcon = orientation === "left" ? ChevronLeft : ChevronRight;
      return (
        <span {...props}>
          <ChevronIcon size={16} strokeWidth={2} aria-hidden="true" />
        </span>
      );
    },
  };

  const mergedComponents = {
    ...defaultComponents,
    ...userComponents,
  };

  // Locale avec mois capitalisés
  const customFr = {
    ...fr,
    localize: {
      ...fr.localize,
      month: (n: Month, opts?: any) => {
        const month = fr.localize.month(n, opts);
        return month.charAt(0).toUpperCase() + month.slice(1);
      },
    },
  };

  // Gestion du clic selon le mode
  const handleDayClick = useCallback(
    (day: Date, modifiers: any) => {
      if (modifiers.disabled) return;
      if (singleDayMode) {
        // Mode jour unique
        if (modifiers.selected) {
          setSelectedDay(undefined); // Clear la sélection si le jour est déjà sélectionné
          if (onDaySelect) onDaySelect(undefined);
        } else {
          setSelectedDay(day);
          if (onDaySelect) onDaySelect(day);
        }
      } else {
        // Mode semaine (comportement original)
        if (modifiers.selected) {
          setSelectedWeek(undefined);
          return;
        }
        setSelectedWeek({
          from: startOfWeek(day, { weekStartsOn: 1 }),
          to: endOfWeek(day, { weekStartsOn: 1 }),
        });
      }
    },
    [singleDayMode, onDaySelect]
  );

  // Modificateurs selon le mode
  const modifiers = singleDayMode
    ? {
        selected: selectedDay,
      }
    : {
        selected: selectedWeek,
        range_start: selectedWeek?.from,
        range_end: selectedWeek?.to,
        range_middle: (date: Date) =>
          selectedWeek ? rangeIncludesDate(selectedWeek, date, true) : false,
      };

  return (
    <DayPicker
      locale={customFr}
      formatters={{
        formatWeekdayName: (day) =>
          format(day, "EEE", { locale: fr })
            .replace(".", "")
            .charAt(0)
            .toUpperCase() +
          format(day, "EEE", { locale: fr }).replace(".", "").slice(1),
      }}
      showWeekNumber={!singleDayMode}
      showOutsideDays={showOutsideDays}
      className={cn("w-fit", className)}
      modifiers={modifiers}
      onDayClick={handleDayClick}
      classNames={mergedClassNames}
      components={mergedComponents}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
