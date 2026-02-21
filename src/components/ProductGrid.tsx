import { ReactNode } from 'react';
import styles from './ProductGrid.module.css';

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  model: string;
  priceUsdCents: number;
  originalPriceUsdCents?: number;
  inStock: boolean;
  images: Array<{ url: string; alt: string }>;
  [key: string]: any;
}

export interface ProductGridProps {
  /** Array of products to display */
  products: Product[];
  /** Component to render each product tile */
  renderTile: (product: Product, index: number) => ReactNode;
  /** Number of columns on desktop (3 or 4) */
  desktopColumns?: 3 | 4;
  /** Message to show when no products available */
  emptyMessage?: string;
  /** Show loading skeleton tiles */
  isLoading?: boolean;
  /** Number of skeleton tiles to show while loading */
  skeletonCount?: number;
  /** Optional filter controls (controlled component) */
  filterControls?: ReactNode;
  /** Optional sort controls (controlled component) */
  sortControls?: ReactNode;
  /** Custom className for the grid container */
  className?: string;
  /** Accessible label for the grid */
  ariaLabel?: string;
}

/**
 * ProductGrid - Responsive grid layout for product tiles
 * 
 * Features:
 * - Responsive: 1 column (mobile), 2 columns (tablet), 3-4 columns (desktop)
 * - Empty state support
 * - Loading skeleton support
 * - Optional filter/sort controls
 * - CSS Grid with custom properties
 * 
 * @example
 * ```tsx
 * <ProductGrid
 *   products={products}
 *   renderTile={(product) => <ProductTile key={product.id} product={product} />}
 *   desktopColumns={4}
 *   emptyMessage="No products found"
 * />
 * ```
 */
export function ProductGrid({
  products,
  renderTile,
  desktopColumns = 3,
  emptyMessage = 'No products available',
  isLoading = false,
  skeletonCount = 6,
  filterControls,
  sortControls,
  className,
  ariaLabel = 'Product grid',
}: ProductGridProps) {
  // Show loading skeleton
  if (isLoading) {
    return (
      <div className={styles.container}>
        {(filterControls || sortControls) && (
          <div className={styles.controls}>
            {filterControls && <div className={styles.filters}>{filterControls}</div>}
            {sortControls && <div className={styles.sort}>{sortControls}</div>}
          </div>
        )}
        <div
          className={`${styles.grid} ${styles[`cols-${desktopColumns}`]} ${className || ''}`}
          aria-busy="true"
          aria-label="Loading products"
        >
          {Array.from({ length: skeletonCount }).map((_, index) => (
            <div key={`skeleton-${index}`} className={styles.skeleton}>
              <div className={styles.skeletonImage} />
              <div className={styles.skeletonContent}>
                <div className={styles.skeletonTitle} />
                <div className={styles.skeletonText} />
                <div className={styles.skeletonPrice} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Show empty state
  if (!products || products.length === 0) {
    return (
      <div className={styles.container}>
        {(filterControls || sortControls) && (
          <div className={styles.controls}>
            {filterControls && <div className={styles.filters}>{filterControls}</div>}
            {sortControls && <div className={styles.sort}>{sortControls}</div>}
          </div>
        )}
        <div className={styles.empty} role="status" aria-live="polite">
          <div className={styles.emptyIcon}>
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
              />
            </svg>
          </div>
          <p className={styles.emptyMessage}>{emptyMessage}</p>
        </div>
      </div>
    );
  }

  // Render products grid
  return (
    <div className={styles.container}>
      {(filterControls || sortControls) && (
        <div className={styles.controls}>
          {filterControls && <div className={styles.filters}>{filterControls}</div>}
          {sortControls && <div className={styles.sort}>{sortControls}</div>}
        </div>
      )}
      <div
        className={`${styles.grid} ${styles[`cols-${desktopColumns}`]} ${className || ''}`}
        role="list"
        aria-label={ariaLabel}
      >
        {products.map((product, index) => (
          <div key={product.id} role="listitem">
            {renderTile(product, index)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductGrid;
