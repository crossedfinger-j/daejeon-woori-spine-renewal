"use client";

import { bodyParts } from "@/data";
import { cn } from "@/lib/utils";

interface BodyPartSelectorProps {
  selectedParts: string[];
  onToggle: (partId: string) => void;
}

export function BodyPartSelector({ selectedParts, onToggle }: BodyPartSelectorProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {bodyParts.map((part) => {
        const isSelected = selectedParts.includes(part.id);
        return (
          <button
            key={part.id}
            onClick={() => onToggle(part.id)}
            className={cn(
              "flex flex-col items-center p-6 rounded-2xl border-2 transition-all duration-200",
              isSelected
                ? "border-[var(--primary-500)] bg-[var(--primary-50)] shadow-md"
                : "border-[var(--gray-200)] bg-white hover:border-[var(--primary-300)] hover:bg-[var(--gray-50)]"
            )}
          >
            <span className="text-4xl mb-3">{part.icon}</span>
            <span
              className={cn(
                "font-medium text-lg",
                isSelected ? "text-[var(--primary-700)]" : "text-[var(--gray-700)]"
              )}
            >
              {part.nameKo}
            </span>
            {isSelected && (
              <span className="mt-2 w-6 h-6 bg-[var(--primary-500)] rounded-full flex items-center justify-center">
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
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
