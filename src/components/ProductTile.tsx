'use client';

import { useState, useMemo } from 'react';
import { Picture } from './Picture';
import { PriceCompact } from './Price';
import { ProductImage } from './ProductImage';
import { MetallicText } from './MetallicText';
import { MetallicButton } from './MetallicButton';
import { Icon } from './Icon';
import { usdToUah } from '@scootify/shared/lib/currency';
import type { ProductTileData } from '@scootify/shared/types/product';
import styles from './ProductTile.module.css';

export type ProductTileVariant = 'card' | 'featured' | 'compact';

export interface ProductTileProps {
  product: ProductTileData;
  variant?: ProductTileVariant;
  onAddToCart?: (product: ProductTileData) => void;
  onRequestConsultation?: (product: ProductTileData) => void;
  onQuickView?: (product: ProductTileData) => void;
  className?: string;
  /** Custom metallic variant for accent elements (discount badge, etc.) */
  accentVariant?: 'blue' | 'gold' | 'red' | 'green';
  /** Purchase model override - if not provided, uses product.purchaseModel or defaults to 'direct' */
  purchaseModel?: 'direct' | 'consultation';
}

export function ProductTile({
  product,
  variant = 'card',
  onAddToCart,
  onRequestConsultation,
  onQuickView,
  className = '',
  accentVariant = 'blue',
  purchaseModel,
}: ProductTileProps) {
  const {
    name,
    tagline,
    priceUsdCents,
    originalPriceUsdCents,
    thumbnail,
    hoverImage,
    inStock = true,
    specs,
    colors,
    colorImages,
    defaultColor,
    variantNames,
    variantCapacities,
    variantPrices,
  } = product;

  // Determine purchase model: use prop, fallback to product data, default to 'direct'
  const effectivePurchaseModel = purchaseModel || (product as any).purchaseModel || 'direct';
  const isConsultationOnly = effectivePurchaseModel === 'consultation';

  // Color selection state
  const [selectedColor, setSelectedColor] = useState<string | undefined>(defaultColor);

  // Variant selection state
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  // Build variant options
  const variantOptions = useMemo(() => {
    if (!variantNames || !variantCapacities || !variantPrices) return [];
    if (variantNames.length <= 1) return [];

    return variantNames.map((name, index) => ({
      name,
      capacity: variantCapacities[index] || 0,
      price: variantPrices[index] || priceUsdCents,
    }));
  }, [variantNames, variantCapacities, variantPrices, priceUsdCents]);

  const hasVariants = variantOptions.length > 1;

  // Get current display values based on selected variant
  const displayPrice = hasVariants
    ? variantOptions[selectedVariantIndex]?.price || priceUsdCents
    : priceUsdCents;

  const displayCapacity = hasVariants
    ? variantOptions[selectedVariantIndex]?.capacity
    : specs?.capacity;

  // Determine which image to show based on selected color
  const getDisplayImage = () => {
    if (selectedColor && colorImages?.[selectedColor]) {
      return typeof colorImages[selectedColor] === 'string' 
        ? colorImages[selectedColor] as string
        : (colorImages[selectedColor] as any).url;
    }
    return thumbnail;
  };

  const displayImage = getDisplayImage();
  const hasHoverImage = hoverImage && !selectedColor;

  // Calculate discount
  const hasDiscount = !!originalPriceUsdCents && originalPriceUsdCents > displayPrice && !hasVariants;
  const discountPercent = hasDiscount
    ? Math.round(((originalPriceUsdCents - displayPrice) / originalPriceUsdCents) * 100)
    : 0;

  // Convert prices to UAH
  const primaryCents = usdToUah(displayPrice);
  const originalPrimaryCents = originalPriceUsdCents ? usdToUah(originalPriceUsdCents) : undefined;

  // Determine CSS classes based on variant
  const tileClasses = [
    styles.tile,
    variant === 'featured' && styles.featured,
    variant === 'compact' && styles.compact,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Handle button click
  const handleButtonClick = () => {
    if (isConsultationOnly) {
      onRequestConsultation?.(product);
    } else {
      onAddToCart?.(product);
    }
  };

  return (
    <article className={tileClasses}>
      {/* Image Container */}
      <a href={`/product/${product.slug}`} className={styles.imageContainer}>
        {/* Badge Container */}
        <div className={styles.badgeContainer}>
          {hasDiscount && (
            <MetallicText variant="red" className={styles.discountBadge}>
              -{discountPercent}%
            </MetallicText>
          )}
          {!inStock && <span className={styles.stockBadge}>Немає в наявності</span>}
        </div>

        {/* Primary Image */}
        <ProductImage
          src={displayImage}
          alt={name}
          sizes={
            variant === 'featured'
              ? '(max-width: 768px) 100vw, 50vw'
              : '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 300px'
          }
          className={`${styles.image} ${hasHoverImage ? styles.primaryImage : ''}`}
        />

        {/* Hover Image */}
        {hasHoverImage && (
          <ProductImage
            src={hoverImage}
            alt={`${name} - альтернативний вигляд`}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 300px"
            className={`${styles.image} ${styles.hoverImage}`}
          />
        )}
      </a>

      {/* Content - BELOW image */}
      <div className={styles.content}>
        {/* Name */}
        <a href={`/product/${product.slug}`} className={styles.name}>
          {name}
        </a>

        {/* Tagline */}
        {tagline && variant !== 'compact' && <p className={styles.tagline}>{tagline}</p>}

        {/* Variant Pills - For multi-variant products */}
        {variant !== 'compact' && hasVariants && (
          <div className={styles.variantPills}>
            {variantOptions.map((opt, index) => (
              <button
                key={index}
                className={`${styles.variantPill} ${
                  selectedVariantIndex === index ? styles.variantPillActive : ''
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedVariantIndex(index);
                }}
                aria-pressed={selectedVariantIndex === index}
              >
                <Icon name="lightning" size="xs" />
                {specs?.voltage && opt.capacity && (
                  <span>
                    {specs.voltage}V {opt.capacity}Ah
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Specs - Only show for single-variant products */}
        {variant !== 'compact' && !hasVariants && (
          <div className={styles.specs}>
            {specs?.voltage && displayCapacity && (
              <span className={styles.spec}>
                <Icon name="shieldCheck" size="xs" />
                {specs.voltage}V {displayCapacity}Ah
              </span>
            )}

            {specs?.range && (
              <span className={styles.spec}>
                <Icon name="lightning" size="xs" />
                {specs.range} км
              </span>
            )}

            {specs?.totalPower && (
              <span className={styles.spec}>
                <Icon name="star" size="xs" />
                {specs.totalPower}W
              </span>
            )}
          </div>
        )}

        {/* Color Swatches */}
        {colors && colors.length > 0 && variant !== 'compact' && (
          <div className={styles.colorSwatches}>
            {colors.map((color) => (
              <button
                key={color}
                className={`${styles.colorSwatch} ${
                  selectedColor === color ? styles.colorSwatchActive : ''
                }`}
                style={{ backgroundColor: color }}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedColor(color);
                }}
                aria-label={`Select ${color} color`}
                aria-pressed={selectedColor === color}
              />
            ))}
          </div>
        )}

        {/* Price */}
        <div className={styles.priceSection}>
          <PriceCompact
            primaryCents={primaryCents}
            secondaryCents={displayPrice}
            originalPrimaryCents={hasVariants ? undefined : originalPrimaryCents}
            originalSecondaryCents={hasVariants ? undefined : originalPriceUsdCents}
            metallicVariant="gold"
          />
        </div>

        {/* Action Button */}
        <MetallicButton
          variant={isConsultationOnly ? 'green' : accentVariant}
          size={variant === 'featured' ? 'md' : 'sm'}
          disabled={!inStock && !isConsultationOnly}
          onClick={handleButtonClick}
          className={styles.actionButton}
        >
          <Icon name={isConsultationOnly ? 'phone' : 'cart'} size="sm" />
          <span>{isConsultationOnly ? 'Консультація' : 'В кошик'}</span>
        </MetallicButton>
      </div>
    </article>
  );
}

export default ProductTile;
