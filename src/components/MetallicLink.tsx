import { type MetallicVariant } from '@scootify/shared/lib/metallic';
import { AnchorHTMLAttributes, CSSProperties, ReactNode } from 'react';
import styles from './MetallicLink.module.css';

/**
 * Props for the MetallicLink component.
 */
export interface MetallicLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'style'> {
  /** Link destination (required) */
  href: string;
  /** Link content */
  children: ReactNode;
  /** Visual style variant */
  variant: MetallicVariant;
  /** Link size preset */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes */
  className?: string;
  /** Optional custom styles to merge */
  style?: CSSProperties;
  /**
   * Optional metallic gradients to use instead of defaults.
   * Allows sites to inject their brand-specific gradients.
   */
  metallicGradients?: Record<string, string | undefined>;
  /**
   * Custom render function for the link element.
   * Use this to integrate with framework routers (e.g. Next.js Link).
   *
   * @example
   * ```tsx
   * import Link from 'next/link';
   * <MetallicLink
   *   href="/about"
   *   variant="blue"
   *   renderLink={(props, children) => <Link {...props}>{children}</Link>}
   * >
   *   About
   * </MetallicLink>
   * ```
   */
  renderLink?: (
    props: { href: string; className: string; style: CSSProperties } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'style'>,
    children: ReactNode
  ) => ReactNode;
}

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
 * MetallicLink — An anchor/link component with metallic gradient styling.
 *
 * Mirrors MetallicButton's visual design but renders as a link (`<a>`).
 * Supports proper :hover, :active, and :focus-visible states via CSS Module.
 * Use `renderLink` to integrate with framework routers (Next.js Link, etc.).
 *
 * @example
 * ```tsx
 * // Plain anchor
 * <MetallicLink href="/catalog" variant="blue" size="md">
 *   Browse catalog
 * </MetallicLink>
 *
 * // With Next.js Link
 * <MetallicLink
 *   href="/"
 *   variant="blue"
 *   renderLink={(props, children) => <Link {...props}>{children}</Link>}
 * >
 *   Go home
 * </MetallicLink>
 * ```
 */
export function MetallicLink({
  children,
  variant,
  size = 'md',
  className = '',
  style: customStyle,
  metallicGradients,
  renderLink,
  ...props
}: MetallicLinkProps) {
  const gradients = metallicGradients || defaultMetallicGradients;

  const style: CSSProperties = {
    background: gradients[variant] || defaultMetallicGradients[variant],
    color: textColors[variant],
    ...customStyle,
  };

  const combinedClassName = `${styles.link} ${styles[size]} ${className}`.trim();

  const linkProps = {
    ...props,
    className: combinedClassName,
    style,
  };

  if (renderLink) {
    return <>{renderLink(linkProps, children)}</>;
  }

  return (
    <a {...linkProps}>
      {children}
    </a>
  );
}
