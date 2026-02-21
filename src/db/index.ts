/**
 * Database Query and Filter Helpers
 * 
 * This module provides helper functions to query and filter products from the shared database.
 * All functions return immutable copies of data to prevent accidental mutations.
 */

import type { Product, Scooter, Accessory, DomainKey } from './schema';
import { scooters } from './scooters';
import { accessories } from './accessories';
import { brands } from './brands';
import { categories } from './categories';

// Re-export everything for convenience
export * from './schema';
export * from './scooters';
export * from './accessories';
export * from './brands';
export * from './categories';
export * from './adapters';
export * from './validators';

/**
 * All products (scooters + accessories)
 */
export const products: Product[] = [...scooters, ...accessories];

// =============================================================================
// DOMAIN FILTERING
// =============================================================================

/**
 * Get all products for a specific domain
 * @param domain - The domain key (e.g., 'hiley.com.ua')
 * @returns Array of products available on that domain
 */
export function getProductsByDomain(domain: DomainKey): Product[] {
  return products.filter(p => p.domains.includes(domain));
}

/**
 * Get scooters for a specific domain
 * @param domain - The domain key
 * @returns Array of scooters available on that domain
 */
export function getScootersByDomain(domain: DomainKey): Scooter[] {
  return scooters.filter(s => s.domains.includes(domain));
}

/**
 * Get accessories for a specific domain
 * @param domain - The domain key
 * @returns Array of accessories available on that domain
 */
export function getAccessoriesByDomain(domain: DomainKey): Accessory[] {
  return accessories.filter(a => a.domains.includes(domain));
}

// =============================================================================
// BRAND FILTERING
// =============================================================================

/**
 * Get all products for a specific brand
 * @param brandId - The brand ID (e.g., 'tiger', 'nami')
 * @returns Array of products from that brand
 */
export function getProductsByBrand(brandId: string): Product[] {
  return products.filter(p => p.brandId === brandId);
}

/**
 * Get scooters for a specific brand
 * @param brandId - The brand ID
 * @returns Array of scooters from that brand
 */
export function getScootersByBrand(brandId: string): Scooter[] {
  return scooters.filter(s => s.brandId === brandId);
}

// =============================================================================
// CATEGORY FILTERING
// =============================================================================

/**
 * Get products by category ID
 * @param categoryId - The category ID (e.g., 'tier-premium', 'pt-parts')
 * @returns Array of products in that category
 */
export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter(p => p.categoryIds.includes(categoryId));
}

/**
 * Get scooters by tier (entry, mid-range, premium, hyper, alt-car)
 * @param tier - The tier category ID (e.g., 'tier-premium')
 * @returns Array of scooters in that tier
 */
export function getScootersByTier(tier: string): Scooter[] {
  return scooters.filter(s => s.categoryIds.includes(tier));
}

/**
 * Get scooters by use case (city, touring, off-road, sport, universal)
 * @param useCase - The use case category ID (e.g., 'uc-city')
 * @returns Array of scooters for that use case
 */
export function getScootersByUseCase(useCase: string): Scooter[] {
  return scooters.filter(s => s.categoryIds.includes(useCase));
}

/**
 * Get accessories by product type (parts, accessories, safety, winter, maintenance)
 * @param productType - The product type category ID (e.g., 'pt-parts')
 * @returns Array of accessories of that type
 */
export function getAccessoriesByProductType(productType: string): Accessory[] {
  return accessories.filter(a => a.categoryIds.includes(productType));
}

// =============================================================================
// PRICE FILTERING
// =============================================================================

/**
 * Get products within a price range (in USD cents)
 * @param minCents - Minimum price in USD cents
 * @param maxCents - Maximum price in USD cents
 * @returns Array of products within the price range
 */
export function getProductsByPriceRange(minCents: number, maxCents: number): Product[] {
  return products.filter(p => p.priceUsdCents >= minCents && p.priceUsdCents <= maxCents);
}

/**
 * Get products under a specific price (in USD cents)
 * @param maxCents - Maximum price in USD cents
 * @returns Array of products under that price
 */
export function getProductsUnderPrice(maxCents: number): Product[] {
  return products.filter(p => p.priceUsdCents <= maxCents);
}

// =============================================================================
// FEATURED & AVAILABILITY
// =============================================================================

/**
 * Get featured products, optionally filtered by domain
 * @param domain - Optional domain to filter by
 * @returns Array of featured products
 */
export function getFeaturedProducts(domain?: DomainKey): Product[] {
  const allFeatured = products.filter(p => p.featured);
  return domain ? allFeatured.filter(p => p.domains.includes(domain)) : allFeatured;
}

/**
 * Get in-stock products, optionally filtered by domain
 * @param domain - Optional domain to filter by
 * @returns Array of in-stock products
 */
export function getInStockProducts(domain?: DomainKey): Product[] {
  const allInStock = products.filter(p => p.availability === 'in_stock');
  return domain ? allInStock.filter(p => p.domains.includes(domain)) : allInStock;
}

/**
 * Get products available for pre-order, optionally filtered by domain
 * @param domain - Optional domain to filter by
 * @returns Array of pre-order products
 */
export function getPreOrderProducts(domain?: DomainKey): Product[] {
  const allPreOrder = products.filter(p => p.availability === 'pre_order');
  return domain ? allPreOrder.filter(p => p.domains.includes(domain)) : allPreOrder;
}

// =============================================================================
// SEARCH
// =============================================================================

/**
 * Search products by name, short description, or tags
 * @param query - Search query string
 * @param domain - Optional domain to filter results
 * @returns Array of matching products
 */
export function searchProducts(query: string, domain?: DomainKey): Product[] {
  const normalizedQuery = query.toLowerCase().trim();
  
  if (!normalizedQuery) {
    return domain ? getProductsByDomain(domain) : products;
  }

  const results = products.filter(p => {
    // Search in name (English and Ukrainian)
    if (p.name.toLowerCase().includes(normalizedQuery)) return true;
    if (p.nameUk?.toLowerCase().includes(normalizedQuery)) return true;
    
    // Search in short description
    if (p.shortDescription?.toLowerCase().includes(normalizedQuery)) return true;
    if (p.shortDescriptionUk?.toLowerCase().includes(normalizedQuery)) return true;
    
    // Search in tags
    if (p.tags.some(tag => tag.toLowerCase().includes(normalizedQuery))) return true;
    
    // Search in brand name
    const brand = brands.find(b => b.id === p.brandId);
    if (brand?.name.toLowerCase().includes(normalizedQuery)) return true;
    if (brand?.nameUk?.toLowerCase().includes(normalizedQuery)) return true;
    
    // Search in SKU
    if (p.sku.toLowerCase().includes(normalizedQuery)) return true;
    
    return false;
  });

  return domain ? results.filter(p => p.domains.includes(domain)) : results;
}

/**
 * Search scooters with additional spec-based filters
 * @param query - Search query string
 * @param filters - Optional filters (domain, minSpeed, maxSpeed, etc.)
 * @returns Array of matching scooters
 */
export function searchScooters(
  query: string,
  filters?: {
    domain?: DomainKey;
    minSpeed?: number;
    maxSpeed?: number;
    minRange?: number;
    minPower?: number;
    batteryVoltage?: number;
  }
): Scooter[] {
  let results = scooters;

  // Apply text search
  if (query) {
    const normalizedQuery = query.toLowerCase().trim();
    results = results.filter(s => {
      if (s.name.toLowerCase().includes(normalizedQuery)) return true;
      if (s.nameUk?.toLowerCase().includes(normalizedQuery)) return true;
      if (s.shortDescription?.toLowerCase().includes(normalizedQuery)) return true;
      if (s.shortDescriptionUk?.toLowerCase().includes(normalizedQuery)) return true;
      if (s.tags.some(tag => tag.toLowerCase().includes(normalizedQuery))) return true;
      if (s.sku.toLowerCase().includes(normalizedQuery)) return true;
      if (s.series?.toLowerCase().includes(normalizedQuery)) return true;
      if (s.model?.toLowerCase().includes(normalizedQuery)) return true;
      return false;
    });
  }

  // Apply filters
  if (filters) {
    if (filters.domain) {
      results = results.filter(s => s.domains.includes(filters.domain!));
    }
    if (filters.minSpeed !== undefined) {
      results = results.filter(s => s.specs.performance.maxSpeed && s.specs.performance.maxSpeed >= filters.minSpeed!);
    }
    if (filters.maxSpeed !== undefined) {
      results = results.filter(s => s.specs.performance.maxSpeed && s.specs.performance.maxSpeed <= filters.maxSpeed!);
    }
    if (filters.minRange !== undefined) {
      results = results.filter(s => s.specs.performance.range && s.specs.performance.range >= filters.minRange!);
    }
    if (filters.minPower !== undefined) {
      results = results.filter(s => s.specs.motor.totalPower && s.specs.motor.totalPower >= filters.minPower!);
    }
    if (filters.batteryVoltage !== undefined) {
      results = results.filter(s => s.specs.battery.voltage === filters.batteryVoltage);
    }
  }

  return results;
}

// =============================================================================
// SORTING
// =============================================================================

/**
 * Sort products by price
 * @param products - Array of products to sort
 * @param order - Sort order ('asc' or 'desc')
 * @returns Sorted array (new copy, original unchanged)
 */
export function sortProductsByPrice<T extends Product>(products: T[], order: 'asc' | 'desc' = 'asc'): T[] {
  const sorted = [...products];
  sorted.sort((a, b) => {
    const diff = a.priceUsdCents - b.priceUsdCents;
    return order === 'asc' ? diff : -diff;
  });
  return sorted;
}

/**
 * Sort products by name (alphabetically)
 * @param products - Array of products to sort
 * @param order - Sort order ('asc' or 'desc')
 * @param useUkrainian - Use Ukrainian name for sorting
 * @returns Sorted array (new copy, original unchanged)
 */
export function sortProductsByName<T extends Product>(
  products: T[],
  order: 'asc' | 'desc' = 'asc',
  useUkrainian = false
): T[] {
  const sorted = [...products];
  sorted.sort((a, b) => {
    const nameA = (useUkrainian ? a.nameUk : a.name) || a.name;
    const nameB = (useUkrainian ? b.nameUk : b.name) || b.name;
    const diff = nameA.localeCompare(nameB);
    return order === 'asc' ? diff : -diff;
  });
  return sorted;
}

/**
 * Sort scooters by max speed
 * @param scooters - Array of scooters to sort
 * @param order - Sort order ('asc' or 'desc')
 * @returns Sorted array (new copy, original unchanged)
 */
export function sortScootersBySpeed(scooters: Scooter[], order: 'asc' | 'desc' = 'desc'): Scooter[] {
  const sorted = [...scooters];
  sorted.sort((a, b) => {
    const speedA = a.specs.performance.maxSpeed || 0;
    const speedB = b.specs.performance.maxSpeed || 0;
    const diff = speedA - speedB;
    return order === 'asc' ? diff : -diff;
  });
  return sorted;
}

/**
 * Sort scooters by range
 * @param scooters - Array of scooters to sort
 * @param order - Sort order ('asc' or 'desc')
 * @returns Sorted array (new copy, original unchanged)
 */
export function sortScootersByRange(scooters: Scooter[], order: 'asc' | 'desc' = 'desc'): Scooter[] {
  const sorted = [...scooters];
  sorted.sort((a, b) => {
    const rangeA = a.specs.performance.range || 0;
    const rangeB = b.specs.performance.range || 0;
    const diff = rangeA - rangeB;
    return order === 'asc' ? diff : -diff;
  });
  return sorted;
}

/**
 * Sort scooters by power
 * @param scooters - Array of scooters to sort
 * @param order - Sort order ('asc' or 'desc')
 * @returns Sorted array (new copy, original unchanged)
 */
export function sortScootersByPower(scooters: Scooter[], order: 'asc' | 'desc' = 'desc'): Scooter[] {
  const sorted = [...scooters];
  sorted.sort((a, b) => {
    const powerA = a.specs.motor.totalPower || 0;
    const powerB = b.specs.motor.totalPower || 0;
    const diff = powerA - powerB;
    return order === 'asc' ? diff : -diff;
  });
  return sorted;
}

// =============================================================================
// SINGLE PRODUCT LOOKUP
// =============================================================================

/**
 * Get a product by ID
 * @param id - Product ID
 * @returns Product or undefined if not found
 */
export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

/**
 * Get a product by slug
 * @param slug - Product slug
 * @param domain - Optional domain to ensure product is available there
 * @returns Product or undefined if not found
 */
export function getProductBySlug(slug: string, domain?: DomainKey): Product | undefined {
  const product = products.find(p => p.slug === slug);
  if (!product) return undefined;
  if (domain && !product.domains.includes(domain)) return undefined;
  return product;
}

/**
 * Get a scooter by ID
 * @param id - Scooter ID
 * @returns Scooter or undefined if not found
 */
export function getScooterById(id: string): Scooter | undefined {
  return scooters.find(s => s.id === id);
}

/**
 * Get an accessory by ID
 * @param id - Accessory ID
 * @returns Accessory or undefined if not found
 */
export function getAccessoryById(id: string): Accessory | undefined {
  return accessories.find(a => a.id === id);
}

// =============================================================================
// RELATED PRODUCTS
// =============================================================================

/**
 * Get related products for a given product
 * @param productId - Product ID
 * @returns Array of related products
 */
export function getRelatedProducts(productId: string): Product[] {
  const product = getProductById(productId);
  if (!product || !product.relatedProductIds || product.relatedProductIds.length === 0) {
    return [];
  }
  
  return product.relatedProductIds
    .map(id => getProductById(id))
    .filter((p): p is Product => p !== undefined);
}

/**
 * Get compatible scooters for an accessory
 * @param accessoryId - Accessory ID
 * @returns Array of compatible scooters
 */
export function getCompatibleScooters(accessoryId: string): Scooter[] {
  const accessory = getAccessoryById(accessoryId);
  if (!accessory || !accessory.compatibility || accessory.compatibility.length === 0) {
    return [];
  }
  
  return scooters.filter(s => {
    // Check if scooter ID is in compatibility list
    if (accessory.compatibility!.includes(s.id)) return true;
    
    // Check if brand ID is in compatibility list
    if (accessory.compatibility!.includes(s.brandId)) return true;
    
    // Check if any tag matches
    return accessory.compatibility!.some(compat => s.tags.includes(compat));
  });
}

// =============================================================================
// STATISTICS
// =============================================================================

/**
 * Get product count by domain
 * @returns Record of domain to product count
 */
export function getProductCountByDomain(): Record<DomainKey, number> {
  const counts: Record<string, number> = {};
  
  products.forEach(p => {
    p.domains.forEach(domain => {
      counts[domain] = (counts[domain] || 0) + 1;
    });
  });
  
  return counts as Record<DomainKey, number>;
}

/**
 * Get product count by brand
 * @returns Record of brand ID to product count
 */
export function getProductCountByBrand(): Record<string, number> {
  const counts: Record<string, number> = {};
  
  products.forEach(p => {
    counts[p.brandId] = (counts[p.brandId] || 0) + 1;
  });
  
  return counts;
}

/**
 * Get price statistics for all products
 * @returns Price statistics (min, max, average, median)
 */
export function getPriceStatistics(): {
  minCents: number;
  maxCents: number;
  averageCents: number;
  medianCents: number;
} {
  const prices = products.map(p => p.priceUsdCents).sort((a, b) => a - b);
  
  return {
    minCents: prices[0],
    maxCents: prices[prices.length - 1],
    averageCents: Math.round(prices.reduce((a, b) => a + b, 0) / prices.length),
    medianCents: prices[Math.floor(prices.length / 2)],
  };
}
