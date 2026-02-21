'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Icon } from './Icon';
import styles from './FloatingContactButton.module.css';

/**
 * Contact channel configuration
 */
export interface ContactChannel {
  /** Channel type (telegram, phone, viber, whatsapp, etc.) */
  type: string;
  /** URL or tel: link */
  href: string;
  /** Display label */
  label: string;
}

/**
 * Props for FloatingContactButton component
 */
export interface FloatingContactButtonProps {
  /** Display mode: 'menu' (expandable menu) or 'dialog' (opens a dialog) */
  mode?: 'menu' | 'dialog';
  /** Contact channels to display (menu mode only) */
  contactChannels?: ContactChannel[];
  /** Callback when dialog should open (dialog mode only) */
  onDialogOpen?: () => void;
  /** ARIA label for the button */
  ariaLabel?: string;
  /** Custom class name for the container */
  className?: string;
}

const MENU_ID = 'contact-menu';

/**
 * Floating contact button with two modes:
 * - 'menu' (default): Expandable menu with contact links
 * - 'dialog': Triggers a dialog/modal via onDialogOpen callback
 * 
 * @example
 * // Menu mode (default)
 * <FloatingContactButton
 *   contactChannels={[
 *     { type: 'telegram', href: 'https://t.me/username', label: 'Telegram' },
 *     { type: 'phone', href: 'tel:+380123456789', label: 'Зателефонувати' }
 *   ]}
 * />
 * 
 * @example
 * // Dialog mode
 * <FloatingContactButton
 *   mode="dialog"
 *   onDialogOpen={() => dialogRef.current?.open()}
 * />
 */
export function FloatingContactButton({
  mode = 'menu',
  contactChannels = [],
  onDialogOpen,
  ariaLabel = 'Контакти',
  className,
}: FloatingContactButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setIsOpen(false), []);

  // Handle keyboard and click-outside events for menu mode
  useEffect(() => {
    if (mode !== 'menu' || !isOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        close();
      }
    };

    document.addEventListener('keydown', handleKey);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, close, mode]);

  const handleClick = () => {
    if (mode === 'dialog') {
      onDialogOpen?.();
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className={`${styles.container} ${className || ''}`} ref={containerRef}>
      {mode === 'menu' && isOpen && (
        <div className={styles.menu} id={MENU_ID} role="menu" aria-label="Способи зв'язку">
          {contactChannels.map((channel, index) => (
            <a
              key={index}
              href={channel.href}
              target={channel.href.startsWith('http') ? '_blank' : undefined}
              rel={channel.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={styles.menuItem}
              role="menuitem"
            >
              <Icon name={channel.type as any} size="sm" />
              <span>{channel.label}</span>
            </a>
          ))}
        </div>
      )}
      <button
        className={styles.button}
        onClick={handleClick}
        aria-label={ariaLabel}
        aria-expanded={mode === 'menu' ? isOpen : undefined}
        aria-controls={mode === 'menu' ? MENU_ID : undefined}
      >
        <Icon name={isOpen && mode === 'menu' ? 'close' : 'phone'} size="md" />
      </button>
    </div>
  );
}

export default FloatingContactButton;
