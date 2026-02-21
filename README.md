# @scootify/shared

Shared library for Ukrainian e-scooter e-commerce sites (hiley.com.ua, scootify.com.ua, nami.com.ua, hysco.com.ua).

## Installation

In each site's package.json:
```json
{
  "dependencies": {
    "@scootify/shared": "file:../shared"
  }
}
```

In each site's next.config.ts:
```typescript
transpilePackages: ['@scootify/shared']
```

## Usage

```typescript
// Database (NEW!)
import { 
  getProductsByDomain, 
  getScootersByTier,
  searchProducts,
  sortProductsByPrice 
} from '@scootify/shared/db'

// Types
import type { Product, Scooter, Accessory } from '@scootify/shared/db'

// Library functions
import { formatUAH, usdCentsToUAH } from '@scootify/shared/lib/currency'
import { slugify } from '@scootify/shared/lib/transliterate'

// Components
import { ProductTile, Price, JsonLd } from '@scootify/shared/components'

// Hooks
import { useNovaPoshta } from '@scootify/shared/hooks'
```

## Database

The shared library now includes a **unified product database** with 52 products (39 scooters + 13 accessories):

### Quick Start

```typescript
import { getProductsByDomain, searchScooters } from '@scootify/shared/db';

// Get all products for a specific domain
const hileyProducts = getProductsByDomain('hiley.com.ua'); // 15 Tiger scooters

// Search with filters
const fastScooters = searchScooters('', { 
  minSpeed: 80,
  minRange: 100,
  domain: 'hiley.com.ua'
});

// Get scooters by tier
const premiumScooters = getScootersByTier('tier-premium');
```

### Available Functions

**Domain Filtering:**
- `getProductsByDomain(domain)` - All products for a domain
- `getScootersByDomain(domain)` - Scooters only
- `getAccessoriesByDomain(domain)` - Accessories only

**Category Filtering:**
- `getScootersByTier(tier)` - Filter by tier (entry, mid-range, premium, hyper, alt-car)
- `getScootersByUseCase(useCase)` - Filter by use case (city, touring, off-road, sport)
- `getAccessoriesByProductType(type)` - Filter accessories by type

**Brand Filtering:**
- `getProductsByBrand(brandId)` - All products from a brand
- `getScootersByBrand(brandId)` - Scooters only

**Search:**
- `searchProducts(query, domain?)` - Full-text search
- `searchScooters(query, filters?)` - Advanced search with spec filters

**Price Filtering:**
- `getProductsByPriceRange(min, max)` - Products within price range
- `getProductsUnderPrice(max)` - Products under a price

**Sorting:**
- `sortProductsByPrice(products, order)` - Sort by price
- `sortScootersBySpeed(scooters, order)` - Sort by max speed
- `sortScootersByRange(scooters, order)` - Sort by range
- `sortScootersByPower(scooters, order)` - Sort by motor power

**Single Product:**
- `getProductById(id)` - Get by ID
- `getProductBySlug(slug, domain?)` - Get by slug

**Statistics:**
- `getProductCountByDomain()` - Product counts per domain
- `getProductCountByBrand()` - Product counts per brand
- `getPriceStatistics()` - Min/max/average/median prices

### Database Stats

- **52 total products** (39 scooters + 13 accessories)
- **4 domains**: hiley.com.ua (15), hysco.com.ua (13), nami.com.ua (9), scootify.com.ua (19)
- **8 brands**: Tiger (15), Nami (10), Kaabo (6), Teverun (4), + 4 others
- **Price range**: $3.92 - $4,859 (average $1,862)
- **100% spec completeness** for all scooters

## Structure

- `src/db/` - **Product database** (scooters, accessories, brands, categories)
- `src/types/` - TypeScript type definitions
- `src/lib/` - Pure utility functions (no React)
- `src/components/` - React components (Next.js compatible)
- `src/hooks/` - React hooks
- `src/scripts/` - CLI tools (image pipeline, product feeds)
- `src/data/` - Shared data (specs explainer, legal templates)
- `src/config/` - Site configurations

## Development

```bash
npm install
npm run type-check
npm run lint
```
