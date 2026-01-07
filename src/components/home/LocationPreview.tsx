"use client";

import Link from "next/link";
import { MapPin, Phone, Clock, Car, Bus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui";

export function LocationPreview() {
  return (
    // 섹션 간격 py-32 (128px)
    <section className="py-28 lg:py-36 bg-[var(--slate-50)]">
      <div style={{ maxWidth: '80rem', marginLeft: 'auto', marginRight: 'auto' }} className="px-8 lg:px-12">
        {/* 헤더 영역 간격 - mb-16 (64px) */}
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold text-[var(--gray-900)] mb-6">
            오시는 길
          </h2>
          <p className="text-xl text-[var(--gray-600)] max-w-2xl mx-auto leading-relaxed">
            대전우리병원으로 쉽고 편하게 찾아오세요
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Map Placeholder - shadow-lg 적용 */}
          <div className="relative aspect-[4/3] bg-[var(--slate-100)] rounded-3xl overflow-hidden border border-[var(--slate-200)] shadow-lg shadow-slate-200/50">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-[var(--primary-100)] rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="w-12 h-12 text-[var(--primary-500)]" />
                </div>
                <p className="text-lg text-[var(--gray-600)] font-medium">지도 영역</p>
                <p className="text-base text-[var(--gray-500)] mt-3">
                  카카오맵 API 연동 예정
                </p>
              </div>
            </div>
          </div>

          {/* Info - 정보 분리 및 계층 구조 (border-t 구분선) */}
          <div className="space-y-6">
            {/* Address - p-8 최소 패딩, space-x-4 아이콘-텍스트 */}
            <div className="flex gap-6 p-7 lg:p-8 bg-white rounded-3xl border border-[var(--slate-100)] shadow-lg shadow-slate-200/50">
              <div className="w-14 h-14 bg-[var(--primary-50)] rounded-2xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-7 h-7 text-[var(--primary-500)]" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-[var(--gray-900)] mb-3">주소</h3>
                <p className="text-lg text-[var(--gray-600)] leading-relaxed">
                  대전광역시 서구 문정로48번길 70 (탄방동)
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-6 p-7 lg:p-8 bg-white rounded-3xl border border-[var(--slate-100)] shadow-lg shadow-slate-200/50">
              <div className="w-14 h-14 bg-[var(--success-50)] rounded-2xl flex items-center justify-center flex-shrink-0">
                <Phone className="w-7 h-7 text-[var(--success-600)]" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-[var(--gray-900)] mb-3">전화번호</h3>
                <a
                  href="tel:1577-0052"
                  className="text-2xl text-[var(--primary-600)] font-bold hover:text-[var(--primary-700)] transition-colors"
                >
                  1577-0052
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="flex gap-6 p-7 lg:p-8 bg-white rounded-3xl border border-[var(--slate-100)] shadow-lg shadow-slate-200/50">
              <div className="w-14 h-14 bg-[var(--warning-50)] rounded-2xl flex items-center justify-center flex-shrink-0">
                <Clock className="w-7 h-7 text-[var(--warning-600)]" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-[var(--gray-900)] mb-4">진료시간</h3>
                <div className="space-y-3 text-lg text-[var(--gray-600)]">
                  <p><span className="font-semibold">평일</span> 09:00 - 18:00</p>
                  <p><span className="font-semibold">토요일</span> 09:00 - 17:00</p>
                  <p className="text-[var(--gray-500)] border-t border-[var(--slate-100)] pt-3 mt-3">점심시간 12:30 - 13:30</p>
                </div>
              </div>
            </div>

            {/* Transport - p-6 패딩, gap-5 */}
            <div className="grid grid-cols-2 gap-5">
              <div className="flex items-center gap-5 p-6 bg-white rounded-3xl border border-[var(--slate-100)] shadow-md shadow-slate-200/50">
                <div className="w-13 h-13 bg-[var(--slate-100)] rounded-2xl flex items-center justify-center">
                  <Car className="w-6 h-6 text-[var(--gray-600)]" />
                </div>
                <div>
                  <p className="font-bold text-lg text-[var(--gray-900)]">자가용</p>
                  <p className="text-base text-[var(--gray-500)] mt-1">300대 주차</p>
                </div>
              </div>
              <div className="flex items-center gap-5 p-6 bg-white rounded-3xl border border-[var(--slate-100)] shadow-md shadow-slate-200/50">
                <div className="w-13 h-13 bg-[var(--slate-100)] rounded-2xl flex items-center justify-center">
                  <Bus className="w-6 h-6 text-[var(--gray-600)]" />
                </div>
                <div>
                  <p className="font-bold text-lg text-[var(--gray-900)]">대중교통</p>
                  <p className="text-base text-[var(--gray-500)] mt-1">버스 102, 301</p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Link href="/location">
                <Button variant="secondary" size="lg" rightIcon={<ArrowRight className="w-6 h-6" />}>
                  자세한 길안내
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
