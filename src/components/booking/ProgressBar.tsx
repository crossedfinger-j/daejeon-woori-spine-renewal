"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <div className="w-full">
      {/* Mobile Progress */}
      <div className="lg:hidden mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-[var(--gray-500)]">
            {steps[currentStep - 1]?.label}
          </span>
          <span className="text-sm font-medium text-[var(--primary-600)]">
            {currentStep}/{totalSteps}
          </span>
        </div>
        <div className="h-2 bg-[var(--gray-200)] rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--primary-500)] rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Desktop Progress */}
      <div className="hidden lg:flex items-center justify-center gap-4 mb-8">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.number;
          const isCurrent = currentStep === step.number;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.number} className="flex items-center">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all",
                    isCompleted
                      ? "bg-[var(--primary-500)] text-white"
                      : isCurrent
                      ? "bg-[var(--primary-500)] text-white ring-4 ring-[var(--primary-100)]"
                      : "bg-[var(--gray-200)] text-[var(--gray-500)]"
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    step.number
                  )}
                </div>
                <span
                  className={cn(
                    "font-medium",
                    isCurrent || isCompleted
                      ? "text-[var(--gray-900)]"
                      : "text-[var(--gray-400)]"
                  )}
                >
                  {step.label}
                </span>
              </div>

              {!isLast && (
                <div
                  className={cn(
                    "w-16 h-0.5 mx-4",
                    isCompleted ? "bg-[var(--primary-500)]" : "bg-[var(--gray-200)]"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
