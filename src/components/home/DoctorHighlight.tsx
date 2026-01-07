"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, GraduationCap, X, Clock } from "lucide-react";
import { doctors } from "@/data";
import { Button, Badge } from "@/components/ui";

// 진료시간표 모달 컴포넌트
function ScheduleModal({ doctor, onClose }: { doctor: typeof doctors[0]; onClose: () => void }) {
  const schedule = [
    { day: "월요일", am: "09:00-12:30", pm: "14:00-18:00" },
    { day: "화요일", am: "09:00-12:30", pm: "14:00-18:00" },
    { day: "수요일", am: "09:00-12:30", pm: "휴진" },
    { day: "목요일", am: "09:00-12:30", pm: "14:00-18:00" },
    { day: "금요일", am: "09:00-12:30", pm: "14:00-18:00" },
    { day: "토요일", am: "09:00-13:00", pm: "휴진" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal - 여유있는 패딩 */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md animate-slide-up">
        {/* Header - p-7 이상 */}
        <div className="flex items-center justify-between px-8 py-7 border-b border-[var(--slate-100)]">
          <div>
            <h3 className="text-2xl font-bold text-[var(--gray-900)]">{doctor.name} 원장님</h3>
            <p className="text-lg text-[var(--gray-500)] mt-2">주간 진료 시간표</p>
          </div>
          <button
            onClick={onClose}
            className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-[var(--slate-100)] transition-colors"
          >
            <X className="w-6 h-6 text-[var(--gray-500)]" />
          </button>
        </div>

        {/* Schedule Table - p-8 */}
        <div className="px-8 py-7">
          <table className="w-full">
            <thead>
              <tr className="text-lg text-[var(--gray-500)]">
                <th className="text-left py-4 font-medium">요일</th>
                <th className="text-center py-4 font-medium">오전</th>
                <th className="text-center py-4 font-medium">오후</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((item) => (
                <tr key={item.day} className="border-t border-[var(--slate-100)]">
                  <td className="py-5 text-lg font-medium text-[var(--gray-900)]">{item.day}</td>
                  <td className="py-5 text-lg text-center text-[var(--gray-600)]">{item.am}</td>
                  <td className={`py-5 text-lg text-center ${item.pm === '휴진' ? 'text-[var(--error-500)] font-medium' : 'text-[var(--gray-600)]'}`}>
                    {item.pm}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="mt-6 text-base text-[var(--gray-500)] text-center">
            * 점심시간: 12:30 - 14:00 | 진료 일정은 변경될 수 있습니다
          </p>
        </div>

        {/* Footer - p-8 */}
        <div className="px-8 py-7 border-t border-[var(--slate-100)] bg-[var(--slate-50)] rounded-b-3xl">
          <Link href="/booking">
            <Button variant="cta" size="lg" className="w-full">
              예약하기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export function DoctorHighlight() {
  const [selectedDoctor, setSelectedDoctor] = useState<typeof doctors[0] | null>(null);

  // 병원장 및 과장급 의료진 표시
  const highlightedDoctors = doctors.filter((doc) =>
    doc.title.includes("병원장") || doc.title.includes("과장")
  ).slice(0, 3);

  return (
    // 섹션 간격 py-32 (128px)
    <section className="py-28 lg:py-36 bg-white">
      <div style={{ maxWidth: '80rem', marginLeft: 'auto', marginRight: 'auto' }} className="px-8 lg:px-12">
        {/* 헤더 영역 간격 - mb-16 (64px) */}
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold text-[var(--gray-900)] mb-6">
            전문 의료진 소개
          </h2>
          <p className="text-xl text-[var(--gray-600)] max-w-2xl mx-auto leading-relaxed">
            풍부한 경험과 전문성을 갖춘 의료진이 여러분을 기다립니다
          </p>
        </div>

        {/* 카드 그리드 - gap-8 (32px) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {highlightedDoctors.map((doctor) => (
            // 흰색 배경 + border-slate-100 + shadow-lg
            <div key={doctor.id} className="bg-white rounded-3xl border border-[var(--slate-100)] shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-300/50 transition-all duration-300 overflow-hidden hover:-translate-y-2">
              {/* Profile Image Area */}
              <div className="relative aspect-[4/3] bg-gradient-to-br from-[var(--slate-100)] to-[var(--slate-50)] flex items-center justify-center">
                <div className="w-28 h-28 bg-[var(--primary-100)] rounded-full flex items-center justify-center">
                  <span className="text-6xl">👨‍⚕️</span>
                </div>
                {/* Title Badge */}
                <div className="absolute top-6 right-6">
                  <Badge variant="primary" size="lg">
                    {doctor.title}
                  </Badge>
                </div>
              </div>

              {/* Content - p-8 최소 패딩 */}
              <div className="p-7 lg:p-8">
                {/* Name */}
                <h3 className="text-2xl font-bold text-[var(--gray-900)] mb-5">
                  {doctor.name}
                  <span className="text-[var(--gray-500)] font-normal text-xl ml-2">원장</span>
                </h3>

                {/* Specialties - 간격 확대 */}
                <div className="flex flex-wrap gap-2.5 mb-6">
                  {doctor.specialty.slice(0, 2).map((spec, index) => (
                    <Badge key={index} variant="outline" size="md">
                      {spec}
                    </Badge>
                  ))}
                </div>

                {/* Key Info - space-x-4 아이콘-텍스트 간격 */}
                <div className="flex items-start gap-4 text-[var(--gray-600)] mb-8">
                  <GraduationCap className="w-6 h-6 text-[var(--primary-500)] flex-shrink-0 mt-0.5" />
                  <span className="text-lg leading-relaxed line-clamp-2">{doctor.career[0]}</span>
                </div>

                {/* Actions - h-14 (56px) 터치 타겟 */}
                <div className="flex gap-4">
                  <button
                    onClick={() => setSelectedDoctor(doctor)}
                    className="flex-1 flex items-center justify-center gap-3 h-14 px-5 rounded-2xl border-2 border-[var(--slate-200)] text-lg font-medium text-[var(--gray-700)] hover:bg-[var(--slate-50)] hover:border-[var(--slate-300)] transition-all duration-300"
                  >
                    <Clock className="w-5 h-5" />
                    진료시간표
                  </button>
                  <Link href={`/doctors/${doctor.id}`} className="flex-1">
                    <button className="w-full flex items-center justify-center gap-3 h-14 px-5 rounded-2xl bg-[var(--primary-500)] text-lg font-medium text-white hover:bg-[var(--primary-600)] transition-all duration-300 shadow-md hover:shadow-lg">
                      자세히 보기
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 하단 버튼 - mt-16 (64px) */}
        <div className="mt-16 lg:mt-20 text-center">
          <Link href="/doctors">
            <Button variant="secondary" size="lg" rightIcon={<ArrowRight className="w-6 h-6" />}>
              전체 의료진 보기
            </Button>
          </Link>
        </div>
      </div>

      {/* Schedule Modal */}
      {selectedDoctor && (
        <ScheduleModal doctor={selectedDoctor} onClose={() => setSelectedDoctor(null)} />
      )}
    </section>
  );
}
