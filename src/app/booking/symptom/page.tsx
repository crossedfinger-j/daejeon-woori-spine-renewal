"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui";
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ProgressBar currentStep={1} />

      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-[var(--gray-900)] mb-2">
          어디가 불편하신가요?
        </h1>
        <p className="text-[var(--gray-600)]">
          불편한 부위를 선택하고, 해당 증상을 선택해주세요
        </p>
      </div>

      {/* Body Part Selection */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold text-[var(--gray-900)] mb-4">
          부위 선택 (복수 선택 가능)
        </h2>
        <BodyPartSelector
          selectedParts={selectedBodyParts}
          onToggle={toggleBodyPart}
        />
      </div>

      {/* Symptom Selection */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold text-[var(--gray-900)] mb-4">
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
        <div className="mb-8 p-4 bg-[var(--primary-50)] rounded-xl">
          <p className="text-sm text-[var(--primary-700)] font-medium mb-2">
            선택된 증상 ({selectedSymptoms.length}개)
          </p>
          <div className="flex flex-wrap gap-2">
            {selectedSymptoms.map((symptom) => (
              <span
                key={symptom.id}
                className="inline-flex items-center gap-1 px-3 py-1 bg-white rounded-full text-sm text-[var(--primary-700)]"
              >
                {symptom.name}
                <button
                  onClick={() => removeSymptom(symptom.id)}
                  className="ml-1 text-[var(--primary-400)] hover:text-[var(--primary-600)]"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between gap-4">
        <Button
          variant="ghost"
          onClick={handleBack}
          leftIcon={<ArrowLeft className="w-5 h-5" />}
        >
          이전
        </Button>
        <Button
          onClick={handleNext}
          disabled={!canProceed}
          rightIcon={<ArrowRight className="w-5 h-5" />}
        >
          다음: 의료진 선택
        </Button>
      </div>
    </div>
  );
}

export default function SymptomPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-8"></div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-2xl"></div>
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
