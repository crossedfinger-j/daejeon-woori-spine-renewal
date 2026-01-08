"use client";

import Link from "next/link";
import { Phone, MapPin, Clock, Car, ChevronRight } from "lucide-react";

const hospitalInfo = {
  name: "대전우리병원",
  tagline: "척추·관절 전문",
  phone: "1577-0052",
  address: "대전광역시 서구 문정로48번길 70 (탄방동)",
  parking: "300대 주차 가능",
  hours: {
    weekday: "09:00 - 18:00",
    saturday: "09:00 - 17:00",
    lunch: "12:30 - 13:30",
  },
};

const quickLinks = [
  { href: "/booking", label: "온라인 예약" },
  { href: "/centers", label: "전문센터" },
  { href: "/doctors", label: "의료진" },
  { href: "/location", label: "오시는 길" },
];

export function Footer() {
  return (
    <footer style={{
      background: 'linear-gradient(180deg, #0C1222 0%, #0F172A 100%)',
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent)'
      }} />

      <div className="footer-container">
        {/* 상단: 로고 + 전화번호 */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '20px',
          marginBottom: '24px',
          paddingBottom: '20px',
          borderBottom: '1px solid rgba(255,255,255,0.06)'
        }}>
          {/* 로고 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ color: 'white', fontWeight: 800, fontSize: '20px' }}>W</span>
            </div>
            <div>
              <p style={{ fontWeight: 700, fontSize: '16px', color: 'white' }}>{hospitalInfo.name}</p>
              <p style={{ fontSize: '12px', color: 'rgba(148, 163, 184, 0.7)' }}>{hospitalInfo.tagline}</p>
            </div>
          </div>

          {/* 전화번호 */}
          <a
            href={`tel:${hospitalInfo.phone}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              borderRadius: '10px',
              textDecoration: 'none'
            }}
          >
            <Phone style={{ width: '18px', height: '18px', color: '#3B82F6' }} />
            <span style={{ fontWeight: 700, fontSize: '18px', color: 'white' }}>{hospitalInfo.phone}</span>
          </a>
        </div>

        {/* 메인 컨텐츠 - 반응형 그리드 */}
        <div className="footer-grid">
          {/* 진료시간 */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Clock style={{ width: '14px', height: '14px', color: '#3B82F6' }} />
              <h3 style={{ fontWeight: 600, fontSize: '13px', color: 'white' }}>진료시간</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'rgba(148, 163, 184, 0.7)' }}>평일</span>
                <span style={{ color: 'white' }}>{hospitalInfo.hours.weekday}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'rgba(148, 163, 184, 0.7)' }}>토요일</span>
                <span style={{ color: 'white' }}>{hospitalInfo.hours.saturday}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'rgba(148, 163, 184, 0.7)' }}>점심</span>
                <span style={{ color: 'rgba(148, 163, 184, 0.8)' }}>{hospitalInfo.hours.lunch}</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '6px', paddingTop: '6px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ fontSize: '12px', color: '#F87171', backgroundColor: 'rgba(248, 113, 113, 0.1)', padding: '2px 8px', borderRadius: '4px', whiteSpace: 'nowrap' }}>일/공휴일 휴진</span>
                <span style={{ fontSize: '12px', color: '#4ADE80', backgroundColor: 'rgba(74, 222, 128, 0.1)', padding: '2px 8px', borderRadius: '4px', whiteSpace: 'nowrap' }}>응급 24시간</span>
              </div>
            </div>
          </div>

          {/* 바로가기 */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <ChevronRight style={{ width: '14px', height: '14px', color: '#3B82F6' }} />
              <h3 style={{ fontWeight: 600, fontSize: '13px', color: 'white' }}>바로가기</h3>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 16px' }}>
              {quickLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    fontSize: '13px',
                    color: 'rgba(148, 163, 184, 0.7)',
                    textDecoration: 'none'
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* 오시는 길 */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <MapPin style={{ width: '14px', height: '14px', color: '#3B82F6' }} />
              <h3 style={{ fontWeight: 600, fontSize: '13px', color: 'white' }}>오시는 길</h3>
            </div>
            <p style={{ fontSize: '13px', color: 'rgba(148, 163, 184, 0.7)', lineHeight: '1.5', marginBottom: '6px' }}>
              {hospitalInfo.address}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'rgba(148, 163, 184, 0.6)' }}>
              <Car style={{ width: '12px', height: '12px' }} />
              <span>{hospitalInfo.parking}</span>
            </div>
          </div>
        </div>

        {/* 하단 저작권 */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
          paddingTop: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <p style={{ fontSize: '12px', color: 'rgba(71, 85, 105, 0.7)' }}>
            © 2025 대전우리병원. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <Link href="/privacy" style={{ fontSize: '12px', color: 'rgba(71, 85, 105, 0.7)', textDecoration: 'none' }}>
              개인정보처리방침
            </Link>
            <Link href="/terms" style={{ fontSize: '12px', color: 'rgba(71, 85, 105, 0.7)', textDecoration: 'none' }}>
              이용약관
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
