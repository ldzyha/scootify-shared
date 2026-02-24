'use client';

import { useState } from 'react';
import { Icon } from './Icon';
import type { ReactNode } from 'react';
import type { SiteConfig } from '../types/site-config';
import styles from './ProductTerms.module.css';

export interface ProductTermsProps {
  siteConfig: SiteConfig;
  purchaseModel?: 'direct_sale' | 'consultation';
  /** Override built-in sections with custom content */
  customSections?: TermSection[];
  className?: string;
}

export interface TermSection {
  id: string;
  title: string;
  /** Supports both plain text and JSX content */
  content: ReactNode;
}

/**
 * Simple inline markdown: **bold**, - bullets, numbered lists, newlines.
 * No external dependencies needed.
 */
function renderSimpleMarkdown(text: string): ReactNode[] {
  const lines = text.split('\n');
  const elements: ReactNode[] = [];
  let key = 0;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      elements.push(<div key={key++} className={styles.spacer} />);
      continue;
    }

    // Parse inline **bold** spans
    const inlineParsed = parseInlineBold(trimmed);

    // Bullet list item
    if (trimmed.startsWith('- ')) {
      const content = parseInlineBold(trimmed.slice(2));
      elements.push(
        <div key={key++} className={styles.listItem}>
          <span className={styles.bullet} aria-hidden="true" />
          <span>{content}</span>
        </div>
      );
      continue;
    }

    // Numbered list item (e.g. "1. Text")
    const numberedMatch = trimmed.match(/^(\d+)\.\s+(.+)$/);
    if (numberedMatch) {
      const content = parseInlineBold(numberedMatch[2]);
      elements.push(
        <div key={key++} className={styles.listItem}>
          <span className={styles.number}>{numberedMatch[1]}.</span>
          <span>{content}</span>
        </div>
      );
      continue;
    }

    // Heading-like bold line (entire line is bold)
    if (trimmed.startsWith('**') && trimmed.endsWith('**') && !trimmed.slice(2, -2).includes('**')) {
      elements.push(
        <p key={key++} className={styles.contentHeading}>
          {trimmed.slice(2, -2)}
        </p>
      );
      continue;
    }

    // Regular paragraph
    elements.push(<p key={key++} className={styles.contentParagraph}>{inlineParsed}</p>);
  }

  return elements;
}

/**
 * Parse **bold** segments within a string into <strong> elements.
 */
function parseInlineBold(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const regex = /\*\*(.+?)\*\*/g;
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(<strong key={key++}>{match[1]}</strong>);
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
}

/**
 * ProductTerms - Accordion component with delivery, payment, warranty, and return information
 */
export function ProductTerms({ siteConfig, purchaseModel = 'consultation', customSections, className = '' }: ProductTermsProps) {
  const [openSection, setOpenSection] = useState<string | null>(null);

  // Sections for consultation model (scooters - connect with distributors)
  const consultationSections: TermSection[] = [
    {
      id: 'about',
      title: 'Важлива інформація',
      content: `
**Ми не є офіційним дистриб'ютором**

Ми - сервіс допомоги у виборі електросамокатів. Наша місія:
- Допомогти вам обрати ідеальну модель під ваші потреби
- З'єднати вас з перевіреними офіційними дистриб'юторами
- Надати об'єктивну інформацію про характеристики та ціни

**Чому ми?**
- Незалежна оцінка моделей від різних брендів
- Актуальна інформація про ціни з відкритих джерел
- Прямий зв'язок з офіційними постачальниками
- Безкоштовна консультація

Фінальне оформлення замовлення, оплата, доставка та гарантія - через офіційного дистриб'ютора.
      `.trim(),
    },
    {
      id: 'consultation',
      title: 'Як це працює',
      content: `
**Процес замовлення:**

1. **Вибір моделі** - Ви обираєте електросамокат на нашому сайті
2. **Консультація** - Залишаєте запит, ми допомагаємо з вибором
3. **З'єднання з дистриб'ютором** - Передаємо ваш запит офіційному дистриб'ютору
4. **Оформлення** - Дистриб'ютор зв'язується з вами напряму
5. **Оплата та доставка** - Узгоджуєте умови з дистриб'ютором

**Наші партнери-дистриб'ютори** пропонують:
- Офіційну гарантію виробника (6-12 місяців)
- Доставку Новою Поштою по всій Україні
- Різні способи оплати
- Сервісне обслуговування
      `.trim(),
    },
    {
      id: 'prices',
      title: 'Про ціни',
      content: `
**Орієнтовні ціни з відкритих джерел**

Ціни на сайті є орієнтовними та зібрані з публічних джерел (офіційні сайти, маркетплейси).

**Фінальна ціна залежить від:**
- Поточного курсу валют
- Комплектації та опцій
- Наявності на складі дистриб'ютора
- Діючих акцій та знижок
- Умов доставки у ваш регіон

**Точну ціну та умови** уточнюйте у офіційного дистриб'ютора після консультації.
      `.trim(),
    },
    {
      id: 'warranty',
      title: 'Гарантія та сервіс',
      content: `
**Офіційна гарантія через дистриб'ютора**

Гарантійне обслуговування надається офіційним дистриб'ютором згідно з умовами виробника.

**Типові умови гарантії:**
- Термін: 6-12 місяців (залежить від бренду та моделі)
- Гарантія на заводські дефекти
- Безкоштовний ремонт або заміна несправних деталей
- Гарантійний талон від офіційного дистриб'ютора

**Гарантія НЕ покриває:**
- Механічні пошкодження від падінь
- Неправильну експлуатацію
- Природний знос (шини, колодки)

Всі питання гарантії вирішуються напряму з дистриб'ютором, у якого ви здійснили покупку.
      `.trim(),
    },
  ];

  // Sections for direct sale model (accessories - we sell directly)
  const directSaleSections: TermSection[] = [
    {
      id: 'delivery',
      title: 'Доставка',
      content: `
**Доставка Новою Поштою по всій Україні**

- Відправка протягом 1-2 робочих днів після підтвердження замовлення
- Доставка у відділення Нової Пошти: 2-5 днів
- Вартість доставки: за тарифами Нової Пошти (зазвичай 50-80 грн)
- Можлива адресна доставка кур'єром Нової Пошти

**Безкоштовна доставка:**
- При замовленні від 1500 грн

Товар упакований у міцну упаковку для безпечного транспортування.
      `.trim(),
    },
    {
      id: 'payment',
      title: 'Оплата',
      content: `
**Способи оплати:**

- **Передоплата на картку ПриватБанку** (швидке оформлення)
- **Готівкою при отриманні** у відділенні Нової Пошти
- **Безготівковий розрахунок** для юридичних осіб (з ПДВ або без)

Після оформлення замовлення менеджер зв'яжеться з вами протягом 1-2 годин для підтвердження та узгодження деталей.

**Безпечна оплата:** перевіряйте товар перед оплатою у відділенні Нової Пошти.
      `.trim(),
    },
    {
      id: 'warranty',
      title: 'Гарантія',
      content: `
**Гарантія на комплектуючі: 14 днів**

**Умови гарантії:**
- Заводський брак - обмін або повернення коштів
- Невідповідність опису - повернення коштів
- Пошкодження при доставці - безкоштовна заміна

**Перевірка при отриманні:**
Обов'язково перевіряйте товар у відділенні Нової Пошти перед оплатою!

**Як повернути:**
1. Зв'яжіться з нами протягом 14 днів
2. Опишіть проблему (фото/відео)
3. Отримайте адресу для повернення
4. Повернення коштів протягом 3 робочих днів
      `.trim(),
    },
    {
      id: 'return',
      title: 'Повернення та обмін',
      content: `
**Повернення товару належної якості: 14 днів**

**Умови повернення:**
- Товар не використовувався
- Збережена оригінальна упаковка
- Є товарний чек або скріншот замовлення

**Процес повернення:**
1. Напишіть нам про бажання повернути товар
2. Узгодьте деталі з менеджером
3. Відправте товар за нашу адресу (за ваш рахунок)
4. Отримайте повернення коштів протягом 3 робочих днів після отримання товару

**Обмін на інший товар:**
Якщо товар вам не підійшов - можемо обміняти на інший з доплатою різниці.
      `.trim(),
    },
  ];

  const sections = customSections ?? (purchaseModel === 'direct_sale' ? directSaleSections : consultationSections);

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

  return (
    <div className={`${styles.container} ${className}`}>
      {sections.map((section) => {
        const isOpen = openSection === section.id;

        return (
          <div
            key={section.id}
            className={`${styles.section} ${isOpen ? styles.sectionOpen : ''}`}
          >
            <button
              onClick={() => toggleSection(section.id)}
              className={styles.sectionButton}
              aria-expanded={isOpen}
            >
              <span className={styles.sectionTitle}>{section.title}</span>
              <Icon
                name={isOpen ? 'chevronUp' : 'chevronDown'}
                size="sm"
                className={styles.chevron}
              />
            </button>

            {isOpen && (
              <div className={styles.sectionContent}>
                {typeof section.content === 'string'
                  ? renderSimpleMarkdown(section.content)
                  : section.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ProductTerms;
