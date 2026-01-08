"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BookingCalendarProps {
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
  availableDates: string[];
  compact?: boolean;
}

export function BookingCalendar({
  selectedDate,
  onSelectDate,
  availableDates,
  compact = false,
}: BookingCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const days: (Date | null)[] = [];

    // 이전 달의 날짜로 채우기
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }

    // 현재 달의 날짜
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  }, [currentMonth]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const prevMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  // 로컬 시간대 기준 날짜 문자열 생성 (YYYY-MM-DD)
  const formatDateString = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const isPastDate = (date: Date): boolean => {
    const dateOnly = new Date(date);
    dateOnly.setHours(0, 0, 0, 0);
    return dateOnly < today;
  };

  const isAvailable = (date: Date): boolean => {
    // 일요일은 휴무
    if (date.getDay() === 0) return false;
    // 과거 날짜는 선택 불가
    if (isPastDate(date)) return false;
    // availableDates에 포함된 날짜만 선택 가능
    return availableDates.includes(formatDateString(date));
  };

  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

  // 이전 달 버튼 비활성화 여부 (현재 달보다 이전으로 못 감)
  const canGoPrev = currentMonth.getFullYear() > today.getFullYear() ||
    (currentMonth.getFullYear() === today.getFullYear() && currentMonth.getMonth() > today.getMonth());

  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: compact ? '12px' : '16px',
        border: '1px solid var(--gray-200)',
        padding: compact ? '16px' : '24px'
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: compact ? '16px' : '24px' }}>
        <button
          onClick={prevMonth}
          disabled={!canGoPrev}
          style={{
            padding: compact ? '6px' : '10px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: canGoPrev ? 'var(--gray-100)' : 'transparent',
            cursor: canGoPrev ? 'pointer' : 'not-allowed',
            opacity: canGoPrev ? 1 : 0.3,
            transition: 'all 0.2s'
          }}
          aria-label="이전 달"
        >
          <ChevronLeft style={{ width: compact ? '18px' : '20px', height: compact ? '18px' : '20px', color: 'var(--gray-600)' }} />
        </button>

        <h3 style={{ fontSize: compact ? '16px' : '20px', fontWeight: 600, color: 'var(--gray-900)' }}>
          {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
        </h3>

        <button
          onClick={nextMonth}
          style={{
            padding: compact ? '6px' : '10px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: 'var(--gray-100)',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          aria-label="다음 달"
        >
          <ChevronRight style={{ width: compact ? '18px' : '20px', height: compact ? '18px' : '20px', color: 'var(--gray-600)' }} />
        </button>
      </div>

      {/* Week Days */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px', marginBottom: '4px' }}>
        {weekDays.map((day, index) => (
          <div
            key={day}
            style={{
              textAlign: 'center',
              fontSize: compact ? '12px' : '14px',
              fontWeight: 500,
              padding: compact ? '4px 0' : '8px 0',
              color: index === 0 ? 'var(--error-500)' : index === 6 ? 'var(--primary-500)' : 'var(--gray-500)'
            }}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px' }}>
        {calendarDays.map((date, index) => {
          if (!date) {
            return <div key={`empty-${index}`} style={{ aspectRatio: '1', minHeight: compact ? '32px' : '44px' }} />;
          }

          const dateStr = formatDateString(date);
          const isPast = isPastDate(date);
          const sunday = date.getDay() === 0;
          const saturday = date.getDay() === 6;
          const available = isAvailable(date);
          const isSelected = selectedDate === dateStr;
          const isToday = dateStr === formatDateString(today);

          // 스타일 결정
          let backgroundColor = 'transparent';
          let textColor = 'var(--gray-900)';
          let cursor: 'pointer' | 'not-allowed' = 'pointer';
          let border = 'none';
          let fontWeight: number = 400;
          let boxShadow = 'none';

          if (isPast || sunday) {
            textColor = 'var(--gray-300)';
            cursor = 'not-allowed';
          } else if (!available) {
            textColor = 'var(--gray-400)';
            cursor = 'not-allowed';
          } else if (isSelected) {
            backgroundColor = 'var(--primary-500)';
            textColor = 'white';
            fontWeight = 600;
            boxShadow = '0 2px 8px rgba(61, 161, 227, 0.3)';
          } else {
            if (saturday) {
              textColor = 'var(--primary-600)';
            }
          }

          if (isToday && !isSelected) {
            border = '2px solid var(--primary-400)';
            fontWeight = 600;
          }

          return (
            <button
              key={dateStr}
              onClick={() => {
                if (available) {
                  onSelectDate(dateStr);
                }
              }}
              disabled={!available}
              style={{
                aspectRatio: '1',
                minHeight: compact ? '32px' : '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: compact ? '6px' : '10px',
                fontSize: compact ? '13px' : '15px',
                fontWeight,
                backgroundColor,
                color: textColor,
                cursor,
                border,
                boxShadow,
                transition: 'all 0.2s'
              }}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>

      {/* Legend - compact 모드에서는 숨김 */}
      {!compact && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          marginTop: '20px',
          paddingTop: '16px',
          borderTop: '1px solid var(--gray-100)',
          fontSize: '13px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '16px', height: '16px', borderRadius: '4px', backgroundColor: 'var(--primary-500)' }} />
            <span style={{ color: 'var(--gray-600)' }}>선택됨</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '16px', height: '16px', borderRadius: '4px', border: '2px solid var(--primary-400)', backgroundColor: 'transparent' }} />
            <span style={{ color: 'var(--gray-600)' }}>오늘</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '16px', height: '16px', borderRadius: '4px', backgroundColor: 'var(--gray-200)' }} />
            <span style={{ color: 'var(--gray-600)' }}>예약 불가</span>
          </div>
        </div>
      )}

      {/* 진료 시간 안내 */}
      <div style={{
        marginTop: compact ? '12px' : '16px',
        padding: compact ? '10px 12px' : '12px 16px',
        backgroundColor: 'var(--primary-50)',
        borderRadius: compact ? '8px' : '10px',
        fontSize: compact ? '12px' : '13px',
        color: 'var(--primary-700)'
      }}>
        <p style={{ fontWeight: 600, marginBottom: '4px' }}>진료 시간 안내</p>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: compact ? '4px 12px' : '4px 16px',
          lineHeight: 1.6
        }}>
          <span style={{ whiteSpace: 'nowrap' }}>평일 09:00 ~ 18:00</span>
          <span style={{ whiteSpace: 'nowrap' }}>토요일 09:00 ~ 17:00</span>
          <span style={{ whiteSpace: 'nowrap' }}>점심시간 12:30 ~ 13:30</span>
        </div>
        <p style={{ color: 'var(--error-500)', marginTop: '4px', fontWeight: 500 }}>일요일/공휴일 휴진</p>
      </div>
    </div>
  );
}
