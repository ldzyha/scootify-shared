import React from 'react';
import type { SiteConfig } from '../types/site-config';
import Head from 'next/head';

export interface SeoHeadProps {
  // Basic SEO
  title?: string;
  description?: string;
  keywords?: string[];
  
  // URLs and canonicalization
  url?: string;
  canonical?: string;
  
  // Images
  image?: string;
  images?: Array<{
    url: string;
    width?: number;
    height?: number;
    alt?: string;
  }>;
  
  // Page type
  type?: 'website' | 'article' | 'product';
  
  // Article metadata
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string | string[];
    section?: string;
    tags?: string[];
  };
  
  // Product metadata
  product?: {
    price?: number;
    currency?: string;
    availability?: 'in stock' | 'out of stock' | 'preorder' | 'discontinued';
    condition?: 'new' | 'refurbished' | 'used';
    brand?: string;
    sku?: string;
  };
  
  // Social
  twitterHandle?: string;
  twitterCardType?: 'summary' | 'summary_large_image' | 'app' | 'player';
  
  // Indexing
  robots?: string;
  noindex?: boolean;
  nofollow?: boolean;
  
  // Site config
  siteConfig: SiteConfig;
  
  // Additional meta tags
  additionalMeta?: Array<{
    name?: string;
    property?: string;
    content: string;
  }>;
}

/**
 * SeoHead - Comprehensive SEO meta tags component
 * 
 * Generates OpenGraph, Twitter Card, and standard meta tags for optimal SEO.
 * Supports website, article, and product page types with specific metadata.
 * 
 * @example
 * ```tsx
 * <SeoHead
 *   title="HILEY Tiger Premium - Electric Scooter"
 *   description="Premium electric scooter with 100km range"
 *   type="product"
 *   image="https://hiley.com.ua/images/tiger.jpg"
 *   product={{
 *     price: 85000,
 *     currency: 'UAH',
 *     availability: 'in stock',
 *     brand: 'HILEY'
 *   }}
 *   siteConfig={hileyConfig}
 * />
 * ```
 */
export function SeoHead({
  title,
  description,
  keywords,
  url,
  canonical,
  image,
  images,
  type = 'website',
  article,
  product,
  twitterHandle,
  twitterCardType = 'summary_large_image',
  robots,
  noindex = false,
  nofollow = false,
  siteConfig,
  additionalMeta = [],
}: SeoHeadProps) {
  // Build full page title
  const pageTitle = title 
    ? `${title} | ${siteConfig.siteName}`
    : `${siteConfig.siteName}${siteConfig.tagline ? ` - ${siteConfig.tagline}` : ''}`;
  
  // Use provided description or fall back to site description
  const pageDescription = description || siteConfig.description;
  
  // Build canonical URL
  const pageUrl = canonical || url || siteConfig.siteUrl;
  const canonicalUrl = pageUrl.startsWith('http') 
    ? pageUrl 
    : `${siteConfig.siteUrl}${pageUrl}`;
  
  // Build OG image(s)
  const ogImages = images && images.length > 0 
    ? images 
    : image 
    ? [{ url: image }] 
    : siteConfig.logoUrl 
    ? [{ 
        url: `${siteConfig.siteUrl}${siteConfig.logoUrl}`,
        width: siteConfig.logoWidth,
        height: siteConfig.logoHeight,
      }]
    : [];
  
  // Make image URLs absolute
  const absoluteImages = ogImages.map(img => ({
    ...img,
    url: img.url.startsWith('http') ? img.url : `${siteConfig.siteUrl}${img.url}`,
  }));
  
  // Build robots directive
  const robotsDirective = robots || [
    noindex && 'noindex',
    nofollow && 'nofollow',
    !noindex && 'index',
    !nofollow && 'follow',
  ].filter(Boolean).join(', ');
  
  // Product-specific data
  const productData = product ? {
    price: product.price,
    currency: product.currency || siteConfig.defaultCurrency,
    availability: product.availability,
    condition: product.condition || 'new',
    brand: product.brand || siteConfig.brand,
    sku: product.sku,
  } : null;
  
  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="title" content={pageTitle} />
      <meta name="description" content={pageDescription} />
      {keywords && keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Robots */}
      <meta name="robots" content={robotsDirective} />
      
      {/* OpenGraph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title || siteConfig.siteName} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:site_name" content={siteConfig.siteName} />
      <meta property="og:locale" content="uk_UA" />
      
      {/* OG Images */}
      {absoluteImages.map((img, index) => (
        <React.Fragment key={index}>
          <meta property="og:image" content={img.url} />
          {img.width && <meta property="og:image:width" content={String(img.width)} />}
          {img.height && <meta property="og:image:height" content={String(img.height)} />}
          {img.alt && <meta property="og:image:alt" content={img.alt} />}
        </React.Fragment>
      ))}
      
      {/* Article-specific OG tags */}
      {type === 'article' && article && (
        <>
          {article.publishedTime && (
            <meta property="article:published_time" content={article.publishedTime} />
          )}
          {article.modifiedTime && (
            <meta property="article:modified_time" content={article.modifiedTime} />
          )}
          {article.author && (
            Array.isArray(article.author) 
              ? article.author.map((author, i) => (
                  <meta key={i} property="article:author" content={author} />
                ))
              : <meta property="article:author" content={article.author} />
          )}
          {article.section && (
            <meta property="article:section" content={article.section} />
          )}
          {article.tags && article.tags.map((tag, i) => (
            <meta key={i} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Product-specific OG tags */}
      {type === 'product' && productData && (
        <>
          {productData.price !== undefined && (
            <>
              <meta property="product:price:amount" content={String(productData.price)} />
              <meta property="product:price:currency" content={productData.currency} />
            </>
          )}
          {productData.availability && (
            <meta property="product:availability" content={productData.availability} />
          )}
          {productData.condition && (
            <meta property="product:condition" content={productData.condition} />
          )}
          {productData.brand && (
            <meta property="product:brand" content={productData.brand} />
          )}
          {productData.sku && (
            <meta property="product:retailer_item_id" content={productData.sku} />
          )}
        </>
      )}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCardType} />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title || siteConfig.siteName} />
      <meta name="twitter:description" content={pageDescription} />
      {twitterHandle && <meta name="twitter:site" content={twitterHandle} />}
      {twitterHandle && <meta name="twitter:creator" content={twitterHandle} />}
      {absoluteImages[0] && (
        <meta name="twitter:image" content={absoluteImages[0].url} />
      )}
      {absoluteImages[0]?.alt && (
        <meta name="twitter:image:alt" content={absoluteImages[0].alt} />
      )}
      
      {/* Additional contact/business meta */}
      {siteConfig.contact.email && (
        <meta name="contact" content={siteConfig.contact.email} />
      )}
      
      {/* Geographic data if available */}
      {siteConfig.geo && (
        <>
          <meta name="geo.position" content={`${siteConfig.geo.latitude};${siteConfig.geo.longitude}`} />
          <meta name="ICBM" content={`${siteConfig.geo.latitude}, ${siteConfig.geo.longitude}`} />
        </>
      )}
      
      {siteConfig.address && (
        <>
          <meta name="geo.region" content={siteConfig.address.countryCode} />
          <meta name="geo.placename" content={siteConfig.address.city} />
        </>
      )}
      
      {/* Additional custom meta tags */}
      {additionalMeta.map((meta, index) => (
        <meta
          key={index}
          {...(meta.name ? { name: meta.name } : {})}
          {...(meta.property ? { property: meta.property } : {})}
          content={meta.content}
        />
      ))}
    </Head>
  );
}

// Named export for flexibility
export default SeoHead;
