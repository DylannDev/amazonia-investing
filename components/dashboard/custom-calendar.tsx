import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "../ui/calendar";
import { DropdownNavProps, DropdownProps } from "react-day-picker";

interface CustomCalendarProps {
  selected: Date | undefined;
  onSelect: (date: Date | undefined) => void;
  singleDayMode?: boolean;
  defaultMonth?: Date;
  startMonth?: Date;
  endMonth?: Date;
}

const CustomCalendar = ({
  selected,
  onSelect,
  singleDayMode = true,
  defaultMonth = new Date(),
  startMonth = new Date(2020, 0),
  endMonth = new Date(2080, 11),
}: CustomCalendarProps) => {
  const handleCalendarChange = (
    _value: string | number,
    _e: React.ChangeEventHandler<HTMLSelectElement>
  ) => {
    const _event = {
      target: {
        value: String(_value),
      },
    } as React.ChangeEvent<HTMLSelectElement>;
    _e(_event);
  };

  // Disable all days after endMonth (inclusive logic: after the provided date)
  const disabled = React.useMemo(() => {
    if (!endMonth) return undefined;
    const endDay = new Date(
      endMonth.getFullYear(),
      endMonth.getMonth(),
      endMonth.getDate()
    );
    return [{ after: endDay }];
  }, [endMonth]);

  return (
    <Calendar
      showOutsideDays={true}
      singleDayMode={singleDayMode}
      onDaySelect={singleDayMode ? onSelect : undefined}
      selected={singleDayMode ? selected : undefined}
      onSelect={singleDayMode ? undefined : onSelect}
      className="rounded-lg border border-gray-300 p-3 bg-white"
      captionLayout="dropdown"
      defaultMonth={defaultMonth}
      startMonth={startMonth}
      endMonth={endMonth}
      disabled={disabled}
      // Show navigation arrows to change month without opening the dropdown
      components={{
        DropdownNav: (props: DropdownNavProps) => {
          return (
            <div className="flex w-full items-center gap-2">
              {props.children}
            </div>
          );
        },
        Dropdown: (props: DropdownProps) => {
          return (
            <Select
              value={String(props.value)}
              onValueChange={(value) => {
                if (props.onChange) {
                  handleCalendarChange(value, props.onChange);
                }
              }}
            >
              <SelectTrigger
                size="sm"
                className="h-8 w-fit font-medium first:grow"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-[min(26rem,var(--radix-select-content-available-height))]">
                {props.options?.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={String(option.value)}
                    disabled={option.disabled}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          );
        },
      }}
    />
  );
};

export default CustomCalendar;
