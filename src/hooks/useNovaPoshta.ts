'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import type {
  NovaPoshtaCity,
  NovaPoshtaWarehouse,
  NovaPoshtaStreet,
  NovaPoshtaDeliveryPrice,
} from '@scootify/shared/types/nova-poshta';
import {
  searchCities,
  getWarehouses,
  searchStreets,
  getDeliveryPrice,
  createWaybill,
  type CreateWaybillParams,
  type CreateWaybillResult,
} from '@scootify/shared/lib/nova-poshta';

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * Configuration options for Nova Poshta hooks
 */
export interface NovaPoshtaHookConfig {
  /** Nova Poshta API key */
  apiKey: string;
  /** Optional proxy URL for API requests (e.g., Firebase Function endpoint) */
  proxyUrl?: string;
}

/**
 * Result interface for useNovaPoshtaCities hook
 */
export interface UseNovaPoshtaCitiesResult {
  /** Array of cities matching the search query */
  cities: NovaPoshtaCity[];
  /** Loading state indicator */
  isLoading: boolean;
  /** Error message if request failed */
  error: string | null;
  /** Function to trigger city search with debouncing */
  search: (query: string) => void;
}

/**
 * Result interface for useNovaPoshtaWarehouses hook
 */
export interface UseNovaPoshtaWarehousesResult {
  /** Array of warehouses in the selected city */
  warehouses: NovaPoshtaWarehouse[];
  /** Loading state indicator */
  isLoading: boolean;
  /** Error message if request failed */
  error: string | null;
  /** Function to manually refresh warehouse list */
  refetch: () => void;
}

/**
 * Result interface for useNovaPoshtaStreets hook
 */
export interface UseNovaPoshtaStreetsResult {
  /** Array of streets matching the search query */
  streets: NovaPoshtaStreet[];
  /** Loading state indicator */
  isLoading: boolean;
  /** Error message if request failed */
  error: string | null;
  /** Function to trigger street search with debouncing */
  search: (query: string) => void;
}

/**
 * Result interface for useNovaPoshtaDeliveryPrice hook
 */
export interface UseNovaPoshtaDeliveryPriceResult {
  /** Calculated delivery price details */
  price: NovaPoshtaDeliveryPrice | null;
  /** Loading state indicator */
  isLoading: boolean;
  /** Error message if request failed */
  error: string | null;
  /** Function to manually recalculate delivery price */
  refetch: () => void;
}

/**
 * Result interface for useCreateWaybill hook
 */
export interface UseCreateWaybillResult {
  /** Created waybill details (null until creation) */
  waybill: CreateWaybillResult | null;
  /** Loading state indicator */
  isLoading: boolean;
  /** Error message if creation failed */
  error: string | null;
  /** Function to create a new waybill */
  create: (params: CreateWaybillParams) => Promise<CreateWaybillResult | null>;
  /** Function to reset waybill state */
  reset: () => void;
}

// ============================================================================
// Cache Management
// ============================================================================

/**
 * In-memory cache for API responses to reduce redundant requests
 */
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const cityCache = new Map<string, CacheEntry<NovaPoshtaCity[]>>();
const warehouseCache = new Map<string, CacheEntry<NovaPoshtaWarehouse[]>>();
const streetCache = new Map<string, CacheEntry<NovaPoshtaStreet[]>>();
const priceCache = new Map<string, CacheEntry<NovaPoshtaDeliveryPrice>>();

/**
 * Default cache TTL (5 minutes)
 */
const DEFAULT_CACHE_TTL = 5 * 60 * 1000;

/**
 * Check if cached data is still valid
 */
function isCacheValid(timestamp: number, ttl: number = DEFAULT_CACHE_TTL): boolean {
  return Date.now() - timestamp < ttl;
}

/**
 * Generate cache key for city searches
 */
function getCityCacheKey(query: string): string {
  return `city:${query.toLowerCase().trim()}`;
}

/**
 * Generate cache key for warehouse searches
 */
function getWarehouseCacheKey(cityRef: string, searchQuery?: string, minWeight?: number): string {
  return `warehouse:${cityRef}:${searchQuery || ''}:${minWeight || 0}`;
}

/**
 * Generate cache key for street searches
 */
function getStreetCacheKey(cityRef: string, query: string): string {
  return `street:${cityRef}:${query.toLowerCase().trim()}`;
}

/**
 * Generate cache key for delivery price calculations
 */
function getPriceCacheKey(
  senderCityRef: string,
  recipientCityRef: string,
  weight: number,
  declaredValue: number,
  serviceType: string,
  boxes: number
): string {
  return `price:${senderCityRef}:${recipientCityRef}:${weight}:${declaredValue}:${serviceType}:${boxes}`;
}

// ============================================================================
// Hooks
// ============================================================================

/**
 * Hook for searching Nova Poshta cities with debounce and caching
 * 
 * Features:
 * - Automatic debouncing to prevent excessive API calls
 * - Request cancellation for outdated searches
 * - In-memory caching of search results
 * - Minimum query length validation (2 characters)
 * 
 * @param config - Hook configuration (API key, proxy URL)
 * @param debounceMs - Debounce delay in milliseconds (default: 300)
 * @returns City search state and search function
 * 
 * @example
 * ```tsx
 * const { cities, isLoading, error, search } = useNovaPoshtaCities({
 *   apiKey: 'your-api-key',
 *   proxyUrl: '/api/nova-poshta'
 * });
 * 
 * // Trigger search on user input
 * <input onChange={(e) => search(e.target.value)} />
 * ```
 */
export function useNovaPoshtaCities(
  config: NovaPoshtaHookConfig,
  debounceMs: number = 300
): UseNovaPoshtaCitiesResult {
  const [cities, setCities] = useState<NovaPoshtaCity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const search = useCallback(
    (query: string) => {
      // Clear previous timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Clear previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Clear results for empty or too short query
      if (!query.trim() || query.length < 2) {
        setCities([]);
        setIsLoading(false);
        setError(null);
        return;
      }

      setIsLoading(true);
      setError(null);

      // Check cache first
      const cacheKey = getCityCacheKey(query);
      const cached = cityCache.get(cacheKey);
      if (cached && isCacheValid(cached.timestamp)) {
        setCities(cached.data);
        setIsLoading(false);
        return;
      }

      // Debounce the API call
      timeoutRef.current = setTimeout(async () => {
        const controller = new AbortController();
        abortControllerRef.current = controller;

        try {
          const result = await searchCities(
            config.apiKey,
            query,
            20,
            config.proxyUrl
          );

          // Check if request was cancelled
          if (controller.signal.aborted) {
            return;
          }

          setCities(result);
          // Cache successful results
          cityCache.set(cacheKey, { data: result, timestamp: Date.now() });
        } catch (err) {
          if (!controller.signal.aborted) {
            setError('Помилка завантаження міст');
            console.error('Nova Poshta cities error:', err);
          }
        } finally {
          if (!controller.signal.aborted) {
            setIsLoading(false);
          }
        }
      }, debounceMs);
    },
    [config.apiKey, config.proxyUrl, debounceMs]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return { cities, isLoading, error, search };
}

/**
 * Hook for fetching Nova Poshta warehouses by city with caching
 * 
 * Features:
 * - Automatic fetching when city changes
 * - Request cancellation when city changes
 * - In-memory caching of warehouse lists
 * - Optional weight filtering
 * - Manual refetch capability
 * 
 * @param config - Hook configuration (API key, proxy URL)
 * @param cityRef - City reference ID from searchCities (null to clear)
 * @param searchQuery - Optional search term to filter warehouses
 * @param minWeight - Minimum weight capacity in kg (filters incompatible warehouses)
 * @returns Warehouse list state and refetch function
 * 
 * @example
 * ```tsx
 * const { warehouses, isLoading, error, refetch } = useNovaPoshtaWarehouses(
 *   { apiKey: 'your-api-key', proxyUrl: '/api/nova-poshta' },
 *   selectedCity?.ref,
 *   undefined,
 *   30 // Only warehouses that can handle 30kg+
 * );
 * ```
 */
export function useNovaPoshtaWarehouses(
  config: NovaPoshtaHookConfig,
  cityRef: string | null,
  searchQuery?: string,
  minWeight?: number
): UseNovaPoshtaWarehousesResult {
  const [warehouses, setWarehouses] = useState<NovaPoshtaWarehouse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetchTrigger, setFetchTrigger] = useState(0);
  const abortControllerRef = useRef<AbortController | null>(null);

  const refetch = useCallback(() => {
    setFetchTrigger((prev) => prev + 1);
  }, []);

  useEffect(() => {
    // Clear previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Clear results if no city
    if (!cityRef) {
      setWarehouses([]);
      setIsLoading(false);
      setError(null);
      return;
    }

    const fetchWarehouses = async () => {
      const controller = new AbortController();
      abortControllerRef.current = controller;

      setIsLoading(true);
      setError(null);

      // Check cache first
      const cacheKey = getWarehouseCacheKey(cityRef, searchQuery, minWeight);
      const cached = warehouseCache.get(cacheKey);
      if (cached && isCacheValid(cached.timestamp)) {
        setWarehouses(cached.data);
        setIsLoading(false);
        return;
      }

      try {
        const result = await getWarehouses(
          config.apiKey,
          cityRef,
          searchQuery,
          minWeight,
          config.proxyUrl
        );

        // Check if request was cancelled
        if (controller.signal.aborted) {
          return;
        }

        setWarehouses(result);
        // Cache successful results
        warehouseCache.set(cacheKey, { data: result, timestamp: Date.now() });
      } catch (err) {
        if (!controller.signal.aborted) {
          setError('Помилка завантаження відділень');
          console.error('Nova Poshta warehouses error:', err);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchWarehouses();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [config.apiKey, config.proxyUrl, cityRef, searchQuery, minWeight, fetchTrigger]);

  return { warehouses, isLoading, error, refetch };
}

/**
 * Hook for searching Nova Poshta streets by city with debounce and caching
 * 
 * Features:
 * - Automatic debouncing to prevent excessive API calls
 * - Request cancellation for outdated searches
 * - In-memory caching of street search results
 * - Automatic clearing when city changes
 * - Minimum query length validation (2 characters)
 * 
 * @param config - Hook configuration (API key, proxy URL)
 * @param cityRef - City reference ID from searchCities (null to disable)
 * @param debounceMs - Debounce delay in milliseconds (default: 300)
 * @returns Street search state and search function
 * 
 * @example
 * ```tsx
 * const { streets, isLoading, error, search } = useNovaPoshtaStreets(
 *   { apiKey: 'your-api-key', proxyUrl: '/api/nova-poshta' },
 *   selectedCity?.ref
 * );
 * 
 * // Trigger search on user input
 * <input onChange={(e) => search(e.target.value)} />
 * ```
 */
export function useNovaPoshtaStreets(
  config: NovaPoshtaHookConfig,
  cityRef: string | null,
  debounceMs: number = 300
): UseNovaPoshtaStreetsResult {
  const [streets, setStreets] = useState<NovaPoshtaStreet[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const search = useCallback(
    (query: string) => {
      // Clear previous timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Clear previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Clear results for empty query, too short query, or no city
      if (!cityRef || !query.trim() || query.length < 2) {
        setStreets([]);
        setIsLoading(false);
        setError(null);
        return;
      }

      setIsLoading(true);
      setError(null);

      // Check cache first
      const cacheKey = getStreetCacheKey(cityRef, query);
      const cached = streetCache.get(cacheKey);
      if (cached && isCacheValid(cached.timestamp)) {
        setStreets(cached.data);
        setIsLoading(false);
        return;
      }

      // Debounce the API call
      timeoutRef.current = setTimeout(async () => {
        const controller = new AbortController();
        abortControllerRef.current = controller;

        try {
          const result = await searchStreets(
            config.apiKey,
            cityRef,
            query,
            20,
            config.proxyUrl
          );

          // Check if request was cancelled
          if (controller.signal.aborted) {
            return;
          }

          setStreets(result);
          // Cache successful results
          streetCache.set(cacheKey, { data: result, timestamp: Date.now() });
        } catch (err) {
          if (!controller.signal.aborted) {
            setError('Помилка завантаження вулиць');
            console.error('Nova Poshta streets error:', err);
          }
        } finally {
          if (!controller.signal.aborted) {
            setIsLoading(false);
          }
        }
      }, debounceMs);
    },
    [config.apiKey, config.proxyUrl, cityRef, debounceMs]
  );

  // Clear streets when city changes
  useEffect(() => {
    setStreets([]);
    setError(null);
  }, [cityRef]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return { streets, isLoading, error, search };
}

/**
 * Hook for calculating Nova Poshta delivery price with caching
 * 
 * Features:
 * - Automatic calculation when parameters change
 * - Request cancellation when parameters change
 * - In-memory caching of price calculations
 * - Manual recalculation capability
 * - Validates required parameters
 * 
 * @param config - Hook configuration (API key, proxy URL)
 * @param senderCityRef - Sender's city reference ID (null to skip calculation)
 * @param recipientCityRef - Recipient's city reference ID (null to skip calculation)
 * @param serviceType - Service type: 'WarehouseWarehouse' or 'WarehouseDoors'
 * @param weightKg - Parcel weight in kilograms (default: 5)
 * @param declaredValueUah - Declared value in UAH for insurance (default: 5000)
 * @param boxes - Number of parcels (default: 1)
 * @returns Delivery price state and refetch function
 * 
 * @example
 * ```tsx
 * const { price, isLoading, error, refetch } = useNovaPoshtaDeliveryPrice(
 *   { apiKey: 'your-api-key', proxyUrl: '/api/nova-poshta' },
 *   senderCity?.ref,
 *   recipientCity?.ref,
 *   'WarehouseWarehouse',
 *   15.5,
 *   20000,
 *   1
 * );
 * 
 * // Display price
 * {price && <span>Delivery: {price.cost} UAH</span>}
 * ```
 */
export function useNovaPoshtaDeliveryPrice(
  config: NovaPoshtaHookConfig,
  senderCityRef: string | null,
  recipientCityRef: string | null,
  serviceType: 'WarehouseWarehouse' | 'WarehouseDoors' = 'WarehouseWarehouse',
  weightKg: number = 5,
  declaredValueUah: number = 5000,
  boxes: number = 1
): UseNovaPoshtaDeliveryPriceResult {
  const [price, setPrice] = useState<NovaPoshtaDeliveryPrice | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetchTrigger, setFetchTrigger] = useState(0);
  const abortControllerRef = useRef<AbortController | null>(null);

  const refetch = useCallback(() => {
    setFetchTrigger((prev) => prev + 1);
  }, []);

  useEffect(() => {
    // Clear previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Clear results if missing required parameters
    if (!senderCityRef || !recipientCityRef || weightKg <= 0) {
      setPrice(null);
      setIsLoading(false);
      setError(null);
      return;
    }

    const fetchPrice = async () => {
      const controller = new AbortController();
      abortControllerRef.current = controller;

      setIsLoading(true);
      setError(null);

      // Check cache first
      const cacheKey = getPriceCacheKey(
        senderCityRef,
        recipientCityRef,
        weightKg,
        declaredValueUah,
        serviceType,
        boxes
      );
      const cached = priceCache.get(cacheKey);
      if (cached && isCacheValid(cached.timestamp)) {
        setPrice(cached.data);
        setIsLoading(false);
        return;
      }

      try {
        const result = await getDeliveryPrice(
          config.apiKey,
          senderCityRef,
          recipientCityRef,
          weightKg,
          declaredValueUah,
          serviceType,
          boxes,
          config.proxyUrl
        );

        // Check if request was cancelled
        if (controller.signal.aborted) {
          return;
        }

        setPrice(result);
        // Cache successful results
        if (result) {
          priceCache.set(cacheKey, { data: result, timestamp: Date.now() });
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setError('Помилка розрахунку вартості');
          console.error('Nova Poshta delivery price error:', err);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchPrice();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [
    config.apiKey,
    config.proxyUrl,
    senderCityRef,
    recipientCityRef,
    serviceType,
    weightKg,
    declaredValueUah,
    boxes,
    fetchTrigger,
  ]);

  return { price, isLoading, error, refetch };
}

/**
 * Hook for creating Nova Poshta waybills (Internet Documents)
 * 
 * Features:
 * - Manual waybill creation via create() function
 * - Loading state management
 * - Error handling with detailed messages
 * - Reset capability to clear state
 * - Does NOT cache (each waybill creation is unique)
 * 
 * @param config - Hook configuration (API key, proxy URL)
 * @returns Waybill creation state and control functions
 * 
 * @example
 * ```tsx
 * const { waybill, isLoading, error, create, reset } = useCreateWaybill({
 *   apiKey: 'your-api-key',
 *   proxyUrl: '/api/nova-poshta'
 * });
 * 
 * // Create waybill on form submission
 * const handleSubmit = async () => {
 *   const result = await create({
 *     senderContactPersonRef: '...',
 *     senderPhone: '+380501234567',
 *     senderCityRef: '...',
 *     senderWarehouseRef: '...',
 *     recipientName: 'Іван Петренко',
 *     recipientPhone: '+380671234567',
 *     recipientCityRef: '...',
 *     recipientWarehouseRef: '...',
 *     serviceType: 'WarehouseWarehouse',
 *     paymentMethod: 'Cash',
 *     payerType: 'Recipient',
 *     cargoDescription: 'Електросамокат',
 *     weightKg: 15.5,
 *     boxes: 1,
 *     declaredValue: 15000,
 *   });
 * 
 *   if (result) {
 *     console.log('Tracking number:', result.trackingNumber);
 *   }
 * };
 * 
 * // Reset after successful submission
 * <button onClick={reset}>Create Another</button>
 * ```
 */
export function useCreateWaybill(
  config: NovaPoshtaHookConfig
): UseCreateWaybillResult {
  const [waybill, setWaybill] = useState<CreateWaybillResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(
    async (params: CreateWaybillParams): Promise<CreateWaybillResult | null> => {
      setIsLoading(true);
      setError(null);
      setWaybill(null);

      try {
        const result = await createWaybill(
          config.apiKey,
          params,
          config.proxyUrl
        );

        if (result) {
          setWaybill(result);
          return result;
        } else {
          setError('Помилка створення накладної');
          return null;
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Помилка створення накладної';
        setError(errorMessage);
        console.error('Nova Poshta waybill creation error:', err);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [config.apiKey, config.proxyUrl]
  );

  const reset = useCallback(() => {
    setWaybill(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return { waybill, isLoading, error, create, reset };
}
