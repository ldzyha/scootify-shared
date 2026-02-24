'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { Icon } from './Icon';

// ============================================
// Types
// ============================================

export interface StickyCartItem {
  /** Unique key (e.g. `${productId}-${variantId}`) */
  id: string;
  /** Product name */
  name: string;
  /** Variant name (e.g. "60V 28Ah") */
  variantName?: string;
  /** Thumbnail image URL */
  image: string;
  /** Quantity in cart */
  quantity: number;
  /** URL to product page */
  href: string;
}

export interface StickyCartPanelProps {
  /** Cart items to display */
  items: StickyCartItem[];
  /** Called when user clicks the cart button */
  onOpenCart: () => void;
  /** Called to navigate to product (receives href). If not set, uses <a> tag */
  renderLink?: (props: { href: string; children: ReactNode; title: string; className: string }) => ReactNode;
  /** Currently active product path (to highlight matching item) */
  currentPath?: string;
  /** Item that was just added (shows "Додано" flash). Pass null/undefined when none */
  justAddedId?: string | null;
  /** Called after "Додано" animation completes */
  onJustAddedDismiss?: () => void;
  /** Paths where panel should be hidden (e.g. ["/cart", "/checkout"]) */
  hiddenPaths?: string[];
  /** Total item count (if different from sum of quantities) */
  totalCount?: number;
  /** Additional CSS classes */
  className?: string;
}

// ============================================
// Component
// ============================================

/**
 * StickyCartPanel - Floating vertical cart preview panel.
 *
 * Shows product thumbnails in a vertical column on the right side of the screen,
 * with a cart button at the bottom. Uses CSS custom properties for theming:
 * - `--primary` / `--primary-light` / `--primary-dark` for brand accent
 * - `--gradient-brand` for connecting line and badge gradient
 * - `--background` / `--surface` for neutrals
 *
 * @example
 * ```tsx
 * <StickyCartPanel
 *   items={cartItems}
 *   onOpenCart={() => setCartOpen(true)}
 *   currentPath={pathname}
 *   justAddedId={justAdded ? `${justAdded.productId}-${justAdded.variantId}` : null}
 *   onJustAddedDismiss={() => clearJustAdded()}
 *   hiddenPaths={["/cart", "/checkout"]}
 * />
 * ```
 */
export function StickyCartPanel({
  items,
  onOpenCart,
  renderLink,
  currentPath,
  justAddedId,
  onJustAddedDismiss,
  hiddenPaths = [],
  totalCount,
  className = '',
}: StickyCartPanelProps) {
  const [mounted, setMounted] = useState(false);
  const [showAddedMessage, setShowAddedMessage] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle "Додано" flash animation
  useEffect(() => {
    if (justAddedId && mounted) {
      setShowAddedMessage(justAddedId);

      const timer = setTimeout(() => {
        setShowAddedMessage(null);
        onJustAddedDismiss?.();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [justAddedId, mounted, onJustAddedDismiss]);

  // Calculate total
  const itemCount = totalCount ?? items.reduce((sum, item) => sum + item.quantity, 0);

  // Check if current path matches hidden paths
  const isHidden = hiddenPaths.some((p) => currentPath?.startsWith(p));

  // Don't render if not mounted, cart is empty, or on hidden pages
  if (!mounted || items.length === 0 || isHidden) return null;

  const isActiveItem = (item: StickyCartItem) => {
    if (!currentPath) return false;
    return currentPath === item.href || currentPath === item.href.replace(/\/$/, '');
  };

  const linkContent = (item: StickyCartItem) => {
    const isActive = isActiveItem(item);
    const isJustAdded = showAddedMessage === item.id;
    
    return (
      <div key={item.id} className="relative">
        {renderLink ? (
          renderLink({
            href: item.href,
            title: `${item.name}${item.variantName ? ` - ${item.variantName}` : ''}`,
            className: 'block group',
            children: (
              <div
                className="relative w-10 h-10 rounded-lg transition-all duration-300 group-hover:scale-110"
                style={{
                  outline: isActive
                    ? '2px solid var(--primary-light, var(--primary))'
                    : '1px solid color-mix(in srgb, var(--primary) 40%, transparent)',
                  outlineOffset: '0px',
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ),
          })
        ) : (
          <a
            href={item.href}
            className="block group"
            title={`${item.name}${item.variantName ? ` - ${item.variantName}` : ''}`}
          >
            <div
              className="relative w-10 h-10 rounded-lg transition-all duration-300 group-hover:scale-110"
              style={{
                outline: isActive
                  ? '2px solid var(--primary-light, var(--primary))'
                  : '1px solid color-mix(in srgb, var(--primary) 40%, transparent)',
                outlineOffset: '0px',
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </a>
        )}

        {/* Quantity badge */}
        <span
          className="absolute -top-1 -right-1 text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold z-10"
          style={{
            background: isActive ? 'white' : 'var(--primary-light, var(--primary))',
            color: 'var(--background, #0f0f14)',
            outline: isActive
              ? '1px solid var(--primary-light, var(--primary))'
              : '1px solid var(--background, #0f0f14)',
          }}
        >
          {item.quantity}
        </span>

        {/* "Додано" tag */}
        {isJustAdded && (
          <span
            className="absolute -left-2 -top-2 px-1.5 py-0.5 text-[9px] font-bold rounded whitespace-nowrap z-20"
            style={{
              background: 'var(--gradient-brand, var(--primary))',
              color: 'var(--background, #0f0f14)',
              boxShadow: '0 4px 12px color-mix(in srgb, var(--primary) 40%, transparent)',
              animation: 'fadeIn 0.2s ease-out',
            }}
          >
            Додано
          </span>
        )}
      </div>
    );
  };

  return (
    <div
      className={`fixed top-24 right-2 z-40 pr-2 pt-1 ${className}`}
      style={{ animation: 'slideInFromTop 0.3s ease-out' }}
    >
      <div className="relative flex flex-col items-center">
        {/* Connecting line from top to bottom through center */}
        <div
          className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 z-0"
          style={{
            background: `linear-gradient(to bottom, color-mix(in srgb, var(--primary) 30%, transparent), var(--primary), color-mix(in srgb, var(--primary) 30%, transparent))`,
          }}
        />

        {/* Product thumbnails - vertical column */}
        <div className="relative z-10 flex flex-col gap-3 max-h-[50vh] overflow-visible pr-1 pt-1" style={{ scrollbarWidth: 'none' }}>
          {items.map((item) => linkContent(item))}
        </div>

        {/* Cart button */}
        <div className="relative z-10 mt-2">
          <button
            onClick={onOpenCart}
            className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform hover:scale-110"
            style={{
              background: 'var(--gradient-brand, var(--primary))',
              color: 'var(--background, #0f0f14)',
            }}
            aria-label={`Відкрити кошик (${itemCount} товарів)`}
          >
            <Icon name="cart" size="sm" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default StickyCartPanel;
