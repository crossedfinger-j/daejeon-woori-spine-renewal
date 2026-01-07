"use client";

import { forwardRef, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "interactive" | "outlined" | "elevated";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", padding = "lg", children, ...props }, ref) => {
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

    // Silver-Friendly: 최소 p-8 (32px) 이상 보장
    const paddings = {
      none: "",
      sm: "p-6",           // 24px
      md: "p-8",           // 32px - 최소 기본값
      lg: "p-10",          // 40px
      xl: "p-12",          // 48px
    };

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variants[variant], paddings[padding], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("mb-6", className)} {...props} />
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
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-lg text-[var(--gray-600)] mt-3 leading-relaxed", className)}
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
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("mt-8 flex items-center gap-5", className)}
      {...props}
    />
  )
);

CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
