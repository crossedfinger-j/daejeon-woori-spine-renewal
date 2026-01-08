"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  BodyPartSelector,
  SymptomSelector,
  ProgressBar,
} from "@/components/booking";
import { useBookingStore } from "@/stores/bookingStore";
import { Symptom } from "@/types";

function SymptomPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    selectedBodyParts,
    selectedSymptoms,
    toggleBodyPart,
    setSelectedBodyParts,
    addSymptom,
    removeSymptom,
    setStep,
  } = useBookingStore();

  // URL 파라미터에서 초기 부위 설정
  useEffect(() => {
    const bodyPart = searchParams.get("bodyPart");
    if (bodyPart) {
      // URL에서 직접 접근한 경우 해당 부위만 선택
      setSelectedBodyParts([bodyPart]);
    }
    setStep(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSymptomToggle = (symptom: Symptom) => {
    if (selectedSymptoms.some((s) => s.id === symptom.id)) {
      removeSymptom(symptom.id);
    } else {
      addSymptom(symptom);
    }
  };

  const handleNext = () => {
    router.push("/booking/doctor");
  };

  const handleBack = () => {
    router.push("/booking");
  };

  const canProceed = selectedSymptoms.length > 0;

  return (
    <div className="booking-page-container">
      <ProgressBar currentStep={1} />

      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--gray-900)', marginBottom: '8px' }}>
          어디가 불편하신가요?
        </h1>
        <p style={{ color: 'var(--gray-600)', fontSize: '15px', lineHeight: '1.6' }}>
          불편한 부위를 선택하고, 해당 증상을 선택해주세요
        </p>
      </div>

      {/* Body Part Selection */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--gray-900)', marginBottom: '16px' }}>
          부위 선택 (복수 선택 가능)
        </h2>
        <BodyPartSelector
          selectedParts={selectedBodyParts}
          onToggle={toggleBodyPart}
        />
      </div>

      {/* Symptom Selection */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--gray-900)', marginBottom: '16px' }}>
          증상 선택
        </h2>
        <SymptomSelector
          selectedBodyParts={selectedBodyParts}
          selectedSymptoms={selectedSymptoms}
          onToggle={handleSymptomToggle}
        />
      </div>

      {/* Selected Summary */}
      {selectedSymptoms.length > 0 && (
        <div style={{ marginBottom: '24px', padding: '16px', backgroundColor: 'var(--primary-50)', borderRadius: '12px', border: '1px solid var(--primary-100)' }}>
          <p style={{ fontSize: '14px', color: 'var(--primary-700)', fontWeight: 600, marginBottom: '12px' }}>
            선택된 증상 ({selectedSymptoms.length}개)
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {selectedSymptoms.map((symptom) => (
              <span
                key={symptom.id}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', backgroundColor: 'white', borderRadius: '9999px', fontSize: '13px', color: 'var(--primary-700)', fontWeight: 500, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}
              >
                {symptom.name}
                <button
                  onClick={() => removeSymptom(symptom.id)}
                  style={{ marginLeft: '2px', color: 'var(--primary-400)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', lineHeight: 1 }}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

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

export default function SymptomPage() {
  return (
    <Suspense
      fallback={
        <div className="booking-page-container">
          <div style={{ opacity: 0.6 }}>
            <div style={{ height: '40px', backgroundColor: '#E5E7EB', borderRadius: '8px', width: '100%', marginBottom: '32px' }}></div>
            <div style={{ height: '28px', backgroundColor: '#E5E7EB', borderRadius: '8px', width: '50%', marginBottom: '8px' }}></div>
            <div style={{ height: '18px', backgroundColor: '#E5E7EB', borderRadius: '8px', width: '70%', marginBottom: '32px' }}></div>
            <div className="body-part-grid">
              {[...Array(7)].map((_, i) => (
                <div key={i} style={{ height: '90px', backgroundColor: '#E5E7EB', borderRadius: '12px' }}></div>
              ))}
            </div>
          </div>
        </div>
      }
    >
      <SymptomPageContent />
    </Suspense>
  );
}
