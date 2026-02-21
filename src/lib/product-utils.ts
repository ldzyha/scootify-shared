/**
 * Product Utilities Library
 *
 * Pure utility functions for working with product arrays.
 * All functions accept products as parameters - no hardcoded data.
 * Site-agnostic - can be used across any e-commerce site.
 */

import type { Product, ProductTileData } from '@scootify/shared/types';
import { processDescriptionTemplate } from './specs-utils';

/**
 * Series configuration for organizing products into collections
 * Used for homepage displays, navigation, and product grouping
 */
export interface SeriesConfig {
  /** Unique identifier for the series */
  id: string;
  /** Display name */
  name: string;
  /** URL-friendly slug */
  slug: string;
  /** Short subtitle or tagline */
  subtitle: string;
  /** Full description of the series */
  description: string;
  /** List of key benefits or features */
  benefits: string[];
  /** Target use case description */
  useCase: string;
  /** Display order (lower numbers appear first) */
  order: number;
}

// ============================================
// BASIC PRODUCT QUERIES
// ============================================

/**
 * Get all products from an array (excluding hidden products)
 *
 * @param products - Array of products to filter
 * @returns Products that are not marked as hidden
 */
export function getAllProducts(products: Product[]): Product[] {
  return products.filter((p) => !p.hidden);
}

/**
 * Get product by slug
 *
 * @param products - Array of products to search
 * @param slug - URL-friendly product identifier
 * @returns Matching product or undefined if not found
 */
export function getProductBySlug(products: Product[], slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/**
 * Get product by ID
 *
 * @param products - Array of products to search
 * @param id - Unique product identifier
 * @returns Matching product or undefined if not found
 */
export function getProductById(products: Product[], id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

/**
 * Get all product slugs (useful for static generation)
 *
 * @param products - Array of products
 * @returns Array of all product slugs
 */
export function getAllProductSlugs(products: Product[]): string[] {
  return products.map((p) => p.slug);
}

// ============================================
// PRODUCT RELATIONSHIPS
// ============================================

/**
 * Get similar products based on series and price proximity
 *
 * Returns products from the same series, sorted by price similarity
 * to the current product. Useful for "You might also like" sections.
 *
 * @param products - Array of all products
 * @param currentSlug - Slug of the current product
 * @param limit - Maximum number of results (default: 4)
 * @returns Array of similar products
 */
export function getSimilarProducts(
  products: Product[],
  currentSlug: string,
  limit = 4
): Product[] {
  const currentProduct = getProductBySlug(products, currentSlug);
  if (!currentProduct) return [];

  // Get products from same series
  const similar = products
    .filter((p) => p.slug !== currentSlug && p.series === currentProduct.series)
    .sort((a, b) => {
      // Sort by price proximity
      const aDiff = Math.abs(a.priceUsdCents - currentProduct.priceUsdCents);
      const bDiff = Math.abs(b.priceUsdCents - currentProduct.priceUsdCents);
      return aDiff - bDiff;
    })
    .slice(0, limit);

  return similar;
}

// ============================================
// PRODUCT TRANSFORMATION
// ============================================

/**
 * Convert full Product to lightweight ProductTileData
 *
 * Extracts essential display data for product cards/tiles.
 * Handles variants, color images, and spec templates.
 *
 * @param product - Full product object
 * @returns Lightweight tile data for display
 */
export function productToTileData(product: Product): ProductTileData {
  const mainImage = product.images.find((img) => img.isMain) || product.images[0];
  const hoverImage = product.images.find((img) => !img.isMain);

  // If product has variants, use first variant's specs merged with base specs
  const firstVariant = product.variants?.[0];
  const displaySpecs = firstVariant?.specsOverride
    ? {
        ...product.specs,
        battery: { ...product.specs?.battery, ...firstVariant.specsOverride.battery },
        performance: { ...product.specs?.performance, ...firstVariant.specsOverride.performance },
        motor: { ...product.specs?.motor, ...firstVariant.specsOverride.motor },
      }
    : product.specs;

  // Use first variant's price if available
  const displayPrice = firstVariant?.price || product.priceUsdCents;
  const displayOriginalPrice = firstVariant?.originalPrice || product.originalPriceUsdCents;

  // Process tagline from shortDescription template if available
  const tagline = product.shortDescription && displaySpecs
    ? processDescriptionTemplate(product.shortDescription, displaySpecs)
    : product.shortDescription;

  // Extract variant data for slash-format display
  const hasVariants = product.variants && product.variants.length > 0;
  const variantNames = hasVariants
    ? [
        product.specs?.battery?.capacity ? 'BASE' : undefined,
        ...product.variants!.map(v => v.name.split(' ')[0]) // "PRO (35Ah)" -> "PRO"
      ].filter(Boolean) as string[]
    : undefined;
  const variantCapacities = hasVariants
    ? [
        product.specs?.battery?.capacity, // Base capacity
        ...product.variants!.map(v => v.specsOverride?.battery?.capacity)
      ].filter((c): c is number => c !== undefined)
    : undefined;
  const variantPrices = hasVariants
    ? [
        product.priceUsdCents, // Base price
        ...product.variants!.map(v => v.price)
      ].filter((p): p is number => p !== undefined)
    : undefined;

  // Convert colorImages from ProductImage[] to simple {url, alt} format
  const colorImages = product.colorImages
    ? Object.fromEntries(
        Object.entries(product.colorImages).map(([color, images]) => [
          color,
          { url: images[0]?.url || '', alt: images[0]?.alt || product.name },
        ])
      )
    : undefined;

  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    tagline,
    priceUsdCents: displayPrice,
    originalPriceUsdCents: displayOriginalPrice,
    thumbnail: mainImage?.url || '/placeholder.webp',
    hoverImage: hoverImage?.url,
    inStock: firstVariant?.inStock ?? product.inStock,
    specs: {
      maxSpeed: displaySpecs?.performance?.maxSpeed,
      range: displaySpecs?.performance?.range,
      voltage: displaySpecs?.battery?.voltage,
      capacity: displaySpecs?.battery?.capacity,
      totalPower: displaySpecs?.motor?.totalPower,
    },
    variantNames,
    variantCapacities,
    variantPrices,
    colors: product.colors,
    colorImages,
    defaultColor: product.colors?.[0],
  };
}

// ============================================
// SEARCH AND FILTERING
// ============================================

/**
 * Search products by query string
 *
 * Performs relevance-based search across product name, brand, series,
 * and description. Results are scored and sorted by relevance.
 *
 * Scoring:
 * - Name match: +10 points per term
 * - Brand match: +5 points per term
 * - Series match: +5 points per term
 * - General text match: +1 point per term
 *
 * @param products - Array of products to search
 * @param query - Search query string
 * @param limit - Maximum number of results (default: 10)
 * @returns Array of matching products sorted by relevance
 */
export function searchProducts(
  products: Product[],
  query: string,
  limit = 10
): Product[] {
  if (!query.trim()) return [];

  const searchTerms = query.toLowerCase().trim().split(/\s+/);

  return products
    .map((product) => {
      const searchableText = [
        product.name,
        product.brand,
        product.series,
        product.description || '',
      ]
        .join(' ')
        .toLowerCase();

      // Calculate relevance score
      let score = 0;
      for (const term of searchTerms) {
        if (product.name.toLowerCase().includes(term)) score += 10;
        if (product.brand?.toLowerCase().includes(term)) score += 5;
        if (product.series?.toLowerCase().includes(term)) score += 5;
        if (searchableText.includes(term)) score += 1;
      }

      return { product, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ product }) => product);
}

/**
 * Get products grouped by series
 *
 * Groups products based on their series field and sorts within each group
 * by price (descending). Requires a series detector function to map products
 * to series IDs.
 *
 * @param products - Array of products to group
 * @param detectSeriesId - Function that maps a product to a series ID
 * @returns Map of series ID to products array
 */
export function getProductsBySeries(
  products: Product[],
  detectSeriesId: (product: Product) => string
): Map<string, Product[]> {
  const grouped = new Map<string, Product[]>();

  for (const product of products) {
    const seriesId = detectSeriesId(product);
    const existing = grouped.get(seriesId) || [];
    existing.push(product);
    grouped.set(seriesId, existing);
  }

  // Sort products within each series by price (descending)
  for (const [seriesId, seriesProducts] of grouped) {
    grouped.set(
      seriesId,
      seriesProducts.sort((a, b) => b.priceUsdCents - a.priceUsdCents)
    );
  }

  return grouped;
}

/**
 * Get series in display order
 *
 * Returns series configurations sorted by their order field.
 * Lower order values appear first.
 *
 * @param seriesConfigs - Array of series configurations
 * @returns Series configs sorted by order
 */
export function getSeriesInOrder(seriesConfigs: SeriesConfig[]): SeriesConfig[] {
  return [...seriesConfigs].sort((a, b) => a.order - b.order);
}

/**
 * Get series configuration by ID
 *
 * @param seriesConfigs - Array of series configurations
 * @param seriesId - ID of the series to find
 * @returns Matching series config or undefined
 */
export function getSeriesConfig(
  seriesConfigs: SeriesConfig[],
  seriesId: string
): SeriesConfig | undefined {
  return seriesConfigs.find((s) => s.id === seriesId);
}
