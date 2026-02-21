// ============================================
// HOOKS BARREL EXPORT
// All hooks created in Waves 2-3
// Alphabetical organization
// Named exports (hooks + types)
// ============================================

// ============================================
// CHECKOUT & PERSISTENCE
// ============================================

// useCheckoutPersistence - Persist checkout form data to localStorage
export {
  useCheckoutPersistence,
  type UseCheckoutPersistenceOptions,
  type UseCheckoutPersistenceResult,
} from './useCheckoutPersistence';

// ============================================
// UI & INTERACTION HOOKS
// ============================================

// useCookieConsent - Cookie consent state management
export { useCookieConsent } from './useCookieConsent';

// useDialogAnimation - Dialog open/close animation control
export { useDialogAnimation, useControlledDialogAnimation } from './useDialogAnimation';

// useHeaderScroll - Header scroll visibility and state
export { useHeaderScroll, type UseHeaderScrollReturn } from './useHeaderScroll';

// ============================================
// DATA & API HOOKS
// ============================================

// useExchangeRate - Currency exchange rate fetching
export { useExchangeRate } from './useExchangeRate';

// useNovaPoshta - Nova Poshta API integration hooks (5 sub-hooks)
export {
  // Cities search
  useNovaPoshtaCities,
  type UseNovaPoshtaCitiesResult,
  
  // Warehouses (post offices)
  useNovaPoshtaWarehouses,
  type UseNovaPoshtaWarehousesResult,
  
  // Streets search
  useNovaPoshtaStreets,
  type UseNovaPoshtaStreetsResult,
  
  // Delivery price calculation
  useNovaPoshtaDeliveryPrice,
  type UseNovaPoshtaDeliveryPriceResult,
  
  // Waybill creation
  useCreateWaybill,
  type UseCreateWaybillResult,
  
  // Shared config type
  type NovaPoshtaHookConfig,
} from './useNovaPoshta';

// useSearch - Generic search with debouncing and state management
export {
  useSearch,
  type UseSearchOptions,
  type UseSearchReturn,
} from './useSearch';
