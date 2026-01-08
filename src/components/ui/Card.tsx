"use client";

import { forwardRef, HTMLAttributes, CSSProperties } from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "interactive" | "outlined" | "elevated";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
}

// 인라인 스타일로 패딩 적용 (적절한 여백)
const paddingStyles: Record<string, CSSProperties> = {
  none: {},
  sm: { padding: '16px' },
  md: { padding: '20px' },
  lg: { padding: '24px' },
  xl: { padding: '32px' },
};

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", padding = "lg", children, style, ...props }, ref) => {
    // 현대적 스타일: 흰색 배경 + slate 보더 + lg 그림자
    const baseStyles = "rounded-3xl bg-white overflow-hidden";

    const variants = {
      default:
        "border border-[var(--slate-100)] shadow-lg shadow-slate-200/50",
      interactive:
        "border border-[var(--slate-100)] shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-300/50 hover:border-[var(--slate-200)] transition-all duration-300 cursor-pointer hover:-translate-y-2",
      outlined:
        "border-2 border-[var(--slate-200)] hover:border-[var(--primary-400)] transition-colors duration-300",
      elevated:
        "border border-[var(--slate-100)] shadow-xl shadow-slate-300/40 hover:shadow-2xl transition-all duration-300",
    };

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        style={{ ...paddingStyles[padding], ...style }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, style, ...props }, ref) => (
    <div ref={ref} className={cn("", className)} style={{ marginBottom: '16px', ...style }} {...props} />
  )
);

CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-2xl font-bold text-[var(--gray-900)]", className)}
      {...props}
    />
  )
);

CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, style, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-lg text-[var(--gray-600)] leading-relaxed", className)}
    style={{ marginTop: '12px', ...style }}
    {...props}
  />
));

CardDescription.displayName = "CardDescription";

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("", className)} {...props} />
  )
);

CardContent.displayName = "CardContent";

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, style, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center", className)}
      style={{ marginTop: '20px', gap: '16px', ...style }}
      {...props}
    />
  )
);

CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
