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
    priceUsdCents: product.priceUsdCents,
    originalPriceUsdCents: product.originalPriceUsdCents || undefined,
    inStock: product.availability === 'in_stock',
    stockCount: product.stockQuantity || undefined,
    shippingDays: 14, // Default
    preorder: product.availability === 'pre_order',
    purchaseModel: product.purchaseModel,
    prepaymentTerms: product.metadata?.prepaymentTerms,
    
    // Map new media format to old images format
    images: product.media.images.map((url, index) => ({
      url,
      alt: `${product.name} - зображення ${index + 1}`,
      isMain: index === 0,
    })),
    
    videos: product.media.videos.length > 0 ? product.media.videos : undefined,
    youtubeVideoId: product.media.youtubeIds[0],
    
    // Map variants
    variants: isScooter 
      ? scooter!.variants?.map(v => ({
          id: v.id,
          name: v.name,
          sku: v.sku,
          price: v.priceUsdCents,
          originalPrice: v.originalPriceUsdCents || undefined,
          inStock: v.inStock,
          stockCount: v.stockQuantity || undefined,
        }))
      : (product as Accessory).variants?.map(v => ({
          id: v.id,
          name: v.name,
          sku: v.sku,
          price: v.priceUsdCents,
          originalPrice: v.originalPriceUsdCents || undefined,
          inStock: v.inStock,
          stockCount: v.stockQuantity || undefined,
        })),
    
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
