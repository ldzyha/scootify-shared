'use client';

import React from 'react';
import type { ProductVariant } from '@scootify/shared/types';
import styles from './VariantSelector.module.css';

/**
 * Variant option for the selector
 * Simplified interface for battery/model variants
 */
export interface VariantOption {
  /** Display name of the variant (e.g., "Standard", "Pro") */
  name: string;
  /** Battery capacity in Ah (Ampere-hours) */
  capacity: number;
  /** Price in USD cents */
  price: number;
  /** Original price in USD cents (if on sale) */
  originalPrice?: number;
}

/**
 * Props for VariantSelector component
 */
export interface VariantSelectorProps {
  /** Array of variant options to display */
  variants: VariantOption[];
  /** Index of the currently selected variant */
  selectedIndex: number;
  /** Callback when a variant is selected */
  onSelect: (index: number) => void;
  /** Optional voltage label to display (e.g., 60) */
  voltage?: number;
  /** Size variant of the selector */
  size?: 'sm' | 'md';
  /** Additional CSS class name */
  className?: string;
}

/**
 * VariantSelector - Battery/model variant selector for e-scooters
 * 
 * Displays a row of pill-style buttons for selecting product variants,
 * typically used for battery capacity options. Features metallic styling
 * with gray (unselected) and blue (selected) gradients.
 * 
 * @example
 * ```tsx
 * const variants = [
 *   { name: 'Standard', capacity: 20, price: 99900 },
 *   { name: 'Pro', capacity: 30, price: 119900 }
 * ];
 * 
 * <VariantSelector
 *   variants={variants}
 *   selectedIndex={0}
 *   onSelect={(index) => console.log('Selected:', index)}
 *   voltage={60}
 * />
 * ```
 * 
 * @component
 */
export function VariantSelector({
  variants,
  selectedIndex,
  onSelect,
  voltage,
  size = 'md',
  className = '',
}: VariantSelectorProps) {
  if (!variants || variants.length === 0) return null;

  return (
    <div className={`${styles.container} ${styles[size]} ${className}`}>
      {voltage && <span className={styles.voltage}>{voltage}V</span>}
      <div className={styles.pills}>
        {variants.map((variant, index) => {
          const isSelected = selectedIndex === index;
          return (
            <button
              key={variant.name}
              type="button"
              onClick={() => onSelect(index)}
              className={`${styles.pill} ${isSelected ? styles.selected : ''}`}
              aria-pressed={isSelected}
            >
              <span className={styles.name}>{variant.name}</span>
              <span className={styles.capacity}>{variant.capacity}Ah</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Helper function to convert ProductVariant to VariantOption
 * Maps full ProductVariant objects to the simplified VariantOption interface
 * 
 * @param variants - Array of ProductVariant objects
 * @returns Array of VariantOption objects
 * 
 * @example
 * ```tsx
 * const productVariants: ProductVariant[] = [...];
 * const options = productVariantsToOptions(productVariants);
 * <VariantSelector variants={options} ... />
 * ```
 */
export function productVariantsToOptions(
  variants: ProductVariant[]
): VariantOption[] {
  return variants.map((v) => ({
    name: v.name,
    capacity: v.specsOverride?.battery?.capacity || 0,
    price: v.price,
    originalPrice: v.originalPrice,
  }));
}

export default VariantSelector;
