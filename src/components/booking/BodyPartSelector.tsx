"use client";

import { bodyParts } from "@/data";

// 의료/해부학 스타일 커스텀 SVG 아이콘 - QuickBookingCTA와 동일
const BodyPartIcons: Record<string, React.ReactNode> = {
  neck: (
    <svg width="36" height="36" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="26" y="8" width="12" height="8" rx="2" fill="#FEE2E2" stroke="#EF4444" />
      <rect x="25" y="18" width="14" height="8" rx="2" fill="#FEE2E2" stroke="#EF4444" />
      <rect x="24" y="28" width="16" height="8" rx="2" fill="#FEE2E2" stroke="#EF4444" />
      <rect x="23" y="38" width="18" height="8" rx="2" fill="#FEE2E2" stroke="#EF4444" />
      <rect x="22" y="48" width="20" height="8" rx="2" fill="#FEE2E2" stroke="#EF4444" />
      <line x1="32" y1="12" x2="32" y2="52" stroke="#DC2626" strokeWidth="1.5" strokeDasharray="2 2" />
    </svg>
  ),
  back: (
    <svg width="36" height="36" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    <svg width="36" height="36" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    <svg width="36" height="36" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M28 8L30 24" stroke="#92400E" strokeWidth="6" strokeLinecap="round" />
      <path d="M36 8L34 24" stroke="#92400E" strokeWidth="6" strokeLinecap="round" />
      <ellipse cx="32" cy="32" rx="14" ry="10" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2.5" />
      <ellipse cx="32" cy="32" rx="6" ry="4" fill="#FDE68A" stroke="#F59E0B" strokeWidth="1.5" />
      <path d="M28 40L26 56" stroke="#92400E" strokeWidth="6" strokeLinecap="round" />
      <path d="M36 40L38 56" stroke="#92400E" strokeWidth="6" strokeLinecap="round" />
    </svg>
  ),
  hand: (
    <svg width="36" height="36" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 38L22 48C22 52 26 56 32 56C38 56 42 52 42 48L42 38" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" />
      <rect x="18" y="18" width="6" height="22" rx="3" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5" />
      <rect x="26" y="10" width="6" height="30" rx="3" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5" />
      <rect x="34" y="12" width="6" height="28" rx="3" fill="#FDE68A" stroke="#F59E0B" strokeWidth="2" />
      <rect x="42" y="16" width="6" height="24" rx="3" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5" />
      <ellipse cx="12" cy="34" rx="4" ry="8" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5" transform="rotate(-20 12 34)" />
    </svg>
  ),
  foot: (
    <svg width="36" height="36" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    <svg width="36" height="36" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

interface BodyPartSelectorProps {
  selectedParts: string[];
  onToggle: (partId: string) => void;
}

export function BodyPartSelector({ selectedParts, onToggle }: BodyPartSelectorProps) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(85px, 1fr))',
      gap: '12px'
    }}>
      {bodyParts.map((part) => {
        const isSelected = selectedParts.includes(part.id);
        return (
          <button
            key={part.id}
            onClick={() => onToggle(part.id)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '16px 8px',
              borderRadius: '12px',
              border: isSelected ? '2px solid var(--primary-500)' : '2px solid var(--gray-200)',
              backgroundColor: isSelected ? 'var(--primary-50)' : 'white',
              boxShadow: isSelected ? '0 4px 12px rgba(61, 161, 227, 0.15)' : 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
              position: 'relative',
              color: isSelected ? 'var(--primary-600)' : 'var(--gray-600)'
            }}
          >
            <span style={{ marginBottom: '8px', lineHeight: 1 }}>{BodyPartIcons[part.id]}</span>
            <span
              style={{
                fontWeight: 500,
                fontSize: '15px',
                color: isSelected ? 'var(--primary-700)' : 'var(--gray-700)'
              }}
            >
              {part.nameKo}
            </span>
            {isSelected && (
              <span style={{
                position: 'absolute',
                bottom: '-8px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '20px',
                height: '20px',
                backgroundColor: 'var(--primary-500)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg
                  style={{ width: '12px', height: '12px', color: 'white' }}
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
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
