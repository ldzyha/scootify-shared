#!/usr/bin/env node

/**
 * Universal Image Processing Pipeline
 *
 * Fetches images from URLs or local paths, processes them with Sharp to generate
 * responsive sizes in multiple formats (AVIF, WebP, original), and outputs them
 * with transliterated Ukrainian filenames.
 *
 * Features:
 * - Multi-format output: AVIF (primary), WebP (fallback), original (legacy)
 * - Responsive sizes: 400px, 800px, 1200px, 1920px (configurable)
 * - Ukrainian → Latin transliteration for filenames
 * - Parallel processing with concurrency limit
 * - Progress tracking and error handling
 * - Retry logic for failed downloads
 * - Skip existing files (--force to override)
 * - Manifest generation for processed files
 *
 * Usage:
 *   node image-pipeline.mjs --input urls.json --output ./public/images/products
 *   node image-pipeline.mjs --input urls.json --output ./out --sizes 400,800,1200
 *   node image-pipeline.mjs --input urls.json --formats avif,webp --dry-run
 *   cat urls.json | node image-pipeline.mjs --output ./out
 *
 * Input JSON format:
 *   [
 *     {
 *       "url": "https://example.com/image.jpg",
 *       "slug": "product-slug",
 *       "name": "Електросамокат Nami Burn-E2 Max"
 *     }
 *   ]
 *
 * Output structure:
 *   /public/images/products/
 *     └── product-slug/
 *         ├── elektrosamokat-nami-burn-e2-max-400w.avif
 *         ├── elektrosamokat-nami-burn-e2-max-400w.webp
 *         ├── elektrosamokat-nami-burn-e2-max-800w.avif
 *         ├── elektrosamokat-nami-burn-e2-max-800w.webp
 *         ├── elektrosamokat-nami-burn-e2-max-1200w.avif
 *         ├── elektrosamokat-nami-burn-e2-max-1200w.webp
 *         ├── elektrosamokat-nami-burn-e2-max-1920w.avif
 *         ├── elektrosamokat-nami-burn-e2-max-1920w.webp
 *         └── original.jpg
 */

import { writeFile, mkdir, readFile, access } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import { createReadStream } from 'fs';
import sharp from 'sharp';
import { tmpdir } from 'os';
import { createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Default configuration
const DEFAULT_SIZES = [400, 800, 1200, 1920];
const DEFAULT_FORMATS = ['avif', 'webp'];
const DEFAULT_QUALITY = {
  avif: 75,
  webp: 85,
  jpeg: 90,
};
const MAX_CONCURRENT = 3;
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

// Ukrainian transliteration map (standard Ukrainian → Latin)
const TRANSLIT_MAP = {
  'а': 'a', 'б': 'b', 'в': 'v', 'г': 'h', 'ґ': 'g', 'д': 'd', 'е': 'e', 'є': 'ye',
  'ж': 'zh', 'з': 'z', 'и': 'y', 'і': 'i', 'ї': 'yi', 'й': 'y', 'к': 'k', 'л': 'l',
  'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
  'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 'ь': '', 'ю': 'yu',
  'я': 'ya', "'": '', ''': '', ' ': '-', '/': '-', '(': '', ')': '', ',': '', '.': '',
  ':': '', ';': '', '!': '', '?': '', '"': '', '«': '', '»': '', '–': '-', '—': '-',
  'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'H', 'Ґ': 'G', 'Д': 'D', 'Е': 'E', 'Є': 'Ye',
  'Ж': 'Zh', 'З': 'Z', 'И': 'Y', 'І': 'I', 'Ї': 'Yi', 'Й': 'Y', 'К': 'K', 'Л': 'L',
  'М': 'M', 'Н': 'N', 'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U',
  'Ф': 'F', 'Х': 'Kh', 'Ц': 'Ts', 'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Shch', 'Ю': 'Yu',
  'Я': 'Ya',
};

/**
 * Transliterate Ukrainian text to Latin characters
 */
function transliterate(text) {
  return text
    .split('')
    .map(char => TRANSLIT_MAP[char] !== undefined ? TRANSLIT_MAP[char] : char)
    .join('')
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Download image from URL with retry logic
 */
async function downloadImage(url, retries = MAX_RETRIES) {
  // Normalize URL
  if (url.startsWith('//')) {
    url = 'https:' + url;
  }

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept': 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
        },
        signal: AbortSignal.timeout(30000), // 30 second timeout
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return Buffer.from(await response.arrayBuffer());
    } catch (error) {
      if (attempt === retries) {
        throw new Error(`Failed to download after ${retries} attempts: ${error.message}`);
      }
      console.warn(`  Retry ${attempt}/${retries} for ${url}: ${error.message}`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * attempt));
    }
  }
}

/**
 * Load image from local file path
 */
async function loadLocalImage(filePath) {
  try {
    await access(filePath);
    return await readFile(filePath);
  } catch (error) {
    throw new Error(`Failed to read local file: ${error.message}`);
  }
}

/**
 * Fetch image from URL or local path
 */
async function fetchImage(source) {
  if (source.startsWith('http://') || source.startsWith('https://') || source.startsWith('//')) {
    return await downloadImage(source);
  } else {
    return await loadLocalImage(source);
  }
}

/**
 * Process single image with Sharp - generate responsive sizes and formats
 */
async function processImage(buffer, outputDir, baseName, originalName, options = {}) {
  const {
    sizes = DEFAULT_SIZES,
    formats = DEFAULT_FORMATS,
    quality = DEFAULT_QUALITY,
    force = false,
  } = options;

  const results = {
    baseName,
    originalName,
    files: [],
    metadata: null,
  };

  // Get image metadata
  const image = sharp(buffer);
  const metadata = await image.metadata();
  results.metadata = {
    width: metadata.width,
    height: metadata.height,
    format: metadata.format,
    size: buffer.length,
  };

  // Save original file
  const originalExt = metadata.format === 'jpeg' ? 'jpg' : metadata.format;
  const originalPath = join(outputDir, `original.${originalExt}`);
  
  if (force || !existsSync(originalPath)) {
    await writeFile(originalPath, buffer);
    results.files.push({
      path: `original.${originalExt}`,
      width: metadata.width,
      height: metadata.height,
      format: originalExt,
      size: buffer.length,
    });
  }

  // Process each size
  for (const width of sizes) {
    // Skip if image is smaller than target size
    if (metadata.width < width) {
      continue;
    }

    // Calculate proportional height
    const height = Math.round((width / metadata.width) * metadata.height);

    // Process each format
    for (const format of formats) {
      const filename = `${baseName}-${width}w.${format}`;
      const outputPath = join(outputDir, filename);

      // Skip if file exists and not forcing
      if (!force && existsSync(outputPath)) {
        console.log(`  ⏭️  Skipping existing: ${filename}`);
        continue;
      }

      let pipeline = sharp(buffer).resize(width, null, {
        withoutEnlargement: true,
        fit: 'inside',
      });

      // Apply format-specific settings
      switch (format) {
        case 'avif':
          pipeline = pipeline.avif({ 
            quality: quality.avif,
            effort: 6, // Slower but better compression
          });
          break;
        case 'webp':
          pipeline = pipeline.webp({ 
            quality: quality.webp,
          });
          break;
        case 'jpeg':
        case 'jpg':
          pipeline = pipeline.jpeg({ 
            quality: quality.jpeg,
            progressive: true,
          });
          break;
        case 'png':
          pipeline = pipeline.png({
            compressionLevel: 9,
          });
          break;
        default:
          throw new Error(`Unsupported format: ${format}`);
      }

      const outputInfo = await pipeline.toFile(outputPath);

      results.files.push({
        path: filename,
        width: outputInfo.width,
        height: outputInfo.height,
        format,
        size: outputInfo.size,
      });
    }
  }

  return results;
}

/**
 * Process single item from input
 */
async function processItem(item, outputBaseDir, options = {}) {
  const { url, slug, name } = item;

  console.log(`\n${'='.repeat(60)}`);
  console.log(`Processing: ${name || slug}`);
  console.log('='.repeat(60));

  // Create output directory
  const outputDir = join(outputBaseDir, slug);
  if (!existsSync(outputDir)) {
    await mkdir(outputDir, { recursive: true });
  }

  // Transliterate name for filename
  const transliteratedName = transliterate(name || slug);
  console.log(`  Transliterated: ${transliteratedName}`);

  // Fetch image
  console.log(`  Fetching: ${url.substring(0, 80)}...`);
  const buffer = await fetchImage(url);
  console.log(`  Downloaded: ${(buffer.length / 1024).toFixed(2)} KB`);

  // Process image
  console.log(`  Processing...`);
  const results = await processImage(buffer, outputDir, transliteratedName, name, options);

  console.log(`  ✓ Generated ${results.files.length} files`);
  console.log(`  Original: ${results.metadata.width}x${results.metadata.height} (${results.metadata.format})`);

  return {
    slug,
    name,
    url,
    transliteratedName,
    outputDir: outputDir.replace(outputBaseDir, '').substring(1),
    ...results,
  };
}

/**
 * Process items with concurrency limit
 */
async function processItemsWithConcurrency(items, outputDir, options = {}) {
  const results = [];
  const errors = [];
  let completed = 0;

  const queue = [...items];
  const activePromises = new Set();

  while (queue.length > 0 || activePromises.size > 0) {
    // Fill up to MAX_CONCURRENT
    while (queue.length > 0 && activePromises.size < MAX_CONCURRENT) {
      const item = queue.shift();
      
      const promise = processItem(item, outputDir, options)
        .then(result => {
          results.push(result);
          completed++;
          console.log(`\n[${completed}/${items.length}] Completed`);
        })
        .catch(error => {
          errors.push({ item, error: error.message });
          console.error(`\n❌ Error processing ${item.slug}: ${error.message}`);
          completed++;
        })
        .finally(() => {
          activePromises.delete(promise);
        });

      activePromises.add(promise);
    }

    // Wait for at least one to complete
    if (activePromises.size > 0) {
      await Promise.race(activePromises);
    }
  }

  return { results, errors };
}

/**
 * Generate manifest file
 */
async function generateManifest(results, outputDir) {
  const manifestPath = join(outputDir, 'manifest.json');
  const manifest = {
    generated: new Date().toISOString(),
    totalItems: results.length,
    items: results.map(r => ({
      slug: r.slug,
      name: r.name,
      url: r.url,
      transliteratedName: r.transliteratedName,
      outputDir: r.outputDir,
      metadata: r.metadata,
      files: r.files,
    })),
  };

  await writeFile(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`\n📝 Manifest written to: ${manifestPath}`);
}

/**
 * Parse command line arguments
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    input: null,
    output: './public/images/products',
    sizes: DEFAULT_SIZES,
    formats: DEFAULT_FORMATS,
    quality: DEFAULT_QUALITY,
    dryRun: false,
    force: false,
    manifest: true,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    switch (arg) {
      case '--input':
      case '-i':
        options.input = args[++i];
        break;
      case '--output':
      case '-o':
        options.output = args[++i];
        break;
      case '--sizes':
        options.sizes = args[++i].split(',').map(s => parseInt(s.trim()));
        break;
      case '--formats':
        options.formats = args[++i].split(',').map(f => f.trim());
        break;
      case '--quality-avif':
        options.quality.avif = parseInt(args[++i]);
        break;
      case '--quality-webp':
        options.quality.webp = parseInt(args[++i]);
        break;
      case '--quality-jpeg':
        options.quality.jpeg = parseInt(args[++i]);
        break;
      case '--dry-run':
        options.dryRun = true;
        break;
      case '--force':
      case '-f':
        options.force = true;
        break;
      case '--no-manifest':
        options.manifest = false;
        break;
      case '--help':
      case '-h':
        showHelp();
        process.exit(0);
      default:
        console.error(`Unknown option: ${arg}`);
        process.exit(1);
    }
  }

  return options;
}

/**
 * Read input from file or stdin
 */
async function readInput(inputPath) {
  if (inputPath) {
    const content = await readFile(inputPath, 'utf-8');
    return JSON.parse(content);
  } else {
    // Read from stdin
    const chunks = [];
    for await (const chunk of process.stdin) {
      chunks.push(chunk);
    }
    const content = Buffer.concat(chunks).toString('utf-8');
    return JSON.parse(content);
  }
}

/**
 * Show help message
 */
function showHelp() {
  console.log(`
Universal Image Processing Pipeline

Usage:
  node image-pipeline.mjs --input <file> --output <dir> [options]
  cat urls.json | node image-pipeline.mjs --output <dir> [options]

Options:
  -i, --input <file>          Input JSON file (or read from stdin)
  -o, --output <dir>          Output directory (default: ./public/images/products)
  --sizes <sizes>             Comma-separated widths (default: 400,800,1200,1920)
  --formats <formats>         Comma-separated formats (default: avif,webp)
  --quality-avif <0-100>      AVIF quality (default: 75)
  --quality-webp <0-100>      WebP quality (default: 85)
  --quality-jpeg <0-100>      JPEG quality (default: 90)
  --dry-run                   Preview without processing
  -f, --force                 Overwrite existing files
  --no-manifest               Skip manifest generation
  -h, --help                  Show this help

Input JSON format:
  [
    {
      "url": "https://example.com/image.jpg",
      "slug": "product-slug",
      "name": "Електросамокат Nami Burn-E2 Max"
    }
  ]

Examples:
  # Process from file with default settings
  node image-pipeline.mjs --input urls.json --output ./public/images

  # Custom sizes and formats
  node image-pipeline.mjs -i urls.json -o ./out --sizes 400,800 --formats avif,webp,jpeg

  # Process from stdin
  cat urls.json | node image-pipeline.mjs --output ./out

  # Force overwrite existing files
  node image-pipeline.mjs -i urls.json -o ./out --force

  # Dry run to preview
  node image-pipeline.mjs -i urls.json --dry-run
`);
}

/**
 * Main function
 */
async function main() {
  const options = parseArgs();

  console.log(`
${'='.repeat(60)}
IMAGE PROCESSING PIPELINE
${'='.repeat(60)}
`);

  // Read input
  let items;
  try {
    items = await readInput(options.input);
  } catch (error) {
    console.error(`Error reading input: ${error.message}`);
    console.error(`\nProvide input via --input flag or pipe JSON to stdin`);
    process.exit(1);
  }

  console.log(`Configuration:`);
  console.log(`  Items: ${items.length}`);
  console.log(`  Output: ${options.output}`);
  console.log(`  Sizes: ${options.sizes.join(', ')}px`);
  console.log(`  Formats: ${options.formats.join(', ')}`);
  console.log(`  Quality: AVIF ${options.quality.avif}, WebP ${options.quality.webp}, JPEG ${options.quality.jpeg}`);
  console.log(`  Force: ${options.force}`);
  console.log(`  Dry run: ${options.dryRun}`);

  if (options.dryRun) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`DRY RUN - Preview`);
    console.log('='.repeat(60));
    
    for (const item of items) {
      const transliteratedName = transliterate(item.name || item.slug);
      console.log(`\n${item.slug}/`);
      console.log(`  Source: ${item.url}`);
      console.log(`  Name: ${item.name}`);
      console.log(`  Transliterated: ${transliteratedName}`);
      console.log(`  Files:`);
      console.log(`    - original.{ext}`);
      for (const size of options.sizes) {
        for (const format of options.formats) {
          console.log(`    - ${transliteratedName}-${size}w.${format}`);
        }
      }
    }
    
    console.log(`\n${'='.repeat(60)}`);
    console.log(`Dry run complete. Use without --dry-run to process.`);
    return;
  }

  // Create output directory
  if (!existsSync(options.output)) {
    await mkdir(options.output, { recursive: true });
  }

  // Process items
  const startTime = Date.now();
  const { results, errors } = await processItemsWithConcurrency(items, options.output, options);
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);

  // Generate manifest
  if (options.manifest && results.length > 0) {
    await generateManifest(results, options.output);
  }

  // Summary
  console.log(`\n${'='.repeat(60)}`);
  console.log(`PROCESSING COMPLETE`);
  console.log('='.repeat(60));
  console.log(`  Total items: ${items.length}`);
  console.log(`  Successful: ${results.length}`);
  console.log(`  Failed: ${errors.length}`);
  console.log(`  Duration: ${duration}s`);

  if (errors.length > 0) {
    console.log(`\n❌ Errors:`);
    errors.forEach(({ item, error }) => {
      console.log(`  - ${item.slug}: ${error}`);
    });
  }

  console.log(`\n✓ Output directory: ${options.output}`);
}

// Run if executed directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch(error => {
    console.error(`\n❌ Fatal error: ${error.message}`);
    console.error(error.stack);
    process.exit(1);
  });
}

// Export for programmatic use
export {
  transliterate,
  fetchImage,
  processImage,
  processItem,
  downloadImage,
  loadLocalImage,
};
