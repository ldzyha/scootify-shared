'use client';

import React, { useEffect, useState } from 'react';
import { Icon } from './Icon';
import styles from './Toast.module.css';

/**
 * Toast notification component with auto-dismiss and multiple variants.
 * 
 * @example
 * ```tsx
 * <Toast
 *   isVisible={showToast}
 *   message="Operation successful!"
 *   variant="success"
 *   duration={5000}
 *   onHide={() => setShowToast(false)}
 * />
 * ```
 */

export interface ToastProps {
  /** Whether the toast is visible */
  isVisible: boolean;
  /** Toast message */
  message: string;
  /** Optional action button label */
  actionLabel?: string;
  /** Optional action button onClick */
  onAction?: () => void;
  /** Auto-hide duration in ms (0 = no auto-hide) */
  duration?: number;
  /** Callback when toast should be hidden */
  onHide?: () => void;
  /** Toast variant */
  variant?: 'success' | 'info' | 'warning' | 'error';
  /** Position relative to trigger */
  position?: 'below' | 'above';
  /** Additional className */
  className?: string;
  /** Custom action button element */
  actionElement?: React.ReactNode;
}

/**
 * Toast notification system with auto-dismiss functionality.
 * 
 * Features:
 * - Multiple variants (success, info, warning, error)
 * - Auto-dismiss with configurable duration
 * - Optional action button
 * - Smooth entrance/exit animations
 * - Accessible with ARIA labels
 * - Configurable colors via CSS variables
 */
export function Toast({
  isVisible,
  message,
  actionLabel,
  onAction,
  duration = 5000,
  onHide,
  variant = 'success',
  position = 'below',
  className,
  actionElement,
}: ToastProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      // Trigger animation after mount
      requestAnimationFrame(() => {
        setIsAnimating(true);
      });

      // Auto-hide
      if (duration > 0) {
        const timer = setTimeout(() => {
          handleHide();
        }, duration);
        return () => clearTimeout(timer);
      }
    }
  }, [isVisible, duration]);

  const handleHide = () => {
    setIsAnimating(false);
    // Wait for exit animation
    setTimeout(() => {
      setShouldRender(false);
      onHide?.();
    }, 350);
  };

  if (!shouldRender) return null;

  const iconMap = {
    success: 'check',
    info: 'info',
    warning: 'warning',
    error: 'error',
  } as const;

  const colorMap = {
    success: 'var(--toast-success, var(--success, #10b981))',
    info: 'var(--toast-info, var(--primary, #3b82f6))',
    warning: 'var(--toast-warning, var(--warning, #f59e0b))',
    error: 'var(--toast-error, var(--error, #ef4444))',
  };

  return (
    <div
      className={`${styles.toast} ${styles[position]} ${isAnimating ? styles.visible : ''} ${className || ''}`}
      role="alert"
      aria-live="polite"
    >
      <div className={styles.content}>
        <Icon
          name={iconMap[variant]}
          size="sm"
          color={colorMap[variant]}
          className={styles.icon}
        />
        <span className={styles.message}>{message}</span>
      </div>

      {(actionElement || (actionLabel && onAction)) && (
        <div className={styles.action}>
          {actionElement || (
            <button onClick={onAction} className={styles.actionButton}>
              {actionLabel}
            </button>
          )}
        </div>
      )}

      <button
        className={styles.closeButton}
        onClick={handleHide}
        aria-label="Close"
      >
        <Icon name="close" size="xs" />
      </button>
    </div>
  );
}

export default Toast;
