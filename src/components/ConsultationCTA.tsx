'use client';

import { useState, useRef } from 'react';
import { MetallicButton } from './MetallicButton';
import { MetallicText } from './MetallicText';
import { CallButton } from './CallButton';
import { Icon } from './Icon';
import { Dialog, type DialogHandle } from './Dialog';
import { PREPAYMENT_TERMS } from '@scootify/shared/data/business-rules';
import type { SiteConfig } from '@scootify/shared/types/site-config';
import type { Product } from '@scootify/shared/types/product';
import styles from './ConsultationCTA.module.css';

/**
 * Props for the ConsultationCTA component.
 */
export interface ConsultationCTAProps {
  /** Product data with purchaseModel and prepaymentTerms */
  product: Product;
  /** Site configuration with contact info */
  siteConfig: SiteConfig;
  /** Display mode: inline (embedded) or dialog (opens in modal) */
  mode?: 'inline' | 'dialog';
  /** Show quick contact form (default: true) */
  showContactForm?: boolean;
  /** Estimated delivery time in days */
  estimatedDeliveryDays?: { min: number; max: number };
  /** Custom CTA button text (for dialog mode) */
  ctaButtonText?: string;
  /** Additional CSS class name */
  className?: string;
}

/**
 * ConsultationCTA - Call-to-action component for consultation-based purchases.
 * 
 * Displays clear messaging for products that require consultation,
 * including pricing transparency, payment terms, and contact options.
 * 
 * Features:
 * - Shows final price messaging (no hidden costs)
 * - Displays payment/prepayment terms
 * - Provides multiple contact methods (Phone, Telegram, Email)
 * - Supports inline and dialog modes
 * - Optional quick contact form
 * - Shows estimated delivery time
 * - Mobile-responsive with gradient backgrounds
 * 
 * @example Inline mode
 * ```tsx
 * <ConsultationCTA 
 *   product={product} 
 *   siteConfig={config}
 *   mode="inline"
 *   estimatedDeliveryDays={{ min: 1, max: 3 }}
 * />
 * ```
 * 
 * @example Dialog mode
 * ```tsx
 * <ConsultationCTA 
 *   product={product} 
 *   siteConfig={config}
 *   mode="dialog"
 *   ctaButtonText="Замовити консультацію"
 * />
 * ```
 */
export function ConsultationCTA({
  product,
  siteConfig,
  mode = 'inline',
  showContactForm = true,
  estimatedDeliveryDays,
  ctaButtonText = 'Замовити консультацію',
  className = '',
}: ConsultationCTAProps) {
  const dialogRef = useRef<DialogHandle>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    preferredTime: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Only show for consultation products
  if (product.purchaseModel !== 'consultation') {
    return null;
  }

  // Get payment terms from product or brand defaults
  const getPaymentTerms = () => {
    if (product.prepaymentTerms) {
      return product.prepaymentTerms.description || 
             (product.prepaymentTerms.type === 'fixed' 
               ? `${product.prepaymentTerms.amount} грн передоплата + накладений платіж`
               : `${product.prepaymentTerms.amount}% передоплата`);
    }
    
    // Fallback to brand defaults
    const brand = product.brand?.toLowerCase() as keyof typeof PREPAYMENT_TERMS | undefined;
    if (brand && PREPAYMENT_TERMS[brand]) {
      return PREPAYMENT_TERMS[brand].description;
    }
    
    return 'Передоплата за домовленістю';
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission (replace with actual API call)
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setSubmitSuccess(true);

    // Reset after 3 seconds
    setTimeout(() => {
      setSubmitSuccess(false);
      setFormData({ name: '', phone: '', preferredTime: '' });
    }, 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const ContactContent = () => (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <MetallicText variant="gold" as="h3" className={styles.title}>
          Замовлення з консультацією
        </MetallicText>
        <p className={styles.subtitle}>
          Наші експерти допоможуть підібрати ідеальний варіант для ваших потреб
        </p>
      </div>

      {/* Key Messages */}
      <div className={styles.messages}>
        <div className={styles.messageCard}>
          <Icon name="shieldCheck" size="md" className={styles.messageIcon} />
          <div className={styles.messageContent}>
            <strong>Ціна для Вас остаточна</strong>
            <span>— без прихованих витрат</span>
          </div>
        </div>

        <div className={styles.messageCard}>
          <Icon name="cart" size="md" className={styles.messageIcon} />
          <div className={styles.messageContent}>
            <strong>Умови оплати:</strong>
            <span>{getPaymentTerms()}</span>
          </div>
        </div>

        {estimatedDeliveryDays && (
          <div className={styles.messageCard}>
            <Icon name="truck" size="md" className={styles.messageIcon} />
            <div className={styles.messageContent}>
              <strong>Орієнтовна доставка:</strong>
              <span>
                {estimatedDeliveryDays.min === estimatedDeliveryDays.max 
                  ? `${estimatedDeliveryDays.min} дн.`
                  : `${estimatedDeliveryDays.min}-${estimatedDeliveryDays.max} дн.`}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Contact Options */}
      <div className={styles.contactOptions}>
        <h4 className={styles.contactTitle}>Зв'яжіться з нами:</h4>
        
        <div className={styles.contactButtons}>
          {/* Phone */}
          <CallButton 
            phoneNumber={siteConfig.contact.phone}
            buttonText="Телефонувати"
            className={styles.contactButton}
          />

          {/* Telegram */}
          {siteConfig.contact.telegram?.personal && (
            <a 
              href={`https://t.me/${siteConfig.contact.telegram.personal.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactButton}
            >
              <MetallicButton variant="blue" size="md" className="w-full">
                <Icon name="telegram" size="sm" className="me-2" />
                Telegram
              </MetallicButton>
            </a>
          )}

          {/* Email */}
          <a 
            href={`mailto:${siteConfig.contact.email}?subject=Консультація: ${product.name}`}
            className={styles.contactButton}
          >
            <MetallicButton variant="platinum" size="md" className="w-full">
              <Icon name="mail" size="sm" className="me-2" />
              Email
            </MetallicButton>
          </a>
        </div>
      </div>

      {/* Quick Contact Form */}
      {showContactForm && (
        <div className={styles.formContainer}>
          <div className={styles.formDivider}>
            <span>або залиште заявку</span>
          </div>

          <form onSubmit={handleFormSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="consultation-name" className={styles.formLabel}>
                Ім'я
              </label>
              <input
                id="consultation-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className={styles.formInput}
                placeholder="Ваше ім'я"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="consultation-phone" className={styles.formLabel}>
                Телефон
              </label>
              <input
                id="consultation-phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className={styles.formInput}
                placeholder="+380 (XX) XXX-XX-XX"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="consultation-time" className={styles.formLabel}>
                Зручний час для дзвінка
              </label>
              <select
                id="consultation-time"
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleInputChange}
                className={styles.formSelect}
              >
                <option value="">Будь-який час</option>
                <option value="morning">Ранок (9:00-12:00)</option>
                <option value="afternoon">День (12:00-15:00)</option>
                <option value="evening">Вечір (15:00-18:00)</option>
                <option value="late">Пізній вечір (18:00-21:00)</option>
              </select>
            </div>

            <MetallicButton
              type="submit"
              variant="gold"
              size="md"
              disabled={isSubmitting || submitSuccess}
              className={`w-full ${styles.submitButton}`}
            >
              {submitSuccess ? (
                <>
                  <Icon name="check" size="sm" className="me-2" />
                  Заявку відправлено!
                </>
              ) : isSubmitting ? (
                'Надсилаємо...'
              ) : (
                <>
                  <Icon name="phone" size="sm" className="me-2" />
                  Замовити дзвінок
                </>
              )}
            </MetallicButton>

            {submitSuccess && (
              <p className={styles.successMessage}>
                Дякуємо! Ми зателефонуємо вам найближчим часом.
              </p>
            )}
          </form>
        </div>
      )}
    </div>
  );

  // Dialog mode - show button that opens dialog
  if (mode === 'dialog') {
    return (
      <>
        <MetallicButton
          variant="gold"
          size="lg"
          onClick={() => dialogRef.current?.open()}
          className={className}
        >
          <Icon name="phone" size="md" className="me-2" />
          {ctaButtonText}
        </MetallicButton>

        <Dialog ref={dialogRef} size="lg" position="center">
          <ContactContent />
        </Dialog>
      </>
    );
  }

  // Inline mode - show directly
  return (
    <div className={className}>
      <ContactContent />
    </div>
  );
}

export default ConsultationCTA;
