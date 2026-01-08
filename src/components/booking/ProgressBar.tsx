"use client";

import { Check } from "lucide-react";

interface ProgressBarProps {
  currentStep: number;
  totalSteps?: number;
}

const steps = [
  { number: 1, label: "증상 선택" },
  { number: 2, label: "의료진 선택" },
  { number: 3, label: "시간 선택" },
  { number: 4, label: "예약 확인" },
];

export function ProgressBar({ currentStep, totalSteps = 4 }: ProgressBarProps) {
  return (
    <div style={{ width: '100%', marginBottom: '40px' }}>
      {/* Mobile Progress */}
      <div style={{ display: 'none' }} className="lg:hidden">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '14px', color: 'var(--gray-500)' }}>
            {steps[currentStep - 1]?.label}
          </span>
          <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--primary-600)' }}>
            {currentStep}/{totalSteps}
          </span>
        </div>
        <div style={{ height: '8px', backgroundColor: 'var(--gray-200)', borderRadius: '9999px', overflow: 'hidden' }}>
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
      </div>

      {/* Desktop Progress */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
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
                  {step.label}
                </span>
              </div>

              {!isLast && (
                <div
                  style={{
                    width: '64px',
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
