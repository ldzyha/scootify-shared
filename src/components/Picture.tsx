import React from 'react';

/**
 * Props for the Picture component
 */
interface PictureProps {
  /** Base image path (without extension) */
  src: string;
  /** Alternative text for the image (required for accessibility) */
  alt: string;
  /** Sizes attribute for responsive images */
  sizes?: string;
  /** Additional CSS classes */
  className?: string;
  /** Enable eager loading for above-the-fold images */
  priority?: boolean;
  /** Aspect ratio preset for the image container */
  aspectRatio?: 'square' | 'video' | 'auto';
  /** Callback fired when image fails to load */
  onError?: () => void;
}

/**
 * Responsive breakpoints configuration
 */
const BREAKPOINTS = {
  mobile: 400,
  tablet: 800,
  laptop: 1200,
  desktop: 1920,
} as const;

/**
 * Image format suffixes for file naming
 */
const SIZE_SUFFIXES = {
  mobile: '-sm',
  tablet: '-md',
  laptop: '',
  desktop: '-xl',
} as const;

/**
 * Aspect ratio CSS values
 */
const ASPECT_RATIOS = {
  square: '1 / 1',
  video: '16 / 9',
  auto: 'auto',
} as const;

/**
 * Default sizes attribute for responsive loading
 */
const DEFAULT_SIZES = [
  '(max-width: 640px) 400px',
  '(max-width: 1024px) 800px',
  '(max-width: 1536px) 1200px',
  '1920px',
].join(', ');

/**
 * Picture component - Modern responsive image wrapper
 *
 * Provides optimized image delivery with:
 * - AVIF and WebP format support with progressive fallbacks
 * - Four responsive breakpoints (mobile, tablet, laptop, desktop)
 * - Lazy loading by default (eager for priority images)
 * - Required alt text for accessibility
 * - Optional aspect ratio presets
 *
 * @example
 * ```tsx
 * <Picture
 *   src="/images/hero"
 *   alt="Hero image"
 *   priority
 *   aspectRatio="video"
 * />
 * ```
 *
 * @example
 * ```tsx
 * <Picture
 *   src="/images/product"
 *   alt="Product photo"
 *   sizes="(max-width: 768px) 100vw, 50vw"
 *   className="rounded-lg shadow-md"
 * />
 * ```
 */
export const Picture: React.FC<PictureProps> = ({
  src,
  alt,
  sizes = DEFAULT_SIZES,
  className,
  priority = false,
  aspectRatio = 'auto',
  onError,
}) => {
  /**
   * Generates srcset string for a given image format
   * Follows naming pattern: {src}-sm.{ext}, {src}-md.{ext}, {src}.{ext}, {src}-xl.{ext}
   */
  const generateSrcSet = (format: 'avif' | 'webp' | 'jpg'): string => {
    return Object.entries(BREAKPOINTS)
      .map(([key, width]) => {
        const suffix = SIZE_SUFFIXES[key as keyof typeof SIZE_SUFFIXES];
        return `${src}${suffix}.${format} ${width}w`;
      })
      .join(', ');
  };

  /**
   * Gets the fallback image source (largest size)
   */
  const getFallbackSrc = (): string => {
    return `${src}${SIZE_SUFFIXES.laptop}.jpg`;
  };

  /**
   * Inline styles for aspect ratio container
   */
  const containerStyle: React.CSSProperties = {
    aspectRatio: ASPECT_RATIOS[aspectRatio],
    display: aspectRatio === 'auto' ? 'inline-block' : 'block',
    width: '100%',
    position: 'relative',
  };

  /**
   * Image element styles to fill container
   */
  const imageStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: aspectRatio === 'auto' ? 'initial' : 'cover',
  };

  return (
    <picture style={containerStyle}>
      {/* AVIF source - best compression and quality */}
      <source
        type="image/avif"
        srcSet={generateSrcSet('avif')}
        sizes={sizes}
      />

      {/* WebP source - fallback for browsers without AVIF support */}
      <source
        type="image/webp"
        srcSet={generateSrcSet('webp')}
        sizes={sizes}
      />

      {/* Final fallback - JPEG for maximum compatibility */}
      <img
        src={getFallbackSrc()}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={className}
        style={imageStyle}
        onError={onError}
      />
    </picture>
  );
};

Picture.displayName = 'Picture';

export default Picture;
