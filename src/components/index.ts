// ============================================
// COMPONENTS BARREL EXPORT
// All components created in Waves 2-5
// Alphabetical organization by category
// Named exports (components + types)
// ============================================

// ============================================
// SIMPLE COMPONENTS
// ============================================

// CallButton - Phone call button with international format
export { CallButton, type CallButtonProps } from './CallButton';

// Icon - SVG icon component with brand gradients
export {
  Icon,
  registerCustomIcons,
  getAvailableIcons,
  iconNames,
  type IconProps,
  type IconName,
  type BrandGradients,
} from './Icon';

// MetallicButton - Button with metallic gradient effects
export { MetallicButton, type MetallicButtonProps } from './MetallicButton';

// MetallicCard - Card container with metallic styling
export { MetallicCard, type MetallicCardProps } from './MetallicCard';

// MetallicLink - Link/anchor with metallic gradient effects (mirrors MetallicButton)
export { MetallicLink, type MetallicLinkProps } from './MetallicLink';

// MetallicText - Text with metallic gradient effects
export { MetallicText, type MetallicTextProps } from './MetallicText';

// PhoneInput - Phone number input with validation
export { PhoneInput, type PhoneInputProps } from './PhoneInput';

// Price - Price display with currency formatting
export {
  Price,
  PriceInline,
  PriceCompact,
  type PriceProps,
  type PriceFormatter,
} from './Price';

// QuantitySelector - Increment/decrement quantity input
export { QuantitySelector } from './QuantitySelector';

// VideoEmbed - YouTube/Vimeo video embed with lazy loading
export { VideoEmbed, type VideoEmbedProps, type VideoEmbedHandle } from './VideoEmbed';

// ============================================
// COMPLEX COMPONENTS
// ============================================

// ColorSwatches - Color selection swatches
export { ColorSwatches, type ColorSwatchesProps } from './ColorSwatches';

// CookieBanner - Cookie consent banner
export { CookieBanner, type CookieBannerProps } from './CookieBanner';

// Dialog - Modal dialog with animations and positions
export {
  Dialog,
  DialogProvider,
  useDialog,
  type DialogProps,
  type DialogHandle,
  type DialogPosition,
  type DialogOptions,
  type DialogContextValue,
} from './Dialog';

// FloatingContactButton - Floating contact button with channels
export {
  FloatingContactButton,
  type FloatingContactButtonProps,
  type ContactChannel,
} from './FloatingContactButton';

// Picture - Responsive image with srcset
export { Picture } from './Picture';

// ProductImage - Product image with zoom and variants
export { ProductImage } from './ProductImage';

// Toast - Toast notification component
export { Toast, type ToastProps } from './Toast';

// VariantSelector - Product variant selector (size, color, etc.)
export {
  VariantSelector,
  productVariantsToOptions,
  type VariantSelectorProps,
  type VariantOption,
} from './VariantSelector';

// CallbackRequest - Phone callback form with Ukrainian phone validation
export { CallbackRequest, type CallbackRequestProps } from './CallbackRequest';

// ============================================
// COMPOSITE COMPONENTS
// ============================================

// Carousel - Image/content carousel with effects
export {
  Carousel,
  CarouselSlide,
  type CarouselProps,
  type CarouselSlideProps,
  type CarouselEffect,
  type CarouselAlign,
} from './Carousel';

// CompareTable - Product comparison table
export { default as CompareTable } from './CompareTable';

// ConsultationCTA - Call-to-action for consultations
export { ConsultationCTA, type ConsultationCTAProps } from './ConsultationCTA';

// ProductConsultationCTA - One-click callback form for product pages
export { ProductConsultationCTA, type ProductConsultationCTAProps } from './ProductConsultationCTA';

// ConsultationDialog - Dialog for consultation requests
export { ConsultationDialog, type ConsultationDialogProps, type ConsultationFormData } from './ConsultationDialog';

// JsonLd - Structured data / JSON-LD schema
export {
  JsonLd,
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateWebPageSchema,
  generateBreadcrumbSchema,
  generateProductSchema,
  type WebPageSchemaOptions,
  type BreadcrumbItem,
} from './JsonLd';

// ProductGrid - Grid of product tiles
export { ProductGrid, type ProductGridProps, type Product } from './ProductGrid';

// ProductTerms - Product terms accordion (delivery, payment, warranty, return)
export { ProductTerms, type ProductTermsProps } from './ProductTerms';

// ProductTile - Individual product card
export { ProductTile, type ProductTileProps, type ProductTileVariant } from './ProductTile';

// SeoHead - SEO meta tags component
export { SeoHead, type SeoHeadProps } from './SeoHead';

// SmartSearch - Search with autocomplete and suggestions
export {
  SmartSearch,
  type SmartSearchProps,
  type SearchResult,
  type SearchCategory,
  type DropdownPosition,
  type SmartSearchVariant,
} from './SmartSearch';

// ============================================
// SPECS COMPONENTS
// ============================================

// All specs components and types
export {
  BatterySpecs,
  MotorSpecs,
  ShippingSpecs,
  SpecInfoButton,
  SpecsHighlight,
  SpecsTable,
  createSpecsFromProduct,
  type BatterySpecsProps,
  type MotorSpecsProps,
  type ShippingSpecsProps,
  type SpecInfoButtonProps,
  type SpecsHighlightProps,
  type SpecsTableProps,
  type SpecRow,
  type SpecSection,
  type HighlightSpec,
} from './specs';

// ============================================
// LAYOUT COMPONENTS
// ============================================

// ContactDialog - Contact information dialog
export { ContactDialog, type ContactDialogProps } from './layout/ContactDialog';

// Footer - Site footer
export {
  Footer,
  type FooterProps,
  type FooterNavItem,
  type FooterNavColumn,
  type FooterContactItem,
  type FooterSocialLink,
  type FooterFeature,
  type FooterLegalLink,
} from './layout/Footer';

// Header - Site header with navigation and search
export { Header, type HeaderProps } from './layout/Header';

// PageWrapper - Page layout wrapper
export { PageWrapper, type PageWrapperProps } from './layout/PageWrapper';

// StickyCartPanel - Floating vertical cart preview
export { StickyCartPanel, type StickyCartPanelProps, type StickyCartItem } from './StickyCartPanel';

// ============================================
// CART COMPONENTS
// ============================================

// CartItemCard - Individual cart item card
export { CartItemCard, type CartItemCardProps } from './cart/CartItemCard';

// CartSummary - Cart totals and checkout button
export { CartSummary, type CartSummaryProps } from './cart/CartSummary';

// EmptyCart - Empty cart state
export { EmptyCart, type EmptyCartProps } from './cart/EmptyCart';

// ============================================
// CHECKOUT COMPONENTS
// ============================================

// CustomerInfoForm - Customer information form
export { CustomerInfoForm, type CustomerInfoFormProps } from './checkout/CustomerInfoForm';

// DeliveryForm - Delivery address form with Nova Poshta
export { DeliveryForm, type DeliveryFormProps } from './checkout/DeliveryForm';

// ============================================
// LEGAL PAGE COMPONENT
// ============================================

// LegalPage - Legal pages (terms, privacy, etc.)
export { LegalPage, type LegalPageProps, type LegalPageKey } from './LegalPage';

// ============================================
// SECTION COMPONENTS (Product page sections)
// ============================================

export {
  BreadcrumbNav,
  KeySpecsBadges,
  CTAButtons,
  GuaranteeBadges,
  DescriptionRenderer,
  VideoSection,
  SimilarProductsGrid,
  parseLinks,
  parseBoldAndLinks,
  type BreadcrumbNavProps,
  type BreadcrumbNavItem,
  type KeySpecsBadgesProps,
  type SpecBadge,
  type CTAButtonsProps,
  type CTAButton,
  type GuaranteeBadgesProps,
  type GuaranteeBadge,
  type DescriptionRendererProps,
  type VideoSectionProps,
  type SimilarProductsGridProps,
} from './sections';

// ============================================
// UTILITIES
// ============================================

// Carousel engine utilities
export * from './carousel-engine';
