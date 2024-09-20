"use client"

import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface CustomDatePickerProps {
  value: Date | undefined
  onChange: (date: Date | undefined) => void
  placeholder?: string
}

export function CustomDatePicker({ value, onChange, placeholder = "選擇日期" }: CustomDatePickerProps) {
  const { t } = useTranslation();
  const [date, setDate] = React.useState<Date | undefined>(value)
  const [year, setYear] = React.useState(date?.getFullYear() || new Date().getFullYear())
  const [month, setMonth] = React.useState(date?.getMonth() || new Date().getMonth())

  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i)
  const months = [
    t("pages.register.form.month.january"),
    t("pages.register.form.month.february"),
    t("pages.register.form.month.march"),
    t("pages.register.form.month.april"),
    t("pages.register.form.month.may"),
    t("pages.register.form.month.june"),
    t("pages.register.form.month.july"),
    t("pages.register.form.month.august"),
    t("pages.register.form.month.september"),
    t("pages.register.form.month.october"),
    t("pages.register.form.month.november"),
    t("pages.register.form.month.december")
  ]

  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate)
    onChange(newDate)
    if (newDate) {
      setYear(newDate.getFullYear())
      setMonth(newDate.getMonth())
    }
  }

  const handleYearChange = (newYear: string) => {
    const yearNumber = parseInt(newYear)
    setYear(yearNumber)
    updateDate(yearNumber, month)
  }

  const handleMonthChange = (newMonth: string) => {
    const monthIndex = months.indexOf(newMonth)
    setMonth(monthIndex)
    updateDate(year, monthIndex)
  }

  const updateDate = (newYear: number, newMonth: number) => {
    const newDate = date ? new Date(date) : new Date()
    newDate.setFullYear(newYear)
    newDate.setMonth(newMonth)
    setDate(newDate)
    onChange(newDate)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal bg-transparent dark:bg-transparent rounded-xl border-2",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex justify-between p-3">
          <Select onValueChange={handleYearChange} value={year.toString()}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="年份" />
            </SelectTrigger>
            <SelectContent>
              {years.map((y) => (
                <SelectItem key={y} value={y.toString()}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={handleMonthChange} value={months[month]}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="月份" />
            </SelectTrigger>
            <SelectContent>
              {months.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          month={new Date(year, month)}
          onMonthChange={(newMonth) => {
            setMonth(newMonth.getMonth())
            setYear(newMonth.getFullYear())
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}