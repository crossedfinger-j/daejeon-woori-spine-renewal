"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, CheckCircle, Home, Calendar } from "lucide-react";
import { Button, Modal } from "@/components/ui";
import {
  BookingForm,
  ProgressBar,
  BookingSummary,
} from "@/components/booking";
import { useBookingStore } from "@/stores/bookingStore";
import { PatientFormData } from "@/lib/validation";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

export default function ConfirmPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [bookingNumber, setBookingNumber] = useState("");

  const {
    selectedSymptoms,
    selectedDoctor,
    selectedDate,
    selectedTime,
    setPatientInfo,
    setStep,
    resetBooking,
  } = useBookingStore();

  useEffect(() => {
    // 시간 선택 없이 직접 접근 시 리다이렉트
    if (!selectedDate || !selectedTime) {
      router.push("/booking/schedule");
      return;
    }
    setStep(4);
  }, [selectedDate, selectedTime, router, setStep]);

  const handleSubmit = async (data: PatientFormData) => {
    setIsSubmitting(true);

    // 시뮬레이션: 예약 처리
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // 예약 번호 생성 (시뮬레이션)
    const bookingNum = `WS${Date.now().toString().slice(-8)}`;
    setBookingNumber(bookingNum);

    setPatientInfo(data);
    setIsSubmitting(false);
    setShowSuccessModal(true);
  };

  const handleBack = () => {
    router.push("/booking/schedule");
  };

  const handleGoHome = () => {
    resetBooking();
    router.push("/");
  };

  if (!selectedDoctor || !selectedDate || !selectedTime) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ProgressBar currentStep={4} />

      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-[var(--gray-900)] mb-2">
          예약 정보를 확인해주세요
        </h1>
        <p className="text-[var(--gray-600)]">
          환자 정보를 입력하고 예약을 완료해주세요
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-[var(--gray-200)] p-6">
            <h2 className="text-xl font-semibold text-[var(--gray-900)] mb-6">
              환자 정보 입력
            </h2>
            <BookingForm onSubmit={handleSubmit} isLoading={isSubmitting} />
          </div>
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

      {/* Back Button */}
      <div className="mt-10 pt-6 border-t border-[var(--gray-200)]">
        <Button
          variant="ghost"
          onClick={handleBack}
          leftIcon={<ArrowLeft className="w-5 h-5" />}
        >
          이전: 시간 선택
        </Button>
      </div>

      {/* Success Modal */}
      <Modal
        isOpen={showSuccessModal}
        onClose={() => {}}
        size="md"
      >
        <div className="text-center py-6">
          <div className="w-20 h-20 bg-[var(--success-50)] rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-[var(--success-500)]" />
          </div>

          <h2 className="text-2xl font-bold text-[var(--gray-900)] mb-2">
            예약이 완료되었습니다
          </h2>
          <p className="text-[var(--gray-600)] mb-6">
            예약 확인 문자가 발송됩니다
          </p>

          <div className="bg-[var(--gray-50)] rounded-xl p-4 mb-6">
            <p className="text-sm text-[var(--gray-500)] mb-1">예약 번호</p>
            <p className="text-xl font-bold text-[var(--primary-600)]">
              {bookingNumber}
            </p>
          </div>

          <div className="bg-[var(--primary-50)] rounded-xl p-4 mb-8 text-left">
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="w-5 h-5 text-[var(--primary-500)]" />
              <span className="font-medium text-[var(--gray-900)]">
                예약 일정
              </span>
            </div>
            <p className="text-[var(--gray-700)]">
              {formatDate(new Date(selectedDate!))} {selectedTime}
            </p>
            <p className="text-[var(--gray-600)]">
              {selectedDoctor?.name} {selectedDoctor?.title}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={handleGoHome}
              leftIcon={<Home className="w-5 h-5" />}
            >
              홈으로
            </Button>
            <Link href="/booking" className="flex-1">
              <Button
                className="w-full"
                onClick={() => {
                  setShowSuccessModal(false);
                  resetBooking();
                }}
              >
                새 예약하기
              </Button>
            </Link>
          </div>
        </div>
      </Modal>
    </div>
  );
}
