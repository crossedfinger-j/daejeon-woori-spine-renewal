"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui";
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ProgressBar currentStep={2} />

      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-[var(--gray-900)] mb-2">
          전문 의료진을 선택해주세요
        </h1>
        <p className="text-[var(--gray-600)]">
          선택하신 증상에 맞는 전문의를 추천해드립니다
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Doctor List */}
        <div className="lg:col-span-2">
          <DoctorList
            selectedSymptoms={selectedSymptoms}
            selectedDoctor={selectedDoctor}
            onSelectDoctor={setDoctor}
          />
        </div>

        {/* Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <BookingSummary
              symptoms={selectedSymptoms}
              doctor={selectedDoctor}
              date={null}
              time={null}
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
          이전: 증상 선택
        </Button>
        <Button
          onClick={handleNext}
          disabled={!canProceed}
          rightIcon={<ArrowRight className="w-5 h-5" />}
        >
          다음: 시간 선택
        </Button>
      </div>
    </div>
  );
}
