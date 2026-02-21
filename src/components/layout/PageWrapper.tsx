import React from 'react';
import type { ReactNode } from 'react';
import type { SiteConfig } from '../../types/site-config';
import type { CartOperations } from '../../types/cart';
import './PageWrapper.css';

export interface PageWrapperProps {
  siteConfig: SiteConfig;
  children: ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  maxWidth?: 'full' | 'wide' | 'normal' | 'narrow';
  cartOperations?: CartOperations;
  className?: string;
}

// Placeholder components - replace with actual Header/Footer implementations
const Header: React.FC<{ config: SiteConfig; cart?: CartOperations }> = ({ config, cart }) => (
  <header className="pageHeader">
    <div className="headerContent">
      <h1>{config.siteName}</h1>
      {cart && <div className="cartBadge">{cart.itemCount}</div>}
    </div>
  </header>
);

const Footer: React.FC<{ config: SiteConfig }> = ({ config }) => (
  <footer className="pageFooter">
    <div className="footerContent">
      <p>&copy; {new Date().getFullYear()} {config.brand}</p>
      {config.contact.phone && <p>Phone: {config.contact.phone}</p>}
      {config.contact.email && <p>Email: {config.contact.email}</p>}
    </div>
  </footer>
);

const MAX_WIDTH_MAP = {
  full: '100%',
  wide: '1400px',
  normal: '1200px',
  narrow: '960px',
} as const;

export const PageWrapper: React.FC<PageWrapperProps> = ({
  siteConfig,
  children,
  showHeader = true,
  showFooter = true,
  maxWidth = 'normal',
  cartOperations,
  className = '',
}) => {
  const contentMaxWidth = MAX_WIDTH_MAP[maxWidth];

  return (
    <div className="pageWrapper">
      <a href="#main-content" className="skipToContent">
        Skip to content
      </a>
      
      {showHeader && (
        <Header config={siteConfig} cart={cartOperations} />
      )}
      
      <main
        id="main-content"
        className={`pageContent ${className}`}
        style={{ '--content-max-width': contentMaxWidth } as React.CSSProperties}
      >
        {children}
      </main>
      
      {showFooter && (
        <Footer config={siteConfig} />
      )}
    </div>
  );
};

export default PageWrapper;
