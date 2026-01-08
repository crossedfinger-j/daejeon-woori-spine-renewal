"use client";

import { HTMLAttributes, forwardRef, CSSProperties } from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "primary" | "success" | "warning" | "error" | "outline";
  size?: "sm" | "md" | "lg";
}

// 인라인 스타일로 패딩 적용
const sizeStyles: Record<string, CSSProperties> = {
  sm: { padding: '6px 16px', fontSize: '14px' },
  md: { padding: '8px 20px', fontSize: '16px' },
  lg: { padding: '10px 24px', fontSize: '18px' },
};

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", size = "md", style, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-full";

    const variants = {
      default: "bg-[var(--gray-100)] text-[var(--gray-700)]",
      primary: "bg-[var(--primary-50)] text-[var(--primary-700)]",
      success: "bg-[var(--success-50)] text-[var(--success-600)]",
      warning: "bg-[var(--warning-50)] text-[var(--warning-600)]",
      error: "bg-[var(--error-50)] text-[var(--error-600)]",
      outline: "bg-white border border-[var(--gray-300)] text-[var(--gray-600)]",
    };

    return (
      <span
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        style={{ ...sizeStyles[size], ...style }}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";

export { Badge };
