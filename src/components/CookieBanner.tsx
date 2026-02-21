'use client';

import { useEffect, useState } from 'react';
import { useCookieConsent } from '../hooks/useCookieConsent';
import { Icon } from './Icon';
import { MetallicButton } from './MetallicButton';
import styles from './CookieBanner.module.css';

// ============================================
// Types
// ============================================

/**
 * Props for the CookieBanner component.
 */
export interface CookieBannerProps {
  /**
   * localStorage key for storing consent state.
   * @default 'cookie-consent'
   */
  storageKey?: string;

  /**
   * URL to the cookies policy page.
   * Banner will not render on this page.
   * @default '/cookies'
   */
  cookiesPageHref?: string;

  /**
   * Callback fired when user accepts cookies.
   * Called after consent is saved to localStorage.
   */
  onAccept?: () => void;

  /**
   * Title text for the banner.
   * @default 'We use cookies'
   */
  title?: string;

  /**
   * Description text for the banner.
   * Should include reference to cookies policy link.
   * @default 'We use cookies to improve your experience. By continuing, you agree to our cookie policy.'
   */
  description?: string;

  /**
   * Text for the cookies policy link within description.
   * @default 'cookie policy'
   */
  linkText?: string;

  /**
   * Text for the accept button.
   * @default 'Got it'
   */
  acceptButtonText?: string;

  /**
   * Delay in milliseconds before showing the banner.
   * @default 1000
   */
  showDelay?: number;

  /**
   * MetallicButton variant for the accept button.
   * @default 'blue'
   */
  buttonVariant?: 'blue' | 'gold' | 'silver' | 'red' | 'green';

  /**
   * Icon variant for the shield icon.
   * @default 'blue'
   */
  iconVariant?: 'blue' | 'gold' | 'silver' | 'red' | 'green';
}

// ============================================
// Cookie Banner Component
// ============================================

/**
 * CookieBanner - A reusable cookie consent banner component
 * 
 * Features:
 * - Uses localStorage to persist consent
 * - Dispatches custom event on acceptance for analytics integration
 * - Auto-hides on cookies policy page
 * - Configurable delay before showing
 * - Fully customizable text and styling
 * - SSR-safe with client-side hydration
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <CookieBanner />
 * 
 * // Custom configuration
 * <CookieBanner
 *   storageKey="my-app-consent"
 *   cookiesPageHref="/privacy/cookies"
 *   onAccept={() => console.log('Cookies accepted')}
 *   title="Cookie Notice"
 *   acceptButtonText="Accept"
 *   buttonVariant="gold"
 * />
 * ```
 */
export function CookieBanner({
  storageKey = 'cookie-consent',
  cookiesPageHref = '/cookies',
  onAccept,
  title = 'We use cookies',
  description = 'We use cookies to improve your experience. By continuing, you agree to our',
  linkText = 'cookie policy',
  acceptButtonText = 'Got it',
  showDelay = 1000,
  buttonVariant = 'blue',
  iconVariant = 'blue',
}: CookieBannerProps) {
  const { hasConsent, acceptConsent } = useCookieConsent(storageKey);
  const [isVisible, setIsVisible] = useState(false);
  const [currentPath, setCurrentPath] = useState<string>('');

  // Get current pathname (client-side only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  // Show banner with delay if consent not given
  useEffect(() => {
    // Don't show if already consented
    if (hasConsent === true) {
      return;
    }

    // Don't show on cookies policy page
    if (currentPath === cookiesPageHref) {
      return;
    }

    // Don't show until consent state is loaded
    if (hasConsent === null) {
      return;
    }

    // Show banner after delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, showDelay);

    return () => clearTimeout(timer);
  }, [hasConsent, currentPath, cookiesPageHref, showDelay]);

  // Handle accept button click
  const handleAccept = () => {
    acceptConsent();
    setIsVisible(false);
    onAccept?.();
  };

  // Don't render if consent already given or on cookies page
  if (!isVisible) {
    return null;
  }

  return (
    <div className={styles.banner}>
      <div className={styles.content}>
        <div className={styles.iconWrapper}>
          <Icon name="shieldCheck" size="lg" metallic={iconVariant} />
        </div>

        <div className={styles.text}>
          <h4 className={styles.title}>{title}</h4>
          <p className={styles.description}>
            {description}{' '}
            <a href={cookiesPageHref} className={styles.link}>
              {linkText}
            </a>
            .
          </p>
        </div>
      </div>

      <div className={styles.actions}>
        <MetallicButton
          variant={buttonVariant}
          size="sm"
          onClick={handleAccept}
        >
          {acceptButtonText}
        </MetallicButton>
      </div>
    </div>
  );
}

export default CookieBanner;
