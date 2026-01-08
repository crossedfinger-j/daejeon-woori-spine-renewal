"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, CheckCircle, Home, Calendar, Phone } from "lucide-react";
import { Button, Modal } from "@/components/ui";
import {
  BookingForm,
  ProgressBar,
  BookingSummary,
} from "@/components/booking";
import { useBookingStore } from "@/stores/bookingStore";
import { PatientFormData } from "@/lib/validation";
import { formatDate } from "@/lib/utils";

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
    <div style={{ position: 'relative', maxWidth: '56rem', marginLeft: 'auto', marginRight: 'auto', paddingTop: '140px', paddingBottom: '32px', paddingLeft: '24px', paddingRight: '24px' }}>
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

      <ProgressBar currentStep={4} />

      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--gray-900)', marginBottom: '8px' }}>
          예약 정보를 확인해주세요
        </h1>
        <p style={{ color: 'var(--gray-600)', fontSize: '16px' }}>
          환자 정보를 입력하고 예약을 완료해주세요
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

      {/* Form */}
      <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid var(--gray-200)', padding: '24px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--gray-900)', marginBottom: '24px' }}>
          환자 정보 입력
        </h2>
        <BookingForm onSubmit={handleSubmit} isLoading={isSubmitting} />
      </div>

      {/* Success Modal */}
      <Modal
        isOpen={showSuccessModal}
        onClose={() => {}}
        size="md"
        hideCloseButton={true}
        title="예약 완료"
      >
        <div style={{ textAlign: 'center', paddingTop: '8px' }}>
          {/* 성공 아이콘 */}
          <div style={{
            width: '72px',
            height: '72px',
            backgroundColor: 'var(--success-50)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px'
          }}>
            <CheckCircle style={{ width: '36px', height: '36px', color: 'var(--success-500)' }} />
          </div>

          <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--gray-900)', marginBottom: '12px' }}>
            예약 접수가 완료되었습니다
          </h2>

          {/* 예약 번호 */}
          <div style={{
            backgroundColor: 'var(--primary-50)',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '16px',
            border: '1px solid var(--primary-100)'
          }}>
            <p style={{ fontSize: '13px', color: 'var(--primary-600)', marginBottom: '4px' }}>예약 번호</p>
            <p style={{ fontSize: '24px', fontWeight: 700, color: 'var(--primary-600)', letterSpacing: '1px' }}>
              {bookingNumber}
            </p>
          </div>

          {/* 중요 안내 */}
          <p style={{
            fontSize: '15px',
            color: 'var(--warning-700)',
            backgroundColor: 'var(--warning-50)',
            padding: '14px 16px',
            borderRadius: '10px',
            marginBottom: '16px',
            fontWeight: 500,
            lineHeight: 1.6
          }}>
            접수 시 예약번호를 말씀해주세요
          </p>

          {/* 예약 일정 */}
          <div style={{
            backgroundColor: 'var(--gray-50)',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '20px',
            textAlign: 'left'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <Calendar style={{ width: '18px', height: '18px', color: 'var(--primary-500)' }} />
              <span style={{ fontWeight: 600, color: 'var(--gray-900)', fontSize: '15px' }}>
                예약 일정
              </span>
            </div>
            <p style={{ color: 'var(--gray-800)', fontSize: '15px', fontWeight: 500, marginBottom: '4px' }}>
              {formatDate(new Date(selectedDate!))} {selectedTime}
            </p>
            <p style={{ color: 'var(--gray-600)', fontSize: '14px' }}>
              {selectedDoctor?.name} {selectedDoctor?.title}
            </p>
          </div>

          {/* 전화 안내 */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '20px',
            padding: '12px',
            backgroundColor: 'var(--gray-100)',
            borderRadius: '10px'
          }}>
            <Phone style={{ width: '16px', height: '16px', color: 'var(--gray-600)' }} />
            <span style={{ fontSize: '14px', color: 'var(--gray-600)', whiteSpace: 'nowrap' }}>
              예약 문의: <strong style={{ color: 'var(--gray-900)' }}>1577-0052</strong>
            </span>
          </div>

          {/* 버튼 */}
          <Button
            style={{ width: '100%', height: '52px' }}
            onClick={handleGoHome}
            leftIcon={<Home style={{ width: '18px', height: '18px' }} />}
          >
            홈으로 돌아가기
          </Button>
        </div>
      </Modal>
    </div>
  );
}
