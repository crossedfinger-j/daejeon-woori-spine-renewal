"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { bodyParts } from "@/data";

export function QuickBookingCTA() {
  const [selectedPart, setSelectedPart] = useState<string | null>(null);

  return (
    // 섹션 간격 py-32 (128px)
    <section className="py-28 lg:py-36 bg-white">
      <div style={{ maxWidth: '80rem', marginLeft: 'auto', marginRight: 'auto' }} className="px-8 lg:px-12">
        {/* 헤더 영역 간격 - mb-16 (64px) */}
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold text-[var(--gray-900)] mb-6">
            어디가 불편하신가요?
          </h2>
          <p className="text-xl text-[var(--gray-600)] max-w-2xl mx-auto leading-relaxed">
            불편한 부위를 선택하시면 맞춤 전문의를 추천해드립니다
          </p>
        </div>

        {/* 아이콘 그리드 - 터치 타겟 최소 h-14 (56px), 간격 확대 */}
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-5 lg:gap-6">
          {bodyParts.map((part) => {
            const isSelected = selectedPart === part.id;
            return (
              <button
                key={part.id}
                onClick={() => setSelectedPart(part.id)}
                className={`
                  relative group flex flex-col items-center min-h-[7rem] p-6 lg:p-7 rounded-3xl border-2 transition-all duration-300
                  ${isSelected
                    ? 'border-[var(--primary-500)] bg-[var(--primary-50)] shadow-lg shadow-primary-200/50'
                    : 'border-[var(--slate-200)] bg-white hover:border-[var(--primary-300)] hover:bg-[var(--slate-50)] hover:shadow-lg shadow-sm'
                  }
                `}
              >
                {/* 선택 체크 표시 */}
                {isSelected && (
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-[var(--primary-500)] rounded-full flex items-center justify-center shadow-lg">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                )}

                <span className="text-5xl lg:text-6xl mb-4">{part.icon}</span>
                <span className={`text-base lg:text-lg font-semibold text-center ${isSelected ? 'text-[var(--primary-700)]' : 'text-[var(--gray-700)]'}`}>
                  {part.nameKo}
                </span>
              </button>
            );
          })}
        </div>

        {/* 선택 후 예약 버튼 - h-14 (56px) 터치 타겟 */}
        {selectedPart && (
          <div className="mt-14 text-center animate-fade-in">
            <Link
              href={`/booking/symptom?bodyPart=${selectedPart}`}
              className="inline-flex items-center gap-4 bg-[var(--primary-500)] text-white h-16 px-10 rounded-2xl font-semibold text-xl hover:bg-[var(--primary-600)] transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              <span>증상 선택하기</span>
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/booking"
            className="inline-flex items-center gap-3 text-[var(--gray-500)] hover:text-[var(--primary-500)] transition-colors text-lg"
          >
            <span>전체 증상 보기</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
