'use client';

import { Icon } from './Icon';
import styles from './QuantitySelector.module.css';

/**
 * QuantitySelector - A simple +/- control for adjusting item quantities
 * 
 * @example
 * ```tsx
 * <QuantitySelector
 *   quantity={2}
 *   maxQuantity={10}
 *   onIncrease={() => setQuantity(q => q + 1)}
 *   onDecrease={() => setQuantity(q => q - 1)}
 * />
 * ```
 */

interface QuantitySelectorProps {
  /** Current quantity value */
  quantity: number;
  /** Maximum allowed quantity (optional) */
  maxQuantity?: number;
  /** Callback when increase button is clicked */
  onIncrease: () => void;
  /** Callback when decrease button is clicked */
  onDecrease: () => void;
  /** Disables all controls */
  disabled?: boolean;
}

export function QuantitySelector({
  quantity,
  maxQuantity,
  onIncrease,
  onDecrease,
  disabled = false,
}: QuantitySelectorProps) {
  const canDecrease = quantity > 1 && !disabled;
  const canIncrease = (!maxQuantity || quantity < maxQuantity) && !disabled;

  return (
    <div className={styles.container}>
      <button
        type="button"
        className={styles.button}
        onClick={onDecrease}
        disabled={!canDecrease}
        aria-label="Зменшити кількість"
      >
        <Icon name="minus" size="sm" />
      </button>
      <span className={styles.quantity}>{quantity}</span>
      <button
        type="button"
        className={styles.button}
        onClick={onIncrease}
        disabled={!canIncrease}
        aria-label="Збільшити кількість"
      >
        <Icon name="plus" size="sm" />
      </button>
    </div>
  );
}

export default QuantitySelector;
