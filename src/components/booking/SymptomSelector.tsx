"use client";

import { getSymptomsByBodyPart, getBodyPartInfo } from "@/data";
import { Symptom } from "@/types";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";

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
      <div className="text-center py-12 text-[var(--gray-500)]">
        <p className="text-lg">위에서 불편한 부위를 먼저 선택해주세요</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {selectedBodyParts.map((partId) => {
        const partInfo = getBodyPartInfo(partId);
        const symptoms = getSymptomsByBodyPart(partId);

        if (!partInfo || symptoms.length === 0) return null;

        return (
          <div key={partId}>
            <h3 className="text-xl font-semibold text-[var(--gray-900)] mb-4 flex items-center gap-2">
              <span>{partInfo.icon}</span>
              <span>{partInfo.nameKo} 관련 증상</span>
            </h3>

            <div className="grid sm:grid-cols-2 gap-3">
              {symptoms.map((symptom) => {
                const isSelected = selectedSymptoms.some((s) => s.id === symptom.id);

                return (
                  <button
                    key={symptom.id}
                    onClick={() => onToggle(symptom)}
                    className={cn(
                      "flex items-start gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200",
                      isSelected
                        ? "border-[var(--primary-500)] bg-[var(--primary-50)]"
                        : "border-[var(--gray-200)] bg-white hover:border-[var(--primary-300)]"
                    )}
                  >
                    <div
                      className={cn(
                        "w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5",
                        isSelected
                          ? "border-[var(--primary-500)] bg-[var(--primary-500)]"
                          : "border-[var(--gray-300)]"
                      )}
                    >
                      {isSelected && (
                        <svg
                          className="w-4 h-4 text-white"
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

                    <div className="flex-1">
                      <p
                        className={cn(
                          "font-medium text-lg",
                          isSelected
                            ? "text-[var(--primary-700)]"
                            : "text-[var(--gray-900)]"
                        )}
                      >
                        {symptom.name}
                      </p>
                      <p className="text-sm text-[var(--gray-500)] mt-1 flex items-start gap-1">
                        <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
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
