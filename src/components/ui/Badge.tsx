"use client";

import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "primary" | "success" | "warning" | "error" | "outline";
  size?: "sm" | "md" | "lg";
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
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

    // Silver-Friendly: 가독성을 위한 충분한 패딩 (글자와 상자 간격)
    const sizes = {
      sm: "px-3.5 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-5 py-2.5 text-lg",
    };

    return (
      <span
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";

export { Badge };
