'use client';

import { Price } from '../Price';
import { MetallicButton } from '../MetallicButton';
import { Icon } from '../Icon';
import styles from './CartSummary.module.css';

/**
 * CartSummary - Cart totals sidebar/section component
 * 
 * Displays cart summary with:
 * - Subtotal (all items)
 * - Shipping estimate (if available)
 * - Tax/VAT (if applicable)
 * - Total amount
 * - Dual currency display
 * - Checkout button
 * - Continue shopping link
 * - Optional promo code input
 * 
 * @example
 * ```tsx
 * <CartSummary
 *   subtotalCents={50000}
 *   shippingCents={1500}
 *   taxCents={5000}
 *   totalCents={56500}
 *   onCheckout={() => router.push('/checkout')}
 *   onContinueShopping={() => router.push('/products')}
 *   showPromoCode
 *   onApplyPromo={(code) => applyPromoCode(code)}
 * />
 * ```
 */

export interface CartSummaryProps {
  /** Subtotal in cents (sum of all items) */
  subtotalCents: number;
  /** Shipping cost in cents (optional) */
  shippingCents?: number;
  /** Tax/VAT in cents (optional) */
  taxCents?: number;
  /** Total amount in cents */
  totalCents: number;
  /** Callback when checkout button is clicked */
  onCheckout: () => void;
  /** Callback when continue shopping is clicked */
  onContinueShopping?: () => void;
  /** Whether to show promo code input */
  showPromoCode?: boolean;
  /** Callback when promo code is applied */
  onApplyPromo?: (code: string) => void;
  /** Applied promo code (if any) */
  appliedPromoCode?: string;
  /** Promo discount in cents (if applicable) */
  promoDiscountCents?: number;
  /** Custom checkout button text */
  checkoutButtonText?: string;
  /** Custom continue shopping text */
  continueShoppingText?: string;
  /** Loading state for checkout button */
  isCheckoutLoading?: boolean;
  /** Optional custom formatters for Price component */
  formatPrimary?: (cents: number) => { amount: number; formatted: string; currency: string; symbol: string };
  formatSecondary?: (cents: number) => { amount: number; formatted: string; currency: string; symbol: string };
}

export function CartSummary({
  subtotalCents,
  shippingCents,
  taxCents,
  totalCents,
  onCheckout,
  onContinueShopping,
  showPromoCode = false,
  onApplyPromo,
  appliedPromoCode,
  promoDiscountCents,
  checkoutButtonText = 'Оформити замовлення',
  continueShoppingText = 'Продовжити покупки',
  isCheckoutLoading = false,
  formatPrimary,
  formatSecondary,
}: CartSummaryProps) {
  const handlePromoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const code = formData.get('promoCode') as string;
    if (code && onApplyPromo) {
      onApplyPromo(code.trim());
    }
  };

  return (
    <aside className={styles.summary}>
      <h2 className={styles.title}>Підсумок замовлення</h2>

      {/* Summary Lines */}
      <div className={styles.lines}>
        {/* Subtotal */}
        <div className={styles.line}>
          <span className={styles.label}>Підсумок:</span>
          <Price
            primaryCents={subtotalCents}
            secondaryCents={subtotalCents}
            size="sm"
            formatPrimary={formatPrimary}
            formatSecondary={formatSecondary}
          />
        </div>

        {/* Shipping */}
        {shippingCents !== undefined && (
          <div className={styles.line}>
            <span className={styles.label}>
              Доставка:
              {shippingCents === 0 && (
                <span className={styles.freeShipping}> (безкоштовно)</span>
              )}
            </span>
            {shippingCents > 0 ? (
              <Price
                primaryCents={shippingCents}
                secondaryCents={shippingCents}
                size="sm"
                formatPrimary={formatPrimary}
                formatSecondary={formatSecondary}
              />
            ) : (
              <span className={styles.freeValue}>₴0</span>
            )}
          </div>
        )}

        {/* Tax/VAT */}
        {taxCents !== undefined && taxCents > 0 && (
          <div className={styles.line}>
            <span className={styles.label}>ПДВ:</span>
            <Price
              primaryCents={taxCents}
              secondaryCents={taxCents}
              size="sm"
              formatPrimary={formatPrimary}
              formatSecondary={formatSecondary}
            />
          </div>
        )}

        {/* Promo Discount */}
        {promoDiscountCents !== undefined && promoDiscountCents > 0 && (
          <div className={`${styles.line} ${styles.discountLine}`}>
            <span className={styles.label}>
              Знижка:
              {appliedPromoCode && (
                <span className={styles.promoCode}> ({appliedPromoCode})</span>
              )}
            </span>
            <span className={styles.discountValue}>
              -<Price
                primaryCents={promoDiscountCents}
                secondaryCents={promoDiscountCents}
                size="sm"
                formatPrimary={formatPrimary}
                formatSecondary={formatSecondary}
              />
            </span>
          </div>
        )}

        {/* Total */}
        <div className={`${styles.line} ${styles.totalLine}`}>
          <span className={styles.totalLabel}>Всього:</span>
          <Price
            primaryCents={totalCents}
            secondaryCents={totalCents}
            size="lg"
            metallicVariant="gold"
            formatPrimary={formatPrimary}
            formatSecondary={formatSecondary}
          />
        </div>
      </div>

      {/* Promo Code Input */}
      {showPromoCode && !appliedPromoCode && (
        <form onSubmit={handlePromoSubmit} className={styles.promoForm}>
          <input
            type="text"
            name="promoCode"
            placeholder="Промокод"
            className={styles.promoInput}
            aria-label="Введіть промокод"
          />
          <button type="submit" className={styles.promoButton}>
            Застосувати
          </button>
        </form>
      )}

      {/* Checkout Button */}
      <MetallicButton
        variant="blue"
        size="lg"
        onClick={onCheckout}
        disabled={isCheckoutLoading}
        className={styles.checkoutButton}
        aria-label={checkoutButtonText}
      >
        {isCheckoutLoading ? (
          <span className={styles.loadingText}>Обробка...</span>
        ) : (
          <>
            <Icon name="cart" size="sm" />
            <span>{checkoutButtonText}</span>
          </>
        )}
      </MetallicButton>

      {/* Continue Shopping Link */}
      {onContinueShopping && (
        <button
          type="button"
          onClick={onContinueShopping}
          className={styles.continueButton}
          aria-label={continueShoppingText}
        >
          <Icon name="chevronLeft" size="sm" />
          <span>{continueShoppingText}</span>
        </button>
      )}

      {/* Additional Info */}
      <div className={styles.info}>
        <p className={styles.infoText}>
          <Icon name="shield" size="sm" />
          <span>Безпечна оплата</span>
        </p>
        <p className={styles.infoText}>
          <Icon name="truck" size="sm" />
          <span>Швидка доставка</span>
        </p>
      </div>
    </aside>
  );
}

export default CartSummary;
