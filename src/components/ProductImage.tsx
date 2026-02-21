"use client";

import { useState, ReactNode } from "react";

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  aspectRatio?: "square" | "video" | "auto";
  fetchPriority?: "high" | "low" | "auto";
  style?: React.CSSProperties;
  /** Custom fallback component to display when image fails to load or is invalid. If not provided, uses default gradient background. */
  fallbackComponent?: ReactNode;
  /** 
   * Custom CDN URL pattern for detecting CDN images. 
   * If provided, images matching this pattern will use CDN-specific srcSet logic.
   * Default: Checks for "_large.webp" suffix
   */
  cdnUrlPattern?: string;
}

/**
 * Generates responsive srcSet for product images
 *
 * Supports multiple URL formats:
 * 1. Local images: /images/products/tiger-10/main.webp -> -sm.webp, -md.webp, .webp
 * 2. CDN images: URLs with _large.webp -> _thumbnail.webp, _medium.webp, _large.webp
 * 3. Custom CDN pattern via cdnUrlPattern prop
 * 
 * @param src - Source URL of the image
 * @param cdnUrlPattern - Optional custom CDN URL pattern for detection
 * @returns Formatted srcSet string or undefined if no responsive images available
 */
function getSrcSet(src: string | undefined | null, cdnUrlPattern?: string): string | undefined {
  if (!src || typeof src !== 'string' || !src.endsWith(".webp")) {
    return undefined;
  }

  // CDN URL format: ends with _large.webp, _medium.webp, _thumbnail.webp, or _swatch.webp
  // Check custom pattern first, then default pattern
  const isCdnUrl = cdnUrlPattern ? src.includes(cdnUrlPattern) : src.includes("_large.webp");
  
  if (isCdnUrl && src.includes("_large.webp")) {
    const basePath = src.replace("_large.webp", "");
    return `${basePath}_thumbnail.webp 400w, ${basePath}_medium.webp 800w, ${basePath}_large.webp 1920w`;
  }

  // Local image format: /images/products/category/name.webp
  if (src.includes("/images/products/")) {
    const basePath = src.replace(".webp", "");
    return `${basePath}-sm.webp 400w, ${basePath}-md.webp 800w, ${basePath}.webp 1200w`;
  }

  return undefined;
}

/**
 * Default fallback component with dark gradient background
 * Used when image fails to load and no custom fallback is provided
 */
function DefaultImageFallback({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{
        background: 'linear-gradient(135deg, #0f0f14 0%, #161620 50%, #0f0f14 100%)',
      }}
      aria-label="Image not available"
    />
  );
}

/**
 * Responsive Product Image component using native img with srcset
 * 
 * Features:
 * - Automatic srcSet generation for responsive images (400w, 800w, 1200w/1920w)
 * - Support for both local images and CDN images
 * - Customizable fallback component for brand-specific error handling
 * - Optimized loading strategies (lazy/eager) based on priority
 * - Fetch priority control for LCP optimization
 * - Aspect ratio presets (square, video, auto)
 * - Comprehensive error handling with fallback rendering
 * - TypeScript typed for better DX
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <ProductImage 
 *   src="/images/products/tiger-10/main.webp" 
 *   alt="Tiger 10 Electric Scooter" 
 * />
 * 
 * // With custom fallback (brand logo)
 * <ProductImage 
 *   src={product.imageUrl}
 *   alt={product.name}
 *   fallbackComponent={<BrandLogo variant="light" className="opacity-40" />}
 *   aspectRatio="square"
 *   priority
 * />
 * 
 * // With custom CDN pattern
 * <ProductImage 
 *   src="https://cdn.example.com/products/image_large.webp"
 *   alt="Product"
 *   cdnUrlPattern="cdn.example.com"
 * />
 * ```
 * 
 * Optimized for static export - no Next.js Image optimization needed
 */
export function ProductImage({
  src,
  alt,
  className = "",
  priority = false,
  sizes = "(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px",
  aspectRatio = "auto",
  fetchPriority,
  style,
  fallbackComponent,
  cdnUrlPattern,
}: ProductImageProps) {
  const [hasError, setHasError] = useState(false);
  const srcSet = getSrcSet(src, cdnUrlPattern);

  const aspectClasses = {
    square: "aspect-square object-cover",
    video: "aspect-video object-cover",
    auto: "",
  };

  // Show fallback if src is invalid or on error
  if (hasError || !src || typeof src !== 'string') {
    const fallbackClassName = `${aspectClasses[aspectRatio]} ${className}`;
    
    if (fallbackComponent) {
      return <div className={fallbackClassName}>{fallbackComponent}</div>;
    }
    
    return <DefaultImageFallback className={fallbackClassName} />;
  }

  // Set fetchpriority for LCP optimization
  const imgFetchPriority = fetchPriority || (priority ? "high" : undefined);

  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      className={`${aspectClasses[aspectRatio]} ${className}`}
      style={style}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onError={() => setHasError(true)}
      {...(imgFetchPriority && { fetchPriority: imgFetchPriority })}
    />
  );
}

export default ProductImage;
