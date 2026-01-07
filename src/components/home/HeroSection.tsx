"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui";

export function HeroSection() {
  const highlights = [
    "척추·관절 전문 의료진",
    "최신 의료장비 완비",
    "맞춤형 비수술 치료",
  ];

  return (
    <section className="relative min-h-[720px] lg:min-h-[800px] flex items-center bg-gradient-to-br from-[var(--primary-50)] via-white to-[var(--gray-50)]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--primary-100)] rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--primary-50)] rounded-full blur-3xl" />
      </div>

      {/* 헤더 높이를 고려한 상단 패딩 + py-32 섹션 간격 */}
      <div style={{ maxWidth: '80rem', marginLeft: 'auto', marginRight: 'auto' }} className="relative px-8 lg:px-12 pt-32 lg:pt-40 pb-24 lg:pb-32 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-3 bg-[var(--primary-500)]/10 text-[var(--primary-600)] px-6 py-3 rounded-full text-base font-medium mb-8">
              <span className="w-2.5 h-2.5 bg-[var(--primary-500)] rounded-full animate-pulse" />
              대전 지역 척추·관절 전문
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-[var(--gray-900)] leading-tight mb-10">
              건강한 일상으로의
              <br />
              <span className="text-[var(--primary-500)]">빠른 복귀</span>를
              <br />
              도와드립니다
            </h1>

            <p className="text-xl lg:text-2xl text-[var(--gray-600)] mb-12 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              20년 이상의 전문 의료진이 정확한 진단과 환자 맞춤형 치료로
              여러분의 건강을 책임집니다.
            </p>

            {/* Highlights - 간격 확대 + 아이콘-텍스트 space-x-4 */}
            <ul className="flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-4 mb-12">
              {highlights.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-4 text-[var(--gray-700)]"
                >
                  <CheckCircle className="w-6 h-6 text-[var(--success-600)]" />
                  <span className="text-lg font-medium">{item}</span>
                </li>
              ))}
            </ul>

            {/* CTA Buttons - 간격 확대 */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
              <Link href="/booking">
                <Button
                  variant="cta"
                  size="lg"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                >
                  온라인 예약하기
                </Button>
              </Link>
              <a href="tel:1577-0052">
                <Button
                  variant="secondary"
                  size="lg"
                  leftIcon={<Phone className="w-5 h-5" />}
                >
                  1577-0052
                </Button>
              </a>
            </div>
          </div>

          {/* Hero Image/Illustration */}
          <div className="hidden lg:block relative">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Main Card */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-500)] to-[var(--primary-700)] rounded-3xl shadow-2xl flex items-center justify-center">
                <div className="text-center text-white p-10">
                  <div className="w-28 h-28 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-6xl">🏥</span>
                  </div>
                  <p className="text-3xl font-bold">대전우리병원</p>
                  <p className="text-white/80 mt-2 text-lg">척추·관절 전문</p>
                </div>
              </div>

              {/* Floating Cards - 충분한 내부 여백 */}
              <div className="absolute -left-8 top-1/4 bg-white rounded-3xl shadow-xl pl-6 pr-8 py-5 animate-slide-up border border-[var(--slate-100)]">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-[var(--success-50)] rounded-2xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-7 h-7 text-[var(--success-600)]" />
                  </div>
                  <div className="pr-2">
                    <p className="font-bold text-lg text-[var(--gray-900)]">비수술 치료</p>
                    <p className="text-base text-[var(--gray-500)] mt-1.5">90% 성공률</p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-6 bottom-1/4 bg-white rounded-3xl shadow-xl pl-6 pr-8 py-5 animate-slide-up border border-[var(--slate-100)]" style={{ animationDelay: "0.2s" }}>
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-[var(--primary-50)] rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl">👨‍⚕️</span>
                  </div>
                  <div className="pr-2">
                    <p className="font-bold text-lg text-[var(--gray-900)]">전문 의료진</p>
                    <p className="text-base text-[var(--gray-500)] mt-1.5">27년+ 경력</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
