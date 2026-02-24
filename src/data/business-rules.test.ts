import { describe, it, expect } from 'vitest';
import {
  RETURN_PERIOD_DAYS,
  WORKING_HOURS,
  DELIVERY,
  PAYMENT_METHODS,
  PREPAYMENT_TERMS,
  WARRANTY,
  NOVA_POSHTA_DEFAULTS,
} from './business-rules';

describe('business rules', () => {
  describe('return period', () => {
    it('is 14 days (Ukrainian consumer law)', () => {
      expect(RETURN_PERIOD_DAYS).toBe(14);
    });
  });

  describe('working hours', () => {
    it('has valid time range', () => {
      expect(WORKING_HOURS.start).toMatch(/^\d{2}:\d{2}$/);
      expect(WORKING_HOURS.end).toMatch(/^\d{2}:\d{2}$/);
      expect(WORKING_HOURS.timezone).toBe('Europe/Kyiv');
    });
  });

  describe('delivery', () => {
    it('has valid processing time', () => {
      expect(DELIVERY.processingHours).toBeGreaterThan(0);
    });

    it('has valid delivery range', () => {
      expect(DELIVERY.standardDeliveryDays.min).toBeLessThan(DELIVERY.standardDeliveryDays.max);
    });

    it('pre-order range is longer than standard', () => {
      expect(DELIVERY.preOrderDays.min).toBeGreaterThan(DELIVERY.standardDeliveryDays.max);
    });
  });

  describe('payment methods', () => {
    it('scooters support prepayment', () => {
      expect(PAYMENT_METHODS.scooters).toContain('partial_prepayment');
    });

    it('parts support cash on delivery', () => {
      expect(PAYMENT_METHODS.parts).toContain('cash_on_delivery');
    });
  });

  describe('prepayment terms', () => {
    it('nami and kaabo have fixed 4000 UAH prepayment', () => {
      expect(PREPAYMENT_TERMS.nami.type).toBe('fixed');
      expect(PREPAYMENT_TERMS.nami.amount).toBe(4000);
      expect(PREPAYMENT_TERMS.kaabo.type).toBe('fixed');
      expect(PREPAYMENT_TERMS.kaabo.amount).toBe(4000);
    });

    it('hiley has 50% prepayment', () => {
      expect(PREPAYMENT_TERMS.hiley.type).toBe('percentage');
      expect(PREPAYMENT_TERMS.hiley.amount).toBe(50);
    });

    it('hyper has 60% prepayment', () => {
      expect(PREPAYMENT_TERMS.hyper.type).toBe('percentage');
      expect(PREPAYMENT_TERMS.hyper.amount).toBe(60);
    });

    it('all terms have Ukrainian description', () => {
      Object.values(PREPAYMENT_TERMS).forEach((term) => {
        expect(term.description).toBeTruthy();
      });
    });
  });

  describe('warranty', () => {
    it('parts have longer warranty than scooters', () => {
      expect(WARRANTY.parts).toBeGreaterThanOrEqual(WARRANTY.scooters);
    });

    it('all warranty periods are positive', () => {
      Object.values(WARRANTY).forEach((months) => {
        expect(months).toBeGreaterThan(0);
      });
    });
  });

  describe('Nova Poshta defaults', () => {
    it('has reasonable defaults', () => {
      expect(NOVA_POSHTA_DEFAULTS.defaultWeight).toBeGreaterThan(0);
      expect(NOVA_POSHTA_DEFAULTS.defaultDeclaredValue).toBeGreaterThan(0);
      expect(NOVA_POSHTA_DEFAULTS.cargoType).toBe('Cargo');
    });
  });
});
