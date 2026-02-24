/**
 * Unified Product Database Schema
 * 
 * This schema supports both electric scooters and accessories with a flexible,
 * extensible structure. All prices are stored in USD cents (integer).
 * 
 * Design principles:
 * - Bilingual support (English + Ukrainian) for all text fields
 * - Explicit null values for missing data (not undefined)
 * - All spec groups and fields are optional
 * - Payload CMS compatible structure
 * - Type-safe enums and literals
 */

/**
 * Domain type literal representing all product domains
 * Updated to include full domain names for multi-site support
 */
export type DomainKey = 'us' | 'uk' | 'ua' | 'pl' | 'hiley.com.ua' | 'hysco.com.ua' | 'nami.com.ua' | 'scootify.com.ua';

/**
 * Product availability status
 * - in_stock: Available for immediate purchase
 * - pre_order: Available for pre-order
 * - out_of_stock: Currently unavailable
 * - discontinued: No longer manufactured
 */
export type AvailabilityStatus = 'in_stock' | 'pre_order' | 'out_of_stock' | 'discontinued';

/**
 * Purchase model for the product
 * - direct: Can be purchased directly online
 * - consultation: Requires consultation before purchase
 */
export type PurchaseModel = 'direct' | 'consultation';

/**
 * Brand entity representing manufacturers and vendors
 */
export interface Brand {
  /** Unique identifier */
  id: string;
  
  /** URL-friendly identifier */
  slug: string;
  
  /** Brand name in English */
  name: string;
  
  /** Brand name in Ukrainian */
  nameUk: string;
  
  /** Brand logo URL */
  logo: string | null;
  
  /** Official website URL */
  website: string | null;
  
  /** Country of origin/headquarters */
  country: string | null;
  
  /** Whether the brand is currently active */
  active: boolean;
  
  /** Creation timestamp */
  createdAt: Date;
  
  /** Last update timestamp */
  updatedAt: Date;
}

/**
 * Category axis type for product taxonomy
 * - product_type: What the product is (e.g., "Electric Scooter", "Helmet")
 * - tier: Quality/price tier (e.g., "Budget", "Premium")
 * - use_case: Primary use case (e.g., "Commuting", "Off-road")
 */
export type CategoryAxis = 'product_type' | 'tier' | 'use_case';

/**
 * Category entity with hierarchical support and axis classification
 */
export interface Category {
  /** Unique identifier */
  id: string;
  
  /** URL-friendly identifier */
  slug: string;
  
  /** Category name in English */
  name: string;
  
  /** Category name in Ukrainian */
  nameUk: string;
  
  /** Category description in English */
  description: string | null;
  
  /** Category description in Ukrainian */
  descriptionUk: string | null;
  
  /** Category axis classification */
  axis: CategoryAxis;
  
  /** Parent category ID for hierarchical structure */
  parentId: string | null;
  
  /** Display order */
  order: number;
  
  /** Whether the category is currently active */
  active: boolean;
  
  /** Creation timestamp */
  createdAt: Date;
  
  /** Last update timestamp */
  updatedAt: Date;
}

/**
 * Product media assets including images, videos, and YouTube content
 */
export interface ProductMedia {
  /** Array of product image URLs */
  images: string[];
  
  /** Array of product video URLs */
  videos: string[];
  
  /** Array of YouTube video IDs */
  youtubeIds: string[];
  
  /** Optional color-specific images mapped by color name */
  colorImages?: Record<string, string[]>;
}

/**
 * SEO metadata for product pages
 */
export interface SeoMetadata {
  /** Meta title in English */
  title: string | null;
  
  /** Meta title in Ukrainian */
  titleUk: string | null;
  
  /** Meta description in English */
  description: string | null;
  
  /** Meta description in Ukrainian */
  descriptionUk: string | null;
  
  /** Keywords for search engines */
  keywords: string[];
  
  /** Open Graph image URL */
  ogImage: string | null;
}

/**
 * Range helper type for numeric range queries
 */
export interface Range {
  /** Minimum value (inclusive) */
  min?: number;
  
  /** Maximum value (inclusive) */
  max?: number;
}

/**
 * Base product interface with shared fields for all product types
 */
export interface BaseProduct {
  // ===== Identity =====
  /** Unique identifier */
  id: string;
  
  /** URL-friendly identifier */
  slug: string;
  
  /** Stock Keeping Unit */
  sku: string;
  
  /** Brand reference */
  brandId: string;
  
  // ===== Descriptions =====
  /** Product name in English */
  name: string;
  
  /** Product name in Ukrainian */
  nameUk: string;
  
  /** Short description in English (1-2 sentences) */
  shortDescription: string | null;
  
  /** Short description in Ukrainian */
  shortDescriptionUk: string | null;
  
  /** Full description in English (markdown supported) */
  description: string | null;
  
  /** Full description in Ukrainian (markdown supported) */
  descriptionUk: string | null;
  
  // ===== Pricing (all in USD cents) =====
  /** Base price in USD cents */
  priceUsdCents: number;
  
  /** Original price before discount in USD cents */
  originalPriceUsdCents: number | null;
  
  /** Cost of goods sold in USD cents */
  costUsdCents: number | null;
  
  // ===== Availability & Commerce =====
  /** Current availability status */
  availability: AvailabilityStatus;
  
  /** Purchase model */
  purchaseModel: PurchaseModel;
  
  /** Available stock quantity */
  stockQuantity: number | null;
  
  /** Low stock threshold for alerts */
  lowStockThreshold: number | null;
  
  /** Whether the product is featured */
  featured: boolean;
  
  /** Display order */
  order: number;
  
  // ===== Taxonomy =====
  /** Category IDs this product belongs to */
  categoryIds: string[];
  
  /** Product tags for filtering and search */
  tags: string[];
  
  // ===== Domains =====
  /** Domains where this product is available */
  domains: DomainKey[];
  
  // ===== Media =====
  /** Product media assets */
  media: ProductMedia;
  
  // ===== SEO =====
  /** SEO metadata */
  seo: SeoMetadata;
  
  // ===== Additional Info =====
  /** Warranty information in English */
  warranty: string | null;
  
  /** Warranty information in Ukrainian */
  warrantyUk: string | null;
  
  /** Average rating (0-5) */
  rating: number | null;
  
  /** Number of reviews */
  reviewCount: number;
  
  // ===== Metadata =====
  /** Whether the product is currently active */
  active: boolean;
  
  /** Creation timestamp */
  createdAt: Date;
  
  /** Last update timestamp */
  updatedAt: Date;
  
  /** Additional metadata as key-value pairs */
  metadata: Record<string, any>;
}

// ===== SCOOTER SPECIFICATIONS =====

/**
 * Motor specifications for electric scooters
 */
export interface MotorSpecs {
  /** Number of motors */
  count: number | null;
  
  /** Power per motor in watts */
  powerPerMotor: number | null;
  
  /** Total power in watts */
  totalPower: number | null;
  
  /** Peak power in watts */
  peakPower: number | null;
  
  /** Motor type (e.g., "Brushless DC", "Hub Motor") */
  type: string | null;
}

/**
 * Battery specifications for electric scooters
 */
export interface BatterySpecs {
  /** Battery voltage in volts */
  voltage: number | null;
  
  /** Minimum voltage in volts */
  voltageMin: number | null;
  
  /** Battery capacity in amp-hours */
  capacityAh: number | null;
  
  /** Minimum capacity in amp-hours */
  capacityAhMin: number | null;
  
  /** Battery capacity in watt-hours */
  wattHours: number | null;
  
  /** Battery cell configuration (e.g., "21700", "18650") */
  cells: string | null;
  
  /** Minimum charge time in hours */
  chargeTimeMin: number | null;
  
  /** Maximum charge time in hours */
  chargeTimeMax: number | null;
  
  /** Charger specifications (e.g., "54.6V 3A") */
  chargerSpec: string | null;
}

/**
 * Performance specifications for electric scooters
 */
export interface PerformanceSpecs {
  /** Maximum speed in km/h */
  maxSpeed: number | null;
  
  /** Limited maximum speed in km/h (for compliance) */
  maxSpeedLimited: number | null;
  
  /** Maximum range in kilometers */
  range: number | null;
  
  /** Maximum incline in degrees */
  maxIncline: number | null;
  
  /** Maximum load capacity in kilograms */
  maxLoad: number | null;
}

/**
 * Chassis and physical specifications for electric scooters
 */
export interface ChassisSpecs {
  /** Product weight in kilograms */
  weight: number | null;
  
  /** Wheel size in inches */
  wheelSize: number | null;
  
  /** Wheel type (e.g., "Pneumatic", "Solid", "Honeycomb") */
  wheelType: string | null;
  
  /** Whether the scooter is foldable */
  foldable: boolean | null;
  
  /** Dimensions in format "LxWxH cm" */
  dimensions: string | null;
  
  /** Folded dimensions in format "LxWxH cm" */
  foldedDimensions: string | null;
  
  /** Brake type (e.g., "Disc", "Drum", "Electronic") */
  brakeType: string | null;
  
  /** Number of brake pistons */
  brakePistons: number | null;
  
  /** Front suspension type */
  suspensionFront: string | null;
  
  /** Rear suspension type */
  suspensionRear: string | null;
  
  /** Whether suspension is adjustable */
  suspensionAdjustable: boolean | null;
}

/**
 * Electronics and smart features for electric scooters
 */
export interface ElectronicsSpecs {
  /** Display type (e.g., "LED", "LCD", "OLED") */
  display: string | null;
  
  /** NFC support */
  nfc: boolean | null;
  
  /** Mobile app support */
  app: boolean | null;
  
  /** Alarm system */
  alarm: boolean | null;
  
  /** Alarm with wheel lock feature */
  alarmWithWheelLock: boolean | null;
  
  /** Cruise control feature */
  cruiseControl: boolean | null;
  
  /** Regenerative braking */
  regenerativeBrake: boolean | null;
  
  /** Dual motor mode switching */
  dualMotorMode: boolean | null;
  
  /** RGB LED lights */
  rgbLeds: boolean | null;
}

/**
 * Safety features for electric scooters
 */
export interface SafetySpecs {
  /** IP rating for water/dust resistance (e.g., "IPX4", "IP54") */
  ipRating: string | null;
  
  /** Turn signal indicators */
  turnSignals: boolean | null;
  
  /** Reflectors for visibility */
  reflectors: boolean | null;
  
  /** Horn/bell */
  horn: boolean | null;
}

/**
 * Shipping box information
 */
export interface ShippingBox {
  /** Box dimensions in format "LxWxH cm" */
  dimensions: string;
  
  /** Box weight in kilograms */
  weightKg: number;
}

/**
 * Shipping and logistics specifications
 */
export interface ShippingSpecs {
  /** Total shipping weight in kilograms */
  weightKg: number | null;
  
  /** Number of seats (for seated scooters) */
  seatsAmount: number | null;
  
  /** Array of shipping boxes */
  boxes: ShippingBox[];
  
  /** Cargo description */
  cargoDescription: string | null;
  
  /** Cargo type classification */
  cargoType: string | null;
}

/**
 * Complete scooter specifications containing all spec groups
 */
export interface ScooterSpecs {
  /** Motor specifications */
  motor?: MotorSpecs;
  
  /** Battery specifications */
  battery?: BatterySpecs;
  
  /** Performance specifications */
  performance?: PerformanceSpecs;
  
  /** Chassis specifications */
  chassis?: ChassisSpecs;
  
  /** Electronics specifications */
  electronics?: ElectronicsSpecs;
  
  /** Safety specifications */
  safety?: SafetySpecs;
  
  /** Shipping specifications */
  shipping?: ShippingSpecs;
}

/**
 * Scooter variant with specifications override capability
 */
export interface ScooterColor {
  /** Color identifier (e.g., 'orange', 'black') */
  id: string;
  /** Display name (e.g., 'Sunlight Orange') */
  name: string;
  /** Ukrainian name */
  nameUk: string;
  /** Hex color value for UI (e.g., '#FF8C42') */
  hex: string;
  /** Associated variant ID, if color maps to a variant */
  variantId?: string;
}

export interface ScooterVariant {
  /** Variant unique identifier */
  id: string;
  
  /** Variant name (e.g., "Standard", "Pro", "Max") */
  name: string;
  
  /** Variant name in Ukrainian */
  nameUk: string;
  
  /** Variant-specific SKU */
  sku: string;
  
  /** Variant price in USD cents */
  priceUsdCents: number;
  
  /** Original price before discount in USD cents */
  originalPriceUsdCents: number | null;
  
  /** Whether this variant is in stock */
  inStock: boolean;
  
  /** Available stock quantity */
  stockQuantity: number | null;
  
  /** Specifications that override base product specs */
  specsOverride?: Partial<ScooterSpecs>;
  
  /** Variant-specific images */
  images: string[];
  
  /** Display order */
  order: number;
}

/**
 * Electric scooter product extending base product with scooter-specific fields
 */
export interface Scooter extends BaseProduct {
  /** Product type discriminator */
  productType: 'scooter';
  
  /** Product series/family (e.g., "GT Series", "Mantis") */
  series: string | null;
  
  /** Model name/number */
  model: string | null;
  
  /** Complete scooter specifications */
  specs: ScooterSpecs;
  
  /** Available variants */
  variants: ScooterVariant[];
  
  /** Available colors (string IDs or full Color objects with hex) */
  colors: (string | ScooterColor)[];
  
  /** Key highlights/features in English */
  highlights: string[];
  
  /** Key highlights/features in Ukrainian */
  highlightsUk: string[];
  
  /** Related product IDs (for cross-selling) */
  relatedProductIds: string[];
}

// ===== ACCESSORY SPECIFICATIONS =====

/**
 * Accessory variant with simpler structure than scooter variants
 */
export interface AccessoryVariant {
  /** Variant unique identifier */
  id: string;
  
  /** Variant name (e.g., "Small", "Medium", "Large", "Black", "White") */
  name: string;
  
  /** Variant name in Ukrainian */
  nameUk: string;
  
  /** Variant-specific SKU */
  sku: string;
  
  /** Variant price in USD cents */
  priceUsdCents: number;
  
  /** Original price before discount in USD cents */
  originalPriceUsdCents: number | null;
  
  /** Whether this variant is in stock */
  inStock: boolean;
  
  /** Available stock quantity */
  stockQuantity: number | null;
  
  /** Variant-specific images */
  images: string[];
  
  /** Display order */
  order: number;
}

/**
 * Accessory product extending base product with accessory-specific fields
 */
export interface Accessory extends BaseProduct {
  /** Product type discriminator */
  productType: 'accessory';
  
  /** Product weight in kilograms */
  weight: number | null;
  
  /** Compatible product IDs (scooter IDs this accessory works with) */
  compatibility: string[];
  
  /** Available variants (sizes, colors, etc.) */
  variants: AccessoryVariant[];
  
  /** Additional specifications as key-value pairs */
  specifications: Record<string, string>;
}

/**
 * Union type for all product types
 */
export type Product = Scooter | Accessory;

/**
 * Type guard to check if a product is a scooter
 */
export function isScooter(product: Product): product is Scooter {
  return product.productType === 'scooter';
}

/**
 * Type guard to check if a product is an accessory
 */
export function isAccessory(product: Product): product is Accessory {
  return product.productType === 'accessory';
}
