/**
 * Metallic gradient design system
 * Optimized for readability on dark backgrounds
 */

// Base metallic gradients (shared across all sites)
export const metallicBase = {
  // Silver: bright with subtle depth
  silver: 'linear-gradient(135deg, #a0a0a0 0%, #d0d0d0 20%, #f5f5f5 40%, #ffffff 50%, #f5f5f5 60%, #d0d0d0 80%, #a0a0a0 100%)',
  // Platinum: medium brightness, good contrast
  platinum: 'linear-gradient(135deg, #707070 0%, #909090 20%, #b8b8b8 40%, #d0d0d0 50%, #b8b8b8 60%, #909090 80%, #707070 100%)',
  // Blue Metal: vibrant blue with highlights
  blue: 'linear-gradient(135deg, #2a5a8c 0%, #4080b8 20%, #60a0d8 40%, #80c0f0 50%, #60a0d8 60%, #4080b8 80%, #2a5a8c 100%)',
  // Gold Metal: rich gold with warm highlights
  gold: 'linear-gradient(135deg, #9a7020 0%, #c8a030 20%, #e8c050 40%, #ffd860 50%, #e8c050 60%, #c8a030 80%, #9a7020 100%)',
  // Red Metal: vibrant red (for errors/destructive actions)
  red: 'linear-gradient(135deg, #8c2a2a 0%, #b84040 20%, #d86060 40%, #f08080 50%, #d86060 60%, #b84040 80%, #8c2a2a 100%)',
  // Green Metal: vibrant green (for success/confirmations)
  green: 'linear-gradient(135deg, #2a6c2a 0%, #409040 20%, #60b060 40%, #80d080 50%, #60b060 60%, #409040 80%, #2a6c2a 100%)',
} as const;

// Simplified 3-stop gradients (lighter, faster)
export const metallicSimple = {
  silver: 'linear-gradient(135deg, #a0a0a0 0%, #ffffff 50%, #a0a0a0 100%)',
  platinum: 'linear-gradient(135deg, #707070 0%, #d0d0d0 50%, #707070 100%)',
  blue: 'linear-gradient(135deg, #2a5a8c 0%, #80c0f0 50%, #2a5a8c 100%)',
  gold: 'linear-gradient(135deg, #9a7020 0%, #ffd860 50%, #9a7020 100%)',
  red: 'linear-gradient(135deg, #8c2a2a 0%, #f08080 50%, #8c2a2a 100%)',
  green: 'linear-gradient(135deg, #2a6c2a 0%, #80d080 50%, #2a6c2a 100%)',
} as const;

// Subtle metallic backgrounds for cards
export const metallicSubtle = {
  silver: 'linear-gradient(135deg, rgba(160, 160, 160, 0.1) 0%, rgba(220, 220, 220, 0.08) 50%, rgba(160, 160, 160, 0.1) 100%)',
  blue: 'linear-gradient(135deg, rgba(42, 90, 140, 0.2) 0%, rgba(96, 160, 216, 0.1) 50%, rgba(42, 90, 140, 0.2) 100%)',
  gold: 'linear-gradient(135deg, rgba(154, 112, 32, 0.2) 0%, rgba(232, 192, 80, 0.1) 50%, rgba(154, 112, 32, 0.2) 100%)',
  green: 'linear-gradient(135deg, rgba(42, 108, 42, 0.2) 0%, rgba(96, 176, 96, 0.1) 50%, rgba(42, 108, 42, 0.2) 100%)',
} as const;

/**
 * Create complete metallic palette with brand colors
 *
 * @param brandBg - Brand gradient for backgrounds
 * @param brandText - Brand gradient for text (brighter)
 * @param mode - 'rich' (7-stop) or 'simple' (3-stop)
 */
export function createMetallicPalette(
  brandBg: string,
  brandText: string,
  mode: 'rich' | 'simple' = 'rich'
) {
  const base = mode === 'rich' ? metallicBase : metallicSimple;
  
  return {
    ...base,
    brandBg,
    brandText,
  } as const;
}

// Type definitions
export type MetallicBaseVariant = keyof typeof metallicBase;
export type MetallicVariant = MetallicBaseVariant | 'brandBg' | 'brandText';
export type MetallicSubtleVariant = keyof typeof metallicSubtle;

/**
 * Default metallic palettes for each site
 */
export const siteMetallics = {
  hiley: createMetallicPalette(
    'linear-gradient(90deg, #1a4a7c 0%, #3080c0 25%, #50a0e0 50%, #d4a030 75%, #ffd860 100%)',
    'linear-gradient(90deg, #4090d0 0%, #60b0f0 25%, #80d0ff 50%, #ffd860 75%, #ffe880 100%)'
  ),
  nami: createMetallicPalette(
    'linear-gradient(135deg, #006064 0%, #00bcd4 50%, #ff6f00 100%)',
    'linear-gradient(135deg, #00bcd4 0%, #26c6da 25%, #4dd0e1 50%, #26c6da 75%, #00bcd4 100%)',
    'simple'
  ),
  hysco: createMetallicPalette(
    'linear-gradient(90deg, #1a4a7c 0%, #50a0e0 50%, #ffd860 100%)',
    'linear-gradient(90deg, #ff4444 0%, #ff8800 25%, #ffcc00 50%, #ff8800 75%, #ff4444 100%)',
    'simple'
  ),
  scootify: createMetallicPalette(
    'linear-gradient(90deg, #9a7020 0%, #c8a030 50%, #ffd860 100%)', // gold
    'linear-gradient(90deg, #c8a030 0%, #e8c050 25%, #ffd860 50%, #e8c050 75%, #c8a030 100%)'
  ),
};
