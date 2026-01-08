"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavigationProps {
  isMobile?: boolean;
  onItemClick?: () => void;
}

const navItems = [
  { href: "/centers", label: "전문센터" },
  { href: "/doctors", label: "의료진" },
  { href: "/booking", label: "진료예약" },
  { href: "/booking/lookup", label: "예약조회" },
  { href: "/location", label: "오시는 길" },
  { href: "/certificate", label: "증명서" },
];

export function Navigation({ isMobile = false, onItemClick }: NavigationProps) {
  const pathname = usePathname();

  // 현재 경로가 해당 메뉴와 일치하는지 확인 (더 구체적인 경로 우선)
  const isActive = (href: string) => {
    // 정확히 일치하는 경우
    if (pathname === href) return true;
    // /booking/lookup은 /booking과 구분
    if (href === "/booking" && pathname.startsWith("/booking/lookup")) return false;
    // 하위 경로 포함
    return pathname.startsWith(href + "/");
  };

  if (isMobile) {
    return (
      <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onItemClick}
              style={{
                display: 'flex',
                alignItems: 'center',
                minHeight: '56px',
                padding: '16px 24px',
                borderRadius: '16px',
                fontSize: '18px',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.2s',
                backgroundColor: isActive(item.href) ? 'var(--primary-500)' : 'var(--gray-50)',
                color: isActive(item.href) ? 'white' : 'var(--gray-800)',
                border: isActive(item.href) ? '2px solid var(--primary-500)' : '2px solid var(--gray-200)'
              }}
            >
              {item.label}
            </Link>
          </li>
        ))}
        <li style={{ paddingTop: '24px', marginTop: '12px', borderTop: '1px solid var(--gray-200)' }}>
          <a
            href="tel:1577-0052"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              minHeight: '56px',
              padding: '16px 24px',
              backgroundColor: 'var(--primary-600)',
              color: 'white',
              fontWeight: 700,
              fontSize: '18px',
              borderRadius: '16px',
              textDecoration: 'none',
              boxShadow: '0 4px 12px rgba(30, 58, 95, 0.3)'
            }}
          >
            전화상담: 1577-0052
          </a>
        </li>
      </ul>
    );
  }

  return (
    // gap-x-12로 메뉴 간 간격 대폭 확대
    <ul className="flex items-center gap-x-10 xl:gap-x-12">
      {navItems.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className={cn(
              // 그룹으로 묶어 hover 시 하단 인디케이터 표시
              "group relative py-2 text-lg font-medium transition-all duration-300",
              isActive(item.href)
                ? "text-[var(--primary-600)]"
                : "text-[var(--gray-600)] hover:text-[var(--primary-600)]"
            )}
          >
            {item.label}
            {/* Active/Hover indicator - 하단 인디케이터 */}
            <span
              className={cn(
                "absolute -bottom-1 left-0 h-0.5 bg-[var(--primary-500)] rounded-full transition-all duration-300",
                isActive(item.href)
                  ? "w-full"
                  : "w-0 group-hover:w-full"
              )}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
