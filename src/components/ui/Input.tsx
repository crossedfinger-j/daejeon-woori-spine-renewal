"use client";

import { forwardRef, InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, type = "text", id, style, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s/g, "-");

    return (
      <div style={{ width: '100%' }}>
        {label && (
          <label
            htmlFor={inputId}
            style={{
              display: 'block',
              fontSize: '15px',
              fontWeight: 500,
              color: 'var(--gray-700)',
              marginBottom: '8px'
            }}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          style={{
            width: '100%',
            height: '52px',
            padding: '0 16px',
            fontSize: '16px',
            borderRadius: '10px',
            border: error ? '1px solid var(--error-500)' : '1px solid var(--gray-300)',
            backgroundColor: props.disabled ? 'var(--gray-100)' : 'white',
            transition: 'all 0.2s',
            outline: 'none',
            cursor: props.disabled ? 'not-allowed' : 'text',
            ...style
          }}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...props}
        />
        {error && (
          <p
            id={`${inputId}-error`}
            style={{
              marginTop: '8px',
              fontSize: '14px',
              color: 'var(--error-500)'
            }}
            role="alert"
          >
            {error}
          </p>
        )}
        {helperText && !error && (
          <p
            id={`${inputId}-helper`}
            style={{
              marginTop: '8px',
              fontSize: '14px',
              color: 'var(--gray-500)'
            }}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
