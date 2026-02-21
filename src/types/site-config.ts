/**
 * Site configuration types
 * Each site provides its own config instance
 */

export interface ContactConfig {
  phone: string;
  email: string;
  telegram?: {
    bot?: string;
    personal?: string;
    group?: string;
  };
}

export interface AddressConfig {
  street: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  countryCode: string;
}

export interface GeoConfig {
  latitude: number;
  longitude: number;
}

export interface BrandColors {
  primary: string;
  secondary: string;
  accent: string;
}

export interface MetallicGradients {
  brandBg: string;
  brandText: string;
}

export interface SiteConfig {
  // Brand identity
  siteName: string;
  siteUrl: string;
  domain: string;
  brand: string;
  tagline?: string;
  description: string;
  
  // Contact
  contact: ContactConfig;
  address?: AddressConfig;
  geo?: GeoConfig;
  
  // Business
  legalName?: string;
  taxId?: string;
  
  // Design
  colors?: BrandColors;
  metallicGradients?: MetallicGradients;
  logoUrl?: string;
  logoWidth?: number;
  logoHeight?: number;
  
  // Currency
  defaultCurrency: 'UAH' | 'USD';
  fallbackExchangeRate: number; // UAH per 1 USD
  
  // URLs
  productUrlPattern: string; // e.g., '/product/:slug' or '/tovary/:slug/'
  
  // Features
  features?: {
    cart?: boolean;
    checkout?: boolean;
    search?: boolean;
    telegramBot?: boolean;
  };
  
  // Order prefix (e.g., 'HL-', 'NM-', 'HY-', 'SF-')
  orderPrefix: string;
  
  // Firestore city ref for delivery
  storeCity?: {
    ref: string;
    name: string;
  };
}
