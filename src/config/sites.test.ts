import { describe, it, expect } from 'vitest';
import { hileyConfig, scootifyConfig, namiConfig, hyscoConfig } from './sites';
import type { SiteConfig } from '../types/site-config';

const allConfigs: [string, SiteConfig][] = [
  ['hiley', hileyConfig],
  ['scootify', scootifyConfig],
  ['nami', namiConfig],
  ['hysco', hyscoConfig],
];

describe('site configs', () => {
  it.each(allConfigs)('%s has required identity fields', (_, config) => {
    expect(config.siteName).toBeTruthy();
    expect(config.siteUrl).toMatch(/^https:\/\//);
    expect(config.domain).toMatch(/\.com\.ua$/);
    expect(config.brand).toBeTruthy();
    expect(config.description).toBeTruthy();
  });

  it.each(allConfigs)('%s has valid contact info', (_, config) => {
    expect(config.contact.phone).toMatch(/\+38/);
    expect(config.contact.email).toContain('@');
  });

  it.each(allConfigs)('%s has valid theme', (_, config) => {
    expect(['hiley', 'hysco', 'nami', 'scootify']).toContain(config.theme.id);
  });

  it.each(allConfigs)('%s has order prefix', (_, config) => {
    expect(config.orderPrefix).toMatch(/^[A-Z]{2}-$/);
  });

  it.each(allConfigs)('%s has currency config', (_, config) => {
    expect(config.defaultCurrency).toBe('UAH');
    expect(config.fallbackExchangeRate).toBeGreaterThan(0);
  });

  it.each(allConfigs)('%s has product URL pattern', (_, config) => {
    expect(config.productUrlPattern).toContain(':slug');
  });

  it('all domains are unique', () => {
    const domains = allConfigs.map(([, c]) => c.domain);
    expect(new Set(domains).size).toBe(domains.length);
  });

  it('all order prefixes are unique', () => {
    const prefixes = allConfigs.map(([, c]) => c.orderPrefix);
    expect(new Set(prefixes).size).toBe(prefixes.length);
  });

  describe('feature flags', () => {
    it('scootify has cart enabled', () => {
      expect(scootifyConfig.features?.cart).toBe(true);
      expect(scootifyConfig.features?.checkout).toBe(true);
    });

    it('hiley has cart enabled', () => {
      expect(hileyConfig.features?.cart).toBe(true);
    });

    it('consultation sites have cart disabled', () => {
      expect(namiConfig.features?.cart).toBe(false);
      expect(hyscoConfig.features?.cart).toBe(false);
    });

    it('all sites have consultation enabled', () => {
      allConfigs.forEach(([, config]) => {
        expect(config.features?.consultation).toBe(true);
      });
    });
  });
});
