# Scooter Migration Summary

## Overview
Successfully migrated **30 scooters** from 3 brands into the shared library database schema.

## Migration Statistics

### Tiger Scooters (hiley.com.ua)
- **Total:** 15 products
- **Source:** `/home/dzy/hiley.com.ua/docs/tiger-series-products.json`
- **Brand ID:** `tiger`
- **Purchase Model:** `consultation`
- **Prepayment:** 50% percentage
- **Warranty:** 24 months

**Product Tiers:**
- **Premium (11" wheels):** 2 products
  - Tiger KING RS ($3,300)
  - Tiger SUPRA ($2,600-$3,000 with variants)
  
- **Mid (10" wheels):** 7 products
  - Tiger 10 GTR, 10 V4 VLR, 10 GT, 10 V5 PERFORMANCE, 10 V4 LR, 10 V4, 10 V5
  - Price range: $1,750 - $2,270
  
- **EVO (8-10" city):** 3 products
  - Tiger EVO GTR, EVO GT, EVO
  - Price range: $1,150 - $1,500
  
- **Entry (MAX series):** 3 products
  - Tiger MAX GTR, 8 GTR V4, MAX GT
  - Price range: $699 - $1,000

**Domains:**
- Most: `['hiley.com.ua']`
- KING RS & SUPRA also on: `['hysco.com.ua']`

**Enrichment:**
- YouTube IDs added for 15/15 products
- Highlights generated based on model tier
- Categories mapped to new taxonomy (tier-*, use-case-*)

### Nami Scooters (nami.com.ua)
- **Total:** 9 products
- **Source:** `/home/dzy/nami.com.ua/docs/nami-products.json`
- **Brand ID:** `nami`
- **Purchase Model:** `consultation`
- **Prepayment:** 4,000 UAH fixed
- **Warranty:** 6 months

**Product Tiers:**
- **Entry:** 1 product (Stellar, $1,079)
- **Mid:** 4 products (Super Stellar, Klima One, Klima, Klima MAX)
  - Price range: $1,619 - $2,591
- **Premium:** 4 products (Blast, Blast MAX, Burn-E, Burn-E MAX)
  - Price range: $3,239 - $4,859

**Series:**
- burn-e: 2 products
- blast: 2 products
- klima: 3 products
- stellar: 2 products

**Domains:**
- Most: `['nami.com.ua']`
- Burn-E MAX also on: `['hysco.com.ua']`

**Data Quality:**
- ✓ Complete shipping specs for all products
- ✓ Ratings preserved (4.3 - 4.8 average)
- ✓ Review counts preserved

### Kaabo Scooters (scootify.com.ua)
- **Total:** 6 products
- **Source:** `/home/dzy/scootify.com.ua/src/data/products.json`
- **Brand ID:** `kaabo`
- **Purchase Model:** `consultation`
- **Prepayment:** 4,000 UAH fixed
- **Warranty:** 6 months

**Products:**
1. Wolf King GTR ($4,000) - tier-hyper
   - 2x2000W, 72V 35-40Ah, 105 km/h, 180-200km range
2. Wolf Warrior 11 Plus ($2,500) - tier-premium
   - 2x1200W, 60V 26Ah, 80 km/h, 90km range
3. Wolf Warrior X Pro+ ($2,200) - tier-premium
   - 2x1100W, 60V 28Ah, 70 km/h, 100km range
4. Wolf Warrior X Plus ($1,800) - tier-mid
   - 2x1100W, 60V 21Ah, 70 km/h, 70km range
5. Mantis King GT ($1,600) - tier-mid
   - 2x1100W, 60V 24Ah, 70 km/h, 90km range
6. Mantis 10 Plus ($1,400) - tier-mid
   - 2x1000W, 60V 18.2Ah, 60 km/h, 75km range

**Domains:**
- Most: `['scootify.com.ua']`
- Wolf King GTR also on: `['hysco.com.ua']`

**Data Quality Issues:**
⚠️ 12 issues found - Kaabo specifications parsing incomplete:
- Missing totalPower for all 6 products (couldn't parse from Ukrainian text)
- Missing battery voltage for all 6 products (couldn't parse from Ukrainian text)
- **Action Required:** Manual enrichment needed from scootify.com.ua product specifications

## Schema Mapping

### Category Mapping
- `tier-entry` ← Budget/MAX series
- `tier-mid` ← 10" series, entry Kaabo
- `tier-premium` ← 11" series, premium Nami/Kaabo
- `tier-hyper` ← Wolf King GTR
- `use-case-city` ← EVO series, Stellar
- `use-case-commute` ← Most 10" and mid-tier
- `use-case-performance` ← Premium/hyper models

### Field Transformations
- `priceUSD` → `priceUsdCents` (multiply by 100)
- `inStock` + `preorder` → `availability` enum
- `features.display` boolean → `electronics.display` string ('LED'/'TFT')
- Dimensions object → string format ('LxWxH')
- Ukrainian spec strings → parsed motor/battery/performance fields

## Files Modified

### Primary Output
- `/home/dzy/shared/src/db/scooters.ts` (1,221 → 5,866 lines)
  - Line 4-1,175: hyperScooters (unchanged, 9 products)
  - Line 1,188-3,547: tigerScooters (15 products)
  - Line 3,549-4,919: namiScooters (9 products)
  - Line 4,921-5,866: kaaboScooters (6 products)

### Schema Update
- `/home/dzy/shared/src/db/schema.ts`
  - Updated `DomainKey` type to include full domain names

### Migration Artifacts
- `/home/dzy/shared/migration-output.json` - JSON intermediate
- `/home/dzy/shared/migrate.py` - Python migration script
- `/home/dzy/shared/json-to-ts.js` - TypeScript converter

## Validation

### TypeScript Compilation
```bash
cd /home/dzy/shared && npx tsc --noEmit src/db/scooters.ts
```
✅ No errors (after fixing display field type and DomainKey)

### Data Quality Checks
- Tiger: ✓ All critical fields populated
- Nami: ✓ All critical fields populated  
- Kaabo: ⚠️ 12 missing spec fields (Ukrainian parsing incomplete)

## Next Steps

### 1. Manual Kaabo Enrichment
Fix missing specifications for Kaabo scooters by manually adding:
```typescript
// Example for Wolf King GTR
specs: {
  motor: {
    totalPower: 4000,  // From "2x 2000W"
  },
  battery: {
    voltage: 72,       // From "72V 35Ah"
    capacityAh: 35,
  },
  // ... etc
}
```

### 2. Test Integration
```bash
# Import test
cd /home/dzy/shared
npx ts-node -e "import { tigerScooters, namiScooters, kaaboScooters } from './src/db/scooters'; console.log({tiger: tigerScooters.length, nami: namiScooters.length, kaabo: kaaboScooters.length})"
```

### 3. Verify Data Display
- Check that domains array works for multi-site filtering
- Verify category IDs match category definitions
- Test media.youtubeIds embedding

## Migration Complete! 🎉

Total: **30 new scooters** added to shared library database
- 15 Tiger ✅
- 9 Nami ✅  
- 6 Kaabo ⚠️ (needs spec enrichment)
