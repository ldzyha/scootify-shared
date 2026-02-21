/**
 * SEO and structured data types
 */

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface SchemaConfig {
  siteUrl: string;
  siteName: string;
  organizationName: string;
  description: string;
  logoUrl: string;
  contactPhone?: string;
  contactEmail?: string;
  address?: {
    street: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
  socialProfiles?: string[];
}

export interface ProductSchemaData {
  name: string;
  description: string;
  image: string[];
  sku: string;
  brand: string;
  priceUah: number;
  priceCurrency: 'UAH';
  availability: 'InStock' | 'OutOfStock' | 'PreOrder';
  url: string;
  rating?: {
    value: number;
    count: number;
  };
  aggregateOffer?: {
    lowPrice: number;
    highPrice: number;
    priceCurrency: 'UAH';
    offerCount: number;
  };
}
