"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function DoctorDetailPage() {
  const params = useParams();
  const router = useRouter();
  const doctorId = params.id as string;

  useEffect(() => {
    // 해당 의사 ID를 쿼리 파라미터로 전달하여 /doctors 페이지로 리다이렉트
    router.replace(`/doctors?expand=${doctorId}`);
  }, [doctorId, router]);

  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px 24px'
    }}>
      <p style={{ fontSize: '16px', color: 'var(--gray-500)' }}>
        의료진 페이지로 이동 중...
      </p>
    </div>
  );
}
