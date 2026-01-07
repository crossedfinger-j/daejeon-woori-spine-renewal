"use client";

import { Doctor } from "@/types";
import { Card, CardContent, Badge, Button } from "@/components/ui";
import { cn } from "@/lib/utils";

interface DoctorCardProps {
  doctor: Doctor;
  isSelected: boolean;
  onSelect: () => void;
  recommended?: boolean;
}

export function DoctorCard({ doctor, isSelected, onSelect, recommended }: DoctorCardProps) {
  return (
    <Card
      variant="interactive"
      padding="none"
      className={cn(
        "relative overflow-hidden transition-all duration-200",
        isSelected && "ring-2 ring-[var(--primary-500)]"
      )}
    >
      {recommended && (
        <div className="absolute top-0 right-0 bg-[var(--primary-500)] text-white text-xs font-medium px-3 py-1 rounded-bl-lg">
          추천
        </div>
      )}

      <div className="p-6">
        <div className="flex gap-4">
          {/* Profile Image */}
          <div className="w-20 h-20 bg-gradient-to-br from-[var(--gray-100)] to-[var(--gray-200)] rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="text-3xl">👨‍⚕️</span>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xl font-bold text-[var(--gray-900)]">
                {doctor.name}
              </h3>
              <Badge variant="primary" size="sm">
                {doctor.title}
              </Badge>
            </div>

            <div className="flex flex-wrap gap-1 mb-2">
              {doctor.specialty.map((spec, index) => (
                <Badge key={index} variant="outline" size="sm">
                  {spec}
                </Badge>
              ))}
            </div>

            <p className="text-sm text-[var(--gray-600)] line-clamp-2">
              {doctor.career[0]}
            </p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-[var(--gray-100)]">
          <Button
            variant={isSelected ? "primary" : "secondary"}
            className="w-full"
            onClick={onSelect}
          >
            {isSelected ? "선택됨" : "이 의료진 선택"}
          </Button>
        </div>
      </div>
    </Card>
  );
}
