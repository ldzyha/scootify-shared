import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  centsToUnits,
  unitsToCents,
  usdToUah,
  uahToUsd,
  usdCentsToUAH,
  formatUAH,
  formatUSD,
  formatPrice,
  formatPriceDisplay,
  calculateDiscount,
  formatDiscountBadge,
  setExchangeRates,
  getExchangeRates,
  initExchangeRate,
} from './currency';

describe('currency conversions', () => {
  beforeEach(() => {
    setExchangeRates({ UAH: 42.25, updatedAt: '2024-01-01T00:00:00Z' });
  });

  describe('centsToUnits / unitsToCents', () => {
    it('converts cents to units', () => {
      expect(centsToUnits(9999)).toBe(99.99);
      expect(centsToUnits(100)).toBe(1);
      expect(centsToUnits(0)).toBe(0);
    });

    it('converts units to cents', () => {
      expect(unitsToCents(99.99)).toBe(9999);
      expect(unitsToCents(1)).toBe(100);
      expect(unitsToCents(0)).toBe(0);
    });

    it('rounds cents properly', () => {
      expect(unitsToCents(99.999)).toBe(10000);
      expect(unitsToCents(99.994)).toBe(9999);
    });
  });

  describe('usdToUah', () => {
    it('converts USD cents to UAH kopecks', () => {
      // $100 = 10000 cents → 10000 * 42.25 = 422500 kopecks
      expect(usdToUah(10000)).toBe(422500);
      expect(usdToUah(100)).toBe(4225);
    });

    it('accepts custom rates', () => {
      expect(usdToUah(100, { UAH: 50, updatedAt: '' })).toBe(5000);
    });

    it('handles zero', () => {
      expect(usdToUah(0)).toBe(0);
    });
  });

  describe('uahToUsd', () => {
    it('converts UAH kopecks to USD cents', () => {
      expect(uahToUsd(422500)).toBe(10000);
      expect(uahToUsd(4225)).toBe(100);
    });

    it('rounds to nearest cent', () => {
      // 5000 / 42.25 = 118.343... → 118
      expect(uahToUsd(5000)).toBe(118);
    });
  });

  describe('usdCentsToUAH', () => {
    it('converts USD cents to UAH units (not kopecks)', () => {
      // 10000 cents * 42.25 / 100 = 4225 UAH
      expect(usdCentsToUAH(10000)).toBe(4225);
    });

    it('accepts custom rate number', () => {
      expect(usdCentsToUAH(10000, 50)).toBe(5000);
    });
  });

  describe('setExchangeRates / getExchangeRates', () => {
    it('updates and retrieves exchange rates', () => {
      setExchangeRates({ UAH: 50, updatedAt: '2024-06-01' });
      const rates = getExchangeRates();
      expect(rates.UAH).toBe(50);
      expect(rates.updatedAt).toBe('2024-06-01');
    });

    it('returns a copy (not the internal reference)', () => {
      const rates = getExchangeRates();
      rates.UAH = 999;
      expect(getExchangeRates().UAH).toBe(42.25);
    });
  });
});

describe('formatUAH / formatUSD', () => {
  it('formats UAH price', () => {
    expect(formatUAH(4225)).toMatch(/4.*225.*₴/);
  });

  it('formats USD price', () => {
    expect(formatUSD(100)).toBe('$100');
    expect(formatUSD(99.99)).toBe('$99.99');
  });
});

describe('formatPrice', () => {
  it('formats UAH without decimals', () => {
    const result = formatPrice(450000, 'UAH');
    expect(result.amount).toBe(4500);
    expect(result.currency).toBe('UAH');
    expect(result.symbol).toBe('₴');
    expect(result.formatted).toContain('₴');
  });

  it('formats USD without decimals', () => {
    const result = formatPrice(10000, 'USD');
    expect(result.amount).toBe(100);
    expect(result.formatted).toBe('$100');
    expect(result.symbol).toBe('$');
  });

  it('formats with decimals when requested', () => {
    const result = formatPrice(9999, 'USD', { showDecimals: true });
    expect(result.formatted).toContain('99');
    expect(result.formatted).toContain('$');
  });
});

describe('formatPriceDisplay', () => {
  beforeEach(() => {
    setExchangeRates({ UAH: 42.25, updatedAt: '2024-01-01T00:00:00Z' });
  });

  it('returns both currency formats', () => {
    const result = formatPriceDisplay(10000);
    expect(result.primary.currency).toBe('UAH');
    expect(result.secondary.currency).toBe('USD');
    expect(result.secondary.amount).toBe(100);
  });

  it('calculates discount when original > current', () => {
    const result = formatPriceDisplay(8000, 10000);
    expect(result.discount).toBeDefined();
    expect(result.discount?.percentage).toBe(20);
  });

  it('no discount when prices equal', () => {
    expect(formatPriceDisplay(10000, 10000).discount).toBeUndefined();
  });

  it('no discount when original < current', () => {
    expect(formatPriceDisplay(10000, 8000).discount).toBeUndefined();
  });
});

describe('calculateDiscount', () => {
  it('calculates percentage correctly', () => {
    expect(calculateDiscount(8000, 10000)).toBe(20);
    expect(calculateDiscount(5000, 10000)).toBe(50);
  });

  it('returns 0 when no discount', () => {
    expect(calculateDiscount(10000, 10000)).toBe(0);
    expect(calculateDiscount(10000, 8000)).toBe(0);
  });
});

describe('formatDiscountBadge', () => {
  it('formats badge text', () => {
    expect(formatDiscountBadge(20)).toBe('-20%');
    expect(formatDiscountBadge(5)).toBe('-5%');
  });
});

describe('initExchangeRate', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('uses fallback when all APIs fail', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network error'));
    const rates = await initExchangeRate({ fallbackRate: 41.0 });
    expect(rates.UAH).toBe(41.0);
  });

  it('uses default fallback rate of 42.25', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network error'));
    const rates = await initExchangeRate();
    expect(rates.UAH).toBe(42.25);
  });
});
