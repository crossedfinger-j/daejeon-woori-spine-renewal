"use client";

import Link from "next/link";
import { MessageCircle, Phone, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

export function StickyActionBar() {
  const actions = [
    {
      icon: MessageCircle,
      label: "카톡상담",
      href: "https://pf.kakao.com/_example", // 실제 카카오톡 채널 URL로 변경
      color: "bg-[#FEE500] text-[#3C1E1E]",
      hoverColor: "hover:bg-[#F5DC00]",
    },
    {
      icon: Phone,
      label: "전화연결",
      href: "tel:1577-0052",
      color: "bg-[var(--success-500)] text-white",
      hoverColor: "hover:bg-[var(--success-600)]",
    },
    {
      icon: Calendar,
      label: "온라인예약",
      href: "/booking",
      color: "bg-[var(--primary-500)] text-white",
      hoverColor: "hover:bg-[var(--primary-600)]",
      isLink: true,
    },
  ];

  return (
    <>
      {/* Mobile - Fixed Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-[var(--gray-200)] safe-area-bottom">
        <div className="flex items-center h-[60px]">
          {actions.map((action, index) => {
            const Icon = action.icon;
            const className = cn(
              "flex-1 h-full flex flex-col items-center justify-center gap-1 transition-colors",
              action.color,
              action.hoverColor
            );

            if (action.isLink) {
              return (
                <Link key={index} href={action.href} className={className}>
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{action.label}</span>
                </Link>
              );
            }

            return (
              <a
                key={index}
                href={action.href}
                target={action.href.startsWith("http") ? "_blank" : undefined}
                rel={action.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className={className}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{action.label}</span>
              </a>
            );
          })}
        </div>
      </div>

      {/* Desktop - Fixed Right Floating */}
      <div className="hidden lg:flex fixed right-6 bottom-6 z-50 flex-col gap-3">
        {actions.map((action, index) => {
          const Icon = action.icon;
          const className = cn(
            "flex items-center gap-3 px-5 py-3 rounded-full shadow-lg transition-all",
            action.color,
            action.hoverColor,
            "hover:shadow-xl hover:scale-105"
          );

          if (action.isLink) {
            return (
              <Link key={index} href={action.href} className={className}>
                <Icon className="w-5 h-5" />
                <span className="font-medium">{action.label}</span>
              </Link>
            );
          }

          return (
            <a
              key={index}
              href={action.href}
              target={action.href.startsWith("http") ? "_blank" : undefined}
              rel={action.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className={className}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{action.label}</span>
            </a>
          );
        })}
      </div>
    </>
  );
}
