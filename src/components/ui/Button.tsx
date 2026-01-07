"use client";

import { forwardRef, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "cta";
  size?: "sm" | "md" | "lg" | "xl";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    // Silver-Friendly: rounded-xl or rounded-full, 부드러운 모서리
    const baseStyles =
      "inline-flex items-center justify-center font-semibold rounded-2xl transition-all duration-300 focus:outline-none focus-visible:ring-3 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap";

    const variants = {
      primary:
        "bg-[var(--primary-500)] text-white shadow-md hover:bg-[var(--primary-600)] hover:shadow-lg focus-visible:ring-[var(--primary-400)] active:bg-[var(--primary-700)]",
      secondary:
        "bg-white text-[var(--primary-600)] border-2 border-[var(--slate-200)] shadow-md hover:bg-[var(--slate-50)] hover:border-[var(--primary-400)] focus-visible:ring-[var(--primary-400)]",
      ghost:
        "bg-transparent text-[var(--gray-700)] hover:bg-[var(--slate-100)] focus-visible:ring-[var(--gray-400)]",
      danger:
        "bg-[var(--error-500)] text-white shadow-md hover:bg-[var(--error-600)] focus-visible:ring-[var(--error-400)]",
      cta:
        "bg-[var(--primary-500)] text-white shadow-xl hover:bg-[var(--primary-600)] hover:shadow-2xl hover:-translate-y-1 focus-visible:ring-[var(--primary-400)]",
    };

    // Silver-Friendly: 최소 h-14 (56px), px-8 (32px) 이상 터치 타겟
    const sizes = {
      sm: "h-12 px-6 py-3 text-base gap-2.5",         // 48px
      md: "h-14 px-8 py-4 text-lg gap-3",             // 56px - 최소 터치 타겟
      lg: "h-16 px-10 py-5 text-xl gap-3.5",          // 64px
      xl: "h-[4.5rem] px-12 py-6 text-xl gap-4",      // 72px - 매우 큰 버튼
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-6 h-6 animate-spin" />
        ) : (
          <>
            {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
