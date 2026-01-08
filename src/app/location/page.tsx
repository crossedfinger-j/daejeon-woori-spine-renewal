"use client";

import { MapPin, Phone, Clock, Car, Bus, Train, Copy } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "@/components/common";

const hospitalInfo = {
  name: "대전우리병원",
  address: "대전광역시 서구 문정로48번길 70",
  addressDetail: "(탄방동)",
  zipCode: "35234",
  phone: "1577-0052",
  fax: "042-524-0054",
};

const businessHours = [
  { day: "평일", time: "09:00 - 18:00", highlight: true },
  { day: "토요일", time: "09:00 - 17:00", highlight: false },
  { day: "점심시간", time: "12:30 - 13:30", highlight: false },
  { day: "일/공휴일", time: "휴진", highlight: false, isHoliday: true },
];

const transportInfo = {
  bus: {
    title: "버스",
    icon: Bus,
    routes: [
      { name: "탄방동 우리병원 앞", buses: ["102", "301", "802"] },
      { name: "탄방네거리", buses: ["104", "106", "201", "301", "314", "618"] },
    ]
  },
  subway: {
    title: "지하철",
    icon: Train,
    routes: [
      { name: "시청역 (1호선)", detail: "3번 출구에서 도보 10분" },
      { name: "탄방역 (1호선)", detail: "1번 출구에서 도보 5분" },
    ]
  },
  car: {
    title: "자가용",
    icon: Car,
    routes: [
      { name: "네비게이션", detail: "'대전우리병원' 또는 '문정로48번길 70' 검색" },
      { name: "고속도로", detail: "대전IC → 둔산대로 → 문정로 방면 (약 15분)" },
    ]
  }
};

const parkingInfo = {
  total: "300대",
  location: "병원 건물 내 지하주차장 및 야외주차장",
  fee: "외래 환자 무료 (진료 확인 시)",
  note: "입원 환자 보호자 주차 할인"
};

export default function LocationPage() {
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(hospitalInfo.address + " " + hospitalInfo.addressDetail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main style={{ paddingTop: '80px', minHeight: '100vh', backgroundColor: 'var(--slate-50)' }}>
      <style>{`
        .location-grid-main {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          margin-bottom: 24px;
        }
        @media (min-width: 768px) {
          .location-grid-main {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        .location-grid-transport {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }
        @media (min-width: 768px) {
          .location-grid-transport {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>

      <PageHeader
        title="오시는 길"
        description="대전우리병원으로 쉽고 편하게 찾아오세요"
      />

      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '24px 20px' }}>
        {/* 지도 + 기본정보 - 반응형 배치 */}
        <div className="location-grid-main">
          {/* 지도 영역 */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid var(--slate-200)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
          }}>
            {/* 지도 플레이스홀더 */}
            <div style={{
              height: '250px',
              backgroundColor: 'var(--slate-100)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px'
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                backgroundColor: 'var(--primary-100)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <MapPin style={{ width: '28px', height: '28px', color: 'var(--primary-500)' }} />
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--gray-700)', marginBottom: '6px' }}>
                  지도 영역
                </p>
                <p style={{ fontSize: '13px', color: 'var(--gray-500)' }}>
                  네이버/카카오 지도 API 추후 연동 예정
                </p>
              </div>
            </div>
          </div>

          {/* 기본 정보 */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '20px',
            border: '1px solid var(--slate-200)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
          }}>
            <h2 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--gray-900)', marginBottom: '16px' }}>
              병원 정보
            </h2>

            {/* 주소 */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  backgroundColor: 'var(--primary-50)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <MapPin style={{ width: '18px', height: '18px', color: 'var(--primary-500)' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '12px', color: 'var(--gray-500)', marginBottom: '4px' }}>주소</p>
                  <p style={{ fontSize: '14px', color: 'var(--gray-900)', fontWeight: 600 }}>
                    {hospitalInfo.address}
                  </p>
                  <p style={{ fontSize: '13px', color: 'var(--gray-600)' }}>
                    {hospitalInfo.addressDetail}
                  </p>
                  <button
                    onClick={copyAddress}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      marginTop: '8px',
                      padding: '6px 12px',
                      backgroundColor: 'var(--slate-100)',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '12px',
                      color: 'var(--gray-600)',
                      cursor: 'pointer'
                    }}
                  >
                    <Copy style={{ width: '12px', height: '12px' }} />
                    {copied ? '복사됨!' : '주소 복사'}
                  </button>
                </div>
              </div>
            </div>

            {/* 전화번호 */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  backgroundColor: 'var(--success-50)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Phone style={{ width: '18px', height: '18px', color: 'var(--success-600)' }} />
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: 'var(--gray-500)', marginBottom: '4px' }}>대표전화</p>
                  <a
                    href={`tel:${hospitalInfo.phone}`}
                    style={{ fontSize: '20px', color: 'var(--gray-900)', fontWeight: 700, textDecoration: 'none', display: 'block' }}
                  >
                    {hospitalInfo.phone}
                  </a>
                  <p style={{ fontSize: '12px', color: 'var(--gray-500)', marginTop: '4px' }}>
                    FAX: {hospitalInfo.fax}
                  </p>
                </div>
              </div>
            </div>

            {/* 진료시간 */}
            <div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  backgroundColor: 'var(--warning-50)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Clock style={{ width: '18px', height: '18px', color: 'var(--warning-600)' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '12px', color: 'var(--gray-500)', marginBottom: '8px' }}>진료시간</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {businessHours.map((item, index) => (
                      <div
                        key={index}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          padding: '8px 12px',
                          backgroundColor: item.isHoliday ? 'var(--error-50)' : item.highlight ? 'var(--primary-50)' : 'var(--slate-50)',
                          borderRadius: '6px'
                        }}
                      >
                        <span style={{
                          fontSize: '13px',
                          color: item.isHoliday ? 'var(--error-600)' : 'var(--gray-700)',
                          fontWeight: 500
                        }}>
                          {item.day}
                        </span>
                        <span style={{
                          fontSize: '13px',
                          color: item.isHoliday ? 'var(--error-600)' : 'var(--gray-900)',
                          fontWeight: 600
                        }}>
                          {item.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 교통편 및 주차 안내 - 통합 카드 */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '20px',
          border: '1px solid var(--slate-200)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        }}>
          <h2 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--gray-900)', marginBottom: '16px' }}>
            교통편 및 주차 안내
          </h2>

          <div className="location-grid-transport">
            {/* 버스 */}
            <div style={{
              padding: '16px',
              backgroundColor: 'var(--slate-50)',
              borderRadius: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  backgroundColor: '#22C55E',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Bus style={{ width: '18px', height: '18px', color: 'white' }} />
                </div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--gray-900)' }}>버스</h3>
              </div>
              {transportInfo.bus.routes.map((route, index) => (
                <div key={index} style={{ marginBottom: index < transportInfo.bus.routes.length - 1 ? '12px' : 0 }}>
                  <p style={{ fontSize: '12px', color: 'var(--gray-600)', marginBottom: '6px' }}>{route.name}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {route.buses.map((bus, i) => (
                      <span
                        key={i}
                        style={{
                          padding: '4px 10px',
                          backgroundColor: '#22C55E',
                          color: 'white',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: 600
                        }}
                      >
                        {bus}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* 지하철 */}
            <div style={{
              padding: '16px',
              backgroundColor: 'var(--slate-50)',
              borderRadius: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  backgroundColor: '#3B82F6',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Train style={{ width: '18px', height: '18px', color: 'white' }} />
                </div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--gray-900)' }}>지하철</h3>
              </div>
              {transportInfo.subway.routes.map((route, index) => (
                <div key={index} style={{ marginBottom: index < transportInfo.subway.routes.length - 1 ? '10px' : 0 }}>
                  <p style={{ fontSize: '13px', color: 'var(--gray-900)', fontWeight: 600, marginBottom: '2px' }}>{route.name}</p>
                  <p style={{ fontSize: '12px', color: 'var(--gray-600)' }}>{route.detail}</p>
                </div>
              ))}
            </div>

            {/* 자가용 */}
            <div style={{
              padding: '16px',
              backgroundColor: 'var(--slate-50)',
              borderRadius: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  backgroundColor: '#8B5CF6',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Car style={{ width: '18px', height: '18px', color: 'white' }} />
                </div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--gray-900)' }}>자가용</h3>
              </div>
              {transportInfo.car.routes.map((route, index) => (
                <div key={index} style={{ marginBottom: index < transportInfo.car.routes.length - 1 ? '10px' : 0 }}>
                  <p style={{ fontSize: '13px', color: 'var(--gray-900)', fontWeight: 600, marginBottom: '2px' }}>{route.name}</p>
                  <p style={{ fontSize: '12px', color: 'var(--gray-600)' }}>{route.detail}</p>
                </div>
              ))}
            </div>

            {/* 주차 */}
            <div style={{
              padding: '16px',
              backgroundColor: 'var(--primary-50)',
              borderRadius: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  backgroundColor: 'var(--primary-500)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Car style={{ width: '18px', height: '18px', color: 'white' }} />
                </div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--gray-900)' }}>주차</h3>
              </div>
              <p style={{ fontSize: '24px', fontWeight: 800, color: 'var(--primary-600)', marginBottom: '8px' }}>
                {parkingInfo.total}
              </p>
              <p style={{ fontSize: '12px', color: 'var(--gray-600)', marginBottom: '4px' }}>{parkingInfo.location}</p>
              <p style={{ fontSize: '12px', color: 'var(--success-600)', fontWeight: 500 }}>{parkingInfo.fee}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
