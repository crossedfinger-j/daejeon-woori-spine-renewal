"use client";

import { Check } from "lucide-react";

interface ProgressBarProps {
  currentStep: number;
  totalSteps?: number;
}

const steps = [
  { number: 1, label: "증상", labelFull: "증상 선택" },
  { number: 2, label: "의료진", labelFull: "의료진 선택" },
  { number: 3, label: "시간", labelFull: "시간 선택" },
  { number: 4, label: "확인", labelFull: "예약 확인" },
];

export function ProgressBar({ currentStep, totalSteps = 4 }: ProgressBarProps) {
  return (
    <div style={{ width: '100%', marginBottom: '32px' }}>
      {/* Mobile Progress - 간소화된 바 형태 */}
      <div className="progress-mobile">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <span style={{ fontSize: '16px', fontWeight: 600, color: 'var(--gray-900)' }}>
            {steps[currentStep - 1]?.labelFull}
          </span>
          <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--primary-600)' }}>
            {currentStep} / {totalSteps}
          </span>
        </div>
        <div style={{ height: '6px', backgroundColor: 'var(--gray-200)', borderRadius: '9999px', overflow: 'hidden' }}>
          <div
            style={{
              height: '100%',
              backgroundColor: 'var(--primary-500)',
              borderRadius: '9999px',
              transition: 'all 0.3s',
              width: `${(currentStep / totalSteps) * 100}%`
            }}
          />
        </div>
        {/* 단계 미니 인디케이터 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
          {steps.map((step) => {
            const isCompleted = currentStep > step.number;
            const isCurrent = currentStep === step.number;
            return (
              <span
                key={step.number}
                style={{
                  fontSize: '12px',
                  fontWeight: isCurrent ? 600 : 400,
                  color: isCompleted || isCurrent ? 'var(--primary-600)' : 'var(--gray-400)'
                }}
              >
                {step.label}
              </span>
            );
          })}
        </div>
      </div>

      {/* Desktop Progress - 전체 스텝 표시 */}
      <div className="progress-desktop">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.number;
          const isCurrent = currentStep === step.number;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.number} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 500,
                    fontSize: '15px',
                    transition: 'all 0.2s',
                    backgroundColor: isCompleted || isCurrent ? 'var(--primary-500)' : 'var(--gray-200)',
                    color: isCompleted || isCurrent ? 'white' : 'var(--gray-500)',
                    boxShadow: isCurrent ? '0 0 0 4px var(--primary-100)' : 'none'
                  }}
                >
                  {isCompleted ? (
                    <Check style={{ width: '20px', height: '20px' }} />
                  ) : (
                    step.number
                  )}
                </div>
                <span
                  style={{
                    fontWeight: 500,
                    color: isCurrent || isCompleted ? 'var(--gray-900)' : 'var(--gray-400)'
                  }}
                >
                  {step.labelFull}
                </span>
              </div>

              {!isLast && (
                <div
                  style={{
                    width: '48px',
                    height: '2px',
                    marginLeft: '16px',
                    marginRight: '16px',
                    backgroundColor: isCompleted ? 'var(--primary-500)' : 'var(--gray-200)'
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
