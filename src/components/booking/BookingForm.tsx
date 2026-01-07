"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { patientFormSchema, PatientFormData } from "@/lib/validation";
import { Input, Button } from "@/components/ui";
import { cn } from "@/lib/utils";

interface BookingFormProps {
  onSubmit: (data: PatientFormData) => void;
  isLoading?: boolean;
}

export function BookingForm({ onSubmit, isLoading }: BookingFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PatientFormData>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      birthdate: "",
      memo: "",
      privacyAgreed: false,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <Input
          label="이름"
          placeholder="홍길동"
          {...register("name")}
          error={errors.name?.message}
        />

        <Input
          label="연락처"
          type="tel"
          placeholder="010-1234-5678"
          {...register("phone")}
          error={errors.phone?.message}
        />
      </div>

      <Input
        label="생년월일"
        type="date"
        {...register("birthdate")}
        error={errors.birthdate?.message}
      />

      <div>
        <label className="block text-base font-medium text-[var(--gray-700)] mb-2">
          증상 메모 (선택)
        </label>
        <textarea
          {...register("memo")}
          placeholder="진료 시 참고할 내용이 있으시면 작성해주세요"
          className={cn(
            "w-full p-4 text-base rounded-lg border bg-white transition-all duration-200",
            "placeholder:text-[var(--gray-400)]",
            "focus:outline-none focus:ring-2 focus:ring-offset-0",
            "border-[var(--gray-300)] focus:ring-[var(--primary-500)] focus:border-[var(--primary-500)]",
            "min-h-[120px] resize-none"
          )}
        />
        {errors.memo?.message && (
          <p className="mt-2 text-sm text-[var(--error-500)]">
            {errors.memo.message}
          </p>
        )}
      </div>

      {/* Privacy Agreement */}
      <div className="p-4 bg-[var(--gray-50)] rounded-xl">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            {...register("privacyAgreed")}
            className="w-5 h-5 mt-0.5 rounded border-[var(--gray-300)] text-[var(--primary-500)] focus:ring-[var(--primary-500)]"
          />
          <div className="flex-1">
            <span className="font-medium text-[var(--gray-900)]">
              개인정보 수집 및 이용 동의 (필수)
            </span>
            <p className="text-sm text-[var(--gray-500)] mt-1">
              진료 예약을 위해 이름, 연락처, 생년월일 정보를 수집합니다. 수집된
              정보는 진료 예약 및 안내 목적으로만 사용됩니다.
            </p>
          </div>
        </label>
        {errors.privacyAgreed?.message && (
          <p className="mt-2 text-sm text-[var(--error-500)]">
            {errors.privacyAgreed.message}
          </p>
        )}
      </div>

      <Button type="submit" size="lg" className="w-full" isLoading={isLoading}>
        예약 완료하기
      </Button>
    </form>
  );
}
