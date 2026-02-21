/**
 * API endpoint configuration builder
 */

export interface ApiEndpoints {
  callback: string;
  orders: string;
  novaPoshta: string;
  exchangeRate: string;
  products?: string;
  productStats?: string;
  trackClick?: string;
}

/**
 * Build API endpoints from base URL
 * 
 * @param baseUrl - Base URL (empty string for relative URLs, or full domain)
 * @param region - Firebase region (e.g., 'europe-central2')
 */
export function buildApiEndpoints(
  baseUrl: string = '',
  region: string = 'europe-central2'
): ApiEndpoints {
  const base = baseUrl || '/api';
  
  return {
    callback: `${base}/callback`,
    orders: `${base}/orders`,
    novaPoshta: `${base}/nova-poshta`,
    exchangeRate: `${base}/exchange-rate`,
    products: `${base}/products`,
    productStats: `${base}/product-stats`,
    trackClick: `${base}/track-click`,
  };
}

/**
 * Get Firebase Cloud Functions base URL
 */
export function getFirebaseFunctionsUrl(
  projectId: string,
  region: string = 'europe-central2'
): string {
  return `https://${region}-${projectId}.cloudfunctions.net`;
}

/**
 * Get Firebase Cloud Run base URL (for v2 functions)
 */
export function getFirebaseCloudRunUrl(
  functionName: string,
  region: string = 'europe-central2'
): string {
  return `https://${functionName}-${region}.a.run.app`;
}
