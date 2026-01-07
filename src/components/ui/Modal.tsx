"use client";

import { Fragment, ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "full";
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = "md",
}: ModalProps) {
  const sizes = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    full: "max-w-full mx-4",
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-fade-in" />
        <Dialog.Content
          className={cn(
            "fixed z-50 bg-white rounded-2xl shadow-xl",
            "w-[calc(100%-2rem)] p-6",
            "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
            "focus:outline-none animate-slide-up",
            "max-h-[85vh] overflow-y-auto",
            sizes[size]
          )}
        >
          {title && (
            <Dialog.Title className="text-xl font-semibold text-[var(--gray-900)] mb-2">
              {title}
            </Dialog.Title>
          )}
          {description && (
            <Dialog.Description className="text-base text-[var(--gray-600)] mb-4">
              {description}
            </Dialog.Description>
          )}
          {children}
          <Dialog.Close asChild>
            <button
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-[var(--gray-100)] transition-colors"
              aria-label="닫기"
            >
              <X className="w-5 h-5 text-[var(--gray-500)]" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
