"use client";

import { useMemo, useState } from "react";
import { Doctor, Symptom } from "@/types";
import { doctors } from "@/data";
import { DoctorCard } from "./DoctorCard";

interface DoctorListProps {
  selectedSymptoms: Symptom[];
  selectedDoctor: Doctor | null;
  onSelectDoctor: (doctor: Doctor) => void;
}

type SortOption = "recommended" | "career" | "available";

export function DoctorList({
  selectedSymptoms,
  selectedDoctor,
  onSelectDoctor,
}: DoctorListProps) {
  const [sortBy, setSortBy] = useState<SortOption>("recommended");

  // 증상에 맞는 의료진 필터링 및 추천 점수 계산
  const matchedDoctors = useMemo(() => {
    const relatedCenters = new Set(
      selectedSymptoms.flatMap((s) => s.relatedCenters)
    );

    const scored = doctors.map((doctor) => {
      let score = 0;

      // 센터 매칭 점수
      if (relatedCenters.has(doctor.center)) {
        score += 10;
      }

      // 전문 분야 매칭 점수
      const symptomNames = selectedSymptoms.map((s) => s.name.toLowerCase());
      doctor.specialty.forEach((spec) => {
        if (
          symptomNames.some(
            (name) =>
              spec.toLowerCase().includes(name) || name.includes(spec.toLowerCase())
          )
        ) {
          score += 5;
        }
      });

      // 센터장급 보너스
      if (doctor.title.includes("센터장")) {
        score += 3;
      }

      return { doctor, score };
    });

    // 관련 의료진만 필터링 (점수 0 초과)
    const filtered = scored.filter((item) => item.score > 0);

    // 정렬
    switch (sortBy) {
      case "career":
        filtered.sort((a, b) => {
          const aCareer = a.doctor.career.length;
          const bCareer = b.doctor.career.length;
          return bCareer - aCareer;
        });
        break;
      case "available":
        filtered.sort((a, b) => {
          const aAvailable = a.doctor.availableSlots.filter((s) => s.available).length;
          const bAvailable = b.doctor.availableSlots.filter((s) => s.available).length;
          return bAvailable - aAvailable;
        });
        break;
      default:
        filtered.sort((a, b) => b.score - a.score);
    }

    return filtered;
  }, [selectedSymptoms, sortBy]);

  if (selectedSymptoms.length === 0) {
    return (
      <div className="text-center py-12 text-[var(--gray-500)]">
        <p className="text-lg">증상을 선택하시면 맞춤 의료진을 추천해드립니다</p>
      </div>
    );
  }

  return (
    <div>
      {/* Sort Options */}
      <div className="flex gap-2 mb-6">
        {[
          { value: "recommended", label: "추천순" },
          { value: "career", label: "경력순" },
          { value: "available", label: "빠른예약순" },
        ].map((option) => (
          <button
            key={option.value}
            onClick={() => setSortBy(option.value as SortOption)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              sortBy === option.value
                ? "bg-[var(--primary-500)] text-white"
                : "bg-[var(--gray-100)] text-[var(--gray-700)] hover:bg-[var(--gray-200)]"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Doctor List */}
      {matchedDoctors.length === 0 ? (
        <div className="text-center py-12 text-[var(--gray-500)]">
          <p className="text-lg">선택하신 증상과 관련된 의료진이 없습니다</p>
          <p className="text-sm mt-2">다른 증상을 선택해주세요</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {matchedDoctors.map(({ doctor, score }, index) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              isSelected={selectedDoctor?.id === doctor.id}
              onSelect={() => onSelectDoctor(doctor)}
              recommended={index === 0 && sortBy === "recommended"}
            />
          ))}
        </div>
      )}
    </div>
  );
}
