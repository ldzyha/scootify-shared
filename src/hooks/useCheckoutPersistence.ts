'use client';

import { useState, useEffect, useCallback } from 'react';
import type { CheckoutFormData } from '@scootify/shared/types/checkout';

const CHECKOUT_VERSION = 1;

interface StoredCheckoutData {
  data: CheckoutFormData;
  lastUpdated: number;
  version: number;
}

/**
 * Options for configuring checkout data persistence behavior
 */
export interface UseCheckoutPersistenceOptions {
  /**
   * The localStorage key to use for storing checkout data
   * @default 'checkout-data'
   */
  storageKey?: string;
  
  /**
   * Number of days before stored data expires and is automatically cleared
   * @default 7
   */
  expiryDays?: number;
}

/**
 * Return type for the useCheckoutPersistence hook
 */
export interface UseCheckoutPersistenceResult {
  /**
   * The saved checkout data loaded from localStorage, or null if none exists
   */
  savedData: CheckoutFormData | null;
  
  /**
   * Whether the data has been loaded from localStorage (false during initial mount)
   */
  isLoaded: boolean;
  
  /**
   * Save checkout data to localStorage with current timestamp
   * @param data - The checkout form data to persist
   */
  saveCheckoutData: (data: CheckoutFormData) => void;
  
  /**
   * Clear all saved checkout data from localStorage (typically called after successful order)
   */
  clearCheckoutData: () => void;
}

/**
 * Hook for persisting checkout form data to localStorage with automatic expiry.
 * 
 * This hook provides automatic persistence of checkout form data, allowing users
 * to resume their checkout process if they navigate away or close the browser.
 * Data is automatically cleared after a configurable expiry period.
 * 
 * @param options - Configuration options for storage key and expiry
 * @returns Object containing saved data, loading state, and persistence methods
 * 
 * @example
 * ```tsx
 * const { savedData, isLoaded, saveCheckoutData, clearCheckoutData } = useCheckoutPersistence({
 *   storageKey: 'my-checkout',
 *   expiryDays: 14
 * });
 * 
 * // Load saved data into form
 * useEffect(() => {
 *   if (isLoaded && savedData) {
 *     form.reset(savedData);
 *   }
 * }, [isLoaded, savedData]);
 * 
 * // Save on form change
 * const handleFormChange = (data: CheckoutFormData) => {
 *   saveCheckoutData(data);
 * };
 * 
 * // Clear after order success
 * const handleOrderSuccess = () => {
 *   clearCheckoutData();
 * };
 * ```
 */
export function useCheckoutPersistence(
  options: UseCheckoutPersistenceOptions = {}
): UseCheckoutPersistenceResult {
  const { storageKey = 'checkout-data', expiryDays = 7 } = options;
  
  const [savedData, setSavedData] = useState<CheckoutFormData | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored) as StoredCheckoutData;

        // Version check
        if (parsed.version === CHECKOUT_VERSION) {
          // Check if data is not expired
          const expiryMs = expiryDays * 24 * 60 * 60 * 1000;
          if (Date.now() - parsed.lastUpdated < expiryMs) {
            setSavedData(parsed.data);
          } else {
            // Data is expired, clear it
            localStorage.removeItem(storageKey);
          }
        } else {
          // Version mismatch, clear old data
          localStorage.removeItem(storageKey);
        }
      }
    } catch (e) {
      console.error('Failed to load checkout data from localStorage:', e);
    }
    setIsLoaded(true);
  }, [storageKey, expiryDays]);

  // Save checkout data
  const saveCheckoutData = useCallback(
    (data: CheckoutFormData) => {
      try {
        const storedData: StoredCheckoutData = {
          data,
          lastUpdated: Date.now(),
          version: CHECKOUT_VERSION,
        };
        localStorage.setItem(storageKey, JSON.stringify(storedData));
        setSavedData(data);
      } catch (e) {
        console.error('Failed to save checkout data to localStorage:', e);
      }
    },
    [storageKey]
  );

  // Clear checkout data (after successful order)
  const clearCheckoutData = useCallback(() => {
    try {
      localStorage.removeItem(storageKey);
      setSavedData(null);
    } catch (e) {
      console.error('Failed to clear checkout data from localStorage:', e);
    }
  }, [storageKey]);

  return {
    savedData,
    isLoaded,
    saveCheckoutData,
    clearCheckoutData,
  };
}

/**
 * Default export for convenience
 */
export default useCheckoutPersistence;
