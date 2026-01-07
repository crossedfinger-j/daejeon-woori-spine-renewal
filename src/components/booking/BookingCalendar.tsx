"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BookingCalendarProps {
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
  availableDates: string[];
}

export function BookingCalendar({
  selectedDate,
  onSelectDate,
  availableDates,
}: BookingCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const days: (Date | null)[] = [];

    // 이전 달의 날짜로 채우기
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }

    // 현재 달의 날짜
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  }, [currentMonth]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const prevMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const formatDateString = (date: Date): string => {
    return date.toISOString().split("T")[0];
  };

  const isPastDate = (date: Date): boolean => {
    return date < today;
  };

  const isAvailable = (date: Date): boolean => {
    return availableDates.includes(formatDateString(date));
  };

  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div className="bg-white rounded-2xl border border-[var(--gray-200)] p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={prevMonth}
          className="p-2 rounded-lg hover:bg-[var(--gray-100)] transition-colors"
          aria-label="이전 달"
        >
          <ChevronLeft className="w-5 h-5 text-[var(--gray-600)]" />
        </button>

        <h3 className="text-xl font-semibold text-[var(--gray-900)]">
          {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
        </h3>

        <button
          onClick={nextMonth}
          className="p-2 rounded-lg hover:bg-[var(--gray-100)] transition-colors"
          aria-label="다음 달"
        >
          <ChevronRight className="w-5 h-5 text-[var(--gray-600)]" />
        </button>
      </div>

      {/* Week Days */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day, index) => (
          <div
            key={day}
            className={cn(
              "text-center text-sm font-medium py-2",
              index === 0
                ? "text-[var(--error-500)]"
                : index === 6
                ? "text-[var(--primary-500)]"
                : "text-[var(--gray-500)]"
            )}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((date, index) => {
          if (!date) {
            return <div key={`empty-${index}`} className="aspect-square" />;
          }

          const dateStr = formatDateString(date);
          const isPast = isPastDate(date);
          const available = isAvailable(date);
          const isSelected = selectedDate === dateStr;
          const isSunday = date.getDay() === 0;
          const isSaturday = date.getDay() === 6;
          const isToday = dateStr === formatDateString(today);

          return (
            <button
              key={dateStr}
              onClick={() => {
                if (!isPast && available) {
                  onSelectDate(dateStr);
                }
              }}
              disabled={isPast || !available}
              className={cn(
                "aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200",
                isPast && "text-[var(--gray-300)] cursor-not-allowed",
                !isPast && !available && "text-[var(--gray-400)] cursor-not-allowed",
                !isPast &&
                  available &&
                  !isSelected &&
                  "hover:bg-[var(--primary-50)] cursor-pointer",
                isSelected &&
                  "bg-[var(--primary-500)] text-white hover:bg-[var(--primary-600)]",
                !isSelected && isSunday && !isPast && "text-[var(--error-500)]",
                !isSelected && isSaturday && !isPast && "text-[var(--primary-600)]",
                !isSelected && !isSunday && !isSaturday && !isPast && "text-[var(--gray-900)]",
                isToday && !isSelected && "ring-2 ring-[var(--primary-300)]"
              )}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 mt-6 pt-4 border-t border-[var(--gray-100)] text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-[var(--primary-500)]" />
          <span className="text-[var(--gray-600)]">선택됨</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-[var(--gray-200)]" />
          <span className="text-[var(--gray-600)]">예약 마감</span>
        </div>
      </div>
    </div>
  );
}
