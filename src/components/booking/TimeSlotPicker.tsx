"use client";

import { useMemo } from "react";
import { TimeSlot } from "@/types";
import { Clock, Sun, Sunset } from "lucide-react";

interface TimeSlotPickerProps {
  selectedDate: string | null;
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
  timeSlots: TimeSlot[];
  compact?: boolean;
}

export function TimeSlotPicker({
  selectedDate,
  selectedTime,
  onSelectTime,
  timeSlots,
  compact = false,
}: TimeSlotPickerProps) {
  const filteredSlots = useMemo(() => {
    if (!selectedDate) return [];

    const now = new Date();
    const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    return timeSlots
      .filter((slot) => slot.date === selectedDate)
      .map((slot) => {
        // 오늘 날짜인 경우 현재 시간 이전 슬롯은 예약 불가 처리
        if (selectedDate === todayStr) {
          const [slotHour, slotMinute] = slot.time.split(':').map(Number);
          const slotTotalMinutes = slotHour * 60 + slotMinute;
          const currentTotalMinutes = currentHour * 60 + currentMinute;

          // 현재 시간보다 이전이면 예약 불가
          if (slotTotalMinutes <= currentTotalMinutes) {
            return { ...slot, available: false };
          }
        }
        return slot;
      });
  }, [selectedDate, timeSlots]);

  const morningSlots = filteredSlots.filter((slot) => {
    const hour = parseInt(slot.time.split(":")[0]);
    return hour < 12;
  });

  const afternoonSlots = filteredSlots.filter((slot) => {
    const hour = parseInt(slot.time.split(":")[0]);
    return hour >= 12;
  });

  if (!selectedDate) {
    return (
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: compact ? '12px' : '16px',
          border: '1px solid var(--gray-200)',
          padding: compact ? '16px' : '24px'
        }}
      >
        <h3 style={{ fontSize: compact ? '16px' : '18px', fontWeight: 600, color: 'var(--gray-900)', marginBottom: compact ? '12px' : '16px' }}>
          시간 선택
        </h3>
        <div style={{ textAlign: 'center', padding: compact ? '24px 0' : '32px 0', color: 'var(--gray-500)' }}>
          <Clock style={{ width: compact ? '36px' : '48px', height: compact ? '36px' : '48px', margin: '0 auto 12px', opacity: 0.5 }} />
          <p style={{ fontSize: compact ? '15px' : '16px' }}>날짜를 먼저 선택해주세요</p>
        </div>
      </div>
    );
  }

  if (filteredSlots.length === 0) {
    return (
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: compact ? '12px' : '16px',
          border: '1px solid var(--gray-200)',
          padding: compact ? '16px' : '24px'
        }}
      >
        <h3 style={{ fontSize: compact ? '16px' : '18px', fontWeight: 600, color: 'var(--gray-900)', marginBottom: compact ? '12px' : '16px' }}>
          시간 선택
        </h3>
        <div style={{ textAlign: 'center', padding: compact ? '24px 0' : '32px 0', color: 'var(--gray-500)' }}>
          <p style={{ fontSize: compact ? '15px' : '16px' }}>선택하신 날짜에 예약 가능한 시간이 없습니다</p>
          <p style={{ fontSize: compact ? '14px' : '15px', marginTop: '8px' }}>다른 날짜를 선택해주세요</p>
        </div>
      </div>
    );
  }

  const renderSlots = (slots: TimeSlot[], label: string, icon: React.ReactNode) => {
    if (slots.length === 0) return null;

    const availableCount = slots.filter(s => s.available).length;

    return (
      <div style={{ marginBottom: compact ? '16px' : '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: compact ? '8px' : '12px' }}>
          {icon}
          <h4 style={{ fontSize: compact ? '14px' : '16px', fontWeight: 600, color: 'var(--gray-700)' }}>{label}</h4>
          <span style={{
            fontSize: compact ? '12px' : '13px',
            color: 'var(--primary-600)',
            backgroundColor: 'var(--primary-50)',
            padding: '2px 6px',
            borderRadius: '10px'
          }}>
            {availableCount}개 가능
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: compact ? 'repeat(3, 1fr)' : 'repeat(4, 1fr)', gap: compact ? '6px' : '10px' }}>
          {slots.map((slot) => {
            const isSelected = selectedTime === slot.time;
            const isAvailable = slot.available;

            return (
              <button
                key={`${slot.date}-${slot.time}`}
                onClick={() => {
                  if (isAvailable) {
                    onSelectTime(slot.time);
                  }
                }}
                disabled={!isAvailable}
                style={{
                  padding: compact ? '10px 4px' : '14px 8px',
                  borderRadius: compact ? '8px' : '10px',
                  fontSize: compact ? '14px' : '16px',
                  fontWeight: isSelected ? 600 : 500,
                  border: isSelected ? '2px solid var(--primary-500)' : '1px solid var(--gray-200)',
                  backgroundColor: isAvailable
                    ? isSelected
                      ? 'var(--primary-500)'
                      : 'white'
                    : 'var(--gray-100)',
                  color: isAvailable
                    ? isSelected
                      ? 'white'
                      : 'var(--gray-700)'
                    : 'var(--gray-400)',
                  cursor: isAvailable ? 'pointer' : 'not-allowed',
                  textDecoration: isAvailable ? 'none' : 'line-through',
                  transition: 'all 0.2s',
                  boxShadow: isSelected ? '0 2px 8px rgba(61, 161, 227, 0.25)' : 'none'
                }}
              >
                {slot.time}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: compact ? '12px' : '16px',
        border: '1px solid var(--gray-200)',
        padding: compact ? '16px' : '24px'
      }}
    >
      <h3 style={{ fontSize: compact ? '16px' : '18px', fontWeight: 600, color: 'var(--gray-900)', marginBottom: compact ? '14px' : '20px' }}>
        시간 선택
      </h3>

      {renderSlots(
        morningSlots,
        "오전 (09:00 ~ 12:00)",
        <Sun style={{ width: compact ? '14px' : '18px', height: compact ? '14px' : '18px', color: 'var(--warning-500)' }} />
      )}
      {renderSlots(
        afternoonSlots,
        "오후 (14:00 ~ 18:00)",
        <Sunset style={{ width: compact ? '14px' : '18px', height: compact ? '14px' : '18px', color: 'var(--primary-500)' }} />
      )}

      {/* 선택된 시간 표시 - compact 모드에서는 숨김 */}
      {!compact && selectedTime && (
        <div style={{
          marginTop: '16px',
          padding: '16px',
          backgroundColor: 'var(--primary-50)',
          borderRadius: '12px',
          border: '1px solid var(--primary-100)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Clock style={{ width: '20px', height: '20px', color: 'var(--primary-500)' }} />
            <p style={{ color: 'var(--primary-700)', fontWeight: 600 }}>
              선택된 시간: {selectedTime}
            </p>
          </div>
        </div>
      )}

      {/* 점심시간 안내 */}
      <div style={{
        marginTop: compact ? '12px' : '16px',
        padding: compact ? '8px 12px' : '12px 16px',
        backgroundColor: 'var(--gray-50)',
        borderRadius: compact ? '8px' : '10px',
        fontSize: compact ? '13px' : '14px',
        color: 'var(--gray-600)'
      }}>
        <p>점심시간 (12:30 ~ 13:30)은 예약이 불가합니다</p>
      </div>
    </div>
  );
}
