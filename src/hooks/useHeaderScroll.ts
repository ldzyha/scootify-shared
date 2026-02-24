import { useState, useEffect, useRef, useCallback, type RefObject } from 'react';

/**
 * Return type for the useHeaderScroll hook
 */
export interface UseHeaderScrollReturn {
  /** Whether the header should be visible (hidden on scroll down, shown on scroll up) */
  isVisible: boolean;
  /** Whether the page is at the top (scroll position near zero) */
  isAtTop: boolean;
  /** Ref to attach to the header element */
  headerRef: RefObject<HTMLElement | null>;
}

/**
 * Custom hook for handling header visibility based on scroll behavior
 *
 * Tracks scroll direction and position to show/hide header elements:
 * - Hides header when scrolling down past threshold
 * - Shows header when scrolling up
 * - Detects when page is at top for styling purposes
 *
 * Uses `requestAnimationFrame` for optimized performance and smooth animations.
 *
 * @param threshold - Minimum scroll distance in pixels before hiding header (default: 100)
 * @returns Object containing visibility state, top position state, and header ref
 *
 * @example
 * ```tsx
 * function Header() {
 *   const { isVisible, isAtTop, headerRef } = useHeaderScroll(100);
 *
 *   return (
 *     <header
 *       ref={headerRef}
 *       className={`
 *         ${isAtTop ? 'at-top' : 'scrolled'}
 *         ${isVisible ? 'visible' : 'hidden'}
 *       `}
 *     >
 *       <nav>...</nav>
 *     </header>
 *   );
 * }
 * ```
 */
export function useHeaderScroll(threshold = 100): UseHeaderScrollReturn {
  const [isVisible, setIsVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const headerRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  /**
   * Scroll handler with requestAnimationFrame for performance optimization
   *
   * This ensures scroll handling is synchronized with the browser's repaint cycle,
   * preventing layout thrashing and improving performance.
   */
  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const scrollDiff = currentScrollY - lastScrollY.current;

        // Detect if user is at the top of the page (within 10px tolerance)
        setIsAtTop(currentScrollY < 10);

        // Show/hide header based on scroll direction
        // Only trigger if scroll difference exceeds minimum threshold (5px)
        // to avoid jittery behavior on small scroll movements
        if (Math.abs(scrollDiff) > 5) {
          if (scrollDiff > 0 && currentScrollY > threshold) {
            // Scrolling down and past threshold - hide header
            setIsVisible(false);
          } else {
            // Scrolling up or below threshold - show header
            setIsVisible(true);
          }
          lastScrollY.current = currentScrollY;
        }

        ticking.current = false;
      });
      ticking.current = true;
    }
  }, [threshold]);

  /**
   * Set up scroll event listener on mount, clean up on unmount
   *
   * Uses passive event listener for better scroll performance
   * by indicating that preventDefault() will not be called.
   */
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return {
    isVisible,
    isAtTop,
    headerRef,
  };
}
