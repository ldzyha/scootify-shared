import { describe, it, expect } from 'vitest';
import {
  isValidPhone,
  formatPhone,
  normalizePhone,
  isValidEmail,
  isValidName,
  validateCustomerInfo,
  validateDeliveryInfo,
  hasErrors,
} from './validation';

describe('isValidPhone', () => {
  it('accepts 10-digit format starting with 0', () => {
    expect(isValidPhone('0501234567')).toBe(true);
    expect(isValidPhone('0671234567')).toBe(true);
    expect(isValidPhone('0991234567')).toBe(true);
  });

  it('accepts 12-digit format starting with 380', () => {
    expect(isValidPhone('380501234567')).toBe(true);
    expect(isValidPhone('+380501234567')).toBe(true);
  });

  it('accepts formatted numbers', () => {
    expect(isValidPhone('+38 (050) 123-45-67')).toBe(true);
    expect(isValidPhone('050 123 45 67')).toBe(true);
  });

  it('rejects invalid numbers', () => {
    expect(isValidPhone('')).toBe(false);
    expect(isValidPhone('123')).toBe(false);
    expect(isValidPhone('1234567890')).toBe(false); // doesn't start with 0
    expect(isValidPhone('050123456')).toBe(false); // too short
    expect(isValidPhone('05012345678')).toBe(false); // too long (11 digits)
  });
});

describe('formatPhone', () => {
  it('formats 10-digit number', () => {
    expect(formatPhone('0501234567')).toBe('+38 (050) 123-45-67');
  });

  it('formats 12-digit number', () => {
    expect(formatPhone('380501234567')).toBe('+38 (050) 123-45-67');
  });

  it('returns original if cannot format', () => {
    expect(formatPhone('123')).toBe('123');
  });
});

describe('normalizePhone', () => {
  it('normalizes 10-digit to international', () => {
    expect(normalizePhone('0501234567')).toBe('+380501234567');
  });

  it('normalizes 12-digit with +', () => {
    expect(normalizePhone('380501234567')).toBe('+380501234567');
  });

  it('returns original for unrecognized format', () => {
    expect(normalizePhone('123')).toBe('123');
  });
});

describe('isValidEmail', () => {
  it('accepts valid emails', () => {
    expect(isValidEmail('user@example.com')).toBe(true);
    expect(isValidEmail('test.user@domain.co.ua')).toBe(true);
  });

  it('accepts empty string (optional field)', () => {
    expect(isValidEmail('')).toBe(true);
    expect(isValidEmail('  ')).toBe(true);
  });

  it('rejects invalid emails', () => {
    expect(isValidEmail('not-an-email')).toBe(false);
    expect(isValidEmail('@domain.com')).toBe(false);
    expect(isValidEmail('user@')).toBe(false);
  });
});

describe('isValidName', () => {
  it('accepts Ukrainian names', () => {
    expect(isValidName('Іван Петренко')).toBe(true);
    expect(isValidName("Тарас Шевченко-Мельник")).toBe(true);
  });

  it('accepts Latin names', () => {
    expect(isValidName('John Doe')).toBe(true);
  });

  it('rejects too short names', () => {
    expect(isValidName('A')).toBe(false);
    expect(isValidName('')).toBe(false);
  });

  it('rejects names with numbers', () => {
    expect(isValidName('John123')).toBe(false);
  });
});

describe('validateCustomerInfo', () => {
  it('returns empty errors for valid data', () => {
    const errors = validateCustomerInfo({
      name: 'Іван Петренко',
      phone: '0501234567',
    });
    expect(hasErrors(errors)).toBe(false);
  });

  it('validates missing name', () => {
    const errors = validateCustomerInfo({ name: '', phone: '0501234567' });
    expect(errors.name).toBeDefined();
  });

  it('validates missing phone', () => {
    const errors = validateCustomerInfo({ name: 'Іван', phone: '' });
    expect(errors.phone).toBeDefined();
  });

  it('validates invalid phone', () => {
    const errors = validateCustomerInfo({ name: 'Іван', phone: '123' });
    expect(errors.phone).toBeDefined();
  });

  it('validates invalid email', () => {
    const errors = validateCustomerInfo({
      name: 'Іван',
      phone: '0501234567',
      email: 'bad-email',
    });
    expect(errors.email).toBeDefined();
  });
});

describe('validateDeliveryInfo', () => {
  it('requires city', () => {
    const errors = validateDeliveryInfo({ method: 'nova-poshta-branch', city: null });
    expect(errors.city).toBeDefined();
  });

  it('requires warehouse for branch delivery', () => {
    const errors = validateDeliveryInfo({
      method: 'nova-poshta-branch',
      city: { ref: 'abc', name: 'Київ' },
      warehouse: null,
    });
    expect(errors.warehouse).toBeDefined();
  });

  it('requires street + building for courier delivery', () => {
    const errors = validateDeliveryInfo({
      method: 'nova-poshta-courier',
      city: { ref: 'abc', name: 'Київ' },
      street: null,
      buildingNumber: '',
    });
    expect(errors.street).toBeDefined();
    expect(errors.buildingNumber).toBeDefined();
  });

  it('passes for valid branch delivery', () => {
    const errors = validateDeliveryInfo({
      method: 'nova-poshta-branch',
      city: { ref: 'abc', name: 'Київ' },
      warehouse: { ref: 'wh1' },
    });
    expect(hasErrors(errors)).toBe(false);
  });
});

describe('hasErrors', () => {
  it('returns false for empty object', () => {
    expect(hasErrors({})).toBe(false);
  });

  it('returns true when errors exist', () => {
    expect(hasErrors({ name: 'Required' })).toBe(true);
  });
});
