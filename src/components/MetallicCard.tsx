import { metallicSubtle, type MetallicSubtleVariant } from '@scootify/shared/lib/metallic';
import { CSSProperties, ReactNode } from 'react';

/**
 * Variant border colors for metallic card borders
 * Maps metallic variants to their border colors with transparency
 */
const variantBorders: Record<string, string> = {
  silver: 'rgba(192, 192, 192, 0.2)',
  blue: 'rgba(74, 126, 184, 0.2)',
  gold: 'rgba(212, 175, 55, 0.2)',
  red: 'rgba(220, 80, 80, 0.2)',
  platinum: 'rgba(160, 160, 160, 0.2)',
  green: 'rgba(42, 108, 42, 0.2)',
};

/**
 * Padding size variants
 */
const paddingClasses = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

/**
 * Props for MetallicCard component
 */
export interface MetallicCardProps {
  /** Card content */
  children: ReactNode;
  /** Metallic variant for subtle background gradient */
  variant?: MetallicSubtleVariant;
  /** Additional CSS classes */
  className?: string;
  /** Padding size (defaults to 'md') */
  padding?: 'sm' | 'md' | 'lg';
  /** Custom inline styles (merged with variant styles) */
  style?: CSSProperties;
  /** Optional custom metallic gradients object */
  metallicGradients?: Record<string, string>;
}

/**
 * MetallicCard component
 * 
 * A card component with metallic gradient backgrounds and borders.
 * Combines hiley's clean API with nami/hysco's style flexibility.
 * 
 * Features:
 * - Metallic subtle background gradients via `variant` prop
 * - Matching border colors for each variant
 * - Configurable padding (sm/md/lg)
 * - Style prop passthrough for custom styling
 * - Custom metallic gradients support
 * 
 * @example
 * ```tsx
 * <MetallicCard variant="blue" padding="lg">
 *   <h2>Title</h2>
 *   <p>Content</p>
 * </MetallicCard>
 * ```
 * 
 * @example
 * ```tsx
 * <MetallicCard 
 *   variant="gold" 
 *   style={{ maxWidth: '600px' }}
 *   metallicGradients={customGradients}
 * >
 *   Custom styled card
 * </MetallicCard>
 * ```
 */
export function MetallicCard({
  children,
  variant,
  className = '',
  padding = 'md',
  style,
  metallicGradients,
}: MetallicCardProps) {
  // Use custom gradients if provided, otherwise use default metallicSubtle
  const gradients = metallicGradients || metallicSubtle;
  
  // Build card style with variant background and border
  const cardStyle: CSSProperties = {
    ...(variant && { background: gradients[variant] }),
    ...(variant && { border: `1px solid ${variantBorders[variant] || 'rgba(255,255,255,0.05)'}` }),
    ...style,
  };

  return (
    <div
      className={`
        card-surface
        rounded-2xl
        ${paddingClasses[padding]}
        ${className}
      `}
      style={cardStyle}
    >
      {children}
    </div>
  );
}

export default MetallicCard;
