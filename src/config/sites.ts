import type { SiteConfig } from '../types/site-config';
import { siteMetallics } from '../lib/metallic';

export const hileyConfig: SiteConfig = {
  siteName: 'HILEY Store',
  siteUrl: 'https://hiley.com.ua',
  domain: 'hiley.com.ua',
  brand: 'HILEY',
  tagline: 'Преміум електросамокати Tiger',
  description: 'Офіційний постачальник преміум електросамокатів HILEY Tiger в Україні',
  contact: {
    phone: '+38 077 277 00 06',
    email: 'leonid@dzyha.com',
    telegram: {
      bot: 'https://t.me/scooti_bot',
      personal: 'https://t.me/ldzyha',
      group: 'https://t.me/scootify_eco',
    },
  },
  address: {
    street: 'Запорізьке шосе, 32',
    city: 'Дніпро',
    region: 'Дніпропетровська область',
    postalCode: '49000',
    country: 'Україна',
    countryCode: 'UA',
  },
  theme: { id: 'hiley' },
  metallicGradients: {
    brandBg: siteMetallics.hiley.brandBg,
    brandText: siteMetallics.hiley.brandText,
  },
  defaultCurrency: 'UAH',
  fallbackExchangeRate: 43.5,
  productUrlPattern: '/product/:slug',
  orderPrefix: 'HL-',
  storeCity: {
    ref: 'db5c88e0-391c-11dd-90d9-001a92567626', // Dnipro
    name: 'Дніпро',
  },
  features: {
    cart: true,
    checkout: true,
    search: true,
    telegramBot: true,
    consultation: true,
  },
};

export const scootifyConfig: SiteConfig = {
  siteName: 'Scootify',
  siteUrl: 'https://scootify.com.ua',
  domain: 'scootify.com.ua',
  brand: 'Scootify',
  tagline: 'Kaabo та комплектуючі',
  description: 'Офіційний дистриб\'ютор Kaabo в Україні',
  contact: {
    phone: '+38 077 277 00 06',
    email: 'leonid@dzyha.com',
    telegram: {
      bot: 'https://t.me/scooti_bot',
      personal: 'https://t.me/ldzyha',
      group: 'https://t.me/scootify_eco',
    },
  },
  theme: { id: 'scootify' },
  metallicGradients: {
    brandBg: siteMetallics.scootify.brandBg,
    brandText: siteMetallics.scootify.brandText,
  },
  defaultCurrency: 'UAH',
  fallbackExchangeRate: 43.5,
  productUrlPattern: '/tovary/:slug/',
  orderPrefix: 'SF-',
  storeCity: {
    ref: 'db5c8892-391c-11dd-90d9-001a92567626', // Poltava
    name: 'Полтава',
  },
  features: {
    cart: true,
    checkout: true,
    search: true,
    telegramBot: true,
    consultation: true,
  },
};

export const namiConfig: SiteConfig = {
  siteName: 'NAMI Electric',
  siteUrl: 'https://nami.com.ua',
  domain: 'nami.com.ua',
  brand: 'NAMI',
  tagline: 'Преміум NAMI електросамокати',
  description: 'Офіційні NAMI електросамокати в Україні',
  contact: {
    phone: '+38 077 277 00 06',
    email: 'leonid@dzyha.com',
    telegram: {
      bot: 'https://t.me/scooti_bot',
      personal: 'https://t.me/ldzyha',
      group: 'https://t.me/scootify_eco',
    },
  },
  theme: { id: 'nami' },
  metallicGradients: {
    brandBg: siteMetallics.nami.brandBg,
    brandText: siteMetallics.nami.brandText,
  },
  defaultCurrency: 'UAH',
  fallbackExchangeRate: 43.5,
  productUrlPattern: '/product/:slug',
  orderPrefix: 'NM-',
  features: {
    cart: false,
    checkout: false,
    search: false,
    telegramBot: true,
    consultation: true,
  },
};

export const hyscoConfig: SiteConfig = {
  siteName: 'HYSCO',
  siteUrl: 'https://hysco.com.ua',
  domain: 'hysco.com.ua',
  brand: 'HYSCO',
  tagline: 'Hyper електросамокати',
  description: 'Гіперскутери преміум класу в Україні',
  contact: {
    phone: '+38 077 277 00 06',
    email: 'leonid@dzyha.com',
    telegram: {
      bot: 'https://t.me/scooti_bot',
      personal: 'https://t.me/ldzyha',
      group: 'https://t.me/scootify_eco',
    },
  },
  theme: { id: 'hysco' },
  metallicGradients: {
    brandBg: siteMetallics.hysco.brandBg,
    brandText: siteMetallics.hysco.brandText,
  },
  defaultCurrency: 'UAH',
  fallbackExchangeRate: 43.5,
  productUrlPattern: '/product/:slug',
  orderPrefix: 'HY-',
  features: {
    cart: false,
    checkout: false,
    search: false,
    telegramBot: true,
    consultation: true,
  },
};
