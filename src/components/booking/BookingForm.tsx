"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { patientFormSchema, PatientFormData } from "@/lib/validation";
import { Input, Button } from "@/components/ui";

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
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* 이름, 연락처 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
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

      {/* 생년월일 */}
      <Input
        label="생년월일"
        type="date"
        {...register("birthdate")}
        error={errors.birthdate?.message}
      />

      {/* 증상 메모 */}
      <div>
        <label
          style={{
            display: 'block',
            fontSize: '15px',
            fontWeight: 500,
            color: 'var(--gray-700)',
            marginBottom: '8px'
          }}
        >
          증상 메모 (선택)
        </label>
        <textarea
          {...register("memo")}
          placeholder="진료 시 참고할 내용이 있으시면 작성해주세요"
          style={{
            width: '100%',
            padding: '14px 16px',
            fontSize: '16px',
            borderRadius: '10px',
            border: '1px solid var(--gray-300)',
            backgroundColor: 'white',
            transition: 'all 0.2s',
            outline: 'none',
            minHeight: '100px',
            resize: 'vertical',
            fontFamily: 'inherit'
          }}
        />
        {errors.memo?.message && (
          <p style={{ marginTop: '8px', fontSize: '14px', color: 'var(--error-500)' }}>
            {errors.memo.message}
          </p>
        )}
      </div>

      {/* Privacy Agreement */}
      <div
        style={{
          padding: '16px',
          backgroundColor: 'var(--gray-50)',
          borderRadius: '12px',
          border: '1px solid var(--gray-200)'
        }}
      >
        <label style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer' }}>
          <input
            type="checkbox"
            {...register("privacyAgreed")}
            style={{
              width: '20px',
              height: '20px',
              marginTop: '2px',
              accentColor: 'var(--primary-500)',
              cursor: 'pointer'
            }}
          />
          <div style={{ flex: 1 }}>
            <span style={{ fontWeight: 600, color: 'var(--gray-900)', fontSize: '15px' }}>
              개인정보 수집 및 이용 동의 (필수)
            </span>
            <p style={{ fontSize: '13px', color: 'var(--gray-500)', marginTop: '6px', lineHeight: '1.5' }}>
              진료 예약을 위해 이름, 연락처, 생년월일 정보를 수집합니다. 수집된
              정보는 진료 예약 및 안내 목적으로만 사용됩니다.
            </p>
          </div>
        </label>
        {errors.privacyAgreed?.message && (
          <p style={{ marginTop: '8px', fontSize: '14px', color: 'var(--error-500)' }}>
            {errors.privacyAgreed.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        style={{ width: '100%', height: '56px', fontSize: '17px', fontWeight: 600 }}
        isLoading={isLoading}
      >
        예약 완료하기
      </Button>
    </form>
  );
}
