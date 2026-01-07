"use client";

import { Doctor, Symptom } from "@/types";
import { Card, Badge } from "@/components/ui";
import { Calendar, Clock, User, Stethoscope } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface BookingSummaryProps {
  symptoms: Symptom[];
  doctor: Doctor | null;
  date: string | null;
  time: string | null;
}

export function BookingSummary({ symptoms, doctor, date, time }: BookingSummaryProps) {
  return (
    <Card className="bg-[var(--gray-50)]">
      <h3 className="text-lg font-semibold text-[var(--gray-900)] mb-4">
        예약 정보 확인
      </h3>

      <div className="space-y-4">
        {/* Symptoms */}
        {symptoms.length > 0 && (
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-[var(--primary-50)] rounded-lg flex items-center justify-center flex-shrink-0">
              <Stethoscope className="w-5 h-5 text-[var(--primary-500)]" />
            </div>
            <div>
              <p className="text-sm text-[var(--gray-500)]">선택 증상</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {symptoms.map((symptom) => (
                  <Badge key={symptom.id} variant="outline" size="sm">
                    {symptom.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Doctor */}
        {doctor && (
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-[var(--primary-50)] rounded-lg flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 text-[var(--primary-500)]" />
            </div>
            <div>
              <p className="text-sm text-[var(--gray-500)]">담당 의료진</p>
              <p className="font-medium text-[var(--gray-900)]">
                {doctor.name} {doctor.title}
              </p>
            </div>
          </div>
        )}

        {/* Date */}
        {date && (
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-[var(--primary-50)] rounded-lg flex items-center justify-center flex-shrink-0">
              <Calendar className="w-5 h-5 text-[var(--primary-500)]" />
            </div>
            <div>
              <p className="text-sm text-[var(--gray-500)]">예약 날짜</p>
              <p className="font-medium text-[var(--gray-900)]">
                {formatDate(new Date(date))}
              </p>
            </div>
          </div>
        )}

        {/* Time */}
        {time && (
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-[var(--primary-50)] rounded-lg flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-[var(--primary-500)]" />
            </div>
            <div>
              <p className="text-sm text-[var(--gray-500)]">예약 시간</p>
              <p className="font-medium text-[var(--gray-900)]">{time}</p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
