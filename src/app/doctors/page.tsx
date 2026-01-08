"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  User,
  GraduationCap,
  Briefcase,
  Award,
  ChevronDown,
  Phone,
  Calendar
} from "lucide-react";
import { doctors, departmentInfo, getDoctorById } from "@/data/doctors";
import { Doctor } from "@/types";
import { DepartmentType } from "@/types/center";
import { Button } from "@/components/ui";
import { PageHeader } from "@/components/common";
import { useBookingStore } from "@/stores/bookingStore";

// 탭 순서 정의
const departmentOrder: DepartmentType[] = [
  "spine-center",
  "joint-center",
  "nonsurgical",
  "pain",
  "internal",
  "radiology",
  "rehab"
];

export default function DoctorsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const expandDoctorId = searchParams.get("expand");

  // expand 파라미터가 있으면 해당 의사의 department를 기본 탭으로 설정
  const getInitialTab = (): DepartmentType => {
    if (expandDoctorId) {
      const doctor = getDoctorById(expandDoctorId);
      if (doctor) {
        return doctor.department as DepartmentType;
      }
    }
    return "spine-center";
  };

  const [activeTab, setActiveTab] = useState<DepartmentType>(getInitialTab());
  const [expandedDoctor, setExpandedDoctor] = useState<string | null>(expandDoctorId);
  const { setDoctor, setStep, resetBooking } = useBookingStore();

  // URL 파라미터가 변경되면 탭과 펼침 상태 업데이트
  useEffect(() => {
    if (expandDoctorId) {
      const doctor = getDoctorById(expandDoctorId);
      if (doctor) {
        setActiveTab(doctor.department as DepartmentType);
        setExpandedDoctor(expandDoctorId);
      }
    }
  }, [expandDoctorId]);

  const filteredDoctors = doctors.filter((doc) => doc.department === activeTab);

  const handleBooking = (doctor: Doctor) => {
    // 예약 상태 초기화 후 해당 의료진만 선택하고 증상 선택 페이지로 이동
    resetBooking();
    setDoctor(doctor);
    setStep(1);
    router.push("/booking/symptom");
  };

  const toggleExpand = (doctorId: string) => {
    setExpandedDoctor(expandedDoctor === doctorId ? null : doctorId);
  };

  return (
    <main style={{ paddingTop: '80px', minHeight: '100vh', backgroundColor: 'var(--slate-50)' }}>
      <PageHeader
        title="의료진 소개"
        description="대전우리병원의 전문 의료진을 소개합니다"
      />

      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '24px 20px' }}>
        {/* 진료과 탭 - 스크롤 가능 */}
        <div style={{
          overflowX: 'auto',
          marginBottom: '20px',
          paddingBottom: '8px',
          WebkitOverflowScrolling: 'touch'
        }}>
          <div style={{
            display: 'flex',
            gap: '8px',
            minWidth: 'max-content',
            padding: '0 4px'
          }}>
            {departmentOrder.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setExpandedDoctor(null);
                }}
                style={{
                  padding: '10px 16px',
                  borderRadius: '24px',
                  fontSize: '14px',
                  fontWeight: activeTab === tab ? 600 : 500,
                  border: activeTab === tab ? '2px solid var(--primary-500)' : '1px solid var(--gray-300)',
                  backgroundColor: activeTab === tab ? 'var(--primary-500)' : 'white',
                  color: activeTab === tab ? 'white' : 'var(--gray-700)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap'
                }}
              >
                {departmentInfo[tab].name}
              </button>
            ))}
          </div>
        </div>

        {/* 진료과 설명 */}
        <div style={{
          textAlign: 'center',
          marginBottom: '20px',
          padding: '14px 16px',
          backgroundColor: 'var(--primary-50)',
          borderRadius: '12px'
        }}>
          <p style={{
            fontSize: '14px',
            color: 'var(--primary-700)',
            fontWeight: 500
          }}>
            {departmentInfo[activeTab].description}
          </p>
        </div>

        {/* 의료진 수 표시 */}
        <div style={{
          marginBottom: '16px',
          fontSize: '14px',
          color: 'var(--gray-600)'
        }}>
          총 <strong style={{ color: 'var(--primary-600)' }}>{filteredDoctors.length}</strong>명의 의료진
        </div>

        {/* 의료진 목록 */}
        {filteredDoctors.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            backgroundColor: 'white',
            borderRadius: '16px',
            border: '1px solid var(--slate-200)'
          }}>
            <User style={{ width: '48px', height: '48px', color: 'var(--gray-300)', margin: '0 auto 16px' }} />
            <p style={{ fontSize: '16px', color: 'var(--gray-500)' }}>
              해당 진료과의 의료진 정보가 준비 중입니다
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filteredDoctors.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                isExpanded={expandedDoctor === doctor.id}
                onToggle={() => toggleExpand(doctor.id)}
                onBooking={() => handleBooking(doctor)}
              />
            ))}
          </div>
        )}

        {/* 문의 안내 */}
        <div style={{
          marginTop: '32px',
          padding: '24px 20px',
          backgroundColor: 'white',
          borderRadius: '16px',
          border: '1px solid var(--slate-200)',
          textAlign: 'center'
        }}>
          <p style={{
            fontSize: '15px',
            color: 'var(--gray-600)',
            marginBottom: '12px'
          }}>
            진료 예약 및 문의
          </p>
          <a
            href="tel:1577-0052"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '24px',
              fontWeight: 700,
              color: 'var(--primary-600)',
              textDecoration: 'none'
            }}
          >
            <Phone style={{ width: '24px', height: '24px' }} />
            1577-0052
          </a>
        </div>
      </div>
    </main>
  );
}

interface DoctorCardProps {
  doctor: Doctor;
  isExpanded: boolean;
  onToggle: () => void;
  onBooking: () => void;
}

function DoctorCard({ doctor, isExpanded, onToggle, onBooking }: DoctorCardProps) {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '16px',
      border: '1px solid var(--slate-200)',
      overflow: 'hidden',
      transition: 'all 0.3s'
    }}>
      {/* 기본 정보 */}
      <div
        onClick={onToggle}
        style={{
          display: 'flex',
          gap: '16px',
          padding: '20px',
          cursor: 'pointer',
          alignItems: 'flex-start'
        }}
      >
        {/* 프로필 이미지 */}
        <div style={{
          width: '80px',
          height: '100px',
          backgroundColor: 'var(--gray-100)',
          borderRadius: '12px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          {doctor.profileImage ? (
            <img
              src={doctor.profileImage}
              alt={doctor.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                if (target.parentElement) {
                  const fallback = document.createElement('div');
                  fallback.style.cssText = 'display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;';
                  fallback.innerHTML = `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--gray-400)" stroke-width="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`;
                  target.parentElement.appendChild(fallback);
                }
              }}
            />
          ) : (
            <User style={{ width: '40px', height: '40px', color: 'var(--gray-400)' }} />
          )}
        </div>

        {/* 의료진 정보 */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '6px',
            flexWrap: 'wrap'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 700,
              color: 'var(--gray-900)'
            }}>
              {doctor.name}
            </h3>
            <span style={{
              fontSize: '11px',
              fontWeight: 500,
              color: 'var(--primary-600)',
              backgroundColor: 'var(--primary-50)',
              padding: '3px 8px',
              borderRadius: '20px',
              whiteSpace: 'nowrap'
            }}>
              {doctor.title}
            </span>
          </div>

          {/* 전문 분야 */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '4px',
            marginBottom: '8px'
          }}>
            {doctor.specialty.slice(0, 3).map((spec, idx) => (
              <span
                key={idx}
                style={{
                  fontSize: '11px',
                  color: 'var(--gray-600)',
                  backgroundColor: 'var(--gray-100)',
                  padding: '3px 8px',
                  borderRadius: '6px'
                }}
              >
                {spec}
              </span>
            ))}
            {doctor.specialty.length > 3 && (
              <span style={{
                fontSize: '11px',
                color: 'var(--gray-500)'
              }}>
                +{doctor.specialty.length - 3}
              </span>
            )}
          </div>

          {/* 간단 소개 */}
          <p style={{
            fontSize: '13px',
            color: 'var(--gray-600)',
            lineHeight: 1.5,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {doctor.introduction}
          </p>
        </div>

        {/* 펼침 버튼 */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          backgroundColor: 'var(--gray-100)',
          transition: 'transform 0.3s',
          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
          flexShrink: 0,
          marginTop: '4px'
        }}>
          <ChevronDown style={{ width: '18px', height: '18px', color: 'var(--gray-500)' }} />
        </div>
      </div>

      {/* 상세 정보 (펼침) */}
      {isExpanded && (
        <div style={{
          borderTop: '1px solid var(--gray-200)',
          padding: '20px',
          backgroundColor: 'var(--gray-50)'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px'
          }}>
            {/* 학력 */}
            {doctor.education && doctor.education.length > 0 && (
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '12px'
                }}>
                  <GraduationCap style={{ width: '18px', height: '18px', color: 'var(--primary-500)' }} />
                  <h4 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--gray-900)' }}>
                    학력
                  </h4>
                </div>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}>
                  {doctor.education.map((edu, idx) => (
                    <li
                      key={idx}
                      style={{
                        fontSize: '13px',
                        color: 'var(--gray-700)',
                        paddingLeft: '14px',
                        position: 'relative'
                      }}
                    >
                      <span style={{
                        position: 'absolute',
                        left: 0,
                        color: 'var(--primary-400)'
                      }}>•</span>
                      {edu}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 경력 */}
            {doctor.career && doctor.career.length > 0 && (
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '12px'
                }}>
                  <Briefcase style={{ width: '18px', height: '18px', color: 'var(--primary-500)' }} />
                  <h4 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--gray-900)' }}>
                    경력
                  </h4>
                </div>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}>
                  {doctor.career.map((car, idx) => (
                    <li
                      key={idx}
                      style={{
                        fontSize: '13px',
                        color: 'var(--gray-700)',
                        paddingLeft: '14px',
                        position: 'relative'
                      }}
                    >
                      <span style={{
                        position: 'absolute',
                        left: 0,
                        color: 'var(--primary-400)'
                      }}>•</span>
                      {car}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 자격/인증 */}
            {doctor.certifications && doctor.certifications.length > 0 && (
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '12px'
                }}>
                  <Award style={{ width: '18px', height: '18px', color: 'var(--primary-500)' }} />
                  <h4 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--gray-900)' }}>
                    자격/인증
                  </h4>
                </div>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}>
                  {doctor.certifications.map((cert, idx) => (
                    <li
                      key={idx}
                      style={{
                        fontSize: '13px',
                        color: 'var(--gray-700)',
                        paddingLeft: '14px',
                        position: 'relative'
                      }}
                    >
                      <span style={{
                        position: 'absolute',
                        left: 0,
                        color: 'var(--primary-400)'
                      }}>•</span>
                      {cert}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* 예약 버튼 - 2열 그리드 레이아웃 */}
          <div style={{
            marginTop: '24px',
            paddingTop: '20px',
            borderTop: '1px solid var(--gray-200)',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '12px'
          }}>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onBooking();
              }}
              leftIcon={<Calendar style={{ width: '18px', height: '18px' }} />}
              style={{
                height: '48px',
                width: '100%'
              }}
            >
              예약하기
            </Button>
            <a
              href="tel:1577-0052"
              style={{ textDecoration: 'none' }}
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="secondary"
                leftIcon={<Phone style={{ width: '18px', height: '18px' }} />}
                style={{
                  height: '48px',
                  width: '100%'
                }}
              >
                전화 문의
              </Button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
