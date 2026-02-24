'use client';

import {
  useCallback,
  useEffect,
  useState,
  useRef,
  ReactNode,
  Children,
  isValidElement,
  cloneElement,
  ReactElement,
  CSSProperties,
  RefObject,
} from 'react';
import { useCarouselEngine } from './carousel-engine';
import styles from './Carousel.module.css';
import { Icon } from './Icon';
import { MetallicText, type MetallicTextProps } from './MetallicText';
import { Picture } from './Picture';

// ============================================
// Types
// ============================================

export type CarouselEffect = 'slide' | 'fade' | 'scale';
export type CarouselAlign = 'start' | 'center' | 'end';

export interface CarouselProps {
  children: ReactNode;
  /** Section title */
  title?: string;
  /** Section subtitle */
  subtitle?: string;
  /** Title metallic variant. When set, title renders via MetallicText with gradient effect */
  titleVariant?: MetallicTextProps['variant'];
  /** Custom metallic gradients passed through to MetallicText (for brand palettes) */
  metallicGradients?: MetallicTextProps['metallicGradients'];
  /** Visual transition effect */
  effect?: CarouselEffect;
  /** Enable infinite loop */
  loop?: boolean;
  /** Slide alignment */
  align?: CarouselAlign;
  /** Enable autoplay */
  autoplay?: boolean;
  /** Autoplay delay in ms */
  autoplayDelay?: number;
  /** Pause autoplay on hover */
  pauseOnHover?: boolean;
  /** Show navigation arrows */
  showArrows?: boolean;
  /** Show dot indicators */
  showDots?: boolean;
  /** Show thumbnails (for gallery mode) */
  showThumbnails?: boolean;
  /** Thumbnail images (required if showThumbnails is true) */
  thumbnails?: string[];
  /** Number of slides visible at once */
  slidesPerView?: number | 'auto';
  /** Gap between slides in px */
  gap?: number;
  /** Enable drag/swipe */
  draggable?: boolean;
  /** Custom class for container */
  className?: string;
  /** Custom class for slide wrapper */
  slideClassName?: string;
  /** Callback when slide changes */
  onSlideChange?: (index: number) => void;
  /** Accessible label for the carousel */
  ariaLabel?: string;
  /** Start from specific index */
  startIndex?: number;
  /** Duration of animations in ms (default 150) */
  duration?: number;
  /** Custom thumbnail renderer. Receives (src, index) — useful when thumbnails need a different image component than Picture */
  renderThumbnail?: (src: string, index: number) => ReactNode;
}

export interface CarouselSlideProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

// ============================================
// CarouselSlide Component
// ============================================

export function CarouselSlide({ children, className = '', style }: CarouselSlideProps) {
  return (
    <div className={`${styles.slide} ${className}`} style={style}>
      {children}
    </div>
  );
}

// ============================================
// Carousel Component
// ============================================

export function Carousel({
  children,
  title,
  subtitle,
  titleVariant,
  metallicGradients,
  effect = 'slide',
  loop = false,
  align = 'start',
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = true,
  showArrows = true,
  showDots = true,
  showThumbnails = false,
  thumbnails = [],
  slidesPerView = 1,
  gap = 4,
  draggable = true,
  className = '',
  slideClassName = '',
  onSlideChange,
  ariaLabel = 'Carousel',
  startIndex = 0,
  duration = 150,
  renderThumbnail,
}: CarouselProps) {
  // Count children
  const childArray = Children.toArray(children);
  const slideCount = childArray.length;

  // Autoplay state
  const [isPaused, setIsPaused] = useState(false);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  // Use custom carousel engine
  const {
    viewportRef,
    containerRef,
    selectedIndex,
    canScrollPrev,
    canScrollNext,
    scrollPrev,
    scrollNext,
    scrollTo,
    isDragging,
    scrollSnapCount,
  } = useCarouselEngine({
    slideCount,
    loop,
    slidesPerView,
    gap,
    duration,
    startIndex,
    draggable: draggable && effect === 'slide', // Only enable drag for slide effect
    onSlideChange,
  });

  // Thumbnails carousel
  const thumbsViewportRef = useRef<HTMLDivElement>(null);

  // Scroll thumbnails into view when main carousel changes
  useEffect(() => {
    if (showThumbnails && thumbsViewportRef.current && thumbnails.length > 0) {
      const thumbs = thumbsViewportRef.current.children[0] as HTMLElement;
      const thumb = thumbs?.children[selectedIndex] as HTMLElement;
      if (thumb) {
        const thumbsRect = thumbsViewportRef.current.getBoundingClientRect();
        const thumbRect = thumb.getBoundingClientRect();
        const scrollLeft = thumbsViewportRef.current.scrollLeft;

        // Check if thumb is outside visible area
        if (thumbRect.left < thumbsRect.left) {
          thumbsViewportRef.current.scrollTo({
            left: scrollLeft + (thumbRect.left - thumbsRect.left) - 8,
            behavior: 'smooth',
          });
        } else if (thumbRect.right > thumbsRect.right) {
          thumbsViewportRef.current.scrollTo({
            left: scrollLeft + (thumbRect.right - thumbsRect.right) + 8,
            behavior: 'smooth',
          });
        }
      }
    }
  }, [selectedIndex, showThumbnails, thumbnails.length]);

  // Autoplay logic
  useEffect(() => {
    if (!autoplay || isPaused) {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
      return;
    }

    autoplayRef.current = setInterval(() => {
      if (loop) {
        scrollNext();
      } else if (selectedIndex < scrollSnapCount - 1) {
        scrollNext();
      } else {
        scrollTo(0); // Reset to start
      }
    }, autoplayDelay);

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [autoplay, autoplayDelay, isPaused, loop, scrollNext, scrollTo, selectedIndex, scrollSnapCount]);

  // Pause on hover
  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover && autoplay) {
      setIsPaused(true);
    }
  }, [pauseOnHover, autoplay]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover && autoplay) {
      setIsPaused(false);
    }
  }, [pauseOnHover, autoplay]);

  // Keyboard navigation
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        scrollNext();
      }
    };

    viewport.addEventListener('keydown', handleKeyDown);
    return () => viewport.removeEventListener('keydown', handleKeyDown);
  }, [scrollPrev, scrollNext]);

  // Handle thumbnail click
  const onThumbClick = useCallback((index: number) => {
    scrollTo(index);
  }, [scrollTo]);

  // Calculate slide width and visibility
  const effectiveSlidesPerView = slidesPerView === 'auto' ? 1 : slidesPerView;

  // Wrap children in slides with styles
  const slides = Children.map(children, (child, index) => {
    const slideStyle: CSSProperties = {
      flex: slidesPerView === 'auto'
        ? '0 0 auto'
        : `0 0 calc(${100 / effectiveSlidesPerView}% - ${gap * (1 - 1 / effectiveSlidesPerView)}px)`,
      marginRight: effect === 'fade' ? 0 : `${gap}px`,
    };

    // Determine if slide is active or in view
    const isActive = index === selectedIndex;
    const isInView = effect === 'scale' &&
      index >= selectedIndex &&
      index < selectedIndex + effectiveSlidesPerView;

    const slideClasses = [
      styles.slide,
      slideClassName,
      isActive ? styles.slideActive : '',
      isInView && !isActive ? styles.slideInView : '',
    ].filter(Boolean).join(' ');

    if (isValidElement(child) && child.type === CarouselSlide) {
      return cloneElement(child as ReactElement<CarouselSlideProps>, {
        className: `${(child.props as CarouselSlideProps).className || ''} ${slideClasses}`.trim(),
        style: { ...(child.props as CarouselSlideProps).style, ...slideStyle },
      });
    }

    return (
      <div key={index} className={slideClasses} style={slideStyle}>
        {child}
      </div>
    );
  });

  const effectClass = styles[`effect-${effect}`] || '';
  const draggingClass = isDragging ? styles.dragging : '';
  const hasNavigation = showArrows || (showDots && scrollSnapCount > 1);

  // Calculate container transform for slide effect
  const getContainerStyle = (): CSSProperties => {
    const style: CSSProperties = {
      '--carousel-duration': `${duration}ms`,
    } as CSSProperties;

    if (effect !== 'slide') {
      // For fade/scale, don't use transform on container
      return style;
    }

    return {
      ...style,
      marginRight: `-${gap}px`,
    };
  };

  return (
    <section
      className={`${styles.carousel} ${effectClass} ${draggingClass} ${className}`}
      role="region"
      aria-label={ariaLabel}
      aria-roledescription="carousel"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Header: Title on left, Navigation on right */}
      {(title || subtitle || hasNavigation) && (
        <header className={styles.header}>
          <div className={styles.headerText}>
            {title && (
              titleVariant ? (
                <MetallicText variant={titleVariant} metallicGradients={metallicGradients} as="h2" className={styles.title}>
                  {title}
                </MetallicText>
              ) : (
                <h2 className={styles.title}>
                  {title}
                </h2>
              )
            )}
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>

          {/* Navigation: [←] [line/dots/line] [→] */}
          {hasNavigation && (
            <nav className={styles.navigation} aria-label="Carousel navigation">
              {showArrows && (
                <button
                  type="button"
                  className={`${styles.arrow} ${styles.arrowPrev}`}
                  onClick={scrollPrev}
                  disabled={!loop && !canScrollPrev}
                  aria-label="Previous slide"
                >
                  <Icon name="chevronLeft" size="sm" />
                </button>
              )}

              {showDots && scrollSnapCount > 1 && (
                <div className={styles.dotsColumn}>
                  <span className={styles.navLine} />
                  <div className={styles.dots} role="tablist" aria-label="Slide indicators">
                    {Array.from({ length: scrollSnapCount }).map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        className={`${styles.dot} ${index === selectedIndex ? styles.dotActive : ''}`}
                        onClick={() => scrollTo(index)}
                        role="tab"
                        aria-selected={index === selectedIndex}
                        aria-label={`Slide ${index + 1}`}
                      />
                    ))}
                  </div>
                  <span className={styles.navLine} />
                </div>
              )}

              {showArrows && (
                <button
                  type="button"
                  className={`${styles.arrow} ${styles.arrowNext}`}
                  onClick={scrollNext}
                  disabled={!loop && !canScrollNext}
                  aria-label="Next slide"
                >
                  <Icon name="chevronRight" size="sm" />
                </button>
              )}
            </nav>
          )}
        </header>
      )}

      {/* Viewport */}
      <div
        className={styles.viewport}
        ref={viewportRef}
        tabIndex={0}
        style={{ cursor: draggable && effect === 'slide' ? (isDragging ? 'grabbing' : 'grab') : undefined }}
      >
        <div
          className={styles.container}
          ref={containerRef}
          style={getContainerStyle()}
        >
          {slides}
        </div>
      </div>

      {/* Thumbnails */}
      {showThumbnails && thumbnails.length > 0 && (
        <div className={styles.thumbsWrapper}>
          <div className={styles.thumbsViewport} ref={thumbsViewportRef}>
            <div className={styles.thumbsContainer}>
              {thumbnails.map((src, index) => (
                <button
                  key={index}
                  type="button"
                  className={`${styles.thumb} ${index === selectedIndex ? styles.thumbActive : ''}`}
                  onClick={() => onThumbClick(index)}
                  aria-label={`View image ${index + 1}`}
                >
                  {renderThumbnail
                    ? renderThumbnail(src, index)
                    : <Picture src={src} alt="" className={styles.thumbImage} sizes="80px" />
                  }
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ============================================
// useCarousel Hook (for external control)
// ============================================

export interface UseCarouselReturn {
  viewportRef: RefObject<HTMLDivElement | null>;
  containerRef: RefObject<HTMLDivElement | null>;
  selectedIndex: number;
  scrollSnapCount: number;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  scrollPrev: () => void;
  scrollNext: () => void;
  scrollTo: (index: number) => void;
}

export interface UseCarouselOptions {
  slideCount: number;
  loop?: boolean;
  slidesPerView?: number | 'auto';
  gap?: number;
  duration?: number;
  startIndex?: number;
  draggable?: boolean;
  onSlideChange?: (index: number) => void;
}

export function useCarousel(options: UseCarouselOptions): UseCarouselReturn {
  const engine = useCarouselEngine(options);

  return {
    viewportRef: engine.viewportRef,
    containerRef: engine.containerRef,
    selectedIndex: engine.selectedIndex,
    scrollSnapCount: engine.scrollSnapCount,
    canScrollPrev: engine.canScrollPrev,
    canScrollNext: engine.canScrollNext,
    scrollPrev: engine.scrollPrev,
    scrollNext: engine.scrollNext,
    scrollTo: engine.scrollTo,
  };
}

export default Carousel;
