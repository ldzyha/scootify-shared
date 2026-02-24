'use client';

import { ReactNode, useMemo } from 'react';
import { legalPages, LegalPage as LegalPageData } from '@scootify/shared/data/legal-pages';
import { SiteConfig } from '@scootify/shared/types/site-config';
import { MetallicText } from './MetallicText';
import { Icon } from './Icon';
import styles from './LegalPage.module.css';

/**
 * Legal page keys corresponding to legal-pages.ts slugs
 */
export type LegalPageKey = 'terms' | 'privacy' | 'returns' | 'warranty' | 'shipping' | 'contact' | 'cookies';

/**
 * Mapping of page keys to slugs in legal-pages.ts
 */
const PAGE_KEY_TO_SLUG: Record<LegalPageKey, string> = {
  terms: 'umovy-vykorystannia',
  privacy: 'polityka-konfidentsiinosti',
  returns: 'povernennia',
  warranty: 'harantiia',
  shipping: 'dostavka-i-oplata',
  contact: 'kontakty',
  cookies: 'cookies',
};

/**
 * Icon mapping for different legal page types
 */
const PAGE_ICONS: Record<LegalPageKey, string> = {
  terms: 'info',
  privacy: 'shield',
  returns: 'truck',
  warranty: 'shieldCheck',
  shipping: 'truck',
  contact: 'phone',
  cookies: 'settings',
};

/**
 * Props for the LegalPage component
 */
export interface LegalPageProps {
  /** Key identifying which legal page to render */
  pageKey: LegalPageKey;
  
  /** Site configuration for placeholder replacements */
  siteConfig: SiteConfig;
  
  /** Optional custom content to override the default */
  customContent?: Omit<LegalPageData, 'slug'>;
  
  /** Show table of contents for long pages */
  showTOC?: boolean;
  
  /** Additional CSS classes */
  className?: string;
  
  /** Custom breadcrumb component */
  breadcrumb?: ReactNode;
}

/**
 * Replace placeholders in text with values from site config
 */
function replacePlaceholders(text: string, siteConfig: SiteConfig): string {
  const replacements: Record<string, string> = {
    '{{siteName}}': siteConfig.siteName,
    '{{siteUrl}}': siteConfig.siteUrl,
    '{{brand}}': siteConfig.brand,
    '{{phone}}': siteConfig.contact.phone,
    '{{email}}': siteConfig.contact.email,
    '{{telegram}}': siteConfig.contact.telegram?.personal || '',
    '{{address}}': siteConfig.address 
      ? `${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.postalCode}` 
      : '',
    '{{legalName}}': siteConfig.legalName || siteConfig.siteName,
    '{{taxId}}': siteConfig.taxId || '',
    
    // Alternate placeholder formats (with single braces)
    '{SITE_NAME}': siteConfig.siteName,
    '{SITE_URL}': siteConfig.siteUrl,
    '{BRAND}': siteConfig.brand,
    '{PHONE}': siteConfig.contact.phone,
    '{EMAIL}': siteConfig.contact.email,
    '{TELEGRAM}': siteConfig.contact.telegram?.personal || '',
    '{ADDRESS}': siteConfig.address 
      ? `${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.postalCode}` 
      : '',
    '{LEGAL_NAME}': siteConfig.legalName || siteConfig.siteName,
    '{TAX_ID}': siteConfig.taxId || '',
  };

  let result = text;
  Object.entries(replacements).forEach(([placeholder, value]) => {
    result = result.replaceAll(placeholder, value);
  });
  
  return result;
}

/**
 * Format date for display
 */
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('uk-UA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

/**
 * Generate an anchor ID from section title
 */
function generateAnchorId(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^а-яіїєґa-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 50);
}

/**
 * LegalPage component - Renders legal pages with dynamic content
 * 
 * Features:
 * - Renders data from legal-pages.ts
 * - Replaces placeholders with site-specific values
 * - Optional table of contents for navigation
 * - Print-friendly styling
 * - Responsive layout
 * - Accessibility support
 * 
 * @example
 * ```tsx
 * <LegalPage
 *   pageKey="terms"
 *   siteConfig={siteConfig}
 *   showTOC={true}
 * />
 * ```
 * 
 * @example With custom content
 * ```tsx
 * <LegalPage
 *   pageKey="warranty"
 *   siteConfig={siteConfig}
 *   customContent={{
 *     title: 'Custom Warranty',
 *     lastUpdated: '2026-02-21',
 *     sections: [...]
 *   }}
 * />
 * ```
 */
export function LegalPage({
  pageKey,
  siteConfig,
  customContent,
  showTOC = true,
  className = '',
  breadcrumb,
}: LegalPageProps) {
  // Get content from data file or use custom content
  const content = useMemo(() => {
    if (customContent) {
      return customContent;
    }
    
    const slug = PAGE_KEY_TO_SLUG[pageKey];
    const page = legalPages.find(p => p.slug === slug);
    
    if (!page) {
      console.warn(`Legal page not found for key: ${pageKey}`);
      return null;
    }
    
    return page;
  }, [pageKey, customContent]);

  if (!content) {
    return (
      <div className={styles.error}>
        <Icon name="warning" size="xl" color="var(--color-error, #dc2626)" />
        <p>Не вдалося завантажити сторінку</p>
      </div>
    );
  }

  const showTableOfContents = showTOC && content.sections.length > 5;
  const iconName = PAGE_ICONS[pageKey] || 'info';

  return (
    <div className={`${styles.container} ${className}`}>
      {/* Breadcrumb */}
      {breadcrumb && (
        <div className={styles.breadcrumb}>
          {breadcrumb}
        </div>
      )}

      {/* Page Header */}
      <header className={styles.header}>
        <div className={styles.titleRow}>
          <Icon 
            name={iconName} 
            size="xl" 
            metallic="blue" 
            className={styles.headerIcon}
          />
          <MetallicText 
            variant="blue" 
            as="h1" 
            className={styles.title}
          >
            {replacePlaceholders(content.title, siteConfig)}
          </MetallicText>
        </div>
        <div className={styles.metadata}>
          <Icon name="clock" size="sm" color="var(--color-text-tertiary, #999)" />
          <time className={styles.lastUpdated}>
            Оновлено: {formatDate(content.lastUpdated)}
          </time>
        </div>
      </header>

      {/* Table of Contents */}
      {showTableOfContents && (
        <nav className={styles.toc} aria-label="Зміст сторінки">
          <h2 className={styles.tocTitle}>Зміст</h2>
          <ol className={styles.tocList}>
            {content.sections.map((section, index) => {
              const anchorId = generateAnchorId(section.title);
              return (
                <li key={index} className={styles.tocItem}>
                  <a href={`#${anchorId}`} className={styles.tocLink}>
                    {replacePlaceholders(section.title, siteConfig)}
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>
      )}

      {/* Main Content */}
      <main className={styles.content}>
        {content.sections.map((section, index) => {
          const anchorId = generateAnchorId(section.title);
          
          return (
            <section 
              key={index} 
              id={anchorId}
              className={styles.section}
            >
              <h2 className={styles.sectionTitle}>
                <Icon 
                  name="chevronRight" 
                  size="sm" 
                  color="var(--color-primary, #0066cc)"
                  className={styles.sectionIcon}
                />
                {replacePlaceholders(section.title, siteConfig)}
              </h2>
              
              {section.content && (
                <p className={styles.sectionContent}>
                  {replacePlaceholders(section.content, siteConfig)}
                </p>
              )}
              
              {section.items && section.items.length > 0 && (
                <ul className={styles.itemList}>
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className={styles.item}>
                      {replacePlaceholders(item, siteConfig)}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          );
        })}
      </main>

      {/* Print Button */}
      <div className={styles.actions}>
        <button 
          onClick={() => window.print()} 
          className={styles.printButton}
          type="button"
        >
          <Icon name="copy" size="sm" />
          <span>Роздрукувати</span>
        </button>
      </div>
    </div>
  );
}

export default LegalPage;
