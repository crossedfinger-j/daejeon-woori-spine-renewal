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
    addSymptom,
    removeSymptom,
    setStep,
  } = useBookingStore();

  // URL 파라미터에서 초기 부위 설정
  useEffect(() => {
    const bodyPart = searchParams.get("bodyPart");
    if (bodyPart && !selectedBodyParts.includes(bodyPart)) {
      toggleBodyPart(bodyPart);
    }
    setStep(1);
  }, [searchParams, selectedBodyParts, toggleBodyPart, setStep]);

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
    <div style={{ position: 'relative', maxWidth: '64rem', marginLeft: 'auto', marginRight: 'auto', paddingTop: '120px', paddingBottom: '48px', paddingLeft: '24px', paddingRight: '24px' }}>
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

      <ProgressBar currentStep={1} />

      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--gray-900)', marginBottom: '12px' }}>
          어디가 불편하신가요?
        </h1>
        <p style={{ color: 'var(--gray-600)', fontSize: '16px', lineHeight: '1.6' }}>
          불편한 부위를 선택하고, 해당 증상을 선택해주세요
        </p>
      </div>

      {/* Body Part Selection */}
      <div style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '17px', fontWeight: 600, color: 'var(--gray-900)', marginBottom: '20px' }}>
          부위 선택 (복수 선택 가능)
        </h2>
        <BodyPartSelector
          selectedParts={selectedBodyParts}
          onToggle={toggleBodyPart}
        />
      </div>

      {/* Symptom Selection */}
      <div style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '17px', fontWeight: 600, color: 'var(--gray-900)', marginBottom: '20px' }}>
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
        <div style={{ marginBottom: '40px', padding: '20px', backgroundColor: 'var(--primary-50)', borderRadius: '16px', border: '1px solid var(--primary-100)' }}>
          <p style={{ fontSize: '14px', color: 'var(--primary-700)', fontWeight: 600, marginBottom: '12px' }}>
            선택된 증상 ({selectedSymptoms.length}개)
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {selectedSymptoms.map((symptom) => (
              <span
                key={symptom.id}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 14px', backgroundColor: 'white', borderRadius: '9999px', fontSize: '14px', color: 'var(--primary-700)', fontWeight: 500, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}
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

    </div>
  );
}

export default function SymptomPage() {
  return (
    <Suspense
      fallback={
        <div style={{ maxWidth: '64rem', marginLeft: 'auto', marginRight: 'auto', paddingTop: '120px', paddingBottom: '48px', paddingLeft: '24px', paddingRight: '24px' }}>
          <div style={{ opacity: 0.6 }}>
            <div style={{ height: '40px', backgroundColor: '#E5E7EB', borderRadius: '8px', width: '100%', marginBottom: '40px' }}></div>
            <div style={{ height: '32px', backgroundColor: '#E5E7EB', borderRadius: '8px', width: '40%', marginBottom: '12px' }}></div>
            <div style={{ height: '20px', backgroundColor: '#E5E7EB', borderRadius: '8px', width: '60%', marginBottom: '40px' }}></div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
              {[...Array(7)].map((_, i) => (
                <div key={i} style={{ height: '100px', backgroundColor: '#E5E7EB', borderRadius: '16px' }}></div>
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
