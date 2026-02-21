'use client';

import {
  useRef,
  useState,
  useCallback,
  useEffect,
  RefObject,
} from 'react';

// ============================================
// Types
// ============================================

export interface CarouselEngineOptions {
  /** Total number of slides */
  slideCount: number;
  /** Enable infinite loop */
  loop?: boolean;
  /** Number of slides visible at once */
  slidesPerView?: number | 'auto';
  /** Gap between slides in px */
  gap?: number;
  /** Animation duration in ms */
  duration?: number;
  /** Starting slide index */
  startIndex?: number;
  /** Enable drag/swipe */
  draggable?: boolean;
  /** Callback when slide changes */
  onSlideChange?: (index: number) => void;
}

export interface CarouselEngineReturn {
  /** Ref for the viewport container */
  viewportRef: RefObject<HTMLDivElement | null>;
  /** Ref for the slides container */
  containerRef: RefObject<HTMLDivElement | null>;
  /** Current selected slide index */
  selectedIndex: number;
  /** Whether can scroll to previous */
  canScrollPrev: boolean;
  /** Whether can scroll to next */
  canScrollNext: boolean;
  /** Scroll to previous slide */
  scrollPrev: () => void;
  /** Scroll to next slide */
  scrollNext: () => void;
  /** Scroll to specific index */
  scrollTo: (index: number) => void;
  /** Whether currently dragging */
  isDragging: boolean;
  /** Get scroll snap count (for dots) */
  scrollSnapCount: number;
}

// ============================================
// Constants
// ============================================

const SWIPE_THRESHOLD = 50; // Minimum px to trigger swipe
const VELOCITY_THRESHOLD = 0.3; // Minimum velocity for momentum

// ============================================
// useCarouselEngine Hook
// ============================================

export function useCarouselEngine({
  slideCount,
  loop = false,
  slidesPerView = 1,
  gap = 4,
  duration = 150,
  startIndex = 0,
  draggable = true,
  onSlideChange,
}: CarouselEngineOptions): CarouselEngineReturn {
  // Refs
  const viewportRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // State
  const [selectedIndex, setSelectedIndex] = useState(startIndex);
  const [isDragging, setIsDragging] = useState(false);

  // Touch/drag tracking refs
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchCurrentX = useRef(0);
  const touchStartTime = useRef(0);
  const isDraggingRef = useRef(false);
  const isScrollingVertically = useRef(false);
  const startTranslateX = useRef(0);

  // Calculate snap count
  const effectiveSlidesPerView = slidesPerView === 'auto' ? 1 : slidesPerView;
  const scrollSnapCount = Math.max(1, slideCount - effectiveSlidesPerView + 1);

  // Navigation state
  const canScrollPrev = loop || selectedIndex > 0;
  const canScrollNext = loop || selectedIndex < scrollSnapCount - 1;

  // ============================================
  // Calculate Transform
  // ============================================

  const getTranslateX = useCallback((index: number, slideWidth: number): number => {
    return -(index * (slideWidth + gap));
  }, [gap]);

  const applyTransform = useCallback((translateX: number, animate: boolean = true) => {
    if (!containerRef.current) return;

    containerRef.current.style.transition = animate
      ? `transform ${duration}ms ease-out`
      : 'none';
    containerRef.current.style.transform = `translateX(${translateX}px)`;
  }, [duration]);

  // ============================================
  // Get Slide Width
  // ============================================

  const getSlideWidth = useCallback((): number => {
    if (!viewportRef.current) return 0;

    const viewportWidth = viewportRef.current.offsetWidth;

    if (slidesPerView === 'auto') {
      // For auto, return the viewport width (single slide visible)
      return viewportWidth;
    }

    // Calculate slide width based on slidesPerView and gap
    const totalGap = gap * (slidesPerView - 1);
    return (viewportWidth - totalGap) / slidesPerView;
  }, [slidesPerView, gap]);

  // ============================================
  // Navigation
  // ============================================

  const scrollTo = useCallback((index: number) => {
    let newIndex = index;

    if (loop) {
      // Wrap around for loop mode
      newIndex = ((index % scrollSnapCount) + scrollSnapCount) % scrollSnapCount;
    } else {
      // Clamp for non-loop mode
      newIndex = Math.max(0, Math.min(index, scrollSnapCount - 1));
    }

    if (newIndex !== selectedIndex) {
      setSelectedIndex(newIndex);
      onSlideChange?.(newIndex);
    }

    // Apply transform
    const slideWidth = getSlideWidth();
    const translateX = getTranslateX(newIndex, slideWidth);
    applyTransform(translateX, true);
  }, [loop, scrollSnapCount, selectedIndex, onSlideChange, getSlideWidth, getTranslateX, applyTransform]);

  const scrollPrev = useCallback(() => {
    if (loop) {
      scrollTo(selectedIndex - 1);
    } else if (canScrollPrev) {
      scrollTo(selectedIndex - 1);
    }
  }, [loop, selectedIndex, canScrollPrev, scrollTo]);

  const scrollNext = useCallback(() => {
    if (loop) {
      scrollTo(selectedIndex + 1);
    } else if (canScrollNext) {
      scrollTo(selectedIndex + 1);
    }
  }, [loop, selectedIndex, canScrollNext, scrollTo]);

  // ============================================
  // Touch/Drag Handlers
  // ============================================

  const handleDragStart = useCallback((clientX: number, clientY: number) => {
    if (!draggable || !containerRef.current) return;

    isDraggingRef.current = true;
    isScrollingVertically.current = false;
    touchStartX.current = clientX;
    touchStartY.current = clientY;
    touchCurrentX.current = clientX;
    touchStartTime.current = Date.now();

    // Get current transform
    const transform = containerRef.current.style.transform;
    const match = transform.match(/translateX\((-?\d+(?:\.\d+)?)px\)/);
    startTranslateX.current = match ? parseFloat(match[1]) : 0;

    // Disable transition during drag
    containerRef.current.style.transition = 'none';
    setIsDragging(true);
  }, [draggable]);

  const handleDragMove = useCallback((clientX: number, clientY: number) => {
    if (!isDraggingRef.current || !containerRef.current) return;

    const deltaX = clientX - touchStartX.current;
    const deltaY = clientY - touchStartY.current;

    // Detect if scrolling vertically
    if (!isScrollingVertically.current && Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 10) {
      isScrollingVertically.current = true;
      isDraggingRef.current = false;
      setIsDragging(false);
      return;
    }

    if (isScrollingVertically.current) return;

    touchCurrentX.current = clientX;

    // Calculate new position
    let newTranslateX = startTranslateX.current + deltaX;

    // Add resistance at boundaries in non-loop mode
    if (!loop) {
      const slideWidth = getSlideWidth();
      const minTranslate = getTranslateX(scrollSnapCount - 1, slideWidth);
      const maxTranslate = 0;

      if (newTranslateX > maxTranslate) {
        newTranslateX = maxTranslate + (newTranslateX - maxTranslate) * 0.3;
      } else if (newTranslateX < minTranslate) {
        newTranslateX = minTranslate + (newTranslateX - minTranslate) * 0.3;
      }
    }

    containerRef.current.style.transform = `translateX(${newTranslateX}px)`;
  }, [loop, getSlideWidth, getTranslateX, scrollSnapCount]);

  const handleDragEnd = useCallback(() => {
    if (!isDraggingRef.current || isScrollingVertically.current) {
      isDraggingRef.current = false;
      setIsDragging(false);
      return;
    }

    isDraggingRef.current = false;
    setIsDragging(false);

    const deltaX = touchCurrentX.current - touchStartX.current;
    const deltaTime = Date.now() - touchStartTime.current;
    const velocity = Math.abs(deltaX) / deltaTime;

    // Determine direction based on swipe
    if (Math.abs(deltaX) > SWIPE_THRESHOLD || velocity > VELOCITY_THRESHOLD) {
      if (deltaX > 0) {
        scrollPrev();
      } else {
        scrollNext();
      }
    } else {
      // Snap back to current position
      scrollTo(selectedIndex);
    }
  }, [scrollPrev, scrollNext, scrollTo, selectedIndex]);

  // ============================================
  // Event Listeners
  // ============================================

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || !draggable) return;

    // Touch events
    const onTouchStart = (e: TouchEvent) => {
      handleDragStart(e.touches[0].clientX, e.touches[0].clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (isDraggingRef.current && !isScrollingVertically.current) {
        e.preventDefault();
      }
      handleDragMove(e.touches[0].clientX, e.touches[0].clientY);
    };

    const onTouchEnd = () => {
      handleDragEnd();
    };

    // Mouse events
    const onMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      handleDragStart(e.clientX, e.clientY);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      e.preventDefault();
      handleDragMove(e.clientX, e.clientY);
    };

    const onMouseUp = () => {
      handleDragEnd();
    };

    const onMouseLeave = () => {
      if (isDraggingRef.current) {
        handleDragEnd();
      }
    };

    // Add listeners
    viewport.addEventListener('touchstart', onTouchStart, { passive: true });
    viewport.addEventListener('touchmove', onTouchMove, { passive: false });
    viewport.addEventListener('touchend', onTouchEnd);
    viewport.addEventListener('mousedown', onMouseDown);
    viewport.addEventListener('mousemove', onMouseMove);
    viewport.addEventListener('mouseup', onMouseUp);
    viewport.addEventListener('mouseleave', onMouseLeave);

    return () => {
      viewport.removeEventListener('touchstart', onTouchStart);
      viewport.removeEventListener('touchmove', onTouchMove);
      viewport.removeEventListener('touchend', onTouchEnd);
      viewport.removeEventListener('mousedown', onMouseDown);
      viewport.removeEventListener('mousemove', onMouseMove);
      viewport.removeEventListener('mouseup', onMouseUp);
      viewport.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [draggable, handleDragStart, handleDragMove, handleDragEnd]);

  // ============================================
  // Initialize Position
  // ============================================

  useEffect(() => {
    const slideWidth = getSlideWidth();
    if (slideWidth > 0) {
      const translateX = getTranslateX(selectedIndex, slideWidth);
      applyTransform(translateX, false);
    }
  }, [selectedIndex, getSlideWidth, getTranslateX, applyTransform]);

  // ============================================
  // Handle Resize
  // ============================================

  useEffect(() => {
    const handleResize = () => {
      const slideWidth = getSlideWidth();
      if (slideWidth > 0) {
        const translateX = getTranslateX(selectedIndex, slideWidth);
        applyTransform(translateX, false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [selectedIndex, getSlideWidth, getTranslateX, applyTransform]);

  return {
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
  };
}

export default useCarouselEngine;
