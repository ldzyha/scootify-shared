#!/usr/bin/env node

/**
 * AI-Powered Image Naming Script
 * Uses Gemini Flash 2.5 to analyze product images and generate Ukrainian metadata
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const API_KEY = 'AIzaSyCa-nYO0wVyVe7Af8a-8-8IY01IpPIxczQ';
const MODEL_NAME = 'gemini-2.0-flash-exp';
const MAX_RETRIES = 3;
const RATE_LIMIT_DELAY = 6000; // 6 seconds between requests (10 req/min)
const RETRY_DELAY = 2000; // 2 seconds between retries

// Brand context information
const BRAND_CONTEXT = {
  hiley: 'Hiley - Premium electric scooter brand known for innovative design and performance',
  scootify: 'Scootify - Urban mobility solutions with focus on portability and style',
  nami: 'Nami - High-performance electric scooters with dual motors and advanced suspension',
  hysco: 'Hysco - Budget-friendly electric scooters for everyday commuting'
};

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(API_KEY);

/**
 * Get AI prompt template for image analysis
 */
function getPrompt(brandInfo = '') {
  return `Analyze this e-scooter product image and provide Ukrainian metadata.

Requirements:
- name_uk: Full Ukrainian product name (brand + model). Use original Latin brand/model names but add Ukrainian product category.
- name_translit: Transliterated slug (lowercase, hyphens, preserve brand/model in Latin)
- alt_uk: Descriptive alt text in Ukrainian (50-100 chars) describing what you see
- caption_uk: Marketing caption in Ukrainian (100-200 chars) highlighting key features

Focus on: color, brand, model, visible features (dual suspension, seat, display, lights, etc.)
${brandInfo ? `Brand context: ${brandInfo}` : ''}

IMPORTANT: Return ONLY valid JSON in this exact format, no markdown, no explanation:
{
  "name_uk": "Електросамокат Brand Model",
  "name_translit": "elektrosamokat-brand-model",
  "alt_uk": "Опис того що видно на зображенні",
  "caption_uk": "Маркетинговий опис з ключовими характеристиками"
}`;
}

/**
 * Convert image file to base64
 */
async function fileToBase64(filePath) {
  const buffer = await fs.readFile(filePath);
  return buffer.toString('base64');
}

/**
 * Get image mime type from file extension
 */
function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp'
  };
  return mimeTypes[ext] || 'image/jpeg';
}

/**
 * Analyze image with Gemini AI
 */
async function analyzeImage(imagePath, brand = null, retryCount = 0) {
  try {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    
    // Prepare image data
    let imagePart;
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      // URL-based image
      const response = await fetch(imagePath);
      const buffer = await response.arrayBuffer();
      const base64 = Buffer.from(buffer).toString('base64');
      imagePart = {
        inlineData: {
          data: base64,
          mimeType: response.headers.get('content-type') || 'image/jpeg'
        }
      };
    } else {
      // Local file
      if (!existsSync(imagePath)) {
        throw new Error(`Image file not found: ${imagePath}`);
      }
      const base64 = await fileToBase64(imagePath);
      imagePart = {
        inlineData: {
          data: base64,
          mimeType: getMimeType(imagePath)
        }
      };
    }

    // Get brand context
    const brandInfo = brand && BRAND_CONTEXT[brand.toLowerCase()] 
      ? BRAND_CONTEXT[brand.toLowerCase()] 
      : '';

    // Generate content
    const prompt = getPrompt(brandInfo);
    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response.text();

    // Parse JSON response
    let jsonText = text.trim();
    
    // Remove markdown code blocks if present
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }

    const metadata = JSON.parse(jsonText);

    // Validate response format
    const requiredFields = ['name_uk', 'name_translit', 'alt_uk', 'caption_uk'];
    for (const field of requiredFields) {
      if (!metadata[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    return {
      success: true,
      data: metadata,
      image: imagePath
    };

  } catch (error) {
    if (retryCount < MAX_RETRIES) {
      console.error(`Error analyzing image (attempt ${retryCount + 1}/${MAX_RETRIES}): ${error.message}`);
      console.log(`Retrying in ${RETRY_DELAY / 1000} seconds...`);
      
      await sleep(RETRY_DELAY);
      return analyzeImage(imagePath, brand, retryCount + 1);
    }

    return {
      success: false,
      error: error.message,
      image: imagePath,
      fallback: {
        name_uk: `Електросамокат ${path.basename(imagePath, path.extname(imagePath))}`,
        name_translit: `elektrosamokat-${path.basename(imagePath, path.extname(imagePath))}`.toLowerCase(),
        alt_uk: 'Зображення електросамоката',
        caption_uk: 'Опис недоступний'
      }
    };
  }
}

/**
 * Process multiple images in batch
 */
async function processBatch(images, brand = null, outputFile = null) {
  const results = [];
  const total = images.length;

  console.log(`Processing ${total} images...`);
  console.log(`Rate limit: ${RATE_LIMIT_DELAY / 1000}s between requests\n`);

  for (let i = 0; i < images.length; i++) {
    const imagePath = images[i];
    console.log(`[${i + 1}/${total}] Processing: ${imagePath}`);

    const result = await analyzeImage(imagePath, brand);
    
    if (result.success) {
      console.log(`✓ Success`);
      console.log(`  Name: ${result.data.name_uk}`);
      console.log(`  Slug: ${result.data.name_translit}\n`);
    } else {
      console.log(`✗ Failed: ${result.error}`);
      console.log(`  Using fallback metadata\n`);
    }

    results.push(result);

    // Rate limiting (except for last item)
    if (i < images.length - 1) {
      await sleep(RATE_LIMIT_DELAY);
    }
  }

  // Output results
  const output = JSON.stringify(results, null, 2);
  
  if (outputFile) {
    await fs.writeFile(outputFile, output, 'utf-8');
    console.log(`\nResults saved to: ${outputFile}`);
  } else {
    console.log('\n--- RESULTS ---');
    console.log(output);
  }

  return results;
}

/**
 * Sleep helper
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Parse command line arguments
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    image: null,
    batch: null,
    output: null,
    brand: null
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    if (arg === '--image' && args[i + 1]) {
      options.image = args[++i];
    } else if (arg === '--batch' && args[i + 1]) {
      options.batch = args[++i];
    } else if (arg === '--output' && args[i + 1]) {
      options.output = args[++i];
    } else if (arg === '--brand' && args[i + 1]) {
      options.brand = args[++i];
    } else if (arg === '--help' || arg === '-h') {
      showHelp();
      process.exit(0);
    }
  }

  return options;
}

/**
 * Show help message
 */
function showHelp() {
  console.log(`
AI-Powered Image Naming Script
==============================

Usage:
  node image-ai-context.mjs --image <path> [options]
  node image-ai-context.mjs --batch <json-file> [options]

Options:
  --image <path>      Path or URL to image file
  --batch <file>      JSON file with array of image paths
  --output <file>     Output JSON file (default: stdout)
  --brand <name>      Brand context: hiley|scootify|nami|hysco
  --help, -h          Show this help message

Examples:
  # Single image
  node image-ai-context.mjs --image product.jpg --brand nami

  # Batch processing
  node image-ai-context.mjs --batch images.json --output results.json

  # With URL
  node image-ai-context.mjs --image https://example.com/scooter.jpg

Batch JSON Format:
  ["image1.jpg", "image2.jpg", "https://example.com/image3.jpg"]

Output Format:
  {
    "success": true,
    "data": {
      "name_uk": "Електросамокат Nami Burn-E2 Max",
      "name_translit": "elektrosamokat-nami-burn-e2-max",
      "alt_uk": "Чорний електросамокат з подвійними амортизаторами",
      "caption_uk": "Преміальний електросамокат з потужністю 2400W"
    },
    "image": "path/to/image.jpg"
  }
`);
}

/**
 * Main function
 */
async function main() {
  const options = parseArgs();

  // Validate options
  if (!options.image && !options.batch) {
    console.error('Error: Either --image or --batch is required\n');
    showHelp();
    process.exit(1);
  }

  try {
    if (options.batch) {
      // Batch processing
      const batchFile = options.batch;
      
      if (!existsSync(batchFile)) {
        throw new Error(`Batch file not found: ${batchFile}`);
      }

      const batchData = await fs.readFile(batchFile, 'utf-8');
      const images = JSON.parse(batchData);

      if (!Array.isArray(images)) {
        throw new Error('Batch file must contain an array of image paths');
      }

      await processBatch(images, options.brand, options.output);

    } else {
      // Single image processing
      console.log(`Analyzing image: ${options.image}\n`);
      
      const result = await analyzeImage(options.image, options.brand);
      
      const output = JSON.stringify(result, null, 2);
      
      if (options.output) {
        await fs.writeFile(options.output, output, 'utf-8');
        console.log(`\nResults saved to: ${options.output}`);
      } else {
        console.log('\n--- RESULTS ---');
        console.log(output);
      }

      if (!result.success) {
        console.error('\nWarning: Analysis failed, using fallback metadata');
        process.exit(1);
      }
    }

  } catch (error) {
    console.error(`\nFatal error: ${error.message}`);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error('Unhandled error:', error);
    process.exit(1);
  });
}

export { analyzeImage, processBatch };
