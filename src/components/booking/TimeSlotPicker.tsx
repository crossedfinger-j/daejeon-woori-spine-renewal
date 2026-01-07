"use client";

import { useMemo } from "react";
import { TimeSlot } from "@/types";
import { cn } from "@/lib/utils";

interface TimeSlotPickerProps {
  selectedDate: string | null;
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
  timeSlots: TimeSlot[];
}

export function TimeSlotPicker({
  selectedDate,
  selectedTime,
  onSelectTime,
  timeSlots,
}: TimeSlotPickerProps) {
  const filteredSlots = useMemo(() => {
    if (!selectedDate) return [];
    return timeSlots.filter((slot) => slot.date === selectedDate);
  }, [selectedDate, timeSlots]);

  const morningSlots = filteredSlots.filter((slot) => {
    const hour = parseInt(slot.time.split(":")[0]);
    return hour < 12;
  });

  const afternoonSlots = filteredSlots.filter((slot) => {
    const hour = parseInt(slot.time.split(":")[0]);
    return hour >= 12;
  });

  if (!selectedDate) {
    return (
      <div className="text-center py-8 text-[var(--gray-500)]">
        <p>날짜를 먼저 선택해주세요</p>
      </div>
    );
  }

  if (filteredSlots.length === 0) {
    return (
      <div className="text-center py-8 text-[var(--gray-500)]">
        <p>선택하신 날짜에 예약 가능한 시간이 없습니다</p>
      </div>
    );
  }

  const renderSlots = (slots: TimeSlot[], label: string) => {
    if (slots.length === 0) return null;

    return (
      <div className="mb-6">
        <h4 className="text-sm font-medium text-[var(--gray-500)] mb-3">{label}</h4>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
          {slots.map((slot) => (
            <button
              key={`${slot.date}-${slot.time}`}
              onClick={() => {
                if (slot.available) {
                  onSelectTime(slot.time);
                }
              }}
              disabled={!slot.available}
              className={cn(
                "py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200",
                slot.available
                  ? selectedTime === slot.time
                    ? "bg-[var(--primary-500)] text-white"
                    : "bg-white border border-[var(--gray-200)] text-[var(--gray-700)] hover:border-[var(--primary-300)] hover:bg-[var(--primary-50)]"
                  : "bg-[var(--gray-100)] text-[var(--gray-400)] cursor-not-allowed line-through"
              )}
            >
              {slot.time}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-[var(--gray-200)] p-6">
      <h3 className="text-lg font-semibold text-[var(--gray-900)] mb-4">
        시간 선택
      </h3>

      {renderSlots(morningSlots, "오전")}
      {renderSlots(afternoonSlots, "오후")}

      {selectedTime && (
        <div className="mt-4 p-4 bg-[var(--primary-50)] rounded-lg">
          <p className="text-[var(--primary-700)] font-medium">
            선택된 시간: {selectedTime}
          </p>
        </div>
      )}
    </div>
  );
}
