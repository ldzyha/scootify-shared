/**
 * Product Validation and Data Quality Analysis
 * 
 * This module provides validation functions and data quality scoring
 * for products in the database.
 */

import type { Product, Scooter, Accessory } from './schema';
import { scooters } from './scooters';
import { accessories } from './accessories';
import { products } from './index';

// =============================================================================
// VALIDATION TYPES
// =============================================================================

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export interface FieldCompleteness {
  fieldName: string;
  filled: boolean;
  value: any;
}

export interface ProductCompleteness {
  productId: string;
  productName: string;
  productType: 'scooter' | 'accessory';
  totalFields: number;
  filledFields: number;
  completenessPercent: number;
  missingFields: string[];
  fields: FieldCompleteness[];
}

export interface DataQualityScore {
  productId: string;
  productName: string;
  overallScore: number; // 0-100
  scores: {
    requiredFields: number; // 0-100
    optionalFields: number; // 0-100
    mediaQuality: number; // 0-100
    descriptionQuality: number; // 0-100
    specCompleteness: number; // 0-100
  };
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
}

// =============================================================================
// FIELD DEFINITIONS
// =============================================================================

const REQUIRED_PRODUCT_FIELDS = [
  'id',
  'slug',
  'sku',
  'brandId',
  'name',
  'nameUk',
  'priceUsdCents',
  'domains',
  'categoryIds',
  'purchaseModel',
  'availability',
];

const OPTIONAL_PRODUCT_FIELDS = [
  'shortDescription',
  'shortDescriptionUk',
  'description',
  'descriptionUk',
  'originalPriceUsdCents',
  'featured',
  'tags',
  'warranty',
  'warrantyUk',
  'rating',
  'reviewCount',
];

const REQUIRED_SCOOTER_SPEC_FIELDS = [
  'specs.motor.totalPower',
  'specs.battery.voltage',
  'specs.battery.capacityAh',
  'specs.performance.maxSpeed',
  'specs.performance.range',
];

const OPTIONAL_SCOOTER_SPEC_FIELDS = [
  'specs.motor.count',
  'specs.motor.powerPerMotor',
  'specs.motor.peakPower',
  'specs.motor.type',
  'specs.battery.cells',
  'specs.battery.wattHours',
  'specs.performance.maxIncline',
  'specs.performance.maxLoad',
  'specs.chassis.weight',
  'specs.chassis.wheelSize',
  'specs.chassis.wheelType',
  'specs.chassis.brakeType',
  'specs.chassis.suspensionFront',
  'specs.chassis.suspensionRear',
  'specs.electronics.display',
  'specs.electronics.app',
  'specs.electronics.nfc',
  'specs.safety.ipRating',
  'specs.shipping.weightKg',
];

// =============================================================================
// VALIDATION FUNCTIONS
// =============================================================================

/**
 * Validate a product has all required fields
 */
export function validateProduct(product: Product): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check required fields
  REQUIRED_PRODUCT_FIELDS.forEach(field => {
    const value = getNestedValue(product, field);
    if (value === undefined || value === null || (Array.isArray(value) && value.length === 0)) {
      errors.push(`Missing required field: ${field}`);
    }
  });

  // Check price is positive
  if (product.priceUsdCents <= 0) {
    errors.push('Price must be positive');
  }

  // Check domains array
  if (product.domains.length === 0) {
    errors.push('Product must have at least one domain');
  }

  // Check categories
  if (product.categoryIds.length === 0) {
    warnings.push('Product has no categories assigned');
  }

  // Check optional but recommended fields
  if (!product.shortDescription && !product.shortDescriptionUk) {
    warnings.push('Missing short description');
  }

  if (!product.description && !product.descriptionUk) {
    warnings.push('Missing full description');
  }

  if (product.media.images.length === 0) {
    warnings.push('Product has no images');
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validate scooter-specific fields
 */
export function validateScooter(scooter: Scooter): ValidationResult {
  const baseResult = validateProduct(scooter);
  const errors = [...baseResult.errors];
  const warnings = [...baseResult.warnings];

  // Check required scooter specs
  REQUIRED_SCOOTER_SPEC_FIELDS.forEach(field => {
    const value = getNestedValue(scooter, field);
    if (value === undefined || value === null) {
      errors.push(`Missing required spec: ${field}`);
    }
  });

  // Validate spec values
  if (scooter.specs.motor.totalPower && scooter.specs.motor.totalPower <= 0) {
    errors.push('Motor power must be positive');
  }

  if (scooter.specs.battery.voltage && scooter.specs.battery.voltage <= 0) {
    errors.push('Battery voltage must be positive');
  }

  if (scooter.specs.performance.maxSpeed && scooter.specs.performance.maxSpeed <= 0) {
    errors.push('Max speed must be positive');
  }

  if (scooter.specs.performance.range && scooter.specs.performance.range <= 0) {
    errors.push('Range must be positive');
  }

  // Warnings for optional but useful fields
  if (!scooter.specs.motor.count) {
    warnings.push('Motor count not specified');
  }

  if (!scooter.specs.chassis.weight) {
    warnings.push('Weight not specified');
  }

  if (!scooter.series) {
    warnings.push('Series not specified');
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validate accessory-specific fields
 */
export function validateAccessory(accessory: Accessory): ValidationResult {
  const baseResult = validateProduct(accessory);
  const warnings = [...baseResult.warnings];

  // Accessories should have compatibility info
  if (!accessory.compatibility || accessory.compatibility.length === 0) {
    warnings.push('No compatibility information specified');
  }

  // Accessories should have weight
  if (!accessory.weight) {
    warnings.push('Weight not specified');
  }

  return {
    valid: baseResult.valid,
    errors: baseResult.errors,
    warnings,
  };
}

// =============================================================================
// COMPLETENESS ANALYSIS
// =============================================================================

/**
 * Calculate field completeness for a product
 */
export function getProductCompleteness(product: Product): ProductCompleteness {
  const fields: FieldCompleteness[] = [];
  const allFields = [...REQUIRED_PRODUCT_FIELDS, ...OPTIONAL_PRODUCT_FIELDS];

  // Add product fields
  allFields.forEach(field => {
    const value = getNestedValue(product, field);
    fields.push({
      fieldName: field,
      filled: value !== null && value !== undefined && value !== '',
      value,
    });
  });

  // Add scooter-specific fields if applicable
  if (product.productType === 'scooter') {
    const scooter = product as Scooter;
    [...REQUIRED_SCOOTER_SPEC_FIELDS, ...OPTIONAL_SCOOTER_SPEC_FIELDS].forEach(field => {
      const value = getNestedValue(scooter, field);
      fields.push({
        fieldName: field,
        filled: value !== null && value !== undefined && value !== '',
        value,
      });
    });
  }

  const filledFields = fields.filter(f => f.filled).length;
  const totalFields = fields.length;
  const missingFields = fields.filter(f => !f.filled).map(f => f.fieldName);

  return {
    productId: product.id,
    productName: product.name,
    productType: product.productType === 'scooter' ? 'scooter' : 'accessory',
    totalFields,
    filledFields,
    completenessPercent: Math.round((filledFields / totalFields) * 100),
    missingFields,
    fields,
  };
}

// =============================================================================
// DATA QUALITY SCORING
// =============================================================================

/**
 * Calculate data quality score for a product
 */
export function getDataQualityScore(product: Product): DataQualityScore {
  // 1. Required fields score (0-100)
  const requiredFieldsScore = calculateRequiredFieldsScore(product);

  // 2. Optional fields score (0-100)
  const optionalFieldsScore = calculateOptionalFieldsScore(product);

  // 3. Media quality score (0-100)
  const mediaQualityScore = calculateMediaQualityScore(product);

  // 4. Description quality score (0-100)
  const descriptionQualityScore = calculateDescriptionQualityScore(product);

  // 5. Spec completeness score (0-100) - only for scooters
  const specCompletenessScore = product.productType === 'scooter'
    ? calculateSpecCompletenessScore(product as Scooter)
    : 100; // Accessories don't have specs, so 100% by default

  // Overall score (weighted average)
  const overallScore = Math.round(
    requiredFieldsScore * 0.3 +
    optionalFieldsScore * 0.15 +
    mediaQualityScore * 0.2 +
    descriptionQualityScore * 0.15 +
    specCompletenessScore * 0.2
  );

  // Assign grade
  let grade: 'A' | 'B' | 'C' | 'D' | 'F';
  if (overallScore >= 90) grade = 'A';
  else if (overallScore >= 80) grade = 'B';
  else if (overallScore >= 70) grade = 'C';
  else if (overallScore >= 60) grade = 'D';
  else grade = 'F';

  return {
    productId: product.id,
    productName: product.name,
    overallScore,
    scores: {
      requiredFields: requiredFieldsScore,
      optionalFields: optionalFieldsScore,
      mediaQuality: mediaQualityScore,
      descriptionQuality: descriptionQualityScore,
      specCompleteness: specCompletenessScore,
    },
    grade,
  };
}

function calculateRequiredFieldsScore(product: Product): number {
  let filled = 0;
  REQUIRED_PRODUCT_FIELDS.forEach(field => {
    const value = getNestedValue(product, field);
    if (value !== null && value !== undefined && value !== '' && (!Array.isArray(value) || value.length > 0)) {
      filled++;
    }
  });
  return Math.round((filled / REQUIRED_PRODUCT_FIELDS.length) * 100);
}

function calculateOptionalFieldsScore(product: Product): number {
  let filled = 0;
  OPTIONAL_PRODUCT_FIELDS.forEach(field => {
    const value = getNestedValue(product, field);
    if (value !== null && value !== undefined && value !== '') {
      filled++;
    }
  });
  return Math.round((filled / OPTIONAL_PRODUCT_FIELDS.length) * 100);
}

function calculateMediaQualityScore(product: Product): number {
  let score = 0;

  // Images (60 points)
  if (product.media.images.length >= 5) score += 60;
  else if (product.media.images.length >= 3) score += 45;
  else if (product.media.images.length >= 1) score += 30;

  // Videos (20 points)
  if (product.media.videos.length > 0 || product.media.youtubeIds.length > 0) {
    score += 20;
  }

  // SEO image (20 points)
  if (product.seo.ogImage) {
    score += 20;
  }

  return score;
}

function calculateDescriptionQualityScore(product: Product): number {
  let score = 0;

  // Short description (30 points)
  if (product.shortDescription && product.shortDescriptionUk) {
    score += 30;
  } else if (product.shortDescription || product.shortDescriptionUk) {
    score += 15;
  }

  // Full description (50 points)
  if (product.description && product.descriptionUk) {
    score += 50;
  } else if (product.description || product.descriptionUk) {
    score += 25;
  }

  // Highlights (20 points)
  if (product.highlights && product.highlights.length > 0) {
    score += 20;
  }

  return score;
}

function calculateSpecCompletenessScore(scooter: Scooter): number {
  let filled = 0;
  const allSpecFields = [...REQUIRED_SCOOTER_SPEC_FIELDS, ...OPTIONAL_SCOOTER_SPEC_FIELDS];

  allSpecFields.forEach(field => {
    const value = getNestedValue(scooter, field);
    if (value !== null && value !== undefined && value !== '') {
      filled++;
    }
  });

  return Math.round((filled / allSpecFields.length) * 100);
}

// =============================================================================
// BATCH ANALYSIS
// =============================================================================

/**
 * Generate completeness report for all products
 */
export function generateCompletenessReport() {
  return products.map(getProductCompleteness);
}

/**
 * Generate quality scores for all products
 */
export function generateQualityReport() {
  return products.map(getDataQualityScore);
}

/**
 * Get summary statistics for the database
 */
export function getDatabaseQualitySummary() {
  const qualityScores = generateQualityReport();
  const completenessReport = generateCompletenessReport();

  const avgQuality = Math.round(
    qualityScores.reduce((sum, s) => sum + s.overallScore, 0) / qualityScores.length
  );

  const avgCompleteness = Math.round(
    completenessReport.reduce((sum, c) => sum + c.completenessPercent, 0) / completenessReport.length
  );

  const gradeDistribution = qualityScores.reduce((acc, s) => {
    acc[s.grade] = (acc[s.grade] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    totalProducts: products.length,
    totalScooters: scooters.length,
    totalAccessories: accessories.length,
    averageQualityScore: avgQuality,
    averageCompleteness: avgCompleteness,
    gradeDistribution,
    topProducts: qualityScores
      .sort((a, b) => b.overallScore - a.overallScore)
      .slice(0, 10)
      .map(s => ({ name: s.productName, score: s.overallScore, grade: s.grade })),
    lowestProducts: qualityScores
      .sort((a, b) => a.overallScore - b.overallScore)
      .slice(0, 10)
      .map(s => ({ name: s.productName, score: s.overallScore, grade: s.grade })),
  };
}

// =============================================================================
// HELPERS
// =============================================================================

function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((curr, key) => curr?.[key], obj);
}
