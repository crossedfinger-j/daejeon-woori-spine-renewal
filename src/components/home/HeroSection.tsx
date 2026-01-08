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
    <section className="relative min-h-[560px] lg:min-h-[640px] flex items-center bg-gradient-to-br from-[var(--primary-50)] via-white to-[var(--gray-50)]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--primary-100)] rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--primary-50)] rounded-full blur-3xl" />
      </div>

      {/* 헤더 높이를 고려한 상단 패딩 + 섹션 간격 확장 */}
      <div className="hero-container relative py-20 lg:py-28 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center" style={{ marginTop: '80px' }}>
          {/* Text Content */}
          <div className="text-center lg:text-left">
            {/* 뱃지 */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 10px',
                backgroundColor: 'var(--primary-50)',
                color: 'var(--primary-600)',
                border: '1px solid var(--primary-100)',
                borderRadius: '9999px',
                fontSize: '13px',
                fontWeight: 600,
                marginBottom: '24px'
              }}
            >
              <span style={{ width: '5px', height: '5px', backgroundColor: 'var(--primary-500)', borderRadius: '50%' }} />
              대전 지역 척추·관절 전문
            </div>

            {/* 메인 타이틀 */}
            <h1 style={{
              fontSize: 'clamp(32px, 5vw, 52px)',
              fontWeight: 800,
              color: 'var(--gray-900)',
              lineHeight: '1.2',
              marginBottom: '20px'
            }}>
              건강한 일상으로의<br />
              <span style={{ color: 'var(--primary-500)' }}>빠른 복귀</span>를 도와드립니다
            </h1>

            {/* 서브 텍스트 */}
            <p style={{
              fontSize: '17px',
              color: 'var(--gray-600)',
              lineHeight: '1.7',
              marginBottom: '28px',
              maxWidth: '480px'
            }}>
              20년 이상의 전문 의료진이 정확한 진단과<br />
              환자 맞춤형 치료로 여러분의 건강을 책임집니다.
            </p>

            {/* Highlights */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              marginBottom: '32px'
            }}>
              {highlights.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 16px',
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    border: '1px solid var(--gray-200)',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                  }}
                >
                  <CheckCircle style={{ width: '18px', height: '18px', color: 'var(--success-600)' }} />
                  <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--gray-700)' }}>{item}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'stretch' }}>
              <Link href="/booking" style={{ textDecoration: 'none', display: 'flex' }}>
                <button
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    height: '48px',
                    padding: '0 22px',
                    fontSize: '15px',
                    fontWeight: 600,
                    borderRadius: '12px',
                    border: 'none',
                    backgroundColor: 'var(--primary-500)',
                    color: 'white',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(30, 58, 95, 0.3)',
                    transition: 'all 0.2s',
                    boxSizing: 'border-box'
                  }}
                >
                  온라인 예약하기
                  <ArrowRight style={{ width: '16px', height: '16px' }} />
                </button>
              </Link>
              <a href="tel:1577-0052" style={{ textDecoration: 'none', display: 'flex' }}>
                <button
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    height: '48px',
                    padding: '0 22px',
                    fontSize: '15px',
                    fontWeight: 600,
                    borderRadius: '12px',
                    border: 'none',
                    backgroundColor: 'white',
                    color: 'var(--primary-600)',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.12)',
                    transition: 'all 0.2s',
                    boxSizing: 'border-box'
                  }}
                >
                  <Phone style={{ width: '16px', height: '16px' }} />
                  1577-0052
                </button>
              </a>
            </div>
          </div>

          {/* Hero Image - 보건복지부 인증 */}
          <div className="hidden lg:block relative">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Main Card - 인증 정보 */}
              <div
                className="absolute inset-0 rounded-3xl shadow-2xl flex items-center justify-content"
                style={{
                  background: 'linear-gradient(135deg, #1E3A5F 0%, #0F172A 100%)',
                  padding: '32px'
                }}
              >
                <div style={{ width: '100%' }}>
                  {/* 타이틀 */}
                  <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', marginBottom: '8px' }}>
                      보건복지부 공식 인정
                    </p>
                    <p style={{ fontSize: '22px', fontWeight: 700, color: 'white' }}>
                      안전한 <span style={{ color: '#FBBF24' }}>척추전문병원</span>
                    </p>
                  </div>

                  {/* 인증 뱃지들 */}
                  <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '24px' }}>
                    {/* 척추전문병원 뱃지 */}
                    <div style={{
                      width: '100px',
                      height: '100px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '3px solid #FCD34D',
                      boxShadow: '0 4px 20px rgba(245, 158, 11, 0.4)'
                    }}>
                      <span style={{ fontSize: '11px', color: 'white', opacity: 0.9 }}>5주기</span>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: 'white' }}>척추</span>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: 'white' }}>전문병원</span>
                    </div>
                    {/* 인증의료기관 뱃지 */}
                    <div style={{
                      width: '100px',
                      height: '100px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '3px solid #FCD34D',
                      boxShadow: '0 4px 20px rgba(245, 158, 11, 0.4)'
                    }}>
                      <span style={{ fontSize: '11px', color: 'white', opacity: 0.9 }}>4주기</span>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: 'white' }}>인증</span>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: 'white' }}>의료기관</span>
                    </div>
                  </div>

                  {/* 인증 내역 */}
                  <div style={{
                    background: 'rgba(255,255,255,0.15)',
                    borderRadius: '12px',
                    padding: '16px 20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#FBBF24', flexShrink: 0 }} />
                      <span style={{ fontSize: '13px', color: '#FFFFFF', fontWeight: 600 }}>2008년 척추전문병원 시범기관 선정</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#FBBF24', flexShrink: 0 }} />
                      <span style={{ fontSize: '13px', color: '#FFFFFF', fontWeight: 600 }}>2024년 5주기 보건복지부 지정</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#FBBF24', flexShrink: 0 }} />
                      <span style={{ fontSize: '13px', color: '#FFFFFF', fontWeight: 600 }}>2025년 4주기 의료기관 인증</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Cards - 카드 바깥에 위치 */}
              <div
                className="absolute bg-white rounded-3xl shadow-xl animate-slide-up border border-[var(--slate-100)]"
                style={{ padding: '16px 24px 16px 20px', left: '-120px', top: '20px' }}
              >
                <div className="flex items-center" style={{ gap: '16px' }}>
                  <div className="w-12 h-12 bg-[var(--success-50)] rounded-2xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-[var(--success-600)]" />
                  </div>
                  <div>
                    <p className="font-bold text-lg text-[var(--gray-900)]">비수술 치료</p>
                    <p className="text-base text-[var(--gray-500)]" style={{ marginTop: '4px' }}>90% 성공률</p>
                  </div>
                </div>
              </div>

              <div
                className="absolute bg-white rounded-3xl shadow-xl animate-slide-up border border-[var(--slate-100)]"
                style={{ padding: '16px 24px 16px 20px', animationDelay: "0.2s", right: '-100px', bottom: '20px' }}
              >
                <div className="flex items-center" style={{ gap: '16px' }}>
                  <div className="w-12 h-12 bg-[var(--primary-50)] rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">👨‍⚕️</span>
                  </div>
                  <div>
                    <p className="font-bold text-lg text-[var(--gray-900)]">전문 의료진</p>
                    <p className="text-base text-[var(--gray-500)]" style={{ marginTop: '4px' }}>27년+ 경력</p>
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
