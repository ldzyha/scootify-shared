'use client';

import { useState, useRef, useCallback } from 'react';
import { Icon } from '../Icon';
import { MetallicText } from '../MetallicText';
import { Dialog, type DialogHandle } from '../Dialog';
import { SmartSearch, type SearchResult } from '../SmartSearch';
import { ContactDialog } from './ContactDialog';
import { useHeaderScroll } from '../../hooks/useHeaderScroll';
import type { SiteConfig } from '../../types/site-config';
import type { CartOperations } from '../../types/cart';
import styles from './Header.module.css';

// ============================================
// Types
// ============================================

export interface HeaderProps {
  /** Site configuration for branding, contact info, navigation */
  siteConfig: SiteConfig;
  
  /** Cart operations for displaying item count */
  cart?: CartOperations;
  
  /** URL for the cart page (default: '/cart') */
  cartHref?: string;
  
  /** Search handler - returns product results */
  onSearch?: (query: string) => Promise<SearchResult[]>;
  
  /** Search result selection handler */
  onSelectSearchResult?: (result: SearchResult) => void;
  
  /** Load popular products for search suggestions */
  onLoadPopularProducts?: () => Promise<SearchResult[]>;
  
  /** Load user's favorite products for search suggestions */
  onLoadFavorites?: () => Promise<SearchResult[]>;
  
  /** Callback request handler from contact dialog */
  onCallbackSubmit?: (phone: string) => Promise<void>;
  
  /** Language switcher component (optional) */
  languageSwitcher?: React.ReactNode;
  
  /** Custom navigation links (optional - overrides config-based nav) */
  navigationLinks?: Array<{
    href: string;
    label: string;
  }>;
  
  /** Additional CSS class */
  className?: string;
}

// ============================================
// Header Component
// ============================================

/**
 * Universal Header component with sticky scroll behavior, search, and cart.
 * 
 * Features:
 * - Sticky header with auto-hide on scroll down
 * - Configurable via SiteConfig (logo, branding, contact)
 * - Integrated SmartSearch with popular products and favorites
 * - Shopping cart with badge counter
 * - Contact dialog with phone/email/Telegram
 * - Mobile-responsive (hamburger menu, compact layout)
 * - Language switcher support (optional)
 * - CSS custom properties for theming
 * 
 * @example
 * ```tsx
 * <Header
 *   siteConfig={siteConfig}
 *   cart={cartOperations}
 *   onSearch={searchProducts}
 *   onCallbackSubmit={submitCallbackRequest}
 * />
 * ```
 */
export function Header({
  siteConfig,
  cart,
  cartHref = '/cart',
  onSearch,
  onSelectSearchResult,
  onLoadPopularProducts,
  onLoadFavorites,
  onCallbackSubmit,
  languageSwitcher,
  navigationLinks,
  className = '',
}: HeaderProps) {
  const { isVisible, isAtTop, headerRef } = useHeaderScroll(60);
  const contactDialogRef = useRef<DialogHandle>(null);
  const cartItemCount = cart?.itemCount || 0;

  // Open contact dialog
  const handleContactClick = useCallback(() => {
    contactDialogRef.current?.open();
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className={`
          ${styles.header}
          ${isAtTop ? styles.atTop : styles.scrolled}
          ${isVisible ? '' : styles.hidden}
          ${className}
        `}
      >
        {/* Main Header - hides on scroll down */}
        <div className={`${styles.main} ${isVisible ? styles.mainVisible : styles.mainHidden}`}>
          <div className={styles.container}>
            {/* Logo */}
            <a href="/" className={styles.logo}>
              <MetallicText 
                variant="brandText" 
                as="span" 
                className={styles.logoText}
                metallicGradients={siteConfig.metallicGradients}
              >
                {siteConfig.brand}
              </MetallicText>
            </a>

            {/* Search */}
            <div className={styles.searchContainer}>
              <SmartSearch
                onSearch={onSearch}
                onSelect={onSelectSearchResult}
                onLoadPopularProducts={onLoadPopularProducts}
                onLoadFavorites={onLoadFavorites}
                onContactClick={handleContactClick}
              />
            </div>

            {/* Actions */}
            <div className={styles.actions}>
              {/* Language Switcher (optional) */}
              {languageSwitcher && (
                <div className={styles.languageSwitcher}>
                  {languageSwitcher}
                </div>
              )}

              {/* Cart Button */}
              {cart && (
                <a href={cartHref} className={styles.actionButton} aria-label="Кошик">
                  <div className={styles.cartIconWrapper}>
                    <Icon name="cart" size="md" />
                    {cartItemCount > 0 && (
                      <span className={styles.cartBadge}>
                        {cartItemCount > 99 ? '99+' : cartItemCount}
                      </span>
                    )}
                  </div>
                  <span className={styles.actionLabel}>Кошик</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Spacer to prevent content jump */}
      <div className={styles.spacer} />

      {/* Contact Dialog */}
      <Dialog
        ref={contactDialogRef}
        position="center"
        size="sm"
      >
        <ContactDialog 
          siteConfig={siteConfig}
          onSubmitCallback={onCallbackSubmit} 
        />
      </Dialog>
    </>
  );
}

export default Header;
