/**
 * Nova Poshta API types
 */

export interface NovaPoshtaCity {
  ref: string;
  name: string;
  region?: string;
  area?: string;
}

export interface NovaPoshtaWarehouse {
  ref: string;
  name?: string;
  number?: string;
  cityRef?: string;
  maxWeightAllowed?: number;
  placeMaxWeightAllowed?: number;
  categoryOfWarehouse?: string;
}

export interface NovaPoshtaStreet {
  ref: string;
  name: string;
  cityRef?: string;
}

export interface NovaPoshtaDeliveryPrice {
  cost: number; // in UAH
  assessedCost?: number;
  estimatedDeliveryDate?: string;
}

export interface NovaPoshtaApiConfig {
  apiKey: string;
  proxyUrl?: string; // Firebase Function or Cloud Run proxy URL
}

export interface NovaPoshtaCacheConfig {
  enabled: boolean;
  ttl: number; // milliseconds
}
