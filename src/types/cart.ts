/**
 * Cart types and interfaces
 * Shared across different cart implementations (Context, Zustand, etc.)
 */

export interface CartItem {
  productId: string;
  variantId?: string; // optional - scootify uses this, hiley doesn't
  name: string;
  slug: string;
  sku: string;
  image: string;
  priceUsdCents: number; // standard currency
  quantity: number;
  maxQuantity?: number;
  weight?: number; // in kg
  inStock?: boolean;
  categorySlug?: string; // scootify-specific
}

/**
 * Cart operations interface
 * Implement this with your preferred state management solution
 */
export interface CartOperations {
  items: CartItem[];
  itemCount: number;
  
  addItem(item: Omit<CartItem, 'quantity'>, quantity?: number): void;
  removeItem(productId: string, variantId?: string): void;
  updateQuantity(productId: string, quantity: number, variantId?: string): void;
  clearCart(): void;
  
  // Optional operations
  updateItemVariant?(productId: string, oldVariantId: string, newVariantId: string): void;
  getItem?(productId: string, variantId?: string): CartItem | undefined;
  hasItem?(productId: string, variantId?: string): boolean;
}

/**
 * Cart store configuration
 */
export interface CartConfig {
  persistKey: string; // localStorage key
  persistVersion?: number; // for migration support
  maxQuantityPerItem?: number;
}

/**
 * Cart summary calculations
 */
export interface CartSummary {
  itemCount: number;
  subtotalUsdCents: number;
  totalWeight?: number; // in kg
  hasScooter?: boolean; // for conditional prepayment notices
}
