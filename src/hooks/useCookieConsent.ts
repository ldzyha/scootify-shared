'use client';

import { useState, useEffect } from 'react';

/**
 * Cookie consent management hook
 * 
 * Manages cookie consent state with localStorage persistence and custom event dispatch.
 * SSR-safe with initial null state until client-side hydration completes.
 * 
 * @param storageKey - localStorage key for storing consent (default: 'cookie-consent')
 * @returns Consent state and control methods
 * 
 * @example
 * ```tsx
 * const { hasConsent, acceptConsent, declineConsent } = useCookieConsent('my-app-consent');
 * 
 * if (hasConsent === null) return <Spinner />; // Loading
 * if (hasConsent === false) return <CookieBanner onAccept={acceptConsent} />;
 * return <App />; // User has consented
 * ```
 */
export function useCookieConsent(storageKey = 'cookie-consent'): {
  hasConsent: boolean | null;
  acceptConsent: () => void;
  declineConsent: () => void;
  resetConsent: () => void;
} {
  // null = not yet loaded (SSR-safe)
  const [hasConsent, setHasConsent] = useState<boolean | null>(null);

  // Check localStorage on mount (client-side only)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const stored = localStorage.getItem(storageKey);
    setHasConsent(stored === 'true');
  }, [storageKey]);

  /**
   * Accept consent and dispatch custom event for analytics
   */
  const acceptConsent = () => {
    if (typeof window === 'undefined') return;

    localStorage.setItem(storageKey, 'true');
    setHasConsent(true);

    // Dispatch event for analytics tracking
    window.dispatchEvent(new CustomEvent('cookie-consent:accepted', {
      detail: { storageKey }
    }));
  };

  /**
   * Decline consent
   */
  const declineConsent = () => {
    if (typeof window === 'undefined') return;

    localStorage.setItem(storageKey, 'false');
    setHasConsent(false);
  };

  /**
   * Reset consent (remove from localStorage)
   */
  const resetConsent = () => {
    if (typeof window === 'undefined') return;

    localStorage.removeItem(storageKey);
    setHasConsent(null);
  };

  return {
    hasConsent,
    acceptConsent,
    declineConsent,
    resetConsent,
  };
}
