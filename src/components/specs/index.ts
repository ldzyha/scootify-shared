/**
 * Specs components for product specifications display
 * 
 * These components provide various ways to display product specifications:
 * - SpecsTable: Complete specs table with all product details
 * - BatterySpecs: Battery-focused display (voltage, capacity, range)
 * - MotorSpecs: Motor-focused display (power, type, count)
 * - ShippingSpecs: Shipping details for Nova Poshta
 * - SpecsHighlight: Key specs highlight for product cards
 * - SpecInfoButton: Info button with educational tooltips
 */

export { SpecsTable, type SpecsTableProps, type SpecRow, type SpecSection } from './SpecsTable';
export { BatterySpecs, type BatterySpecsProps } from './BatterySpecs';
export { MotorSpecs, type MotorSpecsProps } from './MotorSpecs';
export { ShippingSpecs, type ShippingSpecsProps } from './ShippingSpecs';
export { SpecsHighlight, type SpecsHighlightProps, type HighlightSpec, createSpecsFromProduct } from './SpecsHighlight';
export { SpecInfoButton, type SpecInfoButtonProps } from './SpecInfoButton';
