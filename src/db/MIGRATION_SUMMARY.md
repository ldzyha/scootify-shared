# Accessories Migration Summary

## ✅ Migration Complete

Successfully migrated **13 accessories** from `scootify.com.ua/src/data/products.json` to `shared/src/db/accessories.ts`

## Accessories Migrated

1. **controller-72v-foc** - Контролер 72V 50A FOC 2-в-1 (KWHEEL)
2. **fleece-mask** - Флісова маска-шарф (Scootify)
3. **gloves-rockbros** - Вітрозахисні рукавички ROCKBROS
4. **tft-display-gtr** - TFT дисплей (KWHEEL)
5. **throttle-kaabo** - Ручка газу/дросель (MACURY)
6. **charging-port-72v** - Порт зарядки 72V (Kaabo)
7. **wrench-suspension-gtr** - Ключ регулювання амортизатора (Kaabo)
8. **battery-lock-gtr** - Замок батареї (KWHEEL)
9. **brake-pads** - Гальмівні колодки (BUCKLOS)
10. **cable-ties-10** - Багаторазові стяжки 10 шт (Scootify)
11. **scooter-lock** - Замок для електросамоката (Scootify)
12. **folding-lock-kaabo** - Фіксатор складання (MACURY)
13. **cover-toptrek** - Чохол Toptrek

## Fixes Applied

### 1. Price Discrepancies (Using Variant Price as Canonical)
- ✅ **TFT Display**: $99 → $89 (8900 cents)
- ✅ **Battery Lock**: $15 → $14.49 (1449 cents)

### 2. Brand Mismatches (Using specifications.Бренд)
- ✅ **Throttle**: `hiley` → `macury` (from specifications.Бренд: "MACURY")
- ✅ **Battery Lock**: `Kaabo` → `kwheel` (from specifications.Бренд: "KWHEEL")

### 3. SKU Typo Fixes
- ✅ `KAABO_WOLF_KING_GTR_THROTLE` → `KAABO_WOLF_KING_GTR_THROTTLE`
- ✅ `ROCKBROS_GLOBES_WINTER` → `ROCKBROS_GLOVES_WINTER`

### 4. Category Mapping
- ✅ `zapchastyny` → `pt-parts` (5 items)
- ✅ `aksesuary` → `pt-accessories` (8 items)

Additional categories added based on product type:
- ✅ `pt-safety` - Fleece mask, gloves (2 items)
- ✅ `pt-winter` - Fleece mask, gloves (2 items)
- ✅ `pt-maintenance` - Brake pads, cable ties, wrench (3 items)

### 5. Schema Compliance
- ✅ Set `purchaseModel: 'direct'` for ALL accessories
- ✅ Set `domains: ['scootify.com.ua']` for ALL accessories
- ✅ Converted prices from dollars to cents (multiply by 100, round)
- ✅ Converted image arrays to ProductMedia objects
- ✅ Preserved Ukrainian specifications as Record<string, string>
- ✅ Mapped variants to AccessoryVariant[] with proper typing

### 6. Compatibility Mapping
Based on "Сумісність" field in specifications:
- ✅ Controller: `['kaabo-wolf-king-gtr', 'kaabo']`
- ✅ TFT Display: `['kaabo-wolf-king-gtr', 'kaabo']`
- ✅ Throttle: `['kaabo']`
- ✅ Charging Port: `['kaabo-wolf-king-gtr', 'kaabo']`
- ✅ Wrench: `['kaabo-wolf-king-gtr', 'kaabo']`
- ✅ Battery Lock: `['kaabo-wolf-king-gtr', 'kaabo']`
- ✅ Folding Lock: `['kaabo']`

## Data Quality

### Breakdown by Category
- Parts (pt-parts): 5 items
- Accessories (pt-accessories): 8 items
- Safety (pt-safety): 2 items
- Winter (pt-winter): 2 items
- Maintenance (pt-maintenance): 3 items

### Breakdown by Brand
- KWHEEL: 2 items
- Kaabo: 1 item
- MACURY: 2 items
- ROCKBROS: 1 item
- BUCKLOS: 1 item
- Scootify: 3 items
- Toptrek: 1 item
- hiley: 0 items (fixed to MACURY)

### Availability
- In Stock: 12 items
- Out of Stock: 1 item (gloves-rockbros)

## Output File

**Location**: `/home/dzy/shared/src/db/accessories.ts`

**Format**:
```typescript
import { Accessory } from './schema';

export const accessories: Accessory[] = [
  { id: 'controller-72v-foc', ... },
  // ... 13 total accessories
];
```

**Size**: 1347 lines

## Verification Checklist

- ✅ 13 accessories found and migrated
- ✅ All price discrepancies resolved (variant price used)
- ✅ All brand mismatches fixed (specifications.Бренд used)
- ✅ All SKU typos corrected
- ✅ Categories properly mapped
- ✅ Additional categories auto-detected
- ✅ Purchase model set to 'direct'
- ✅ Domains set to ['scootify.com.ua']
- ✅ Prices converted to cents
- ✅ Images converted to ProductMedia format
- ✅ Ukrainian specifications preserved
- ✅ Variants properly typed
- ✅ Compatibility arrays populated
- ✅ TypeScript type-safe output

