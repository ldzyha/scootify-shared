'use client';

import {
  useState,
  useRef,
  useCallback,
  useEffect,
  KeyboardEvent,
  ChangeEvent,
} from 'react';
import { Icon } from './Icon';
import { Dialog, type DialogHandle } from './Dialog';
import { PriceTile } from './Price';
import { ProductImage } from './ProductImage';
import styles from './SmartSearch.module.css';

// ============================================
// Types
// ============================================

export interface SearchResult {
  id: string;
  name: string;
  slug: string;
  primaryCents: number;
  secondaryCents: number;
  originalPrimaryCents?: number;
  originalSecondaryCents?: number;
  thumbnail: string;
}

export interface SearchCategory {
  id: string;
  name: string;
  slug: string;
  icon?: string;
}

export type DropdownPosition = 'bottom' | 'top';
export type SmartSearchVariant = 'desktop' | 'mobile';

export interface SmartSearchProps {
  /** Display variant */
  variant?: SmartSearchVariant;
  dropdownPosition?: DropdownPosition;
  placeholder?: string;
  onSearch?: (query: string) => Promise<SearchResult[]>;
  onSelect?: (result: SearchResult) => void;
  popularCategories?: SearchCategory[];
  popularProducts?: SearchResult[];
  onLoadPopularProducts?: () => Promise<SearchResult[]>;
  /** Load user's favorite (liked) products for suggestions */
  onLoadFavorites?: () => Promise<SearchResult[]>;
  /** Callback when contact button is clicked */
  onContactClick?: () => void;
  debounceMs?: number;
  className?: string;
}

// ============================================
// Default categories
// ============================================

const defaultCategories: SearchCategory[] = [
  { id: '0', name: 'All Products', slug: 'products' },
  { id: '1', name: 'Featured', slug: 'featured' },
  { id: '2', name: 'New Arrivals', slug: 'new' },
];

// ============================================
// SmartSearch Component
// ============================================

export function SmartSearch({
  variant = 'desktop',
  dropdownPosition = 'bottom',
  placeholder = 'Search products...',
  onSearch,
  onSelect,
  popularCategories = defaultCategories,
  popularProducts: initialPopularProducts,
  onLoadPopularProducts,
  onLoadFavorites,
  onContactClick,
  debounceMs = 300,
  className = '',
}: SmartSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [popularProducts, setPopularProducts] = useState<SearchResult[]>(
    initialPopularProducts || []
  );
  const [favoriteProducts, setFavoriteProducts] = useState<SearchResult[]>([]);
  const [isLoadingPopular, setIsLoadingPopular] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dialogRef = useRef<DialogHandle>(null);
  const dialogInputRef = useRef<HTMLInputElement>(null);

  // Load popular products and favorites on first focus
  const loadPopularProducts = useCallback(async () => {
    if (isLoadingPopular) return;

    setIsLoadingPopular(true);
    try {
      // Load favorites first (if not already loaded)
      if (favoriteProducts.length === 0 && onLoadFavorites) {
        try {
          const favorites = await onLoadFavorites();
          setFavoriteProducts(favorites);
        } catch (error) {
          console.error('Failed to load favorites:', error);
        }
      }

      // Load popular products if not already loaded
      if (popularProducts.length === 0 && onLoadPopularProducts) {
        const products = await onLoadPopularProducts();
        setPopularProducts(products);
      }
    } catch (error) {
      console.error('Failed to load popular products:', error);
    } finally {
      setIsLoadingPopular(false);
    }
  }, [onLoadPopularProducts, onLoadFavorites, popularProducts.length, favoriteProducts.length, isLoadingPopular]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Cleanup debounce timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  // Debounced search
  const performSearch = useCallback(
    async (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setResults([]);
        return;
      }

      if (!onSearch) {
        // Mock search for demo
        setResults([
          {
            id: '1',
            name: 'Premium Product',
            slug: 'premium-product',
            primaryCents: 349900,
            secondaryCents: 9999,
            thumbnail: '/images/products/premium-product.webp',
          },
          {
            id: '2',
            name: 'Standard Product',
            slug: 'standard-product',
            primaryCents: 289900,
            secondaryCents: 7999,
            thumbnail: '/images/products/standard-product.webp',
          },
        ]);
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
    [onSearch]
  );

  // Handle input change with debounce
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setActiveIndex(-1);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      performSearch(value);
    }, debounceMs);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // When searching: results only
    // When not searching: favorites first, then popular products, then categories
    const totalItems = query.trim()
      ? results.length
      : favoriteProducts.length + popularProducts.length + popularCategories.length;
    const maxIndex = totalItems - 1;

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
        if (activeIndex >= 0) {
          if (query.trim() && results[activeIndex]) {
            handleSelectResult(results[activeIndex]);
          } else if (!query.trim()) {
            // Order: favorites first, then popular products, then categories
            if (activeIndex < favoriteProducts.length && favoriteProducts[activeIndex]) {
              handleSelectResult(favoriteProducts[activeIndex]);
            } else if (activeIndex < favoriteProducts.length + popularProducts.length) {
              const productIndex = activeIndex - favoriteProducts.length;
              if (popularProducts[productIndex]) {
                handleSelectResult(popularProducts[productIndex]);
              }
            } else {
              const categoryIndex = activeIndex - favoriteProducts.length - popularProducts.length;
              if (popularCategories[categoryIndex]) {
                handleSelectCategory(popularCategories[categoryIndex]);
              }
            }
          }
        } else if (results.length > 0) {
          handleSelectResult(results[0]);
        }
        break;

      case 'Escape':
        setIsDropdownOpen(false);
        dialogRef.current?.close();
        break;
    }
  };

  // Handle focus - open dropdown or dialog
  const handleFocus = () => {
    loadPopularProducts();
    if (variant === 'mobile') {
      dialogRef.current?.open();
    } else {
      setIsDropdownOpen(true);
    }
  };

  // Handle blur
  const handleBlur = (e: React.FocusEvent) => {
    // Don't close if focus moves within the wrapper
    if (wrapperRef.current?.contains(e.relatedTarget as Node)) {
      return;
    }
    // Delay to allow click events to fire
    setTimeout(() => {
      setIsDropdownOpen(false);
    }, 150);
  };

  // Handle result selection
  const handleSelectResult = (result: SearchResult) => {
    if (onSelect) {
      onSelect(result);
    } else {
      window.location.href = `/product/${result.slug}`;
    }
    setIsDropdownOpen(false);
  };

  // Handle category selection
  const handleSelectCategory = (category: SearchCategory) => {
    window.location.href = `/${category.slug}`;
    setIsDropdownOpen(false);
  };

  // Handle close
  const handleClose = () => {
    setQuery('');
    setResults([]);
    setActiveIndex(-1);
    setIsDropdownOpen(false);
  };

  // Render favorites list (favorites come first, index starts at 0)
  const renderFavorites = () => {
    if (favoriteProducts.length === 0) return null;

    return (
      <div className={styles.popularProducts}>
        <span className={styles.sectionTitle}>
          <Icon name="heartFilled" size="xs" color="#22c55e" className={styles.sectionIcon} />
          Favorite Products
        </span>
        {favoriteProducts.map((product, index) => (
          <button
            key={product.id}
            className={`${styles.resultItem} ${activeIndex === index ? styles.active : ''}`}
            onClick={() => handleSelectResult(product)}
            onMouseEnter={() => setActiveIndex(index)}
          >
            <div className={styles.resultImage}>
              <ProductImage src={product.thumbnail} alt={product.name} sizes="64px" />
            </div>
            <div className={styles.resultInfo}>
              <span className={styles.resultName}>{product.name}</span>
              <PriceTile
                primaryCents={product.primaryCents}
                secondaryCents={product.secondaryCents}
                originalPrimaryCents={product.originalPrimaryCents}
                originalSecondaryCents={product.originalSecondaryCents}
                className={styles.resultPrice}
              />
            </div>
            <Icon name="chevronRight" size="sm" color="#606060" />
          </button>
        ))}
      </div>
    );
  };

  // Render popular products list (index offset by favorites count)
  const renderPopularProducts = (title: string) => {
    const indexOffset = favoriteProducts.length;

    return (
      <div className={styles.popularProducts}>
        <span className={styles.sectionTitle}>{title}</span>
        {isLoadingPopular && (
          <div className={styles.loadingSmall}>
            <div className={styles.spinner} />
          </div>
        )}
        {!isLoadingPopular && popularProducts.map((product, index) => (
          <button
            key={product.id}
            className={`${styles.resultItem} ${activeIndex === indexOffset + index ? styles.active : ''}`}
            onClick={() => handleSelectResult(product)}
            onMouseEnter={() => setActiveIndex(indexOffset + index)}
          >
            <div className={styles.resultImage}>
              <ProductImage src={product.thumbnail} alt={product.name} sizes="64px" />
            </div>
            <div className={styles.resultInfo}>
              <span className={styles.resultName}>{product.name}</span>
              <PriceTile
                primaryCents={product.primaryCents}
                secondaryCents={product.secondaryCents}
                originalPrimaryCents={product.originalPrimaryCents}
                originalSecondaryCents={product.originalSecondaryCents}
                className={styles.resultPrice}
              />
            </div>
            <Icon name="chevronRight" size="sm" color="#606060" />
          </button>
        ))}
      </div>
    );
  };

  // Render search content
  const renderSearchContent = () => (
    <div className={styles.searchContent}>
      {isLoading && (
        <div className={styles.loading}>
          <div className={styles.spinner} />
          <span>Searching...</span>
        </div>
      )}

      {/* No results found - show message + popular products */}
      {!isLoading && query.trim() && results.length === 0 && (
        <>
          <div className={styles.empty}>
            <Icon name="search" size="lg" color="#606060" />
            <p>No results found</p>
            <span>Try adjusting your search query</span>
          </div>
          {popularProducts.length > 0 && renderPopularProducts('Popular Products')}
        </>
      )}

      {/* Search results */}
      {!isLoading && query.trim() && results.length > 0 && (
        <div className={styles.results}>
          {results.map((result, index) => (
            <button
              key={result.id}
              className={`${styles.resultItem} ${activeIndex === index ? styles.active : ''}`}
              onClick={() => handleSelectResult(result)}
              onMouseEnter={() => setActiveIndex(index)}
            >
              <div className={styles.resultImage}>
                <ProductImage src={result.thumbnail} alt={result.name} sizes="64px" />
              </div>
              <div className={styles.resultInfo}>
                <span className={styles.resultName}>{result.name}</span>
                <PriceTile
                  primaryCents={result.primaryCents}
                  secondaryCents={result.secondaryCents}
                  originalPrimaryCents={result.originalPrimaryCents}
                  originalSecondaryCents={result.originalSecondaryCents}
                  className={styles.resultPrice}
                />
              </div>
              <Icon name="chevronRight" size="sm" color="#606060" />
            </button>
          ))}
        </div>
      )}

      {/* Initial state - favorites + popular products + categories */}
      {!isLoading && !query.trim() && (
        <>
          {renderFavorites()}
          {popularProducts.length > 0 && renderPopularProducts('Popular Products')}
          <div className={styles.categories}>
            <span className={styles.sectionTitle}>Categories</span>
            {popularCategories.map((category, index) => {
              const offsetIndex = favoriteProducts.length + popularProducts.length + index;
              return (
                <button
                  key={category.id}
                  className={`${styles.categoryItem} ${activeIndex === offsetIndex ? styles.active : ''}`}
                  onClick={() => handleSelectCategory(category)}
                  onMouseEnter={() => setActiveIndex(offsetIndex)}
                >
                  <span>{category.name}</span>
                  <Icon name="chevronRight" size="sm" color="#606060" />
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );

  const dropdownClass = dropdownPosition === 'top'
    ? styles.dropdownTop
    : styles.dropdown;

  return (
    <div
      ref={wrapperRef}
      className={`${styles.searchWrapper} ${className}`}
    >
      <div className={styles.inputWrapper}>
        <Icon name="search" size="sm" color="#808080" className={styles.searchIcon} />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={styles.input}
          aria-label="Search products"
        />
        {query && (
          <button
            className={styles.clearButtonInline}
            onClick={() => {
              setQuery('');
              setResults([]);
              inputRef.current?.focus();
            }}
            aria-label="Clear"
          >
            <Icon name="close" size="xs" color="#808080" />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className={dropdownClass}
        >
          {/* Contact button - top on mobile */}
          {onContactClick && (
            <div className={styles.contactSection}>
              <button
                className={styles.contactButton}
                onClick={() => {
                  setIsDropdownOpen(false);
                  onContactClick();
                }}
              >
                <Icon name="phone" size="sm" metallic="blue" />
                <span>Contact Us</span>
                <Icon name="chevronRight" size="sm" color="#606060" />
              </button>
            </div>
          )}
          {renderSearchContent()}
        </div>
      )}

      {/* Mobile Dialog */}
      {variant === 'mobile' && (
        <Dialog
          ref={dialogRef}
          onClose={handleClose}
          position="panel-bottom"
          size="full"
          className={styles.dialogSearch}
        >
          <div className={styles.dialogHeader}>
            <div className={styles.dialogInputWrapper}>
              <Icon name="search" size="sm" color="#808080" />
              <input
                ref={dialogInputRef}
                type="text"
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className={styles.dialogInput}
                aria-label="Search products"
              />
              {query && (
                <button
                  className={styles.clearButton}
                  onClick={() => {
                    setQuery('');
                    setResults([]);
                    dialogInputRef.current?.focus();
                  }}
                  aria-label="Clear"
                >
                  <Icon name="close" size="xs" color="#808080" />
                </button>
              )}
            </div>
            <button
              className={styles.cancelButton}
              onClick={() => dialogRef.current?.close()}
            >
              Cancel
            </button>
          </div>
          {renderSearchContent()}
        </Dialog>
      )}
    </div>
  );
}

export default SmartSearch;
