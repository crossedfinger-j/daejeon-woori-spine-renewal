"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { DoctorList, ProgressBar, BookingSummary } from "@/components/booking";
import { useBookingStore } from "@/stores/bookingStore";

export default function DoctorPage() {
  const router = useRouter();

  const {
    selectedSymptoms,
    selectedDoctor,
    setDoctor,
    setStep,
  } = useBookingStore();

  // 페이지 진입 시 이미 선택되어 있던 의료진 ID 저장 (미리 선택된 경우)
  // 초기 렌더링 시점에 selectedDoctor가 있으면 그 ID를 저장
  const [preSelectedDoctorId] = useState<string | null>(() => {
    return selectedDoctor?.id ?? null;
  });

  useEffect(() => {
    // 증상 선택 없이 직접 접근 시 리다이렉트
    if (selectedSymptoms.length === 0) {
      router.push("/booking/symptom");
      return;
    }
    setStep(2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNext = () => {
    router.push("/booking/schedule");
  };

  const handleBack = () => {
    router.push("/booking/symptom");
  };

  const canProceed = selectedDoctor !== null;

  return (
    <div className="booking-page-container">
      <ProgressBar currentStep={2} />

      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--gray-900)', marginBottom: '8px' }}>
          전문 의료진을 선택해주세요
        </h1>
        <p style={{ color: 'var(--gray-600)', fontSize: '16px' }}>
          선택하신 증상에 맞는 전문의를 추천해드립니다
        </p>
      </div>

      {/* Summary - 컴팩트 모드 */}
      <div style={{ marginBottom: '24px' }}>
        <BookingSummary
          symptoms={selectedSymptoms}
          doctor={selectedDoctor}
          date={null}
          time={null}
          compact
        />
      </div>

      {/* Doctor List */}
      <DoctorList
        selectedSymptoms={selectedSymptoms}
        selectedDoctor={selectedDoctor}
        onSelectDoctor={setDoctor}
        preSelectedDoctorId={preSelectedDoctorId}
      />

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
