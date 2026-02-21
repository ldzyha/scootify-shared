"use client";

import { useState, useEffect } from "react";

// Default fallback rate if none provided
const DEFAULT_FALLBACK_RATE = 43.5;

// Default cache key
const DEFAULT_CACHE_KEY = "exchange_rate";

// Cache duration: 1 hour
const CACHE_DURATION_MS = 60 * 60 * 1000;

interface CachedRate {
  rate: number;
  timestamp: number;
}

/**
 * React hook to fetch and cache exchange rate from a Cloud Function
 * 
 * @param options - Configuration options
 * @param options.functionUrl - URL of the Cloud Function to fetch exchange rate from
 * @param options.fallbackRate - Rate to use if fetch fails or no functionUrl provided (default: 43.5)
 * @param options.cacheKey - localStorage key for caching (default: "exchange_rate")
 * 
 * @returns Current exchange rate (UAH per 1 USD)
 * 
 * @example
 * ```tsx
 * // With Cloud Function
 * const rate = useExchangeRate({
 *   functionUrl: 'https://exchange-rate-xyz.run.app',
 *   fallbackRate: 42.0,
 * });
 * 
 * // Fallback only (no API call)
 * const rate = useExchangeRate({ fallbackRate: 43.5 });
 * ```
 */
export function useExchangeRate(options?: {
  functionUrl?: string;
  fallbackRate?: number;
  cacheKey?: string;
}): number {
  const {
    functionUrl,
    fallbackRate = DEFAULT_FALLBACK_RATE,
    cacheKey = DEFAULT_CACHE_KEY,
  } = options || {};

  const [rate, setRate] = useState<number>(() => {
    // Try to load from localStorage cache on initial render
    if (typeof window !== "undefined") {
      try {
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          const parsed: CachedRate = JSON.parse(cached);
          const isExpired = Date.now() - parsed.timestamp > CACHE_DURATION_MS;
          if (!isExpired) {
            return parsed.rate;
          }
        }
      } catch (error) {
        console.error("Failed to load cached exchange rate:", error);
      }
    }
    return fallbackRate;
  });

  useEffect(() => {
    // If no functionUrl provided, use fallback rate
    if (!functionUrl) {
      return;
    }

    const fetchRate = async () => {
      try {
        const response = await fetch(functionUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const newRate = data.rate || data.UAH || fallbackRate;

        setRate(newRate);

        // Cache the rate in localStorage
        if (typeof window !== "undefined") {
          try {
            const cacheData: CachedRate = {
              rate: newRate,
              timestamp: Date.now(),
            };
            localStorage.setItem(cacheKey, JSON.stringify(cacheData));
          } catch (error) {
            console.error("Failed to cache exchange rate:", error);
          }
        }
      } catch (error) {
        console.error("Failed to fetch exchange rate:", error);
        // Keep using cached rate or fallback
      }
    };

    fetchRate();
  }, [functionUrl, fallbackRate, cacheKey]);

  return rate;
}
