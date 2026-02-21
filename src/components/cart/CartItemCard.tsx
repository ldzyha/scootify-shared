'use client';

import { CartItem } from '@scootify/shared/types/cart';
import { ProductImage } from '../ProductImage';
import { Price } from '../Price';
import { QuantitySelector } from '../QuantitySelector';
import { Icon } from '../Icon';
import styles from './CartItemCard.module.css';

/**
 * CartItemCard - Individual cart item display component
 * 
 * Displays a cart item with:
 * - Product image, name, variant/color
 * - Quantity selector
 * - Unit price and total price with dual currency
 * - Remove button
 * - Support for consultation products (shows "Consultation request" instead of price)
 * 
 * @example
 * ```tsx
 * <CartItemCard
 *   item={cartItem}
 *   onUpdateQuantity={(quantity) => updateQuantity(item.productId, quantity)}
 *   onRemove={() => removeItem(item.productId)}
 *   isConsultation={false}
 * />
 * ```
 */

export interface CartItemCardProps {
  /** Cart item data */
  item: CartItem;
  /** Callback when quantity is updated */
  onUpdateQuantity: (quantity: number) => void;
  /** Callback when item is removed */
  onRemove: () => void;
  /** Whether this is a consultation product (no price) */
  isConsultation?: boolean;
  /** Optional custom formatters for Price component */
  formatPrimary?: (cents: number) => { amount: number; formatted: string; currency: string; symbol: string };
  formatSecondary?: (cents: number) => { amount: number; formatted: string; currency: string; symbol: string };
}

export function CartItemCard({
  item,
  onUpdateQuantity,
  onRemove,
  isConsultation = false,
  formatPrimary,
  formatSecondary,
}: CartItemCardProps) {
  const totalPriceCents = item.priceUsdCents * item.quantity;

  const handleIncrease = () => {
    if (!item.maxQuantity || item.quantity < item.maxQuantity) {
      onUpdateQuantity(item.quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.quantity - 1);
    }
  };

  return (
    <article className={styles.card}>
      {/* Product Image */}
      <div className={styles.imageWrapper}>
        <ProductImage
          src={item.image}
          alt={item.name}
          aspectRatio="square"
          className={styles.image}
          sizes="(max-width: 640px) 100px, 120px"
        />
      </div>

      {/* Product Details */}
      <div className={styles.details}>
        <div className={styles.header}>
          <h3 className={styles.name}>{item.name}</h3>
          <button
            type="button"
            onClick={onRemove}
            className={styles.removeButton}
            aria-label={`Видалити ${item.name} з кошика`}
          >
            <Icon name="trash" size="sm" />
          </button>
        </div>

        {/* Variant/SKU info */}
        {item.variantId && (
          <p className={styles.variant}>Варіант: {item.variantId}</p>
        )}
        <p className={styles.sku}>SKU: {item.sku}</p>

        {/* Stock status */}
        {item.inStock === false && (
          <p className={styles.outOfStock}>Немає в наявності</p>
        )}

        {/* Quantity and Price Row */}
        <div className={styles.actions}>
          {/* Quantity Selector */}
          <div className={styles.quantityWrapper}>
            <QuantitySelector
              quantity={item.quantity}
              maxQuantity={item.maxQuantity}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
              disabled={item.inStock === false}
            />
          </div>

          {/* Price Display */}
          <div className={styles.priceWrapper}>
            {isConsultation ? (
              <span className={styles.consultationLabel}>Запит на консультацію</span>
            ) : (
              <div className={styles.priceContainer}>
                {/* Unit Price */}
                <div className={styles.unitPrice}>
                  <span className={styles.priceLabel}>Ціна:</span>
                  <Price
                    primaryCents={item.priceUsdCents}
                    secondaryCents={item.priceUsdCents}
                    size="sm"
                    formatPrimary={formatPrimary}
                    formatSecondary={formatSecondary}
                  />
                </div>

                {/* Total Price (only if quantity > 1) */}
                {item.quantity > 1 && (
                  <div className={styles.totalPrice}>
                    <span className={styles.priceLabel}>Всього:</span>
                    <Price
                      primaryCents={totalPriceCents}
                      secondaryCents={totalPriceCents}
                      size="md"
                      metallicVariant="gold"
                      formatPrimary={formatPrimary}
                      formatSecondary={formatSecondary}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default CartItemCard;
