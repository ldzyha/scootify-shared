'use client';

import React, { useState } from 'react';
import { ProductImage } from '../ProductImage';
import { Price } from '../Price';
import { MetallicButton } from '../MetallicButton';
import { Icon } from '../Icon';
import type { CustomerInfo, DeliveryInfo } from '@scootify/shared/types/checkout';
import styles from './CheckoutOrderSummary.module.css';

/**
 * Cart item for order summary display
 */
export interface CheckoutCartItem {
  /** Unique identifier */
  id: string;
  /** Product name */
  name: string;
  /** Product SKU */
  sku: string;
  /** Variant name (if applicable) */
  variantName?: string;
  /** Quantity */
  quantity: number;
  /** Unit price in UAH cents */
  priceUahCents: number;
  /** Unit price in USD cents */
  priceUsdCents: number;
  /** Product image URL */
  imageUrl?: string;
}

/**
 * Props for CheckoutOrderSummary component
 */
export interface CheckoutOrderSummaryProps {
  /** Cart items to display */
  items: CheckoutCartItem[];
  /** Subtotal in UAH cents */
  subtotalUahCents: number;
  /** Subtotal in USD cents */
  subtotalUsdCents: number;
  /** Delivery cost in UAH (optional) */
  deliveryCostUah?: number;
  /** Total in UAH cents (subtotal + delivery) */
  totalUahCents: number;
  /** Total in USD cents */
  totalUsdCents: number;
  /** Customer information for review */
  customerInfo: CustomerInfo | null;
  /** Delivery information for review */
  deliveryInfo: DeliveryInfo | null;
  /** Prepayment percentage (0-100) */
  prepaymentPercent?: number;
  /** Whether order can be submitted */
  canSubmit: boolean;
  /** Submit handler */
  onSubmit: () => void;
  /** Whether submission is in progress */
  isSubmitting?: boolean;
  /** Additional CSS class */
  className?: string;
}

/**
 * CheckoutOrderSummary - Order review and submission component
 * 
 * Features:
 * - Cart items list with mini view (image, name, quantity, price)
 * - Subtotal, delivery cost, and total calculation
 * - Prepayment amount highlighted
 * - Customer info review section
 * - Delivery info review section
 * - Terms acceptance checkbox
 * - Place order button with loading state
 * - Mobile-responsive layout
 * 
 * @example
 * ```tsx
 * const handleSubmit = async () => {
 *   // Submit order logic
 * };
 * 
 * <CheckoutOrderSummary
 *   items={cartItems}
 *   subtotalUahCents={415000}
 *   subtotalUsdCents={9999}
 *   deliveryCostUah={150}
 *   totalUahCents={430000}
 *   totalUsdCents={10350}
 *   customerInfo={customer}
 *   deliveryInfo={delivery}
 *   prepaymentPercent={50}
 *   canSubmit={isValid}
 *   onSubmit={handleSubmit}
 * />
 * ```
 */
export function CheckoutOrderSummary({
  items,
  subtotalUahCents,
  subtotalUsdCents,
  deliveryCostUah,
  totalUahCents,
  totalUsdCents,
  customerInfo,
  deliveryInfo,
  prepaymentPercent = 0,
  canSubmit,
  onSubmit,
  isSubmitting = false,
  className = '',
}: CheckoutOrderSummaryProps) {
  const [termsAccepted, setTermsAccepted] = useState(false);

  const prepaymentUahCents = Math.round(totalUahCents * (prepaymentPercent / 100));
  const prepaymentUsdCents = Math.round(totalUsdCents * (prepaymentPercent / 100));
  const codUahCents = totalUahCents - prepaymentUahCents;

  const handleSubmit = () => {
    if (!canSubmit || !termsAccepted || isSubmitting) return;
    onSubmit();
  };

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>Ваше замовлення</h2>
      </div>

      {/* Cart Items */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Товари ({items.length})</h3>
        <div className={styles.itemsList}>
          {items.map((item) => (
            <div key={item.id} className={styles.item}>
              {item.imageUrl && (
                <div className={styles.itemImage}>
                  <ProductImage
                    src={item.imageUrl}
                    alt={item.name}
                    aspectRatio="square"
                    sizes="80px"
                  />
                </div>
              )}
              <div className={styles.itemDetails}>
                <h4 className={styles.itemName}>{item.name}</h4>
                {item.variantName && (
                  <p className={styles.itemVariant}>{item.variantName}</p>
                )}
                <p className={styles.itemSku}>Артикул: {item.sku}</p>
              </div>
              <div className={styles.itemQuantity}>
                ×{item.quantity}
              </div>
              <div className={styles.itemPrice}>
                <Price
                  primaryCents={item.priceUahCents * item.quantity}
                  secondaryCents={item.priceUsdCents * item.quantity}
                  size="sm"
                  metallicVariant="gold"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className={styles.section}>
        <div className={styles.costRow}>
          <span className={styles.costLabel}>Вартість товарів:</span>
          <span className={styles.costValue}>
            {(subtotalUahCents / 100).toFixed(2)} ₴
          </span>
        </div>
        {deliveryCostUah !== undefined && (
          <div className={styles.costRow}>
            <span className={styles.costLabel}>Доставка:</span>
            <span className={styles.costValue}>
              {deliveryCostUah.toFixed(2)} ₴
            </span>
          </div>
        )}
        <div className={styles.divider} />
        <div className={`${styles.costRow} ${styles.costRowTotal}`}>
          <span className={styles.costLabel}>Всього:</span>
          <div className={styles.totalPrice}>
            <Price
              primaryCents={totalUahCents}
              secondaryCents={totalUsdCents}
              size="md"
              metallicVariant="gold"
            />
          </div>
        </div>
        {prepaymentPercent > 0 && (
          <>
            <div className={styles.divider} />
            <div className={styles.costRow}>
              <span className={styles.costLabel}>
                Передплата ({prepaymentPercent}%):
              </span>
              <span className={`${styles.costValue} ${styles.prepaymentHighlight}`}>
                {(prepaymentUahCents / 100).toFixed(2)} ₴
              </span>
            </div>
            {codUahCents > 0 && (
              <div className={styles.costRow}>
                <span className={styles.costLabel}>
                  При отриманні:
                </span>
                <span className={styles.costValue}>
                  {(codUahCents / 100).toFixed(2)} ₴
                </span>
              </div>
            )}
          </>
        )}
      </div>

      {/* Customer Info Review */}
      {customerInfo && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Контактні дані</h3>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <Icon name="user" size="sm" className={styles.infoIcon} />
              <span>{customerInfo.name}</span>
            </div>
            <div className={styles.infoItem}>
              <Icon name="phone" size="sm" className={styles.infoIcon} />
              <span>{customerInfo.phone}</span>
            </div>
            {customerInfo.email && (
              <div className={styles.infoItem}>
                <Icon name="mail" size="sm" className={styles.infoIcon} />
                <span>{customerInfo.email}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Delivery Info Review */}
      {deliveryInfo && deliveryInfo.city && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Доставка</h3>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <Icon 
                name={deliveryInfo.method === 'nova-poshta-branch' ? 'package' : 'truck'} 
                size="sm" 
                className={styles.infoIcon} 
              />
              <span>
                {deliveryInfo.method === 'nova-poshta-branch' 
                  ? 'Відділення Нової Пошти' 
                  : "Кур'єр Нової Пошти"}
              </span>
            </div>
            <div className={styles.infoItem}>
              <Icon name="mapPin" size="sm" className={styles.infoIcon} />
              <span>{deliveryInfo.city.name}</span>
            </div>
            {deliveryInfo.method === 'nova-poshta-branch' && deliveryInfo.warehouse && (
              <div className={styles.infoItem}>
                <Icon name="package" size="sm" className={styles.infoIcon} />
                <span>{deliveryInfo.warehouse.name || `Відділення №${deliveryInfo.warehouse.number}`}</span>
              </div>
            )}
            {deliveryInfo.method === 'nova-poshta-courier' && deliveryInfo.street && (
              <>
                <div className={styles.infoItem}>
                  <Icon name="home" size="sm" className={styles.infoIcon} />
                  <span>
                    {deliveryInfo.street.name}, {deliveryInfo.buildingNumber}
                    {deliveryInfo.apartmentNumber && `, кв. ${deliveryInfo.apartmentNumber}`}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Terms and Submit */}
      <div className={styles.section}>
        <label className={styles.termsLabel}>
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className={styles.termsCheckbox}
          />
          <span className={styles.termsText}>
            Я погоджуюсь з{' '}
            <a href="/terms" target="_blank" rel="noopener noreferrer" className={styles.termsLink}>
              умовами користування
            </a>
            {' '}та{' '}
            <a href="/privacy" target="_blank" rel="noopener noreferrer" className={styles.termsLink}>
              політикою конфіденційності
            </a>
          </span>
        </label>

        <MetallicButton
          variant="blue"
          size="lg"
          onClick={handleSubmit}
          disabled={!canSubmit || !termsAccepted || isSubmitting}
          className={styles.submitButton}
        >
          {isSubmitting ? (
            <>
              <Icon name="loader" size="sm" className={styles.spinner} />
              <span>Оформлення...</span>
            </>
          ) : (
            <>
              <Icon name="check" size="sm" />
              <span>Оформити замовлення</span>
            </>
          )}
        </MetallicButton>
      </div>
    </div>
  );
}

export default CheckoutOrderSummary;
