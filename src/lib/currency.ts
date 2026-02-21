/**
 * Currency System for Ukrainian E-commerce
 *
 * Base currency: USD (all prices stored in cents)
 * Display currency: UAH (primary, accented) + USD (secondary, smaller)
 */

export type CurrencyCode = 'USD' | 'UAH';

export interface ExchangeRates {
  UAH: number; // UAH per 1 USD
  updatedAt: string;
}

export interface FormattedPrice {
  amount: number;
  formatted: string;
  currency: CurrencyCode;
  symbol: string;
}

export interface PriceDisplay {
  primary: FormattedPrice; // UAH - main display
  secondary: FormattedPrice; // USD - smaller
  discount?: {
    percentage: number;
    originalPrimary: FormattedPrice;
    originalSecondary: FormattedPrice;
  };
}

// Currency symbols
const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  USD: '$',
  UAH: '₴',
};

/**
 * Fetch exchange rates from Monobank API
 * Returns USD→UAH rate (uses sell rate for customer-facing prices)
 *
 * API docs: https://api.monobank.ua/docs/
 * Currency codes: USD=840, UAH=980
 */
export async function fetchMonobankRates(): Promise<ExchangeRates> {
  const response = await fetch('https://api.monobank.ua/bank/currency');

  if (!response.ok) {
    throw new Error(`Monobank API error: ${response.status}`);
  }

  const data = await response.json();

  // Find USD (840) → UAH (980) rate
  const usdRate = data.find(
    (r: { currencyCodeA: number; currencyCodeB: number }) =>
      r.currencyCodeA === 840 && r.currencyCodeB === 980
  );

  if (!usdRate) {
    throw new Error('USD/UAH rate not found in Monobank response');
  }

  // Use rateSell for customer prices (what they pay)
  const rate = usdRate.rateSell || usdRate.rateCross || usdRate.rateBuy;

  return {
    UAH: rate,
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Fetch exchange rates from National Bank of Ukraine API
 * Returns official NBU rate (middle rate, updated daily)
 *
 * API docs: https://bank.gov.ua/ua/open-data/api-dev
 */
export async function fetchNbuRates(): Promise<ExchangeRates> {
  const response = await fetch(
    'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=USD&json'
  );

  if (!response.ok) {
    throw new Error(`NBU API error: ${response.status}`);
  }

  const data = await response.json();

  if (!data || !data[0] || !data[0].rate) {
    throw new Error('Invalid NBU API response');
  }

  return {
    UAH: data[0].rate,
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Fetch exchange rate from Firebase Cloud Function
 * This returns the cached rate that's updated daily
 *
 * @param functionUrl - URL of the getExchangeRate Cloud Function
 */
export async function fetchExchangeRateFromFirestore(
  functionUrl: string
): Promise<ExchangeRates> {
  const response = await fetch(functionUrl);

  if (!response.ok) {
    throw new Error(`Failed to fetch exchange rate: ${response.status}`);
  }

  const data = await response.json();

  return {
    UAH: data.USD_UAH,
    updatedAt: data.updatedAt,
  };
}

/**
 * Initialize exchange rates
 * Tries Firestore first (cached), then Monobank, then NBU, then fallback
 *
 * @param options - Configuration options
 */
export async function initExchangeRate(options?: {
  firestoreFunctionUrl?: string;
  fallbackRate?: number;
}): Promise<ExchangeRates> {
  const { firestoreFunctionUrl, fallbackRate = 42.25 } = options || {};

  // Try Firestore first (preferred in production)
  if (firestoreFunctionUrl) {
    try {
      const rates = await fetchExchangeRateFromFirestore(firestoreFunctionUrl);
      setExchangeRates(rates);
      return rates;
    } catch (error) {
      console.warn('[currency] Firestore rate fetch failed:', error);
    }
  }

  // Try Monobank
  try {
    const rates = await fetchMonobankRates();
    setExchangeRates(rates);
    return rates;
  } catch (error) {
    console.warn('[currency] Monobank API failed:', error);
  }

  // Try NBU
  try {
    const rates = await fetchNbuRates();
    setExchangeRates(rates);
    return rates;
  } catch (error) {
    console.warn('[currency] NBU API failed:', error);
  }

  // Use fallback
  console.warn(`[currency] All APIs failed, using fallback rate: ${fallbackRate}`);
  const fallbackRates: ExchangeRates = {
    UAH: fallbackRate,
    updatedAt: new Date().toISOString(),
  };
  setExchangeRates(fallbackRates);
  return fallbackRates;
}

// Current exchange rates (can be updated at runtime)
let currentRates: ExchangeRates = {
  UAH: 42.25,
  updatedAt: new Date().toISOString(),
};

/**
 * Set exchange rates (call this from server or API route)
 */
export function setExchangeRates(rates: ExchangeRates): void {
  currentRates = rates;
}

/**
 * Get current exchange rates
 */
export function getExchangeRates(): ExchangeRates {
  return { ...currentRates };
}

/**
 * Convert cents to units (dollars/hryvnias)
 */
export function centsToUnits(cents: number): number {
  return cents / 100;
}

/**
 * Convert units to cents
 */
export function unitsToCents(units: number): number {
  return Math.round(units * 100);
}

/**
 * Convert USD cents to UAH kopecks
 */
export function usdToUah(usdCents: number, rates = currentRates): number {
  return Math.round(usdCents * rates.UAH);
}

/**
 * Alias for usdToUah (common function name)
 */
export function usdCentsToUAH(usdCents: number, rate?: number): number {
  const rates = rate ? { UAH: rate, updatedAt: '' } : currentRates;
  return Math.round(usdCents * rates.UAH / 100);
}

/**
 * Convert UAH kopecks to USD cents
 */
export function uahToUsd(uahKopecks: number, rates = currentRates): number {
  return Math.round(uahKopecks / rates.UAH);
}

/**
 * Format UAH price
 */
export function formatUAH(uah: number): string {
  return `${new Intl.NumberFormat('uk-UA').format(Math.round(uah))} ₴`;
}

/**
 * Format USD price
 */
export function formatUSD(usd: number): string {
  return `$${new Intl.NumberFormat('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(usd)}`;
}

/**
 * Format a price for display
 *
 * @param cents - Price in smallest unit (cents/kopecks)
 * @param currency - Currency code
 * @param options - Formatting options
 */
export function formatPrice(
  cents: number,
  currency: CurrencyCode,
  options: {
    showDecimals?: boolean;
    locale?: string;
  } = {}
): FormattedPrice {
  const { showDecimals = false, locale = 'uk-UA' } = options;

  const amount = centsToUnits(cents);
  const symbol = CURRENCY_SYMBOLS[currency];

  // Format number with locale
  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  }).format(amount);

  // USD symbol goes before the number
  if (currency === 'USD') {
    return {
      amount,
      formatted: `${symbol}${formatted}`,
      currency,
      symbol,
    };
  }

  return {
    amount,
    formatted: `${formatted} ${symbol}`,
    currency,
    symbol,
  };
}

/**
 * Format price for display with both currencies
 *
 * @param priceUsdCents - Price in USD cents
 * @param originalPriceUsdCents - Original price before discount (optional)
 */
export function formatPriceDisplay(
  priceUsdCents: number,
  originalPriceUsdCents?: number
): PriceDisplay {
  const uahKopecks = usdToUah(priceUsdCents);

  const result: PriceDisplay = {
    primary: formatPrice(uahKopecks, 'UAH'),
    secondary: formatPrice(priceUsdCents, 'USD'),
  };

  // Calculate discount if original price provided
  if (originalPriceUsdCents && originalPriceUsdCents > priceUsdCents) {
    const originalUahKopecks = usdToUah(originalPriceUsdCents);
    const percentage = Math.round(
      ((originalPriceUsdCents - priceUsdCents) / originalPriceUsdCents) * 100
    );

    result.discount = {
      percentage,
      originalPrimary: formatPrice(originalUahKopecks, 'UAH'),
      originalSecondary: formatPrice(originalPriceUsdCents, 'USD'),
    };
  }

  return result;
}

/**
 * Calculate discount percentage
 */
export function calculateDiscount(
  currentCents: number,
  originalCents: number
): number {
  if (originalCents <= currentCents) return 0;
  return Math.round(((originalCents - currentCents) / originalCents) * 100);
}

/**
 * Format discount badge text
 */
export function formatDiscountBadge(percentage: number): string {
  return `-${percentage}%`;
}
