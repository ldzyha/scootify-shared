#!/usr/bin/env node

/**
 * Nova Poshta Waybill Creation CLI
 * 
 * Creates waybills for Nova Poshta delivery service
 * 
 * Usage:
 *   node scripts/create-nova-poshta-waybill.mjs --order order-123.json
 *   node scripts/create-nova-poshta-waybill.mjs --interactive
 *   node scripts/create-nova-poshta-waybill.mjs --help
 * 
 * Options:
 *   --order <path>       Path to order JSON file
 *   --api-key <key>      Nova Poshta API key (or env var NP_API_KEY)
 *   --output <path>      Save waybill response to JSON file
 *   --interactive        Interactive mode (prompt for details)
 *   --help               Show this help message
 */

import { createWaybill, searchCities, getWarehouses } from '../src/lib/nova-poshta.ts';
import fs from 'fs';
import path from 'path';
import readline from 'readline';

// ============================================================================
// Constants
// ============================================================================

const TRACKING_URL_BASE = 'https://novaposhta.ua/tracking/?cargo_number=';

// ============================================================================
// Types
// ============================================================================

/**
 * Order JSON structure
 */
const OrderSchema = {
  orderRef: 'string',
  customer: {
    name: 'string',
    surname: 'string',
    phone: 'string'
  },
  delivery: {
    cityRef: 'string',
    warehouseRef: 'string',
    deliveryType: 'string' // 'warehouse' or 'door'
  },
  items: [
    {
      name: 'string',
      weight: 'number',
      cost: 'number'
    }
  ],
  payment: {
    method: 'string', // 'cash' or 'noncash'
    cod: 'number' // cash on delivery amount
  },
  sender: {
    cityRef: 'string',
    warehouseRef: 'string',
    contactRef: 'string',
    phone: 'string'
  }
};

// ============================================================================
// CLI Interface
// ============================================================================

/**
 * Parse command line arguments
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const parsed = {
    order: null,
    apiKey: process.env.NP_API_KEY || null,
    output: null,
    interactive: false,
    help: false
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    if (arg === '--help' || arg === '-h') {
      parsed.help = true;
    } else if (arg === '--interactive' || arg === '-i') {
      parsed.interactive = true;
    } else if (arg === '--order' || arg === '-o') {
      parsed.order = args[++i];
    } else if (arg === '--api-key' || arg === '-k') {
      parsed.apiKey = args[++i];
    } else if (arg === '--output') {
      parsed.output = args[++i];
    }
  }

  return parsed;
}

/**
 * Show help message
 */
function showHelp() {
  console.log(`
Nova Poshta Waybill Creation CLI

Usage:
  node scripts/create-nova-poshta-waybill.mjs --order order-123.json
  node scripts/create-nova-poshta-waybill.mjs --interactive
  node scripts/create-nova-poshta-waybill.mjs --help

Options:
  --order <path>       Path to order JSON file
  --api-key <key>      Nova Poshta API key (or env var NP_API_KEY)
  --output <path>      Save waybill response to JSON file
  --interactive, -i    Interactive mode (prompt for details)
  --help, -h           Show this help message

Order JSON Format:
  {
    "orderRef": "ORDER-2026-0001",
    "customer": {
      "name": "Іван",
      "surname": "Петренко",
      "phone": "+380987654321"
    },
    "delivery": {
      "cityRef": "db5c88f0-391c-11dd-90d9-001a92567626",
      "warehouseRef": "1ec09d88-e1c2-11e3-8c4a-0050568002cf",
      "deliveryType": "warehouse"
    },
    "items": [
      {
        "name": "Гальмівні колодки Xiaomi",
        "weight": 0.2,
        "cost": 350
      }
    ],
    "payment": {
      "method": "cash",
      "cod": 350
    },
    "sender": {
      "cityRef": "...",
      "warehouseRef": "...",
      "contactRef": "...",
      "phone": "..."
    }
  }

Environment Variables:
  NP_API_KEY           Nova Poshta API key

Examples:
  # Create waybill from order file
  node scripts/create-nova-poshta-waybill.mjs --order order-123.json --output waybill.json

  # Interactive mode
  node scripts/create-nova-poshta-waybill.mjs --interactive --api-key YOUR_API_KEY

  # With custom API key
  node scripts/create-nova-poshta-waybill.mjs --order order.json --api-key YOUR_API_KEY
`);
}

// ============================================================================
// Order Validation
// ============================================================================

/**
 * Validate order data structure
 */
function validateOrder(order) {
  const errors = [];

  // Check required fields
  if (!order.orderRef) {
    errors.push('Missing orderRef');
  }

  if (!order.customer) {
    errors.push('Missing customer object');
  } else {
    if (!order.customer.name) errors.push('Missing customer.name');
    if (!order.customer.surname) errors.push('Missing customer.surname');
    if (!order.customer.phone) errors.push('Missing customer.phone');
  }

  if (!order.delivery) {
    errors.push('Missing delivery object');
  } else {
    if (!order.delivery.cityRef) errors.push('Missing delivery.cityRef');
    if (!order.delivery.deliveryType) errors.push('Missing delivery.deliveryType');
    
    if (order.delivery.deliveryType === 'warehouse' && !order.delivery.warehouseRef) {
      errors.push('Missing delivery.warehouseRef for warehouse delivery');
    }
    
    if (order.delivery.deliveryType === 'door') {
      if (!order.delivery.streetRef) errors.push('Missing delivery.streetRef for door delivery');
      if (!order.delivery.building) errors.push('Missing delivery.building for door delivery');
    }
  }

  if (!order.items || !Array.isArray(order.items) || order.items.length === 0) {
    errors.push('Missing or empty items array');
  } else {
    order.items.forEach((item, index) => {
      if (!item.name) errors.push(`Missing name for item ${index + 1}`);
      if (typeof item.weight !== 'number' || item.weight <= 0) {
        errors.push(`Invalid weight for item ${index + 1}`);
      }
      if (typeof item.cost !== 'number' || item.cost < 0) {
        errors.push(`Invalid cost for item ${index + 1}`);
      }
    });
  }

  if (!order.payment) {
    errors.push('Missing payment object');
  } else {
    if (!order.payment.method) errors.push('Missing payment.method');
    if (!['cash', 'noncash'].includes(order.payment.method)) {
      errors.push('Invalid payment.method (must be "cash" or "noncash")');
    }
  }

  if (!order.sender) {
    errors.push('Missing sender object');
  } else {
    if (!order.sender.cityRef) errors.push('Missing sender.cityRef');
    if (!order.sender.warehouseRef) errors.push('Missing sender.warehouseRef');
    if (!order.sender.contactRef) errors.push('Missing sender.contactRef');
    if (!order.sender.phone) errors.push('Missing sender.phone');
  }

  return errors;
}

/**
 * Calculate total weight from items
 */
function calculateTotalWeight(items) {
  return items.reduce((total, item) => total + item.weight, 0);
}

/**
 * Calculate total declared value
 */
function calculateDeclaredValue(items) {
  return items.reduce((total, item) => total + item.cost, 0);
}

// ============================================================================
// Interactive Mode
// ============================================================================

/**
 * Create readline interface for interactive prompts
 */
function createReadlineInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
}

/**
 * Prompt user for input
 */
function prompt(rl, question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

/**
 * Interactive mode - gather order details from user
 */
async function interactiveMode(apiKey) {
  console.log('\n=== Nova Poshta Waybill Creation - Interactive Mode ===\n');
  
  const rl = createReadlineInterface();
  const order = {
    orderRef: '',
    customer: {},
    delivery: {},
    items: [],
    payment: {},
    sender: {}
  };

  try {
    // Order reference
    order.orderRef = await prompt(rl, 'Order reference (e.g., ORDER-2026-0001): ');

    // Customer details
    console.log('\n--- Customer Information ---');
    order.customer.name = await prompt(rl, 'Customer first name: ');
    order.customer.surname = await prompt(rl, 'Customer last name: ');
    order.customer.phone = await prompt(rl, 'Customer phone (e.g., +380987654321): ');

    // Delivery details
    console.log('\n--- Delivery Information ---');
    const cityQuery = await prompt(rl, 'City name to search: ');
    
    console.log(`Searching for cities matching "${cityQuery}"...`);
    const cities = await searchCities(apiKey, cityQuery, 10);
    
    if (cities.length === 0) {
      console.error(`No cities found matching "${cityQuery}"`);
      rl.close();
      process.exit(1);
    }

    console.log('\nFound cities:');
    cities.forEach((city, index) => {
      console.log(`  ${index + 1}. ${city.name} (${city.region || 'N/A'})`);
    });

    const cityIndex = parseInt(await prompt(rl, 'Select city (enter number): ')) - 1;
    if (cityIndex < 0 || cityIndex >= cities.length) {
      console.error('Invalid city selection');
      rl.close();
      process.exit(1);
    }

    const selectedCity = cities[cityIndex];
    order.delivery.cityRef = selectedCity.ref;

    const deliveryType = await prompt(rl, 'Delivery type (warehouse/door): ');
    order.delivery.deliveryType = deliveryType.toLowerCase();

    if (order.delivery.deliveryType === 'warehouse') {
      console.log('\nFetching warehouses...');
      const warehouses = await getWarehouses(apiKey, selectedCity.ref);
      
      if (warehouses.length === 0) {
        console.error('No warehouses found for this city');
        rl.close();
        process.exit(1);
      }

      console.log('\nFound warehouses (showing first 20):');
      const displayWarehouses = warehouses.slice(0, 20);
      displayWarehouses.forEach((wh, index) => {
        console.log(`  ${index + 1}. ${wh.name || `Warehouse #${wh.number}`}`);
      });

      const whIndex = parseInt(await prompt(rl, 'Select warehouse (enter number): ')) - 1;
      if (whIndex < 0 || whIndex >= displayWarehouses.length) {
        console.error('Invalid warehouse selection');
        rl.close();
        process.exit(1);
      }

      order.delivery.warehouseRef = displayWarehouses[whIndex].ref;
    } else {
      console.log('\nDoor-to-door delivery requires streetRef, building, and apartment.');
      console.log('This interactive mode currently supports warehouse delivery only.');
      rl.close();
      process.exit(1);
    }

    // Items
    console.log('\n--- Items ---');
    const itemCount = parseInt(await prompt(rl, 'Number of items: '));
    
    for (let i = 0; i < itemCount; i++) {
      console.log(`\nItem ${i + 1}:`);
      const name = await prompt(rl, '  Name: ');
      const weight = parseFloat(await prompt(rl, '  Weight (kg): '));
      const cost = parseFloat(await prompt(rl, '  Cost (UAH): '));
      
      order.items.push({ name, weight, cost });
    }

    // Payment
    console.log('\n--- Payment ---');
    const paymentMethod = await prompt(rl, 'Payment method (cash/noncash): ');
    order.payment.method = paymentMethod.toLowerCase();
    
    if (order.payment.method === 'cash') {
      const cod = parseFloat(await prompt(rl, 'Cash on delivery amount (UAH): '));
      order.payment.cod = cod;
    }

    // Sender
    console.log('\n--- Sender Information ---');
    order.sender.cityRef = await prompt(rl, 'Sender city ref: ');
    order.sender.warehouseRef = await prompt(rl, 'Sender warehouse ref: ');
    order.sender.contactRef = await prompt(rl, 'Sender contact ref: ');
    order.sender.phone = await prompt(rl, 'Sender phone: ');

    rl.close();

    return order;
  } catch (error) {
    rl.close();
    throw error;
  }
}

// ============================================================================
// Waybill Creation
// ============================================================================

/**
 * Convert order data to waybill parameters
 */
function orderToWaybillParams(order) {
  const totalWeight = calculateTotalWeight(order.items);
  const declaredValue = calculateDeclaredValue(order.items);
  const cargoDescription = order.items.map(item => item.name).join(', ');

  // Map payment method
  const paymentMethod = order.payment.method === 'cash' ? 'Cash' : 'NonCash';
  
  // Determine service type
  const serviceType = order.delivery.deliveryType === 'warehouse' 
    ? 'WarehouseWarehouse' 
    : 'WarehouseDoors';

  const params = {
    // Sender
    senderContactPersonRef: order.sender.contactRef,
    senderPhone: order.sender.phone,
    senderCityRef: order.sender.cityRef,
    senderWarehouseRef: order.sender.warehouseRef,

    // Recipient
    recipientName: `${order.customer.name} ${order.customer.surname}`,
    recipientPhone: order.customer.phone,
    recipientCityRef: order.delivery.cityRef,

    // Service details
    serviceType,
    paymentMethod,
    payerType: 'Recipient', // Default: recipient pays for delivery

    // Cargo
    cargoDescription,
    weightKg: totalWeight,
    boxes: order.items.length, // One box per item (or adjust as needed)
    declaredValue
  };

  // Add delivery-specific fields
  if (order.delivery.deliveryType === 'warehouse') {
    params.recipientWarehouseRef = order.delivery.warehouseRef;
  } else {
    params.recipientStreetRef = order.delivery.streetRef;
    params.recipientBuilding = order.delivery.building;
    if (order.delivery.apartment) {
      params.recipientFlat = order.delivery.apartment;
    }
  }

  // Add cash on delivery if applicable
  if (order.payment.method === 'cash' && order.payment.cod > 0) {
    params.costOnDelivery = order.payment.cod;
  }

  return params;
}

/**
 * Create waybill from order data
 */
async function createWaybillFromOrder(apiKey, order) {
  // Validate order
  const errors = validateOrder(order);
  if (errors.length > 0) {
    console.error('\n❌ Order validation failed:');
    errors.forEach(error => console.error(`  - ${error}`));
    return null;
  }

  console.log('\n✓ Order validation passed');

  // Display order summary
  const totalWeight = calculateTotalWeight(order.items);
  const declaredValue = calculateDeclaredValue(order.items);

  console.log('\n=== Order Summary ===');
  console.log(`Order Ref: ${order.orderRef}`);
  console.log(`Customer: ${order.customer.name} ${order.customer.surname}`);
  console.log(`Phone: ${order.customer.phone}`);
  console.log(`Delivery: ${order.delivery.deliveryType}`);
  console.log(`Items: ${order.items.length}`);
  order.items.forEach((item, index) => {
    console.log(`  ${index + 1}. ${item.name} - ${item.weight}kg - ${item.cost} UAH`);
  });
  console.log(`Total Weight: ${totalWeight.toFixed(2)} kg`);
  console.log(`Declared Value: ${declaredValue} UAH`);
  console.log(`Payment: ${order.payment.method.toUpperCase()}`);
  if (order.payment.cod) {
    console.log(`Cash on Delivery: ${order.payment.cod} UAH`);
  }

  // Convert to waybill params
  const params = orderToWaybillParams(order);

  console.log('\n=== Creating Waybill ===');
  console.log('Sending request to Nova Poshta API...');

  try {
    const result = await createWaybill(apiKey, params);

    if (!result) {
      console.error('\n❌ Waybill creation failed');
      console.error('Please check the following:');
      console.error('  - API key is valid');
      console.error('  - All city/warehouse references are correct');
      console.error('  - Sender contact reference is valid');
      console.error('  - Phone numbers are in correct format (+380XXXXXXXXX)');
      return null;
    }

    return result;
  } catch (error) {
    console.error('\n❌ Error creating waybill:', error.message);
    
    // Provide helpful suggestions based on error
    if (error.message.includes('Missing required recipient information')) {
      console.error('\nSuggestion: Check customer name, surname, and phone in order JSON');
    } else if (error.message.includes('Missing required sender information')) {
      console.error('\nSuggestion: Check sender contactRef, cityRef, warehouseRef, and phone');
    } else if (error.message.includes('warehouse required')) {
      console.error('\nSuggestion: Add warehouseRef to delivery object for warehouse delivery');
    } else if (error.message.includes('address required')) {
      console.error('\nSuggestion: Add streetRef and building for door-to-door delivery');
    }
    
    return null;
  }
}

// ============================================================================
// Output Handling
// ============================================================================

/**
 * Display waybill result
 */
function displayWaybillResult(result) {
  console.log('\n✅ Waybill Created Successfully!');
  console.log('\n=== Waybill Details ===');
  console.log(`Waybill Ref: ${result.ref}`);
  console.log(`Tracking Number (TTN): ${result.trackingNumber}`);
  
  if (result.cost) {
    console.log(`Delivery Cost: ${result.cost} UAH`);
  }
  
  if (result.estimatedDeliveryDate) {
    console.log(`Estimated Delivery: ${result.estimatedDeliveryDate}`);
  }

  console.log(`\nTracking URL: ${TRACKING_URL_BASE}${result.trackingNumber}`);
}

/**
 * Save waybill result to JSON file
 */
function saveWaybillToFile(result, outputPath) {
  try {
    const absolutePath = path.resolve(outputPath);
    const data = {
      ref: result.ref,
      trackingNumber: result.trackingNumber,
      cost: result.cost,
      estimatedDeliveryDate: result.estimatedDeliveryDate,
      trackingUrl: `${TRACKING_URL_BASE}${result.trackingNumber}`,
      createdAt: new Date().toISOString()
    };

    fs.writeFileSync(absolutePath, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`\n💾 Waybill saved to: ${absolutePath}`);
  } catch (error) {
    console.error(`\n❌ Failed to save waybill to file: ${error.message}`);
  }
}

// ============================================================================
// Main
// ============================================================================

async function main() {
  const args = parseArgs();

  // Show help
  if (args.help) {
    showHelp();
    process.exit(0);
  }

  // Validate API key
  if (!args.apiKey) {
    console.error('❌ Error: API key is required');
    console.error('Provide it via --api-key flag or NP_API_KEY environment variable');
    console.error('\nExample:');
    console.error('  export NP_API_KEY=your_api_key');
    console.error('  node scripts/create-nova-poshta-waybill.mjs --order order.json');
    process.exit(1);
  }

  let order;

  // Interactive mode
  if (args.interactive) {
    order = await interactiveMode(args.apiKey);
  }
  // Load from file
  else if (args.order) {
    const orderPath = path.resolve(args.order);
    
    if (!fs.existsSync(orderPath)) {
      console.error(`❌ Error: Order file not found: ${orderPath}`);
      process.exit(1);
    }

    try {
      const orderJson = fs.readFileSync(orderPath, 'utf-8');
      order = JSON.parse(orderJson);
    } catch (error) {
      console.error(`❌ Error reading order file: ${error.message}`);
      process.exit(1);
    }
  }
  // No input provided
  else {
    console.error('❌ Error: No order data provided');
    console.error('Use --order <path> to load from file or --interactive for interactive mode');
    console.error('\nRun with --help for more information');
    process.exit(1);
  }

  // Create waybill
  const result = await createWaybillFromOrder(args.apiKey, order);

  if (!result) {
    process.exit(1);
  }

  // Display result
  displayWaybillResult(result);

  // Save to file if requested
  if (args.output) {
    saveWaybillToFile(result, args.output);
  }

  console.log('\n✨ Done!\n');
}

// Run main function
main().catch((error) => {
  console.error('\n❌ Unexpected error:', error);
  process.exit(1);
});
