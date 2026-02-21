/**
 * Checkout and order types
 */

export interface CustomerInfo {
  name: string;
  phone: string;
  email?: string;
}

export interface DeliveryCity {
  ref: string;
  name: string;
  region?: string;
}

export interface DeliveryWarehouse {
  ref: string;
  name?: string;
  number?: string;
}

export interface DeliveryStreet {
  ref: string;
  name: string;
}

export interface DeliveryInfo {
  method: 'nova-poshta-branch' | 'nova-poshta-courier';
  city: DeliveryCity | null;
  warehouse?: DeliveryWarehouse | null;
  street?: DeliveryStreet | null;
  buildingNumber?: string;
  apartmentNumber?: string;
}

export interface OrderData {
  orderNumber: string;
  customer: CustomerInfo;
  delivery: DeliveryInfo;
  items: Array<{
    productId: string;
    variantId?: string;
    name: string;
    sku: string;
    quantity: number;
    priceUsdCents: number;
  }>;
  subtotalUsdCents: number;
  deliveryCostUah?: number;
  totalUsdCents: number;
  createdAt: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
}

export interface ValidationErrors {
  name?: string;
  phone?: string;
  email?: string;
  city?: string;
  warehouse?: string;
  address?: string;
  street?: string;
  buildingNumber?: string;
  apartmentNumber?: string;
}

export interface CheckoutFormData {
  customer: CustomerInfo;
  delivery: DeliveryInfo;
}
