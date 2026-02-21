'use client';

import { useState, useCallback } from 'react';
import { MetallicText } from './MetallicText';

/**
 * Props for the VideoEmbed component
 */
export interface VideoEmbedProps {
  /** YouTube video ID */
  videoId: string;
  /** Video title for accessibility */
  title?: string;
  /** Aspect ratio */
  aspectRatio?: '16/9' | '4/3' | '9/16';
  /** Show custom thumbnail (lazy loading) - default true */
  lazy?: boolean;
  /** Custom thumbnail URL (uses YouTube thumbnail if not provided) */
  thumbnailUrl?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Video embed handle interface for backwards compatibility
 * @deprecated This interface is kept for backwards compatibility but is not currently used
 */
export interface VideoEmbedHandle {
  play: () => void;
  pause: () => void;
  isPlaying: () => boolean;
  isLoaded: () => boolean;
}

/**
 * YouTube video embed component with lazy loading and click-to-load facade pattern
 * 
 * This component implements a performance-optimized YouTube embed that shows a thumbnail
 * with a play button overlay. The actual iframe is only loaded when the user clicks,
 * significantly reducing initial page load time and data usage.
 * 
 * Features:
 * - Click-to-load facade pattern (no iframe until user interaction)
 * - Automatic thumbnail fallback from maxresdefault to hqdefault
 * - Autoplay on click with enabled sound
 * - Support for vertical videos (9/16 aspect ratio with height constraints)
 * - Accessible with proper ARIA labels
 * - Lazy loading images
 * 
 * @example
 * ```tsx
 * <VideoEmbed 
 *   videoId="dQw4w9WgXcQ" 
 *   title="Never Gonna Give You Up"
 *   aspectRatio="16/9"
 * />
 * ```
 * 
 * @example Vertical video
 * ```tsx
 * <VideoEmbed 
 *   videoId="abc123" 
 *   title="Vertical Short"
 *   aspectRatio="9/16"
 * />
 * ```
 */
export function VideoEmbed({
  videoId,
  title = 'Video',
  aspectRatio = '16/9',
  lazy = true,
  thumbnailUrl,
  className = '',
}: VideoEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(!lazy);

  /**
   * Handles play button click - loads the iframe with autoplay
   */
  const handlePlay = useCallback(() => {
    setIsLoaded(true);
  }, []);

  // YouTube thumbnail URLs
  const thumbnail = thumbnailUrl || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const thumbnailFallback = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  // Autoplay after user clicks, with sound enabled
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;

  // For vertical videos (9/16), constrain width to prevent full-screen height
  const isVertical = aspectRatio === '9/16';
  const containerClasses = isVertical
    ? `relative overflow-hidden rounded-lg bg-surface mx-auto ${className}`
    : `relative w-full overflow-hidden rounded-lg bg-surface ${className}`;
  const containerStyle = isVertical
    ? { aspectRatio, maxHeight: '70vh', width: 'auto', height: '70vh' }
    : { aspectRatio };

  return (
    <div
      className={containerClasses}
      style={containerStyle}
    >
      {isLoaded ? (
        <iframe
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={handlePlay}
          className="absolute inset-0 w-full h-full group cursor-pointer"
          aria-label={`Play video: ${title}`}
        >
          {/* Thumbnail */}
          <img
            src={thumbnail}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              // Fallback to lower quality thumbnail
              const img = e.target as HTMLImageElement;
              if (img.src !== thumbnailFallback) {
                img.src = thumbnailFallback;
              }
            }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <svg
                viewBox="0 0 24 24"
                fill="white"
                className="w-8 h-8 sm:w-10 sm:h-10 ms-1"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          {/* Video title overlay */}
          <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <MetallicText variant="silver" className="text-sm sm:text-base font-medium">
              {title}
            </MetallicText>
          </div>
        </button>
      )}
    </div>
  );
}

export default VideoEmbed;
