'use client';

import { ReactNode, useState } from 'react';
import { MetallicText } from '../MetallicText';
import { Icon, type IconName } from '../Icon';
import { MetallicButton } from '../MetallicButton';
import styles from './Footer.module.css';

// ============================================================================
// Types
// ============================================================================

export interface FooterNavItem {
  label: string;
  href: string;
  icon?: IconName;
}

export interface FooterNavColumn {
  title: string;
  items: FooterNavItem[];
}

export interface FooterContactItem {
  icon: IconName;
  label: string;
  href?: string;
  lines?: string[];
}

export interface FooterSocialLink {
  platform: 'telegram' | 'youtube' | 'instagram' | 'facebook' | 'tiktok';
  href: string;
  label: string;
}

export interface FooterFeature {
  icon: IconName;
  title: string;
  description: string;
}

export interface FooterLegalLink {
  label: string;
  href: string;
}

export interface FooterProps {
  /** Brand/logo text or custom element */
  brand?: ReactNode;
  /** Brand tagline */
  tagline?: string;
  /** Navigation columns */
  navigation?: FooterNavColumn[];
  /** Contact information */
  contacts?: FooterContactItem[];
  /** Social media links */
  socials?: FooterSocialLink[];
  /** Feature highlights (shipping, warranty, etc.) */
  features?: FooterFeature[];
  /** Show newsletter section */
  showNewsletter?: boolean;
  /** Newsletter submit handler */
  onNewsletterSubmit?: (email: string) => void;
  /** Newsletter section title */
  newsletterTitle?: string;
  /** Newsletter section description */
  newsletterDescription?: string;
  /** Newsletter submit button text */
  newsletterButtonText?: string;
  /** Newsletter email placeholder */
  newsletterPlaceholder?: string;
  /** Payment method icons */
  paymentMethods?: ('visa' | 'mastercard' | 'applepay' | 'googlepay' | 'privat24' | 'monobank')[];
  /** Payment methods section title */
  paymentMethodsTitle?: string;
  /** Legal/policy links */
  legalLinks?: FooterLegalLink[];
  /** Copyright text */
  copyright?: string;
  /** Footer variant */
  variant?: 'full' | 'compact' | 'minimal';
  /** Custom className */
  className?: string;
  /** Contact section title (parameterized for i18n) */
  contactsTitle?: string;
  /** Social media section title (parameterized for i18n) */
  socialsTitle?: string;
  /** Newsletter variant for MetallicText */
  newsletterVariant?: 'blue' | 'gold' | 'silver' | 'platinum';
}

// ============================================================================
// Sub-Components
// ============================================================================

function FooterBrand({
  brand,
  tagline,
  socials,
}: {
  brand?: ReactNode;
  tagline?: string;
  socials?: FooterSocialLink[];
}) {
  return (
    <div className={styles.brandSection}>
      <div className={styles.logo}>
        {typeof brand === 'string' ? (
          <MetallicText variant="brandText">{brand}</MetallicText>
        ) : (
          brand
        )}
      </div>
      {tagline && <p className={styles.tagline}>{tagline}</p>}
      {socials && socials.length > 0 && (
        <div className={styles.socialLinks}>
          {socials.map((link) => (
            <a
              key={link.platform}
              href={link.href}
              className={`${styles.socialLink} ${styles[link.platform]}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
            >
              {socialIcons[link.platform]}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function FooterNav({
  columns,
  expandedSections,
  onToggle,
}: {
  columns: FooterNavColumn[];
  expandedSections: Set<string>;
  onToggle: (title: string) => void;
}) {
  return (
    <>
      {columns.map((column) => {
        const isExpanded = expandedSections.has(column.title);
        return (
          <nav key={column.title} className={styles.navSection}>
            <button
              className={styles.navTitleButton}
              onClick={() => onToggle(column.title)}
              aria-expanded={isExpanded}
            >
              <h3 className={styles.navTitle}>
                <MetallicText variant="silver">{column.title}</MetallicText>
              </h3>
              <span className={`${styles.accordionIcon} ${isExpanded ? styles.expanded : ''}`}>
                <Icon name="chevronDown" size="sm" />
              </span>
            </button>
            <ul className={`${styles.navList} ${isExpanded ? styles.navListExpanded : ''}`}>
              {column.items.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className={styles.navLink}>
                    {item.icon && <Icon name={item.icon} size="sm" />}
                    <span>{item.label}</span>
                    <span className={styles.navLinkIcon}>
                      <Icon name="chevronRight" size="xs" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        );
      })}
    </>
  );
}

function FooterContact({
  items,
  isExpanded,
  onToggle,
  title = 'Контакти',
}: {
  items: FooterContactItem[];
  isExpanded: boolean;
  onToggle: () => void;
  title?: string;
}) {
  return (
    <div className={styles.contactSection}>
      <button
        className={styles.navTitleButton}
        onClick={onToggle}
        aria-expanded={isExpanded}
      >
        <h3 className={styles.navTitle}>
          <MetallicText variant="silver">{title}</MetallicText>
        </h3>
        <span className={`${styles.accordionIcon} ${isExpanded ? styles.expanded : ''}`}>
          <Icon name="chevronDown" size="sm" />
        </span>
      </button>
      <div className={`${styles.contactList} ${isExpanded ? styles.contactListExpanded : ''}`}>
        {items.map((item, index) => (
          <div key={index} className={styles.contactItem}>
            <span className={styles.contactIcon}>
              <Icon name={item.icon} size="sm" metallic="blue" />
            </span>
            <div>
              {item.href ? (
                <a href={item.href} className={styles.contactLink}>
                  {item.label}
                </a>
              ) : (
                <span>{item.label}</span>
              )}
              {item.lines?.map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const socialIcons: Record<FooterSocialLink['platform'], ReactNode> = {
  telegram: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  ),
};

function FooterSocial({ links, title = 'Соцмережі' }: { links: FooterSocialLink[]; title?: string }) {
  return (
    <div className={styles.socialSection}>
      <h3 className={styles.navTitle}>
        <MetallicText variant="silver">{title}</MetallicText>
      </h3>
      <div className={styles.socialLinks}>
        {links.map((link) => (
          <a
            key={link.platform}
            href={link.href}
            className={`${styles.socialLink} ${styles[link.platform]}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
          >
            {socialIcons[link.platform]}
          </a>
        ))}
      </div>
    </div>
  );
}

function FooterNewsletter({
  onSubmit,
  title = 'Підпишіться на новини',
  description = 'Отримуйте першими інформацію про новинки та акції',
  buttonText = 'Підписатись',
  placeholder = 'Ваш email',
  variant = 'blue',
}: {
  onSubmit?: (email: string) => void;
  title?: string;
  description?: string;
  buttonText?: string;
  placeholder?: string;
  variant?: 'blue' | 'gold' | 'silver' | 'platinum';
}) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    if (email && onSubmit) {
      onSubmit(email);
    }
  };

  return (
    <div className={styles.newsletterSection}>
      <div className={styles.newsletterContent}>
        <h3 className={styles.newsletterTitle}>
          <MetallicText variant={variant}>{title}</MetallicText>
        </h3>
        <p className={styles.newsletterDescription}>
          {description}
        </p>
      </div>
      <form className={styles.newsletterForm} onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder={placeholder}
          className={styles.newsletterInput}
          required
        />
        <MetallicButton variant={variant} size="md" type="submit">
          {buttonText}
        </MetallicButton>
      </form>
    </div>
  );
}

const paymentIcons: Record<string, ReactNode> = {
  visa: (
    <svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="32" rx="4" fill="#1A1F71" />
      <path
        d="M19.5 21h-2.7l1.7-10.5h2.7L19.5 21zm-4.8 0h-2.8l-2.2-8.4c-.1-.4-.3-.6-.6-.7-.8-.4-1.7-.7-2.6-.9l.1-.5h4.4c.6 0 1.1.4 1.2 1l1.1 5.7 2.7-6.7h2.8L14.7 21zm16.8-6.8c0-2.7-3.7-2.8-3.7-4 0-.4.4-.8 1.1-.9.9-.1 1.8 0 2.6.3l.5-2.2c-.8-.3-1.7-.5-2.6-.5-2.7 0-4.7 1.5-4.7 3.6 0 1.6 1.4 2.4 2.5 2.9 1.1.5 1.5.9 1.5 1.4 0 .7-.9 1.1-1.7 1.1-.9 0-1.8-.2-2.6-.6l-.5 2.3c.9.3 1.9.5 2.8.5 2.9.1 4.8-1.4 4.8-3.7v-.2zm7.1 6.8h2.5l-2.2-10.5h-2.3c-.5 0-.9.3-1.1.7l-3.9 9.8h2.8l.5-1.5h3.4l.3 1.5zm-2.9-3.6l1.4-3.9.8 3.9h-2.2z"
        fill="#fff"
      />
    </svg>
  ),
  mastercard: (
    <svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="32" rx="4" fill="#000" />
      <circle cx="19" cy="16" r="8" fill="#EB001B" />
      <circle cx="29" cy="16" r="8" fill="#F79E1B" />
      <path
        d="M24 9.8c1.8 1.4 3 3.6 3 6.2s-1.2 4.8-3 6.2c-1.8-1.4-3-3.6-3-6.2s1.2-4.8 3-6.2z"
        fill="#FF5F00"
      />
    </svg>
  ),
  applepay: (
    <svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="32" rx="4" fill="#000" />
      <path
        d="M14.4 12.4c-.5.6-.9 1.4-.8 2.2.8.1 1.6-.4 2.1-1 .5-.6.8-1.3.8-2.1-.8 0-1.6.4-2.1.9zm.8 1.1c-1.2 0-2.2.6-2.7.6-.6 0-1.5-.6-2.4-.6-1.3 0-2.4.7-3.1 1.9-1.3 2.2-.3 5.5.9 7.3.6.9 1.4 1.9 2.4 1.9.9 0 1.3-.6 2.4-.6 1.1 0 1.4.6 2.4.6 1 0 1.7-.9 2.3-1.8.7-1 1-2 1-2.1-.1 0-2-.8-2-3 0-1.8 1.5-2.7 1.6-2.8-.9-1.3-2.2-1.4-2.7-1.4h-.1zm8.3-1.7v12.4h1.9v-4.2h2.6c2.4 0 4-1.6 4-4.1 0-2.5-1.6-4.1-4-4.1h-4.5zm1.9 1.6h2.2c1.6 0 2.6 1 2.6 2.5s-1 2.5-2.6 2.5h-2.2v-5zm9 11c1.2 0 2.3-.6 2.8-1.6h.1v1.5h1.8v-6.2c0-1.8-1.4-2.9-3.6-2.9-2 0-3.5 1.2-3.5 2.8h1.7c.2-.8.9-1.4 1.8-1.4 1.2 0 1.8.5 1.8 1.5v.7l-2.4.1c-2.2.1-3.4 1.1-3.4 2.7 0 1.7 1.3 2.8 2.9 2.8zm.5-1.4c-1 0-1.6-.5-1.6-1.3 0-.8.6-1.3 1.7-1.4l2.1-.1v.7c0 1.2-1 2.1-2.2 2.1zm6.2 3.6c1.8 0 2.7-.7 3.5-2.7l3.3-9.3h-1.9l-2.2 7.1h-.1l-2.2-7.1h-2l3.2 8.7-.2.5c-.3.9-.8 1.3-1.7 1.3h-.5v1.5h.8z"
        fill="#fff"
      />
    </svg>
  ),
  googlepay: (
    <svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="32" rx="4" fill="#fff" />
      <path
        d="M22.6 16.3v3.9h-1.2v-9.6h3.3c.8 0 1.5.3 2 .8.6.5.8 1.2.8 2 0 .8-.3 1.5-.8 2-.5.5-1.2.8-2 .8l-2.1.1zm0-4.5v3.4h2.1c.5 0 .9-.2 1.2-.5.3-.3.5-.7.5-1.2 0-.5-.2-.9-.5-1.2-.3-.3-.7-.5-1.2-.5h-2.1z"
        fill="#5F6368"
      />
      <path
        d="M29.3 13.1c.9 0 1.6.2 2.1.7.5.5.8 1.2.8 2v4.4h-1.2v-1h-.1c-.5.8-1.1 1.2-2 1.2-.7 0-1.3-.2-1.8-.6-.5-.4-.7-.9-.7-1.6 0-.7.3-1.2.8-1.6.5-.4 1.2-.6 2-.6.7 0 1.3.1 1.7.4v-.3c0-.4-.2-.8-.5-1.1-.3-.3-.7-.4-1.1-.4-.6 0-1.1.3-1.5.8l-1.1-.7c.5-.9 1.4-1.3 2.6-1.6zm-1.5 5.2c0 .3.1.6.4.8.3.2.6.3 1 .3.5 0 1-.2 1.4-.6.4-.4.6-.8.6-1.3-.3-.3-.8-.4-1.5-.4-.5 0-.9.1-1.3.3-.4.2-.6.5-.6.9z"
        fill="#5F6368"
      />
      <path
        d="M38.1 13.3l-4.2 9.6h-1.2l1.6-3.4-2.8-6.2h1.3l2 4.7h.1l2-4.7h1.2z"
        fill="#5F6368"
      />
      <path
        d="M16.2 15.6c0-.4 0-.7-.1-1.1h-5.3v2h3.1c-.1.7-.5 1.3-1 1.7v1.4h1.6c1-.9 1.7-2.2 1.7-4z"
        fill="#4285F4"
      />
      <path
        d="M10.8 21c1.4 0 2.5-.5 3.4-1.3l-1.6-1.3c-.5.3-1.1.5-1.8.5-1.4 0-2.5-.9-2.9-2.2H6.2v1.3c.9 1.8 2.6 3 4.6 3z"
        fill="#34A853"
      />
      <path
        d="M7.9 16.7c-.1-.3-.2-.7-.2-1.1 0-.4.1-.8.2-1.1v-1.4H6.2c-.3.6-.4 1.2-.4 2s.1 1.4.4 2l1.7-1.4z"
        fill="#FBBC04"
      />
      <path
        d="M10.8 12.4c.8 0 1.5.3 2 .8l1.5-1.5c-.9-.9-2.1-1.4-3.5-1.4-2 0-3.8 1.2-4.6 2.9l1.7 1.3c.4-1.3 1.5-2.1 2.9-2.1z"
        fill="#EA4335"
      />
    </svg>
  ),
  privat24: (
    <svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="32" rx="4" fill="#78BE20" />
      <path d="M10 10h5v5h-5v-5zm0 7h5v5h-5v-5zm7-7h5v5h-5v-5zm7 0h5v12h-5v-12zm7 0h7v5h-7v-5zm0 7h7v5h-7v-5z" fill="#fff" />
    </svg>
  ),
  monobank: (
    <svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="32" rx="4" fill="#000" />
      <circle cx="24" cy="16" r="8" fill="#fff" />
      <circle cx="24" cy="16" r="5" fill="#000" />
    </svg>
  ),
};

function FooterPayments({
  methods,
  title = 'Методи оплати',
}: {
  methods: FooterProps['paymentMethods'];
  title?: string;
}) {
  if (!methods || methods.length === 0) return null;

  return (
    <div className={styles.paymentsSection}>
      <p className={styles.paymentsTitle}>{title}</p>
      <div className={styles.paymentsList}>
        {methods.map((method) => (
          <div key={method} className={styles.paymentIcon}>
            {paymentIcons[method]}
          </div>
        ))}
      </div>
    </div>
  );
}

function FooterFeatures({ features }: { features: FooterFeature[] }) {
  return (
    <div className={styles.featuresGrid}>
      {features.map((feature, index) => (
        <div key={index} className={styles.featureCard}>
          <div className={styles.featureIcon}>
            <Icon name={feature.icon} size="lg" metallic="blue" />
          </div>
          <div className={styles.featureContent}>
            <span className={styles.featureTitle}>{feature.title}</span>
            <span className={styles.featureDescription}>{feature.description}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function FooterBottom({
  copyright,
  legalLinks,
}: {
  copyright?: string;
  legalLinks?: FooterLegalLink[];
}) {
  const year = new Date().getFullYear();
  const defaultCopyright = `${year}. Всі права захищені.`;

  return (
    <div className={styles.bottomBar}>
      <p className={styles.copyright}>{copyright || defaultCopyright}</p>
      {legalLinks && legalLinks.length > 0 && (
        <div className={styles.legalLinks}>
          {legalLinks.map((link) => (
            <a key={link.href} href={link.href} className={styles.legalLink}>
              {link.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Main Component
// ============================================================================

export function Footer({
  brand,
  tagline,
  navigation,
  contacts,
  socials,
  features,
  showNewsletter = false,
  onNewsletterSubmit,
  newsletterTitle,
  newsletterDescription,
  newsletterButtonText,
  newsletterPlaceholder,
  newsletterVariant = 'blue',
  paymentMethods,
  paymentMethodsTitle,
  legalLinks,
  copyright,
  variant = 'full',
  className = '',
  contactsTitle,
  socialsTitle,
}: FooterProps) {
  const variantClass = variant !== 'full' ? styles[variant] : '';

  // Mobile accordion state - collapsed by default
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(section)) {
        next.delete(section);
      } else {
        next.add(section);
      }
      return next;
    });
  };

  const isContactExpanded = expandedSections.has(contactsTitle || 'Контакти');

  // Minimal variant
  if (variant === 'minimal') {
    return (
      <footer className={`${styles.footer} ${styles.minimal} ${className}`}>
        <div className={styles.container}>
          <FooterBottom copyright={copyright} legalLinks={legalLinks} />
        </div>
      </footer>
    );
  }

  return (
    <footer className={`${styles.footer} ${variantClass} ${className}`}>
      <div className={styles.container}>
        <div className={styles.mainGrid}>
          {/* Features Row */}
          {features && features.length > 0 && (
            <FooterFeatures features={features} />
          )}

          {/* Brand + Social */}
          <FooterBrand brand={brand} tagline={tagline} socials={socials} />

          {/* Navigation */}
          {navigation && (
            <FooterNav
              columns={navigation}
              expandedSections={expandedSections}
              onToggle={toggleSection}
            />
          )}

          {/* Contact */}
          {contacts && (
            <FooterContact
              items={contacts}
              isExpanded={isContactExpanded}
              onToggle={() => toggleSection(contactsTitle || 'Контакти')}
              title={contactsTitle}
            />
          )}

          {/* Newsletter */}
          {showNewsletter && (
            <FooterNewsletter 
              onSubmit={onNewsletterSubmit} 
              title={newsletterTitle}
              description={newsletterDescription}
              buttonText={newsletterButtonText}
              placeholder={newsletterPlaceholder}
              variant={newsletterVariant}
            />
          )}

          {/* Payments */}
          <FooterPayments methods={paymentMethods} title={paymentMethodsTitle} />

          {/* Bottom Bar */}
          <FooterBottom copyright={copyright} legalLinks={legalLinks} />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
