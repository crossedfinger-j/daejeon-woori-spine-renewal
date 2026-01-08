"use client";

import { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "full";
  hideCloseButton?: boolean;
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = "md",
  hideCloseButton = false,
}: ModalProps) {
  const sizes = {
    sm: '384px',
    md: '448px',
    lg: '512px',
    full: 'calc(100% - 32px)',
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(4px)',
            zIndex: 50
          }}
        />
        <Dialog.Content
          style={{
            position: 'fixed',
            zIndex: 50,
            backgroundColor: 'white',
            borderRadius: '20px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            width: 'calc(100% - 32px)',
            maxWidth: sizes[size],
            padding: '28px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxHeight: '85vh',
            overflowY: 'auto',
            outline: 'none'
          }}
        >
          {/* 접근성을 위한 타이틀 - 항상 존재해야 함 */}
          {title ? (
            <Dialog.Title
              style={{
                fontSize: '20px',
                fontWeight: 600,
                color: 'var(--gray-900)',
                marginBottom: '8px'
              }}
            >
              {title}
            </Dialog.Title>
          ) : (
            <VisuallyHidden.Root>
              <Dialog.Title>대화상자</Dialog.Title>
            </VisuallyHidden.Root>
          )}

          {description && (
            <Dialog.Description
              style={{
                fontSize: '16px',
                color: 'var(--gray-600)',
                marginBottom: '16px'
              }}
            >
              {description}
            </Dialog.Description>
          )}

          {children}

          {!hideCloseButton && (
            <Dialog.Close asChild>
              <button
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  padding: '8px',
                  borderRadius: '50%',
                  border: 'none',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                aria-label="닫기"
              >
                <X style={{ width: '20px', height: '20px', color: 'var(--gray-500)' }} />
              </button>
            </Dialog.Close>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
