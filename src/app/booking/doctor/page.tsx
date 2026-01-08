"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
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

  useEffect(() => {
    // 증상 선택 없이 직접 접근 시 리다이렉트
    if (selectedSymptoms.length === 0) {
      router.push("/booking/symptom");
      return;
    }
    setStep(2);
  }, [selectedSymptoms, router, setStep]);

  const handleNext = () => {
    router.push("/booking/schedule");
  };

  const handleBack = () => {
    router.push("/booking/symptom");
  };

  const canProceed = selectedDoctor !== null;

  return (
    <div style={{ position: 'relative', maxWidth: '72rem', marginLeft: 'auto', marginRight: 'auto', paddingTop: '140px', paddingBottom: '32px', paddingLeft: '24px', paddingRight: '24px' }}>
      {/* 왼쪽 이전 버튼 */}
      <div style={{
        position: 'fixed',
        left: '24px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 30
      }}>
        <button
          onClick={handleBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: 'white',
            border: '1px solid var(--gray-200)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          <ArrowLeft style={{ width: '24px', height: '24px', color: 'var(--gray-600)' }} />
        </button>
      </div>

      {/* 오른쪽 다음 버튼 */}
      <div style={{
        position: 'fixed',
        right: '24px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 30
      }}>
        <button
          onClick={handleNext}
          disabled={!canProceed}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '16px 24px',
            borderRadius: '9999px',
            backgroundColor: canProceed ? 'var(--primary-500)' : 'var(--gray-300)',
            border: 'none',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            cursor: canProceed ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s',
            color: 'white',
            fontSize: '16px',
            fontWeight: 600
          }}
        >
          <span>다음</span>
          <ArrowRight style={{ width: '20px', height: '20px' }} />
        </button>
      </div>

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
      />
    </div>
  );
}
