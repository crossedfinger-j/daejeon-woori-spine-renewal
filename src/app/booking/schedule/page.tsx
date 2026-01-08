"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
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
    <div className="booking-page-container">
      <ProgressBar currentStep={3} />

      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--gray-900)', marginBottom: '8px' }}>
          예약 일시를 선택해주세요
        </h1>
        <p style={{ color: 'var(--gray-600)', fontSize: '16px' }}>
          <span style={{ whiteSpace: 'nowrap' }}>{selectedDoctor.name} {selectedDoctor.title}</span>의 진료 가능 시간입니다
        </p>
      </div>

      {/* Summary - 컴팩트 모드 */}
      <div style={{ marginBottom: '24px' }}>
        <BookingSummary
          symptoms={selectedSymptoms}
          doctor={selectedDoctor}
          date={selectedDate}
          time={selectedTime}
          compact
        />
      </div>

      {/* Calendar & Time Slots - 반응형 그리드 */}
      <div className="schedule-grid">
        <BookingCalendar
          selectedDate={selectedDate}
          onSelectDate={setDate}
          availableDates={availableDates}
          compact
        />

        <TimeSlotPicker
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          onSelectTime={setTime}
          timeSlots={selectedDoctor.availableSlots}
          compact
        />
      </div>

      {/* 하단 고정 네비게이션 버튼 */}
      <div className="booking-nav-buttons">
        <button
          onClick={handleBack}
          className="booking-nav-btn booking-nav-btn-secondary"
        >
          <ArrowLeft style={{ width: '20px', height: '20px' }} />
          <span>이전</span>
        </button>
        <button
          onClick={handleNext}
          disabled={!canProceed}
          className="booking-nav-btn booking-nav-btn-primary"
          style={{
            backgroundColor: canProceed ? 'var(--primary-500)' : 'var(--gray-300)',
            cursor: canProceed ? 'pointer' : 'not-allowed'
          }}
        >
          <span>다음</span>
          <ArrowRight style={{ width: '20px', height: '20px' }} />
        </button>
      </div>
    </div>
  );
}
