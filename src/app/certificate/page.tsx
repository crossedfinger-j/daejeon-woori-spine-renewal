"use client";

import Link from "next/link";

export default function CertificatePage() {
  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px 24px',
      textAlign: 'center'
    }}>
      <h1 style={{
        fontSize: '24px',
        fontWeight: 700,
        color: 'var(--gray-900)',
        marginBottom: '12px'
      }}>
        증명 발급 안내
      </h1>

      <p style={{
        fontSize: '16px',
        color: 'var(--gray-600)',
        marginBottom: '32px'
      }}>
        아직 구현되지 않은 페이지입니다.
      </p>

      <Link
        href="/"
        style={{
          padding: '12px 32px',
          backgroundColor: 'var(--primary-500)',
          color: 'white',
          borderRadius: '8px',
          fontSize: '15px',
          fontWeight: 500,
          textDecoration: 'none'
        }}
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
