import { metallicBase, type MetallicVariant } from '@scootify/shared/lib/metallic';
import { CSSProperties, ReactNode } from 'react';

/**
 * A polymorphic text component that applies metallic gradient effects.
 * 
 * Features:
 * - Supports multiple HTML elements via the `as` prop (span, p, h1-h6)
 * - Accepts custom metallic gradient palettes
 * - Proper text clipping for gradient backgrounds (cross-browser)
 * - Prevents descender clipping with bottom padding
 * - Custom style passthrough for additional styling
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <MetallicText variant="blue">Shiny Blue Text</MetallicText>
 * 
 * // As heading
 * <MetallicText variant="gold" as="h1">Premium Title</MetallicText>
 * 
 * // Custom gradients
 * <MetallicText 
 *   variant="custom" 
 *   metallicGradients={{ custom: 'linear-gradient(...)' }}
 * >
 *   Custom Gradient
 * </MetallicText>
 * 
 * // With additional styles
 * <MetallicText 
 *   variant="blue" 
 *   style={{ fontSize: '2rem', fontWeight: 'bold' }}
 * >
 *   Large Blue Text
 * </MetallicText>
 * ```
 */
export interface MetallicTextProps {
  /** The content to render with metallic gradient */
  children: ReactNode;
  
  /** The metallic gradient variant to apply */
  variant: MetallicVariant;
  
  /** The HTML element to render as. Defaults to 'span' */
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  
  /** Additional CSS classes to apply */
  className?: string;
  
  /** Additional inline styles to merge with the metallic effect */
  style?: CSSProperties;
  
  /** 
   * Custom metallic gradient palette. 
   * If not provided, uses the default metallicBase palette.
   */
  metallicGradients?: Record<string, string | undefined>;
}

/**
 * A text component that applies metallic gradient effects using background-clip.
 * 
 * The component uses CSS background-clip technique to create text with gradient fills.
 * It handles cross-browser compatibility (WebKit prefixes) and prevents common issues
 * like descender clipping.
 * 
 * @param props - Component props
 * @returns A polymorphic text element with metallic gradient effect
 */
export function MetallicText({
  children,
  variant,
  as: Component = 'span',
  className = '',
  style: customStyle,
  metallicGradients = metallicBase,
}: MetallicTextProps) {
  // Get gradient value, falling back to metallicBase for base variants
  const gradientValue = metallicGradients[variant] || 
    (variant in metallicBase ? metallicBase[variant as keyof typeof metallicBase] : undefined);
  
  const style: CSSProperties = {
    background: gradientValue,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    color: 'transparent', // Firefox requires this for background-clip: text
    display: 'inline-block',
    paddingBottom: '4px', // Prevents text clipping for descenders (g, y, p, q, j)
    ...customStyle, // Merge custom styles after base styles
  };

  return (
    <Component className={className} style={style}>
      {children}
    </Component>
  );
}

// Default export for convenience
export default MetallicText;
