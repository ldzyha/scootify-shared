/**
 * Shared business rules and constants across all sites
 */

/** Return period in days */
export const RETURN_PERIOD_DAYS = 14;

/** Working hours */
export const WORKING_HOURS = {
  start: '09:00',
  end: '21:00',
  timezone: 'Europe/Kyiv',
};

/** Delivery timeframes */
export const DELIVERY = {
  processingHours: 24,
  sameDayCutoffTime: '14:00',
  standardDeliveryDays: { min: 1, max: 3 },
  preOrderDays: { min: 10, max: 14 },
};

/** Payment methods */
export const PAYMENT_METHODS = {
  parts: ['bank_transfer', 'card', 'cash_on_delivery'] as const,
  scooters: ['bank_transfer', 'card', 'partial_prepayment'] as const,
};

/** Prepayment terms by brand */
export const PREPAYMENT_TERMS = {
  nami: { type: 'fixed' as const, amount: 4000, description: '4 000 грн передоплата + накладений платіж' },
  kaabo: { type: 'fixed' as const, amount: 4000, description: '4 000 грн передоплата + накладений платіж' },
  hiley: { type: 'percentage' as const, amount: 50, description: '50% передоплата' },
  hyper: { type: 'percentage' as const, amount: 60, description: '60% передоплата (залежно від вартості)' },
};

/** Warranty periods in months */
export const WARRANTY = {
  parts: 12,
  scooters: 6,
  battery: 6,
};

/** Commission rates (internal, not shown to users) */
export const COMMISSION_RATE = {
  min: 5,
  max: 10,
  unit: 'percent' as const,
};

/** Nova Poshta default values */
export const NOVA_POSHTA_DEFAULTS = {
  defaultWeight: 5, // kg
  defaultDeclaredValue: 5000, // UAH
  cargoType: 'Cargo' as const,
};

export type PaymentMethod = typeof PAYMENT_METHODS.parts[number] | typeof PAYMENT_METHODS.scooters[number];
export type PrepaymentType = 'fixed' | 'percentage';
