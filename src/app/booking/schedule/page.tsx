"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui";
import {
  BookingCalendar,
  TimeSlotPicker,
  ProgressBar,
  BookingSummary,
} from "@/components/booking";
import { useBookingStore } from "@/stores/bookingStore";

export default function SchedulePage() {
  const router = useRouter();

  const {
    selectedSymptoms,
    selectedDoctor,
    selectedDate,
    selectedTime,
    setDate,
    setTime,
    setStep,
  } = useBookingStore();

  useEffect(() => {
    // 의료진 선택 없이 직접 접근 시 리다이렉트
    if (!selectedDoctor) {
      router.push("/booking/doctor");
      return;
    }
    setStep(3);
  }, [selectedDoctor, router, setStep]);

  // 선택된 의료진의 예약 가능 날짜 추출
  const availableDates = useMemo(() => {
    if (!selectedDoctor) return [];
    const dates = new Set<string>();
    selectedDoctor.availableSlots
      .filter((slot) => slot.available)
      .forEach((slot) => dates.add(slot.date));
    return Array.from(dates);
  }, [selectedDoctor]);

  const handleNext = () => {
    router.push("/booking/confirm");
  };

  const handleBack = () => {
    router.push("/booking/doctor");
  };

  const canProceed = selectedDate !== null && selectedTime !== null;

  if (!selectedDoctor) {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ProgressBar currentStep={3} />

      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-[var(--gray-900)] mb-2">
          예약 일시를 선택해주세요
        </h1>
        <p className="text-[var(--gray-600)]">
          {selectedDoctor.name} {selectedDoctor.title}의 진료 가능 시간입니다
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Calendar & Time Slots */}
        <div className="lg:col-span-2 space-y-6">
          <BookingCalendar
            selectedDate={selectedDate}
            onSelectDate={setDate}
            availableDates={availableDates}
          />

          <TimeSlotPicker
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onSelectTime={setTime}
            timeSlots={selectedDoctor.availableSlots}
          />
        </div>

        {/* Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <BookingSummary
              symptoms={selectedSymptoms}
              doctor={selectedDoctor}
              date={selectedDate}
              time={selectedTime}
            />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between gap-4 mt-10 pt-6 border-t border-[var(--gray-200)]">
        <Button
          variant="ghost"
          onClick={handleBack}
          leftIcon={<ArrowLeft className="w-5 h-5" />}
        >
          이전: 의료진 선택
        </Button>
        <Button
          onClick={handleNext}
          disabled={!canProceed}
          rightIcon={<ArrowRight className="w-5 h-5" />}
        >
          다음: 예약 확인
        </Button>
      </div>
    </div>
  );
}
