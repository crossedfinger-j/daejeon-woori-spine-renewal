"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Search, Phone } from "lucide-react";
import { bodyParts } from "@/data";

// 의료/해부학 스타일 커스텀 SVG 아이콘
const BodyPartIcons: Record<string, React.ReactNode> = {
  neck: (
    <svg width="40" height="40" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      {/* 척추 뼈 */}
      <rect x="26" y="8" width="12" height="8" rx="2" fill="#FEE2E2" stroke="#EF4444" />
      <rect x="25" y="18" width="14" height="8" rx="2" fill="#FEE2E2" stroke="#EF4444" />
      <rect x="24" y="28" width="16" height="8" rx="2" fill="#FEE2E2" stroke="#EF4444" />
      <rect x="23" y="38" width="18" height="8" rx="2" fill="#FEE2E2" stroke="#EF4444" />
      <rect x="22" y="48" width="20" height="8" rx="2" fill="#FEE2E2" stroke="#EF4444" />
      {/* 중심선 */}
      <line x1="32" y1="12" x2="32" y2="52" stroke="#DC2626" strokeWidth="1.5" strokeDasharray="2 2" />
    </svg>
  ),
  back: (
    <svg width="40" height="40" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {/* 요추 척추뼈 5개 - 허리 부분 */}
      <rect x="22" y="6" width="20" height="9" rx="3" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="2" />
      <rect x="21" y="17" width="22" height="10" rx="3" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="2" />
      <rect x="20" y="29" width="24" height="10" rx="3" fill="#BFDBFE" stroke="#2563EB" strokeWidth="2.5" />
      <rect x="21" y="41" width="22" height="10" rx="3" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="2" />
      <rect x="22" y="53" width="20" height="8" rx="3" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="2" />
      {/* 척추 중심선 */}
      <line x1="32" y1="10" x2="32" y2="57" stroke="#1D4ED8" strokeWidth="1.5" strokeDasharray="2 2" />
      {/* 요추 돌기 표시 */}
      <path d="M20 34L14 34" stroke="#3B82F6" strokeWidth="2" />
      <path d="M44 34L50 34" stroke="#3B82F6" strokeWidth="2" />
    </svg>
  ),
  shoulder: (
    <svg width="40" height="40" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {/* 쇄골 */}
      <path d="M10 20L32 16L54 20" stroke="#10B981" strokeWidth="3" fill="none" />
      {/* 견갑골 (어깨뼈) */}
      <path d="M14 22L20 44L32 38L44 44L50 22" fill="#D1FAE5" stroke="#059669" strokeWidth="2" />
      {/* 어깨 관절 (견관절) */}
      <circle cx="18" cy="28" r="8" fill="#A7F3D0" stroke="#059669" strokeWidth="2.5" />
      <circle cx="46" cy="28" r="8" fill="#A7F3D0" stroke="#059669" strokeWidth="2.5" />
      {/* 관절와 */}
      <circle cx="18" cy="28" r="3" fill="#047857" />
      <circle cx="46" cy="28" r="3" fill="#047857" />
      {/* 상완골 */}
      <path d="M18 36L14 56" stroke="#065F46" strokeWidth="4" strokeLinecap="round" />
      <path d="M46 36L50 56" stroke="#065F46" strokeWidth="4" strokeLinecap="round" />
    </svg>
  ),
  knee: (
    <svg width="40" height="40" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {/* 허벅지 뼈 */}
      <path d="M28 8L30 24" stroke="#92400E" strokeWidth="6" strokeLinecap="round" />
      <path d="M36 8L34 24" stroke="#92400E" strokeWidth="6" strokeLinecap="round" />
      {/* 무릎 관절 */}
      <ellipse cx="32" cy="32" rx="14" ry="10" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2.5" />
      <ellipse cx="32" cy="32" rx="6" ry="4" fill="#FDE68A" stroke="#F59E0B" strokeWidth="1.5" />
      {/* 종아리 뼈 */}
      <path d="M28 40L26 56" stroke="#92400E" strokeWidth="6" strokeLinecap="round" />
      <path d="M36 40L38 56" stroke="#92400E" strokeWidth="6" strokeLinecap="round" />
    </svg>
  ),
  hand: (
    <svg width="40" height="40" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {/* 손바닥 */}
      <path d="M22 38L22 48C22 52 26 56 32 56C38 56 42 52 42 48L42 38" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" />
      {/* 손가락들 */}
      <rect x="18" y="18" width="6" height="22" rx="3" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5" />
      <rect x="26" y="10" width="6" height="30" rx="3" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5" />
      <rect x="34" y="12" width="6" height="28" rx="3" fill="#FDE68A" stroke="#F59E0B" strokeWidth="2" />
      <rect x="42" y="16" width="6" height="24" rx="3" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5" />
      {/* 엄지 */}
      <ellipse cx="12" cy="34" rx="4" ry="8" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5" transform="rotate(-20 12 34)" />
    </svg>
  ),
  foot: (
    <svg width="40" height="40" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {/* 경골 (정강이뼈) */}
      <path d="M28 4L30 20" stroke="#7C3AED" strokeWidth="5" strokeLinecap="round" />
      <path d="M36 4L34 20" stroke="#7C3AED" strokeWidth="5" strokeLinecap="round" />
      {/* 발목 관절 */}
      <ellipse cx="32" cy="24" rx="12" ry="6" fill="#EDE9FE" stroke="#8B5CF6" strokeWidth="2" />
      {/* 거골 (발목뼈) */}
      <ellipse cx="32" cy="32" rx="8" ry="5" fill="#DDD6FE" stroke="#7C3AED" strokeWidth="2" />
      {/* 중족골 (발등뼈들) */}
      <path d="M24 36L16 50" stroke="#7C3AED" strokeWidth="3" strokeLinecap="round" />
      <path d="M30 37L26 52" stroke="#7C3AED" strokeWidth="3" strokeLinecap="round" />
      <path d="M34 37L38 52" stroke="#7C3AED" strokeWidth="3" strokeLinecap="round" />
      <path d="M40 36L48 50" stroke="#7C3AED" strokeWidth="3" strokeLinecap="round" />
      {/* 발가락 */}
      <circle cx="14" cy="54" r="4" fill="#EDE9FE" stroke="#8B5CF6" strokeWidth="1.5" />
      <circle cx="26" cy="56" r="4" fill="#EDE9FE" stroke="#8B5CF6" strokeWidth="1.5" />
      <circle cx="38" cy="56" r="4" fill="#EDE9FE" stroke="#8B5CF6" strokeWidth="1.5" />
      <circle cx="50" cy="54" r="4" fill="#EDE9FE" stroke="#8B5CF6" strokeWidth="1.5" />
    </svg>
  ),
  hip: (
    <svg width="40" height="40" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {/* 골반 뼈 (장골) */}
      <path d="M6 18C6 14 14 8 32 8C50 8 58 14 58 18L54 32L10 32L6 18Z" fill="#FECACA" stroke="#DC2626" strokeWidth="2" />
      {/* 천골 (엉치뼈) */}
      <path d="M26 32L32 44L38 32" fill="#FEE2E2" stroke="#EF4444" strokeWidth="2" />
      {/* 비구 (고관절 소켓) */}
      <circle cx="18" cy="36" r="9" fill="#FEE2E2" stroke="#DC2626" strokeWidth="2.5" />
      <circle cx="46" cy="36" r="9" fill="#FEE2E2" stroke="#DC2626" strokeWidth="2.5" />
      {/* 대퇴골두 */}
      <circle cx="18" cy="36" r="5" fill="#FECACA" stroke="#B91C1C" strokeWidth="2" />
      <circle cx="46" cy="36" r="5" fill="#FECACA" stroke="#B91C1C" strokeWidth="2" />
      {/* 대퇴골 */}
      <path d="M18 45L14 60" stroke="#991B1B" strokeWidth="5" strokeLinecap="round" />
      <path d="M46 45L50 60" stroke="#991B1B" strokeWidth="5" strokeLinecap="round" />
    </svg>
  ),
};

export function QuickBookingCTA() {
  const [selectedPart, setSelectedPart] = useState<string | null>(null);

  return (
    <section className="section-container" style={{ backgroundColor: 'white' }}>
      <div className="content-container">
        {/* 헤더 영역 */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--gray-900)', marginBottom: '8px' }}>
            어디가 불편하신가요?
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--gray-600)', maxWidth: '500px', margin: '0 auto' }}>
            불편한 부위를 선택하시면 맞춤 전문의를 추천해드립니다
          </p>
        </div>

        {/* 아이콘 그리드 - 반응형 */}
        <div className="body-part-grid">
          {bodyParts.map((part) => {
            const isSelected = selectedPart === part.id;
            return (
              <button
                key={part.id}
                onClick={() => setSelectedPart(part.id)}
                style={{
                  padding: '16px 12px',
                  borderRadius: '12px',
                  border: isSelected ? '2px solid var(--primary-500)' : '1px solid var(--gray-200)',
                  backgroundColor: isSelected ? 'var(--primary-50)' : 'white',
                  boxShadow: isSelected ? '0 4px 12px rgba(61, 161, 227, 0.2)' : '0 1px 3px rgba(0,0,0,0.05)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                {isSelected && (
                  <div style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-6px',
                    width: '20px',
                    height: '20px',
                    backgroundColor: 'var(--primary-500)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
                  }}>
                    <Check style={{ width: '12px', height: '12px', color: 'white' }} />
                  </div>
                )}

                <span style={{ lineHeight: 1 }}>{BodyPartIcons[part.id]}</span>
                <span style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: isSelected ? 'var(--primary-700)' : 'var(--gray-700)',
                  textAlign: 'center',
                  whiteSpace: 'nowrap'
                }}>
                  {part.nameKo}
                </span>
              </button>
            );
          })}
        </div>

        {/* 선택 후 예약 버튼 */}
        {selectedPart && (
          <div style={{ marginBottom: '24px', textAlign: 'center' }}>
            <Link
              href={`/booking/symptom?bodyPart=${selectedPart}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 28px',
                backgroundColor: 'var(--primary-500)',
                color: 'white',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: 600,
                boxShadow: '0 4px 12px rgba(61, 161, 227, 0.3)',
                transition: 'all 0.2s',
                textDecoration: 'none'
              }}
            >
              <span>증상 선택하러 가기</span>
              <ArrowRight style={{ width: '20px', height: '20px' }} />
            </Link>
          </div>
        )}

        {/* 하단 바로가기 링크들 */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '20px',
          paddingTop: '16px',
          borderTop: '1px solid var(--gray-200)'
        }}>
          <Link
            href="/booking"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '15px',
              color: 'var(--gray-600)',
              textDecoration: 'none',
              transition: 'color 0.2s'
            }}
          >
            <ArrowRight style={{ width: '16px', height: '16px' }} />
            <span>전체 증상 보기</span>
          </Link>

          <Link
            href="/booking/lookup"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '15px',
              color: 'var(--gray-600)',
              textDecoration: 'none',
              transition: 'color 0.2s'
            }}
          >
            <Search style={{ width: '16px', height: '16px' }} />
            <span>예약 조회/변경</span>
          </Link>

          <a
            href="tel:1577-0052"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '15px',
              color: 'var(--gray-600)',
              textDecoration: 'none',
              transition: 'color 0.2s'
            }}
          >
            <Phone style={{ width: '16px', height: '16px' }} />
            <span style={{ whiteSpace: 'nowrap' }}>전화 예약 1577-0052</span>
          </a>
        </div>
      </div>
    </section>
  );
}
