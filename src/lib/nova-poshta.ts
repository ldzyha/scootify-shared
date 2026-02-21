/**
 * Nova Poshta API client for @scootify/shared
 * 
 * This library provides a comprehensive interface to Nova Poshta's delivery service API,
 * including city/warehouse search, delivery cost calculation, and waybill creation.
 * 
 * Key features:
 * - Flexible proxy URL support (no hardcoded endpoints)
 * - Request caching to minimize API calls and avoid rate limits
 * - Request deduplication for concurrent identical requests
 * - Full TypeScript type safety
 * - Comprehensive error handling
 * 
 * API Documentation: https://developers.novaposhta.ua/documentation
 */

import type {
  NovaPoshtaCity,
  NovaPoshtaWarehouse,
  NovaPoshtaStreet,
  NovaPoshtaDeliveryPrice,
} from '@scootify/shared/types/nova-poshta';

// ============================================================================
// Constants
// ============================================================================

/**
 * Cache time-to-live in milliseconds
 * Warehouses change infrequently, so 5 minutes is reasonable
 */
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Default API endpoint (fallback)
 * Can be overridden via proxyUrl parameter in all functions
 */
const DEFAULT_API_URL = 'https://api.novaposhta.ua/v2.0/json/';

/**
 * Nova Poshta Postomat warehouse type ID
 * Postomats have limited weight capacity (~30kg max)
 */
const POSTOMAT_TYPE_ID = 'f9316480-5f2d-425d-bc2c-ac7cd29decf0';

/**
 * Cargo warehouse type ID
 * These warehouses handle heavy items
 */
const CARGO_WAREHOUSE_TYPE_ID = '9a68df70-0267-42a8-bb5c-37f427e36ee4';

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * Generic Nova Poshta API request structure
 */
interface NovaPoshtaRequest {
  apiKey: string;
  modelName: string;
  calledMethod: string;
  methodProperties: Record<string, unknown>;
}

/**
 * Generic Nova Poshta API response structure
 */
interface NovaPoshtaResponse<T> {
  success: boolean;
  data: T[];
  errors: string[];
  warnings: string[];
  info?: string[];
  messageCodes?: string[];
  errorCodes?: string[];
  warningCodes?: string[];
  infoCodes?: string[];
}

/**
 * Raw city/settlement response from searchSettlements API
 */
interface NovaPoshtaSettlementRaw {
  Ref: string;
  Present: string;
  MainDescription?: string;
  AreaDescription?: string;
  RegionsDescription?: string;
  Area?: string;
  Region?: string;
  DeliveryCity?: string;
  Warehouses?: number;
}

/**
 * Raw warehouse response from getWarehouses API
 */
interface NovaPoshtaWarehouseRaw {
  Ref: string;
  Description: string;
  ShortAddress?: string;
  Number: string;
  CityRef?: string;
  CityDescription?: string;
  TypeOfWarehouse: string;
  PlaceMaxWeightAllowed?: string; // kg as string
  TotalMaxWeightAllowed?: string; // kg as string
  CategoryOfWarehouse?: string; // "Branch", "Postomat", etc.
}

/**
 * Raw street response from searchSettlementStreets API
 */
interface NovaPoshtaStreetRaw {
  Ref?: string;
  SettlementStreetRef?: string;
  Description?: string;
  SettlementStreetDescription?: string;
  StreetsType: string;
  StreetsTypeDescription?: string;
  Present?: string;
}

/**
 * Raw delivery price response from getDocumentPrice API
 */
interface NovaPoshtaDeliveryPriceRaw {
  Cost: number;
  AssessedCost: number;
  CostRedelivery?: number;
}

/**
 * Waybill creation request parameters
 */
export interface CreateWaybillParams {
  /** Sender's contact person reference */
  senderContactPersonRef: string;
  /** Sender's phone number */
  senderPhone: string;
  /** Sender's city reference */
  senderCityRef: string;
  /** Sender's warehouse reference (for WarehouseWarehouse) */
  senderWarehouseRef?: string;
  /** Sender's street reference (for WarehouseDoors) */
  senderStreetRef?: string;
  /** Sender's building number (for WarehouseDoors) */
  senderBuilding?: string;
  /** Sender's apartment number (for WarehouseDoors) */
  senderFlat?: string;
  
  /** Recipient's name */
  recipientName: string;
  /** Recipient's phone number */
  recipientPhone: string;
  /** Recipient's city reference */
  recipientCityRef: string;
  /** Recipient's warehouse reference (for WarehouseWarehouse) */
  recipientWarehouseRef?: string;
  /** Recipient's street reference (for WarehouseDoors) */
  recipientStreetRef?: string;
  /** Recipient's building number (for WarehouseDoors) */
  recipientBuilding?: string;
  /** Recipient's apartment number (for WarehouseDoors) */
  recipientFlat?: string;
  
  /** Service type: WarehouseWarehouse or WarehouseDoors */
  serviceType: 'WarehouseWarehouse' | 'WarehouseDoors';
  /** Payment method: Cash or NonCash */
  paymentMethod: 'Cash' | 'NonCash';
  /** Payer type: Sender or Recipient */
  payerType: 'Sender' | 'Recipient';
  
  /** Cargo description */
  cargoDescription: string;
  /** Total weight in kg */
  weightKg: number;
  /** Number of boxes/parcels */
  boxes: number;
  /** Declared value in UAH */
  declaredValue: number;
  
  /** Cost of goods in UAH (for Cash on Delivery) */
  costOnDelivery?: number;
  /** Additional services (e.g., return documents) */
  additionalServices?: string[];
  /** Delivery date (YYYY-MM-DD format, optional) */
  deliveryDate?: string;
}

/**
 * Waybill creation response
 */
export interface CreateWaybillResult {
  /** Created waybill reference ID */
  ref: string;
  /** Waybill tracking number (TTN) */
  trackingNumber: string;
  /** Estimated delivery cost */
  cost?: number;
  /** Estimated delivery date */
  estimatedDeliveryDate?: string;
}

/**
 * Raw waybill creation response from InternetDocument/save API
 */
interface NovaPoshtaWaybillRaw {
  Ref: string;
  IntDocNumber?: string; // Tracking number
  CostOnSite?: string;
  EstimatedDeliveryDate?: string;
}

// ============================================================================
// Cache Management
// ============================================================================

/**
 * Cache for warehouse responses to reduce API calls
 */
const warehouseCache = new Map<string, { 
  data: NovaPoshtaWarehouse[]; 
  timestamp: number;
}>();

/**
 * Pending warehouse requests to prevent duplicate simultaneous calls
 */
const pendingWarehouseRequests = new Map<string, Promise<NovaPoshtaWarehouse[]>>();

/**
 * Generate cache key for warehouse requests
 */
function getWarehouseCacheKey(
  cityRef: string,
  searchQuery?: string,
  minWeight?: number
): string {
  return `${cityRef}:${searchQuery || ''}:${minWeight || 0}`;
}

/**
 * Check if cached data is still valid
 */
function isCacheValid(timestamp: number): boolean {
  return Date.now() - timestamp < CACHE_TTL;
}

// ============================================================================
// Core API Functions
// ============================================================================

/**
 * Make a request to Nova Poshta API
 * 
 * @param apiKey - Nova Poshta API key
 * @param modelName - API model name (e.g., "Address", "InternetDocument")
 * @param calledMethod - API method name (e.g., "searchSettlements", "getWarehouses")
 * @param methodProperties - Method-specific parameters
 * @param proxyUrl - Optional proxy URL (uses default if not provided)
 * @returns API response with typed data
 * @throws Error if API request fails or returns errors
 */
async function makeRequest<T>(
  apiKey: string,
  modelName: string,
  calledMethod: string,
  methodProperties: Record<string, unknown>,
  proxyUrl?: string
): Promise<NovaPoshtaResponse<T>> {
  const url = proxyUrl || DEFAULT_API_URL;
  
  const request: NovaPoshtaRequest = {
    apiKey,
    modelName,
    calledMethod,
    methodProperties,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(
        `Nova Poshta API HTTP error: ${response.status} ${response.statusText}`
      );
    }

    const result: NovaPoshtaResponse<T> = await response.json();

    // Log API errors and warnings for debugging
    if (!result.success && result.errors?.length > 0) {
      console.error('Nova Poshta API returned errors:', result.errors);
    }
    if (result.warnings?.length > 0) {
      console.warn('Nova Poshta API warnings:', result.warnings);
    }

    return result;
  } catch (error) {
    console.error('Nova Poshta API request failed:', error);
    throw error;
  }
}

// ============================================================================
// Public API Methods
// ============================================================================

/**
 * Search for cities/settlements by name
 * 
 * Uses Nova Poshta's searchSettlements method to find matching cities.
 * Minimum query length is 2 characters to avoid excessive results.
 * 
 * @param apiKey - Nova Poshta API key
 * @param query - City name to search (min 2 characters)
 * @param limit - Maximum number of results (default: 20)
 * @param proxyUrl - Optional proxy URL for the API request
 * @returns Array of matching cities, empty array if query too short or no results
 * 
 * @example
 * ```ts
 * const cities = await searchCities(apiKey, 'Київ', 10);
 * // Returns: [{ ref: '...', name: 'Київ', region: 'Київська область' }, ...]
 * ```
 */
export async function searchCities(
  apiKey: string,
  query: string,
  limit: number = 20,
  proxyUrl?: string
): Promise<NovaPoshtaCity[]> {
  if (!query.trim() || query.length < 2) {
    return [];
  }

  try {
    const response = await makeRequest<{ Addresses?: NovaPoshtaSettlementRaw[] }>(
      apiKey,
      'Address',
      'searchSettlements',
      {
        CityName: query,
        Limit: limit.toString(),
      },
      proxyUrl
    );

    if (!response.success || !response.data[0]) {
      return [];
    }

    // API returns nested data for searchSettlements
    const addresses = response.data[0].Addresses || [];

    return addresses.map((settlement) => ({
      ref: settlement.Ref,
      name: settlement.Present || settlement.MainDescription || '',
      region: settlement.RegionsDescription || settlement.AreaDescription,
      area: settlement.AreaDescription,
    }));
  } catch (error) {
    console.error('Failed to search cities:', error);
    return [];
  }
}

/**
 * Get warehouses (branches) for a specific city with optional filtering
 * 
 * Implements caching and request deduplication to minimize API calls.
 * Can filter by search query and minimum weight capacity.
 * 
 * @param apiKey - Nova Poshta API key
 * @param cityRef - City reference ID from searchCities
 * @param searchQuery - Optional search term to filter warehouses
 * @param minWeight - Minimum weight capacity in kg (filters out incompatible warehouses)
 * @param proxyUrl - Optional proxy URL for the API request
 * @returns Array of warehouses that match criteria
 * 
 * @example
 * ```ts
 * // Get all warehouses in a city
 * const warehouses = await getWarehouses(apiKey, cityRef);
 * 
 * // Get warehouses that can handle 50kg
 * const heavyWarehouses = await getWarehouses(apiKey, cityRef, undefined, 50);
 * 
 * // Search for specific warehouse
 * const filtered = await getWarehouses(apiKey, cityRef, 'Відділення 5');
 * ```
 */
export async function getWarehouses(
  apiKey: string,
  cityRef: string,
  searchQuery?: string,
  minWeight?: number,
  proxyUrl?: string
): Promise<NovaPoshtaWarehouse[]> {
  if (!cityRef) {
    return [];
  }

  const cacheKey = getWarehouseCacheKey(cityRef, searchQuery, minWeight);

  // Check cache first
  const cached = warehouseCache.get(cacheKey);
  if (cached && isCacheValid(cached.timestamp)) {
    return cached.data;
  }

  // Check if there's already a pending request for this exact query
  const pending = pendingWarehouseRequests.get(cacheKey);
  if (pending) {
    return pending;
  }

  // Create the request promise
  const requestPromise = (async () => {
    try {
      const properties: Record<string, unknown> = {
        CityRef: cityRef,
        Limit: '500', // High limit to get all warehouses before filtering
      };

      if (searchQuery) {
        properties.FindByString = searchQuery;
      }

      const response = await makeRequest<NovaPoshtaWarehouseRaw>(
        apiKey,
        'Address',
        'getWarehouses',
        properties,
        proxyUrl
      );

      if (!response.success) {
        // Don't cache rate limit errors
        if (response.errors?.some((e) => e.toLowerCase().includes('many requests'))) {
          console.warn('Nova Poshta rate limit hit, will retry on next request');
          return [];
        }
        return [];
      }

      let warehouses = response.data || [];

      // Filter by weight capacity if minWeight is specified
      if (minWeight && minWeight > 0) {
        warehouses = warehouses.filter((w) => {
          // Always exclude postomats for heavy items (they have ~30kg limit max)
          if (w.TypeOfWarehouse === POSTOMAT_TYPE_ID) {
            return false;
          }

          // Check both PlaceMaxWeightAllowed and TotalMaxWeightAllowed
          const placeMaxWeight = parseFloat(w.PlaceMaxWeightAllowed || '0');
          const totalMaxWeight = parseFloat(w.TotalMaxWeightAllowed || '0');

          // Use the higher of the two values (some warehouses only have one set)
          const maxWeight = Math.max(
            isNaN(placeMaxWeight) ? 0 : placeMaxWeight,
            isNaN(totalMaxWeight) ? 0 : totalMaxWeight
          );

          // For heavy items (>30kg), only include cargo warehouses or warehouses with explicit high weight limit
          if (minWeight > 30) {
            // If it's a cargo warehouse, include it
            if (w.TypeOfWarehouse === CARGO_WAREHOUSE_TYPE_ID) {
              return true;
            }
            // If maxWeight is explicitly set and sufficient, include it
            if (maxWeight >= minWeight) {
              return true;
            }
            // If warehouse description contains keywords indicating it handles cargo
            const descLower = w.Description.toLowerCase();
            if (descLower.includes('вантаж') || descLower.includes('cargo')) {
              return true;
            }
            // Otherwise exclude - we can't confirm it handles heavy items
            return false;
          }

          // For lighter items, include if maxWeight is sufficient or unknown (0)
          return maxWeight === 0 || maxWeight >= minWeight;
        });
      }

      // Transform to our type format
      const result: NovaPoshtaWarehouse[] = warehouses.map((w) => ({
        ref: w.Ref,
        name: w.Description,
        number: w.Number,
        cityRef: w.CityRef,
        maxWeightAllowed: parseFloat(w.TotalMaxWeightAllowed || '0') || undefined,
        placeMaxWeightAllowed: parseFloat(w.PlaceMaxWeightAllowed || '0') || undefined,
        categoryOfWarehouse: w.CategoryOfWarehouse,
      }));

      // Cache successful results
      warehouseCache.set(cacheKey, { data: result, timestamp: Date.now() });

      return result;
    } catch (error) {
      console.error('Failed to get warehouses:', error);
      return [];
    } finally {
      // Clean up pending request
      pendingWarehouseRequests.delete(cacheKey);
    }
  })();

  // Store as pending
  pendingWarehouseRequests.set(cacheKey, requestPromise);

  return requestPromise;
}

/**
 * Search for streets by name in a specific city
 * 
 * Used for door-to-door delivery address lookup.
 * Minimum query length is 2 characters.
 * 
 * @param apiKey - Nova Poshta API key
 * @param cityRef - City reference ID from searchCities
 * @param query - Street name to search (min 2 characters)
 * @param limit - Maximum number of results (default: 20)
 * @param proxyUrl - Optional proxy URL for the API request
 * @returns Array of matching streets, empty array if query too short or no results
 * 
 * @example
 * ```ts
 * const streets = await searchStreets(apiKey, cityRef, 'Хрещатик');
 * // Returns: [{ ref: '...', name: 'вул. Хрещатик' }, ...]
 * ```
 */
export async function searchStreets(
  apiKey: string,
  cityRef: string,
  query: string,
  limit: number = 20,
  proxyUrl?: string
): Promise<NovaPoshtaStreet[]> {
  if (!cityRef || !query.trim() || query.length < 2) {
    return [];
  }

  try {
    const response = await makeRequest<{ Addresses?: NovaPoshtaStreetRaw[] }>(
      apiKey,
      'Address',
      'searchSettlementStreets',
      {
        SettlementRef: cityRef,
        StreetName: query,
        Limit: limit.toString(),
      },
      proxyUrl
    );

    if (!response.success || !response.data[0]) {
      return [];
    }

    // API returns nested data for searchSettlementStreets
    const streets = response.data[0].Addresses || [];

    return streets.map((street) => ({
      ref: street.SettlementStreetRef || street.Ref || '',
      name: street.Present || 
            `${street.StreetsType} ${street.Description || street.SettlementStreetDescription || ''}`,
      cityRef,
    }));
  } catch (error) {
    console.error('Failed to search streets:', error);
    return [];
  }
}

/**
 * Calculate delivery price from sender to recipient
 * 
 * Estimates shipping cost based on weight, dimensions, and service type.
 * Used for displaying shipping costs to customers before order confirmation.
 * 
 * @param apiKey - Nova Poshta API key
 * @param senderCityRef - Sender's city reference ID
 * @param recipientCityRef - Recipient's city reference ID
 * @param weight - Parcel weight in kg
 * @param declaredValue - Declared value in UAH (for insurance calculation)
 * @param serviceType - Delivery type: WarehouseWarehouse or WarehouseDoors
 * @param boxes - Number of parcels (default: 1)
 * @param proxyUrl - Optional proxy URL for the API request
 * @returns Delivery price details or null if calculation failed
 * 
 * @example
 * ```ts
 * const price = await getDeliveryPrice(
 *   apiKey, 
 *   senderCity, 
 *   recipientCity, 
 *   5.5, 
 *   10000, 
 *   'WarehouseWarehouse'
 * );
 * if (price) {
 *   console.log(`Shipping: ${price.cost} UAH`);
 * }
 * ```
 */
export async function getDeliveryPrice(
  apiKey: string,
  senderCityRef: string,
  recipientCityRef: string,
  weight: number,
  declaredValue: number,
  serviceType: 'WarehouseWarehouse' | 'WarehouseDoors' = 'WarehouseWarehouse',
  boxes: number = 1,
  proxyUrl?: string
): Promise<NovaPoshtaDeliveryPrice | null> {
  if (!senderCityRef || !recipientCityRef || weight <= 0) {
    return null;
  }

  try {
    const response = await makeRequest<NovaPoshtaDeliveryPriceRaw>(
      apiKey,
      'InternetDocument',
      'getDocumentPrice',
      {
        CitySender: senderCityRef,
        CityRecipient: recipientCityRef,
        Weight: Math.max(weight, 0.1).toString(), // Minimum 0.1 kg
        ServiceType: serviceType,
        Cost: Math.round(declaredValue).toString(),
        CargoType: 'Cargo',
        SeatsAmount: boxes.toString(),
      },
      proxyUrl
    );

    if (!response.success || !response.data[0]) {
      return null;
    }

    return {
      cost: response.data[0].Cost,
      assessedCost: response.data[0].AssessedCost,
    };
  } catch (error) {
    console.error('Failed to get delivery price:', error);
    return null;
  }
}

/**
 * Create a waybill (Internet Document) for shipment
 * 
 * Creates an official shipping waybill with Nova Poshta, generating a tracking number (TTN).
 * This is the core function for integrating with Nova Poshta's shipping workflow.
 * 
 * @param apiKey - Nova Poshta API key
 * @param params - Waybill creation parameters (sender, recipient, cargo details)
 * @param proxyUrl - Optional proxy URL for the API request
 * @returns Waybill creation result with tracking number, or null if failed
 * @throws Error if required parameters are missing or invalid
 * 
 * @example
 * ```ts
 * const waybill = await createWaybill(apiKey, {
 *   senderContactPersonRef: '...',
 *   senderPhone: '+380501234567',
 *   senderCityRef: '...',
 *   senderWarehouseRef: '...',
 *   recipientName: 'Іван Петренко',
 *   recipientPhone: '+380671234567',
 *   recipientCityRef: '...',
 *   recipientWarehouseRef: '...',
 *   serviceType: 'WarehouseWarehouse',
 *   paymentMethod: 'Cash',
 *   payerType: 'Recipient',
 *   cargoDescription: 'Електросамокат',
 *   weightKg: 15.5,
 *   boxes: 1,
 *   declaredValue: 15000,
 * });
 * 
 * if (waybill) {
 *   console.log(`Tracking number: ${waybill.trackingNumber}`);
 * }
 * ```
 */
export async function createWaybill(
  apiKey: string,
  params: CreateWaybillParams,
  proxyUrl?: string
): Promise<CreateWaybillResult | null> {
  // Validate required parameters
  if (!params.recipientName || !params.recipientPhone || !params.recipientCityRef) {
    throw new Error('Missing required recipient information');
  }
  if (!params.senderCityRef || !params.senderPhone || !params.senderContactPersonRef) {
    throw new Error('Missing required sender information');
  }
  if (params.serviceType === 'WarehouseWarehouse' && !params.recipientWarehouseRef) {
    throw new Error('Recipient warehouse required for WarehouseWarehouse service');
  }
  if (params.serviceType === 'WarehouseDoors' && (!params.recipientStreetRef || !params.recipientBuilding)) {
    throw new Error('Recipient address required for WarehouseDoors service');
  }
  if (params.weightKg <= 0 || params.boxes <= 0) {
    throw new Error('Weight and boxes must be positive numbers');
  }

  try {
    // Build method properties based on service type
    const methodProperties: Record<string, unknown> = {
      // Sender information
      SenderRef: params.senderContactPersonRef,
      ContactSender: params.senderContactPersonRef,
      SendersPhone: params.senderPhone,
      CitySender: params.senderCityRef,
      
      // Recipient information
      NewAddress: '1', // Always create new recipient
      RecipientName: params.recipientName,
      RecipientType: 'PrivatePerson',
      RecipientsPhone: params.recipientPhone,
      RecipientCityName: params.recipientCityRef,
      
      // Service details
      ServiceType: params.serviceType,
      PaymentMethod: params.paymentMethod,
      PayerType: params.payerType,
      
      // Cargo information
      Description: params.cargoDescription,
      Weight: params.weightKg.toString(),
      SeatsAmount: params.boxes.toString(),
      Cost: Math.round(params.declaredValue).toString(),
      CargoType: 'Cargo',
    };

    // Add sender address based on service type
    if (params.senderWarehouseRef) {
      methodProperties.SenderAddress = params.senderWarehouseRef;
    } else if (params.senderStreetRef) {
      methodProperties.SenderStreetRef = params.senderStreetRef;
      if (params.senderBuilding) {
        methodProperties.SenderBuildingNumber = params.senderBuilding;
      }
      if (params.senderFlat) {
        methodProperties.SenderFlat = params.senderFlat;
      }
    }

    // Add recipient address based on service type
    if (params.serviceType === 'WarehouseWarehouse') {
      methodProperties.RecipientAddressName = params.recipientWarehouseRef;
    } else {
      methodProperties.RecipientStreet = params.recipientStreetRef;
      methodProperties.RecipientHouse = params.recipientBuilding;
      if (params.recipientFlat) {
        methodProperties.RecipientFlat = params.recipientFlat;
      }
    }

    // Add optional parameters
    if (params.costOnDelivery && params.costOnDelivery > 0) {
      methodProperties.BackwardDeliveryData = [{
        PayerType: params.payerType,
        CargoType: 'Money',
        RedeliveryString: Math.round(params.costOnDelivery).toString(),
      }];
    }

    if (params.deliveryDate) {
      methodProperties.DateTime = params.deliveryDate;
    }

    const response = await makeRequest<NovaPoshtaWaybillRaw>(
      apiKey,
      'InternetDocument',
      'save',
      methodProperties,
      proxyUrl
    );

    if (!response.success || !response.data[0]) {
      console.error('Waybill creation failed:', response.errors);
      return null;
    }

    const waybill = response.data[0];

    return {
      ref: waybill.Ref,
      trackingNumber: waybill.IntDocNumber || '',
      cost: waybill.CostOnSite ? parseFloat(waybill.CostOnSite) : undefined,
      estimatedDeliveryDate: waybill.EstimatedDeliveryDate,
    };
  } catch (error) {
    console.error('Failed to create waybill:', error);
    return null;
  }
}
