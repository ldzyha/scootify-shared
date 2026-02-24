'use client';

import { useState } from 'react';
import { formatUAH, formatUSD, type FormattedPrice } from '@scootify/shared/lib/currency';
import { MetallicText } from './MetallicText';
import { Icon } from './Icon';
import type { MetallicVariant } from '@scootify/shared/lib/metallic';

/**
 * Price formatter function type
 * Takes a numeric amount and returns a FormattedPrice object
 */
export type PriceFormatter = (amount: number) => FormattedPrice;

/**
 * Default primary formatter (UAH)
 * Converts cents to UAH and formats with ₴ symbol
 */
const defaultFormatPrimary: PriceFormatter = (uahCents: number): FormattedPrice => {
  const amount = uahCents / 100;
  const formatted = formatUAH(amount);
  return {
    amount,
    formatted,
    currency: 'UAH',
    symbol: '₴',
  };
};

/**
 * Default secondary formatter (USD)
 * Converts cents to USD and formats with $ symbol
 */
const defaultFormatSecondary: PriceFormatter = (usdCents: number): FormattedPrice => {
  const amount = usdCents / 100;
  const formatted = formatUSD(amount);
  return {
    amount,
    formatted,
    currency: 'USD',
    symbol: '$',
  };
};

/**
 * Calculate discount percentage
 */
function calculateDiscountPercentage(currentCents: number, originalCents: number): number {
  if (originalCents <= currentCents) return 0;
  return Math.round(((originalCents - currentCents) / originalCents) * 100);
}

export interface PriceProps {
  /** Primary price in cents (e.g., UAH kopecks) */
  primaryCents: number;
  /** Secondary price in cents (e.g., USD cents) */
  secondaryCents: number;
  /** Original primary price in cents (for showing discount) */
  originalPrimaryCents?: number;
  /** Original secondary price in cents (for showing discount) */
  originalSecondaryCents?: number;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Metallic variant for primary price */
  metallicVariant?: MetallicVariant;
  /** Show discount badge */
  showDiscountBadge?: boolean;
  /** Show approximate symbol and info icon for consultation model products */
  approximate?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Custom primary price formatter (defaults to UAH) */
  formatPrimary?: PriceFormatter;
  /** Custom secondary price formatter (defaults to USD) */
  formatSecondary?: PriceFormatter;
}

const SIZE_CLASSES = {
  sm: {
    primary: 'text-lg',
    secondary: 'text-xs',
    original: 'text-sm',
    badge: 'text-xs px-1.5 py-0.5',
  },
  md: {
    primary: 'text-2xl',
    secondary: 'text-sm',
    original: 'text-base',
    badge: 'text-xs px-2 py-0.5',
  },
  lg: {
    primary: 'text-3xl',
    secondary: 'text-base',
    original: 'text-lg',
    badge: 'text-sm px-2 py-1',
  },
  xl: {
    primary: 'text-4xl',
    secondary: 'text-lg',
    original: 'text-xl',
    badge: 'text-sm px-2.5 py-1',
  },
};

/**
 * Price display component with dual currency support.
 *
 * STACKED LAYOUT: UAH on top (primary, large, metallic), USD below (secondary, smaller, muted).
 * Never places currencies side-by-side to prevent text overlapping.
 *
 * Supports discount display with original price crossed out and optional percentage badge.
 *
 * @example
 * <Price primaryCents={415000} secondaryCents={9999} />
 *
 * @example
 * // With discount
 * <Price
 *   primaryCents={415000}
 *   secondaryCents={9999}
 *   originalPrimaryCents={550000}
 *   originalSecondaryCents={13999}
 *   showDiscountBadge
 * />
 */
export function Price({
  primaryCents,
  secondaryCents,
  originalPrimaryCents,
  originalSecondaryCents,
  size = 'md',
  metallicVariant = 'gold',
  showDiscountBadge = true,
  approximate = false,
  className = '',
  formatPrimary = defaultFormatPrimary,
  formatSecondary = defaultFormatSecondary,
}: PriceProps) {
  const classes = SIZE_CLASSES[size];
  const primary = formatPrimary(primaryCents);
  const secondary = formatSecondary(secondaryCents);
  const [showInfo, setShowInfo] = useState(false);

  const hasDiscount =
    originalPrimaryCents &&
    originalSecondaryCents &&
    originalPrimaryCents > primaryCents;

  const discountPercentage = hasDiscount
    ? calculateDiscountPercentage(primaryCents, originalPrimaryCents)
    : 0;

  const originalPrimary = hasDiscount ? formatPrimary(originalPrimaryCents) : null;

  const handleInfoClick = () => {
    setShowInfo(!showInfo);
  };

  return (
    <div className={`inline-flex flex-col gap-0.5 ${className}`}>
      {/* Discount badge and original price */}
      {hasDiscount && originalPrimary && (
        <div className="flex items-center gap-2 flex-wrap">
          {showDiscountBadge && (
            <>
              <span
                className={`${classes.badge} bg-red-500/20 text-red-400 rounded font-semibold`}
                aria-label={`${discountPercentage} percent discount`}
              >
                -{discountPercentage}%
              </span>
              <span className="sr-only">
                Original price: {originalPrimary.formatted}
              </span>
            </>
          )}
          <span
            className={`${classes.original} text-foreground-muted line-through`}
            aria-hidden="true"
          >
            {approximate && '\u2248 '}{originalPrimary.formatted}
          </span>
        </div>
      )}

      {/* Primary price (UAH) — own line, metallic, large */}
      <div className="flex items-center gap-2 relative">
        <MetallicText variant={metallicVariant} className={`${classes.primary} font-bold`}>
          {approximate && '\u2248 '}{primary.formatted}
        </MetallicText>
        {approximate && (
          <>
            <button
              onClick={handleInfoClick}
              className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-surface hover:bg-surface-hover transition-colors"
              aria-label="Information about the price"
              title="Why approximate price?"
            >
              <Icon name="info" size="xs" className="text-foreground-muted" />
            </button>
            {showInfo && (
              <div className="absolute left-0 top-full mt-2 w-72 p-4 bg-surface border border-border rounded-lg shadow-xl z-50">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-sm">Approximate price</h4>
                  <button
                    onClick={() => setShowInfo(false)}
                    className="text-foreground-muted hover:text-foreground"
                    aria-label="Close"
                  >
                    {'\u2715'}
                  </button>
                </div>
                <p className="text-sm text-foreground-muted leading-relaxed mb-2">
                  This is an approximate price from open sources. For the exact cost and current
                  delivery terms, please contact the official distributor.
                </p>
                <p className="text-xs text-foreground-muted">
                  The final price may differ depending on configuration, exchange rate, and current promotions.
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Secondary price (USD) — own line below, smaller, muted */}
      <span className={`${classes.secondary} text-foreground-muted`}>
        {approximate && '\u2248 '}{secondary.formatted}
      </span>

      {/* Screen reader text */}
      <span className="sr-only">
        {approximate && 'Approximate price: '}Price: {primary.formatted} or {secondary.formatted}
      </span>
    </div>
  );
}

/**
 * Inline price display — still stacked (UAH top, USD bottom) but more compact.
 *
 * Use for product lists, comparison rows, or anywhere space is tight but
 * dual-currency display is needed. Original price shown inline with current.
 *
 * @example
 * <PriceInline primaryCents={415000} secondaryCents={9999} />
 */
export function PriceInline({
  primaryCents,
  secondaryCents,
  originalPrimaryCents,
  originalSecondaryCents,
  size = 'sm',
  metallicVariant = 'gold',
  className = '',
  formatPrimary = defaultFormatPrimary,
  formatSecondary = defaultFormatSecondary,
}: Omit<PriceProps, 'showDiscountBadge'>) {
  const classes = SIZE_CLASSES[size];
  const primary = formatPrimary(primaryCents);
  const secondary = formatSecondary(secondaryCents);

  const hasDiscount =
    originalPrimaryCents &&
    originalSecondaryCents &&
    originalPrimaryCents > primaryCents;

  const originalPrimary = hasDiscount ? formatPrimary(originalPrimaryCents) : null;

  return (
    <div className={`inline-flex flex-col gap-0.5 ${className}`}>
      {/* Primary price row: original (struck) + current */}
      <div className="flex items-baseline gap-2 flex-wrap">
        {hasDiscount && originalPrimary && (
          <>
            <span
              className={`${classes.original} text-foreground-muted line-through`}
              aria-hidden="true"
            >
              {originalPrimary.formatted}
            </span>
            <span className="sr-only">
              Original price: {originalPrimary.formatted}.
            </span>
          </>
        )}
        <MetallicText variant={metallicVariant} className={`${classes.primary} font-bold`}>
          {primary.formatted}
        </MetallicText>
      </div>

      {/* Secondary price — always on its own line below */}
      <span className={`${classes.secondary} text-foreground-muted`}>
        {secondary.formatted}
      </span>

      <span className="sr-only">
        {hasDiscount ? 'Sale price: ' : 'Price: '}
        {primary.formatted} or {secondary.formatted}
      </span>
    </div>
  );
}

/**
 * Compact price display for lists and cards.
 *
 * Two-line vertical layout: UAH on top, USD below with approximate prefix.
 * Optimized for card layouts where space is constrained.
 *
 * @example
 * <PriceCompact primaryCents={415000} secondaryCents={9999} />
 */
export function PriceCompact({
  primaryCents,
  secondaryCents,
  originalPrimaryCents,
  originalSecondaryCents,
  metallicVariant = 'gold',
  className = '',
  formatPrimary = defaultFormatPrimary,
  formatSecondary = defaultFormatSecondary,
}: Pick<
  PriceProps,
  | 'primaryCents'
  | 'secondaryCents'
  | 'originalPrimaryCents'
  | 'originalSecondaryCents'
  | 'metallicVariant'
  | 'className'
  | 'formatPrimary'
  | 'formatSecondary'
>) {
  const primary = formatPrimary(primaryCents);
  const secondary = formatSecondary(secondaryCents);

  const hasDiscount =
    originalPrimaryCents &&
    originalSecondaryCents &&
    originalPrimaryCents > primaryCents;

  const originalPrimary = hasDiscount ? formatPrimary(originalPrimaryCents) : null;

  return (
    <div className={`inline-flex flex-col ${className}`}>
      {/* Original price row (if discounted) */}
      {hasDiscount && originalPrimary && (
        <>
          <span className="text-sm text-foreground-muted line-through" aria-hidden="true">
            {originalPrimary.formatted}
          </span>
          <span className="sr-only">
            Original price: {originalPrimary.formatted}.
          </span>
        </>
      )}

      {/* Primary price (UAH) — own line */}
      <MetallicText variant={metallicVariant} className="text-lg font-bold">
        {primary.formatted}
      </MetallicText>

      {/* Secondary price (USD) — own line below */}
      <span className="text-xs text-foreground-muted">
        {'\u2248'} {secondary.formatted}
      </span>

      <span className="sr-only">
        {hasDiscount ? 'Sale price: ' : 'Price: '}
        {primary.formatted}, approximately {secondary.formatted}
      </span>
    </div>
  );
}

/**
 * Tile price display for product grid cards.
 *
 * STACKED layout: UAH on top (large, bold, metallic), USD below (smaller, muted).
 * Original price shown above both if discounted.
 * Responsive text sizing scales on sm+ screens.
 *
 * @example
 * <PriceTile primaryCents={415000} secondaryCents={9999} />
 */
export function PriceTile({
  primaryCents,
  secondaryCents,
  originalPrimaryCents,
  originalSecondaryCents,
  metallicVariant = 'gold',
  className = '',
  formatPrimary = defaultFormatPrimary,
  formatSecondary = defaultFormatSecondary,
}: Pick<
  PriceProps,
  | 'primaryCents'
  | 'secondaryCents'
  | 'originalPrimaryCents'
  | 'originalSecondaryCents'
  | 'metallicVariant'
  | 'className'
  | 'formatPrimary'
  | 'formatSecondary'
>) {
  const primary = formatPrimary(primaryCents);
  const secondary = formatSecondary(secondaryCents);

  const hasDiscount =
    originalPrimaryCents &&
    originalSecondaryCents &&
    originalPrimaryCents > primaryCents;

  const originalPrimary = hasDiscount ? formatPrimary(originalPrimaryCents) : null;

  return (
    <div className={`flex flex-col gap-0.5 ${className}`}>
      {/* Original price if discounted — top line */}
      {hasDiscount && originalPrimary && (
        <>
          <span className="text-sm text-foreground-muted line-through" aria-hidden="true">
            {originalPrimary.formatted}
          </span>
          <span className="sr-only">
            Original price: {originalPrimary.formatted}.
          </span>
        </>
      )}

      {/* Primary price (UAH) — own line, large, bold */}
      <MetallicText
        variant={metallicVariant}
        className="text-xl sm:text-2xl font-bold tracking-tight"
      >
        {primary.formatted}
      </MetallicText>

      {/* Secondary price (USD) — own line below, smaller */}
      <span className="text-xs text-foreground-muted">
        {secondary.formatted}
      </span>

      <span className="sr-only">
        {hasDiscount ? 'Sale price: ' : 'Price: '}
        {primary.formatted}, or {secondary.formatted}
      </span>
    </div>
  );
}
