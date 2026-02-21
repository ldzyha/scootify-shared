/**
 * Validation utilities for Ukrainian e-commerce forms
 */

import type { ValidationErrors } from '../types/checkout';

/**
 * Validate Ukrainian phone number
 * Valid formats: +380XXXXXXXXX, 380XXXXXXXXX, 0XXXXXXXXX
 */
export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '');
  
  // Must be 10 digits (0XXXXXXXXX) or 12 digits (380XXXXXXXXX)
  if (cleaned.length === 10) {
    return cleaned.startsWith('0');
  }
  if (cleaned.length === 12) {
    return cleaned.startsWith('380');
  }
  return false;
}

/**
 * Format phone number for display: +38 (0XX) XXX-XX-XX
 */
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');

  // Normalize to 10 digits
  let digits = cleaned;
  if (digits.startsWith('380')) {
    digits = '0' + digits.slice(3);
  }
  if (digits.length !== 10) {
    return phone; // Return original if can't format
  }

  // Format: +38 (0XX) XXX-XX-XX
  return `+38 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 8)}-${digits.slice(8, 10)}`;
}

/**
 * Normalize phone to international format: +380XXXXXXXXX
 */
export function normalizePhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');

  if (cleaned.length === 10 && cleaned.startsWith('0')) {
    return '+38' + cleaned;
  }
  if (cleaned.length === 12 && cleaned.startsWith('380')) {
    return '+' + cleaned;
  }
  return phone;
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  if (!email.trim()) return true; // Empty is valid (optional field)
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Validate name (at least 2 characters, only letters and spaces)
 */
export function isValidName(name: string): boolean {
  const trimmed = name.trim();
  if (trimmed.length < 2) return false;
  // Allow Ukrainian, Russian, and Latin letters, spaces, hyphens, apostrophes
  return /^[\p{L}\s\-']+$/u.test(trimmed);
}

/**
 * Validate checkout customer info
 */
export function validateCustomerInfo(data: {
  name: string;
  phone: string;
  email?: string;
}): ValidationErrors {
  const errors: ValidationErrors = {};

  // Name validation
  if (!data.name.trim()) {
    errors.name = "Введіть ім'я та прізвище";
  } else if (!isValidName(data.name)) {
    errors.name = "Ім'я може містити тільки літери";
  }

  // Phone validation
  if (!data.phone.trim()) {
    errors.phone = 'Введіть номер телефону';
  } else if (!isValidPhone(data.phone)) {
    errors.phone = 'Невірний формат телефону';
  }

  // Email validation (optional)
  if (data.email && !isValidEmail(data.email)) {
    errors.email = 'Невірний формат email';
  }

  return errors;
}

/**
 * Validate delivery info
 */
export function validateDeliveryInfo(data: {
  method: string;
  city: { ref: string; name: string } | null;
  warehouse?: { ref: string } | null;
  street?: { ref: string; name: string } | null;
  buildingNumber?: string;
}): ValidationErrors {
  const errors: ValidationErrors = {};

  // City is required for all delivery methods
  if (!data.city) {
    errors.city = 'Оберіть місто';
  }

  // Warehouse required for branch delivery
  if (data.method === 'nova-poshta-branch' && !data.warehouse) {
    errors.warehouse = 'Оберіть відділення';
  }

  // Street and building required for courier delivery
  if (data.method === 'nova-poshta-courier') {
    if (!data.street) {
      errors.street = 'Оберіть вулицю';
    }
    if (!data.buildingNumber?.trim()) {
      errors.buildingNumber = 'Введіть номер будинку';
    }
  }

  return errors;
}

/**
 * Check if validation errors object has any errors
 */
export function hasErrors(errors: ValidationErrors): boolean {
  return Object.keys(errors).length > 0;
}
