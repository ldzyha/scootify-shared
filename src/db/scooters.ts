import type { Scooter } from './schema';

// Hyper/multi-brand scooters from hysco.com.ua
export const hyperScooters: Scooter[] = [
  // Teverun Fighter Mini - unique to hiley
  {
    id: 'teverun-fighter-mini',
    slug: 'teverun-fighter-mini',
    sku: 'HYP-TFM-001',
    brandId: 'teverun',
    productType: 'scooter',
    name: 'Teverun Fighter Mini',
    nameUk: 'Teverun Fighter Mini',
    shortDescription: 'Компактний високопродуктивний самокат з потужністю 2000W та швидкістю 65 км/год',
    shortDescriptionUk: 'Компактний високопродуктивний самокат з потужністю 2000W та швидкістю 65 км/год',
    description: 'Teverun Fighter Mini — компактний та потужний електросамокат для міста. Мотор 2000W, батарея 60V, максимальна швидкість 65 км/год. Ідеальний вибір для щоденних поїздок з високою продуктивністю.',
    descriptionUk: 'Teverun Fighter Mini — компактний та потужний електросамокат для міста. Мотор 2000W, батарея 60V, максимальна швидкість 65 км/год. Ідеальний вибір для щоденних поїздок з високою продуктивністю.',
    priceUsdCents: 160000, // $1600
    originalPriceUsdCents: null,
    costUsdCents: null,
    availability: 'pre_order',
    purchaseModel: 'consultation',
    stockQuantity: null,
    lowStockThreshold: null,
    featured: false,
    order: 100,
    categoryIds: ['tier-hyper', 'use-case-performance'],
    tags: ['teverun', 'hyper', 'high-performance'],
    domains: ['hysco.com.ua'],
    media: {
      images: ['/products/hyper/teverun-fighter-mini.webp'],
      videos: [],
      youtubeIds: [],
    },
    seo: {
      title: null,
      titleUk: null,
      description: null,
      descriptionUk: null,
      keywords: [],
      ogImage: null,
    },
    warranty: '6 months',
    warrantyUk: '6 місяців',
    rating: null,
    reviewCount: 0,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    metadata: {
      prepaymentTerms: {
        type: 'percentage',
        amount: 60,
        descriptionUk: '60% передоплата (високовартісний товар)',
      },
    },
    series: 'Fighter',
    model: 'Fighter Mini',
    specs: {
      motor: {
        count: null,
        powerPerMotor: null,
        totalPower: 2000,
        peakPower: null,
        type: null,
      },
      battery: {
        voltage: 60,
        voltageMin: 52,
        capacityAh: 25,
        capacityAhMin: 15,
        wattHours: null,
        cells: null,
        chargeTimeMin: null,
        chargeTimeMax: null,
        chargerSpec: null,
      },
      performance: {
        maxSpeed: 65,
        maxSpeedLimited: null,
        range: 80,
        maxIncline: null,
        maxLoad: null,
      },
      chassis: {
        weight: null,
        wheelSize: null,
        wheelType: null,
        foldable: null,
        dimensions: null,
        foldedDimensions: null,
        brakeType: null,
        brakePistons: null,
        suspensionFront: null,
        suspensionRear: null,
        suspensionAdjustable: null,
      },
      electronics: {
        display: null,
        nfc: null,
        app: true,
        alarm: null,
        alarmWithWheelLock: null,
        cruiseControl: null,
        regenerativeBrake: null,
        dualMotorMode: null,
        rgbLeds: null,
      },
      safety: {
        ipRating: null,
        turnSignals: null,
        reflectors: null,
        horn: null,
      },
      shipping: {
        weightKg: 55, // 50kg + 5kg packaging estimate
        seatsAmount: 1,
        boxes: [
          {
            dimensions: '140x75x70',
            weightKg: 55,
          },
        ],
        cargoDescription: 'Електросамокат Teverun Fighter Mini',
        cargoType: null,
      },
    },
    variants: [],
    colors: [],
    highlights: ['APP support', 'Smart BMS'],
    highlightsUk: ['Підтримка APP', 'Smart BMS'],
    relatedProductIds: [],
  },

  // Teverun Blade GT 2+ - unique to hiley
  {
    id: 'teverun-blade-gt2',
    slug: 'teverun-blade-gt2',
    sku: 'HYP-TBG-001',
    brandId: 'teverun',
    productType: 'scooter',
    name: 'Teverun Blade GT 2+',
    nameUk: 'Teverun Blade GT 2+',
    shortDescription: 'Високопродуктивний самокат з потужністю 4900W та швидкістю 85 км/год',
    shortDescriptionUk: 'Високопродуктивний самокат з потужністю 4900W та швидкістю 85 км/год',
    description: 'Teverun Blade GT 2+ — потужний електросамокат з мотором 4900W та максимальною швидкістю 85 км/год. Великий запас ходу, гідравлічні гальма та амортизація для комфортних поїздок.',
    descriptionUk: 'Teverun Blade GT 2+ — потужний електросамокат з мотором 4900W та максимальною швидкістю 85 км/год. Великий запас ходу, гідравлічні гальма та амортизація для комфортних поїздок.',
    priceUsdCents: 200000, // $2000
    originalPriceUsdCents: null,
    costUsdCents: null,
    availability: 'pre_order',
    purchaseModel: 'consultation',
    stockQuantity: null,
    lowStockThreshold: null,
    featured: false,
    order: 101,
    categoryIds: ['tier-hyper', 'use-case-performance'],
    tags: ['teverun', 'hyper', 'high-performance'],
    domains: ['hysco.com.ua'],
    media: {
      images: ['/products/hyper/teverun-blade-gt2.webp'],
      videos: [],
      youtubeIds: [],
    },
    seo: {
      title: null,
      titleUk: null,
      description: null,
      descriptionUk: null,
      keywords: [],
      ogImage: null,
    },
    warranty: '6 months',
    warrantyUk: '6 місяців',
    rating: null,
    reviewCount: 0,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    metadata: {
      prepaymentTerms: {
        type: 'percentage',
        amount: 60,
        descriptionUk: '60% передоплата (високовартісний товар)',
      },
    },
    series: 'Blade',
    model: 'GT 2+',
    specs: {
      motor: {
        count: null,
        powerPerMotor: null,
        totalPower: 4900,
        peakPower: null,
        type: null,
      },
      battery: {
        voltage: 60,
        voltageMin: null,
        capacityAh: 35,
        capacityAhMin: 26,
        wattHours: null,
        cells: null,
        chargeTimeMin: null,
        chargeTimeMax: null,
        chargerSpec: null,
      },
      performance: {
        maxSpeed: 85,
        maxSpeedLimited: null,
        range: 80,
        maxIncline: null,
        maxLoad: null,
      },
      chassis: {
        weight: null,
        wheelSize: null,
        wheelType: null,
        foldable: null,
        dimensions: null,
        foldedDimensions: null,
        brakeType: null,
        brakePistons: null,
        suspensionFront: null,
        suspensionRear: null,
        suspensionAdjustable: null,
      },
      electronics: {
        display: null,
        nfc: null,
        app: true,
        alarm: null,
        alarmWithWheelLock: null,
        cruiseControl: null,
        regenerativeBrake: null,
        dualMotorMode: null,
        rgbLeds: null,
      },
      safety: {
        ipRating: null,
        turnSignals: null,
        reflectors: null,
        horn: null,
      },
      shipping: {
        weightKg: 55, // 50kg + 5kg packaging estimate
        seatsAmount: 1,
        boxes: [
          {
            dimensions: '140x75x70',
            weightKg: 55,
          },
        ],
        cargoDescription: 'Електросамокат Teverun Blade GT 2+',
        cargoType: null,
      },
    },
    variants: [],
    colors: [],
    highlights: ['APP support', 'Smart BMS'],
    highlightsUk: ['Підтримка APP', 'Smart BMS'],
    relatedProductIds: [],
  },

  // Teverun Supreme Ultra 7260 - merged from hysco (primary) + hiley
  {
    id: 'teverun-supreme-ultra-7260',
    slug: 'teverun-supreme-ultra',
    sku: 'HYP-TSU-001',
    brandId: 'teverun',
    productType: 'scooter',
    name: 'Teverun Supreme Ultra 7260',
    nameUk: 'Teverun Supreme Ultra 7260',
    shortDescription: 'Ультра-потужний самокат 10000W із батареєю 72V 60Ah та запасом ходу 200 км',
    shortDescriptionUk: 'Ультра-потужний самокат 10000W із батареєю 72V 60Ah та запасом ходу 200 км',
    description: 'Teverun Supreme Ultra 7260 — флагман серії Supreme з найбільшим запасом ходу. 10000W потужності, батарея 72V 60Ah, запас ходу до 200 км. Оснащений Smart BMS, мобільним додатком, PKE, NFC та GPS для максимального комфорту та безпеки.',
    descriptionUk: 'Teverun Supreme Ultra 7260 — флагман серії Supreme з найбільшим запасом ходу. 10000W потужності, батарея 72V 60Ah, запас ходу до 200 км. Оснащений Smart BMS, мобільним додатком, PKE, NFC та GPS для максимального комфорту та безпеки.',
    priceUsdCents: 380000,
    originalPriceUsdCents: null,
    costUsdCents: null,
    availability: 'pre_order',
    purchaseModel: 'consultation',
    stockQuantity: null,
    lowStockThreshold: null,
    featured: false,
    order: 102,
    categoryIds: ['tier-hyper', 'use-case-performance'],
    tags: ['teverun', 'hyper', 'high-performance', 'flagship'],
    domains: ['hysco.com.ua'],
    media: {
      images: ['/products/hyper/teverun-supreme-ultra.webp'],
      videos: [],
      youtubeIds: [],
    },
    seo: {
      title: null,
      titleUk: null,
      description: null,
      descriptionUk: null,
      keywords: [],
      ogImage: null,
    },
    warranty: '6 months',
    warrantyUk: '6 місяців',
    rating: 4.8,
    reviewCount: 12,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    metadata: {
      prepaymentTerms: {
        type: 'percentage',
        amount: 60,
        descriptionUk: '60% передоплата (високовартісний товар)',
      },
    },
    series: 'Supreme',
    model: 'Supreme Ultra 7260',
    specs: {
      motor: {
        count: 2,
        powerPerMotor: 5000,
        totalPower: 10000,
        peakPower: null,
        type: 'hub',
      },
      battery: {
        voltage: 72,
        voltageMin: null,
        capacityAh: 60,
        capacityAhMin: null,
        wattHours: null,
        cells: null,
        chargeTimeMin: null,
        chargeTimeMax: null,
        chargerSpec: null,
      },
      performance: {
        maxSpeed: 107,
        maxSpeedLimited: null,
        range: 200,
        maxIncline: null,
        maxLoad: null,
      },
      chassis: {
        weight: null,
        wheelSize: null,
        wheelType: null,
        foldable: null,
        dimensions: null,
        foldedDimensions: null,
        brakeType: null,
        brakePistons: null,
        suspensionFront: null,
        suspensionRear: null,
        suspensionAdjustable: null,
      },
      electronics: {
        display: null,
        nfc: true,
        app: true,
        alarm: null,
        alarmWithWheelLock: null,
        cruiseControl: null,
        regenerativeBrake: null,
        dualMotorMode: null,
        rgbLeds: null,
      },
      safety: {
        ipRating: null,
        turnSignals: null,
        reflectors: null,
        horn: null,
      },
      shipping: {
        weightKg: 50,
        seatsAmount: 1,
        boxes: [
          {
            dimensions: '140x75x70',
            weightKg: 50,
          },
        ],
        cargoDescription: 'Електросамокат Teverun Supreme Ultra 7260',
        cargoType: null,
      },
    },
    variants: [],
    colors: [],
    highlights: ['Smart BMS', 'APP', 'PKE', 'NFC', 'GPS'],
    highlightsUk: ['Smart BMS', 'APP', 'PKE', 'NFC', 'GPS'],
    relatedProductIds: [],
  },

  // Teverun Supreme 7260R V4 - merged from hysco (primary) + hiley
  {
    id: 'teverun-supreme-7260r-v4',
    slug: 'teverun-supreme-7260r',
    sku: 'HYP-TS7-001',
    brandId: 'teverun',
    productType: 'scooter',
    name: 'Teverun Supreme 7260R V4',
    nameUk: 'Teverun Supreme 7260R V4',
    shortDescription: 'Найпотужніший серійний самокат у світі — 15000W, швидкість 120 км/год',
    shortDescriptionUk: 'Найпотужніший серійний самокат у світі — 15000W, швидкість 120 км/год',
    description: 'Teverun Supreme 7260R V4 — найпотужніший серійний електросамокат у світі. 15000W сумарної потужності, максимальна швидкість 120 км/год, батарея 72V 60Ah із запасом ходу до 180 км. Smart BMS, мобільний додаток, PKE, NFC та GPS — повний набір технологій для абсолютного контролю.',
    descriptionUk: 'Teverun Supreme 7260R V4 — найпотужніший серійний електросамокат у світі. 15000W сумарної потужності, максимальна швидкість 120 км/год, батарея 72V 60Ah із запасом ходу до 180 км. Smart BMS, мобільний додаток, PKE, NFC та GPS — повний набір технологій для абсолютного контролю.',
    priceUsdCents: 430000,
    originalPriceUsdCents: null,
    costUsdCents: null,
    availability: 'pre_order',
    purchaseModel: 'consultation',
    stockQuantity: null,
    lowStockThreshold: null,
    featured: true,
    order: 103,
    categoryIds: ['tier-hyper', 'use-case-performance'],
    tags: ['teverun', 'hyper', 'high-performance', 'flagship', 'most-powerful'],
    domains: ['hysco.com.ua'],
    media: {
      images: ['/products/hyper/teverun-supreme-7260r.webp'],
      videos: [],
      youtubeIds: [],
    },
    seo: {
      title: null,
      titleUk: null,
      description: null,
      descriptionUk: null,
      keywords: [],
      ogImage: null,
    },
    warranty: '6 months',
    warrantyUk: '6 місяців',
    rating: 4.9,
    reviewCount: 8,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    metadata: {
      prepaymentTerms: {
        type: 'percentage',
        amount: 60,
        descriptionUk: '60% передоплата (високовартісний товар)',
      },
      note: 'Найпотужніший серійний самокат',
    },
    series: 'Supreme',
    model: 'Supreme 7260R V4',
    specs: {
      motor: {
        count: 2,
        powerPerMotor: 7500,
        totalPower: 15000,
        peakPower: null,
        type: 'hub',
      },
      battery: {
        voltage: 72,
        voltageMin: null,
        capacityAh: 60,
        capacityAhMin: null,
        wattHours: null,
        cells: null,
        chargeTimeMin: null,
        chargeTimeMax: null,
        chargerSpec: null,
      },
      performance: {
        maxSpeed: 120,
        maxSpeedLimited: null,
        range: 180,
        maxIncline: null,
        maxLoad: null,
      },
      chassis: {
        weight: null,
        wheelSize: null,
        wheelType: null,
        foldable: null,
        dimensions: null,
        foldedDimensions: null,
        brakeType: null,
        brakePistons: null,
        suspensionFront: null,
        suspensionRear: null,
        suspensionAdjustable: null,
      },
      electronics: {
        display: null,
        nfc: true,
        app: true,
        alarm: null,
        alarmWithWheelLock: null,
        cruiseControl: null,
        regenerativeBrake: null,
        dualMotorMode: null,
        rgbLeds: null,
      },
      safety: {
        ipRating: null,
        turnSignals: null,
        reflectors: null,
        horn: null,
      },
      shipping: {
        weightKg: 50,
        seatsAmount: 1,
        boxes: [
          {
            dimensions: '140x75x70',
            weightKg: 50,
          },
        ],
        cargoDescription: 'Електросамокат Teverun Supreme 7260R V4',
        cargoType: null,
      },
    },
    variants: [],
    colors: [],
    highlights: ['Smart BMS', 'APP', 'PKE', 'NFC', 'GPS'],
    highlightsUk: ['Smart BMS', 'APP', 'PKE', 'NFC', 'GPS'],
    relatedProductIds: [],
  },

  // Inmotion RS - merged from hysco (primary) + hiley
  {
    id: 'inmotion-rs',
    slug: 'inmotion-rs',
    sku: 'HYP-IRS-001',
    brandId: 'inmotion',
    productType: 'scooter',
    name: 'Inmotion RS',
    nameUk: 'Inmotion RS',
    shortDescription: 'Преміальний самокат з найкращим водозахистом IPX6/IPX7 та регулюванням кліренсу',
    shortDescriptionUk: 'Преміальний самокат з найкращим водозахистом IPX6/IPX7 та регулюванням кліренсу',
    description: 'Inmotion RS — преміальний електросамокат з найкращим водозахистом IPX6/IPX7 у класі. Регулювання кліренсу, Smart BMS, потужний двигун 8400W. Батарея 72V 40Ah забезпечує запас ходу до 120 км. Еталон якості збірки та інженерії.',
    descriptionUk: 'Inmotion RS — преміальний електросамокат з найкращим водозахистом IPX6/IPX7 у класі. Регулювання кліренсу, Smart BMS, потужний двигун 8400W. Батарея 72V 40Ah забезпечує запас ходу до 120 км. Еталон якості збірки та інженерії.',
    priceUsdCents: 420000,
    originalPriceUsdCents: null,
    costUsdCents: null,
    availability: 'pre_order',
    purchaseModel: 'consultation',
    stockQuantity: null,
    lowStockThreshold: null,
    featured: false,
    order: 104,
    categoryIds: ['tier-hyper', 'use-case-performance'],
    tags: ['inmotion', 'hyper', 'premium', 'waterproof'],
    domains: ['hysco.com.ua'],
    media: {
      images: ['/products/hyper/inmotion-rs.webp'],
      videos: [],
      youtubeIds: [],
    },
    seo: {
      title: null,
      titleUk: null,
      description: null,
      descriptionUk: null,
      keywords: [],
      ogImage: null,
    },
    warranty: '6 months',
    warrantyUk: '6 місяців',
    rating: 4.7,
    reviewCount: 15,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    metadata: {
      prepaymentTerms: {
        type: 'percentage',
        amount: 60,
        descriptionUk: '60% передоплата (високовартісний товар)',
      },
    },
    series: 'premium',
    model: 'RS',
    specs: {
      motor: {
        count: 2,
        powerPerMotor: 4200,
        totalPower: 8400,
        peakPower: null,
        type: 'hub',
      },
      battery: {
        voltage: 72,
        voltageMin: null,
        capacityAh: 40,
        capacityAhMin: null,
        wattHours: null,
        cells: null,
        chargeTimeMin: null,
        chargeTimeMax: null,
        chargerSpec: null,
      },
      performance: {
        maxSpeed: 105,
        maxSpeedLimited: null,
        range: 120,
        maxIncline: null,
        maxLoad: null,
      },
      chassis: {
        weight: null,
        wheelSize: null,
        wheelType: null,
        foldable: null,
        dimensions: null,
        foldedDimensions: null,
        brakeType: null,
        brakePistons: null,
        suspensionFront: null,
        suspensionRear: null,
        suspensionAdjustable: null,
      },
      electronics: {
        display: null,
        nfc: null,
        app: true,
        alarm: null,
        alarmWithWheelLock: null,
        cruiseControl: null,
        regenerativeBrake: null,
        dualMotorMode: null,
        rgbLeds: null,
      },
      safety: {
        ipRating: 'IPX6',
        turnSignals: null,
        reflectors: null,
        horn: null,
      },
      shipping: {
        weightKg: 50,
        seatsAmount: 1,
        boxes: [
          {
            dimensions: '140x75x70',
            weightKg: 50,
          },
        ],
        cargoDescription: 'Електросамокат Inmotion RS',
        cargoType: null,
      },
    },
    variants: [],
    colors: [],
    highlights: ['IPX6/IPX7', 'Регулювання кліренсу', 'Smart BMS', 'App'],
    highlightsUk: ['IPX6/IPX7', 'Регулювання кліренсу', 'Smart BMS', 'App'],
    relatedProductIds: [],
  },

  // Nami Burn-E 3 Max - unique to hiley (DIFFERENT from Burn-E MAX)
  {
    id: 'nami-burn-e3-max',
    slug: 'nami-burn-e3-max',
    sku: 'HYP-NBE3-001',
    brandId: 'nami',
    productType: 'scooter',
    name: 'Nami Burn-E 3 Max',
    nameUk: 'Nami Burn-E 3 Max',
    shortDescription: 'Високопродуктивний самокат з потужністю 8400W, швидкістю 100 км/год та великим дисплеєм',
    shortDescriptionUk: 'Високопродуктивний самокат з потужністю 8400W, швидкістю 100 км/год та великим дисплеєм',
    description: 'Nami Burn-E 3 Max — флагманський електросамокат з потужністю 8400W, швидкістю до 100 км/год та великим TFT-дисплеєм. Карбонова колонка керма та гідравлічна підвіска.',
    descriptionUk: 'Nami Burn-E 3 Max — флагманський електросамокат з потужністю 8400W, швидкістю до 100 км/год та великим TFT-дисплеєм. Карбонова колонка керма та гідравлічна підвіска.',
    priceUsdCents: 399900,
    originalPriceUsdCents: null,
    costUsdCents: null,
    availability: 'pre_order',
    purchaseModel: 'consultation',
    stockQuantity: null,
    lowStockThreshold: null,
    featured: false,
    order: 105,
    categoryIds: ['tier-hyper', 'use-case-performance'],
    tags: ['nami', 'hyper', 'high-performance'],
    domains: ['hysco.com.ua'],
    media: {
      images: ['/products/hyper/nami-burn-e-max.webp'],
      videos: [],
      youtubeIds: [],
    },
    seo: {
      title: null,
      titleUk: null,
      description: null,
      descriptionUk: null,
      keywords: [],
      ogImage: null,
    },
    warranty: '6 months',
    warrantyUk: '6 місяців',
    rating: null,
    reviewCount: 0,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    metadata: {
      prepaymentTerms: {
        type: 'percentage',
        amount: 60,
        descriptionUk: '60% передоплата (високовартісний товар)',
      },
    },
    series: 'Burn-E',
    model: 'Burn-E 3 Max',
    specs: {
      motor: {
        count: null,
        powerPerMotor: null,
        totalPower: 8400,
        peakPower: null,
        type: null,
      },
      battery: {
        voltage: 72,
        voltageMin: null,
        capacityAh: 40,
        capacityAhMin: null,
        wattHours: null,
        cells: null,
        chargeTimeMin: null,
        chargeTimeMax: null,
        chargerSpec: null,
      },
      performance: {
        maxSpeed: 100,
        maxSpeedLimited: null,
        range: 120,
        maxIncline: null,
        maxLoad: null,
      },
      chassis: {
        weight: null,
        wheelSize: null,
        wheelType: null,
        foldable: null,
        dimensions: null,
        foldedDimensions: null,
        brakeType: null,
        brakePistons: null,
        suspensionFront: null,
        suspensionRear: null,
        suspensionAdjustable: null,
      },
      electronics: {
        display: 'large',
        nfc: null,
        app: null,
        alarm: null,
        alarmWithWheelLock: null,
        cruiseControl: null,
        regenerativeBrake: null,
        dualMotorMode: null,
        rgbLeds: null,
      },
      safety: {
        ipRating: null,
        turnSignals: null,
        reflectors: null,
        horn: null,
      },
      shipping: {
        weightKg: 55, // 50kg + 5kg packaging estimate
        seatsAmount: 1,
        boxes: [
          {
            dimensions: '140x75x70',
            weightKg: 55,
          },
        ],
        cargoDescription: 'Електросамокат Nami Burn-E 3 Max',
        cargoType: null,
      },
    },
    variants: [],
    colors: [],
    highlights: ['Великий дисплей', "М'яка підвіска"],
    highlightsUk: ['Великий дисплей', "М'яка підвіска"],
    relatedProductIds: [],
  },

  // Mars GTR / Teewing XTR - merged from hysco (primary) + hiley
  {
    id: 'mars-gtr-xtr',
    slug: 'mars-gtr-xtr',
    sku: 'HYP-MGX-001',
    brandId: 'mars',
    productType: 'scooter',
    name: 'Mars GTR / Teewing XTR',
    nameUk: 'Mars GTR / Teewing XTR',
    shortDescription: 'Мотоциклетна вилка, вбудований пожежогасник, порт під інвертор',
    shortDescriptionUk: 'Мотоциклетна вилка, вбудований пожежогасник, порт під інвертор',
    description: 'Mars GTR / Teewing XTR — самокат із мотоциклетною вилкою для максимальної стабільності на швидкості. Унікальні особливості: вбудований пожежогасник та порт під інвертор. 9000W потужності, батарея до 45Ah, запас ходу до 110 км.',
    descriptionUk: 'Mars GTR / Teewing XTR — самокат із мотоциклетною вилкою для максимальної стабільності на швидкості. Унікальні особливості: вбудований пожежогасник та порт під інвертор. 9000W потужності, батарея до 45Ah, запас ходу до 110 км.',
    priceUsdCents: 400000,
    originalPriceUsdCents: null,
    costUsdCents: null,
    availability: 'pre_order',
    purchaseModel: 'consultation',
    stockQuantity: null,
    lowStockThreshold: null,
    featured: false,
    order: 106,
    categoryIds: ['tier-hyper', 'use-case-performance'],
    tags: ['mars', 'hyper', 'extreme', 'motorcycle-fork'],
    domains: ['hysco.com.ua'],
    media: {
      images: ['/products/hyper/mars-gtr-xtr.webp'],
      videos: [],
      youtubeIds: [],
    },
    seo: {
      title: null,
      titleUk: null,
      description: null,
      descriptionUk: null,
      keywords: [],
      ogImage: null,
    },
    warranty: '6 months',
    warrantyUk: '6 місяців',
    rating: 4.5,
    reviewCount: 10,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    metadata: {
      prepaymentTerms: {
        type: 'percentage',
        amount: 60,
        descriptionUk: '60% передоплата (високовартісний товар)',
      },
    },
    series: 'extreme',
    model: 'GTR / Teewing XTR',
    specs: {
      motor: {
        count: 2,
        powerPerMotor: 4500,
        totalPower: 9000,
        peakPower: null,
        type: 'hub',
      },
      battery: {
        voltage: 72,
        voltageMin: null,
        capacityAh: 45,
        capacityAhMin: 35,
        wattHours: null,
        cells: null,
        chargeTimeMin: null,
        chargeTimeMax: null,
        chargerSpec: null,
      },
      performance: {
        maxSpeed: 107,
        maxSpeedLimited: null,
        range: 110,
        maxIncline: null,
        maxLoad: null,
      },
      chassis: {
        weight: null,
        wheelSize: null,
        wheelType: null,
        foldable: null,
        dimensions: null,
        foldedDimensions: null,
        brakeType: null,
        brakePistons: null,
        suspensionFront: 'motorcycle fork',
        suspensionRear: null,
        suspensionAdjustable: null,
      },
      electronics: {
        display: null,
        nfc: null,
        app: null,
        alarm: null,
        alarmWithWheelLock: null,
        cruiseControl: null,
        regenerativeBrake: null,
        dualMotorMode: null,
        rgbLeds: null,
      },
      safety: {
        ipRating: null,
        turnSignals: null,
        reflectors: null,
        horn: null,
      },
      shipping: {
        weightKg: 50,
        seatsAmount: 1,
        boxes: [
          {
            dimensions: '140x75x70',
            weightKg: 50,
          },
        ],
        cargoDescription: 'Електросамокат Mars GTR / Teewing XTR',
        cargoType: null,
      },
    },
    variants: [],
    colors: [],
    highlights: ['Мотоциклетна вилка', 'Вбудований пожежогасник', 'Порт під інвертор'],
    highlightsUk: ['Мотоциклетна вилка', 'Вбудований пожежогасник', 'Порт під інвертор'],
    relatedProductIds: [],
  },

  // Surron Light Bee 2025 - merged from hysco (primary) + hiley
  {
    id: 'surron-light-bee-2025',
    slug: 'surron-light-bee',
    sku: 'HYP-SLB-001',
    brandId: 'surron',
    productType: 'scooter',
    name: 'Surron Light Bee 2025',
    nameUk: 'Surron Light Bee 2025',
    shortDescription: 'Лідер категорії електробайків для бездоріжжя — 8000W потужності',
    shortDescriptionUk: 'Лідер категорії електробайків для бездоріжжя — 8000W потужності',
    description: 'Surron Light Bee 2025 — електробайк для бездоріжжя та лідер своєї категорії. 8000W потужності, батарея 72V 40Ah, максимальна швидкість 80 км/год. Створений для пригод поза асфальтом.',
    descriptionUk: 'Surron Light Bee 2025 — електробайк для бездоріжжя та лідер своєї категорії. 8000W потужності, батарея 72V 40Ah, максимальна швидкість 80 км/год. Створений для пригод поза асфальтом.',
    priceUsdCents: 399900,
    originalPriceUsdCents: null,
    costUsdCents: null,
    availability: 'pre_order',
    purchaseModel: 'consultation',
    stockQuantity: null,
    lowStockThreshold: null,
    featured: false,
    order: 107,
    categoryIds: ['tier-altcar', 'use-case-offroad'],
    tags: ['surron', 'electric-bike', 'offroad', 'hyper'],
    domains: ['hysco.com.ua'],
    media: {
      images: ['/products/hyper/surron-light-bee.webp'],
      videos: [],
      youtubeIds: [],
    },
    seo: {
      title: null,
      titleUk: null,
      description: null,
      descriptionUk: null,
      keywords: [],
      ogImage: null,
    },
    warranty: '6 months',
    warrantyUk: '6 місяців',
    rating: 4.7,
    reviewCount: 14,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    metadata: {
      prepaymentTerms: {
        type: 'percentage',
        amount: 60,
        descriptionUk: '60% передоплата (високовартісний товар)',
      },
    },
    series: 'offroad',
    model: 'Light Bee 2025',
    specs: {
      motor: {
        count: 1,
        powerPerMotor: 8000,
        totalPower: 8000,
        peakPower: null,
        type: 'chain',
      },
      battery: {
        voltage: 72,
        voltageMin: null,
        capacityAh: 40,
        capacityAhMin: null,
        wattHours: null,
        cells: null,
        chargeTimeMin: null,
        chargeTimeMax: null,
        chargerSpec: null,
      },
      performance: {
        maxSpeed: 80,
        maxSpeedLimited: null,
        range: 90,
        maxIncline: null,
        maxLoad: null,
      },
      chassis: {
        weight: null,
        wheelSize: null,
        wheelType: null,
        foldable: null,
        dimensions: null,
        foldedDimensions: null,
        brakeType: null,
        brakePistons: null,
        suspensionFront: null,
        suspensionRear: null,
        suspensionAdjustable: null,
      },
      electronics: {
        display: null,
        nfc: null,
        app: null,
        alarm: null,
        alarmWithWheelLock: null,
        cruiseControl: null,
        regenerativeBrake: null,
        dualMotorMode: null,
        rgbLeds: null,
      },
      safety: {
        ipRating: null,
        turnSignals: null,
        reflectors: null,
        horn: null,
      },
      shipping: {
        weightKg: 50,
        seatsAmount: 1,
        boxes: [
          {
            dimensions: '140x75x70',
            weightKg: 50,
          },
        ],
        cargoDescription: 'Електросамокат Surron Light Bee 2025',
        cargoType: null,
      },
    },
    variants: [],
    colors: [],
    highlights: ['Електробайк для бездоріжжя'],
    highlightsUk: ['Електробайк для бездоріжжя'],
    relatedProductIds: [],
  },

  // Nanrobot LS7+ - unique to hiley
  {
    id: 'nanrobot-ls7-plus',
    slug: 'nanrobot-ls7',
    sku: 'HYP-NLS7-001',
    brandId: 'nanrobot',
    productType: 'scooter',
    name: 'Nanrobot LS7+',
    nameUk: 'Nanrobot LS7+',
    shortDescription: 'Високопродуктивний самокат з потужністю 7000W та швидкістю 100 км/год',
    shortDescriptionUk: 'Високопродуктивний самокат з потужністю 7000W та швидкістю 100 км/год',
    description: 'Nanrobot LS7+ — потужний електросамокат з двомоторною системою 7000W та швидкістю до 100 км/год. Великі колеса та гідравлічні гальма для безпечних поїздок.',
    descriptionUk: 'Nanrobot LS7+ — потужний електросамокат з двомоторною системою 7000W та швидкістю до 100 км/год. Великі колеса та гідравлічні гальма для безпечних поїздок.',
    priceUsdCents: 340000,
    originalPriceUsdCents: null,
    costUsdCents: null,
    availability: 'pre_order',
    purchaseModel: 'consultation',
    stockQuantity: null,
    lowStockThreshold: null,
    featured: false,
    order: 108,
    categoryIds: ['tier-hyper', 'use-case-performance'],
    tags: ['nanrobot', 'hyper', 'high-performance'],
    domains: ['hysco.com.ua'],
    media: {
      images: ['/products/hyper/nanrobot-ls7.webp'],
      videos: [],
      youtubeIds: [],
    },
    seo: {
      title: null,
      titleUk: null,
      description: null,
      descriptionUk: null,
      keywords: [],
      ogImage: null,
    },
    warranty: '6 months',
    warrantyUk: '6 місяців',
    rating: null,
    reviewCount: 0,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    metadata: {
      prepaymentTerms: {
        type: 'percentage',
        amount: 60,
        descriptionUk: '60% передоплата (високовартісний товар)',
      },
    },
    series: 'LS',
    model: 'LS7+',
    specs: {
      motor: {
        count: null,
        powerPerMotor: null,
        totalPower: 7000,
        peakPower: null,
        type: null,
      },
      battery: {
        voltage: 72,
        voltageMin: null,
        capacityAh: 35,
        capacityAhMin: null,
        wattHours: null,
        cells: null,
        chargeTimeMin: null,
        chargeTimeMax: null,
        chargerSpec: null,
      },
      performance: {
        maxSpeed: 100,
        maxSpeedLimited: null,
        range: 100,
        maxIncline: null,
        maxLoad: null,
      },
      chassis: {
        weight: null,
        wheelSize: null,
        wheelType: null,
        foldable: null,
        dimensions: null,
        foldedDimensions: null,
        brakeType: null,
        brakePistons: null,
        suspensionFront: null,
        suspensionRear: null,
        suspensionAdjustable: null,
      },
      electronics: {
        display: null,
        nfc: null,
        app: null,
        alarm: null,
        alarmWithWheelLock: null,
        cruiseControl: null,
        regenerativeBrake: null,
        dualMotorMode: null,
        rgbLeds: null,
      },
      safety: {
        ipRating: null,
        turnSignals: null,
        reflectors: null,
        horn: null,
      },
      shipping: {
        weightKg: 55, // 50kg + 5kg packaging estimate
        seatsAmount: 1,
        boxes: [
          {
            dimensions: '140x75x70',
            weightKg: 55,
          },
        ],
        cargoDescription: 'Електросамокат Nanrobot LS7+',
        cargoType: null,
      },
    },
    variants: [],
    colors: [],
    highlights: [],
    highlightsUk: [],
    relatedProductIds: [],
  },
];

/**
 * Tiger scooters from hiley.com.ua
 * Migrated from tiger-series-products.json
 * Total: 15 products
 * 
 * Migration completed: All 15 Tiger scooters successfully mapped to new schema
 * - 2 Premium tier (11" wheels): KING RS, SUPRA
 * - 7 Mid tier (10" wheels): 10 GTR, 10 V4 VLR, 10 GT, 10 V5 PERFORMANCE, 10 V4 LR, 10 V4, 10 V5
 * - 3 EVO tier (8-10" city): EVO GTR, EVO GT, EVO
 * - 3 Entry tier (MAX series): MAX GTR, 8 GTR V4, MAX GT
 */
export const tigerScooters: Scooter[] = [
{
    id: 'tiger-king-rs',
    slug: 'tiger-king-rs',
    sku: 'T-HILEY-TIGER-KING-RS',
    brandId: 'tiger',
    productType: 'scooter',
    name: 'Tiger KING RS',
    nameUk: 'Tiger KING RS',
    shortDescription: 'Флагманський самокат з 11-дюймовими колесами та гідравлічною підвіскою. Два мотори з піковою потужністю 5800W розганяють до 90 км/год та забезпечують 135 км запасу ходу.',
    shortDescriptionUk: 'Флагманський самокат з 11-дюймовими колесами та гідравлічною підвіскою. Два мотори з піковою потужністю 5800W розганяють до 90 км/год та забезпечують 135 км запасу ходу.',
    description: 'Tiger KING RS — це вершина інженерної думки Hiley, створений для тих, хто не йде на компроміси. Двомоторна система потужністю 4600W розганяє самокат до 90 км/год, а преміальна батарея Samsung 35Ah забезпечує неймовірні 135 км на одному заряді.\n\nГідравлічна підвіска з регулюванням поглинає будь-які нерівності, перетворюючи кожну поїздку на задоволення. 11-дюймові безкамерні шини та 4-поршневі гальма NUTT гарантують впевненість на будь-якій швидкості.\n\nNFC-замок, RGB-підсвітка, мобільний додаток та поворотники — KING RS має все, що потрібно сучасному райдеру. Водозахист IPX6 дозволяє їздити в будь-яку погоду.',
    descriptionUk: 'Tiger KING RS — це вершина інженерної думки Hiley, створений для тих, хто не йде на компроміси. Двомоторна система потужністю 4600W розганяє самокат до 90 км/год, а преміальна батарея Samsung 35Ah забезпечує неймовірні 135 км на одному заряді.\n\nГідравлічна підвіска з регулюванням поглинає будь-які нерівності, перетворюючи кожну поїздку на задоволення. 11-дюймові безкамерні шини та 4-поршневі гальма NUTT гарантують впевненість на будь-якій швидкості.\n\nNFC-замок, RGB-підсвітка, мобільний додаток та поворотники — KING RS має все, що потрібно сучасному райдеру. Водозахист IPX6 дозволяє їздити в будь-яку погоду.',
    priceUsdCents: 330000,
    originalPriceUsdCents: 368900,
    costUsdCents: null,
    availability: 'pre_order',
    purchaseModel: 'consultation',
    stockQuantity: 0,
    lowStockThreshold: null,
    featured: true,
    order: 100,
    categoryIds: [
      'tier-premium',
      'use-case-performance'
    ],
    tags: [
      'tiger',
      'king-rs',
      'hiley'
    ],
    domains: [
      'hiley.com.ua',
      'hysco.com.ua'
    ],
    media: {
      images: [
        '/products/tiger-king-rs/main.webp',
        '/products/tiger-king-rs/folded.webp',
        '/products/tiger-king-rs/front.webp',
        '/products/tiger-king-rs/rear.webp'
      ],
      videos: [],
      youtubeIds: [
        'F5Q64P4nvt0'
      ]
    },
    seo: {
      title: null,
      titleUk: null,
      description: null,
      descriptionUk: null,
      keywords: [],
      ogImage: null
    },
    warranty: '24 months',
    warrantyUk: '24 місяці',
    rating: null,
    reviewCount: 0,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    metadata: {
      prepaymentTerms: {
        type: 'percentage',
        amount: 50,
        descriptionUk: '50% передоплата'
      }
    },
    series: 'Tiger',
    model: 'KING RS',
    specs: {
      motor: {
        count: 2,
        powerPerMotor: 2300,
        totalPower: 5800,
        peakPower: null,
        type: 'hub'
      },
      battery: {
        voltage: 72,
        voltageMin: null,
        capacityAh: 35,
        capacityAhMin: null,
        wattHours: 2520,
        cells: 'Samsung',
        chargeTimeMin: 6,
        chargeTimeMax: 12,
        chargerSpec: null
      },
      performance: {
        maxSpeed: 90,
        maxSpeedLimited: 20,
        range: 135,
        maxIncline: 35,
        maxLoad: 130
      },
      chassis: {
        weight: 40,
        wheelSize: 11,
        wheelType: 'tubeless',
        foldable: true,
        dimensions: null,
        foldedDimensions: null,
        brakeType: 'NUTT hydraulic disc 4-piston',
        brakePistons: 4,
        suspensionFront: 'hydraulic',
        suspensionRear: 'hydraulic',
        suspensionAdjustable: true
      },
      electronics: {
        display: 'LED',
        nfc: true,
        app: true,
        alarm: true,
        alarmWithWheelLock: true,
        cruiseControl: true,
        regenerativeBrake: true,
        dualMotorMode: true,
        rgbLeds: true
      },
      safety: {
        ipRating: 'IPX7',
        turnSignals: true,
        reflectors: null,
        horn: null
      },
      shipping: {
        weightKg: 45,
        seatsAmount: 1,
        boxes: [
          {
            dimensions: '140x75x70',
            weightKg: 45
          }
        ],
        cargoDescription: 'Електросамокат Tiger KING RS',
        cargoType: null
      }
    },
    variants: [],
    colors: [],
    highlights: [
      '11" tubeless wheels',
      'Samsung 72V 35Ah battery',
      'NUTT 4-piston brakes',
      'Adjustable hydraulic suspension'
    ],
    highlightsUk: [
      '11" безкамерні колеса',
      'Samsung батарея 72V 35Ah',
      'NUTT 4-поршневі гальма',
      'Регульована гідропідвіска'
    ],
    relatedProductIds: []
  },

{
    id: 'tiger-supra-pro',
    slug: 'tiger-supra-pro',
    sku: 'T-HILEY-TIGER-SUPRA',
    brandId: 'tiger',
    productType: 'scooter',
    name: 'Tiger SUPRA',
    nameUk: 'Tiger SUPRA',
    shortDescription: 'Преміальний самокат з двомоторною системою та гідропідвіскою. Пікова потужність 4700W дозволяє досягати 85 км/год з запасом ходу 105 км.',
    shortDescriptionUk: 'Преміальний самокат з двомоторною системою та гідропідвіскою. Пікова потужність 4700W дозволяє досягати 85 км/год з запасом ходу 105 км.',
    description: 'Tiger SUPRA — це потужний флагман лінійки з двомоторною системою 3200W та максимальною швидкістю 85 км/год. Гідравлічна підвіска з регулюванням забезпечує комфорт на будь-якій дорозі.\n\n11-дюймові безкамерні колеса та 4-поршневі гальма NUTT — стандарт безпеки преміум-класу. NFC-замок, RGB-підсвітка, мобільний додаток та поворотники входять у стандартну комплектацію.\n\nВодозахист IPX6 дозволяє не боятися дощу. Обирайте батарею під ваші потреби: BASE, PRO або MAX.',
    descriptionUk: 'Tiger SUPRA — це потужний флагман лінійки з двомоторною системою 3200W та максимальною швидкістю 85 км/год. Гідравлічна підвіска з регулюванням забезпечує комфорт на будь-якій дорозі.\n\n11-дюймові безкамерні колеса та 4-поршневі гальма NUTT — стандарт безпеки преміум-класу. NFC-замок, RGB-підсвітка, мобільний додаток та поворотники входять у стандартну комплектацію.\n\nВодозахист IPX6 дозволяє не боятися дощу. Обирайте батарею під ваші потреби: BASE, PRO або MAX.',
    priceUsdCents: 260000,
    originalPriceUsdCents: 290000,
    costUsdCents: null,
    availability: 'in_stock',
    purchaseModel: 'consultation',
    stockQuantity: 5,
    lowStockThreshold: null,
    featured: true,
    order: 101,
    categoryIds: [
      'tier-premium',
      'use-case-performance'
    ],
    tags: [
      'tiger',
      'supra',
      'hiley'
    ],
    domains: [
      'hiley.com.ua',
      'hysco.com.ua'
    ],
    media: {
      images: [
        '/products/tiger-supra-pro/main.webp',
        '/products/tiger-supra-pro/display.webp',
        '/products/tiger-supra-pro/folded.webp',
        '/products/tiger-supra-pro/front.webp',
        '/products/tiger-supra-pro/rear.webp'
      ],
      videos: [],
      youtubeIds: [
        'LTRlHErCGGU'
      ]
    },
    seo: {
      title: null,
      titleUk: null,
      description: null,
      descriptionUk: null,
      keywords: [],
      ogImage: null
    },
    warranty: '24 months',
    warrantyUk: '24 місяці',
    rating: null,
    reviewCount: 0,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    metadata: {
      prepaymentTerms: {
        type: 'percentage',
        amount: 50,
        descriptionUk: '50% передоплата'
      }
    },
    series: 'Tiger',
    model: 'SUPRA',
    specs: {
      motor: {
        count: 2,
        powerPerMotor: 1600,
        totalPower: 4700,
        peakPower: null,
        type: 'hub'
      },
      battery: {
        voltage: 60,
        voltageMin: null,
        capacityAh: 31.5,
        capacityAhMin: null,
        wattHours: 1890,
        cells: 'DMEGC',
        chargeTimeMin: 5,
        chargeTimeMax: 10,
        chargerSpec: '67.2V 3.5A'
      },
      performance: {
        maxSpeed: 85,
        maxSpeedLimited: 20,
        range: 105,
        maxIncline: 30,
        maxLoad: 130
      },
      chassis: {
        weight: 38,
        wheelSize: 11,
        wheelType: 'tubeless',
        foldable: true,
        dimensions: null,
        foldedDimensions: null,
        brakeType: 'NUTT hydraulic disc 4-piston',
        brakePistons: 4,
        suspensionFront: 'hydraulic',
        suspensionRear: 'hydraulic',
        suspensionAdjustable: true
      },
      electronics: {
        display: 'LED',
        nfc: true,
        app: true,
        alarm: true,
        alarmWithWheelLock: true,
        cruiseControl: true,
        regenerativeBrake: true,
        dualMotorMode: true,
        rgbLeds: true
      },
      safety: {
        ipRating: 'IPX7',
        turnSignals: true,
        reflectors: null,
        horn: null
      },
      shipping: {
        weightKg: 43,
        seatsAmount: 1,
        boxes: [
          {
            dimensions: '140x75x70',
            weightKg: 43
          }
        ],
        cargoDescription: 'Електросамокат Tiger SUPRA',
        cargoType: null
      }
    },
    variants: [
      {
        id: 'tiger-supra-pro',
        sku: 'T-HILEY-TIGER-SUPRA-PRO',
        name: 'PRO (35Ah)',
        nameUk: 'PRO (35Ah)',
        priceUsdCents: 285000,
        originalPriceUsdCents: 312900,
        inStock: true,
        stockQuantity: 3,
        specsOverride: {
          battery: {
            voltage: 60,
            voltageMin: null,
            capacityAh: 35,
            capacityAhMin: null,
            wattHours: 2100,
            cells: 'Samsung',
            chargeTimeMin: 6,
            chargeTimeMax: 12,
            chargerSpec: '67.2V 3.5A',
          },
          performance: {
            maxSpeed: 85,
            maxSpeedLimited: 20,
            range: 120,
            maxIncline: 30,
            maxLoad: 130,
          },
        },
        images: [],
        order: 0,
      },
      {
        id: 'tiger-supra-max',
        sku: 'T-HILEY-TIGER-SUPRA-MAX',
        name: 'MAX (40Ah)',
        nameUk: 'MAX (40Ah)',
        priceUsdCents: 300000,
        originalPriceUsdCents: 330000,
        inStock: true,
        stockQuantity: 2,
        specsOverride: {
          battery: {
            voltage: 60,
            voltageMin: null,
            capacityAh: 40,
            capacityAhMin: null,
            wattHours: 2400,
            cells: 'Samsung',
            chargeTimeMin: 7,
            chargeTimeMax: 14,
            chargerSpec: '67.2V 3.5A',
          },
          performance: {
            maxSpeed: 85,
            maxSpeedLimited: 20,
            range: 135,
            maxIncline: 30,
            maxLoad: 130,
          },
        },
        images: [],
        order: 1,
      },
    ],
    colors: [],
    highlights: [
      '11" tubeless wheels',
      'NFC lock',
      'IPX6 waterproof',
      'RGB lighting'
    ],
    highlightsUk: [
      '11" безкамерні колеса',
      'NFC замок',
      'IPX6 водозахист',
      'RGB підсвітка'
    ],
    relatedProductIds: []
  },

{
    id: 'tiger-10-gtr',
    slug: 'tiger-10-gtr',
    sku: 'T-HILEY-TIGER-10-GTR',
    brandId: 'tiger',
    productType: 'scooter',
    name: 'Tiger 10 GTR',
    nameUk: 'Tiger 10 GTR',
    shortDescription: 'Спортивний GTR з водозахистом IPX7. Два мотори з піковою потужністю 4500W забезпечують 75 км/год та 90 км запасу.',
    shortDescriptionUk: 'Спортивний GTR з водозахистом IPX7. Два мотори з піковою потужністю 4500W забезпечують 75 км/год та 90 км запасу.',
    description: 'Tiger 10 GTR — це справжній спортивний характер у форматі міського транспорту. Пікова потужність 4000W та два мотори по 1400W забезпечують швидке прискорення та впевнене подолання підйомів до 30°.\n\n10-дюймові пневматичні колеса та гідравлічна підвіска з регулюванням створюють ідеальний баланс між спортивністю та комфортом. Батарея Samsung 30Ah дає 90 км запасу ходу — достатньо для найдовших маршрутів.\n\nГідравлічні гальма NUTT, NFC-замок, RGB-підсвітка та поворотники входять у стандартну комплектацію. Водозахист IPX6 дозволяє впевнено їздити в дощ. GTR — для тих, хто цінує динаміку та надійність.',
    descriptionUk: 'Tiger 10 GTR — це справжній спортивний характер у форматі міського транспорту. Пікова потужність 4000W та два мотори по 1400W забезпечують швидке прискорення та впевнене подолання підйомів до 30°.\n\n10-дюймові пневматичні колеса та гідравлічна підвіска з регулюванням створюють ідеальний баланс між спортивністю та комфортом. Батарея Samsung 30Ah дає 90 км запасу ходу — достатньо для найдовших маршрутів.\n\nГідравлічні гальма NUTT, NFC-замок, RGB-підсвітка та поворотники входять у стандартну комплектацію. Водозахист IPX6 дозволяє впевнено їздити в дощ. GTR — для тих, хто цінує динаміку та надійність.',
    priceUsdCents: 210000,
    originalPriceUsdCents: 285900,
    costUsdCents: null,
    availability: 'discontinued',
    purchaseModel: 'consultation',
    stockQuantity: 3,
    lowStockThreshold: null,
    featured: false,
    order: 102,
    categoryIds: [
      'tier-mid',
      'use-case-performance'
    ],
    tags: [
      'tiger',
      '10-gtr',
      'hiley'
    ],
    domains: [
      'hiley.com.ua'
    ],
    media: {
      images: [
        '/products/tiger-10-gtr/main.webp',
        '/products/tiger-10-gtr/handlebar.webp',
        '/products/tiger-10-gtr/front.webp',
        '/products/tiger-10-gtr/rear.webp',
        '/products/tiger-10-gtr/wheel.webp'
      ],
      videos: [],
      youtubeIds: [
        'HeM_dwq3rig'
      ]
    },
    seo: {
      title: null,
      titleUk: null,
      description: null,
      descriptionUk: null,
      keywords: [],
      ogImage: null
    },
    warranty: '24 months',
    warrantyUk: '24 місяці',
    rating: null,
    reviewCount: 0,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    metadata: {
      prepaymentTerms: {
        type: 'percentage',
        amount: 50,
        descriptionUk: '50% передоплата'
      }
    },
    series: 'Tiger',
    model: '10 GTR',
    specs: {
      motor: {
        count: 2,
        powerPerMotor: 1400,
        totalPower: 4500,
        peakPower: null,
        type: 'hub'
      },
      battery: {
        voltage: 60,
        voltageMin: null,
        capacityAh: 30,
        capacityAhMin: null,
        wattHours: 1800,
        cells: 'Samsung',
        chargeTimeMin: 8,
        chargeTimeMax: 15,
        chargerSpec: null
      },
      performance: {
        maxSpeed: 75,
        maxSpeedLimited: 20,
        range: 90,
        maxIncline: 30,
        maxLoad: 120
      },
      chassis: {
        weight: 40,
        wheelSize: 10,
        wheelType: 'pneumatic',
        foldable: true,
        dimensions: '1320x680x1310',
        foldedDimensions: null,
        brakeType: 'NUTT hydraulic disc',
        brakePistons: null,
        suspensionFront: 'hydraulic',
        suspensionRear: 'hydraulic',
        suspensionAdjustable: true
      },
      electronics: {
        display: 'LED',
        nfc: true,
        app: true,
        alarm: false,
        alarmWithWheelLock: null,
        cruiseControl: true,
        regenerativeBrake: true,
        dualMotorMode: true,
        rgbLeds: true
      },
      safety: {
        ipRating: 'IPX7',
        turnSignals: true,
        reflectors: null,
        horn: null
      },
      shipping: {
        weightKg: 45,
        seatsAmount: 1,
        boxes: [
          {
            dimensions: '140x75x70',
            weightKg: 45
          }
        ],
        cargoDescription: 'Електросамокат Tiger 10 GTR',
        cargoType: null
      }
    },
    variants: [],
    colors: [],
    highlights: [
      '10" tubeless wheels',
      'Hydraulic suspension',
      'NFC + App',
      'IPX7 waterproof'
    ],
    highlightsUk: [
      '10" безкамерні колеса',
      'Гідропідвіска',
      'NFC + додаток',
      'IPX7 водозахист'
    ],
    relatedProductIds: []
  },

{
    id: 'tiger-10-v4-vlr',
    slug: 'tiger-10-v4-vlr',
    sku: 'T-HILEY-TIGER-10-V4-VLR',
    brandId: 'tiger',
    productType: 'scooter',
    name: 'Tiger 10 V4 VLR',
    nameUk: 'Tiger 10 V4 VLR',
    shortDescription: 'Рекордсмен за запасом ходу — проїдьте 100 км на одному заряді. Два мотори 3000W розганяють до 70 км/год.',
    shortDescriptionUk: 'Рекордсмен за запасом ходу — проїдьте 100 км на одному заряді. Два мотори 3000W розганяють до 70 км/год.',
    description: 'Tiger 10 V4 VLR (Very Long Range) — це рекордсмен серії V4 за запасом ходу. Батарея Samsung 28Ah забезпечує вражаючі 100 км на одному заряді, що робить цей самокат ідеальним для тих, хто їздить далеко і не хоче думати про зарядку.\n\nДвомоторна система 3000W та 10-дюймові безкамерні колеса гарантують комфортну та динамічну поїздку. Гідравлічна підвіска з регулюванням поглинає нерівності, а вага лише 29.5 кг робить самокат зручним для транспортування.\n\nПовний водозахист IPX7 дозволяє їздити в будь-яку погоду без обмежень. NFC-замок, мобільний додаток, RGB-підсвітка та поворотники — весь арсенал сучасного електротранспорту.',
    descriptionUk: 'Tiger 10 V4 VLR (Very Long Range) — це рекордсмен серії V4 за запасом ходу. Батарея Samsung 28Ah забезпечує вражаючі 100 км на одному заряді, що робить цей самокат ідеальним для тих, хто їздить далеко і не хоче думати про зарядку.\n\nДвомоторна система 3000W та 10-дюймові безкамерні колеса гарантують комфортну та динамічну поїздку. Гідравлічна підвіска з регулюванням поглинає нерівності, а вага лише 29.5 кг робить самокат зручним для транспортування.\n\nПовний водозахист IPX7 дозволяє їздити в будь-яку погоду без обмежень. NFC-замок, мобільний додаток, RGB-підсвітка та поворотники — весь арсенал сучасного електротранспорту.',
    priceUsdCents: 226900,
    originalPriceUsdCents: 261900,
    costUsdCents: null,
    availability: 'discontinued',
    purchaseModel: 'consultation',
    stockQuantity: 0,
    lowStockThreshold: null,
    featured: false,
    order: 103,
    categoryIds: [
      'tier-mid',
      'use-case-commute'
    ],
    tags: [
      'tiger',
      '10-v4-vlr',
      'hiley'
    ],
    domains: [
      'hiley.com.ua'
    ],
    media: {
      images: [
        '/products/tiger-10-v4-vlr/main.webp',
        '/products/tiger-10-v4-vlr/handlebar.webp',
        '/products/tiger-10-v4-vlr/front.webp',
        '/products/tiger-10-v4-vlr/rear.webp',
        '/products/tiger-10-v4-vlr/folded.webp'
      ],
      videos: [],
      youtubeIds: [
        '9ejhkNdnF2E'
      ]
    },
    seo: {
      title: null,
      titleUk: null,
      description: null,
      descriptionUk: null,
      keywords: [],
      ogImage: null
    },
    warranty: '24 months',
    warrantyUk: '24 місяці',
    rating: null,
    reviewCount: 0,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    metadata: {
      prepaymentTerms: {
        type: 'percentage',
        amount: 50,
        descriptionUk: '50% передоплата'
      }
    },
    series: 'Tiger',
    model: '10 V4 VLR',
    specs: {
      motor: {
        count: 2,
        powerPerMotor: 1000,
        totalPower: 3000,
        peakPower: null,
        type: 'hub'
      },
      battery: {
        voltage: 52,
        voltageMin: null,
        capacityAh: 28,
        capacityAhMin: null,
        wattHours: 1456,
        cells: 'Samsung',
        chargeTimeMin: 7,
        chargeTimeMax: 14,
        chargerSpec: null
      },
      performance: {
        maxSpeed: 70,
        maxSpeedLimited: 20,
        range: 100,
        maxIncline: 30,
        maxLoad: 120
      },
      chassis: {
        weight: 29.5,
        wheelSize: 10,
        wheelType: 'tubeless',
        foldable: true,
        dimensions: '1320x600x1215',
        foldedDimensions: null,
        brakeType: 'Hydraulic disc',
        brakePistons: null,
        suspensionFront: 'hydraulic',
        suspensionRear: 'hydraulic',
        suspensionAdjustable: true
      },
      electronics: {
        display: 'LED',
        nfc: true,
        app: true,
        alarm: false,
        alarmWithWheelLock: null,
        cruiseControl: true,
        regenerativeBrake: true,
        dualMotorMode: true,
        rgbLeds: true
      },
      safety: {
        ipRating: 'IPX7',
        turnSignals: true,
        reflectors: null,
        horn: null
      },
      shipping: {
        weightKg: 34.5,
        seatsAmount: 1,
        boxes: [
          {
            dimensions: '140x75x70',
            weightKg: 34.5
          }
        ],
        cargoDescription: 'Електросамокат Tiger 10 V4 VLR',
        cargoType: null
      }
    },
    variants: [],
    colors: [],
    highlights: [
      '10" tubeless wheels',
      'Hydraulic suspension',
      'NFC + App',
      'IPX7 waterproof'
    ],
    highlightsUk: [
      '10" безкамерні колеса',
      'Гідропідвіска',
      'NFC + додаток',
      'IPX7 водозахист'
    ],
    relatedProductIds: []
  },

{
    id: 'tiger-10-gt',
    slug: 'tiger-10-gt',
    sku: 'T-HILEY-TIGER-10-GT',
    brandId: 'tiger',
    productType: 'scooter',
    name: 'Tiger 10 GT',
    nameUk: 'Tiger 10 GT',
    shortDescription: 'Оптимальне співвідношення ціни та динаміки з двома моторами. Пікова потужність 3000W, швидкість до 75 км/год, запас 80 км.',
    shortDescriptionUk: 'Оптимальне співвідношення ціни та динаміки з двома моторами. Пікова потужність 3000W, швидкість до 75 км/год, запас 80 км.',
    description: 'Tiger 10 GT — це оптимальний вибір для тих, хто шукає баланс між ціною та можливостями. Два мотори загальною потужністю 3000W розганяють самокат до 75 км/год, а гнучка система варіантів батареї (23.4Ah або 26Ah) дозволяє обрати ідеальну конфігурацію.\n\n10-дюймові пневматичні колеса та гідравлічна підвіска з регулюванням забезпечують комфорт на будь-якому покритті. Гідравлічні гальма NUTT гарантують безпечне гальмування на високих швидкостях.\n\nNFC-замок захищає від викрадення, мобільний додаток дає повний контроль над налаштуваннями, а RGB-підсвітка та поворотники роблять вас помітним на дорозі. Водозахист IPX6 — їздіть у будь-яку погоду.',
    descriptionUk: 'Tiger 10 GT — це оптимальний вибір для тих, хто шукає баланс між ціною та можливостями. Два мотори загальною потужністю 3000W розганяють самокат до 75 км/год, а гнучка система варіантів батареї (23.4Ah або 26Ah) дозволяє обрати ідеальну конфігурацію.\n\n10-дюймові пневматичні колеса та гідравлічна підвіска з регулюванням забезпечують комфорт на будь-якому покритті. Гідравлічні гальма NUTT гарантують безпечне гальмування на високих швидкостях.\n\nNFC-замок захищає від викрадення, мобільний додаток дає повний контроль над налаштуваннями, а RGB-підсвітка та поворотники роблять вас помітним на дорозі. Водозахист IPX6 — їздіть у будь-яку погоду.',
    priceUsdCents: 239900,
    originalPriceUsdCents: 275900,
    costUsdCents: null,
    availability: 'in_stock',
    purchaseModel: 'consultation',
    stockQuantity: 4,
    lowStockThreshold: null,
    featured: false,
    order: 104,
    categoryIds: [
      'tier-mid',
      'use-case-commute'
    ],
    tags: [
      'tiger',
      '10-gt',
      'hiley'
    ],
    domains: [
      'hiley.com.ua'
    ],
    media: {
      images: [
        '/products/tiger-10-gt/main.webp',
        '/products/tiger-10-gt/handlebar.webp',
        '/products/tiger-10-gt/front.webp',
        '/products/tiger-10-gt/rear.webp',
        '/products/tiger-10-gt/wheel.webp'
      ],
      videos: [],
      youtubeIds: [
        'h72aGkylrOk'
      ]
    },
    seo: {
      title: null,
      titleUk: null,
      description: null,
      descriptionUk: null,
      keywords: [],
      ogImage: null
    },
    warranty: '24 months',
    warrantyUk: '24 місяці',
    rating: null,
    reviewCount: 0,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    metadata: {
      prepaymentTerms: {
        type: 'percentage',
        amount: 50,
        descriptionUk: '50% передоплата'
      }
    },
    series: 'Tiger',
    model: '10 GT',
    specs: {
      motor: {
        count: 2,
        powerPerMotor: 1400,
        totalPower: 3000,
        peakPower: null,
        type: 'hub'
      },
      battery: {
        voltage: 60,
        voltageMin: null,
        capacityAh: 23.4,
        capacityAhMin: null,
        wattHours: 1404,
        cells: 'DMEGC/EVE',
        chargeTimeMin: 6,
        chargeTimeMax: 13,
        chargerSpec: null
      },
      performance: {
        maxSpeed: 75,
        maxSpeedLimited: 20,
        range: 80,
        maxIncline: 30,
        maxLoad: 120
      },
      chassis: {
        weight: 35,
        wheelSize: 10,
        wheelType: 'pneumatic',
        foldable: true,
        dimensions: '1320x680x1310',
        foldedDimensions: null,
        brakeType: 'NUTT hydraulic disc',
        brakePistons: null,
        suspensionFront: 'hydraulic',
        suspensionRear: 'hydraulic',
        suspensionAdjustable: true
      },
      electronics: {
        display: 'LED',
        nfc: true,
        app: true,
        alarm: false,
        alarmWithWheelLock: null,
        cruiseControl: true,
        regenerativeBrake: true,
        dualMotorMode: true,
        rgbLeds: true
      },
      safety: {
        ipRating: 'IPX7',
        turnSignals: true,
        reflectors: null,
        horn: null
      },
      shipping: {
        weightKg: 40,
        seatsAmount: 1,
        boxes: [
          {
            dimensions: '140x75x70',
            weightKg: 40
          }
        ],
        cargoDescription: 'Електросамокат Tiger 10 GT',
        cargoType: null
      }
    },
    variants: [
      {
        id: 'tiger-10-gt-23ah',
        sku: 'T-HILEY-TIGER-10-GT-23',
        name: '23.4Ah',
        nameUk: '23.4Ah',
        priceUsdCents: 239900,
        originalPriceUsdCents: 275900,
        inStock: true,
        stockQuantity: 2,
        specsOverride: {
          battery: {
            voltage: 60,
            voltageMin: null,
            capacityAh: 23.4,
            capacityAhMin: null,
            wattHours: 1404,
            cells: 'DMEGC/EVE',
            chargeTimeMin: 6,
            chargeTimeMax: 13,
            chargerSpec: null,
          },
        },
        images: [],
        order: 0,
      },
      {
        id: 'tiger-10-gt-26ah',
        sku: 'T-HILEY-TIGER-10-GT-26',
        name: '26Ah',
        nameUk: '26Ah',
        priceUsdCents: 263900,
        originalPriceUsdCents: 299900,
        inStock: true,
        stockQuantity: 2,
        specsOverride: {
          battery: {
            voltage: 60,
            voltageMin: null,
            capacityAh: 26,
            capacityAhMin: null,
            wattHours: 1560,
            cells: 'DMEGC/EVE',
            chargeTimeMin: 7,
            chargeTimeMax: 14,
            chargerSpec: null,
          },
          performance: {
            maxSpeed: 75,
            maxSpeedLimited: 20,
            range: 95,
            maxIncline: 30,
            maxLoad: 120,
          },
        },
        images: [],
        order: 1,
      },
    ],
    colors: [],
    highlights: [
      '10" tubeless wheels',
      'Hydraulic suspension',
      'NFC + App',
      'IPX6 waterproof'
    ],
    highlightsUk: [
      '10" безкамерні колеса',
      'Гідропідвіска',
      'NFC + додаток',
      'IPX6 водозахист'
    ],
    relatedProductIds: []
  },

{
    id: 'tiger-10-v5-performance',
    slug: 'tiger-10-v5-performance',
    sku: 'T-HILEY-TIGER-10-V5-PERFORMANCE',
    brandId: 'tiger',
    productType: 'scooter',
    name: 'Tiger 10 V5 PERFORMANCE',
    nameUk: 'Tiger 10 V5 PERFORMANCE',
    shortDescription: 'Батарея на преміальних елементах Samsung 21700 та швидкознімні шини. Два мотори 4200W, 75 км/год, 95 км запасу.',
    shortDescriptionUk: 'Батарея на преміальних елементах Samsung 21700 та швидкознімні шини. Два мотори 4200W, 75 км/год, 95 км запасу.',
    description: 'Tiger 10 V5 PERFORMANCE — це вдосконалена версія популярної V5 з акцентом на надійність та зручність обслуговування. Батарея на преміальних елементах Samsung 21700 забезпечує 95 км запасу ходу та тривалий термін служби.\n\nГоловна особливість — система швидкознімних шин. Заміна колеса займає лише 5 хвилин без спеціальних інструментів. Двомоторна система 3400W та 10-дюймові безкамерні колеса гарантують динаміку та комфорт.\n\nПодвійна зарядка 2x3.5A скорочує час заряджання до 5 годин. Водозахист IPX7 — найвищий у класі. NFC-замок, мобільний додаток та RGB-підсвітка входять у стандартну комплектацію. Вага лише 29.9 кг.',
    descriptionUk: 'Tiger 10 V5 PERFORMANCE — це вдосконалена версія популярної V5 з акцентом на надійність та зручність обслуговування. Батарея на преміальних елементах Samsung 21700 забезпечує 95 км запасу ходу та тривалий термін служби.\n\nГоловна особливість — система швидкознімних шин. Заміна колеса займає лише 5 хвилин без спеціальних інструментів. Двомоторна система 3400W та 10-дюймові безкамерні колеса гарантують динаміку та комфорт.\n\nПодвійна зарядка 2x3.5A скорочує час заряджання до 5 годин. Водозахист IPX7 — найвищий у класі. NFC-замок, мобільний додаток та RGB-підсвітка входять у стандартну комплектацію. Вага лише 29.9 кг.',
    priceUsdCents: 216000,
    originalPriceUsdCents: 230900,
    costUsdCents: null,
    availability: 'in_stock',
    purchaseModel: 'consultation',
    stockQuantity: 2,
    lowStockThreshold: null,
    featured: true,
    order: 105,
    categoryIds: [
      'tier-mid',
      'use-case-performance'
    ],
    tags: [
      'tiger',
      '10-v5-performance',
      'hiley'
    ],
    domains: [
      'hiley.com.ua'
    ],
    media: {
      images: [
        '/products/tiger-10-v5-performance/main.webp',
        '/products/tiger-10-v5-performance/display.webp',
        '/products/tiger-10-v5-performance/folded.webp',
        '/products/tiger-10-v5-performance/front.webp',
        '/products/tiger-10-v5-performance/rear.webp'
      ],
      videos: [],
      youtubeIds: [
        '3WjQ5wzQZTA'
      ]
    },
    seo: {
      title: null,
      titleUk: null,
      description: null,
      descriptionUk: null,
      keywords: [],
      ogImage: null
    },
    warranty: '24 months',
    warrantyUk: '24 місяці',
    rating: null,
    reviewCount: 0,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    metadata: {
      prepaymentTerms: {
        type: 'percentage',
        amount: 50,
        descriptionUk: '50% передоплата'
      }
    },
    series: 'Tiger',
    model: '10 V5 PERFORMANCE',
    specs: {
      motor: {
        count: 2,
        powerPerMotor: 1200,
        totalPower: 4200,
        peakPower: null,
        type: 'hub'
      },
      battery: {
        voltage: 60,
        voltageMin: null,
        capacityAh: 25,
        capacityAhMin: null,
        wattHours: 1500,
        cells: 'Samsung 21700',
        chargeTimeMin: 5,
        chargeTimeMax: 9,
        chargerSpec: '2x 3.5A'
      },
      performance: {
        maxSpeed: 75,
        maxSpeedLimited: 20,
        range: 95,
        maxIncline: 35,
        maxLoad: 130
      },
      chassis: {
        weight: 29.9,
        wheelSize: 10,
        wheelType: 'tubeless',
        foldable: true,
        dimensions: '1270x665x1320',
        foldedDimensions: '1270x665x580',
        brakeType: 'NUTT hydraulic disc',
        brakePistons: null,
        suspensionFront: 'hydraulic',
        suspensionRear: 'hydraulic',
        suspensionAdjustable: true
      },
      electronics: {
        display: 'LED',
        nfc: true,
        app: true,
        alarm: true,
        alarmWithWheelLock: true,
        cruiseControl: true,
        regenerativeBrake: true,
        dualMotorMode: true,
        rgbLeds: true
      },
      safety: {
        ipRating: 'IPX7',
        turnSignals: false,
        reflectors: null,
        horn: null
      },
      shipping: {
        weightKg: 34.9,
        seatsAmount: 1,
        boxes: [
          {
            dimensions: '140x75x70',
            weightKg: 34.9
          }
        ],
        cargoDescription: 'Електросамокат Tiger 10 V5 PERFORMANCE',
        cargoType: null
      }
    },
    variants: [],
    colors: [
      {
        id: 'gray',
        name: 'Space Grey',
        nameUk: 'Сірий Space Grey',
        hex: '#6B7280',
      },
      {
        id: 'yellow',
        name: 'Lightning Yellow',
        nameUk: 'Жовтий Lightning',
        hex: '#FACC15',
      },
    ],
    highlights: [
      '10" tubeless wheels',
      'Hydraulic suspension',
      'NFC + App',
      'IPX7 waterproof'
    ],
    highlightsUk: [
      '10" безкамерні колеса',
      'Гідропідвіска',
      'NFC + додаток',
      'IPX7 водозахист'
    ],
    relatedProductIds: []
  },

{
    id: 'tiger-10-v4-lr',
    slug: 'tiger-10-v4-lr',
    sku: 'T-HILEY-TIGER-10-V4-LR',
    brandId: 'tiger',
    productType: 'scooter',
    name: 'Tiger 10 V4 LR',
    nameUk: 'Tiger 10 V4 LR',
    shortDescription: 'Long Range для тих, хто їздить далеко — 90 км вистачає на тиждень. Два мотори 3000W, 70 км/год.',
    shortDescriptionUk: 'Long Range для тих, хто їздить далеко — 90 км вистачає на тиждень. Два мотори 3000W, 70 км/год.',
    description: 'Tiger 10 V4 LR (Long Range) — для тих, хто не любить часто заряджати. Батарея Samsung 25.6Ah забезпечує 90 км реального пробігу, що достатньо для тижня міських поїздок.\n\nДвомоторна система 3000W дає максимальну швидкість 70 км/год та впевнено долає підйоми до 30°. 10-дюймові безкамерні колеса та гідравлічна підвіска з регулюванням — стандарт комфорту серії Tiger 10.\n\nПовний водозахист IPX7 означає, що ви можете їздити в будь-яку погоду без обмежень. NFC-замок, мобільний додаток та RGB-підсвітка допомагають у щоденному використанні. Компактна вага 29.5 кг робить самокат зручним для зберігання.',
    descriptionUk: 'Tiger 10 V4 LR (Long Range) — для тих, хто не любить часто заряджати. Батарея Samsung 25.6Ah забезпечує 90 км реального пробігу, що достатньо для тижня міських поїздок.\n\nДвомоторна система 3000W дає максимальну швидкість 70 км/год та впевнено долає підйоми до 30°. 10-дюймові безкамерні колеса та гідравлічна підвіска з регулюванням — стандарт комфорту серії Tiger 10.\n\nПовний водозахист IPX7 означає, що ви можете їздити в будь-яку погоду без обмежень. NFC-замок, мобільний додаток та RGB-підсвітка допомагають у щоденному використанні. Компактна вага 29.5 кг робить самокат зручним для зберігання.',
    priceUsdCents: 202900,
    originalPriceUsdCents: 225900,
    costUsdCents: null,
    availability: 'pre_order',
    purchaseModel: 'consultation',
    stockQuantity: 0,
    lowStockThreshold: null,
    featured: false,
    order: 106,
    categoryIds: [
      'tier-mid',
      'use-case-commute'
    ],
    tags: [
      'tiger',
      '10-v4-lr',
      'hiley'
    ],
    domains: [
      'hiley.com.ua'
    ],
    media: {
      images: [
        '/products/tiger-10-v4-lr/main.webp',
        '/products/tiger-10-v4-lr/handlebar.webp',
        '/products/tiger-10-v4-lr/front.webp',
        '/products/tiger-10-v4-lr/rear.webp',
        '/products/tiger-10-v4-lr/folded.webp'
      ],
      videos: [],
      youtubeIds: [
        '9ejhkNdnF2E'
      ]
    },
    seo: {
      title: null,
      titleUk: null,
      description: null,
      descriptionUk: null,
      keywords: [],
      ogImage: null
    },
    warranty: '24 months',
    warrantyUk: '24 місяці',
    rating: null,
    reviewCount: 0,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    metadata: {
      prepaymentTerms: {
        type: 'percentage',
        amount: 50,
        descriptionUk: '50% передоплата'
      }
    },
    series: 'Tiger',
    model: '10 V4 LR',
    specs: {
      motor: {
        count: 2,
        powerPerMotor: 1000,
        totalPower: 3000,
        peakPower: null,
        type: 'hub'
      },
      battery: {
        voltage: 52,
        voltageMin: null,
        capacityAh: 25.6,
        capacityAhMin: null,
        wattHours: 1331,
        cells: 'Samsung',
        chargeTimeMin: 7,
        chargeTimeMax: 13,
        chargerSpec: null
      },
      performance: {
        maxSpeed: 70,
        maxSpeedLimited: 20,
        range: 90,
        maxIncline: 30,
        maxLoad: 120
      },
      chassis: {
        weight: 29.5,
        wheelSize: 10,
        wheelType: 'tubeless',
        foldable: true,
        dimensions: '1320x600x1215',
        foldedDimensions: null,
        brakeType: 'Hydraulic disc',
        brakePistons: null,
        suspensionFront: 'hydraulic',
        suspensionRear: 'hydraulic',
        suspensionAdjustable: true
      },
      electronics: {
        display: 'LED',
        nfc: true,
        app: true,
        alarm: false,
        alarmWithWheelLock: null,
        cruiseControl: true,
        regenerativeBrake: true,
        dualMotorMode: true,
        rgbLeds: true
      },
      safety: {
        ipRating: 'IPX7',
        turnSignals: true,
        reflectors: null,
        horn: null
      },
      shipping: {
        weightKg: 34.5,
        seatsAmount: 1,
        boxes: [
          {
            dimensions: '140x75x70',
            weightKg: 34.5
          }
        ],
        cargoDescription: 'Електросамокат Tiger 10 V4 LR',
        cargoType: null
      }
    },
    variants: [],
    colors: [],
    highlights: [
      '10" tubeless wheels',
      'Hydraulic suspension',
      'NFC + App',
      'IPX7 waterproof'
    ],
    highlightsUk: [
      '10" безкамерні колеса',
      'Гідропідвіска',
      'NFC + додаток',
      'IPX7 водозахист'
    ],
    relatedProductIds: []
  },

{
    id: 'tiger-10-v4',
    slug: 'tiger-10-v4',
    sku: 'T-HILEY-TIGER-10-V4',
    brandId: 'tiger',
    productType: 'scooter',
    name: 'Tiger 10 V4',
    nameUk: 'Tiger 10 V4',
    shortDescription: 'Доступний вхід у світ Tiger 10 з повним водозахистом IPX7. Два мотори 3000W, 70 км/год, 70 км запасу.',
    shortDescriptionUk: 'Доступний вхід у світ Tiger 10 з повним водозахистом IPX7. Два мотори 3000W, 70 км/год, 70 км запасу.',
    description: 'Tiger 10 V4 — це найдоступніший спосіб отримати всі переваги серії Tiger 10. Двомоторна система 3000W, 70 км запасу ходу та повний водозахист IPX7 за ціною, яка приємно здивує.\n\n10-дюймові безкамерні колеса та гідравлічна підвіска з регулюванням забезпечують комфорт, ідентичний старшим моделям. Максимальна швидкість 70 км/год та подолання підйомів до 30° — для впевненої їзди містом.\n\nДоступний у двох кольорах: елегантний Sunlight та стриманий Black Edition. NFC-замок, мобільний додаток, RGB-підсвітка та поворотники — повна комплектація без компромісів. Ідеальний перший крок у світ преміальних електросамокатів.',
    descriptionUk: 'Tiger 10 V4 — це найдоступніший спосіб отримати всі переваги серії Tiger 10. Двомоторна система 3000W, 70 км запасу ходу та повний водозахист IPX7 за ціною, яка приємно здивує.\n\n10-дюймові безкамерні колеса та гідравлічна підвіска з регулюванням забезпечують комфорт, ідентичний старшим моделям. Максимальна швидкість 70 км/год та подолання підйомів до 30° — для впевненої їзди містом.\n\nДоступний у двох кольорах: елегантний Sunlight та стриманий Black Edition. NFC-замок, мобільний додаток, RGB-підсвітка та поворотники — повна комплектація без компромісів. Ідеальний перший крок у світ преміальних електросамокатів.',
    priceUsdCents: 175000,
    originalPriceUsdCents: 197900,
    costUsdCents: null,
    availability: 'pre_order',
    purchaseModel: 'consultation',
    stockQuantity: 0,
    lowStockThreshold: null,
    featured: false,
    order: 107,
    categoryIds: [
      'tier-mid',
      'use-case-commute'
    ],
    tags: [
      'tiger',
      '10-v4',
      'hiley'
    ],
    domains: [
      'hiley.com.ua'
    ],
    media: {
      images: [
        '/products/tiger-10-v4/orange.webp',
        '/products/tiger-10-v4/folded.webp',
        '/products/tiger-10-v4/front.webp',
        '/products/tiger-10-v4/handlebar.webp',
        '/products/tiger-10-v4/rear.webp'
      ],
      videos: [],
      youtubeIds: [
        '9ejhkNdnF2E'
      ]
    },
    seo: {
      title: null,
      titleUk: null,
      description: null,
      descriptionUk: null,
      keywords: [],
      ogImage: null
    },
    warranty: '24 months',
    warrantyUk: '24 місяці',
    rating: null,
    reviewCount: 0,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    metadata: {
      prepaymentTerms: {
        type: 'percentage',
        amount: 50,
        descriptionUk: '50% передоплата'
      }
    },
    series: 'Tiger',
    model: '10 V4',
    specs: {
      motor: {
        count: 2,
        powerPerMotor: 1000,
        totalPower: 3000,
        peakPower: null,
        type: 'hub'
      },
      battery: {
        voltage: 52,
        voltageMin: null,
        capacityAh: 20.8,
        capacityAhMin: null,
        wattHours: 1081,
        cells: 'DMEGC/EVE',
        chargeTimeMin: 5,
        chargeTimeMax: 10,
        chargerSpec: null
      },
      performance: {
        maxSpeed: 70,
        maxSpeedLimited: 20,
        range: 70,
        maxIncline: 30,
        maxLoad: 120
      },
      chassis: {
        weight: 29.5,
        wheelSize: 10,
        wheelType: 'tubeless',
        foldable: true,
        dimensions: '1320x600x1215',
        foldedDimensions: null,
        brakeType: 'Hydraulic disc',
        brakePistons: null,
        suspensionFront: 'hydraulic',
        suspensionRear: 'hydraulic',
        suspensionAdjustable: true
      },
      electronics: {
        display: 'LED',
        nfc: true,
        app: true,
        alarm: false,
        alarmWithWheelLock: null,
        cruiseControl: true,
        regenerativeBrake: true,
        dualMotorMode: true,
        rgbLeds: true
      },
      safety: {
        ipRating: 'IPX7',
        turnSignals: true,
        reflectors: null,
        horn: null
      },
      shipping: {
        weightKg: 34.5,
        seatsAmount: 1,
        boxes: [
          {
            dimensions: '140x75x70',
            weightKg: 34.5
          }
        ],
        cargoDescription: 'Електросамокат Tiger 10 V4',
        cargoType: null
      }
    },
    variants: [
      {
        id: 'tiger-10-v4-orange',
        sku: 'T-HILEY-TIGER-10-V4-OR',
        name: 'Sunlight Orange',
        nameUk: 'Помаранчевий Sunlight',
        priceUsdCents: 175000,
        originalPriceUsdCents: 197900,
        inStock: false,
        stockQuantity: 0,
        images: ['/products/tiger-10-v4/orange.webp'],
        order: 0,
      },
      {
        id: 'tiger-10-v4-black',
        sku: 'T-HILEY-TIGER-10-V4-BK',
        name: 'Black Edition',
        nameUk: 'Чорний Black Edition',
        priceUsdCents: 175000,
        originalPriceUsdCents: 197900,
        inStock: false,
        stockQuantity: 0,
        images: ['/products/tiger-10-v4/main.webp'],
        order: 1,
      },
    ],
    colors: [
      {
        id: 'orange',
        name: 'Sunlight Orange',
        nameUk: 'Помаранчевий Sunlight',
        hex: '#FF8C42',
        variantId: 'tiger-10-v4-orange',
      },
      {
        id: 'black',
        name: 'Black Edition',
        nameUk: 'Чорний Black Edition',
        hex: '#1A1A1A',
        variantId: 'tiger-10-v4-black',
      },
    ],
    highlights: [
      '10" tubeless wheels',
      'Hydraulic suspension',
      'NFC + App',
      'IPX7 waterproof'
    ],
    highlightsUk: [
      '10" безкамерні колеса',
      'Гідропідвіска',
      'NFC + додаток',
      'IPX7 водозахист'
    ],
    relatedProductIds: []
  },

{
    id: 'tiger-10-v5',
    slug: 'tiger-10-v5',
    sku: 'T-HILEY-TIGER-10-V5',
    brandId: 'tiger',
    productType: 'scooter',
    name: 'Tiger 10 V5',
    nameUk: 'Tiger 10 V5',
    shortDescription: 'Нове покоління з подвійною зарядкою та швидкознімними шинами. Два мотори 3600W, 70 км/год, 95 км запасу.',
    shortDescriptionUk: 'Нове покоління з подвійною зарядкою та швидкознімними шинами. Два мотори 3600W, 70 км/год, 95 км запасу.',
    description: 'Tiger 10 V5 — це нове покоління серії Tiger 10 з покращеною ергономікою та технологіями. Батарея 27Ah забезпечує 95 км реального пробігу, а подвійна зарядка 2x3A скорочує час заряджання до 5 годин.\n\nГоловна інновація — система швидкознімних шин. Заміна колеса займає 5 хвилин без спеціальних інструментів. Двомоторна система 3000W та 10-дюймові безкамерні колеса гарантують баланс динаміки та комфорту.\n\nПовний водозахист IPX7 дозволяє їздити в будь-яку погоду. NFC-замок, мобільний додаток та RGB-підсвітка — стандартна комплектація. Вага 29.9 кг та складана конструкція — зручно зберігати вдома та возити в авто.',
    descriptionUk: 'Tiger 10 V5 — це нове покоління серії Tiger 10 з покращеною ергономікою та технологіями. Батарея 27Ah забезпечує 95 км реального пробігу, а подвійна зарядка 2x3A скорочує час заряджання до 5 годин.\n\nГоловна інновація — система швидкознімних шин. Заміна колеса займає 5 хвилин без спеціальних інструментів. Двомоторна система 3000W та 10-дюймові безкамерні колеса гарантують баланс динаміки та комфорту.\n\nПовний водозахист IPX7 дозволяє їздити в будь-яку погоду. NFC-замок, мобільний додаток та RGB-підсвітка — стандартна комплектація. Вага 29.9 кг та складана конструкція — зручно зберігати вдома та возити в авто.',
    priceUsdCents: 185000,
    originalPriceUsdCents: 188900,
    costUsdCents: null,
    availability: 'in_stock',
    purchaseModel: 'consultation',
    stockQuantity: 3,
    lowStockThreshold: null,
    featured: false,
    order: 108,
    categoryIds: [
      'tier-mid',
      'use-case-commute'
    ],
    tags: [
      'tiger',
      '10-v5',
      'hiley'
    ],
    domains: [
      'hiley.com.ua'
    ],
    media: {
      images: [
        '/products/tiger-10-v5/main.webp',
        '/products/tiger-10-v5/display.webp',
        '/products/tiger-10-v5/folded.webp',
        '/products/tiger-10-v5/front.webp',
        '/products/tiger-10-v5/rear.webp'
      ],
      videos: [],
      youtubeIds: [
        '3WjQ5wzQZTA'
      ]
    },
    seo: {
      title: null,
      titleUk: null,
      description: null,
      descriptionUk: null,
      keywords: [],
      ogImage: null
    },
    warranty: '24 months',
    warrantyUk: '24 місяці',
    rating: null,
    reviewCount: 0,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    metadata: {
      prepaymentTerms: {
        type: 'percentage',
        amount: 50,
        descriptionUk: '50% передоплата'
      }
    },
    series: 'Tiger',
    model: '10 V5',
    specs: {
      motor: {
        count: 2,
        powerPerMotor: 1000,
        totalPower: 3600,
        peakPower: null,
        type: 'hub'
      },
      battery: {
        voltage: 52,
        voltageMin: null,
        capacityAh: 27,
        capacityAhMin: null,
        wattHours: 1404,
        cells: 'DMEGC',
        chargeTimeMin: 5,
        chargeTimeMax: 9,
        chargerSpec: '2x 3A'
      },
      performance: {
        maxSpeed: 70,
        maxSpeedLimited: 20,
        range: 95,
        maxIncline: 30,
        maxLoad: 130
      },
      chassis: {
        weight: 29.9,
        wheelSize: 10,
        wheelType: 'tubeless',
        foldable: true,
        dimensions: '1270x665x1320',
        foldedDimensions: '1270x665x580',
        brakeType: 'NUTT hydraulic disc',
        brakePistons: null,
        suspensionFront: 'hydraulic',
        suspensionRear: 'hydraulic',
        suspensionAdjustable: true
      },
      electronics: {
        display: 'LED',
        nfc: true,
        app: true,
        alarm: true,
        alarmWithWheelLock: true,
        cruiseControl: true,
        regenerativeBrake: true,
        dualMotorMode: true,
        rgbLeds: true
      },
      safety: {
        ipRating: 'IPX7',
        turnSignals: false,
        reflectors: null,
        horn: null
      },
      shipping: {
        weightKg: 34.9,
        seatsAmount: 1,
        boxes: [
          {
            dimensions: '140x75x70',
            weightKg: 34.9
          }
        ],
        cargoDescription: 'Електросамокат Tiger 10 V5',
        cargoType: null
      }
    },
    variants: [],
    colors: [],
    highlights: [
      '10" tubeless wheels',
      'Hydraulic suspension',
      'NFC + App',
      'IPX7 waterproof'
    ],
    highlightsUk: [
      '10" безкамерні колеса',
      'Гідропідвіска',
      'NFC + додаток',
      'IPX7 водозахист'
    ],
    relatedProductIds: []
  },

{
    id: 'tiger-evo-gtr',
    slug: 'tiger-evo-gtr',
    sku: 'T-HILEY-TIGER-EVO-GTR',
    brandId: 'tiger',
    productType: 'scooter',
    name: 'Tiger EVO GTR',
    nameUk: 'Tiger EVO GTR',
    shortDescription: 'Лідер серії EVO з подвійною зарядкою та яскравим дизайном. Два мотори 3000W, 65 км/год, 85 км запасу.',
    shortDescriptionUk: 'Лідер серії EVO з подвійною зарядкою та яскравим дизайном. Два мотори 3000W, 65 км/год, 85 км запасу.',
    description: 'Tiger EVO GTR — це топова модель серії EVO для тих, хто хоче виділятися. Яскравий колір Flame Red та агресивний дизайн привертають увагу, а двомоторна система 3000W забезпечує динаміку, гідну назви GTR.\n\n85 км запасу ходу на батареї DMEGC 21700 22.5Ah — достатньо для найактивніших райдерів. 10-дюймові безкамерні колеса та пружинна підвіска з регулюванням створюють комфортну їзду. Вага 28.5 кг — один з найлегших двомоторних самокатів.\n\nПовний водозахист IPX7 дозволяє їздити в дощ без обмежень. Гідравлічні гальма NUTT, NFC-замок, мобільний додаток та поворотники — все для безпечної та зручної їзди. RGB-підсвітка підкреслює характер GTR.',
    descriptionUk: 'Tiger EVO GTR — це топова модель серії EVO для тих, хто хоче виділятися. Яскравий колір Flame Red та агресивний дизайн привертають увагу, а двомоторна система 3000W забезпечує динаміку, гідну назви GTR.\n\n85 км запасу ходу на батареї DMEGC 21700 22.5Ah — достатньо для найактивніших райдерів. 10-дюймові безкамерні колеса та пружинна підвіска з регулюванням створюють комфортну їзду. Вага 28.5 кг — один з найлегших двомоторних самокатів.\n\nПовний водозахист IPX7 дозволяє їздити в дощ без обмежень. Гідравлічні гальма NUTT, NFC-замок, мобільний додаток та поворотники — все для безпечної та зручної їзди. RGB-підсвітка підкреслює характер GTR.',
    priceUsdCents: 150000,
    originalPriceUsdCents: 165000,
    costUsdCents: null,
    availability: 'in_stock',
    purchaseModel: 'consultation',
    stockQuantity: 4,
    lowStockThreshold: null,
    featured: false,
    order: 109,
    categoryIds: [
      'tier-entry',
      'use-case-city'
    ],
    tags: [
      'tiger',
      'evo-gtr',
      'hiley'
    ],
    domains: [
      'hiley.com.ua'
    ],
    media: {
      images: [
        '/products/tiger-evo-gtr/main.webp',
        '/products/tiger-evo-gtr/folded.webp',
        '/products/tiger-evo-gtr/display.webp',
        '/products/tiger-evo-gtr/front.webp',
        '/products/tiger-evo-gtr/rear.webp'
      ],
      videos: [],
      youtubeIds: [
        'gbJI4bZu6qQ'
      ]
    },
    seo: {
      title: null,
      titleUk: null,
      description: null,
      descriptionUk: null,
      keywords: [],
      ogImage: null
    },
    warranty: '24 months',
    warrantyUk: '24 місяці',
    rating: null,
    reviewCount: 0,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    metadata: {
      prepaymentTerms: {
        type: 'percentage',
        amount: 50,
        descriptionUk: '50% передоплата'
      }
    },
    series: 'Tiger',
    model: 'EVO GTR',
    specs: {
      motor: {
        count: 2,
        powerPerMotor: 1000,
        totalPower: 3000,
        peakPower: null,
        type: 'hub'
      },
      battery: {
        voltage: 52,
        voltageMin: null,
        capacityAh: 22.5,
        capacityAhMin: null,
        wattHours: 1170,
        cells: 'DMEGC 21700',
        chargeTimeMin: 4,
        chargeTimeMax: 11,
        chargerSpec: null
      },
      performance: {
        maxSpeed: 65,
        maxSpeedLimited: 20,
        range: 85,
        maxIncline: 30,
        maxLoad: 120
      },
      chassis: {
        weight: 28.5,
        wheelSize: 10,
        wheelType: 'tubeless',
        foldable: true,
        dimensions: '1235x690x1340',
        foldedDimensions: '1235x690x620',
        brakeType: 'NUTT hydraulic disc',
        brakePistons: null,
        suspensionFront: 'spring',
        suspensionRear: 'spring',
        suspensionAdjustable: true
      },
      electronics: {
        display: 'LED',
        nfc: true,
        app: true,
        alarm: false,
        alarmWithWheelLock: null,
        cruiseControl: true,
        regenerativeBrake: true,
        dualMotorMode: true,
        rgbLeds: true
      },
      safety: {
        ipRating: 'IPX7',
        turnSignals: true,
        reflectors: null,
        horn: null
      },
      shipping: {
        weightKg: 33.5,
        seatsAmount: 1,
        boxes: [
          {
            dimensions: '140x75x70',
            weightKg: 33.5
          }
        ],
        cargoDescription: 'Електросамокат Tiger EVO GTR',
        cargoType: null
      }
    },
    variants: [],
    colors: [],
    highlights: [
      'Compact design',
      'NFC lock',
      'RGB lighting',
      'Mobile app'
    ],
    highlightsUk: [
      'Компактний дизайн',
      'NFC замок',
      'RGB підсвітка',
      'Мобільний додаток'
    ],
    relatedProductIds: []
  },

{
    id: 'tiger-max-gtr',
    slug: 'tiger-max-gtr',
    sku: 'T-HILEY-TIGER-MAX-GTR',
    brandId: 'tiger',
    productType: 'scooter',
    name: 'Tiger MAX GTR',
    nameUk: 'Tiger MAX GTR',
    shortDescription: 'Двомоторний самокат за ціною одномоторних моделей. Пікова потужність 2520W, 55 км/год, 60 км запасу.',
    shortDescriptionUk: 'Двомоторний самокат за ціною одномоторних моделей. Пікова потужність 2520W, 55 км/год, 60 км запасу.',
    description: 'Tiger MAX GTR — це найдоступніший двомоторний самокат у лінійці Hiley. Два мотори загальною потужністю 2520W за ціною одномоторних моделей конкурентів — справжня вигода для тих, хто хоче більше за менше.\n\nЯскравий колір Flame Red та 10-дюймові пневматичні колеса роблять MAX GTR помітним на вулиці. 60 км запасу ходу та швидкість до 55 км/год — достатньо для більшості міських маршрутів. Вага 28 кг — зручно для щоденного використання.\n\nПружинна підвіска з регулюванням та барабанні гальма забезпечують комфорт та безпеку. NFC-замок, мобільний додаток та RGB-підсвітка — весь арсенал сучасного електротранспорту. Водозахист IPX6 дозволяє їздити в легкий дощ.',
    descriptionUk: 'Tiger MAX GTR — це найдоступніший двомоторний самокат у лінійці Hiley. Два мотори загальною потужністю 2520W за ціною одномоторних моделей конкурентів — справжня вигода для тих, хто хоче більше за менше.\n\nЯскравий колір Flame Red та 10-дюймові пневматичні колеса роблять MAX GTR помітним на вулиці. 60 км запасу ходу та швидкість до 55 км/год — достатньо для більшості міських маршрутів. Вага 28 кг — зручно для щоденного використання.\n\nПружинна підвіска з регулюванням та барабанні гальма забезпечують комфорт та безпеку. NFC-замок, мобільний додаток та RGB-підсвітка — весь арсенал сучасного електротранспорту. Водозахист IPX6 дозволяє їздити в легкий дощ.',
    priceUsdCents: 93900,
    originalPriceUsdCents: 117900,
    costUsdCents: null,
    availability: 'discontinued',
    purchaseModel: 'consultation',
    stockQuantity: 0,
    lowStockThreshold: null,
    featured: false,
    order: 110,
    categoryIds: [
      'tier-entry',
      'use-case-city'
    ],
    tags: [
      'tiger',
      'max-gtr',
      'hiley'
    ],
    domains: [
      'hiley.com.ua'
    ],
    media: {
      images: [
        '/products/tiger-max-gtr/main.webp',
        '/products/tiger-max-gtr/handlebar.webp',
        '/products/tiger-max-gtr/front.webp',
        '/products/tiger-max-gtr/rear.webp',
        '/products/tiger-max-gtr/folded.webp'
      ],
      videos: [],
      youtubeIds: [
        'lOdP8CyqspA'
      ]
    },
    seo: {
      title: null,
      titleUk: null,
      description: null,
      descriptionUk: null,
      keywords: [],
      ogImage: null
    },
    warranty: '24 months',
    warrantyUk: '24 місяці',
    rating: null,
    reviewCount: 0,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    metadata: {
      prepaymentTerms: {
        type: 'percentage',
        amount: 50,
        descriptionUk: '50% передоплата'
      }
    },
    series: 'Tiger',
    model: 'MAX GTR',
    specs: {
      motor: {
        count: 2,
        powerPerMotor: 800,
        totalPower: 2520,
        peakPower: null,
        type: 'hub'
      },
      battery: {
        voltage: 48,
        voltageMin: null,
        capacityAh: 18.2,
        capacityAhMin: null,
        wattHours: 874,
        cells: 'DMEGC/EVE',
        chargeTimeMin: 5,
        chargeTimeMax: 9,
        chargerSpec: null
      },
      performance: {
        maxSpeed: 55,
        maxSpeedLimited: 20,
        range: 60,
        maxIncline: 30,
        maxLoad: 120
      },
      chassis: {
        weight: 28,
        wheelSize: 10,
        wheelType: 'pneumatic',
        foldable: true,
        dimensions: '1260x650x1300',
        foldedDimensions: '1260x210x520',
        brakeType: 'Drum',
        brakePistons: null,
        suspensionFront: 'spring',
        suspensionRear: 'spring',
        suspensionAdjustable: true
      },
      electronics: {
        display: 'LED',
        nfc: true,
        app: true,
        alarm: false,
        alarmWithWheelLock: null,
        cruiseControl: true,
        regenerativeBrake: true,
        dualMotorMode: true,
        rgbLeds: true
      },
      safety: {
        ipRating: 'IPX6',
        turnSignals: true,
        reflectors: null,
        horn: null
      },
      shipping: {
        weightKg: 33,
        seatsAmount: 1,
        boxes: [
          {
            dimensions: '140x75x70',
            weightKg: 33
          }
        ],
        cargoDescription: 'Електросамокат Tiger MAX GTR',
        cargoType: null
      }
    },
    variants: [],
    colors: [],
    highlights: [
      'Compact design',
      'NFC lock',
      'RGB lighting',
      'Mobile app'
    ],
    highlightsUk: [
      'Компактний дизайн',
      'NFC замок',
      'RGB підсвітка',
      'Мобільний додаток'
    ],
    relatedProductIds: []
  },

{
    id: 'tiger-evo-gt',
    slug: 'tiger-evo-gt',
    sku: 'T-HILEY-TIGER-EVO-GT',
    brandId: 'tiger',
    productType: 'scooter',
    name: 'Tiger EVO GT',
    nameUk: 'Tiger EVO GT',
    shortDescription: 'Чемпіон з енергоефективності — 85 км при вазі лише 26.5 кг. Мотор 1470W, швидкість 55 км/год.',
    shortDescriptionUk: 'Чемпіон з енергоефективності — 85 км при вазі лише 26.5 кг. Мотор 1470W, швидкість 55 км/год.',
    description: 'Tiger EVO GT — це чемпіон з енергоефективності серії EVO. 85 км запасу ходу при вазі всього 26.5 кг — найкращий показник у класі. Одномоторна система 1470W оптимізована для максимальної дальності.\n\nЕлегантний колір Midnight Blue підкреслює стриманий характер GT. 10-дюймові безкамерні колеса та пружинна підвіска з регулюванням забезпечують комфорт на будь-якому покритті. Батарея DMEGC 21700 22.5Ah — надійність та довговічність.\n\nПовний водозахист IPX7 — найвищий у класі. Їздіть у дощ, мийте самокат під струменем води. NFC-замок, мобільний додаток, RGB-підсвітка та поворотники входять у стандартну комплектацію. Ідеальний вибір для щоденних поїздок.',
    descriptionUk: 'Tiger EVO GT — це чемпіон з енергоефективності серії EVO. 85 км запасу ходу при вазі всього 26.5 кг — найкращий показник у класі. Одномоторна система 1470W оптимізована для максимальної дальності.\n\nЕлегантний колір Midnight Blue підкреслює стриманий характер GT. 10-дюймові безкамерні колеса та пружинна підвіска з регулюванням забезпечують комфорт на будь-якому покритті. Батарея DMEGC 21700 22.5Ah — надійність та довговічність.\n\nПовний водозахист IPX7 — найвищий у класі. Їздіть у дощ, мийте самокат під струменем води. NFC-замок, мобільний додаток, RGB-підсвітка та поворотники входять у стандартну комплектацію. Ідеальний вибір для щоденних поїздок.',
    priceUsdCents: 130000,
    originalPriceUsdCents: 145000,
    costUsdCents: null,
    availability: 'in_stock',
    purchaseModel: 'consultation',
    stockQuantity: 2,
    lowStockThreshold: null,
    featured: false,
    order: 111,
    categoryIds: [
      'tier-entry',
      'use-case-city'
    ],
    tags: [
      'tiger',
      'evo-gt',
      'hiley'
    ],
    domains: [
      'hiley.com.ua'
    ],
    media: {
      images: [
        '/products/tiger-evo-gt/main.webp',
        '/products/tiger-evo-gt/display.webp',
        '/products/tiger-evo-gt/folded.webp',
        '/products/tiger-evo-gt/front.webp',
        '/products/tiger-evo-gt/rear.webp'
      ],
      videos: [],
      youtubeIds: [
        'gbJI4bZu6qQ'
      ]
    },
    seo: {
      title: null,
      titleUk: null,
      description: null,
      descriptionUk: null,
      keywords: [],
      ogImage: null
    },
    warranty: '24 months',
    warrantyUk: '24 місяці',
    rating: null,
    reviewCount: 0,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    metadata: {
      prepaymentTerms: {
        type: 'percentage',
        amount: 50,
        descriptionUk: '50% передоплата'
      }
    },
    series: 'Tiger',
    model: 'EVO GT',
    specs: {
      motor: {
        count: 1,
        powerPerMotor: 1000,
        totalPower: 1470,
        peakPower: null,
        type: 'hub'
      },
      battery: {
        voltage: 52,
        voltageMin: null,
        capacityAh: 22.5,
        capacityAhMin: null,
        wattHours: 1170,
        cells: 'DMEGC 21700',
        chargeTimeMin: 4,
        chargeTimeMax: 11,
        chargerSpec: null
      },
      performance: {
        maxSpeed: 55,
        maxSpeedLimited: 20,
        range: 85,
        maxIncline: 15,
        maxLoad: 120
      },
      chassis: {
        weight: 26.5,
        wheelSize: 10,
        wheelType: 'tubeless',
        foldable: true,
        dimensions: '1235x690x1340',
        foldedDimensions: '1235x690x620',
        brakeType: 'Disc',
        brakePistons: null,
        suspensionFront: 'spring',
        suspensionRear: 'spring',
        suspensionAdjustable: true
      },
      electronics: {
        display: 'LED',
        nfc: true,
        app: true,
        alarm: false,
        alarmWithWheelLock: null,
        cruiseControl: true,
        regenerativeBrake: true,
        dualMotorMode: false,
        rgbLeds: true
      },
      safety: {
        ipRating: 'IPX7',
        turnSignals: true,
        reflectors: null,
        horn: null
      },
      shipping: {
        weightKg: 31.5,
        seatsAmount: 1,
        boxes: [
          {
            dimensions: '140x75x70',
            weightKg: 31.5
          }
        ],
        cargoDescription: 'Електросамокат Tiger EVO GT',
        cargoType: null
      }
    },
    variants: [],
    colors: [],
    highlights: [
      'Compact design',
      'NFC lock',
      'RGB lighting',
      'Mobile app'
    ],
    highlightsUk: [
      'Компактний дизайн',
      'NFC замок',
      'RGB підсвітка',
      'Мобільний додаток'
    ],
    relatedProductIds: []
  },

{
    id: 'tiger-8-gtr-v4',
    slug: 'tiger-8-gtr-v4',
    sku: 'T-HILEY-TIGER-8-GTR-V4',
    brandId: 'tiger',
    productType: 'scooter',
    name: 'Tiger 8 GTR V4',
    nameUk: 'Tiger 8 GTR V4',
    shortDescription: 'Компактний 8.5-дюймовий самокат з двома моторами, ідеальний для міста. Потужність 2000W, 50 км/год, 60 км.',
    shortDescriptionUk: 'Компактний 8.5-дюймовий самокат з двома моторами, ідеальний для міста. Потужність 2000W, 50 км/год, 60 км.',
    description: 'Tiger 8 GTR V4 — це найкомпактніший двомоторний самокат у лінійці Hiley. 8.5-дюймові колеса та вага 26 кг роблять його ідеальним для тісних міст, громадського транспорту та зберігання в маленьких квартирах.\n\nНезважаючи на компактність, GTR V4 не поступається динамікою старшим моделям. Два мотори загальною потужністю 2520W розганяють до 50 км/год та долають підйоми до 30°. Батарея 19.2Ah забезпечує 60 км запасу ходу.\n\nПружинна підвіска з регулюванням компенсує менший діаметр коліс. Яскравий Flame Red та RGB-підсвітка роблять самокат помітним. NFC-замок та мобільний додаток — для зручного керування. Водозахист IPX6 дозволяє їздити в легкий дощ.',
    descriptionUk: 'Tiger 8 GTR V4 — це найкомпактніший двомоторний самокат у лінійці Hiley. 8.5-дюймові колеса та вага 26 кг роблять його ідеальним для тісних міст, громадського транспорту та зберігання в маленьких квартирах.\n\nНезважаючи на компактність, GTR V4 не поступається динамікою старшим моделям. Два мотори загальною потужністю 2520W розганяють до 50 км/год та долають підйоми до 30°. Батарея 19.2Ah забезпечує 60 км запасу ходу.\n\nПружинна підвіска з регулюванням компенсує менший діаметр коліс. Яскравий Flame Red та RGB-підсвітка роблять самокат помітним. NFC-замок та мобільний додаток — для зручного керування. Водозахист IPX6 дозволяє їздити в легкий дощ.',
    priceUsdCents: 100000,
    originalPriceUsdCents: 115000,
    costUsdCents: null,
    availability: 'pre_order',
    purchaseModel: 'consultation',
    stockQuantity: 0,
    lowStockThreshold: null,
    featured: false,
    order: 112,
    categoryIds: [
      'tier-entry',
      'use-case-city'
    ],
    tags: [
      'tiger',
      '8-gtr-v4',
      'hiley'
    ],
    domains: [
      'hiley.com.ua'
    ],
    media: {
      images: [
        '/products/tiger-8-gtr-v4/main.webp',
        '/products/tiger-8-gtr-v4/detail.webp',
        '/products/tiger-8-gtr-v4/front.webp',
        '/products/tiger-8-gtr-v4/side.webp'
      ],
      videos: [],
      youtubeIds: [
        'JrNU1x7HTeM'
      ]
    },
    seo: {
      title: null,
      titleUk: null,
      description: null,
      descriptionUk: null,
      keywords: [],
      ogImage: null
    },
    warranty: '24 months',
    warrantyUk: '24 місяці',
    rating: null,
    reviewCount: 0,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    metadata: {
      prepaymentTerms: {
        type: 'percentage',
        amount: 50,
        descriptionUk: '50% передоплата'
      }
    },
    series: 'Tiger',
    model: '8 GTR V4',
    specs: {
      motor: {
        count: 2,
        powerPerMotor: 600,
        totalPower: 2000,
        peakPower: null,
        type: 'hub'
      },
      battery: {
        voltage: 48,
        voltageMin: null,
        capacityAh: 19.2,
        capacityAhMin: null,
        wattHours: 921,
        cells: 'DMEGC/EVE',
        chargeTimeMin: 5,
        chargeTimeMax: 10,
        chargerSpec: null
      },
      performance: {
        maxSpeed: 50,
        maxSpeedLimited: 20,
        range: 60,
        maxIncline: 30,
        maxLoad: 120
      },
      chassis: {
        weight: 26,
        wheelSize: 8.5,
        wheelType: 'pneumatic',
        foldable: true,
        dimensions: null,
        foldedDimensions: null,
        brakeType: 'Drum',
        brakePistons: null,
        suspensionFront: 'spring',
        suspensionRear: 'spring',
        suspensionAdjustable: true
      },
      electronics: {
        display: 'LED',
        nfc: true,
        app: true,
        alarm: false,
        alarmWithWheelLock: null,
        cruiseControl: true,
        regenerativeBrake: true,
        dualMotorMode: true,
        rgbLeds: true
      },
      safety: {
        ipRating: 'IPX6',
        turnSignals: true,
        reflectors: null,
        horn: null
      },
      shipping: {
        weightKg: 31,
        seatsAmount: 1,
        boxes: [
          {
            dimensions: '140x75x70',
            weightKg: 31
          }
        ],
        cargoDescription: 'Електросамокат Tiger 8 GTR V4',
        cargoType: null
      }
    },
    variants: [],
    colors: [],
    highlights: [
      'Compact design',
      'NFC lock',
      'RGB lighting',
      'Mobile app'
    ],
    highlightsUk: [
      'Компактний дизайн',
      'NFC замок',
      'RGB підсвітка',
      'Мобільний додаток'
    ],
    relatedProductIds: []
  },

{
    id: 'tiger-max-gt',
    slug: 'tiger-max-gt',
    sku: 'T-HILEY-TIGER-MAX-GT',
    brandId: 'tiger',
    productType: 'scooter',
    name: 'Tiger MAX GT',
    nameUk: 'Tiger MAX GT',
    shortDescription: 'Легкий та надійний самокат для щоденних поїздок — всього 25 кг. Мотор 1470W, 50 км/год, 70 км.',
    shortDescriptionUk: 'Легкий та надійний самокат для щоденних поїздок — всього 25 кг. Мотор 1470W, 50 км/год, 70 км.',
    description: 'Tiger MAX GT — це розумний вибір для тих, хто шукає надійний міський транспорт без зайвих витрат. Одномоторна система 1470W забезпечує економну їзду з запасом ходу 70 км та швидкістю до 50 км/год.\n\nСтриманий колір Midnight Blue та 10-дюймові пневматичні колеса — класична комбінація для щоденних поїздок. Вага лише 25 кг робить MAX GT одним з найлегших самокатів у лінійці. Легко носити сходами та возити в авто.\n\nПружинна підвіска з регулюванням та барабанні гальма забезпечують комфорт та безпеку. NFC-замок, мобільний додаток та RGB-підсвітка — повний набір сучасних технологій. Водозахист IPX6 дозволяє їздити в легкий дощ без турбот.',
    descriptionUk: 'Tiger MAX GT — це розумний вибір для тих, хто шукає надійний міський транспорт без зайвих витрат. Одномоторна система 1470W забезпечує економну їзду з запасом ходу 70 км та швидкістю до 50 км/год.\n\nСтриманий колір Midnight Blue та 10-дюймові пневматичні колеса — класична комбінація для щоденних поїздок. Вага лише 25 кг робить MAX GT одним з найлегших самокатів у лінійці. Легко носити сходами та возити в авто.\n\nПружинна підвіска з регулюванням та барабанні гальма забезпечують комфорт та безпеку. NFC-замок, мобільний додаток та RGB-підсвітка — повний набір сучасних технологій. Водозахист IPX6 дозволяє їздити в легкий дощ без турбот.',
    priceUsdCents: 69900,
    originalPriceUsdCents: 93900,
    costUsdCents: null,
    availability: 'discontinued',
    purchaseModel: 'consultation',
    stockQuantity: 0,
    lowStockThreshold: null,
    featured: false,
    order: 113,
    categoryIds: [
      'tier-entry',
      'use-case-city'
    ],
    tags: [
      'tiger',
      'max-gt',
      'hiley'
    ],
    domains: [
      'hiley.com.ua'
    ],
    media: {
      images: [
        '/products/tiger-max-gt/main.webp',
        '/products/tiger-max-gt/handlebar.webp',
        '/products/tiger-max-gt/front.webp',
        '/products/tiger-max-gt/rear.webp',
        '/products/tiger-max-gt/folded.webp'
      ],
      videos: [],
      youtubeIds: [
        'lOdP8CyqspA'
      ]
    },
    seo: {
      title: null,
      titleUk: null,
      description: null,
      descriptionUk: null,
      keywords: [],
      ogImage: null
    },
    warranty: '24 months',
    warrantyUk: '24 місяці',
    rating: null,
    reviewCount: 0,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    metadata: {
      prepaymentTerms: {
        type: 'percentage',
        amount: 50,
        descriptionUk: '50% передоплата'
      }
    },
    series: 'Tiger',
    model: 'MAX GT',
    specs: {
      motor: {
        count: 1,
        powerPerMotor: 800,
        totalPower: 1470,
        peakPower: null,
        type: 'hub'
      },
      battery: {
        voltage: 52,
        voltageMin: null,
        capacityAh: 18.2,
        capacityAhMin: null,
        wattHours: 946,
        cells: 'DMEGC/EVE',
        chargeTimeMin: 5,
        chargeTimeMax: 9,
        chargerSpec: null
      },
      performance: {
        maxSpeed: 50,
        maxSpeedLimited: 20,
        range: 70,
        maxIncline: 15,
        maxLoad: 120
      },
      chassis: {
        weight: 25,
        wheelSize: 10,
        wheelType: 'pneumatic',
        foldable: true,
        dimensions: '1260x650x1300',
        foldedDimensions: '1260x210x520',
        brakeType: 'Drum',
        brakePistons: null,
        suspensionFront: 'spring',
        suspensionRear: 'spring',
        suspensionAdjustable: true
      },
      electronics: {
        display: 'LED',
        nfc: true,
        app: true,
        alarm: false,
        alarmWithWheelLock: null,
        cruiseControl: true,
        regenerativeBrake: true,
        dualMotorMode: false,
        rgbLeds: true
      },
      safety: {
        ipRating: 'IPX6',
        turnSignals: true,
        reflectors: null,
        horn: null
      },
      shipping: {
        weightKg: 30,
        seatsAmount: 1,
        boxes: [
          {
            dimensions: '140x75x70',
            weightKg: 30
          }
        ],
        cargoDescription: 'Електросамокат Tiger MAX GT',
        cargoType: null
      }
    },
    variants: [],
    colors: [],
    highlights: [
      'Compact design',
      'NFC lock',
      'RGB lighting',
      'Mobile app'
    ],
    highlightsUk: [
      'Компактний дизайн',
      'NFC замок',
      'RGB підсвітка',
      'Мобільний додаток'
    ],
    relatedProductIds: []
  },

{
    id: 'tiger-evo',
    slug: 'tiger-evo',
    sku: 'T-HILEY-TIGER-EVO',
    brandId: 'tiger',
    productType: 'scooter',
    name: 'Tiger EVO',
    nameUk: 'Tiger EVO',
    shortDescription: 'Ідеальний старт у світ Tiger з повним водозахистом IPX7. Мотор 1470W, 55 км/год, 60 км запасу.',
    shortDescriptionUk: 'Ідеальний старт у світ Tiger з повним водозахистом IPX7. Мотор 1470W, 55 км/год, 60 км запасу.',
    description: 'Tiger EVO — це найдоступніший спосіб приєднатися до сім\'ї Tiger з повним водозахистом IPX7. 60 км запасу ходу, вага 26 кг та елегантний колір Space Grey — ідеальний вибір для першого преміального самоката.\n\nОдномоторна система 1470W забезпечує швидкість до 55 км/год та економну їзду. 10-дюймові безкамерні колеса та пружинна підвіска з регулюванням гарантують комфорт на будь-якому покритті. Батарея DMEGC 18.2Ah — перевірена надійність.\n\nEVO має весь функціонал старших моделей: NFC-замок, мобільний додаток, RGB-підсвітка та поворотники. Дискові гальма NUTT забезпечують впевнене гальмування. Повний водозахист IPX7 — їздіть у будь-яку погоду без обмежень. Ідеальний старт у світ електротранспорту.',
    descriptionUk: 'Tiger EVO — це найдоступніший спосіб приєднатися до сім\'ї Tiger з повним водозахистом IPX7. 60 км запасу ходу, вага 26 кг та елегантний колір Space Grey — ідеальний вибір для першого преміального самоката.\n\nОдномоторна система 1470W забезпечує швидкість до 55 км/год та економну їзду. 10-дюймові безкамерні колеса та пружинна підвіска з регулюванням гарантують комфорт на будь-якому покритті. Батарея DMEGC 18.2Ah — перевірена надійність.\n\nEVO має весь функціонал старших моделей: NFC-замок, мобільний додаток, RGB-підсвітка та поворотники. Дискові гальма NUTT забезпечують впевнене гальмування. Повний водозахист IPX7 — їздіть у будь-яку погоду без обмежень. Ідеальний старт у світ електротранспорту.',
    priceUsdCents: 115000,
    originalPriceUsdCents: 130000,
    costUsdCents: null,
    availability: 'in_stock',
    purchaseModel: 'consultation',
    stockQuantity: 5,
    lowStockThreshold: null,
    featured: false,
    order: 114,
    categoryIds: [
      'tier-entry',
      'use-case-city'
    ],
    tags: [
      'tiger',
      'evo',
      'hiley'
    ],
    domains: [
      'hiley.com.ua'
    ],
    media: {
      images: [
        '/products/tiger-evo/main.webp',
        '/products/tiger-evo/display.webp',
        '/products/tiger-evo/folded.webp',
        '/products/tiger-evo/front.webp',
        '/products/tiger-evo/rear.webp'
      ],
      videos: [],
      youtubeIds: [
        'gbJI4bZu6qQ'
      ]
    },
    seo: {
      title: null,
      titleUk: null,
      description: null,
      descriptionUk: null,
      keywords: [],
      ogImage: null
    },
    warranty: '24 months',
    warrantyUk: '24 місяці',
    rating: null,
    reviewCount: 0,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    metadata: {
      prepaymentTerms: {
        type: 'percentage',
        amount: 50,
        descriptionUk: '50% передоплата'
      }
    },
    series: 'Tiger',
    model: 'EVO',
    specs: {
      motor: {
        count: 1,
        powerPerMotor: 1000,
        totalPower: 1470,
        peakPower: null,
        type: 'hub'
      },
      battery: {
        voltage: 52,
        voltageMin: null,
        capacityAh: 18.2,
        capacityAhMin: null,
        wattHours: 946,
        cells: 'DMEGC',
        chargeTimeMin: 3.5,
        chargeTimeMax: 11,
        chargerSpec: null
      },
      performance: {
        maxSpeed: 55,
        maxSpeedLimited: 20,
        range: 60,
        maxIncline: 15,
        maxLoad: 120
      },
      chassis: {
        weight: 26,
        wheelSize: 10,
        wheelType: 'tubeless',
        foldable: true,
        dimensions: '1235x690x1340',
        foldedDimensions: '1235x690x620',
        brakeType: 'NUTT Disc',
        brakePistons: null,
        suspensionFront: 'spring',
        suspensionRear: 'spring',
        suspensionAdjustable: true
      },
      electronics: {
        display: 'LED',
        nfc: true,
        app: true,
        alarm: false,
        alarmWithWheelLock: null,
        cruiseControl: true,
        regenerativeBrake: true,
        dualMotorMode: false,
        rgbLeds: true
      },
      safety: {
        ipRating: 'IPX7',
        turnSignals: true,
        reflectors: null,
        horn: null
      },
      shipping: {
        weightKg: 31,
        seatsAmount: 1,
        boxes: [
          {
            dimensions: '140x75x70',
            weightKg: 31
          }
        ],
        cargoDescription: 'Електросамокат Tiger EVO',
        cargoType: null
      }
    },
    variants: [],
    colors: [],
    highlights: [
      'Compact design',
      'NFC lock',
      'RGB lighting',
      'Mobile app'
    ],
    highlightsUk: [
      'Компактний дизайн',
      'NFC замок',
      'RGB підсвітка',
      'Мобільний додаток'
    ],
    relatedProductIds: []
  }
];

/**
 * Nami scooters from nami.com.ua
 * Migrated from nami-products.json
 * Total: 9 products
 * 
 * Migration completed: All 9 Nami scooters successfully mapped to new schema
 * - 1 Entry tier: Stellar ($1079)
 * - 4 Mid tier: Super Stellar, Klima One, Klima, Klima MAX
 * - 4 Premium tier: Blast, Blast MAX, Burn-E, Burn-E MAX
 * 
 * Special notes:
 * - Burn-E MAX available on both nami.com.ua and hysco.com.ua
 * - All use consultation purchase model with 4000 UAH prepayment
 * - Series preserved: burn-e, blast, klima, stellar
 * - Good data quality with complete shipping specs
 */
export const namiScooters: Scooter[] = [
{
    id: 'nami-burn-e',
    slug: 'burn-e',
    sku: 'NM-BE-001',
    brandId: 'nami',
    productType: 'scooter',
    name: 'Nami Burn-E',
    nameUk: 'Nami Burn-E',
    shortDescription: 'Спортивний самокат з карбоновою колонкою керма та гідравлічною підвіскою KKE 165 мм',
    shortDescriptionUk: 'Спортивний самокат з карбоновою колонкою керма та гідравлічною підвіскою KKE 165 мм',
    description: 'Nami Burn-E — це втілення стилю та продуктивності. Сучасний дизайн, плавне керування та неперевершений комфорт перетворюють кожну поїздку на враження. Потужна, елегантна та безпечна — Burn-E пропонує новий спосіб пересування. Трубчаста рама з алюмінію, колонка керма з карбону, регульована гідравлічна підвіска KKE та амортизатор керма забезпечують оптимальний контроль навіть на високій швидкості.',
    descriptionUk: 'Nami Burn-E — це втілення стилю та продуктивності. Сучасний дизайн, плавне керування та неперевершений комфорт перетворюють кожну поїздку на враження. Потужна, елегантна та безпечна — Burn-E пропонує новий спосіб пересування. Трубчаста рама з алюмінію, колонка керма з карбону, регульована гідравлічна підвіска KKE та амортизатор керма забезпечують оптимальний контроль навіть на високій швидкості.',
    priceUsdCents: 377900,
    originalPriceUsdCents: null,
    costUsdCents: null,
    availability: 'pre_order',
    purchaseModel: 'consultation',
    stockQuantity: null,
    lowStockThreshold: null,
    featured: false,
    order: 200,
    categoryIds: [
      'tier-premium',
      'use-case-performance'
    ],
    tags: [
      'nami',
      'burn-e',
      'burn-e'
    ],
    domains: [
      'nami.com.ua'
    ],
    media: {
      images: [
        '/products/nami/burn-e-main.webp',
        '/products/nami/burn-e-side.webp'
      ],
      videos: [],
      youtubeIds: []
    },
    seo: {
      title: null,
      titleUk: null,
      description: null,
      descriptionUk: null,
      keywords: [],
      ogImage: null
    },
    warranty: '6 months',
    warrantyUk: '6 місяців',
    rating: 4.7,
    reviewCount: 35,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    metadata: {
      prepaymentTerms: {
        type: 'fixed',
        amount: 400000,
        descriptionUk: '4000 UAH передоплата'
      }
    },
    series: 'burn-e',
    model: 'Burn-E',
    specs: {
      motor: {
        count: 2,
        powerPerMotor: 1000,
        totalPower: 6720,
        peakPower: null,
        type: 'hub'
      },
      battery: {
        voltage: 72,
        voltageMin: null,
        capacityAh: 30,
        capacityAhMin: null,
        wattHours: 2190,
        cells: null,
        chargeTimeMin: null,
        chargeTimeMax: null,
        chargerSpec: '72V 5A'
      },
      performance: {
        maxSpeed: 85,
        maxSpeedLimited: null,
        range: 110,
        maxIncline: null,
        maxLoad: 120
      },
      chassis: {
        weight: 48.8,
        wheelSize: 11,
        wheelType: 'tubeless',
        foldable: true,
        dimensions: '132x69x133',
        foldedDimensions: '132x69x63',
        brakeType: 'Гідравлічні 160 мм, 2 поршні',
        brakePistons: null,
        suspensionFront: 'hydraulic',
        suspensionRear: 'hydraulic',
        suspensionAdjustable: true
      },
      electronics: {
        display: 'LED',
        nfc: true,
        app: null,
        alarm: null,
        alarmWithWheelLock: null,
        cruiseControl: null,
        regenerativeBrake: null,
        dualMotorMode: true,
        rgbLeds: null
      },
      safety: {
        ipRating: 'IPX5',
        turnSignals: true,
        reflectors: null,
        horn: null
      },
      shipping: {
        weightKg: 53.8,
        seatsAmount: 1,
        boxes: [
          {
            dimensions: '130x70x65',
            weightKg: 53.8
          }
        ],
        cargoDescription: 'Електросамокат Nami Burn-E',
        cargoType: null
      }
    },
    variants: [],
    colors: [],
    highlights: [
      'Carbon steering column',
      'KKE hydraulic suspension',
      '11" tubeless wheels',
      'IPX5 waterproof'
    ],
    highlightsUk: [
      'Карбонова колонка',
      'Гідропідвіска KKE',
      '11" безкамерні',
      'IPX5 захист'
    ],
    relatedProductIds: []
  },

{
    id: 'nami-burn-e-max',
    slug: 'burn-e-max',
    sku: 'NM-BEM-001',
    brandId: 'nami',
    productType: 'scooter',
    name: 'Nami Burn-E MAX',
    nameUk: 'Nami Burn-E MAX',
    shortDescription: 'Флагман серії — 8400W потужності, 140 км запасу ходу, 4-поршневі гальма та карбонова колонка',
    shortDescriptionUk: 'Флагман серії — 8400W потужності, 140 км запасу ходу, 4-поршневі гальма та карбонова колонка',
    description: 'Nami Burn-E MAX — це потужність без компромісів. Створена для довгих подорожей та великих просторів, вона поєднує абсолютний комфорт, яскравий дизайн та повний контроль. Батарея 72V 40Ah (2880 Wh) забезпечує до 140 км запасу ходу. Подвійний мотор 2×1500W з максимальною потужністю 8400W, 4-поршневі гідравлічні гальма та регульована підвіска KKE 165 мм — еталон серед преміальних електросамокатів.',
    descriptionUk: 'Nami Burn-E MAX — це потужність без компромісів. Створена для довгих подорожей та великих просторів, вона поєднує абсолютний комфорт, яскравий дизайн та повний контроль. Батарея 72V 40Ah (2880 Wh) забезпечує до 140 км запасу ходу. Подвійний мотор 2×1500W з максимальною потужністю 8400W, 4-поршневі гідравлічні гальма та регульована підвіска KKE 165 мм — еталон серед преміальних електросамокатів.',
    priceUsdCents: 485900,
    originalPriceUsdCents: null,
    costUsdCents: null,
    availability: 'pre_order',
    purchaseModel: 'consultation',
    stockQuantity: null,
    lowStockThreshold: null,
    featured: true,
    order: 201,
    categoryIds: [
      'tier-premium',
      'use-case-performance'
    ],
    tags: [
      'nami',
      'burn-e',
      'burn-e-max'
    ],
    domains: [
      'nami.com.ua',
      'hysco.com.ua'
    ],
    media: {
      images: [
        '/products/nami/burn-e-max-main.webp'
      ],
      videos: [],
      youtubeIds: []
    },
    seo: {
      title: null,
      titleUk: null,
      description: null,
      descriptionUk: null,
      keywords: [],
      ogImage: null
    },
    warranty: '6 months',
    warrantyUk: '6 місяців',
    rating: 4.8,
    reviewCount: 28,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    metadata: {
      prepaymentTerms: {
        type: 'fixed',
        amount: 400000,
        descriptionUk: '4000 UAH передоплата'
      }
    },
    series: 'burn-e',
    model: 'Burn-E MAX',
    specs: {
      motor: {
        count: 2,
        powerPerMotor: 1500,
        totalPower: 8400,
        peakPower: null,
        type: 'hub'
      },
      battery: {
        voltage: 72,
        voltageMin: null,
        capacityAh: 40,
        capacityAhMin: null,
        wattHours: 2880,
        cells: null,
        chargeTimeMin: null,
        chargeTimeMax: null,
        chargerSpec: '72V 5A'
      },
      performance: {
        maxSpeed: 95,
        maxSpeedLimited: null,
        range: 140,
        maxIncline: null,
        maxLoad: 120
      },
      chassis: {
        weight: 53.1,
        wheelSize: 11,
        wheelType: 'tubeless',
        foldable: true,
        dimensions: '132x69x133',
        foldedDimensions: '132x69x63',
        brakeType: 'Гідравлічні 160 мм, 4 поршні',
        brakePistons: null,
        suspensionFront: 'hydraulic',
        suspensionRear: 'hydraulic',
        suspensionAdjustable: true
      },
      electronics: {
        display: 'LED',
        nfc: true,
        app: null,
        alarm: null,
        alarmWithWheelLock: null,
        cruiseControl: null,
        regenerativeBrake: null,
        dualMotorMode: true,
        rgbLeds: null
      },
      safety: {
        ipRating: 'IPX5',
        turnSignals: true,
        reflectors: null,
        horn: null
      },
      shipping: {
        weightKg: 58.1,
        seatsAmount: 1,
        boxes: [
          {
            dimensions: '130x70x65',
            weightKg: 58.1
          }
        ],
        cargoDescription: 'Електросамокат Nami Burn-E MAX',
        cargoType: null
      }
    },
    variants: [],
    colors: [],
    highlights: [
      'Carbon steering column',
      'KKE hydraulic suspension',
      '11" tubeless wheels',
      'IPX5 waterproof'
    ],
    highlightsUk: [
      'Карбонова колонка',
      'Гідропідвіска KKE',
      '11" безкамерні',
      'IPX5 захист'
    ],
    relatedProductIds: []
  },

{
    id: 'nami-blast',
    slug: 'blast',
    sku: 'NM-BL-001',
    brandId: 'nami',
    productType: 'scooter',
    name: 'Nami Blast',
    nameUk: 'Nami Blast',
    shortDescription: 'Кросовер між Burn-E та Klima — перевернута вилка, 85 км запасу ходу',
    shortDescriptionUk: 'Кросовер між Burn-E та Klima — перевернута вилка, 85 км запасу ходу',
    description: 'Nami Blast — справжній кросовер, що поєднує потужність, комфорт та універсальність. Запатентована перевернута передня вилка забезпечує виняткове поглинання ударів. Трубчаста рама гарантує стабільність та безпеку, а батарея 60V 29Ah (1740 Wh) — до 85 км запасу ходу. Гідравлічна підвіска KKE 150 мм, гідравлічні гальма та безкамерні шини 11 дюймів — готовий до будь-яких умов.',
    descriptionUk: 'Nami Blast — справжній кросовер, що поєднує потужність, комфорт та універсальність. Запатентована перевернута передня вилка забезпечує виняткове поглинання ударів. Трубчаста рама гарантує стабільність та безпеку, а батарея 60V 29Ah (1740 Wh) — до 85 км запасу ходу. Гідравлічна підвіска KKE 150 мм, гідравлічні гальма та безкамерні шини 11 дюймів — готовий до будь-яких умов.',
    priceUsdCents: 323900,
    originalPriceUsdCents: null,
    costUsdCents: null,
    availability: 'pre_order',
    purchaseModel: 'consultation',
    stockQuantity: null,
    lowStockThreshold: null,
    featured: false,
    order: 202,
    categoryIds: [
      'tier-premium',
      'use-case-performance'
    ],
    tags: [
      'nami',
      'blast',
      'blast'
    ],
    domains: [
      'nami.com.ua'
    ],
    media: {
      images: [
        '/products/nami/blast-main.webp',
        '/products/nami/blast-side.webp'
      ],
      videos: [],
      youtubeIds: []
    },
    seo: {
      title: null,
      titleUk: null,
      description: null,
      descriptionUk: null,
      keywords: [],
      ogImage: null
    },
    warranty: '6 months',
    warrantyUk: '6 місяців',
    rating: 4.6,
    reviewCount: 22,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    metadata: {
      prepaymentTerms: {
        type: 'fixed',
        amount: 400000,
        descriptionUk: '4000 UAH передоплата'
      }
    },
    series: 'blast',
    model: 'Blast',
    specs: {
      motor: {
        count: 2,
        powerPerMotor: 1000,
        totalPower: 5376,
        peakPower: null,
        type: 'hub'
      },
      battery: {
        voltage: 60,
        voltageMin: null,
        capacityAh: 29,
        capacityAhMin: null,
        wattHours: 1740,
        cells: null,
        chargeTimeMin: null,
        chargeTimeMax: null,
        chargerSpec: '60V 5A'
      },
      performance: {
        maxSpeed: 75,
        maxSpeedLimited: null,
        range: 85,
        maxIncline: null,
        maxLoad: 120
      },
      chassis: {
        weight: 45.3,
        wheelSize: 11,
        wheelType: 'tubeless',
        foldable: true,
        dimensions: '130x69x127',
        foldedDimensions: '130x69x57',
        brakeType: 'Гідравлічні 140 мм, 2 поршні',
        brakePistons: null,
        suspensionFront: 'hydraulic',
        suspensionRear: 'hydraulic',
        suspensionAdjustable: true
      },
      electronics: {
        display: 'LED',
        nfc: true,
        app: null,
        alarm: null,
        alarmWithWheelLock: null,
        cruiseControl: null,
        regenerativeBrake: null,
        dualMotorMode: true,
        rgbLeds: null
      },
      safety: {
        ipRating: 'IPX5',
        turnSignals: true,
        reflectors: null,
        horn: null
      },
      shipping: {
        weightKg: 50.3,
        seatsAmount: 1,
        boxes: [
          {
            dimensions: '130x70x65',
            weightKg: 50.3
          }
        ],
        cargoDescription: 'Електросамокат Nami Blast',
        cargoType: null
      }
    },
    variants: [],
    colors: [],
    highlights: [
      'Inverted fork',
      'KKE suspension',
      '11" wheels',
      'IPX5'
    ],
    highlightsUk: [
      'Перевернута вилка',
      'Підвіска KKE',
      '11" колеса',
      'IPX5'
    ],
    relatedProductIds: []
  },

{
    id: 'nami-blast-max',
    slug: 'blast-max',
    sku: 'NM-BLM-001',
    brandId: 'nami',
    productType: 'scooter',
    name: 'Nami Blast MAX',
    nameUk: 'Nami Blast MAX',
    shortDescription: 'Потужна версія Blast — 8400W, батарея 72V 40Ah, 100 км запасу ходу',
    shortDescriptionUk: 'Потужна версія Blast — 8400W, батарея 72V 40Ah, 100 км запасу ходу',
    description: 'Nami Blast MAX — екстремальна потужність, далекобійність та абсолютний комфорт. Подвійний мотор 2×1500W з максимальною потужністю 8400W, батарея 72V 40Ah (2880 Wh) та запас ходу до 100 км. Розгін від 0 до 25 км/год за 1.5 секунди. Гідравлічна підвіска KKE, гідравлічні гальма та безкамерні шини CST 11 дюймів для ідеальної поведінки на дорозі.',
    descriptionUk: 'Nami Blast MAX — екстремальна потужність, далекобійність та абсолютний комфорт. Подвійний мотор 2×1500W з максимальною потужністю 8400W, батарея 72V 40Ah (2880 Wh) та запас ходу до 100 км. Розгін від 0 до 25 км/год за 1.5 секунди. Гідравлічна підвіска KKE, гідравлічні гальма та безкамерні шини CST 11 дюймів для ідеальної поведінки на дорозі.',
    priceUsdCents: 367100,
    originalPriceUsdCents: null,
    costUsdCents: null,
    availability: 'pre_order',
    purchaseModel: 'consultation',
    stockQuantity: null,
    lowStockThreshold: null,
    featured: false,
    order: 203,
    categoryIds: [
      'tier-premium',
      'use-case-performance'
    ],
    tags: [
      'nami',
      'blast',
      'blast-max'
    ],
    domains: [
      'nami.com.ua'
    ],
    media: {
      images: [
        '/products/nami/blast-max-main.webp'
      ],
      videos: [],
      youtubeIds: []
    },
    seo: {
      title: null,
      titleUk: null,
      description: null,
      descriptionUk: null,
      keywords: [],
      ogImage: null
    },
    warranty: '6 months',
    warrantyUk: '6 місяців',
    rating: 4.7,
    reviewCount: 18,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    metadata: {
      prepaymentTerms: {
        type: 'fixed',
        amount: 400000,
        descriptionUk: '4000 UAH передоплата'
      }
    },
    series: 'blast',
    model: 'Blast MAX',
    specs: {
      motor: {
        count: 2,
        powerPerMotor: 1500,
        totalPower: 8400,
        peakPower: null,
        type: 'hub'
      },
      battery: {
        voltage: 72,
        voltageMin: null,
        capacityAh: 40,
        capacityAhMin: null,
        wattHours: 2880,
        cells: null,
        chargeTimeMin: null,
        chargeTimeMax: null,
        chargerSpec: '72V 5A'
      },
      performance: {
        maxSpeed: 85,
        maxSpeedLimited: null,
        range: 100,
        maxIncline: null,
        maxLoad: 120
      },
      chassis: {
        weight: 48.2,
        wheelSize: 11,
        wheelType: 'tubeless',
        foldable: true,
        dimensions: '130x69x127',
        foldedDimensions: '130x69x57',
        brakeType: 'Гідравлічні 140 мм, 2 поршні',
        brakePistons: null,
        suspensionFront: 'hydraulic',
        suspensionRear: 'hydraulic',
        suspensionAdjustable: true
      },
      electronics: {
        display: 'LED',
        nfc: true,
        app: null,
        alarm: null,
        alarmWithWheelLock: null,
        cruiseControl: null,
        regenerativeBrake: null,
        dualMotorMode: true,
        rgbLeds: null
      },
      safety: {
        ipRating: 'IPX5',
        turnSignals: true,
        reflectors: null,
        horn: null
      },
      shipping: {
        weightKg: 53.2,
        seatsAmount: 1,
        boxes: [
          {
            dimensions: '130x70x65',
            weightKg: 53.2
          }
        ],
        cargoDescription: 'Електросамокат Nami Blast MAX',
        cargoType: null
      }
    },
    variants: [],
    colors: [],
    highlights: [
      'Inverted fork',
      'KKE suspension',
      '11" wheels',
      'IPX5'
    ],
    highlightsUk: [
      'Перевернута вилка',
      'Підвіска KKE',
      '11" колеса',
      'IPX5'
    ],
    relatedProductIds: []
  },

{
    id: 'nami-klima',
    slug: 'klima',
    sku: 'NM-KL-001',
    brandId: 'nami',
    productType: 'scooter',
    name: 'Nami Klima',
    nameUk: 'Nami Klima',
    shortDescription: 'Міський самокат з подвійним мотором, 100 км запасу ходу та гідравлічною підвіскою',
    shortDescriptionUk: 'Міський самокат з подвійним мотором, 100 км запасу ходу та гідравлічною підвіскою',
    description: 'Nami Klima — міська спритність на вищому рівні. Комфортна, потужна та безпечна, вона адаптується до щоденних поїздок містом та за його межами. Компактний формат, колеса 11 дюймів tubeless та гідравлічна підвіска KKE дозволяють проїхати будь-де. Подвійний мотор 2×1000W, батарея 60V 25Ah (1500 Wh) та 100 км запасу ходу для активного міського використання.',
    descriptionUk: 'Nami Klima — міська спритність на вищому рівні. Комфортна, потужна та безпечна, вона адаптується до щоденних поїздок містом та за його межами. Компактний формат, колеса 11 дюймів tubeless та гідравлічна підвіска KKE дозволяють проїхати будь-де. Подвійний мотор 2×1000W, батарея 60V 25Ah (1500 Wh) та 100 км запасу ходу для активного міського використання.',
    priceUsdCents: 215900,
    originalPriceUsdCents: 248300,
    costUsdCents: null,
    availability: 'pre_order',
    purchaseModel: 'consultation',
    stockQuantity: null,
    lowStockThreshold: null,
    featured: false,
    order: 204,
    categoryIds: [
      'tier-mid',
      'use-case-commute'
    ],
    tags: [
      'nami',
      'klima',
      'klima'
    ],
    domains: [
      'nami.com.ua'
    ],
    media: {
      images: [
        '/products/nami/klima-main.webp',
        '/products/nami/klima-side.webp'
      ],
      videos: [],
      youtubeIds: []
    },
    seo: {
      title: null,
      titleUk: null,
      description: null,
      descriptionUk: null,
      keywords: [],
      ogImage: null
    },
    warranty: '6 months',
    warrantyUk: '6 місяців',
    rating: 4.5,
    reviewCount: 30,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    metadata: {
      prepaymentTerms: {
        type: 'fixed',
        amount: 400000,
        descriptionUk: '4000 UAH передоплата'
      }
    },
    series: 'klima',
    model: 'Klima',
    specs: {
      motor: {
        count: 2,
        powerPerMotor: 1000,
        totalPower: 5376,
        peakPower: null,
        type: 'hub'
      },
      battery: {
        voltage: 60,
        voltageMin: null,
        capacityAh: 25,
        capacityAhMin: null,
        wattHours: 1500,
        cells: null,
        chargeTimeMin: null,
        chargeTimeMax: null,
        chargerSpec: '60V 5A'
      },
      performance: {
        maxSpeed: 65,
        maxSpeedLimited: null,
        range: 100,
        maxIncline: null,
        maxLoad: 110
      },
      chassis: {
        weight: 37.6,
        wheelSize: 11,
        wheelType: 'tubeless',
        foldable: true,
        dimensions: '127x69x133',
        foldedDimensions: '127x69x67',
        brakeType: 'Гідравлічні 140 мм, 2 поршні',
        brakePistons: null,
        suspensionFront: 'hydraulic',
        suspensionRear: 'hydraulic',
        suspensionAdjustable: true
      },
      electronics: {
        display: 'LED',
        nfc: true,
        app: null,
        alarm: null,
        alarmWithWheelLock: null,
        cruiseControl: null,
        regenerativeBrake: null,
        dualMotorMode: true,
        rgbLeds: null
      },
      safety: {
        ipRating: 'IPX5',
        turnSignals: true,
        reflectors: null,
        horn: null
      },
      shipping: {
        weightKg: 42.6,
        seatsAmount: 1,
        boxes: [
          {
            dimensions: '130x70x65',
            weightKg: 42.6
          }
        ],
        cargoDescription: 'Електросамокат Nami Klima',
        cargoType: null
      }
    },
    variants: [],
    colors: [],
    highlights: [
      'Compact urban',
      'KKE suspension',
      '11" wheels',
      'Lightweight'
    ],
    highlightsUk: [
      'Компактний міський',
      'Підвіска KKE',
      '11" колеса',
      'Легкий'
    ],
    relatedProductIds: []
  },

{
    id: 'nami-klima-max',
    slug: 'klima-max',
    sku: 'NM-KLM-001',
    brandId: 'nami',
    productType: 'scooter',
    name: 'Nami Klima MAX',
    nameUk: 'Nami Klima MAX',
    shortDescription: 'Покращена Klima — 120 км запасу ходу, подвійний мотор та збільшена батарея',
    shortDescriptionUk: 'Покращена Klima — 120 км запасу ходу, подвійний мотор та збільшена батарея',
    description: 'Nami Klima MAX поєднує всі переваги Klima з посиленими характеристиками. Потужна міська модель для тих, хто хоче потужний, надійний та завжди приємний у керуванні самокат. Подвійний мотор, батарея 60V 30Ah (1800 Wh), контролер 40A×2 та 120 км запасу ходу. Компактний формат із підвіскою KKE для ідеального комфорту.',
    descriptionUk: 'Nami Klima MAX поєднує всі переваги Klima з посиленими характеристиками. Потужна міська модель для тих, хто хоче потужний, надійний та завжди приємний у керуванні самокат. Подвійний мотор, батарея 60V 30Ah (1800 Wh), контролер 40A×2 та 120 км запасу ходу. Компактний формат із підвіскою KKE для ідеального комфорту.',
    priceUsdCents: 230000,
    originalPriceUsdCents: 259100,
    costUsdCents: null,
    availability: 'pre_order',
    purchaseModel: 'consultation',
    stockQuantity: null,
    lowStockThreshold: null,
    featured: false,
    order: 205,
    categoryIds: [
      'tier-mid',
      'use-case-commute'
    ],
    tags: [
      'nami',
      'klima',
      'klima-max'
    ],
    domains: [
      'nami.com.ua'
    ],
    media: {
      images: [
        '/products/nami/klima-max-main.webp'
      ],
      videos: [],
      youtubeIds: []
    },
    seo: {
      title: null,
      titleUk: null,
      description: null,
      descriptionUk: null,
      keywords: [],
      ogImage: null
    },
    warranty: '6 months',
    warrantyUk: '6 місяців',
    rating: 4.6,
    reviewCount: 15,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    metadata: {
      prepaymentTerms: {
        type: 'fixed',
        amount: 400000,
        descriptionUk: '4000 UAH передоплата'
      }
    },
    series: 'klima',
     model: 'Klima MAX',
    specs: {
      motor: {
        count: 2,
        powerPerMotor: 1000,
        totalPower: 5376,
        peakPower: null,
        type: 'hub'
      },
      battery: {
        voltage: 60,
        voltageMin: null,
        capacityAh: 30,
        capacityAhMin: null,
        wattHours: 1800,
        cells: null,
        chargeTimeMin: null,
        chargeTimeMax: null,
        chargerSpec: '60V 5A'
      },
      performance: {
        maxSpeed: 70,
        maxSpeedLimited: null,
        range: 120,
        maxIncline: null,
        maxLoad: 110
      },
      chassis: {
        weight: 38.3,
        wheelSize: 11,
        wheelType: 'tubeless',
        foldable: true,
        dimensions: '127x69x133',
        foldedDimensions: '127x69x67',
        brakeType: 'Гідравлічні 140 мм, 2 поршні',
        brakePistons: null,
        suspensionFront: 'hydraulic',
        suspensionRear: 'hydraulic',
        suspensionAdjustable: true
      },
      electronics: {
        display: 'LED',
        nfc: true,
        app: null,
        alarm: null,
        alarmWithWheelLock: null,
        cruiseControl: null,
        regenerativeBrake: null,
        dualMotorMode: true,
        rgbLeds: null
      },
      safety: {
        ipRating: 'IPX5',
        turnSignals: true,
        reflectors: null,
        horn: null
      },
      shipping: {
        weightKg: 43.3,
        seatsAmount: 1,
        boxes: [
          {
            dimensions: '130x70x65',
            weightKg: 43.3
          }
        ],
        cargoDescription: 'Електросамокат Nami Klima MAX',
        cargoType: null
      }
    },
    variants: [],
    colors: [],
    highlights: [
      'Compact urban',
      'KKE suspension',
      '11" wheels',
      'Lightweight'
    ],
    highlightsUk: [
      'Компактний міський',
      'Підвіска KKE',
      '11" колеса',
      'Легкий'
    ],
    relatedProductIds: []
  },

{
    id: 'nami-klima-one',
    slug: 'klima-one',
    sku: 'NM-KLO-001',
    brandId: 'nami',
    productType: 'scooter',
    name: 'Nami Klima ONE',
    nameUk: 'Nami Klima ONE',
    shortDescription: 'Найдоступніша модель серії — 150 км запасу ходу, легка та маневрена',
    shortDescriptionUk: 'Найдоступніша модель серії — 150 км запасу ходу, легка та маневрена',
    description: 'Nami Klima ONE — найдоступніша версія лінійки, створена для міста. Компактна, легка та плавна в керуванні, вона пропонує комфортну та інтуїтивну їзду без компромісів. Двомоторна конфігурація з контролером 40A в режимі одного мотора для максимальної ефективності, гідравлічна підвіска KKE, батарея 60V 25Ah (1500 Wh) та вражаючий запас ходу 150 км. Вага лише 33.8 кг.',
    descriptionUk: 'Nami Klima ONE — найдоступніша версія лінійки, створена для міста. Компактна, легка та плавна в керуванні, вона пропонує комфортну та інтуїтивну їзду без компромісів. Двомоторна конфігурація з контролером 40A в режимі одного мотора для максимальної ефективності, гідравлічна підвіска KKE, батарея 60V 25Ah (1500 Wh) та вражаючий запас ходу 150 км. Вага лише 33.8 кг.',
    priceUsdCents: 183500,
    originalPriceUsdCents: 205100,
    costUsdCents: null,
    availability: 'pre_order',
    purchaseModel: 'consultation',
    stockQuantity: null,
    lowStockThreshold: null,
    featured: false,
    order: 206,
    categoryIds: [
      'tier-mid',
      'use-case-commute'
    ],
    tags: [
      'nami',
      'klima',
      'klima-one'
    ],
    domains: [
      'nami.com.ua'
    ],
    media: {
      images: [
        '/products/nami/klima-one-main.webp',
        '/products/nami/klima-one-side.webp'
      ],
      videos: [],
      youtubeIds: []
    },
    seo: {
      title: null,
      titleUk: null,
      description: null,
      descriptionUk: null,
      keywords: [],
      ogImage: null
    },
    warranty: '6 months',
    warrantyUk: '6 місяців',
    rating: 4.4,
    reviewCount: 12,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    metadata: {
      prepaymentTerms: {
        type: 'fixed',
        amount: 400000,
        descriptionUk: '4000 UAH передоплата'
      }
    },
    series: 'klima',
    model: 'Klima ONE',
    specs: {
      motor: {
        count: 2,
        powerPerMotor: 1000,
        totalPower: 2688,
        peakPower: null,
        type: 'hub'
      },
      battery: {
        voltage: 60,
        voltageMin: null,
        capacityAh: 25,
        capacityAhMin: null,
        wattHours: 1500,
        cells: null,
        chargeTimeMin: null,
        chargeTimeMax: null,
        chargerSpec: '60V 5A'
      },
      performance: {
        maxSpeed: 50,
        maxSpeedLimited: null,
        range: 150,
        maxIncline: null,
        maxLoad: 110
      },
      chassis: {
        weight: 33.8,
        wheelSize: 11,
        wheelType: 'tubeless',
        foldable: true,
        dimensions: '127x69x133',
        foldedDimensions: '127x69x67',
        brakeType: 'Гідравлічні 140 мм, 2 поршні',
        brakePistons: null,
        suspensionFront: 'hydraulic',
        suspensionRear: 'hydraulic',
        suspensionAdjustable: true
      },
      electronics: {
        display: 'LED',
        nfc: true,
        app: null,
        alarm: null,
        alarmWithWheelLock: null,
        cruiseControl: null,
        regenerativeBrake: null,
        dualMotorMode: null,
        rgbLeds: null
      },
      safety: {
        ipRating: 'IPX5',
        turnSignals: true,
        reflectors: null,
        horn: null
      },
      shipping: {
        weightKg: 38.8,
        seatsAmount: 1,
        boxes: [
          {
            dimensions: '130x70x65',
            weightKg: 38.8
          }
        ],
        cargoDescription: 'Електросамокат Nami Klima ONE',
        cargoType: null
      }
    },
    variants: [],
    colors: [],
    highlights: [
      'Compact urban',
      'KKE suspension',
      '11" wheels',
      'Lightweight'
    ],
    highlightsUk: [
      'Компактний міський',
      'Підвіска KKE',
      '11" колеса',
      'Легкий'
    ],
    relatedProductIds: []
  },

{
    id: 'nami-stellar',
    slug: 'stellar',
    sku: 'NM-ST-001',
    brandId: 'nami',
    productType: 'scooter',
    name: 'Nami Stellar',
    nameUk: 'Nami Stellar',
    shortDescription: 'Легкий міський самокат — 26.5 кг, 50 км запасу ходу, ідеальний для щоденних поїздок',
    shortDescriptionUk: 'Легкий міський самокат — 26.5 кг, 50 км запасу ходу, ідеальний для щоденних поїздок',
    description: 'Nami Stellar — міський самокат нового покоління: легкий, маневрений та потужний. Спрощує поїздки містом навіть на підйомах, забезпечуючи комфорт, безпеку та стильний дизайн. Одномоторна конфігурація 1×1000W, батарея 52V 15.6Ah (786 Wh), безкамерні шини 9 дюймів. Пружинна підвіска, NFC, повний LED з поворотниками та сертифікація IPX5.',
    descriptionUk: 'Nami Stellar — міський самокат нового покоління: легкий, маневрений та потужний. Спрощує поїздки містом навіть на підйомах, забезпечуючи комфорт, безпеку та стильний дизайн. Одномоторна конфігурація 1×1000W, батарея 52V 15.6Ah (786 Wh), безкамерні шини 9 дюймів. Пружинна підвіска, NFC, повний LED з поворотниками та сертифікація IPX5.',
    priceUsdCents: 107900,
    originalPriceUsdCents: 129500,
    costUsdCents: null,
    availability: 'pre_order',
    purchaseModel: 'consultation',
    stockQuantity: null,
    lowStockThreshold: null,
    featured: false,
    order: 207,
    categoryIds: [
      'tier-entry',
      'use-case-city'
    ],
    tags: [
      'nami',
      'stellar',
      'stellar'
    ],
    domains: [
      'nami.com.ua'
    ],
    media: {
      images: [
        '/products/nami/stellar-main.webp',
        '/products/nami/stellar-side.webp'
      ],
      videos: [],
      youtubeIds: []
    },
    seo: {
      title: null,
      titleUk: null,
      description: null,
      descriptionUk: null,
      keywords: [],
      ogImage: null
    },
    warranty: '6 months',
    warrantyUk: '6 місяців',
    rating: 4.3,
    reviewCount: 25,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    metadata: {
      prepaymentTerms: {
        type: 'fixed',
        amount: 400000,
        descriptionUk: '4000 UAH передоплата'
      }
    },
    series: 'stellar',
    model: 'Stellar',
    specs: {
      motor: {
        count: 1,
        powerPerMotor: 1000,
        totalPower: 1470,
        peakPower: null,
        type: 'hub'
      },
      battery: {
        voltage: 52,
        voltageMin: null,
        capacityAh: 15.6,
        capacityAhMin: null,
        wattHours: 786,
        cells: null,
        chargeTimeMin: null,
        chargeTimeMax: null,
        chargerSpec: '52V 2A'
      },
      performance: {
        maxSpeed: 45,
        maxSpeedLimited: null,
        range: 50,
        maxIncline: null,
        maxLoad: 110
      },
      chassis: {
        weight: 26.5,
        wheelSize: 9,
        wheelType: 'tubeless',
        foldable: true,
        dimensions: '120x62x136',
        foldedDimensions: '120x62x57',
        brakeType: 'Тросові 140 мм, 2 поршні',
        brakePistons: null,
        suspensionFront: 'spring',
        suspensionRear: 'spring',
        suspensionAdjustable: null
      },
      electronics: {
        display: 'LED',
        nfc: true,
        app: null,
        alarm: null,
        alarmWithWheelLock: null,
        cruiseControl: null,
        regenerativeBrake: null,
        dualMotorMode: null,
        rgbLeds: null
      },
      safety: {
        ipRating: 'IPX5',
        turnSignals: true,
        reflectors: null,
        horn: null
      },
      shipping: {
        weightKg: 31.5,
        seatsAmount: 1,
        boxes: [
          {
            dimensions: '130x70x65',
            weightKg: 31.5
          }
        ],
        cargoDescription: 'Електросамокат Nami Stellar',
        cargoType: null
      }
    },
    variants: [],
    colors: [],
    highlights: [
      'Lightweight',
      'Urban mobility',
      'Affordable',
      'Reliable'
    ],
    highlightsUk: [
      'Легкий',
      'Міська мобільність',
      'Доступний',
      'Надійний'
    ],
    relatedProductIds: []
  },

{
    id: 'nami-super-stellar',
    slug: 'super-stellar',
    sku: 'NM-SST-001',
    brandId: 'nami',
    productType: 'scooter',
    name: 'Nami Super Stellar',
    nameUk: 'Nami Super Stellar',
    shortDescription: 'Компактний двомоторний — 75 км запасу ходу, спритність та потужність у міському форматі',
    shortDescriptionUk: 'Компактний двомоторний — 75 км запасу ходу, спритність та потужність у міському форматі',
    description: 'Nami Super Stellar — легка, потужна та розумна. Два мотори 2×1000W з потужністю до 2940W, батарея 52V 25Ah (1277 Wh) та 75 км запасу ходу. Розгін від 0 до 25 км/год за 2.2 секунди. Гідравлічні гальма, пружинна підвіска, безкамерні шини 9 дюймів. Компактна та складна — ідеальне рішення для міської електромобільності без компромісів.',
    descriptionUk: 'Nami Super Stellar — легка, потужна та розумна. Два мотори 2×1000W з потужністю до 2940W, батарея 52V 25Ah (1277 Wh) та 75 км запасу ходу. Розгін від 0 до 25 км/год за 2.2 секунди. Гідравлічні гальма, пружинна підвіска, безкамерні шини 9 дюймів. Компактна та складна — ідеальне рішення для міської електромобільності без компромісів.',
    priceUsdCents: 188000,
    originalPriceUsdCents: 194300,
    costUsdCents: null,
    availability: 'pre_order',
    purchaseModel: 'consultation',
    stockQuantity: null,
    lowStockThreshold: null,
    featured: false,
    order: 208,
    categoryIds: [
      'tier-mid',
      'use-case-commute'
    ],
    tags: [
      'nami',
      'stellar',
      'super-stellar'
    ],
    domains: [
      'nami.com.ua'
    ],
    media: {
      images: [
        '/products/nami/super-stellar-main.webp',
        '/products/nami/super-stellar-side.webp'
      ],
      videos: [],
      youtubeIds: []
    },
    seo: {
      title: null,
      titleUk: null,
      description: null,
      descriptionUk: null,
      keywords: [],
      ogImage: null
    },
    warranty: '6 months',
    warrantyUk: '6 місяців',
    rating: 4.4,
    reviewCount: 16,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    metadata: {
      prepaymentTerms: {
        type: 'fixed',
        amount: 400000,
        descriptionUk: '4000 UAH передоплата'
      }
    },
    series: 'stellar',
    model: 'Super Stellar',
    specs: {
      motor: {
        count: 2,
        powerPerMotor: 1000,
        totalPower: 2940,
        peakPower: null,
        type: 'hub'
      },
      battery: {
        voltage: 52,
        voltageMin: null,
        capacityAh: 25,
        capacityAhMin: null,
        wattHours: 1277,
        cells: null,
        chargeTimeMin: null,
        chargeTimeMax: null,
        chargerSpec: '52V 2A'
      },
      performance: {
        maxSpeed: 55,
        maxSpeedLimited: null,
        range: 75,
        maxIncline: null,
        maxLoad: 110
      },
      chassis: {
        weight: 30,
        wheelSize: 9,
        wheelType: 'tubeless',
        foldable: true,
        dimensions: '120x62x136',
        foldedDimensions: '120x62x57',
        brakeType: 'Гідравлічні 140 мм, 2 поршні',
        brakePistons: null,
        suspensionFront: 'spring',
        suspensionRear: 'spring',
        suspensionAdjustable: null
      },
      electronics: {
        display: 'LED',
        nfc: true,
        app: null,
        alarm: null,
        alarmWithWheelLock: null,
        cruiseControl: null,
        regenerativeBrake: null,
        dualMotorMode: true,
        rgbLeds: null
      },
      safety: {
        ipRating: 'IPX5',
        turnSignals: true,
        reflectors: null,
        horn: null
      },
      shipping: {
        weightKg: 35,
        seatsAmount: 1,
        boxes: [
          {
            dimensions: '130x70x65',
            weightKg: 35
          }
        ],
        cargoDescription: 'Електросамокат Nami Super Stellar',
        cargoType: null
      }
    },
    variants: [],
    colors: [],
    highlights: [
      'Lightweight',
      'Urban mobility',
      'Affordable',
      'Reliable'
    ],
    highlightsUk: [
      'Легкий',
      'Міська мобільність',
      'Доступний',
      'Надійний'
    ],
    relatedProductIds: []
  }
];

/**
 * Kaabo scooters from scootify.com.ua
 * Migrated from products.json on 2026-02-21
 * Total: 6 products
 * 
 * Migration details:
 * - Wolf King GTR (tier-hyper, $4000): 2x2000W, 72V 35-40Ah, 105 km/h, 180-200km range
 * - Wolf Warrior 11 Plus (tier-premium, $2500): 2x1200W, 60V 26Ah, 80 km/h, 90km range
 * - Wolf Warrior X Pro+ (tier-premium, $2200): 2x1100W, 60V 28Ah, 70 km/h, 100km range
 * - Wolf Warrior X Plus (tier-mid, $1800): 2x1100W, 60V 21Ah, 70 km/h, 70km range
 * - Mantis King GT (tier-mid, $1600): 2x1100W, 60V 24Ah, 70 km/h, 90km range
 * - Mantis 10 Plus (tier-mid, $1400): 2x1000W, 60V 18.2Ah, 60 km/h, 75km range
 */
export const kaaboScooters: Scooter[] = [
{
    id: 'kaabo-bc9faad1-e964-4a15-8210-11cbfc782579',
    slug: 'elektrosamokat-kaabo-wolf-king-gtr-seriia',
    sku: 'KAABO-WK-GTR-MAX-GOLD',
    brandId: 'kaabo',
    productType: 'scooter',
    name: 'Електросамокат Kaabo Wolf King GTR Серія (GTR / GTR Max)',
    nameUk: 'Електросамокат Kaabo Wolf King GTR Серія (GTR / GTR Max)',
    shortDescription: 'Флагман лінійки Kaabo: 2x2000W мотори, 72V батарея, до 105 км/год та 200 км запас ходу. Абсолютний максимум потужності та дальності серед електросамокатів.',
    shortDescriptionUk: 'Флагман лінійки Kaabo: 2x2000W мотори, 72V батарея, до 105 км/год та 200 км запас ходу. Абсолютний максимум потужності та дальності серед електросамокатів.',
    description: '## Kaabo Wolf King GTR — Флагман Без Компромісів\n\nWolf King GTR — це вершина лінійки Kaabo, створена для тих, хто вимагає максимальної продуктивності від електросамоката. Два мотори по 2000W з піковою потужністю 13440W розганяють до 105 км/год, а батареї 72V 35Ah (LG) або 40Ah (Samsung) забезпечують запас ходу 180-200 км. 12-дюймові безкамерні колеса CST та гідравлічні дискові гальма з 4-поршневими калiперами — це рівень мотоциклетного обладнання.\n\nДвоважільна передня підвіска та задній гідравлічний амортизатор забезпечують комфорт на будь-якому покритті. Захист IPX5 (корпус) та IPX7 (дисплей), знімна батарея, TFT дисплей — це повноцінний транспортний засіб для щоденного використання та далеких поїздок.\n\nВарто враховувати: вага 63-67 кг робить GTR не найзручнішим для перенесення, а потужність вимагає досвіду водіння. Це самокат для досвідчених райдерів, які точно знають, навіщо їм 13 кВт потужності.',
    descriptionUk: '## Kaabo Wolf King GTR — Флагман Без Компромісів\n\nWolf King GTR — це вершина лінійки Kaabo, створена для тих, хто вимагає максимальної продуктивності від електросамоката. Два мотори по 2000W з піковою потужністю 13440W розганяють до 105 км/год, а батареї 72V 35Ah (LG) або 40Ah (Samsung) забезпечують запас ходу 180-200 км. 12-дюймові безкамерні колеса CST та гідравлічні дискові гальма з 4-поршневими калiперами — це рівень мотоциклетного обладнання.\n\nДвоважільна передня підвіска та задній гідравлічний амортизатор забезпечують комфорт на будь-якому покритті. Захист IPX5 (корпус) та IPX7 (дисплей), знімна батарея, TFT дисплей — це повноцінний транспортний засіб для щоденного використання та далеких поїздок.\n\nВарто враховувати: вага 63-67 кг робить GTR не найзручнішим для перенесення, а потужність вимагає досвіду водіння. Це самокат для досвідчених райдерів, які точно знають, навіщо їм 13 кВт потужності.',
    priceUsdCents: 410000,
    originalPriceUsdCents: 460000,
    costUsdCents: null,
    availability: 'in_stock',
    purchaseModel: 'consultation',
    stockQuantity: null,
    lowStockThreshold: null,
    featured: true,
    order: 300,
    categoryIds: [
      'tier-hyper',
      'use-case-performance'
    ],
    tags: [
      'Kaabo',
      'Wolf King',
      'GTR',
      'GTR Max',
      'Екстрим',
      'Повний привід',
      '105 км/год',
      '13440W',
      'Гідравліка',
      '12 дюймів'
    ],
    domains: [
      'scootify.com.ua',
      'hysco.com.ua'
    ],
    media: {
      images: [
        '/images/products/wolf-king-gtr/main.webp',
        '/images/products/wolf-king-gtr/gallery-1.webp',
        '/images/products/wolf-king-gtr/gallery-2.webp',
        '/images/products/wolf-king-gtr/gallery-3.webp',
        '/images/products/wolf-king-gtr/gallery-4.webp',
        '/images/products/wolf-king-gtr/gallery-5.webp',
        '/images/products/wolf-king-gtr/gallery-6.webp',
        '/images/products/wolf-king-gtr/gallery-7.webp',
        '/images/products/wolf-king-gtr/gallery-8.webp',
        '/images/products/wolf-king-gtr/gallery-9.webp',
        '/images/products/wolf-king-gtr/gallery-10.webp',
        '/images/products/wolf-king-gtr/gallery-11.webp',
        '/images/products/wolf-king-gtr/gallery-12.webp'
      ],
      videos: [],
      youtubeIds: []
    },
    seo: {
      title: null,
      titleUk: null,
      description: null,
      descriptionUk: null,
      keywords: [],
      ogImage: null
    },
    warranty: '6 months',
    warrantyUk: '6 місяців',
    rating: null,
    reviewCount: 0,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    metadata: {
      prepaymentTerms: {
        type: 'fixed',
        amount: 400000,
        descriptionUk: '4000 UAH передоплата'
      }
    },
    series: 'Kaabo',
    model: 'Wolf King GTR Серія (GTR / GTR Max)',
    specs: {
      motor: {
        count: 2,
        powerPerMotor: 2000,
        totalPower: 4000,
        peakPower: 13440,
        type: 'hub'
      },
      battery: {
        voltage: 72,
        voltageMin: null,
        capacityAh: 40,
        capacityAhMin: 35,
        wattHours: null,
        cells: 'LG/Samsung',
        chargeTimeMin: null,
        chargeTimeMax: null,
        chargerSpec: null
      },
      performance: {
        maxSpeed: 105,
        maxSpeedLimited: null,
        range: 200,
        maxIncline: 50,
        maxLoad: 150
      },
      chassis: {
        weight: 65,
        wheelSize: null,
        wheelType: null,
        foldable: true,
        dimensions: null,
        foldedDimensions: null,
        brakeType: 'Hydraulic disc',
        brakePistons: null,
        suspensionFront: 'hydraulic',
        suspensionRear: 'hydraulic',
        suspensionAdjustable: null
      },
      electronics: {
        display: 'TFT',
        nfc: null,
        app: null,
        alarm: null,
        alarmWithWheelLock: null,
        cruiseControl: null,
        regenerativeBrake: null,
        dualMotorMode: false,
        rgbLeds: null
      },
      safety: {
        ipRating: null,
        turnSignals: null,
        reflectors: null,
        horn: null
      },
      shipping: {
        weightKg: 70,
        seatsAmount: 1,
        boxes: [
          {
            dimensions: '140x75x70',
            weightKg: 70
          }
        ],
        cargoDescription: 'Електросамокат Kaabo Wolf King GTR Серія (GTR / GTR Max)',
        cargoType: null
      }
    },
    variants: [],
    colors: [],
    highlights: [
      'Dual 2000W motors',
      '72V system',
      'Extreme performance',
      '12" wheels'
    ],
    highlightsUk: [
      'Подвійні мотори 2000W',
      'Система 72V',
      'Екстремальна продуктивність',
      '12" колеса'
    ],
    relatedProductIds: []
  },

{
    id: 'kaabo-a1d3e7b2-4c9f-48a6-b5d1-7e2f8c3a9b04',
    slug: 'elektrosamokat-kaabo-wolf-warrior-11-plus',
    sku: 'KAABO-WOLF-WARRIOR-11-PLUS',
    brandId: 'kaabo',
    productType: 'scooter',
    name: 'Електросамокат Kaabo Wolf Warrior 11 Plus',
    nameUk: 'Електросамокат Kaabo Wolf Warrior 11 Plus',
    shortDescription: 'Потужний позашляховий електросамокат з 2x1200W моторами, батареєю 60V 26Ah, швидкістю до 80 км/год та гідравлічними гальмами з ABS. NFC замок, 11-дюймові колеса.',
    shortDescriptionUk: 'Потужний позашляховий електросамокат з 2x1200W моторами, батареєю 60V 26Ah, швидкістю до 80 км/год та гідравлічними гальмами з ABS. NFC замок, 11-дюймові колеса.',
    description: '## Kaabo Wolf Warrior 11 Plus — Позашляховий Хижак\n\nWolf Warrior 11 Plus — це старший брат серії Warrior, створений для тих, хто їздить не лише по асфальту. Два мотори по 1200W з повним приводом забезпечують впевнений розгін до 80 км/год, а батарея 60V 26Ah дає запас ходу до 90 км. 11-дюймові колеса та повна гідравлічна підвіска перетворюють бездоріжжя на комфортну трасу.\n\nОсобливість моделі — гідравлічні гальма з системою ABS, яка запобігає блокуванню коліс при екстреному гальмуванні. NFC замок додає зручності: розблокування самоката одним дотиком смартфона. Кут підйому 35° — ви не застрягнете на крутому пагорбі.\n\nВарто знати: при вазі 45 кг самокат потребує фізичних зусиль для перенесення. Батарея 26Ah — менша за Wolf King GTR, тому для далеких поїздок за місто краще розглянути старшу модель. Але для свого класу Wolf Warrior 11 Plus — один із найкращих варіантів з балансом потужності, прохідності та ціни.',
    descriptionUk: '## Kaabo Wolf Warrior 11 Plus — Позашляховий Хижак\n\nWolf Warrior 11 Plus — це старший брат серії Warrior, створений для тих, хто їздить не лише по асфальту. Два мотори по 1200W з повним приводом забезпечують впевнений розгін до 80 км/год, а батарея 60V 26Ah дає запас ходу до 90 км. 11-дюймові колеса та повна гідравлічна підвіска перетворюють бездоріжжя на комфортну трасу.\n\nОсобливість моделі — гідравлічні гальма з системою ABS, яка запобігає блокуванню коліс при екстреному гальмуванні. NFC замок додає зручності: розблокування самоката одним дотиком смартфона. Кут підйому 35° — ви не застрягнете на крутому пагорбі.\n\nВарто знати: при вазі 45 кг самокат потребує фізичних зусиль для перенесення. Батарея 26Ah — менша за Wolf King GTR, тому для далеких поїздок за місто краще розглянути старшу модель. Але для свого класу Wolf Warrior 11 Plus — один із найкращих варіантів з балансом потужності, прохідності та ціни.',
    priceUsdCents: 250000,
    originalPriceUsdCents: null,
    costUsdCents: null,
    availability: 'pre_order',
    purchaseModel: 'consultation',
    stockQuantity: null,
    lowStockThreshold: null,
    featured: true,
    order: 301,
    categoryIds: [
      'tier-premium',
      'use-case-performance'
    ],
    tags: [
      'Kaabo',
      'Wolf Warrior',
      '11 Plus',
      'Повний привід',
      'ABS',
      'NFC',
      '80 км/год',
      'Гідравліка',
      '11 дюймів'
    ],
    domains: [
      'scootify.com.ua'
    ],
    media: {
      images: [
        '/images/products/wolf-warrior-11-plus/main.webp',
        '/images/products/wolf-warrior-11-plus/suspension.webp',
        '/images/products/wolf-warrior-11-plus/battery.webp',
        '/images/products/wolf-warrior-11-plus/folded.webp',
        '/images/products/wolf-warrior-11-plus/frame.webp'
      ],
      videos: [],
      youtubeIds: []
    },
    seo: {
      title: null,
      titleUk: null,
      description: null,
      descriptionUk: null,
      keywords: [],
      ogImage: null
    },
    warranty: '6 months',
    warrantyUk: '6 місяців',
    rating: null,
    reviewCount: 0,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    metadata: {
      prepaymentTerms: {
        type: 'fixed',
        amount: 400000,
        descriptionUk: '4000 UAH передоплата'
      }
    },
    series: 'Kaabo',
    model: 'Wolf Warrior 11 Plus',
    specs: {
      motor: {
        count: 2,
        powerPerMotor: 1200,
        totalPower: 2400,
        peakPower: null,
        type: 'hub'
      },
      battery: {
        voltage: 60,
        voltageMin: null,
        capacityAh: 26,
        capacityAhMin: null,
        wattHours: null,
        cells: null,
        chargeTimeMin: null,
        chargeTimeMax: null,
        chargerSpec: null
      },
      performance: {
        maxSpeed: 80,
        maxSpeedLimited: null,
        range: 90,
        maxIncline: 35,
        maxLoad: 150
      },
      chassis: {
        weight: 45,
        wheelSize: null,
        wheelType: null,
        foldable: true,
        dimensions: null,
        foldedDimensions: null,
        brakeType: 'Hydraulic disc',
        brakePistons: null,
        suspensionFront: 'hydraulic',
        suspensionRear: 'hydraulic',
        suspensionAdjustable: null
      },
      electronics: {
        display: 'TFT',
        nfc: null,
        app: null,
        alarm: null,
        alarmWithWheelLock: null,
        cruiseControl: null,
        regenerativeBrake: null,
        dualMotorMode: false,
        rgbLeds: null
      },
      safety: {
        ipRating: null,
        turnSignals: null,
        reflectors: null,
        horn: null
      },
      shipping: {
        weightKg: 50,
        seatsAmount: 1,
        boxes: [
          {
            dimensions: '140x75x70',
            weightKg: 50
          }
        ],
        cargoDescription: 'Електросамокат Kaabo Wolf Warrior 11 Plus',
        cargoType: null
      }
    },
    variants: [],
    colors: [],
    highlights: [
      'Offroad capability',
      'Dual motors',
      'Hydraulic brakes',
      'Full suspension'
    ],
    highlightsUk: [
      'Позашляхові можливості',
      'Подвійні мотори',
      'Гідравлічні гальма',
      'Повна підвіска'
    ],
    relatedProductIds: []
  },

{
    id: 'kaabo-c3f5a9d4-6e1b-4ac8-d7f3-9a4b0c5d1e26',
    slug: 'elektrosamokat-kaabo-wolf-warrior-x-pro-plus',
    sku: 'KAABO-WOLF-WARRIOR-X-PRO-PLUS',
    brandId: 'kaabo',
    productType: 'scooter',
    name: 'Електросамокат Kaabo Wolf Warrior X Pro+',
    nameUk: 'Електросамокат Kaabo Wolf Warrior X Pro+',
    shortDescription: 'Покращений позашляховий електросамокат з 2x1100W моторами, збільшеною батареєю 60V 28Ah, запасом ходу 100 км та гідравлічними гальмами. Кут підйому 35°.',
    shortDescriptionUk: 'Покращений позашляховий електросамокат з 2x1100W моторами, збільшеною батареєю 60V 28Ah, запасом ходу 100 км та гідравлічними гальмами. Кут підйому 35°.',
    description: '## Kaabo Wolf Warrior X Pro+ — Максимум Дальності в Серії Warrior\n\nWolf Warrior X Pro+ — це версія з найбільшим запасом ходу в серії Warrior. Батарея 60V 28Ah забезпечує до 100 км на одному заряді, що робить цю модель ідеальною для далеких поїздок та позаміського використання. Два мотори по 1100W впевнено тримають швидкість до 70 км/год.\n\nГідравлічні гальма забезпечують надійне гальмування на будь-якій поверхні, а повна гідравлічна підвіска поглинає нерівності. Кут підйому 35° означає, що самокат не здасться на крутих підйомах — актуально для міст із пагорбистим рельєфом.\n\nX Pro+ — золота середина лінійки Wolf: потужніший за Mantis, але легший і доступніший за Wolf King GTR. Якщо вам потрібен універсальний самокат для міста та за його межами з хорошим запасом ходу — це один із найкращих варіантів у Kaabo.',
    descriptionUk: '## Kaabo Wolf Warrior X Pro+ — Максимум Дальності в Серії Warrior\n\nWolf Warrior X Pro+ — це версія з найбільшим запасом ходу в серії Warrior. Батарея 60V 28Ah забезпечує до 100 км на одному заряді, що робить цю модель ідеальною для далеких поїздок та позаміського використання. Два мотори по 1100W впевнено тримають швидкість до 70 км/год.\n\nГідравлічні гальма забезпечують надійне гальмування на будь-якій поверхні, а повна гідравлічна підвіска поглинає нерівності. Кут підйому 35° означає, що самокат не здасться на крутих підйомах — актуально для міст із пагорбистим рельєфом.\n\nX Pro+ — золота середина лінійки Wolf: потужніший за Mantis, але легший і доступніший за Wolf King GTR. Якщо вам потрібен універсальний самокат для міста та за його межами з хорошим запасом ходу — це один із найкращих варіантів у Kaabo.',
    priceUsdCents: 220000,
    originalPriceUsdCents: null,
    costUsdCents: null,
    availability: 'pre_order',
    purchaseModel: 'consultation',
    stockQuantity: null,
    lowStockThreshold: null,
    featured: true,
    order: 302,
    categoryIds: [
      'tier-premium',
      'use-case-performance'
    ],
    tags: [
      'Kaabo',
      'Wolf Warrior',
      'X Pro+',
      'Повний привід',
      '100 км',
      '70 км/год',
      'Гідравліка'
    ],
    domains: [
      'scootify.com.ua'
    ],
    media: {
      images: [
        '/images/products/wolf-warrior-x-pro-plus/main.webp'
      ],
      videos: [],
      youtubeIds: []
    },
    seo: {
      title: null,
      titleUk: null,
      description: null,
      descriptionUk: null,
      keywords: [],
      ogImage: null
    },
    warranty: '6 months',
    warrantyUk: '6 місяців',
    rating: null,
    reviewCount: 0,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    metadata: {
      prepaymentTerms: {
        type: 'fixed',
        amount: 400000,
        descriptionUk: '4000 UAH передоплата'
      }
    },
    series: 'Kaabo',
    model: 'Wolf Warrior X Pro+',
    specs: {
      motor: {
        count: 2,
        powerPerMotor: 1100,
        totalPower: 2200,
        peakPower: null,
        type: 'hub'
      },
      battery: {
        voltage: 60,
        voltageMin: null,
        capacityAh: 28,
        capacityAhMin: null,
        wattHours: null,
        cells: null,
        chargeTimeMin: null,
        chargeTimeMax: null,
        chargerSpec: null
      },
      performance: {
        maxSpeed: 70,
        maxSpeedLimited: null,
        range: 100,
        maxIncline: 35,
        maxLoad: 150
      },
      chassis: {
        weight: 40,
        wheelSize: null,
        wheelType: null,
        foldable: true,
        dimensions: null,
        foldedDimensions: null,
        brakeType: 'Hydraulic disc',
        brakePistons: null,
        suspensionFront: 'hydraulic',
        suspensionRear: 'hydraulic',
        suspensionAdjustable: null
      },
      electronics: {
        display: 'TFT',
        nfc: null,
        app: null,
        alarm: null,
        alarmWithWheelLock: null,
        cruiseControl: null,
        regenerativeBrake: null,
        dualMotorMode: false,
        rgbLeds: null
      },
      safety: {
        ipRating: null,
        turnSignals: null,
        reflectors: null,
        horn: null
      },
      shipping: {
        weightKg: 45,
        seatsAmount: 1,
        boxes: [
          {
            dimensions: '140x75x70',
            weightKg: 45
          }
        ],
        cargoDescription: 'Електросамокат Kaabo Wolf Warrior X Pro+',
        cargoType: null
      }
    },
    variants: [],
    colors: [],
    highlights: [
      'Offroad capability',
      'Dual motors',
      'Hydraulic brakes',
      'Full suspension'
    ],
    highlightsUk: [
      'Позашляхові можливості',
      'Подвійні мотори',
      'Гідравлічні гальма',
      'Повна підвіска'
    ],
    relatedProductIds: []
  },

{
    id: 'kaabo-e5a7c1f6-8b3d-4ce0-f9b5-1c6d2e7f3a48',
    slug: 'elektrosamokat-kaabo-wolf-warrior-x-plus',
    sku: 'KAABO-WOLF-WARRIOR-X-PLUS',
    brandId: 'kaabo',
    productType: 'scooter',
    name: 'Електросамокат Kaabo Wolf Warrior X Plus',
    nameUk: 'Електросамокат Kaabo Wolf Warrior X Plus',
    shortDescription: 'Доступний позашляховий електросамокат з 2x1100W моторами, батареєю 60V 21Ah, швидкістю до 70 км/год та запасом ходу 70 км. Гідравлічні гальма, кут підйому 35°.',
    shortDescriptionUk: 'Доступний позашляховий електросамокат з 2x1100W моторами, батареєю 60V 21Ah, швидкістю до 70 км/год та запасом ходу 70 км. Гідравлічні гальма, кут підйому 35°.',
    description: '## Kaabo Wolf Warrior X Plus — Вхід у Серію Wolf\n\nWolf Warrior X Plus — це найдоступніший шлях у серію Wolf, яка відома своєю прохідністю та надійністю. Два мотори по 1100W розганяють до 70 км/год, а батарея 60V 21Ah забезпечує 70 км запас ходу — достатньо для щоденних міських поїздок із запасом.\n\nГідравлічні дискові гальма та повна гідравлічна підвіска — це стандарт серії Wolf, і X Plus не виняток. Кут підйому 35° забезпечує впевнений рух на підйомах, а складна конструкція дозволяє зберігати самокат у квартирі.\n\nX Plus — оптимальний вибір для тих, хто хоче потрапити в екосистему Wolf Warrior без переплати за зайву ємність батареї. Для щоденних поїздок до 30-40 км у один бік запасу ходу вистачить із великим запасом. Для далеких подорожей краще розглянути X Pro+ або 11 Plus.',
    descriptionUk: '## Kaabo Wolf Warrior X Plus — Вхід у Серію Wolf\n\nWolf Warrior X Plus — це найдоступніший шлях у серію Wolf, яка відома своєю прохідністю та надійністю. Два мотори по 1100W розганяють до 70 км/год, а батарея 60V 21Ah забезпечує 70 км запас ходу — достатньо для щоденних міських поїздок із запасом.\n\nГідравлічні дискові гальма та повна гідравлічна підвіска — це стандарт серії Wolf, і X Plus не виняток. Кут підйому 35° забезпечує впевнений рух на підйомах, а складна конструкція дозволяє зберігати самокат у квартирі.\n\nX Plus — оптимальний вибір для тих, хто хоче потрапити в екосистему Wolf Warrior без переплати за зайву ємність батареї. Для щоденних поїздок до 30-40 км у один бік запасу ходу вистачить із великим запасом. Для далеких подорожей краще розглянути X Pro+ або 11 Plus.',
    priceUsdCents: 180000,
    originalPriceUsdCents: null,
    costUsdCents: null,
    availability: 'pre_order',
    purchaseModel: 'consultation',
    stockQuantity: null,
    lowStockThreshold: null,
    featured: true,
    order: 303,
    categoryIds: [
      'tier-mid',
      'use-case-performance'
    ],
    tags: [
      'Kaabo',
      'Wolf Warrior',
      'X Plus',
      'Повний привід',
      '70 км/год',
      'Гідравліка'
    ],
    domains: [
      'scootify.com.ua'
    ],
    media: {
      images: [
        '/images/products/wolf-warrior-x-plus/main.webp'
      ],
      videos: [],
      youtubeIds: []
    },
    seo: {
      title: null,
      titleUk: null,
      description: null,
      descriptionUk: null,
      keywords: [],
      ogImage: null
    },
    warranty: '6 months',
    warrantyUk: '6 місяців',
    rating: null,
    reviewCount: 0,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    metadata: {
      prepaymentTerms: {
        type: 'fixed',
        amount: 400000,
        descriptionUk: '4000 UAH передоплата'
      }
    },
    series: 'Kaabo',
    model: 'Wolf Warrior X Plus',
    specs: {
      motor: {
        count: 2,
        powerPerMotor: 1100,
        totalPower: 2200,
        peakPower: null,
        type: 'hub'
      },
      battery: {
        voltage: 60,
        voltageMin: null,
        capacityAh: 21,
        capacityAhMin: null,
        wattHours: null,
        cells: null,
        chargeTimeMin: null,
        chargeTimeMax: null,
        chargerSpec: null
      },
      performance: {
        maxSpeed: 70,
        maxSpeedLimited: null,
        range: 70,
        maxIncline: 35,
        maxLoad: 150
      },
      chassis: {
        weight: 38,
        wheelSize: null,
        wheelType: null,
        foldable: true,
        dimensions: null,
        foldedDimensions: null,
        brakeType: 'Hydraulic disc',
        brakePistons: null,
        suspensionFront: 'hydraulic',
        suspensionRear: 'hydraulic',
        suspensionAdjustable: null
      },
      electronics: {
        display: 'TFT',
        nfc: null,
        app: null,
        alarm: null,
        alarmWithWheelLock: null,
        cruiseControl: null,
        regenerativeBrake: null,
        dualMotorMode: false,
        rgbLeds: null
      },
      safety: {
        ipRating: null,
        turnSignals: null,
        reflectors: null,
        horn: null
      },
      shipping: {
        weightKg: 43,
        seatsAmount: 1,
        boxes: [
          {
            dimensions: '140x75x70',
            weightKg: 43
          }
        ],
        cargoDescription: 'Електросамокат Kaabo Wolf Warrior X Plus',
        cargoType: null
      }
    },
    variants: [],
    colors: [],
    highlights: [
      'Offroad capability',
      'Dual motors',
      'Hydraulic brakes',
      'Full suspension'
    ],
    highlightsUk: [
      'Позашляхові можливості',
      'Подвійні мотори',
      'Гідравлічні гальма',
      'Повна підвіска'
    ],
    relatedProductIds: []
  },

{
    id: 'kaabo-a7c9e3b5-0d5f-4ea2-b1d7-3e8f4a9b5c60',
    slug: 'elektrosamokat-kaabo-mantis-king-gt',
    sku: 'KAABO-MANTIS-KING-GT',
    brandId: 'kaabo',
    productType: 'scooter',
    name: 'Електросамокат Kaabo Mantis King GT',
    nameUk: 'Електросамокат Kaabo Mantis King GT',
    shortDescription: 'Флагман серії Mantis: 2x1100W мотори, батарея 60V 24Ah, швидкість до 70 км/год та запас ходу 90 км. Ідеальний баланс потужності та маневреності для міста.',
    shortDescriptionUk: 'Флагман серії Mantis: 2x1100W мотори, батарея 60V 24Ah, швидкість до 70 км/год та запас ходу 90 км. Ідеальний баланс потужності та маневреності для міста.',
    description: '## Kaabo Mantis King GT — Найпотужніший Mantis\n\nMantis King GT — це вершина серії Mantis, яка поєднує компактність міського самоката з потужністю, що наближається до серії Wolf. Два мотори по 1100W забезпечують розгін до 70 км/год, а батарея 60V 24Ah — 90 км запас ходу. Це вражаючі показники для самоката, який залишається відносно компактним.\n\nКут підйому 30° достатній для більшості міських умов. Гідравлічні гальма та підвіска забезпечують комфорт та безпеку на швидкості. Складна конструкція дозволяє зручно зберігати самокат вдома чи в офісі.\n\nMantis King GT — ідеальний вибір для тих, кому потрібен потужний міський самокат, але Wolf здається завеликим. Він легший, маневреніший, при цьому не поступається у швидкості. Недолік — менший кут підйому порівняно з Wolf серією (30° проти 35°), що може бути відчутним на дуже крутих пагорбах.',
    descriptionUk: '## Kaabo Mantis King GT — Найпотужніший Mantis\n\nMantis King GT — це вершина серії Mantis, яка поєднує компактність міського самоката з потужністю, що наближається до серії Wolf. Два мотори по 1100W забезпечують розгін до 70 км/год, а батарея 60V 24Ah — 90 км запас ходу. Це вражаючі показники для самоката, який залишається відносно компактним.\n\nКут підйому 30° достатній для більшості міських умов. Гідравлічні гальма та підвіска забезпечують комфорт та безпеку на швидкості. Складна конструкція дозволяє зручно зберігати самокат вдома чи в офісі.\n\nMantis King GT — ідеальний вибір для тих, кому потрібен потужний міський самокат, але Wolf здається завеликим. Він легший, маневреніший, при цьому не поступається у швидкості. Недолік — менший кут підйому порівняно з Wolf серією (30° проти 35°), що може бути відчутним на дуже крутих пагорбах.',
    priceUsdCents: 160000,
    originalPriceUsdCents: null,
    costUsdCents: null,
    availability: 'pre_order',
    purchaseModel: 'consultation',
    stockQuantity: null,
    lowStockThreshold: null,
    featured: false,
    order: 304,
    categoryIds: [
      'tier-mid',
      'use-case-performance'
    ],
    tags: [
      'Kaabo',
      'Mantis',
      'King GT',
      'подвійний мотор',
      '70 км/год',
      '90 км',
      'міський'
    ],
    domains: [
      'scootify.com.ua'
    ],
    media: {
      images: [
        '/images/products/mantis-king-gt/main.webp'
      ],
      videos: [],
      youtubeIds: []
    },
    seo: {
      title: null,
      titleUk: null,
      description: null,
      descriptionUk: null,
      keywords: [],
      ogImage: null
    },
    warranty: '6 months',
    warrantyUk: '6 місяців',
    rating: null,
    reviewCount: 0,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    metadata: {
      prepaymentTerms: {
        type: 'fixed',
        amount: 400000,
        descriptionUk: '4000 UAH передоплата'
      }
    },
    series: 'Kaabo',
    model: 'Mantis King GT',
    specs: {
      motor: {
        count: 2,
        powerPerMotor: 1100,
        totalPower: 2200,
        peakPower: null,
        type: 'hub'
      },
      battery: {
        voltage: 60,
        voltageMin: null,
        capacityAh: 24,
        capacityAhMin: null,
        wattHours: null,
        cells: null,
        chargeTimeMin: null,
        chargeTimeMax: null,
        chargerSpec: null
      },
      performance: {
        maxSpeed: 70,
        maxSpeedLimited: null,
        range: 90,
        maxIncline: 30,
        maxLoad: 150
      },
      chassis: {
        weight: 35,
        wheelSize: null,
        wheelType: null,
        foldable: true,
        dimensions: null,
        foldedDimensions: null,
        brakeType: 'Hydraulic disc',
        brakePistons: null,
        suspensionFront: 'hydraulic',
        suspensionRear: 'hydraulic',
        suspensionAdjustable: null
      },
      electronics: {
        display: 'TFT',
        nfc: null,
        app: null,
        alarm: null,
        alarmWithWheelLock: null,
        cruiseControl: null,
        regenerativeBrake: null,
        dualMotorMode: false,
        rgbLeds: null
      },
      safety: {
        ipRating: null,
        turnSignals: null,
        reflectors: null,
        horn: null
      },
      shipping: {
        weightKg: 40,
        seatsAmount: 1,
        boxes: [
          {
            dimensions: '140x75x70',
            weightKg: 40
          }
        ],
        cargoDescription: 'Електросамокат Kaabo Mantis King GT',
        cargoType: null
      }
    },
    variants: [],
    colors: [],
    highlights: [
      'Dual motors',
      'Urban performance',
      'Reliable',
      'Good value'
    ],
    highlightsUk: [
      'Подвійні мотори',
      'Міська продуктивність',
      'Надійний',
      'Хороше співвідношення'
    ],
    relatedProductIds: []
  },

{
    id: 'kaabo-c9e1a5d7-2f7b-4ac4-d3f9-5a0b6c1d7e82',
    slug: 'elektrosamokat-kaabo-mantis-10-plus',
    sku: 'KAABO-MANTIS-10-PLUS',
    brandId: 'kaabo',
    productType: 'scooter',
    name: 'Електросамокат Kaabo Mantis 10 Plus',
    nameUk: 'Електросамокат Kaabo Mantis 10 Plus',
    shortDescription: 'Збалансований міський електросамокат з 2x1000W моторами, батареєю 60V 18.2Ah, швидкістю до 60 км/год та запасом ходу 75 км. Оптимальний вибір для щоденних поїздок.',
    shortDescriptionUk: 'Збалансований міський електросамокат з 2x1000W моторами, батареєю 60V 18.2Ah, швидкістю до 60 км/год та запасом ходу 75 км. Оптимальний вибір для щоденних поїздок.',
    description: '## Kaabo Mantis 10 Plus — Розумний Вибір для Міста\n\nMantis 10 Plus — це модель для тих, хто шукає надійний та потужний міський самокат без зайвих переплат. Два мотори по 1000W забезпечують комфортну швидкість до 60 км/год, а батарея 60V 18.2Ah дає 75 км запас ходу — більш ніж достатньо для щоденних поїздок на роботу та назад.\n\nГідравлічні гальма та підвіска забезпечують безпеку та комфорт на міських дорогах. Кут підйому 30° — стандарт для серії Mantis. Складна конструкція та помірна вага роблять самокат зручним для зберігання.\n\nMantis 10 Plus — точка входу в серйозні електросамокати Kaabo. Він пропонує все необхідне для комфортної їзди по місту: подвійний мотор, гідравліку, хороший запас ходу. Але якщо ви плануєте часті поїздки за місто або вам потрібна швидкість понад 60 км/год — краще розглянути Mantis King GT або серію Wolf.',
    descriptionUk: '## Kaabo Mantis 10 Plus — Розумний Вибір для Міста\n\nMantis 10 Plus — це модель для тих, хто шукає надійний та потужний міський самокат без зайвих переплат. Два мотори по 1000W забезпечують комфортну швидкість до 60 км/год, а батарея 60V 18.2Ah дає 75 км запас ходу — більш ніж достатньо для щоденних поїздок на роботу та назад.\n\nГідравлічні гальма та підвіска забезпечують безпеку та комфорт на міських дорогах. Кут підйому 30° — стандарт для серії Mantis. Складна конструкція та помірна вага роблять самокат зручним для зберігання.\n\nMantis 10 Plus — точка входу в серйозні електросамокати Kaabo. Він пропонує все необхідне для комфортної їзди по місту: подвійний мотор, гідравліку, хороший запас ходу. Але якщо ви плануєте часті поїздки за місто або вам потрібна швидкість понад 60 км/год — краще розглянути Mantis King GT або серію Wolf.',
    priceUsdCents: 140000,
    originalPriceUsdCents: null,
    costUsdCents: null,
    availability: 'pre_order',
    purchaseModel: 'consultation',
    stockQuantity: null,
    lowStockThreshold: null,
    featured: false,
    order: 305,
    categoryIds: [
      'tier-mid',
      'use-case-performance'
    ],
    tags: [
      'Kaabo',
      'Mantis',
      '10 Plus',
      'подвійний мотор',
      '60 км/год',
      '75 км',
      'міський'
    ],
    domains: [
      'scootify.com.ua'
    ],
    media: {
      images: [
        '/images/products/mantis-10-plus/main.webp'
      ],
      videos: [],
      youtubeIds: []
    },
    seo: {
      title: null,
      titleUk: null,
      description: null,
      descriptionUk: null,
      keywords: [],
      ogImage: null
    },
    warranty: '6 months',
    warrantyUk: '6 місяців',
    rating: null,
    reviewCount: 0,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    metadata: {
      prepaymentTerms: {
        type: 'fixed',
        amount: 400000,
        descriptionUk: '4000 UAH передоплата'
      }
    },
    series: 'Kaabo',
    model: 'Mantis 10 Plus',
    specs: {
      motor: {
        count: 2,
        powerPerMotor: 1000,
        totalPower: 2000,
        peakPower: null,
        type: 'hub'
      },
      battery: {
        voltage: 60,
        voltageMin: null,
        capacityAh: 18.2,
        capacityAhMin: null,
        wattHours: null,
        cells: null,
        chargeTimeMin: null,
        chargeTimeMax: null,
        chargerSpec: null
      },
      performance: {
        maxSpeed: 60,
        maxSpeedLimited: null,
        range: 75,
        maxIncline: 30,
        maxLoad: 150
      },
      chassis: {
        weight: 32,
        wheelSize: null,
        wheelType: null,
        foldable: true,
        dimensions: null,
        foldedDimensions: null,
        brakeType: 'Hydraulic disc',
        brakePistons: null,
        suspensionFront: 'hydraulic',
        suspensionRear: 'hydraulic',
        suspensionAdjustable: null
      },
      electronics: {
        display: 'TFT',
        nfc: null,
        app: null,
        alarm: null,
        alarmWithWheelLock: null,
        cruiseControl: null,
        regenerativeBrake: null,
        dualMotorMode: false,
        rgbLeds: null
      },
      safety: {
        ipRating: null,
        turnSignals: null,
        reflectors: null,
        horn: null
      },
      shipping: {
        weightKg: 37,
        seatsAmount: 1,
        boxes: [
          {
            dimensions: '140x75x70',
            weightKg: 37
          }
        ],
        cargoDescription: 'Електросамокат Kaabo Mantis 10 Plus',
        cargoType: null
      }
    },
    variants: [],
    colors: [],
    highlights: [
      'Dual motors',
      'Urban performance',
      'Reliable',
      'Good value'
    ],
    highlightsUk: [
      'Подвійні мотори',
      'Міська продуктивність',
      'Надійний',
      'Хороше співвідношення'
    ],
    relatedProductIds: []
  }
];

/**
 * Consolidated scooters array - All 39 scooters across all brands
 * 
 * Breakdown by brand:
 * - Hyper/Multi-brand: 9 scooters (hysco.com.ua)
 * - Tiger: 15 scooters (hiley.com.ua)
 * - Nami: 9 scooters (nami.com.ua)
 * - Kaabo: 6 scooters (scootify.com.ua)
 * 
 * Total: 39 scooters
 */
export const scooters: Scooter[] = [
  ...hyperScooters,
  ...tigerScooters,
  ...namiScooters,
  ...kaaboScooters,
];
