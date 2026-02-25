/**
 * Product type definitions for e-scooter e-commerce
 * Base types shared across all sites
 */

export interface ProductImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
  isMain?: boolean;
}

export interface ProductSpecs {
  performance?: {
    maxSpeed?: number;
    maxSpeedLimited?: number;
    range?: number;
    acceleration025?: number;
    brakingDistance?: number;
    maxIncline?: number;
    maxLoad?: number;
  };
  motor?: {
    count?: number;
    powerPerMotor?: number;
    peakPower?: number;
    totalPower?: number;
    controller?: string;
    type?: 'hub' | 'belt' | 'chain';
  };
  battery?: {
    voltage?: number;
    voltageMin?: number;
    capacity?: number;
    capacityMin?: number;
    wattHours?: number;
    cells?: string;
    chargeTime?: { min: number; max: number };
    chargerSpec?: string;
    waterRating?: 'IPX4' | 'IPX5' | 'IPX6' | 'IPX7';
  };
  physical?: {
    weight?: number;
    wheelSize?: number;
    wheelType?: 'pneumatic' | 'solid' | 'tubeless';
    tireSpec?: string;
    foldable?: boolean;
    dimensions?: { length: number; width: number; height: number };
    foldedDimensions?: { length: number; width: number; height: number };
  };
  safety?: {
    waterRating?: 'IPX4' | 'IPX5' | 'IPX6' | 'IPX7';
    brakeType?: string;
    brakePistons?: number;
    suspensionFront?: 'none' | 'spring' | 'hydraulic' | 'inverted fork';
    suspensionRear?: 'none' | 'spring' | 'hydraulic';
    suspensionAdjustable?: boolean;
    frameType?: string;
    steeringColumn?: string;
    dashboardProtection?: string;
  };
  features?: {
    display?: boolean;
    cruiseControl?: boolean;
    nfc?: boolean;
    app?: boolean;
    rgbLeds?: boolean;
    alarm?: boolean;
    alarmWithWheelLock?: boolean;
    regenerativeBrake?: boolean;
    turnSignals?: boolean;
    dualMotorMode?: boolean;
  };
  shipping?: {
    /** Total weight including packaging, in kg */
    weightKg: number;
    /** Number of boxes/parcels this product ships in */
    seatsAmount: number;
    /** Dimensions of each box/seat */
    boxes: Array<{
      /** Length in cm */
      lengthCm: number;
      /** Width in cm */
      widthCm: number;
      /** Height in cm */
      heightCm: number;
      /** Weight of this specific box in kg */
      weightKg: number;
    }>;
    /** Optional: cargo description for waybill */
    cargoDescription?: string;
    /** Optional: cargo type override (default 'Cargo') */
    cargoType?: 'Cargo' | 'Documents' | 'TiresWheels' | 'Pallet';
  };
}

export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  price: number; // USD cents
  originalPrice?: number; // USD cents
  inStock: boolean;
  stockCount?: number;
  specsOverride?: Partial<ProductSpecs>;
}

export interface ProductWarranty {
  months: number;
  batteryMonths?: number;
  conditions?: string;
}

export interface Product {
  id: string;
  sku: string;
  slug: string;
  name: string;
  brand: string;
  series?: string;
  model: string;
  shortDescription?: string;
  description?: string;
  categoryId: string;
  categoryIds?: string[];
  priceUsdCents: number;
  originalPriceUsdCents?: number;
  inStock: boolean;
  stockCount?: number;
  shippingDays: number;
  preorder?: boolean;
  hidden?: boolean;
  discontinued?: boolean; // hiley-specific
  /**
   * Purchase model: determines how customers can acquire this product
   * - 'direct': Standard purchase flow with full checkout (parts/accessories)
   * - 'consultation': Consultation request only (e-scooters requiring expert guidance)
   * @default 'direct' if not specified
   */
  purchaseModel?: 'direct' | 'consultation';
  /** Prepayment terms for scooters */
  prepaymentTerms?: {
    type: 'fixed' | 'percentage';
    amount: number;
    description?: string;
  };
  images: ProductImage[];
  videos?: string[];
  youtubeVideoId?: string;
  variants?: ProductVariant[];
  colors?: string[];
  colorHexMap?: Record<string, string>;
  colorImages?: Record<string, ProductImage[]>;
  specs?: ProductSpecs;
  warranty?: ProductWarranty;
  legalNotice?: string;
  relatedProducts?: string[];
  rating?: {
    average: number;
    count: number;
  };
}

export interface ProductTileData {
  id: string;
  name: string;
  slug: string;
  tagline?: string;
  priceUsdCents: number;
  originalPriceUsdCents?: number;
  thumbnail: string;
  hoverImage?: string;
  inStock?: boolean;
  specs?: {
    maxSpeed?: number;
    range?: number;
    voltage?: number;
    capacity?: number;
    totalPower?: number;
  };
  // hiley extended fields (optional)
  variantNames?: string[];
  variantCapacities?: number[];
  variantPrices?: number[];
  colors?: string[];
  colorHexMap?: Record<string, string>;
  colorImages?: Record<string, string>;
  defaultColor?: string;
}

export interface ProductVideo {
  id: string;
  type: 'youtube';
  thumbnail?: string;
  aspectRatio?: '16/9' | '9/16' | '4/3';
}

// Per-site product videos mapping (override this in each site)
export type ProductVideosMap = Record<string, ProductVideo[]>;
