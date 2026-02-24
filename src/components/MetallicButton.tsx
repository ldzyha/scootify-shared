import { type MetallicVariant } from '@scootify/shared/lib/metallic';
import { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';

/**
 * Props for the MetallicButton component.
 */
export interface MetallicButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button content */
  children: ReactNode;
  /** Visual style variant */
  variant: MetallicVariant;
  /** Button size preset */
  size?: 'sm' | 'md' | 'lg';
  /** Optional custom styles to merge with button styles */
  style?: CSSProperties;
  /** 
   * Optional metallic gradients to use instead of defaults.
   * Allows sites to inject their brand-specific gradients.
   */
  metallicGradients?: Record<string, string | undefined>;
}

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

/**
 * Default text colors for each variant.
 * Dark text for light backgrounds (silver, platinum, gold, brandText),
 * white text for dark backgrounds (blue, red, green, brandBg).
 */
const textColors: Record<MetallicVariant, string> = {
  silver: '#1a1a1a',
  platinum: '#1a1a1a',
  blue: '#ffffff',
  gold: '#1a1a1a',
  red: '#ffffff',
  green: '#ffffff',
  brandBg: '#ffffff',
  brandText: '#1a1a1a',
};

/**
 * Default metallic gradients.
 * These can be overridden via the `metallicGradients` prop.
 */
const defaultMetallicGradients: Record<MetallicVariant, string> = {
  silver: 'linear-gradient(135deg, #e8e8e8 0%, #ffffff 25%, #d0d0d0 50%, #ffffff 75%, #e8e8e8 100%)',
  platinum: 'linear-gradient(135deg, #f5f5f5 0%, #ffffff 25%, #e0e0e0 50%, #ffffff 75%, #f5f5f5 100%)',
  blue: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 25%, #2563eb 50%, #60a5fa 75%, #1e3a8a 100%)',
  gold: 'linear-gradient(135deg, #fbbf24 0%, #fef3c7 25%, #f59e0b 50%, #fde68a 75%, #fbbf24 100%)',
  red: 'linear-gradient(135deg, #991b1b 0%, #ef4444 25%, #dc2626 50%, #f87171 75%, #991b1b 100%)',
  green: 'linear-gradient(135deg, #166534 0%, #22c55e 25%, #16a34a 50%, #4ade80 75%, #166534 100%)',
  brandBg: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 25%, #2563eb 50%, #60a5fa 75%, #1e3a8a 100%)',
  brandText: 'linear-gradient(135deg, #fbbf24 0%, #fef3c7 25%, #f59e0b 50%, #fde68a 75%, #fbbf24 100%)',
};

/**
 * MetallicButton - A button component with metallic gradient styling.
 * 
 * Supports 8 variants (silver, platinum, blue, gold, red, green, brandBg, brandText),
 * 3 sizes (sm, md, lg), and full accessibility features.
 * 
 * @example
 * ```tsx
 * <MetallicButton variant="blue" size="md" onClick={handleClick}>
 *   Click me
 * </MetallicButton>
 * ```
 * 
 * @example
 * ```tsx
 * // With custom brand gradients
 * <MetallicButton 
 *   variant="brandBg" 
 *   metallicGradients={customGradients}
 * >
 *   Brand Button
 * </MetallicButton>
 * ```
 */
export function MetallicButton({
  children,
  variant,
  size = 'md',
  className = '',
  style: customStyle,
  metallicGradients,
  disabled,
  ...props
}: MetallicButtonProps) {
  const gradients = metallicGradients || defaultMetallicGradients;
  
  const style: CSSProperties = {
    background: gradients[variant] || defaultMetallicGradients[variant],
    color: textColors[variant],
    ...customStyle,
  };

  return (
    <button
      className={`
        ${sizeClasses[size]}
        rounded-full
        font-bold
        transition-all
        hover:scale-105
        hover:shadow-xl
        active:scale-95
        disabled:opacity-50
        disabled:cursor-not-allowed
        disabled:hover:scale-100
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-offset-2
        focus-visible:ring-offset-[#121212]
        focus-visible:ring-blue-400
        ${className}
      `}
      style={style}
      disabled={disabled}
      aria-disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
