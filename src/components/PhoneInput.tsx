'use client';

import React, { useState, useEffect, useCallback, useId } from 'react';
import { Icon } from './Icon';
import { MetallicButton } from './MetallicButton';
import {
  isValidPhone,
  formatPhone,
  normalizePhone,
} from '@scootify/shared/lib/validation';
import { API_ENDPOINTS } from '@/lib/api-config';
import styles from './PhoneInput.module.css';

const CALLBACK_SESSION_KEY = 'hiley_callback_requested';

/**
 * PhoneInput component for Ukrainian phone number input with validation
 * 
 * @component
 * @description
 * A specialized phone input component that provides:
 * - Ukrainian phone number formatting (+38 (0XX) XXX-XX-XX)
 * - Real-time validation with visual feedback
 * - Optional callback request functionality
 * - Error state handling
 * - Accessibility features (ARIA labels, autocomplete)
 * 
 * @example
 * ```tsx
 * <PhoneInput
 *   value={phone}
 *   onChange={setPhone}
 *   label="Телефон"
 *   error={errors.phone}
 *   required
 *   showCallbackButton={true}
 *   context="contact-form"
 * />
 * ```
 */
export interface PhoneInputProps {
  /** Current phone value */
  value: string;
  /** Change handler */
  onChange: (value: string) => void;
  /** Input name attribute */
  name?: string;
  /** Label text */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Error message to display */
  error?: string;
  /** Whether field is required */
  required?: boolean;
  /** Whether field is disabled */
  disabled?: boolean;
  /** Show callback button when valid */
  showCallbackButton?: boolean;
  /** Page/context where input is used (for analytics) */
  context?: string;
  /** Callback when callback request is submitted */
  onCallbackRequested?: () => void;
  /** Additional className */
  className?: string;
}

/**
 * PhoneInput component
 * 
 * Provides a specialized input for Ukrainian phone numbers with:
 * - Auto-formatting on blur
 * - Real-time validation
 * - Optional callback request button
 * - Visual feedback (icons, colors, animations)
 * - Session-based callback request tracking
 * 
 * @param {PhoneInputProps} props - Component props
 * @returns {JSX.Element} Rendered phone input component
 */
export function PhoneInput({
  value,
  onChange,
  name = 'phone',
  label,
  placeholder = '+38 (0XX) XXX-XX-XX',
  error,
  required = false,
  disabled = false,
  showCallbackButton = true,
  context = 'unknown',
  onCallbackRequested,
  className,
}: PhoneInputProps) {
  const inputId = useId();
  const [isFocused, setIsFocused] = useState(false);
  const [callbackRequested, setCallbackRequested] = useState(false);
  const [callbackLoading, setCallbackLoading] = useState(false);
  const [callbackSuccess, setCallbackSuccess] = useState(false);
  const [callbackError, setCallbackError] = useState<string | null>(null);

  // Check session storage for existing callback request
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const requested = sessionStorage.getItem(CALLBACK_SESSION_KEY);
      if (requested === 'true') {
        setCallbackRequested(true);
      }
    }
  }, []);

  const isValid = isValidPhone(value);
  const showCallback =
    showCallbackButton && isValid && !callbackRequested && !callbackSuccess;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = e.target.value;

      // Allow only digits, +, spaces, parentheses, and dashes
      newValue = newValue.replace(/[^\d+\s()-]/g, '');

      onChange(newValue);
    },
    [onChange]
  );

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    // Format on blur if valid
    if (isValidPhone(value)) {
      onChange(formatPhone(value));
    }
  }, [value, onChange]);

  const handleCallbackRequest = useCallback(async () => {
    if (!isValid || callbackLoading) return;

    setCallbackLoading(true);
    setCallbackError(null);

    try {
      const response = await fetch(API_ENDPOINTS.callback, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: normalizePhone(value),
          context,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Помилка відправки');
      }

      // Mark as requested in session storage
      if (typeof window !== 'undefined') {
        sessionStorage.setItem(CALLBACK_SESSION_KEY, 'true');
      }

      setCallbackSuccess(true);
      setCallbackRequested(true);
      onCallbackRequested?.();
    } catch (err) {
      setCallbackError(
        err instanceof Error ? err.message : 'Помилка відправки'
      );
    } finally {
      setCallbackLoading(false);
    }
  }, [isValid, callbackLoading, value, context, onCallbackRequested]);

  return (
    <div className={`${styles.wrapper} ${className || ''}`}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}

      <div className={styles.inputRow}>
        <div
          className={`${styles.inputWrapper} ${isFocused ? styles.focused : ''} ${error ? styles.error : ''} ${isValid && !error ? styles.valid : ''}`}
        >
          <Icon
            name="phone"
            size="sm"
            className={styles.icon}
            color={isValid && !error ? 'var(--success)' : 'var(--foreground-muted)'}
          />
          <input
            id={inputId}
            type="tel"
            name={name}
            value={value}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={handleBlur}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            autoComplete="tel"
            className={styles.input}
          />
          {isValid && !error && (
            <Icon name="check" size="sm" className={styles.checkIcon} color="var(--success)" />
          )}
        </div>

        {showCallback && (
          <MetallicButton
            variant="blue"
            size="sm"
            onClick={handleCallbackRequest}
            disabled={callbackLoading}
            className={styles.callbackButton}
            type="button"
          >
            {callbackLoading ? (
              <span className={styles.loading}>...</span>
            ) : (
              <>
                <Icon name="phone" size="xs" />
                <span>Передзвоніть мені</span>
              </>
            )}
          </MetallicButton>
        )}

        {callbackSuccess && (
          <div className={styles.successMessage}>
            <Icon name="check" size="sm" color="var(--success)" />
            <span>Ми зателефонуємо вам</span>
          </div>
        )}
      </div>

      {error && <p className={styles.errorText}>{error}</p>}
      {callbackError && <p className={styles.errorText}>{callbackError}</p>}
    </div>
  );
}

export default PhoneInput;
