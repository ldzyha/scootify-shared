'use client';

import { useState, useEffect, FormEvent } from 'react';
import { Icon, type IconName } from '../Icon';
import { MetallicText } from '../MetallicText';
import { MetallicButton } from '../MetallicButton';
import type { MetallicVariant } from '../../lib/metallic';
import type { SiteConfig } from '../../types/site-config';
import styles from './ContactDialog.module.css';

// ============================================
// Types
// ============================================

export interface ContactDialogProps {
  /** Site configuration for contact info */
  siteConfig: SiteConfig;
  
  /** Callback request handler */
  onSubmitCallback?: (phone: string) => Promise<void>;
}

// ============================================
// ContactDialog Component
// ============================================

/**
 * Contact dialog with phone, email, Telegram, and callback form.
 * 
 * Features:
 * - Phone: Click-to-call on mobile, copy/QR code on desktop
 * - Telegram: Direct link with copy button
 * - Email: mailto link with copy button (if configured)
 * - Callback form: Request a callback with phone number
 * - Desktop detection for conditional UI (QR code vs direct call)
 * - Success state with auto-hide after 5 seconds
 * - QR code generation for phone numbers on desktop
 * 
 * @example
 * ```tsx
 * <ContactDialog
 *   siteConfig={siteConfig}
 *   onSubmitCallback={submitCallbackRequest}
 * />
 * ```
 */
export function ContactDialog({ 
  siteConfig,
  onSubmitCallback 
}: ContactDialogProps) {
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showQR, setShowQR] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Extract contact info from config
  const phoneNumber = siteConfig.contact.phone;
  const phoneDisplay = phoneNumber; // Sites should format in config
  const email = siteConfig.contact.email;
  const telegram = siteConfig.contact.telegram?.personal || siteConfig.contact.telegram?.bot;
  const telegramUrl = telegram ? `https://t.me/${telegram.replace('@', '')}` : undefined;

  // Auto-hide success message after 5 seconds
  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        setIsSuccess(false);
        setPhone(''); // Clear phone input for next submission
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  // Detect desktop (no touch or large screen)
  useEffect(() => {
    const checkDesktop = () => {
      const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
      const isLargeScreen = window.innerWidth >= 768;
      setIsDesktop(!hasCoarsePointer && isLargeScreen);
    };

    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const handleCopy = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!phone.trim()) {
      setError('Введіть номер телефону');
      return;
    }

    setIsSubmitting(true);
    try {
      if (onSubmitCallback) {
        await onSubmitCallback(phone);
      }
      setIsSuccess(true);
    } catch (err) {
      setError('Помилка надсилання. Спробуйте ще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // QR Code modal
  if (showQR) {
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=tel:${phoneNumber}&bgcolor=1E1E1E&color=ffffff`;

    return (
      <div className={styles.contactContent}>
        <button
          className={styles.backButton}
          onClick={() => setShowQR(false)}
          aria-label="Назад"
        >
          <Icon name="chevronLeft" size="sm" />
          Назад
        </button>

        <MetallicText 
          variant="silver" 
          as="h3" 
          className={styles.contactTitle}
          metallicGradients={siteConfig.metallicGradients}
        >
          Скануйте для дзвінка
        </MetallicText>
        <p className={styles.contactSubtitle}>
          Відскануйте QR-код камерою телефону
        </p>

        <div className={styles.qrContainer}>
          <img
            src={qrUrl}
            alt="QR код для дзвінка"
            className={styles.qrCode}
            width={200}
            height={200}
          />
        </div>

        <p className={styles.qrPhone}>{phoneDisplay}</p>
      </div>
    );
  }

  return (
    <div className={styles.contactContent}>
      <MetallicText 
        variant="silver" 
        as="h3" 
        className={styles.contactTitle}
        metallicGradients={siteConfig.metallicGradients}
      >
        Зв'язатися з нами
      </MetallicText>
      <p className={styles.contactSubtitle}>
        {isDesktop
          ? 'Оберіть зручний спосіб зв\'язку'
          : 'Зателефонуйте або залиште заявку на зворотній дзвінок'
        }
      </p>

      {/* Contact Info */}
      <div className={styles.contactInfo}>
        {/* Phone - different behavior on desktop */}
        <ContactRow
          icon="phone"
          iconVariant="blue"
          label="Телефон"
          value={phoneDisplay}
          valueVariant="silver"
          copyValue={phoneNumber}
          onCopy={() => handleCopy(phoneNumber, 'phone')}
          copied={copiedField === 'phone'}
          href={isDesktop ? undefined : `tel:${phoneNumber}`}
          isDesktop={isDesktop}
          onShowQR={() => setShowQR(true)}
          metallicGradients={siteConfig.metallicGradients}
        />

        {/* Email (optional) */}
        {email && (
          <ContactRow
            icon="mail"
            iconVariant="blue"
            label="Email"
            value={email}
            valueVariant="blue"
            copyValue={email}
            onCopy={() => handleCopy(email, 'email')}
            copied={copiedField === 'email'}
            href={`mailto:${email}`}
            metallicGradients={siteConfig.metallicGradients}
          />
        )}

        {/* Telegram (optional) */}
        {telegram && telegramUrl && (
          <ContactRow
            icon="telegram"
            iconVariant="blue"
            label="Telegram"
            value={telegram}
            valueVariant="blue"
            copyValue={telegramUrl}
            onCopy={() => handleCopy(telegramUrl, 'telegram')}
            copied={copiedField === 'telegram'}
            href={telegramUrl}
            external
            metallicGradients={siteConfig.metallicGradients}
          />
        )}
      </div>

      {/* Callback Form / Success */}
      <div className={styles.callbackSection}>
        {isSuccess ? (
          <div className={styles.callbackSuccess}>
            <Icon name="success" size="md" metallic="green" />
            <div>
              <span className={styles.callbackSuccessTitle}>Заявку прийнято</span>
              <span className={styles.callbackSuccessText}>Ми зателефонуємо вам найближчим часом</span>
            </div>
          </div>
        ) : (
          <>
            <span className={styles.callbackTitle}>Зворотній дзвінок</span>
            <form onSubmit={handleSubmit} className={styles.callbackForm}>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+38 (0__) ___-__-__"
                className={styles.callbackInput}
                required
              />
              {error && <span className={styles.callbackError}>{error}</span>}
              <MetallicButton
                type="submit"
                variant="blue"
                size="md"
                disabled={isSubmitting}
                className={styles.callbackButton}
                metallicGradients={siteConfig.metallicGradients}
              >
                {isSubmitting ? 'Надсилання...' : 'Зателефонуйте мені'}
              </MetallicButton>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// ============================================
// ContactRow Component
// ============================================

interface ContactRowProps {
  icon: IconName;
  iconVariant: MetallicVariant;
  label: string;
  value: string;
  valueVariant: MetallicVariant;
  copyValue: string;
  onCopy: () => void;
  copied: boolean;
  href?: string;
  external?: boolean;
  isDesktop?: boolean;
  onShowQR?: () => void;
  metallicGradients?: Record<string, string | undefined>;
}

function ContactRow({
  icon,
  iconVariant,
  label,
  value,
  valueVariant,
  copyValue,
  onCopy,
  copied,
  href,
  external,
  isDesktop,
  onShowQR,
  metallicGradients,
}: ContactRowProps) {
  // Phone on desktop - no link, show action buttons
  if (isDesktop && !href && onShowQR) {
    return (
      <div className={styles.contactRow}>
        <div className={styles.contactRowMain}>
          <Icon name={icon} size="md" metallic={iconVariant} />
          <div className={styles.contactRowInfo}>
            <span className={styles.contactLabel}>{label}</span>
            <MetallicText 
              variant={valueVariant} 
              className={styles.contactValue}
              metallicGradients={metallicGradients}
            >
              {value}
            </MetallicText>
          </div>
        </div>
        <div className={styles.contactRowActions}>
          <button
            className={styles.actionBtn}
            onClick={onCopy}
            aria-label="Копіювати"
            title="Копіювати"
          >
            <Icon name={copied ? 'check' : 'copy'} size="sm" />
          </button>
          <button
            className={styles.actionBtn}
            onClick={onShowQR}
            aria-label="Показати QR-код"
            title="QR-код для дзвінка"
          >
            <Icon name="qrCode" size="sm" />
          </button>
        </div>
      </div>
    );
  }

  // Regular contact row with link
  const linkProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <div className={styles.contactRow}>
      {href ? (
        <a href={href} className={styles.contactRowMain} {...linkProps}>
          <Icon name={icon} size="md" metallic={iconVariant} />
          <div className={styles.contactRowInfo}>
            <span className={styles.contactLabel}>{label}</span>
            <MetallicText 
              variant={valueVariant} 
              className={styles.contactValue}
              metallicGradients={metallicGradients}
            >
              {value}
            </MetallicText>
          </div>
        </a>
      ) : (
        <div className={styles.contactRowMain}>
          <Icon name={icon} size="md" metallic={iconVariant} />
          <div className={styles.contactRowInfo}>
            <span className={styles.contactLabel}>{label}</span>
            <MetallicText 
              variant={valueVariant} 
              className={styles.contactValue}
              metallicGradients={metallicGradients}
            >
              {value}
            </MetallicText>
          </div>
        </div>
      )}
      <button
        className={styles.actionBtn}
        onClick={onCopy}
        aria-label="Копіювати"
        title="Копіювати"
      >
        <Icon name={copied ? 'check' : 'copy'} size="sm" />
      </button>
    </div>
  );
}

export default ContactDialog;
