"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, GraduationCap, X, Clock } from "lucide-react";
import { doctors } from "@/data";
import { Button, Badge } from "@/components/ui";
import { useBookingStore } from "@/stores/bookingStore";

// 진료시간표 모달 컴포넌트
function ScheduleModal({ doctor, onClose, onBooking }: { doctor: typeof doctors[0]; onClose: () => void; onBooking: () => void }) {
  const schedule = [
    { day: "월요일", am: "09:00-12:30", pm: "14:00-18:00" },
    { day: "화요일", am: "09:00-12:30", pm: "14:00-18:00" },
    { day: "수요일", am: "09:00-12:30", pm: "휴진" },
    { day: "목요일", am: "09:00-12:30", pm: "14:00-18:00" },
    { day: "금요일", am: "09:00-12:30", pm: "14:00-18:00" },
    { day: "토요일", am: "09:00-13:00", pm: "휴진" },
  ];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}>
      {/* Backdrop */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }}
        onClick={onClose}
      />

      {/* Modal */}
      <div style={{
        position: 'relative',
        backgroundColor: 'white',
        borderRadius: '20px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        width: '100%',
        maxWidth: '420px',
        maxHeight: 'calc(100vh - 32px)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Header - 고정 */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 24px',
          borderBottom: '1px solid var(--gray-100)',
          flexShrink: 0
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--gray-900)' }}>
            {doctor.name} 원장님
          </h3>
          <button
            onClick={onClose}
            style={{
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: 'var(--gray-100)',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              flexShrink: 0
            }}
          >
            <X style={{ width: '20px', height: '20px', color: 'var(--gray-600)' }} />
          </button>
        </div>

        {/* Schedule Table - 스크롤 영역 */}
        <div style={{
          padding: '20px 24px',
          overflowY: 'auto',
          flex: 1,
          WebkitOverflowScrolling: 'touch'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '10px 0', fontSize: '14px', fontWeight: 500, color: 'var(--gray-500)' }}>요일</th>
                <th style={{ textAlign: 'center', padding: '10px 0', fontSize: '14px', fontWeight: 500, color: 'var(--gray-500)' }}>오전</th>
                <th style={{ textAlign: 'center', padding: '10px 0', fontSize: '14px', fontWeight: 500, color: 'var(--gray-500)' }}>오후</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((item) => (
                <tr key={item.day} style={{ borderTop: '1px solid var(--gray-100)' }}>
                  <td style={{ padding: '12px 0', fontSize: '15px', fontWeight: 500, color: 'var(--gray-900)' }}>{item.day}</td>
                  <td style={{ padding: '12px 0', fontSize: '15px', textAlign: 'center', color: 'var(--gray-600)' }}>{item.am}</td>
                  <td style={{
                    padding: '12px 0',
                    fontSize: '15px',
                    textAlign: 'center',
                    color: item.pm === '휴진' ? 'var(--error-500)' : 'var(--gray-600)',
                    fontWeight: item.pm === '휴진' ? 500 : 400
                  }}>
                    {item.pm}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p style={{
            marginTop: '16px',
            fontSize: '13px',
            color: 'var(--gray-500)',
            textAlign: 'center',
            lineHeight: 1.6
          }}>
            * 점심시간: 12:30 - 14:00<br />
            진료 일정은 변경될 수 있습니다
          </p>
        </div>

        {/* Footer - 고정 */}
        <div style={{
          padding: '16px 24px',
          paddingBottom: 'max(16px, env(safe-area-inset-bottom))',
          borderTop: '1px solid var(--gray-100)',
          backgroundColor: 'var(--gray-50)',
          flexShrink: 0
        }}>
          <Button variant="cta" size="lg" style={{ width: '100%' }} onClick={onBooking}>
            예약하기
          </Button>
        </div>
      </div>
    </div>
  );
}

export function DoctorHighlight() {
  const [selectedDoctor, setSelectedDoctor] = useState<typeof doctors[0] | null>(null);
  const router = useRouter();
  const { setDoctor, setStep, resetBooking } = useBookingStore();

  // 병원장 및 과장급 의료진 표시
  const highlightedDoctors = doctors.filter((doc) =>
    doc.title.includes("병원장") || doc.title.includes("과장")
  ).slice(0, 3);

  const handleBookingWithDoctor = () => {
    if (selectedDoctor) {
      // 예약 상태 초기화 후 해당 의료진만 선택하고 증상 선택 페이지로 이동
      resetBooking();
      setDoctor(selectedDoctor);
      setStep(1);
      router.push("/booking/symptom");
    }
  };

  return (
    // 섹션 간격 확장 - Silver-Friendly
    <section className="section-container" style={{ backgroundColor: 'white' }}>
      <div className="content-container">
        {/* 헤더 영역 간격 확장 */}
        <div className="text-center mb-14 lg:mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold text-[var(--gray-900)] mb-8 lg:mb-10" style={{ lineHeight: '1.3' }}>
            전문 의료진 소개
          </h2>
          <p className="text-xl lg:text-2xl text-[var(--gray-600)] max-w-2xl mx-auto" style={{ lineHeight: '1.8' }}>
            풍부한 경험과 전문성을 갖춘 의료진이 여러분을 기다립니다
          </p>
        </div>

        {/* 카드 그리드 */}
        <div className="card-grid-3">
          {highlightedDoctors.map((doctor) => (
            <div key={doctor.id} className="bg-white rounded-3xl border border-[var(--slate-100)] shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-300/50 transition-all duration-300 overflow-hidden hover:-translate-y-2">
              {/* Profile Image Area - 더 컴팩트하게 */}
              <div className="relative bg-gradient-to-br from-[var(--slate-50)] to-[var(--slate-100)] flex items-center justify-center" style={{ padding: '32px 24px' }}>
                <div className="w-24 h-24 bg-[var(--primary-100)] rounded-full flex items-center justify-center">
                  <span className="text-5xl">👨‍⚕️</span>
                </div>
                {/* Title Badge */}
                <div className="absolute top-4 right-4">
                  <Badge variant="primary" size="sm">
                    {doctor.title}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '24px' }}>
                {/* Name & Title */}
                <div style={{ marginBottom: '16px', textAlign: 'center' }}>
                  <h3 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--gray-900)', marginBottom: '4px', whiteSpace: 'nowrap' }}>
                    {doctor.name}
                    <span style={{ fontWeight: 400, fontSize: '16px', color: 'var(--gray-500)', marginLeft: '6px' }}>원장</span>
                  </h3>
                </div>

                {/* Specialties - 중앙 정렬 */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginBottom: '16px' }}>
                  {doctor.specialty.slice(0, 2).map((spec, index) => (
                    <Badge key={index} variant="outline" size="sm">
                      {spec}
                    </Badge>
                  ))}
                </div>

                {/* Key Info - 컴팩트하게 */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', backgroundColor: 'var(--slate-50)', borderRadius: '12px', marginBottom: '20px' }}>
                  <GraduationCap style={{ width: '18px', height: '18px', color: 'var(--primary-500)', flexShrink: 0 }} />
                  <span style={{ fontSize: '14px', color: 'var(--gray-600)', lineHeight: '1.5', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{doctor.career[0]}</span>
                </div>

                {/* Actions - 세련된 버튼 */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => setSelectedDoctor(doctor)}
                    style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '10px 12px', borderRadius: '10px', border: '1px solid var(--slate-200)', backgroundColor: 'white', fontSize: '14px', fontWeight: 500, color: 'var(--gray-600)', cursor: 'pointer', transition: 'all 0.2s' }}
                    className="hover:bg-[var(--slate-50)] hover:border-[var(--slate-300)]"
                  >
                    <Clock style={{ width: '16px', height: '16px' }} />
                    진료시간
                  </button>
                  <Link href={`/doctors/${doctor.id}`} style={{ flex: 1 }}>
                    <button
                      style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '10px 12px', borderRadius: '10px', backgroundColor: 'var(--primary-500)', fontSize: '14px', fontWeight: 500, color: 'white', border: 'none', cursor: 'pointer', transition: 'all 0.2s' }}
                      className="hover:bg-[var(--primary-600)]"
                    >
                      자세히
                      <ArrowRight style={{ width: '16px', height: '16px' }} />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 하단 버튼 - 카드와 충분한 간격 */}
        <div style={{ marginTop: '56px', textAlign: 'center' }}>
          <Link href="/doctors">
            <Button variant="secondary" size="lg" rightIcon={<ArrowRight className="w-6 h-6" />}>
              전체 의료진 보기
            </Button>
          </Link>
        </div>
      </div>

      {/* Schedule Modal */}
      {selectedDoctor && (
        <ScheduleModal
          doctor={selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
          onBooking={handleBookingWithDoctor}
        />
      )}
    </section>
  );
}
