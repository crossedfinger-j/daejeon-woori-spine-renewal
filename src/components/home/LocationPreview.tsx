"use client";

import Link from "next/link";
import { MapPin, Phone, Clock, Car, Bus, ArrowRight } from "lucide-react";

export function LocationPreview() {
  return (
    <section className="location-section">
      <div className="location-container">
        {/* 헤더 영역 */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--gray-900)', marginBottom: '8px' }}>
            오시는 길
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--gray-600)', maxWidth: '500px', margin: '0 auto' }}>
            대전우리병원으로 쉽고 편하게 찾아오세요
          </p>
        </div>

        {/* 통합 카드 */}
        <div className="location-card">
          {/* 지도 영역 - 왼쪽 */}
          <div style={{
            backgroundColor: 'var(--slate-100)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '200px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '48px',
                height: '48px',
                backgroundColor: 'var(--primary-100)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px'
              }}>
                <MapPin style={{ width: '24px', height: '24px', color: 'var(--primary-500)' }} />
              </div>
              <p style={{ fontSize: '14px', color: 'var(--gray-600)', fontWeight: 500 }}>지도 영역</p>
              <p style={{ fontSize: '12px', color: 'var(--gray-500)', marginTop: '4px' }}>
                카카오맵 API 연동 예정
              </p>
            </div>
          </div>

          {/* 정보 영역 - 오른쪽 */}
          <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '12px' }}>
            {/* 주소 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                backgroundColor: 'var(--primary-50)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <MapPin style={{ width: '16px', height: '16px', color: 'var(--primary-500)' }} />
              </div>
              <p style={{ fontSize: '14px', color: 'var(--gray-700)' }}>
                대전광역시 서구 문정로48번길 70 (탄방동)
              </p>
            </div>

            {/* 전화번호 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                backgroundColor: 'var(--success-50)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Phone style={{ width: '16px', height: '16px', color: 'var(--success-600)' }} />
              </div>
              <a href="tel:1577-0052" style={{ fontSize: '18px', color: 'var(--gray-900)', fontWeight: 700 }}>
                1577-0052
              </a>
            </div>

            {/* 진료시간 */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                backgroundColor: 'var(--warning-50)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Clock style={{ width: '16px', height: '16px', color: 'var(--warning-600)' }} />
              </div>
              <div style={{ fontSize: '14px', color: 'var(--gray-600)' }}>
                <p><span style={{ fontWeight: 600 }}>평일</span> 09:00 - 18:00 · <span style={{ fontWeight: 600 }}>토</span> 09:00 - 17:00</p>
                <p style={{ color: 'var(--gray-500)', fontSize: '13px', marginTop: '2px' }}>점심 12:30 - 13:30</p>
              </div>
            </div>

            {/* 교통 + 버튼 */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '8px',
              borderTop: '1px solid var(--slate-100)',
              marginTop: '4px'
            }}>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Car style={{ width: '14px', height: '14px', color: 'var(--gray-400)' }} />
                  <span style={{ fontSize: '13px', color: 'var(--gray-600)' }}>300대 주차</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Bus style={{ width: '14px', height: '14px', color: 'var(--gray-400)' }} />
                  <span style={{ fontSize: '13px', color: 'var(--gray-600)' }}>버스 102, 301</span>
                </div>
              </div>
              <Link
                href="/location"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--primary-500)',
                  textDecoration: 'none'
                }}
              >
                자세히 <ArrowRight style={{ width: '14px', height: '14px' }} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
