'use client';

import { formatUAH, formatUSD, type FormattedPrice } from '@scootify/shared/lib/currency';
import { MetallicText } from './MetallicText';
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
 * Price display component with dual currency support
 *
 * Shows price with primary currency (large, metallic) and secondary currency (smaller, muted).
 * Supports discount display with original price crossed out and optional percentage badge.
 *
 * Features:
 * - Customizable formatters for both currencies
 * - Screen reader accessible with sr-only text
 * - Metallic gradient text for primary price
 * - Responsive sizing (sm/md/lg/xl)
 * - Discount badge with percentage
 *
 * @example
 * // Simple price with defaults (UAH primary, USD secondary)
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
 *
 * @example
 * // Custom formatters
 * <Price
 *   primaryCents={9999}
 *   secondaryCents={415000}
 *   formatPrimary={(cents) => ({ amount: cents/100, formatted: `€${cents/100}`, currency: 'EUR', symbol: '€' })}
 *   formatSecondary={(cents) => ({ amount: cents/100, formatted: `£${cents/100}`, currency: 'GBP', symbol: '£' })}
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
  className = '',
  formatPrimary = defaultFormatPrimary,
  formatSecondary = defaultFormatSecondary,
}: PriceProps) {
  const classes = SIZE_CLASSES[size];
  const primary = formatPrimary(primaryCents);
  const secondary = formatSecondary(secondaryCents);

  // Calculate discount if both original prices provided
  const hasDiscount =
    originalPrimaryCents &&
    originalSecondaryCents &&
    originalPrimaryCents > primaryCents;

  const discountPercentage = hasDiscount
    ? calculateDiscountPercentage(primaryCents, originalPrimaryCents)
    : 0;

  const originalPrimary = hasDiscount ? formatPrimary(originalPrimaryCents) : null;

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
              {/* Screen reader text for discount context */}
              <span className="sr-only">
                Original price: {originalPrimary.formatted}
              </span>
            </>
          )}
          <span
            className={`${classes.original} text-foreground-muted line-through`}
            aria-hidden="true"
          >
            {originalPrimary.formatted}
          </span>
        </div>
      )}

      {/* Primary price - metallic, large */}
      <MetallicText variant={metallicVariant} className={`${classes.primary} font-bold`}>
        {primary.formatted}
      </MetallicText>

      {/* Secondary price - muted, smaller */}
      <span className={`${classes.secondary} text-foreground-muted`}>
        {secondary.formatted}
      </span>

      {/* Screen reader text for full price */}
      <span className="sr-only">
        Price: {primary.formatted} or {secondary.formatted}
      </span>
    </div>
  );
}

/**
 * Inline price display with horizontal layout
 *
 * Displays price information in a single line with primary price emphasized,
 * secondary price in parentheses, and optional original price crossed out.
 *
 * Features:
 * - Horizontal layout for compact spaces
 * - No discount badge (cleaner inline appearance)
 * - Metallic gradient for primary price
 * - Screen reader accessible
 *
 * @example
 * <PriceInline primaryCents={415000} secondaryCents={9999} />
 *
 * @example
 * <PriceInline
 *   primaryCents={415000}
 *   secondaryCents={9999}
 *   originalPrimaryCents={550000}
 *   originalSecondaryCents={13999}
 * />
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
    <div className={`inline-flex items-baseline gap-2 flex-wrap ${className}`}>
      {/* Original price if discounted */}
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

      {/* Primary price */}
      <MetallicText variant={metallicVariant} className={`${classes.primary} font-bold`}>
        {primary.formatted}
      </MetallicText>

      {/* Secondary price in parentheses */}
      <span className={`${classes.secondary} text-foreground-muted`}>
        ({secondary.formatted})
      </span>

      {/* Screen reader text */}
      <span className="sr-only">
        {hasDiscount ? 'Sale price: ' : 'Price: '}
        {primary.formatted} or {secondary.formatted}
      </span>
    </div>
  );
}

/**
 * Compact price display for lists and cards
 *
 * Two-line vertical layout with primary price and discount on first line,
 * secondary price (with ≈ prefix) on second line. Optimized for card layouts.
 *
 * Features:
 * - Compact two-line layout
 * - Fixed size (no size prop)
 * - Metallic gradient for primary price
 * - Approximate symbol (≈) for secondary price
 *
 * @example
 * <PriceCompact primaryCents={415000} secondaryCents={9999} />
 *
 * @example
 * <PriceCompact
 *   primaryCents={415000}
 *   secondaryCents={9999}
 *   originalPrimaryCents={550000}
 *   originalSecondaryCents={13999}
 * />
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
      <div className="flex items-center gap-2">
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
        <MetallicText variant={metallicVariant} className="text-lg font-bold">
          {primary.formatted}
        </MetallicText>
      </div>
      <span className="text-xs text-foreground-muted">
        ≈ {secondary.formatted}
      </span>
      <span className="sr-only">
        {hasDiscount ? 'Sale price: ' : 'Price: '}
        {primary.formatted}, approximately {secondary.formatted}
      </span>
    </div>
  );
}

/**
 * Tile price display for product cards
 *
 * Prominent, bold price display optimized for product grid tiles.
 * Primary price is large and responsive, secondary price is inline.
 *
 * Features:
 * - Large, responsive primary price
 * - Inline secondary price
 * - Original price shown above if discounted
 * - Metallic gradient for emphasis
 * - Responsive text sizing (scales on sm+ screens)
 *
 * @example
 * <PriceTile primaryCents={415000} secondaryCents={9999} />
 *
 * @example
 * <PriceTile
 *   primaryCents={415000}
 *   secondaryCents={9999}
 *   originalPrimaryCents={550000}
 *   originalSecondaryCents={13999}
 * />
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
      {/* Original price if discounted - above current price */}
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
      {/* Primary price - large and bold, responsive */}
      <div className="flex items-baseline gap-2">
        <MetallicText
          variant={metallicVariant}
          className="text-xl sm:text-2xl font-bold tracking-tight"
        >
          {primary.formatted}
        </MetallicText>
        {/* Secondary price - smaller, inline */}
        <span className="text-xs text-foreground-muted">
          {secondary.formatted}
        </span>
      </div>
      <span className="sr-only">
        {hasDiscount ? 'Sale price: ' : 'Price: '}
        {primary.formatted}, or {secondary.formatted}
      </span>
    </div>
  );
}
