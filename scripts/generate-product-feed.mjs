#!/usr/bin/env node

/**
 * Google Merchant Center Product Feed Generator
 * 
 * Generates XML feed for Google Shopping/Merchant Center from product JSON.
 * Only includes products with purchaseModel === 'direct' (parts, accessories, direct-sale items).
 * Excludes consultation-only products (e-scooters).
 * 
 * Usage:
 *   node scripts/generate-product-feed.mjs --site hiley --output public/feed.xml
 * 
 * Options:
 *   --site            Site key (hiley/scootify/nami/hysco) [required]
 *   --products        Path to products JSON [default: src/data/products.json]
 *   --output          Output XML file path [required]
 *   --exchange-rate   Override UAH exchange rate [default: fetch from API]
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================================================================
// Configuration
// ============================================================================

const SITE_CONFIGS = {
  hiley: {
    siteName: 'HILEY Store',
    siteUrl: 'https://hiley.com.ua',
    domain: 'hiley.com.ua',
    description: 'Офіційний постачальник преміум електросамокатів HILEY Tiger в Україні',
    productUrlPattern: '/product/:slug',
    fallbackExchangeRate: 42.25,
  },
  scootify: {
    siteName: 'Scootify',
    siteUrl: 'https://scootify.com.ua',
    domain: 'scootify.com.ua',
    description: 'Офіційний дистриб\'ютор Kaabo в Україні',
    productUrlPattern: '/tovary/:slug/',
    fallbackExchangeRate: 42.25,
  },
  nami: {
    siteName: 'NAMI Electric',
    siteUrl: 'https://nami.com.ua',
    domain: 'nami.com.ua',
    description: 'Офіційні NAMI електросамокати в Україні',
    productUrlPattern: '/product/:slug',
    fallbackExchangeRate: 42.25,
  },
  hysco: {
    siteName: 'HYSCO',
    siteUrl: 'https://hysco.com.ua',
    domain: 'hysco.com.ua',
    description: 'Гіперскутери преміум класу в Україні',
    productUrlPattern: '/product/:slug',
    fallbackExchangeRate: 42.25,
  },
};

// ============================================================================
// Currency Conversion
// ============================================================================

/**
 * Fetch exchange rate from Monobank API
 */
async function fetchMonobankRate() {
  try {
    const response = await fetch('https://api.monobank.ua/bank/currency');
    if (!response.ok) {
      throw new Error(`Monobank API error: ${response.status}`);
    }
    const data = await response.json();
    const usdRate = data.find(
      (r) => r.currencyCodeA === 840 && r.currencyCodeB === 980
    );
    if (!usdRate) {
      throw new Error('USD/UAH rate not found');
    }
    return usdRate.rateSell || usdRate.rateCross || usdRate.rateBuy;
  } catch (error) {
    console.warn('[currency] Monobank API failed:', error.message);
    return null;
  }
}

/**
 * Fetch exchange rate from NBU API
 */
async function fetchNbuRate() {
  try {
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
    return data[0].rate;
  } catch (error) {
    console.warn('[currency] NBU API failed:', error.message);
    return null;
  }
}

/**
 * Get exchange rate (try Monobank, then NBU, then fallback)
 */
async function getExchangeRate(fallbackRate) {
  let rate = await fetchMonobankRate();
  if (rate) return rate;

  rate = await fetchNbuRate();
  if (rate) return rate;

  console.warn(`[currency] All APIs failed, using fallback: ${fallbackRate}`);
  return fallbackRate;
}

/**
 * Convert USD cents to UAH
 */
function usdCentsToUAH(usdCents, exchangeRate) {
  return Math.round((usdCents / 100) * exchangeRate);
}

// ============================================================================
// XML Generation
// ============================================================================

/**
 * Escape XML special characters
 */
function escapeXml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Strip HTML tags and clean description
 */
function cleanDescription(description) {
  if (!description) return '';
  
  // Remove markdown headers
  let text = description.replace(/^#{1,6}\s+/gm, '');
  
  // Remove markdown bold/italic
  text = text.replace(/\*\*([^*]+)\*\*/g, '$1');
  text = text.replace(/\*([^*]+)\*/g, '$1');
  
  // Remove links
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  
  // Remove extra whitespace and newlines
  text = text.replace(/\n+/g, ' ').trim();
  
  // Limit to 5000 characters (Google limit)
  if (text.length > 5000) {
    text = text.substring(0, 4997) + '...';
  }
  
  return text;
}

/**
 * Get product URL
 */
function getProductUrl(product, siteConfig) {
  const url = siteConfig.productUrlPattern.replace(':slug', product.slug);
  return `${siteConfig.siteUrl}${url}`;
}

/**
 * Get primary image URL
 */
function getImageUrl(product, siteConfig) {
  if (!product.images || product.images.length === 0) {
    return '';
  }
  
  // Get first image path
  let imagePath = typeof product.images[0] === 'string' 
    ? product.images[0] 
    : product.images[0].url;
  
  // Convert to absolute URL
  if (imagePath.startsWith('/')) {
    return `${siteConfig.siteUrl}${imagePath}`;
  }
  
  return imagePath;
}

/**
 * Get product category/type
 */
function getProductType(product) {
  if (product.category) {
    return product.category;
  }
  
  // Fallback to tags
  if (product.tags && product.tags.length > 0) {
    return product.tags[0];
  }
  
  return 'Електросамокати';
}

/**
 * Validate product has required fields
 */
function validateProduct(product, siteConfig) {
  const errors = [];
  const warnings = [];
  
  // Required fields
  if (!product.id && !product.sku) {
    errors.push('Missing id/sku');
  }
  if (!product.name) {
    errors.push('Missing name');
  }
  if (!product.slug) {
    errors.push('Missing slug');
  }
  if (!product.priceUSD && !product.priceUsdCents) {
    errors.push('Missing price');
  }
  if (!product.images || product.images.length === 0) {
    errors.push('Missing images');
  }
  
  // Optional but recommended fields
  if (!product.brand) {
    warnings.push('Missing brand');
  }
  if (!product.description && !product.shortDescription) {
    warnings.push('Missing description');
  }
  
  return { errors, warnings, isValid: errors.length === 0 };
}

/**
 * Generate XML item for a product
 */
function generateProductItem(product, siteConfig, exchangeRate) {
  const sku = product.sku || product.id;
  const title = escapeXml(product.name);
  const description = escapeXml(
    cleanDescription(product.description || product.shortDescription || product.name)
  );
  const link = escapeXml(getProductUrl(product, siteConfig));
  const imageLink = escapeXml(getImageUrl(product, siteConfig));
  const brand = escapeXml(product.brand || siteConfig.siteName);
  const productType = escapeXml(getProductType(product));
  
  // Price in USD cents
  const priceUsdCents = product.priceUsdCents || (product.priceUSD * 100);
  const priceUAH = usdCentsToUAH(priceUsdCents, exchangeRate);
  const price = `${priceUAH} UAH`;
  
  // Availability
  const availability = product.inStock !== false ? 'in stock' : 'out of stock';
  
  // Build XML item
  let xml = '    <item>\n';
  xml += `      <g:id>${escapeXml(sku)}</g:id>\n`;
  xml += `      <g:title>${title}</g:title>\n`;
  xml += `      <g:description>${description}</g:description>\n`;
  xml += `      <g:link>${link}</g:link>\n`;
  
  if (imageLink) {
    xml += `      <g:image_link>${imageLink}</g:image_link>\n`;
  }
  
  xml += `      <g:condition>new</g:condition>\n`;
  xml += `      <g:availability>${availability}</g:availability>\n`;
  xml += `      <g:price>${price}</g:price>\n`;
  xml += `      <g:brand>${brand}</g:brand>\n`;
  
  // Optional: GTIN (Global Trade Item Number)
  if (product.gtin) {
    xml += `      <g:gtin>${escapeXml(product.gtin)}</g:gtin>\n`;
  }
  
  // Optional: MPN (Manufacturer Part Number)
  if (product.mpn || sku) {
    xml += `      <g:mpn>${escapeXml(product.mpn || sku)}</g:mpn>\n`;
  }
  
  xml += `      <g:product_type>${productType}</g:product_type>\n`;
  
  xml += '    </item>\n';
  
  return xml;
}

/**
 * Generate full XML feed
 */
function generateFeed(products, siteConfig, exchangeRate) {
  const siteName = escapeXml(siteConfig.siteName);
  const siteUrl = escapeXml(siteConfig.siteUrl);
  const description = escapeXml(siteConfig.description);
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">\n';
  xml += '  <channel>\n';
  xml += `    <title>${siteName}</title>\n`;
  xml += `    <link>${siteUrl}</link>\n`;
  xml += `    <description>${description}</description>\n`;
  
  // Add product items
  for (const product of products) {
    xml += generateProductItem(product, siteConfig, exchangeRate);
  }
  
  xml += '  </channel>\n';
  xml += '</rss>\n';
  
  return xml;
}

// ============================================================================
// Main
// ============================================================================

async function main() {
  // Parse CLI arguments
  const args = process.argv.slice(2);
  const options = {};
  
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      const key = args[i].substring(2);
      const value = args[i + 1];
      options[key] = value;
      i++;
    }
  }
  
  // Validate required options
  if (!options.site) {
    console.error('Error: --site is required');
    console.error('Usage: node generate-product-feed.mjs --site hiley --output public/feed.xml');
    process.exit(1);
  }
  
  if (!options.output) {
    console.error('Error: --output is required');
    console.error('Usage: node generate-product-feed.mjs --site hiley --output public/feed.xml');
    process.exit(1);
  }
  
  // Get site config
  const siteConfig = SITE_CONFIGS[options.site];
  if (!siteConfig) {
    console.error(`Error: Unknown site "${options.site}"`);
    console.error(`Available sites: ${Object.keys(SITE_CONFIGS).join(', ')}`);
    process.exit(1);
  }
  
  console.log(`\n📦 Generating Google Merchant feed for ${siteConfig.siteName}...\n`);
  
  // Get products file path
  const productsPath = options.products || 'src/data/products.json';
  const absoluteProductsPath = path.isAbsolute(productsPath)
    ? productsPath
    : path.resolve(process.cwd(), productsPath);
  
  // Load products
  console.log(`📁 Loading products from: ${absoluteProductsPath}`);
  
  if (!fs.existsSync(absoluteProductsPath)) {
    console.error(`Error: Products file not found: ${absoluteProductsPath}`);
    process.exit(1);
  }
  
  const productsData = JSON.parse(fs.readFileSync(absoluteProductsPath, 'utf-8'));
  const allProducts = Array.isArray(productsData) ? productsData : [productsData];
  
  console.log(`✓ Loaded ${allProducts.length} total products`);
  
  // Filter products: only include direct purchase model
  const directProducts = allProducts.filter(product => {
    // Default to 'direct' if purchaseModel not specified
    const purchaseModel = product.purchaseModel || 'direct';
    return purchaseModel === 'direct';
  });
  
  console.log(`✓ Filtered to ${directProducts.length} direct-purchase products`);
  console.log(`  (Excluded ${allProducts.length - directProducts.length} consultation-only products)\n`);
  
  // Validate products
  const validProducts = [];
  const invalidProducts = [];
  const productsWithWarnings = [];
  
  for (const product of directProducts) {
    const validation = validateProduct(product, siteConfig);
    
    if (validation.isValid) {
      validProducts.push(product);
      if (validation.warnings.length > 0) {
        productsWithWarnings.push({
          product,
          warnings: validation.warnings,
        });
      }
    } else {
      invalidProducts.push({
        product,
        errors: validation.errors,
      });
    }
  }
  
  console.log(`✓ ${validProducts.length} valid products`);
  
  if (invalidProducts.length > 0) {
    console.log(`⚠️  ${invalidProducts.length} invalid products (will be skipped):`);
    invalidProducts.forEach(({ product, errors }) => {
      console.log(`  - ${product.name || product.id}: ${errors.join(', ')}`);
    });
    console.log();
  }
  
  if (productsWithWarnings.length > 0) {
    console.log(`⚠️  ${productsWithWarnings.length} products with warnings:`);
    productsWithWarnings.forEach(({ product, warnings }) => {
      console.log(`  - ${product.name || product.id}: ${warnings.join(', ')}`);
    });
    console.log();
  }
  
  // Get exchange rate
  console.log('💱 Fetching exchange rate...');
  const exchangeRate = options['exchange-rate']
    ? parseFloat(options['exchange-rate'])
    : await getExchangeRate(siteConfig.fallbackExchangeRate);
  
  console.log(`✓ Using exchange rate: 1 USD = ${exchangeRate} UAH\n`);
  
  // Generate feed
  console.log('🔨 Generating XML feed...');
  const xml = generateFeed(validProducts, siteConfig, exchangeRate);
  
  // Write to file
  const outputPath = path.resolve(process.cwd(), options.output);
  const outputDir = path.dirname(outputPath);
  
  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  fs.writeFileSync(outputPath, xml, 'utf-8');
  
  const lines = xml.split('\n').length;
  const sizeKb = (Buffer.byteLength(xml, 'utf-8') / 1024).toFixed(2);
  
  console.log(`✓ Feed generated successfully!`);
  console.log(`\n📄 Output:`);
  console.log(`  File: ${outputPath}`);
  console.log(`  Lines: ${lines}`);
  console.log(`  Size: ${sizeKb} KB`);
  console.log(`  Products: ${validProducts.length}`);
  console.log(`\n✨ Done!\n`);
}

main().catch((error) => {
  console.error('\n❌ Error:', error.message);
  console.error(error.stack);
  process.exit(1);
});
