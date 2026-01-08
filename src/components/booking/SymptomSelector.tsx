"use client";

import { getSymptomsByBodyPart, getBodyPartInfo } from "@/data";
import { Symptom } from "@/types";
import { Info } from "lucide-react";

// 의료/해부학 스타일 커스텀 SVG 아이콘 - QuickBookingCTA, BodyPartSelector와 동일
const BodyPartIcons: Record<string, React.ReactNode> = {
  neck: (
    <svg width="24" height="24" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="26" y="8" width="12" height="8" rx="2" fill="#FEE2E2" stroke="#EF4444" />
      <rect x="25" y="18" width="14" height="8" rx="2" fill="#FEE2E2" stroke="#EF4444" />
      <rect x="24" y="28" width="16" height="8" rx="2" fill="#FEE2E2" stroke="#EF4444" />
      <rect x="23" y="38" width="18" height="8" rx="2" fill="#FEE2E2" stroke="#EF4444" />
      <rect x="22" y="48" width="20" height="8" rx="2" fill="#FEE2E2" stroke="#EF4444" />
      <line x1="32" y1="12" x2="32" y2="52" stroke="#DC2626" strokeWidth="1.5" strokeDasharray="2 2" />
    </svg>
  ),
  back: (
    <svg width="24" height="24" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="22" y="6" width="20" height="9" rx="3" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="2" />
      <rect x="21" y="17" width="22" height="10" rx="3" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="2" />
      <rect x="20" y="29" width="24" height="10" rx="3" fill="#BFDBFE" stroke="#2563EB" strokeWidth="2.5" />
      <rect x="21" y="41" width="22" height="10" rx="3" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="2" />
      <rect x="22" y="53" width="20" height="8" rx="3" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="2" />
      <line x1="32" y1="10" x2="32" y2="57" stroke="#1D4ED8" strokeWidth="1.5" strokeDasharray="2 2" />
      <path d="M20 34L14 34" stroke="#3B82F6" strokeWidth="2" />
      <path d="M44 34L50 34" stroke="#3B82F6" strokeWidth="2" />
    </svg>
  ),
  shoulder: (
    <svg width="24" height="24" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 20L32 16L54 20" stroke="#10B981" strokeWidth="3" fill="none" />
      <path d="M14 22L20 44L32 38L44 44L50 22" fill="#D1FAE5" stroke="#059669" strokeWidth="2" />
      <circle cx="18" cy="28" r="8" fill="#A7F3D0" stroke="#059669" strokeWidth="2.5" />
      <circle cx="46" cy="28" r="8" fill="#A7F3D0" stroke="#059669" strokeWidth="2.5" />
      <circle cx="18" cy="28" r="3" fill="#047857" />
      <circle cx="46" cy="28" r="3" fill="#047857" />
      <path d="M18 36L14 56" stroke="#065F46" strokeWidth="4" strokeLinecap="round" />
      <path d="M46 36L50 56" stroke="#065F46" strokeWidth="4" strokeLinecap="round" />
    </svg>
  ),
  knee: (
    <svg width="24" height="24" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M28 8L30 24" stroke="#92400E" strokeWidth="6" strokeLinecap="round" />
      <path d="M36 8L34 24" stroke="#92400E" strokeWidth="6" strokeLinecap="round" />
      <ellipse cx="32" cy="32" rx="14" ry="10" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2.5" />
      <ellipse cx="32" cy="32" rx="6" ry="4" fill="#FDE68A" stroke="#F59E0B" strokeWidth="1.5" />
      <path d="M28 40L26 56" stroke="#92400E" strokeWidth="6" strokeLinecap="round" />
      <path d="M36 40L38 56" stroke="#92400E" strokeWidth="6" strokeLinecap="round" />
    </svg>
  ),
  hand: (
    <svg width="24" height="24" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 38L22 48C22 52 26 56 32 56C38 56 42 52 42 48L42 38" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" />
      <rect x="18" y="18" width="6" height="22" rx="3" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5" />
      <rect x="26" y="10" width="6" height="30" rx="3" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5" />
      <rect x="34" y="12" width="6" height="28" rx="3" fill="#FDE68A" stroke="#F59E0B" strokeWidth="2" />
      <rect x="42" y="16" width="6" height="24" rx="3" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5" />
      <ellipse cx="12" cy="34" rx="4" ry="8" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5" transform="rotate(-20 12 34)" />
    </svg>
  ),
  foot: (
    <svg width="24" height="24" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M28 4L30 20" stroke="#7C3AED" strokeWidth="5" strokeLinecap="round" />
      <path d="M36 4L34 20" stroke="#7C3AED" strokeWidth="5" strokeLinecap="round" />
      <ellipse cx="32" cy="24" rx="12" ry="6" fill="#EDE9FE" stroke="#8B5CF6" strokeWidth="2" />
      <ellipse cx="32" cy="32" rx="8" ry="5" fill="#DDD6FE" stroke="#7C3AED" strokeWidth="2" />
      <path d="M24 36L16 50" stroke="#7C3AED" strokeWidth="3" strokeLinecap="round" />
      <path d="M30 37L26 52" stroke="#7C3AED" strokeWidth="3" strokeLinecap="round" />
      <path d="M34 37L38 52" stroke="#7C3AED" strokeWidth="3" strokeLinecap="round" />
      <path d="M40 36L48 50" stroke="#7C3AED" strokeWidth="3" strokeLinecap="round" />
      <circle cx="14" cy="54" r="4" fill="#EDE9FE" stroke="#8B5CF6" strokeWidth="1.5" />
      <circle cx="26" cy="56" r="4" fill="#EDE9FE" stroke="#8B5CF6" strokeWidth="1.5" />
      <circle cx="38" cy="56" r="4" fill="#EDE9FE" stroke="#8B5CF6" strokeWidth="1.5" />
      <circle cx="50" cy="54" r="4" fill="#EDE9FE" stroke="#8B5CF6" strokeWidth="1.5" />
    </svg>
  ),
  hip: (
    <svg width="24" height="24" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 18C6 14 14 8 32 8C50 8 58 14 58 18L54 32L10 32L6 18Z" fill="#FECACA" stroke="#DC2626" strokeWidth="2" />
      <path d="M26 32L32 44L38 32" fill="#FEE2E2" stroke="#EF4444" strokeWidth="2" />
      <circle cx="18" cy="36" r="9" fill="#FEE2E2" stroke="#DC2626" strokeWidth="2.5" />
      <circle cx="46" cy="36" r="9" fill="#FEE2E2" stroke="#DC2626" strokeWidth="2.5" />
      <circle cx="18" cy="36" r="5" fill="#FECACA" stroke="#B91C1C" strokeWidth="2" />
      <circle cx="46" cy="36" r="5" fill="#FECACA" stroke="#B91C1C" strokeWidth="2" />
      <path d="M18 45L14 60" stroke="#991B1B" strokeWidth="5" strokeLinecap="round" />
      <path d="M46 45L50 60" stroke="#991B1B" strokeWidth="5" strokeLinecap="round" />
    </svg>
  ),
};

interface SymptomSelectorProps {
  selectedBodyParts: string[];
  selectedSymptoms: Symptom[];
  onToggle: (symptom: Symptom) => void;
}

export function SymptomSelector({
  selectedBodyParts,
  selectedSymptoms,
  onToggle,
}: SymptomSelectorProps) {
  if (selectedBodyParts.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--gray-500)' }}>
        <p style={{ fontSize: '16px' }}>위에서 불편한 부위를 먼저 선택해주세요</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {selectedBodyParts.map((partId) => {
        const partInfo = getBodyPartInfo(partId);
        const symptoms = getSymptomsByBodyPart(partId);

        if (!partInfo || symptoms.length === 0) return null;

        return (
          <div key={partId}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: 600,
              color: 'var(--gray-900)',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{ lineHeight: 1 }}>{BodyPartIcons[partId] || partInfo.icon}</span>
              <span>{partInfo.nameKo} 관련 증상</span>
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {symptoms.map((symptom) => {
                const isSelected = selectedSymptoms.some((s) => s.id === symptom.id);

                return (
                  <button
                    key={symptom.id}
                    onClick={() => onToggle(symptom)}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '16px',
                      padding: '16px',
                      borderRadius: '12px',
                      border: isSelected ? '2px solid var(--primary-500)' : '2px solid var(--gray-200)',
                      backgroundColor: isSelected ? 'var(--primary-50)' : 'white',
                      textAlign: 'left',
                      transition: 'all 0.2s',
                      cursor: 'pointer'
                    }}
                  >
                    <div
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        border: isSelected ? '2px solid var(--primary-500)' : '2px solid var(--gray-300)',
                        backgroundColor: isSelected ? 'var(--primary-500)' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: '2px'
                      }}
                    >
                      {isSelected && (
                        <svg
                          style={{ width: '14px', height: '14px', color: 'white' }}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>

                    <div style={{ flex: 1 }}>
                      <p
                        style={{
                          fontWeight: 500,
                          fontSize: '17px',
                          color: isSelected ? 'var(--primary-700)' : 'var(--gray-900)'
                        }}
                      >
                        {symptom.name}
                      </p>
                      <p style={{
                        fontSize: '14px',
                        color: 'var(--gray-500)',
                        marginTop: '4px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '4px'
                      }}>
                        <Info style={{ width: '15px', height: '15px', flexShrink: 0, marginTop: '2px' }} />
                        {symptom.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
