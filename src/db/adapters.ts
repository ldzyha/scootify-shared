/**
 * Adapters to convert between old and new product schemas
 * 
 * This allows existing components to work with the new database schema
 * without requiring rewrites.
 */

import type { Product as OldProduct, ProductSpecs as OldProductSpecs } from '../types/product';
import type { Product, Scooter, Accessory } from './schema';

/**
 * Convert new DB product to old Product type for component compatibility
 */
export function toComponentProduct(product: Product): OldProduct {
  const isScooter = product.productType === 'scooter';
  const scooter = isScooter ? (product as Scooter) : null;

  return {
    id: product.id,
    sku: product.sku,
    slug: product.slug,
    name: product.name,
    brand: product.brandId, // Map brandId to brand
    series: scooter?.series,
    model: scooter?.model || product.name,
    shortDescription: product.shortDescription || undefined,
    description: product.description || undefined,
    categoryId: product.categoryIds[0] || '',
    categoryIds: product.categoryIds,
    // Support both formats: cents (hysco/nami) and dollars (scootify)
    priceUsdCents: product.priceUsdCents,
    originalPriceUsdCents: product.originalPriceUsdCents || undefined,
    priceUSD: product.priceUsdCents ? product.priceUsdCents / 100 : 0,
    compareAtPriceUSD: product.originalPriceUsdCents ? product.originalPriceUsdCents / 100 : undefined,
    inStock: product.availability === 'in_stock',
    stockCount: product.stockQuantity || undefined,
    shippingDays: 14, // Default
    preorder: product.availability === 'pre_order',
    discontinued: product.availability === 'discontinued',
    hidden: product.availability === 'discontinued',
    purchaseModel: product.purchaseModel,
    prepaymentTerms: product.metadata?.prepaymentTerms,
    
    // Map new media format to old images format
    // Support both formats: array of objects (hysco/nami) and array of strings (scootify)
    images: product.media.images, // Simple array of URLs for scootify
    imagesDetailed: product.media.images.map((url, index) => ({
      url,
      alt: `${product.name} - зображення ${index + 1}`,
      isMain: index === 0,
    })),
    
    videos: product.media.videos.length > 0 ? product.media.videos : undefined,
    youtubeVideoId: product.media.youtubeIds[0],
    
    // Map colors for scooters with color options
    // Handle both string[] (old format) and Color[] (new format)
    colors: isScooter && scooter?.colors 
      ? scooter.colors.map(c => typeof c === 'string' ? c : c.id)
      : undefined,
    
    // Map color hex values for outline/border display
    colorHexMap: isScooter && scooter?.colors
      ? scooter.colors.reduce((acc, c) => {
          if (typeof c !== 'string' && c.hex) {
            acc[c.id] = c.hex;
          }
          return acc;
        }, {} as Record<string, string>)
      : undefined,
    
    // Map variants - create default variant if none exist
    // Support both cents and dollars formats
    variants: (() => {
      const mappedVariants = isScooter 
        ? scooter!.variants?.map(v => ({
            id: v.id,
            name: v.name,
            sku: v.sku,
            price: v.priceUsdCents || 0, // hysco/nami expect cents as 'price'
            originalPrice: v.originalPriceUsdCents || undefined,
            priceUsdCents: v.priceUsdCents,
            originalPriceUsdCents: v.originalPriceUsdCents || undefined,
            priceUSD: v.priceUsdCents ? v.priceUsdCents / 100 : undefined,
            compareAtPriceUSD: v.originalPriceUsdCents ? v.originalPriceUsdCents / 100 : undefined,
            inStock: v.inStock,
            stockCount: v.stockQuantity || undefined,
            specsOverride: v.specsOverride ? toOldSpecsPartial(v.specsOverride) : undefined,
            attributes: {
              color: scooter!.colors?.find(c => c.variantId === v.id)?.id,
            },
          }))
        : (product as Accessory).variants?.map(v => ({
            id: v.id,
            name: v.name,
            sku: v.sku,
            price: v.priceUsdCents || 0,
            originalPrice: v.originalPriceUsdCents || undefined,
            priceUsdCents: v.priceUsdCents,
            originalPriceUsdCents: v.originalPriceUsdCents || undefined,
            priceUSD: v.priceUsdCents ? v.priceUsdCents / 100 : undefined,
            compareAtPriceUSD: v.originalPriceUsdCents ? v.originalPriceUsdCents / 100 : undefined,
            inStock: v.inStock,
            stockCount: v.stockQuantity || undefined,
            attributes: {},
          }));
      
      // If no variants, create a default variant with product-level pricing
      if (!mappedVariants || mappedVariants.length === 0) {
        return [{
          id: product.id,
          name: 'Default',
          sku: product.sku,
          price: product.priceUsdCents || 0,
          originalPrice: product.originalPriceUsdCents || undefined,
          priceUsdCents: product.priceUsdCents,
          originalPriceUsdCents: product.originalPriceUsdCents || undefined,
          priceUSD: product.priceUsdCents ? product.priceUsdCents / 100 : 0,
          compareAtPriceUSD: product.originalPriceUsdCents ? product.originalPriceUsdCents / 100 : undefined,
          inStock: product.availability === 'in_stock',
          stockCount: product.stockQuantity || undefined,
          attributes: {}, // Empty attributes for scootify compatibility
        }];
      }
      
      return mappedVariants;
    })(),
    
    // Map specs for scooters
    specs: isScooter ? toOldSpecs(scooter!) : undefined,
    
    // Warranty
    warranty: product.warranty 
      ? {
          months: parseInt(product.warranty.replace(/\D/g, '')) || 6,
        }
      : undefined,
    
    // Related products
    relatedProducts: product.relatedProductIds?.length > 0 ? product.relatedProductIds : undefined,
    
    // Rating
    rating: product.rating
      ? {
          average: product.rating,
          count: product.reviewCount,
        }
      : undefined,
  };
}

/**
 * Convert partial ScooterSpecs override to old ProductSpecs format
 * Used for variant-level spec overrides (e.g., different battery capacity)
 */
function toOldSpecsPartial(override: Partial<import('./schema').ScooterSpecs>): Partial<OldProductSpecs> {
  const result: Partial<OldProductSpecs> = {};

  if (override.battery) {
    result.battery = {
      voltage: override.battery.voltage || undefined,
      capacity: override.battery.capacityAh || undefined,
      wattHours: override.battery.wattHours || undefined,
      cells: override.battery.cells || undefined,
      chargeTime: override.battery.chargeTimeMin && override.battery.chargeTimeMax
        ? { min: override.battery.chargeTimeMin, max: override.battery.chargeTimeMax }
        : undefined,
      chargerSpec: override.battery.chargerSpec || undefined,
    };
  }

  if (override.performance) {
    result.performance = {
      maxSpeed: override.performance.maxSpeed || undefined,
      range: override.performance.range || undefined,
      maxIncline: override.performance.maxIncline || undefined,
      maxLoad: override.performance.maxLoad || undefined,
    };
  }

  if (override.safety) {
    result.safety = {
      waterRating: override.safety.ipRating as any || undefined,
    };
  }

  if (override.motor) {
    result.motor = {
      count: override.motor.count || undefined,
      powerPerMotor: override.motor.powerPerMotor || undefined,
      totalPower: override.motor.totalPower || undefined,
      type: override.motor.type as any || undefined,
    };
  }

  return result;
}

/**
 * Convert new scooter specs to old ProductSpecs format
 */
function toOldSpecs(scooter: Scooter): OldProductSpecs {
  return {
    performance: {
      maxSpeed: scooter.specs.performance.maxSpeed || undefined,
      maxSpeedLimited: scooter.specs.performance.maxSpeedLimited || undefined,
      range: scooter.specs.performance.range || undefined,
      maxIncline: scooter.specs.performance.maxIncline || undefined,
      maxLoad: scooter.specs.performance.maxLoad || undefined,
    },
    
    motor: {
      count: scooter.specs.motor.count || undefined,
      powerPerMotor: scooter.specs.motor.powerPerMotor || undefined,
      totalPower: scooter.specs.motor.totalPower || undefined,
      type: scooter.specs.motor.type as any || undefined,
    },
    
    battery: {
      voltage: scooter.specs.battery.voltage || undefined,
      voltageMin: scooter.specs.battery.voltageMin || undefined,
      capacity: scooter.specs.battery.capacityAh || undefined, // Map capacityAh to capacity
      capacityMin: scooter.specs.battery.capacityAhMin || undefined,
      wattHours: scooter.specs.battery.wattHours || undefined,
      cells: scooter.specs.battery.cells || undefined,
      chargeTime: scooter.specs.battery.chargeTimeMin && scooter.specs.battery.chargeTimeMax
        ? { min: scooter.specs.battery.chargeTimeMin, max: scooter.specs.battery.chargeTimeMax }
        : undefined,
      chargerSpec: scooter.specs.battery.chargerSpec || undefined,
    },
    
    physical: {
      weight: scooter.specs.chassis.weight || undefined,
      wheelSize: scooter.specs.chassis.wheelSize || undefined,
      wheelType: scooter.specs.chassis.wheelType as any || undefined,
      foldable: scooter.specs.chassis.foldable || undefined,
    },
    
    safety: {
      waterRating: scooter.specs.safety.ipRating as any || undefined,
      brakeType: scooter.specs.chassis.brakeType || undefined,
      brakePistons: scooter.specs.chassis.brakePistons || undefined,
      suspensionFront: scooter.specs.chassis.suspensionFront as any || undefined,
      suspensionRear: scooter.specs.chassis.suspensionRear as any || undefined,
      suspensionAdjustable: scooter.specs.chassis.suspensionAdjustable || undefined,
    },
    
    features: {
      display: scooter.specs.electronics.display ? true : undefined,
      cruiseControl: scooter.specs.electronics.cruiseControl || undefined,
      nfc: scooter.specs.electronics.nfc || undefined,
      app: scooter.specs.electronics.app || undefined,
      rgbLeds: scooter.specs.electronics.rgbLeds || undefined,
      alarm: scooter.specs.electronics.alarm || undefined,
      alarmWithWheelLock: scooter.specs.electronics.alarmWithWheelLock || undefined,
      regenerativeBrake: scooter.specs.electronics.regenerativeBrake || undefined,
      turnSignals: scooter.specs.safety.turnSignals || undefined,
      dualMotorMode: scooter.specs.electronics.dualMotorMode || undefined,
    },
    
    shipping: scooter.specs.shipping ? {
      weightKg: scooter.specs.shipping.weightKg,
      seatsAmount: scooter.specs.shipping.seatsAmount,
      boxes: scooter.specs.shipping.boxes.map(box => {
        // Parse dimensions string "140x75x70" to individual values
        const [length, width, height] = box.dimensions.split('x').map(Number);
        return {
          lengthCm: length,
          widthCm: width,
          heightCm: height,
          weightKg: box.weightKg,
        };
      }),
      cargoDescription: scooter.specs.shipping.cargoDescription || undefined,
      cargoType: scooter.specs.shipping.cargoType || undefined,
    } : undefined,
  };
}

/**
 * Batch convert array of products
 */
export function toComponentProducts(products: Product[]): OldProduct[] {
  return products.map(toComponentProduct);
}
