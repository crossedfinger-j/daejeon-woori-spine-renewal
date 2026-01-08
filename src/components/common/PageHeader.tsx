"use client";

interface PageHeaderProps {
  title: string;
  description: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <section style={{
      backgroundColor: 'white',
      padding: '40px 0',
      borderBottom: '1px solid var(--slate-200)'
    }}>
      <div style={{
        maxWidth: '80rem',
        margin: '0 auto',
        padding: '0 20px',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: 800,
          color: 'var(--gray-900)',
          marginBottom: '12px'
        }}>
          {title}
        </h1>
        <p style={{
          fontSize: '15px',
          color: 'var(--gray-600)',
          lineHeight: 1.6,
          maxWidth: '500px',
          margin: '0 auto'
        }}>
          {description}
        </p>
      </div>
    </section>
  );
}
