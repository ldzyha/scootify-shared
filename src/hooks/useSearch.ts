import { useState, useRef, useCallback, useEffect } from 'react';

/**
 * Options for configuring the useSearch hook.
 * 
 * @template T The type of search results
 */
export interface UseSearchOptions<T> {
  /**
   * Function to perform the search.
   * Can return results synchronously or asynchronously.
   */
  onSearch: (query: string) => T[] | Promise<T[]>;
  
  /**
   * Debounce delay in milliseconds before triggering search.
   * @default 300
   */
  debounceMs?: number;
  
  /**
   * Minimum query length required to trigger search.
   * @default 0
   */
  minQueryLength?: number;
}

/**
 * Return value of the useSearch hook.
 * 
 * @template T The type of search results
 */
export interface UseSearchReturn<T> {
  /** Current search query string */
  query: string;
  
  /** Update the search query (triggers debounced search) */
  setQuery: (q: string) => void;
  
  /** Array of search results */
  results: T[];
  
  /** Whether a search is currently in progress */
  isLoading: boolean;
  
  /** Index of the currently active/selected result (-1 if none) */
  activeIndex: number;
  
  /** Set the active index manually */
  setActiveIndex: (i: number) => void;
  
  /** 
   * Handle keyboard navigation events.
   * Supports ArrowUp, ArrowDown, Enter, and Escape keys.
   */
  handleKeyDown: (e: React.KeyboardEvent) => void;
  
  /** Reset the search state to initial values */
  reset: () => void;
}

/**
 * Headless search hook with debouncing, keyboard navigation, and loading state.
 * 
 * @template T The type of search results
 * @param options Configuration options for the search behavior
 * @returns Search state and control functions
 * 
 * @example
 * ```tsx
 * interface Product {
 *   id: string;
 *   name: string;
 * }
 * 
 * function ProductSearch() {
 *   const {
 *     query,
 *     setQuery,
 *     results,
 *     isLoading,
 *     activeIndex,
 *     handleKeyDown,
 *     reset
 *   } = useSearch<Product>({
 *     onSearch: async (q) => {
 *       const res = await fetch(`/api/search?q=${q}`);
 *       return res.json();
 *     },
 *     debounceMs: 300,
 *     minQueryLength: 2
 *   });
 * 
 *   return (
 *     <div>
 *       <input
 *         value={query}
 *         onChange={(e) => setQuery(e.target.value)}
 *         onKeyDown={handleKeyDown}
 *       />
 *       {isLoading && <div>Loading...</div>}
 *       <ul>
 *         {results.map((result, i) => (
 *           <li key={result.id} data-active={i === activeIndex}>
 *             {result.name}
 *           </li>
 *         ))}
 *       </ul>
 *     </div>
 *   );
 * }
 * ```
 */
export function useSearch<T>({
  onSearch,
  debounceMs = 300,
  minQueryLength = 0,
}: UseSearchOptions<T>): UseSearchReturn<T> {
  // State
  const [query, setQueryState] = useState('');
  const [results, setResults] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  // Refs
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /**
   * Perform the actual search operation.
   * Handles both sync and async search functions.
   */
  const performSearch = useCallback(
    async (searchQuery: string) => {
      // Clear results if query doesn't meet minimum length
      if (searchQuery.length < minQueryLength) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const searchResults = await onSearch(searchQuery);
        setResults(searchResults);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    },
    [onSearch, minQueryLength]
  );

  /**
   * Update query with debouncing.
   * Clears previous debounce timeout and schedules a new search.
   */
  const setQuery = useCallback(
    (newQuery: string) => {
      setQueryState(newQuery);
      setActiveIndex(-1);

      // Clear existing timeout
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      // Don't search if query is empty or below minimum length
      if (!newQuery.trim() || newQuery.length < minQueryLength) {
        setResults([]);
        setIsLoading(false);
        return;
      }

      // Schedule new search
      debounceRef.current = setTimeout(() => {
        performSearch(newQuery);
      }, debounceMs);
    },
    [debounceMs, minQueryLength, performSearch]
  );

  /**
   * Handle keyboard navigation for search results.
   * - ArrowDown: Move to next result (wraps to start)
   * - ArrowUp: Move to previous result (wraps to end)
   * - Enter: Can be handled by consumer (activeIndex available)
   * - Escape: Can be handled by consumer (reset available)
   */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const maxIndex = results.length - 1;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setActiveIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
          break;

        case 'ArrowUp':
          e.preventDefault();
          setActiveIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
          break;

        case 'Enter':
          e.preventDefault();
          // Consumer can check activeIndex to handle selection
          break;

        case 'Escape':
          e.preventDefault();
          // Consumer can call reset() to clear search
          break;
      }
    },
    [results.length]
  );

  /**
   * Reset all search state to initial values.
   */
  const reset = useCallback(() => {
    setQueryState('');
    setResults([]);
    setActiveIndex(-1);
    setIsLoading(false);

    // Clear any pending search
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }
  }, []);

  // Cleanup debounce timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return {
    query,
    setQuery,
    results,
    isLoading,
    activeIndex,
    setActiveIndex,
    handleKeyDown,
    reset,
  };
}
