import type { MetallicBaseVariant } from '@scootify/shared/lib/metallic';

// Re-export metallic gradient names
type MetallicVariant = MetallicBaseVariant | 'brandBg' | 'brandText';
import { CSSProperties, useId } from 'react';

// ============================================
// Icon paths - Heroicons style (24x24 viewBox)
// ============================================

const iconPaths = {
  // ==================
  // UI Icons
  // ==================
  
  /** Close/X icon for dismissing modals, removing items */
  close: (
    <>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </>
  ),
  
  /** Chevron pointing down - for dropdowns, accordions */
  chevronDown: <path d="M6 9l6 6 6-6" />,
  
  /** Chevron pointing up - for collapsible sections */
  chevronUp: <path d="M18 15l-6-6-6 6" />,
  
  /** Chevron pointing left - for back navigation */
  chevronLeft: <path d="M15 18l-6-6 6-6" />,
  
  /** Chevron pointing right - for forward navigation, next */
  chevronRight: <path d="M9 18l6-6-6-6" />,
  
  /** Hamburger menu icon - for mobile navigation */
  menu: (
    <>
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </>
  ),
  
  /** Search icon - for search inputs, buttons */
  search: (
    <>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </>
  ),

  // ==================
  // Action Icons
  // ==================
  
  /** Trash/delete icon - for removing items */
  trash: <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" />,
  
  /** Edit/pencil icon - for editing content */
  edit: <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />,
  
  /** Plus icon - for adding items, expanding */
  plus: (
    <>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </>
  ),
  
  /** Minus icon - for removing, collapsing */
  minus: <line x1="5" y1="12" x2="19" y2="12" />,
  
  /** Checkmark icon - for success, completion */
  check: <path d="M20 6L9 17l-5-5" />,

  // ==================
  // E-commerce Icons
  // ==================
  
  /** Shopping cart icon - for cart, add to cart */
  cart: <path d="M9 22a1 1 0 100-2 1 1 0 000 2zM20 22a1 1 0 100-2 1 1 0 000 2zM1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />,
  
  /** Heart outline - for wishlist, favorites */
  heart: <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />,
  
  /** Heart filled - for active wishlist items */
  heartFilled: <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" fill="currentColor" />,
  
  /** Star outline - for ratings, favorites */
  star: <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />,
  
  /** Star filled - for active ratings */
  starFilled: <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor" />,

  // ==================
  // Service Icons
  // ==================
  
  /** Lightning bolt - for speed, power, quick actions */
  lightning: <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />,
  
  /** Shield - for security, protection */
  shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  
  /** Shield with checkmark - for warranty, verified */
  shieldCheck: <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
  
  /** Phone - for contact, call actions */
  phone: <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />,
  
  /** Truck - for delivery, shipping */
  truck: <path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8zM5.5 21a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM18.5 21a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />,
  
  /** Mail/envelope - for email, messages */
  mail: (
    <>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <path d="M22 6l-10 7L2 6" />
    </>
  ),
  
  /** Globe - for language, internationalization */
  globe: (
    <>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </>
  ),
  
  /** Map pin - for location, address */
  mapPin: <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0zM12 13a3 3 0 100-6 3 3 0 000 6z" />,
  
  /** Clock - for time, schedule */
  clock: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </>
  ),

  // ==================
  // Status Icons
  // ==================
  
  /** Info icon - for information messages */
  info: (
    <>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </>
  ),
  
  /** Warning triangle - for warning messages */
  warning: <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01" />,
  
  /** Error/X in circle - for error messages */
  error: (
    <>
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </>
  ),
  
  /** Success/check in circle - for success messages */
  success: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),

  // ==================
  // Social Icons
  // ==================
  
  /** Telegram icon - for Telegram links, social */
  telegram: (
    <path d="M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-16.5 6.75a2.25 2.25 0 0 0 .126 4.303l3.198 1.044v4.255a2.25 2.25 0 0 0 3.85 1.59l1.932-1.932 3.748 2.812a2.25 2.25 0 0 0 3.532-1.299l3-13.5a2.25 2.25 0 0 0-1.864-2.238z" data-filled="true" />
  ),

  // ==================
  // Feedback Icons
  // ==================
  
  /** Eye icon - for view, visibility toggle */
  eye: (
    <>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  
  /** Thumb down - for dislike, negative feedback */
  thumbDown: <path d="M17 14V2M9 18.12L10.5 21a.9.9 0 01-.84 1.24h-.08c-.85-.11-1.73-.23-2.58-.36-.56-.08-1.06-.4-1.39-.86L3.5 18H2a2 2 0 01-2-2v-4c0-.55.45-1 1-1h2.5l3.62-3.62a2 2 0 011.44-.59h5.94a2 2 0 012 2v9.88a2 2 0 01-1.38 1.9l-4.86 1.62a2 2 0 01-1.76-.27z" />,
  
  /** Thumb up - for like, positive feedback */
  thumbUp: <path d="M7 10v12M15 5.88L13.5 3a.9.9 0 01.84-1.24h.08c.85.11 1.73.23 2.58.36.56.08 1.06.4 1.39.86L20.5 6H22a2 2 0 012 2v4c0 .55-.45 1-1 1h-2.5l-3.62 3.62a2 2 0 01-1.44.59H9a2 2 0 01-2-2V6.12a2 2 0 011.38-1.9l4.86-1.62a2 2 0 011.76.27z" />,

  // ==================
  // Misc Icons
  // ==================
  
  /** User icon - for account, profile */
  user: (
    <>
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </>
  ),
  
  /** Settings/gear icon - for settings, configuration */
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
    </>
  ),
  
  /** External link - for opening in new tab */
  externalLink: (
    <>
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <path d="M15 3h6v6" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </>
  ),
  
  /** Copy icon - for copy to clipboard */
  copy: (
    <>
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </>
  ),
  
  /** Share icon - for sharing content */
  share: (
    <>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </>
  ),
  
  /** Filter icon - for filtering lists */
  filter: <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />,
  
  /** QR code icon - for QR codes, scanning */
  qrCode: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="3" height="3" />
      <rect x="18" y="14" width="3" height="3" />
      <rect x="14" y="18" width="3" height="3" />
      <rect x="18" y="18" width="3" height="3" />
    </>
  ),
  
  /** Sort icon - for sorting lists */
  sort: (
    <>
      <line x1="4" y1="9" x2="20" y2="9" />
      <line x1="4" y1="15" x2="14" y2="15" />
      <line x1="4" y1="3" x2="8" y2="3" />
      <line x1="4" y1="21" x2="10" y2="21" />
    </>
  ),
} as const;

/**
 * Base icon registry containing all built-in icons.
 * Sites can extend this by adding custom icons.
 */
export type IconName = keyof typeof iconPaths;

// ============================================
// Extensible Icon Registry
// ============================================

/**
 * Custom icon paths that sites can register.
 * Use `registerCustomIcons` to add site-specific icons.
 */
let customIconPaths: Record<string, React.ReactNode> = {};

/**
 * Register custom icons for site-specific use.
 * 
 * @example
 * ```tsx
 * registerCustomIcons({
 *   scooter: <path d="M..." />,
 *   battery: <path d="M..." />,
 * });
 * 
 * <Icon name="scooter" size="lg" />
 * ```
 */
export function registerCustomIcons(icons: Record<string, React.ReactNode>) {
  customIconPaths = { ...customIconPaths, ...icons };
}

/**
 * Get all available icon names (built-in + custom).
 */
export function getAvailableIcons(): string[] {
  return [...Object.keys(iconPaths), ...Object.keys(customIconPaths)];
}

// ============================================
// Types
// ============================================

/**
 * Brand gradient variants for metallic mode.
 * Sites can pass custom gradients via brandGradients prop.
 */
export interface BrandGradients {
  /** Brand background gradient (e.g., blue to gold) */
  brandBg?: MetallicVariant;
  /** Brand text gradient (e.g., light blue to gold) */
  brandText?: MetallicVariant;
}

/**
 * Props for the Icon component.
 */
export interface IconProps {
  /** 
   * Name of the icon to display.
   * Can be a built-in icon or custom icon (registered via registerCustomIcons).
   */
  name: IconName | string;
  
  /** 
   * Size of the icon.
   * - Preset sizes: xs (12px), sm (16px), md (20px), lg (24px), xl (32px)
   * - Custom size: any number in pixels
   * @default 'md'
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  
  /** 
   * Color of the icon.
   * Can be any CSS color value or 'currentColor'.
   * Ignored when metallic prop is set.
   */
  color?: string;
  
  /** 
   * Metallic gradient variant for the icon.
   * When set, applies a gradient effect instead of solid color.
   * @see MetallicVariant
   */
  metallic?: MetallicVariant;
  
  /** 
   * Additional CSS classes to apply to the SVG element.
   */
  className?: string;
  
  /** 
   * Stroke width for outline icons.
   * @default 2
   */
  strokeWidth?: number;
  
  /** 
   * Accessible label for screen readers.
   * If provided, icon will have role="img", otherwise role="presentation".
   */
  'aria-label'?: string;
  
  /**
   * Brand-specific gradient variants.
   * Used when metallic prop is 'brandBg' or 'brandText'.
   */
  brandGradients?: BrandGradients;
}

// ============================================
// Size mapping
// ============================================

/**
 * Preset size mappings in pixels.
 */
const sizeMap = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
};

/**
 * Icons that use fill instead of stroke.
 * These icons should be rendered with fill instead of stroke.
 */
const filledIcons: Set<string> = new Set([
  'telegram',
  'heartFilled',
  'starFilled',
]);

// ============================================
// Icon Component
// ============================================

/**
 * Universal icon component with metallic gradient support.
 * 
 * Features:
 * - 22+ built-in icons (UI, e-commerce, status, social, etc.)
 * - Extensible icon registry (add custom icons via registerCustomIcons)
 * - Metallic gradient support for premium look
 * - Size presets (xs/sm/md/lg/xl) or custom pixel size
 * - Full accessibility (aria-label, aria-hidden)
 * - Brand gradient customization
 * 
 * @example Basic usage
 * ```tsx
 * <Icon name="cart" size="lg" />
 * <Icon name="heart" size={32} color="#ff0000" />
 * ```
 * 
 * @example Metallic gradient
 * ```tsx
 * <Icon name="star" size="xl" metallic="gold" />
 * <Icon name="shield" metallic="platinum" />
 * ```
 * 
 * @example Custom icons
 * ```tsx
 * registerCustomIcons({
 *   scooter: <path d="M..." />,
 * });
 * <Icon name="scooter" size="lg" />
 * ```
 * 
 * @example Brand gradients
 * ```tsx
 * <Icon 
 *   name="logo" 
 *   metallic="brandBg"
 *   brandGradients={{ brandBg: 'blue' }}
 * />
 * ```
 */
export function Icon({
  name,
  size = 'md',
  color,
  metallic,
  className = '',
  strokeWidth = 2,
  'aria-label': ariaLabel,
  brandGradients,
}: IconProps) {
  const id = useId();
  const gradientId = `icon-gradient-${id}`;

  const pixelSize = typeof size === 'number' ? size : sizeMap[size];
  
  // Get path from built-in or custom registry
  const path = iconPaths[name as IconName] ?? customIconPaths[name];
  
  if (!path) {
    console.warn(`Icon "${name}" not found in registry. Use registerCustomIcons to add custom icons.`);
    return null;
  }
  
  const isFilled = filledIcons.has(name);

  // Determine stroke/fill color
  let colorValue: string;

  if (metallic) {
    // Use gradient reference
    colorValue = `url(#${gradientId})`;
  } else if (color) {
    colorValue = color;
  } else {
    colorValue = 'currentColor';
  }

  return (
    <svg
      width={pixelSize}
      height={pixelSize}
      viewBox="0 0 24 24"
      fill={isFilled ? colorValue : 'none'}
      stroke={isFilled ? 'none' : colorValue}
      strokeWidth={isFilled ? 0 : strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-label={ariaLabel}
      aria-hidden={!ariaLabel}
      role={ariaLabel ? 'img' : 'presentation'}
    >
      {metallic && (
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            {/* Parse metallic gradient and create stops */}
            <MetallicGradientStops variant={metallic} brandGradients={brandGradients} />
          </linearGradient>
        </defs>
      )}
      {path}
    </svg>
  );
}

// ============================================
// Metallic Gradient Stops Helper
// ============================================

/**
 * Component that generates SVG gradient stops for metallic variants.
 * @internal
 */
function MetallicGradientStops({ 
  variant, 
  brandGradients 
}: { 
  variant: MetallicVariant; 
  brandGradients?: BrandGradients;
}) {
  // Gradient color mappings for each variant
  const gradientColors: Record<MetallicVariant, Array<{ offset: string; color: string }>> = {
    silver: [
      { offset: '0%', color: '#a0a0a0' },
      { offset: '50%', color: '#ffffff' },
      { offset: '100%', color: '#a0a0a0' },
    ],
    platinum: [
      { offset: '0%', color: '#707070' },
      { offset: '50%', color: '#d0d0d0' },
      { offset: '100%', color: '#707070' },
    ],
    blue: [
      { offset: '0%', color: '#2a5a8c' },
      { offset: '50%', color: '#80c0f0' },
      { offset: '100%', color: '#2a5a8c' },
    ],
    gold: [
      { offset: '0%', color: '#9a7020' },
      { offset: '50%', color: '#ffd860' },
      { offset: '100%', color: '#9a7020' },
    ],
    red: [
      { offset: '0%', color: '#8c2a2a' },
      { offset: '50%', color: '#f08080' },
      { offset: '100%', color: '#8c2a2a' },
    ],
    green: [
      { offset: '0%', color: '#2a6c2a' },
      { offset: '50%', color: '#80d080' },
      { offset: '100%', color: '#2a6c2a' },
    ],
    brandBg: [
      { offset: '0%', color: '#1a4a7c' },
      { offset: '50%', color: '#50a0e0' },
      { offset: '100%', color: '#ffd860' },
    ],
    brandText: [
      { offset: '0%', color: '#4090d0' },
      { offset: '50%', color: '#80d0ff' },
      { offset: '100%', color: '#ffe880' },
    ],
  } as const;

  // Use custom brand gradients if provided
  let stops = gradientColors[variant as keyof typeof gradientColors] || gradientColors.silver;
  
  // Override with brand-specific gradient if available
  if (variant === 'brandBg' && brandGradients?.brandBg) {
    stops = gradientColors[brandGradients.brandBg as keyof typeof gradientColors] || stops;
  } else if (variant === 'brandText' && brandGradients?.brandText) {
    stops = gradientColors[brandGradients.brandText as keyof typeof gradientColors] || stops;
  }

  return (
    <>
      {stops.map((stop, i) => (
        <stop key={i} offset={stop.offset} stopColor={stop.color} />
      ))}
    </>
  );
}

// ============================================
// Icon list export for documentation
// ============================================

/**
 * Array of all built-in icon names.
 * Use for generating icon galleries, documentation, etc.
 */
export const iconNames = Object.keys(iconPaths) as IconName[];

export default Icon;
