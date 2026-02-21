/**
 * Specs Utility Functions
 *
 * Compute derived values from base product specs.
 * All calculations are pure functions - no side effects.
 */

import type { ProductSpecs } from '../types/product';

// ============================================
// BATTERY COMPUTATIONS
// ============================================

/** Wh = V × Ah */
export function calcWattHours(voltage: number, capacity: number): number {
  return voltage * capacity;
}

/** kWh = Wh / 1000 */
export function calcKilowattHours(wattHours: number): number {
  return wattHours / 1000;
}

/** Approximate charge cost in UAH */
export function calcChargeCost(
  wattHours: number,
  tariffUahPerKwh = 4.32 // daytime tariff
): number {
  return (wattHours / 1000) * tariffUahPerKwh;
}

// ============================================
// MOTOR COMPUTATIONS
// ============================================

/** Total power = count × powerPerMotor */
export function calcTotalPower(count: number, powerPerMotor: number): number {
  return count * powerPerMotor;
}

/** Power in kW */
export function calcKilowatts(watts: number): number {
  return watts / 1000;
}

/** Horsepower equivalent */
export function calcHorsepower(watts: number): number {
  return watts * 0.00134102;
}

// ============================================
// EFFICIENCY COMPUTATIONS
// ============================================

/** Energy consumption Wh/km */
export function calcEnergyConsumption(wattHours: number, rangeKm: number): number {
  if (rangeKm <= 0) return 0;
  return wattHours / rangeKm;
}

/** Specific energy Wh/kg */
export function calcSpecificEnergy(wattHours: number, weightKg: number): number {
  if (weightKg <= 0) return 0;
  return wattHours / weightKg;
}

/** Power-to-weight ratio W/kg */
export function calcPowerToWeight(watts: number, weightKg: number): number {
  if (weightKg <= 0) return 0;
  return watts / weightKg;
}

// ============================================
// DISPLAY MODE TYPES
// ============================================

export type BatteryDisplayMode = 'ah' | 'wh' | 'kwh';
export type PowerDisplayMode = 'w' | 'kw' | 'hp';

// ============================================
// FORMATTING
// ============================================

export function formatBattery(
  voltage: number,
  capacity: number,
  mode: BatteryDisplayMode = 'ah'
): string {
  switch (mode) {
    case 'wh':
      return `${calcWattHours(voltage, capacity)} Wh`;
    case 'kwh':
      return `${calcKilowattHours(calcWattHours(voltage, capacity)).toFixed(2)} kWh`;
    default:
      return `${capacity} Ah`;
  }
}

export function formatPower(
  count: number,
  powerPerMotor: number,
  mode: PowerDisplayMode = 'w'
): string {
  const total = calcTotalPower(count, powerPerMotor);
  switch (mode) {
    case 'kw':
      return `${calcKilowatts(total).toFixed(1)} kW`;
    case 'hp':
      return `${calcHorsepower(total).toFixed(1)} к.с.`;
    default:
      return `${total} W`;
  }
}

// ============================================
// COMPUTED SPECS
// ============================================

export interface ComputedSpecs {
  wattHours?: number;
  kilowattHours?: number;
  totalPower?: number;
  kilowatts?: number;
  horsepower?: number;
  energyConsumption?: number; // Wh/km
  specificEnergy?: number; // Wh/kg
  powerToWeight?: number; // W/kg
}

export function getComputedSpecs(specs: ProductSpecs): ComputedSpecs {
  const result: ComputedSpecs = {};

  // Battery computations
  if (specs.battery?.voltage && specs.battery?.capacity) {
    result.wattHours = calcWattHours(specs.battery.voltage, specs.battery.capacity);
    result.kilowattHours = calcKilowattHours(result.wattHours);
  }

  // Motor computations
  if (specs.motor?.count && specs.motor?.powerPerMotor) {
    result.totalPower = calcTotalPower(specs.motor.count, specs.motor.powerPerMotor);
    result.kilowatts = calcKilowatts(result.totalPower);
    result.horsepower = calcHorsepower(result.totalPower);
  }

  // Efficiency computations
  if (result.wattHours && specs.performance?.range) {
    result.energyConsumption = calcEnergyConsumption(
      result.wattHours,
      specs.performance.range
    );
  }

  if (result.wattHours && specs.physical?.weight) {
    result.specificEnergy = calcSpecificEnergy(result.wattHours, specs.physical.weight);
  }

  if (result.totalPower && specs.physical?.weight) {
    result.powerToWeight = calcPowerToWeight(result.totalPower, specs.physical.weight);
  }

  return result;
}

// ============================================
// DESCRIPTION TEMPLATES
// ============================================

/**
 * Process a description template, replacing placeholders with actual values.
 *
 * Supported placeholders:
 * - {maxSpeed} - Maximum speed in km/h
 * - {range} - Range in km
 * - {totalPower} - Peak power in W
 * - {voltage} - Battery voltage in V
 * - {capacity} - Battery capacity in Ah
 * - {wattHours} - Battery energy in Wh
 * - {waterRating} - Water protection rating (e.g., IPX6)
 * - {batteryWaterRating} - Battery water protection
 * - {weight} - Weight in kg
 * - {wheelSize} - Wheel size in inches
 *
 * Example: "{maxSpeed} км/год, {range} км запасу, {totalPower}W"
 */
export function processDescriptionTemplate(
  template: string,
  specs: ProductSpecs
): string {
  const totalPower = specs.motor?.totalPower
    ?? (specs.motor?.count && specs.motor?.powerPerMotor
      ? calcTotalPower(specs.motor.count, specs.motor.powerPerMotor)
      : undefined);

  const wattHours = specs.battery?.voltage && specs.battery?.capacity
    ? calcWattHours(specs.battery.voltage, specs.battery.capacity)
    : specs.battery?.wattHours;

  const replacements: Record<string, string | number | undefined> = {
    maxSpeed: specs.performance?.maxSpeed,
    range: specs.performance?.range,
    totalPower: totalPower,
    voltage: specs.battery?.voltage,
    capacity: specs.battery?.capacity,
    wattHours: wattHours,
    waterRating: specs.safety?.waterRating,
    batteryWaterRating: specs.battery?.waterRating,
    weight: specs.physical?.weight,
    wheelSize: specs.physical?.wheelSize,
  };

  let result = template;
  for (const [key, value] of Object.entries(replacements)) {
    const placeholder = `{${key}}`;
    if (result.includes(placeholder)) {
      result = result.replace(
        new RegExp(placeholder.replace(/[{}]/g, '\\$&'), 'g'),
        value !== undefined ? String(value) : '—'
      );
    }
  }

  return result;
}
