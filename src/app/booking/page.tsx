"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Clock, UserCheck, Calendar, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui";
import { useBookingStore } from "@/stores/bookingStore";
import { PageHeader } from "@/components/common";

const steps = [
  {
    icon: ClipboardCheck,
    title: "증상 선택",
    description: "불편한 부위와 증상을 선택해주세요",
  },
  {
    icon: UserCheck,
    title: "의료진 매칭",
    description: "증상에 맞는 전문의를 추천해드립니다",
  },
  {
    icon: Calendar,
    title: "시간 선택",
    description: "원하시는 날짜와 시간을 선택해주세요",
  },
  {
    icon: Clock,
    title: "예약 완료",
    description: "정보 입력 후 예약이 완료됩니다",
  },
];

export default function BookingPage() {
  const router = useRouter();
  const resetBooking = useBookingStore((state) => state.resetBooking);

  useEffect(() => {
    // 예약 페이지 진입 시 상태 초기화
    resetBooking();
  }, [resetBooking]);

  const handleStart = () => {
    router.push("/booking/symptom");
  };

  return (
    <main style={{ paddingTop: '80px', minHeight: '100vh', backgroundColor: 'var(--slate-50)' }}>
      <PageHeader
        title="온라인 진료 예약"
        description="증상에 맞는 전문의를 추천받고, 원하는 시간에 편리하게 예약하세요"
      />

      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '24px 20px' }}>
        {/* Steps */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px',
          marginBottom: '40px'
        }}>
          {steps.map((step, index) => (
            <div
              key={index}
              style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                border: '1px solid var(--slate-200)',
                padding: '20px 16px',
                textAlign: 'center'
              }}
            >
              <div style={{
                width: '44px',
                height: '44px',
                backgroundColor: 'var(--primary-50)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px'
              }}>
                <step.icon style={{ width: '22px', height: '22px', color: 'var(--primary-500)' }} />
              </div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary-600)', marginBottom: '4px' }}>
                STEP {index + 1}
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--gray-900)', marginBottom: '6px' }}>
                {step.title}
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--gray-500)', lineHeight: '1.5' }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', paddingTop: '8px' }}>
          <Button
            size="lg"
            onClick={handleStart}
            rightIcon={<ArrowRight style={{ width: '20px', height: '20px' }} />}
            style={{ minWidth: '200px' }}
          >
            예약 시작하기
          </Button>

          <p style={{ marginTop: '24px', fontSize: '14px', color: 'var(--gray-500)', lineHeight: 1.6 }}>
            <span style={{ whiteSpace: 'nowrap' }}>전화 예약을 원하시면</span>{" "}
            <a
              href="tel:1577-0052"
              style={{ color: 'var(--primary-600)', fontWeight: 500, whiteSpace: 'nowrap' }}
            >
              1577-0052
            </a>
            <span style={{ whiteSpace: 'nowrap' }}>로 연락주세요</span>
          </p>
        </div>
      </div>
    </main>
  );
}
