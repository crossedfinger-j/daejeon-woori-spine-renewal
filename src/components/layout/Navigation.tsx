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
      <ul className="space-y-2">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onItemClick}
              className={cn(
                "block px-5 py-4 rounded-xl text-base font-medium transition-all",
                isActive(item.href)
                  ? "bg-[var(--primary-50)] text-[var(--primary-600)] border-l-4 border-[var(--primary-500)]"
                  : "text-[var(--gray-700)] hover:bg-[var(--gray-50)] hover:text-[var(--primary-600)]"
              )}
            >
              {item.label}
            </Link>
          </li>
        ))}
        <li className="pt-6 border-t border-[var(--gray-200)] mt-4">
          <a
            href="tel:1577-0052"
            className="flex items-center justify-center gap-2 px-5 py-4 bg-[var(--primary-50)] text-[var(--primary-600)] font-semibold rounded-xl"
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
