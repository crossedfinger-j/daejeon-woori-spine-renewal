"use client";

import Link from "next/link";
import { Phone, MapPin, Clock, Car, ArrowRight } from "lucide-react";

// 실제 대전우리병원 정보
const hospitalInfo = {
  name: "대전우리병원",
  tagline: "척추·관절 전문",
  description:
    "세계양방향척추내시경수술학회(WUBES) 회장 박철웅 병원장이 이끄는 대전 지역 최고의 척추·관절 전문 병원입니다.",
  phone: "1577-0052",
  fax: "042-478-9114",
  address: "대전광역시 서구 문정로48번길 70 (탄방동)",
  parking: "300대 이상 주차 가능",
  hours: {
    weekday: "09:00 - 18:00",
    saturday: "09:00 - 17:00",
    lunch: "12:30 - 13:30",
    emergency: "24시간 응급환자 진료",
  },
};

export function Footer() {
  return (
    <footer className="bg-[var(--gray-900)] text-white">
      {/* py-24 (96px) 내부 여백 */}
      <div style={{ maxWidth: '80rem', marginLeft: 'auto', marginRight: 'auto' }} className="px-8 lg:px-12 py-20 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* 병원 정보 - space-x-4 아이콘-텍스트 */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-5 mb-8">
              <div className="w-14 h-14 bg-[var(--primary-500)] rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-2xl">W</span>
              </div>
              <div>
                <p className="font-bold text-2xl">{hospitalInfo.name}</p>
                <p className="text-lg text-[var(--gray-400)]">{hospitalInfo.tagline}</p>
              </div>
            </div>
            <p className="text-lg text-[var(--gray-400)] mb-10 max-w-lg leading-relaxed">
              {hospitalInfo.description}
            </p>
            <div className="space-y-5">
              <a
                href={`tel:${hospitalInfo.phone}`}
                className="flex items-center gap-5 text-[var(--gray-300)] hover:text-white transition-colors group"
              >
                <div className="w-13 h-13 bg-[var(--primary-500)]/20 rounded-2xl flex items-center justify-center group-hover:bg-[var(--primary-500)]/30 transition-colors">
                  <Phone className="w-6 h-6 text-[var(--primary-400)]" />
                </div>
                <span className="font-bold text-2xl">{hospitalInfo.phone}</span>
              </a>
              <div className="flex items-center gap-5 text-[var(--gray-400)]">
                <div className="w-13 h-13 bg-[var(--gray-700)] rounded-2xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-[var(--gray-400)]" />
                </div>
                <span className="text-lg">{hospitalInfo.address}</span>
              </div>
              <div className="flex items-center gap-5 text-[var(--gray-400)]">
                <div className="w-13 h-13 bg-[var(--gray-700)] rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Car className="w-6 h-6 text-[var(--gray-400)]" />
                </div>
                <span className="text-lg">{hospitalInfo.parking}</span>
              </div>
            </div>
          </div>

          {/* 진료시간 - space-x-4 간격 */}
          <div>
            <h3 className="font-bold text-xl mb-8 flex items-center gap-3">
              <Clock className="w-6 h-6 text-[var(--primary-400)]" />
              진료시간
            </h3>
            <ul className="space-y-5 text-lg">
              <li className="flex justify-between text-[var(--gray-400)]">
                <span>평일</span>
                <span className="font-semibold text-white">{hospitalInfo.hours.weekday}</span>
              </li>
              <li className="flex justify-between text-[var(--gray-400)]">
                <span>토요일</span>
                <span className="font-semibold text-white">{hospitalInfo.hours.saturday}</span>
              </li>
              <li className="flex justify-between text-[var(--gray-400)]">
                <span>점심시간</span>
                <span className="font-semibold text-white">{hospitalInfo.hours.lunch}</span>
              </li>
              <li className="flex justify-between text-[var(--error-400)] pt-5 border-t border-[var(--gray-700)]">
                <span>일/공휴일</span>
                <span className="font-semibold">휴진</span>
              </li>
              <li className="flex justify-between text-[var(--success-500)] pt-5">
                <span>응급</span>
                <span className="font-bold">24시간</span>
              </li>
            </ul>
          </div>

          {/* 바로가기 */}
          <div>
            <h3 className="font-bold text-xl mb-8">바로가기</h3>
            <ul className="space-y-5">
              {[
                { href: "/booking", label: "온라인 예약" },
                { href: "/centers", label: "전문센터 안내" },
                { href: "/doctors", label: "의료진 소개" },
                { href: "/location", label: "오시는 길" },
                { href: "/certificate", label: "증명서 발급" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 text-lg text-[var(--gray-400)] hover:text-white transition-colors group"
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="w-5 h-5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 하단 - mt-16 (64px), pt-10 */}
        <div className="mt-16 pt-10 border-t border-[var(--gray-800)]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-lg text-[var(--gray-500)]">
              © 2025 대전우리병원. All rights reserved.
            </p>
            <div className="flex gap-10 text-lg text-[var(--gray-500)]">
              <Link href="/privacy" className="hover:text-white transition-colors">
                개인정보처리방침
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                이용약관
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
