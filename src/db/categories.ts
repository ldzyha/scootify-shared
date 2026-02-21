import { Category, CategoryAxis } from './schema';

export const categories: Category[] = [
  // Product Type axis (6 categories)
  {
    id: 'pt-scooters',
    slug: 'electric-scooters',
    nameUk: 'Електросамокати',
    nameEn: 'Electric Scooters',
    axis: 'product_type',
    sortOrder: 1,
  },
  {
    id: 'pt-parts',
    slug: 'spare-parts',
    nameUk: 'Запчастини',
    nameEn: 'Spare Parts',
    axis: 'product_type',
    sortOrder: 2,
  },
  {
    id: 'pt-accessories',
    slug: 'accessories',
    nameUk: 'Аксесуари',
    nameEn: 'Accessories',
    axis: 'product_type',
    sortOrder: 3,
  },
  {
    id: 'pt-safety',
    slug: 'safety-protection',
    nameUk: 'Безпека та захист',
    nameEn: 'Safety & Protection',
    axis: 'product_type',
    parentId: 'pt-accessories',
    sortOrder: 4,
  },
  {
    id: 'pt-winter',
    slug: 'winter-accessories',
    nameUk: 'Зимові аксесуари',
    nameEn: 'Winter Accessories',
    axis: 'product_type',
    parentId: 'pt-accessories',
    sortOrder: 5,
  },
  {
    id: 'pt-maintenance',
    slug: 'maintenance',
    nameUk: 'Обслуговування',
    nameEn: 'Maintenance',
    axis: 'product_type',
    parentId: 'pt-accessories',
    sortOrder: 6,
  },

  // Tier axis (5 categories)
  {
    id: 'tier-entry',
    slug: 'entry',
    nameUk: 'Початковий',
    nameEn: 'Entry',
    descriptionUk: '< 40 км/год, < $1,000',
    descriptionEn: '< 40 km/h, < $1,000',
    axis: 'tier',
    sortOrder: 1,
  },
  {
    id: 'tier-mid',
    slug: 'mid-range',
    nameUk: 'Середній',
    nameEn: 'Mid-range',
    descriptionUk: '40-70 км/год, $1,000-2,000',
    descriptionEn: '40-70 km/h, $1,000-2,000',
    axis: 'tier',
    sortOrder: 2,
  },
  {
    id: 'tier-premium',
    slug: 'premium',
    nameUk: 'Преміум',
    nameEn: 'Premium',
    descriptionUk: '70-100 км/год, $2,000-4,000',
    descriptionEn: '70-100 km/h, $2,000-4,000',
    axis: 'tier',
    sortOrder: 3,
  },
  {
    id: 'tier-hyper',
    slug: 'hyper',
    nameUk: 'Гіпер',
    nameEn: 'Hyper',
    descriptionUk: '100+ км/год, $4,000+',
    descriptionEn: '100+ km/h, $4,000+',
    axis: 'tier',
    sortOrder: 4,
  },
  {
    id: 'tier-altcar',
    slug: 'alt-car',
    nameUk: 'Альтернатива авто',
    nameEn: 'Alt Car',
    descriptionUk: 'Флагманське позиціонування',
    descriptionEn: 'Flagship positioning',
    axis: 'tier',
    sortOrder: 5,
  },

  // Use Case axis (5 categories)
  {
    id: 'uc-city',
    slug: 'city',
    nameUk: 'Місто',
    nameEn: 'City',
    axis: 'use_case',
    sortOrder: 1,
  },
  {
    id: 'uc-touring',
    slug: 'touring',
    nameUk: 'Туризм',
    nameEn: 'Touring',
    axis: 'use_case',
    sortOrder: 2,
  },
  {
    id: 'uc-offroad',
    slug: 'offroad',
    nameUk: 'Бездоріжжя',
    nameEn: 'Off-road',
    axis: 'use_case',
    sortOrder: 3,
  },
  {
    id: 'uc-sport',
    slug: 'sport',
    nameUk: 'Спорт',
    nameEn: 'Sport',
    axis: 'use_case',
    sortOrder: 4,
  },
  {
    id: 'uc-universal',
    slug: 'universal',
    nameUk: 'Універсальний',
    nameEn: 'Universal',
    axis: 'use_case',
    sortOrder: 5,
  },
];

export function getCategoriesByAxis(axis: CategoryAxis): Category[] {
  return categories.filter(c => c.axis === axis);
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find(c => c.id === id);
}
