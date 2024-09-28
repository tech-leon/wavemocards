"use client";

import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerWithRangeProps {
  className?: string;
  onDateRangeChange?: (range: DateRange | undefined) => void;
}

export function DatePickerWithRange({
  className,
  onDateRangeChange,
}: DatePickerWithRangeProps) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: addDays(new Date(), -15),
    to: new Date(),
  });

  const handleSelect = (newDate: DateRange | undefined) => {
    setDate(newDate);
    if (onDateRangeChange) {
      onDateRangeChange(newDate);
    }
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "y, LL dd")} -{" "}
                  {format(date.to, "y, LL dd")}
                </>
              ) : (
                format(date.from, "y, LL dd")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
