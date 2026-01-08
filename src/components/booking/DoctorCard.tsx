"use client";

import { Doctor } from "@/types";
import { Badge, Button } from "@/components/ui";

interface DoctorCardProps {
  doctor: Doctor;
  isSelected: boolean;
  onSelect: () => void;
  recommended?: boolean;
  preSelected?: boolean;
}

export function DoctorCard({ doctor, isSelected, onSelect, recommended, preSelected }: DoctorCardProps) {
  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'white',
        borderRadius: '16px',
        border: isSelected ? '2px solid var(--primary-500)' : '1px solid var(--gray-200)',
        boxShadow: isSelected ? '0 4px 12px rgba(61, 161, 227, 0.15)' : '0 1px 3px rgba(0,0,0,0.05)',
        transition: 'all 0.2s',
        cursor: 'pointer'
      }}
      onClick={onSelect}
    >
      {preSelected && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          backgroundColor: 'var(--success-500)',
          color: 'white',
          fontSize: '12px',
          fontWeight: 600,
          padding: '6px 12px',
          borderBottomRightRadius: '12px'
        }}>
          선택된 의료진
        </div>
      )}
      {recommended && !preSelected && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          backgroundColor: 'var(--primary-500)',
          color: 'white',
          fontSize: '12px',
          fontWeight: 600,
          padding: '6px 12px',
          borderBottomRightRadius: '12px'
        }}>
          추천
        </div>
      )}

      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', gap: '16px' }}>
          {/* Profile Image */}
          <div style={{
            width: '64px',
            height: '64px',
            background: 'linear-gradient(135deg, var(--gray-100), var(--gray-200))',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <span style={{ fontSize: '28px' }}>👨‍⚕️</span>
          </div>

          {/* Info */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--gray-900)', whiteSpace: 'nowrap' }}>
                {doctor.name}
              </h3>
              <Badge variant="primary" size="sm">
                {doctor.title}
              </Badge>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }}>
              {doctor.specialty.slice(0, 3).map((spec, index) => (
                <Badge key={index} variant="outline" size="sm">
                  {spec}
                </Badge>
              ))}
            </div>

            <p style={{ fontSize: '14px', color: 'var(--gray-600)', lineHeight: '1.5', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {doctor.career[0]}
            </p>
          </div>
        </div>

        <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--gray-100)' }}>
          <Button
            variant={isSelected ? "primary" : "secondary"}
            style={{ width: '100%' }}
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
          >
            {isSelected ? "선택됨 ✓" : "이 의료진 선택"}
          </Button>
        </div>
      </div>
    </div>
  );
}
