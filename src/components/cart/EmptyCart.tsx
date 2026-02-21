'use client';

import { MetallicButton } from '../MetallicButton';
import { Icon } from '../Icon';
import styles from './EmptyCart.module.css';

/**
 * EmptyCart - Empty cart state component
 * 
 * Displays when cart has no items with:
 * - Icon (shopping cart/bag)
 * - Empty cart message
 * - CTA button to continue shopping
 * - Optional: Recently viewed products
 * - Optional: Popular products suggestions
 * 
 * @example
 * ```tsx
 * <EmptyCart
 *   onContinueShopping={() => router.push('/products')}
 *   title="Ваш кошик порожній"
 *   description="Додайте товари до кошика, щоб оформити замовлення"
 *   buttonText="Перейти до покупок"
 * />
 * ```
 */

export interface EmptyCartProps {
  /** Callback when CTA button is clicked */
  onContinueShopping: () => void;
  /** Custom title (default: "Ваш кошик порожній") */
  title?: string;
  /** Custom description text */
  description?: string;
  /** Custom button text (default: "Перейти до покупок") */
  buttonText?: string;
  /** Optional: Show recently viewed products section */
  showRecentlyViewed?: boolean;
  /** Optional: Recently viewed products to display */
  recentlyViewedProducts?: Array<{
    id: string;
    name: string;
    image: string;
    slug: string;
  }>;
  /** Optional: Show popular products section */
  showPopularProducts?: boolean;
  /** Optional: Popular products to display */
  popularProducts?: Array<{
    id: string;
    name: string;
    image: string;
    slug: string;
  }>;
  /** Optional: Callback when a product is clicked */
  onProductClick?: (slug: string) => void;
}

export function EmptyCart({
  onContinueShopping,
  title = 'Ваш кошик порожній',
  description = 'Додайте товари до кошика, щоб оформити замовлення',
  buttonText = 'Перейти до покупок',
  showRecentlyViewed = false,
  recentlyViewedProducts = [],
  showPopularProducts = false,
  popularProducts = [],
  onProductClick,
}: EmptyCartProps) {
  const handleProductClick = (slug: string) => {
    if (onProductClick) {
      onProductClick(slug);
    }
  };

  return (
    <div className={styles.container}>
      {/* Empty State */}
      <div className={styles.emptyState}>
        {/* Icon */}
        <div className={styles.iconWrapper}>
          <Icon name="cart" size={80} metallic="platinum" className={styles.icon} />
        </div>

        {/* Title */}
        <h2 className={styles.title}>{title}</h2>

        {/* Description */}
        {description && <p className={styles.description}>{description}</p>}

        {/* CTA Button */}
        <MetallicButton
          variant="blue"
          size="lg"
          onClick={onContinueShopping}
          className={styles.ctaButton}
        >
          <Icon name="chevronLeft" size="sm" />
          <span>{buttonText}</span>
        </MetallicButton>
      </div>

      {/* Recently Viewed Products */}
      {showRecentlyViewed && recentlyViewedProducts.length > 0 && (
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>
            <Icon name="clock" size="sm" metallic="gold" />
            <span>Нещодавно переглянуті</span>
          </h3>
          <div className={styles.productGrid}>
            {recentlyViewedProducts.map((product) => (
              <button
                key={product.id}
                onClick={() => handleProductClick(product.slug)}
                className={styles.productCard}
                aria-label={`Переглянути ${product.name}`}
              >
                <div className={styles.productImageWrapper}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className={styles.productImage}
                    loading="lazy"
                  />
                </div>
                <p className={styles.productName}>{product.name}</p>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Popular Products */}
      {showPopularProducts && popularProducts.length > 0 && (
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>
            <Icon name="star" size="sm" metallic="gold" />
            <span>Популярні товари</span>
          </h3>
          <div className={styles.productGrid}>
            {popularProducts.map((product) => (
              <button
                key={product.id}
                onClick={() => handleProductClick(product.slug)}
                className={styles.productCard}
                aria-label={`Переглянути ${product.name}`}
              >
                <div className={styles.productImageWrapper}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className={styles.productImage}
                    loading="lazy"
                  />
                </div>
                <p className={styles.productName}>{product.name}</p>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Additional Help Text */}
      <div className={styles.helpText}>
        <p className={styles.helpItem}>
          <Icon name="phone" size="sm" />
          <span>Потрібна допомога? Зв'яжіться з нами</span>
        </p>
        <p className={styles.helpItem}>
          <Icon name="shield" size="sm" />
          <span>Гарантія якості на всі товари</span>
        </p>
      </div>
    </div>
  );
}

export default EmptyCart;
