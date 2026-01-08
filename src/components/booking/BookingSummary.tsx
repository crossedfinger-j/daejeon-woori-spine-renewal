"use client";

import { Doctor, Symptom } from "@/types";
import { Badge } from "@/components/ui";
import { Calendar, Clock, User, Stethoscope } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface BookingSummaryProps {
  symptoms: Symptom[];
  doctor: Doctor | null;
  date: string | null;
  time: string | null;
  compact?: boolean;
}

export function BookingSummary({ symptoms, doctor, date, time, compact = false }: BookingSummaryProps) {
  // 컴팩트 모드: 가로로 한 줄에 표시
  if (compact) {
    return (
      <div
        style={{
          backgroundColor: 'var(--gray-50)',
          borderRadius: '12px',
          padding: '16px 20px',
          border: '1px solid var(--gray-200)',
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          flexWrap: 'wrap'
        }}
      >
        <h3 style={{
          fontSize: '16px',
          fontWeight: 600,
          color: 'var(--gray-700)',
          whiteSpace: 'nowrap'
        }}>
          예약 정보 확인
        </h3>

        {/* Symptoms */}
        {symptoms.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Stethoscope style={{ width: '16px', height: '16px', color: 'var(--primary-500)' }} />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {symptoms.map((symptom) => (
                <Badge key={symptom.id} variant="outline" size="sm">
                  {symptom.name}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Doctor */}
        {doctor && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <User style={{ width: '16px', height: '16px', color: 'var(--primary-500)' }} />
            <span style={{ fontWeight: 500, color: 'var(--gray-900)', fontSize: '15px', whiteSpace: 'nowrap' }}>
              {doctor.name} {doctor.title}
            </span>
          </div>
        )}

        {/* Date */}
        {date && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar style={{ width: '16px', height: '16px', color: 'var(--primary-500)' }} />
            <span style={{ fontWeight: 500, color: 'var(--gray-900)', fontSize: '15px', whiteSpace: 'nowrap' }}>
              {formatDate(new Date(date))}
            </span>
          </div>
        )}

        {/* Time */}
        {time && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock style={{ width: '16px', height: '16px', color: 'var(--primary-500)' }} />
            <span style={{ fontWeight: 500, color: 'var(--gray-900)', fontSize: '15px' }}>{time}</span>
          </div>
        )}
      </div>
    );
  }

  // 기본 모드: 세로로 표시
  return (
    <div
      style={{
        backgroundColor: 'var(--gray-50)',
        borderRadius: '16px',
        padding: '24px',
        border: '1px solid var(--gray-200)'
      }}
    >
      <h3 style={{
        fontSize: '18px',
        fontWeight: 600,
        color: 'var(--gray-900)',
        marginBottom: '20px'
      }}>
        예약 정보 확인
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Symptoms */}
        {symptoms.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              backgroundColor: 'var(--primary-50)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Stethoscope style={{ width: '20px', height: '20px', color: 'var(--primary-500)' }} />
            </div>
            <div>
              <p style={{ fontSize: '14px', color: 'var(--gray-500)', marginBottom: '6px' }}>선택 증상</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {symptoms.map((symptom) => (
                  <Badge key={symptom.id} variant="outline" size="sm">
                    {symptom.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Doctor */}
        {doctor && (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              backgroundColor: 'var(--primary-50)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <User style={{ width: '20px', height: '20px', color: 'var(--primary-500)' }} />
            </div>
            <div>
              <p style={{ fontSize: '14px', color: 'var(--gray-500)', marginBottom: '4px' }}>담당 의료진</p>
              <p style={{ fontWeight: 500, fontSize: '15px', color: 'var(--gray-900)', whiteSpace: 'nowrap' }}>
                {doctor.name} {doctor.title}
              </p>
            </div>
          </div>
        )}

        {/* Date */}
        {date && (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              backgroundColor: 'var(--primary-50)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Calendar style={{ width: '20px', height: '20px', color: 'var(--primary-500)' }} />
            </div>
            <div>
              <p style={{ fontSize: '14px', color: 'var(--gray-500)', marginBottom: '4px' }}>예약 날짜</p>
              <p style={{ fontWeight: 500, fontSize: '15px', color: 'var(--gray-900)' }}>
                {formatDate(new Date(date))}
              </p>
            </div>
          </div>
        )}

        {/* Time */}
        {time && (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              backgroundColor: 'var(--primary-50)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Clock style={{ width: '20px', height: '20px', color: 'var(--primary-500)' }} />
            </div>
            <div>
              <p style={{ fontSize: '14px', color: 'var(--gray-500)', marginBottom: '4px' }}>예약 시간</p>
              <p style={{ fontWeight: 500, fontSize: '15px', color: 'var(--gray-900)' }}>{time}</p>
            </div>
          </div>
        )}

        {/* Empty state */}
        {symptoms.length === 0 && !doctor && !date && !time && (
          <p style={{ color: 'var(--gray-400)', fontSize: '14px', textAlign: 'center', padding: '16px 0' }}>
            예약 정보가 없습니다
          </p>
        )}
      </div>
    </div>
  );
}
