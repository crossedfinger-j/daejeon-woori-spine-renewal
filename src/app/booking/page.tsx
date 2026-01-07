"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Clock, UserCheck, Calendar, ClipboardCheck } from "lucide-react";
import { Button, Card, CardContent } from "@/components/ui";
import { useBookingStore } from "@/stores/bookingStore";

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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl lg:text-4xl font-bold text-[var(--gray-900)] mb-4">
          온라인 진료 예약
        </h1>
        <p className="text-lg text-[var(--gray-600)] max-w-2xl mx-auto">
          증상에 맞는 전문의를 추천받고, 원하는 시간에 편리하게 예약하세요
        </p>
      </div>

      {/* Steps */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {steps.map((step, index) => (
          <Card key={index} className="text-center">
            <CardContent className="pt-6">
              <div className="w-14 h-14 bg-[var(--primary-50)] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <step.icon className="w-7 h-7 text-[var(--primary-500)]" />
              </div>
              <div className="text-sm font-medium text-[var(--primary-600)] mb-1">
                STEP {index + 1}
              </div>
              <h3 className="font-semibold text-[var(--gray-900)] mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-[var(--gray-500)]">{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center">
        <Button
          size="lg"
          onClick={handleStart}
          rightIcon={<ArrowRight className="w-5 h-5" />}
          className="min-w-[200px]"
        >
          예약 시작하기
        </Button>

        <p className="mt-6 text-sm text-[var(--gray-500)]">
          전화 예약을 원하시면{" "}
          <a
            href="tel:1577-0052"
            className="text-[var(--primary-600)] font-medium hover:underline"
          >
            1577-0052
          </a>
          로 연락주세요
        </p>
      </div>
    </div>
  );
}
