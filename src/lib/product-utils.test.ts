import { describe, it, expect } from 'vitest';
import type { Product } from '@scootify/shared/types';
import {
  getAllProducts,
  getProductBySlug,
  getProductById,
  getAllProductSlugs,
  getSimilarProducts,
  searchProducts,
  getProductsBySeries,
  getSeriesInOrder,
  getSeriesConfig,
} from './product-utils';
import type { SeriesConfig } from './product-utils';

// Minimal mock product factory
function mockProduct(overrides: Partial<Product> = {}): Product {
  return {
    id: 'test-1',
    sku: 'TST-001',
    slug: 'test-product',
    name: 'Test Product',
    brand: 'TestBrand',
    series: 'TestSeries',
    model: 'Model 1',
    shortDescription: 'A test product',
    description: 'Full description',
    categoryId: 'tier-premium',
    priceUsdCents: 100000,
    inStock: true,
    purchaseModel: 'consultation',
    images: [{ url: '/img/test.webp', alt: 'Test', isMain: true }],
    colors: [],
    colorHexMap: {},
    variants: [],
    specs: {
      performance: { maxSpeed: 80, range: 100 },
      motor: { totalPower: 4000 },
      battery: { voltage: 60, capacity: 30 },
      physical: {},
      safety: {},
      features: {},
      shipping: { weightKg: 40, seatsAmount: 1, boxes: [], cargoDescription: '' },
    },
    warranty: { months: 6 },
    ...overrides,
  } as Product;
}

const products: Product[] = [
  mockProduct({ id: 'p1', slug: 'alpha', name: 'Alpha Scooter', brand: 'BrandA', series: 'SeriesX', priceUsdCents: 200000 }),
  mockProduct({ id: 'p2', slug: 'beta', name: 'Beta Scooter', brand: 'BrandA', series: 'SeriesX', priceUsdCents: 250000 }),
  mockProduct({ id: 'p3', slug: 'gamma', name: 'Gamma Pro', brand: 'BrandB', series: 'SeriesY', priceUsdCents: 300000 }),
  mockProduct({ id: 'p4', slug: 'delta', name: 'Delta Max', brand: 'BrandB', series: 'SeriesY', priceUsdCents: 350000, hidden: true }),
];

describe('getAllProducts', () => {
  it('excludes hidden products', () => {
    const visible = getAllProducts(products);
    expect(visible).toHaveLength(3);
    expect(visible.find(p => p.id === 'p4')).toBeUndefined();
  });
});

describe('getProductBySlug', () => {
  it('finds product by slug', () => {
    expect(getProductBySlug(products, 'alpha')?.id).toBe('p1');
  });

  it('returns undefined for unknown slug', () => {
    expect(getProductBySlug(products, 'nonexistent')).toBeUndefined();
  });
});

describe('getProductById', () => {
  it('finds product by id', () => {
    expect(getProductById(products, 'p2')?.slug).toBe('beta');
  });
});

describe('getAllProductSlugs', () => {
  it('returns all slugs', () => {
    expect(getAllProductSlugs(products)).toEqual(['alpha', 'beta', 'gamma', 'delta']);
  });
});

describe('getSimilarProducts', () => {
  it('returns products from same series', () => {
    const similar = getSimilarProducts(products, 'alpha');
    expect(similar).toHaveLength(1);
    expect(similar[0].slug).toBe('beta');
  });

  it('returns empty for unknown slug', () => {
    expect(getSimilarProducts(products, 'nonexistent')).toEqual([]);
  });

  it('sorts by price proximity', () => {
    const extraProducts = [
      ...products,
      mockProduct({ id: 'p5', slug: 'epsilon', series: 'SeriesX', priceUsdCents: 190000 }),
      mockProduct({ id: 'p6', slug: 'zeta', series: 'SeriesX', priceUsdCents: 400000 }),
    ];
    const similar = getSimilarProducts(extraProducts, 'alpha', 2);
    // alpha price is 200000, epsilon (190000) is closer than beta (250000)
    expect(similar[0].slug).toBe('epsilon');
    expect(similar).toHaveLength(2);
  });

  it('respects limit', () => {
    const many = Array.from({ length: 10 }, (_, i) =>
      mockProduct({ id: `m${i}`, slug: `m${i}`, series: 'SeriesX', priceUsdCents: 200000 + i * 1000 })
    );
    const similar = getSimilarProducts(many, 'm0', 3);
    expect(similar.length).toBeLessThanOrEqual(3);
  });
});

describe('searchProducts', () => {
  it('finds products by name', () => {
    const results = searchProducts(products, 'Alpha');
    expect(results).toHaveLength(1);
    expect(results[0].slug).toBe('alpha');
  });

  it('finds products by brand', () => {
    const results = searchProducts(products, 'BrandB');
    expect(results.length).toBeGreaterThanOrEqual(1);
  });

  it('returns empty for no match', () => {
    expect(searchProducts(products, 'zzzznonexistent')).toEqual([]);
  });

  it('returns empty for empty query', () => {
    expect(searchProducts(products, '')).toEqual([]);
    expect(searchProducts(products, '  ')).toEqual([]);
  });

  it('respects limit', () => {
    const results = searchProducts(products, 'Scooter', 1);
    expect(results).toHaveLength(1);
  });

  it('ranks name matches higher', () => {
    const results = searchProducts(products, 'Alpha');
    // Alpha should be first since it matches by name
    expect(results[0].name).toContain('Alpha');
  });
});

describe('getProductsBySeries', () => {
  it('groups products by series', () => {
    const grouped = getProductsBySeries(products, (p) => p.series || 'unknown');
    expect(grouped.get('SeriesX')).toHaveLength(2);
    expect(grouped.get('SeriesY')).toHaveLength(2);
  });

  it('sorts within series by price descending', () => {
    const grouped = getProductsBySeries(products, (p) => p.series || 'unknown');
    const seriesX = grouped.get('SeriesX')!;
    expect(seriesX[0].priceUsdCents).toBeGreaterThanOrEqual(seriesX[1].priceUsdCents);
  });
});

describe('getSeriesInOrder / getSeriesConfig', () => {
  const configs: SeriesConfig[] = [
    { id: 'b', name: 'B', slug: 'b', subtitle: '', description: '', benefits: [], useCase: '', order: 2 },
    { id: 'a', name: 'A', slug: 'a', subtitle: '', description: '', benefits: [], useCase: '', order: 1 },
    { id: 'c', name: 'C', slug: 'c', subtitle: '', description: '', benefits: [], useCase: '', order: 3 },
  ];

  it('sorts by order', () => {
    const sorted = getSeriesInOrder(configs);
    expect(sorted[0].id).toBe('a');
    expect(sorted[1].id).toBe('b');
    expect(sorted[2].id).toBe('c');
  });

  it('finds config by id', () => {
    expect(getSeriesConfig(configs, 'b')?.name).toBe('B');
    expect(getSeriesConfig(configs, 'z')).toBeUndefined();
  });
});
