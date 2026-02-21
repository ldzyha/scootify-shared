import { SeoHead } from '@scootify/shared/components/SeoHead';
import { JsonLd, generateFAQSchema } from '@scootify/shared/components/JsonLd';
import { MetallicText } from '@scootify/shared/components/MetallicText';
import { MetallicButton } from '@scootify/shared/components/MetallicButton';
import { Icon } from '@scootify/shared/components/Icon';
import type { SiteConfig } from '@scootify/shared/types/site-config';
import React, { useState } from 'react';

// ============================================
// Type Definitions
// ============================================

export interface BotFeature {
  /** Unique identifier for the feature */
  id: string;
  /** Icon name from Icon component */
  icon: string;
  /** Feature title */
  title: string;
  /** Feature description */
  description: string;
}

export interface FAQItem {
  /** FAQ question */
  question: string;
  /** FAQ answer (supports HTML) */
  answer: string;
}

export interface HowToStep {
  /** Step number (1-indexed) */
  step: number;
  /** Step title */
  title: string;
  /** Step description */
  description: string;
  /** Optional icon */
  icon?: string;
}

export interface TelegramBotPageProps {
  /** Site configuration */
  siteConfig: SiteConfig;
  /** Telegram bot username (e.g., "@scootify_eco") */
  botUsername: string;
  /** Optional custom bot features (defaults to standard features) */
  botFeatures?: BotFeature[];
  /** Optional FAQ items */
  faqItems?: FAQItem[];
  /** Optional how-to steps (defaults to standard steps) */
  howToSteps?: HowToStep[];
  /** Optional demo video URL */
  demoVideoUrl?: string;
  /** Optional bot mascot/logo image */
  botLogoUrl?: string;
  /** Optional OG image for social sharing */
  ogImage?: string;
}

// ============================================
// Default Content
// ============================================

const DEFAULT_BOT_FEATURES: BotFeature[] = [
  {
    id: 'search',
    icon: 'search',
    title: 'Пошук товарів',
    description: 'Швидкий пошук електросамокатів за назвою, моделлю або характеристиками',
  },
  {
    id: 'specs',
    icon: 'settings',
    title: 'Характеристики',
    description: 'Детальна інформація про технічні специфікації будь-якої моделі',
  },
  {
    id: 'price',
    icon: 'cart',
    title: 'Перевірка цін',
    description: 'Актуальні ціни з автоматичною конвертацією валют (UAH/USD)',
  },
  {
    id: 'delivery',
    icon: 'truck',
    title: 'Розрахунок доставки',
    description: 'Калькулятор вартості доставки Нова Пошта до вашого міста',
  },
  {
    id: 'tracking',
    icon: 'mapPin',
    title: 'Відстеження замовлень',
    description: 'Перевірка статусу вашого замовлення в реальному часі',
  },
  {
    id: 'support',
    icon: 'mail',
    title: 'Підтримка 24/7',
    description: 'Прямий зв\'язок з власником магазину для консультацій',
  },
  {
    id: 'notifications',
    icon: 'lightning',
    title: 'Сповіщення',
    description: 'Повідомлення про нові товари, акції та спеціальні пропозиції',
  },
  {
    id: 'recommendations',
    icon: 'star',
    title: 'Рекомендації',
    description: 'Персональні підбірки самокатів на основі ваших потреб',
  },
];

const DEFAULT_HOW_TO_STEPS: HowToStep[] = [
  {
    step: 1,
    title: 'Відкрийте бота',
    description: 'Натисніть кнопку "Почати розмову" або знайдіть бота в Telegram за username',
    icon: 'telegram',
  },
  {
    step: 2,
    title: 'Виберіть дію',
    description: 'Використовуйте меню команд або напишіть свій запит текстом',
    icon: 'menu',
  },
  {
    step: 3,
    title: 'Отримайте результат',
    description: 'Бот миттєво надасть вам потрібну інформацію або зв\'яже з менеджером',
    icon: 'lightning',
  },
];

const DEFAULT_FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Як почати використовувати бота?',
    answer: 'Просто натисніть кнопку "Почати розмову" на цій сторінці або знайдіть бота в Telegram за username. Після команди /start бот покаже вам доступні функції.',
  },
  {
    question: 'Чи потрібна реєстрація?',
    answer: 'Ні, реєстрація не потрібна. Бот працює одразу після першого запуску. Для оформлення замовлення знадобиться лише ваше ім\'я та контактний телефон.',
  },
  {
    question: 'Як перевірити ціну товару?',
    answer: 'Напишіть боту назву або модель самоката, і він покаже актуальну ціну в гривнях та доларах. Також бот може порахувати вартість доставки до вашого міста.',
  },
  {
    question: 'Чи можна замовити через бота?',
    answer: 'Так! Бот допоможе оформити замовлення та зв\'яже вас з менеджером для підтвердження деталей. Ви також можете отримати консультацію щодо вибору моделі.',
  },
  {
    question: 'Які способи оплати доступні?',
    answer: 'Ми приймаємо оплату готівкою, карткою онлайн, банківським переказом. Детальну інформацію про оплату ви отримаєте від менеджера після оформлення замовлення.',
  },
  {
    question: 'Як відстежити моє замовлення?',
    answer: 'Після оформлення замовлення ви отримаєте номер ТТН Нової Пошти. Введіть його боту, і він покаже актуальний статус доставки.',
  },
];

// ============================================
// Component
// ============================================

export function TelegramBotPage({
  siteConfig,
  botUsername,
  botFeatures = DEFAULT_BOT_FEATURES,
  faqItems = DEFAULT_FAQ_ITEMS,
  howToSteps = DEFAULT_HOW_TO_STEPS,
  demoVideoUrl,
  botLogoUrl,
  ogImage,
}: TelegramBotPageProps) {
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);

  const pageTitle = `Telegram Бот ${siteConfig.siteName} - Швидкий пошук та підтримка`;
  const pageDescription = `Telegram бот для швидкого пошуку електросамокатів, перевірки цін, розрахунку доставки та підтримки 24/7. Почніть розмову: ${botUsername}`;
  const botUrl = `https://t.me/${botUsername.replace('@', '')}`;

  const toggleFaq = (index: number) => {
    setExpandedFaqIndex(expandedFaqIndex === index ? null : index);
  };

  const handleCtaClick = () => {
    window.open(botUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <SeoHead
        title={pageTitle}
        description={pageDescription}
        type="website"
        image={ogImage || botLogoUrl}
        siteConfig={siteConfig}
        keywords={[
          'telegram бот',
          'електросамокати',
          'пошук товарів',
          'підтримка',
          'доставка',
          'Нова Пошта',
          siteConfig.brand,
        ]}
      />

      <JsonLd data={generateFAQSchema(faqItems)} />

      <div className="telegram-bot-page">
        {/* Skip Links for Accessibility */}
        <a href="#main-content" className="skip-link">
          Перейти до основного контенту
        </a>
        <a href="#bot-features" className="skip-link">
          Перейти до функцій бота
        </a>
        <a href="#faq" className="skip-link">
          Перейти до FAQ
        </a>

        {/* Hero Section */}
        <section className="hero-section" role="banner">
          <div className="hero-content">
            {botLogoUrl && (
              <div className="bot-logo">
                <img
                  src={botLogoUrl}
                  alt={`${siteConfig.siteName} Telegram Bot`}
                  width={200}
                  height={200}
                />
              </div>
            )}

            <MetallicText
              as="h1"
              variant="brandText"
              className="hero-title"
              metallicGradients={siteConfig.metallicGradients}
            >
              Telegram Бот {siteConfig.siteName}
            </MetallicText>

            <p className="hero-description">
              Швидкий пошук електросамокатів, перевірка цін, розрахунок доставки та
              підтримка 24/7 — все в одному боті
            </p>

            <div className="hero-cta">
              <MetallicButton
                variant="blue"
                size="lg"
                onClick={handleCtaClick}
                aria-label={`Відкрити Telegram бот ${botUsername}`}
              >
                <Icon name="telegram" size="lg" color="#ffffff" />
                <span>Почати розмову</span>
              </MetallicButton>
              <p className="bot-username">{botUsername}</p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="bot-features" className="features-section" role="region" aria-labelledby="features-heading">
          <div className="section-container">
            <MetallicText
              as="h2"
              variant="brandText"
              className="section-title"
              metallicGradients={siteConfig.metallicGradients}
              id="features-heading"
            >
              Що вміє бот?
            </MetallicText>

            <div className="features-grid">
              {botFeatures.map((feature) => (
                <div key={feature.id} className="feature-card">
                  <div className="feature-icon">
                    <Icon
                      name={feature.icon}
                      size="xl"
                      metallic="blue"
                    />
                  </div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section id="how-to-use" className="how-to-section" role="region" aria-labelledby="how-to-heading">
          <div className="section-container">
            <MetallicText
              as="h2"
              variant="brandText"
              className="section-title"
              metallicGradients={siteConfig.metallicGradients}
              id="how-to-heading"
            >
              Як користуватися?
            </MetallicText>

            <div className="steps-timeline">
              {howToSteps.map((step) => (
                <div key={step.step} className="step-item">
                  <div className="step-number">
                    <MetallicText variant="blue" as="span">
                      {step.step}
                    </MetallicText>
                  </div>
                  {step.icon && (
                    <div className="step-icon">
                      <Icon name={step.icon} size="lg" color="#0088cc" />
                    </div>
                  )}
                  <div className="step-content">
                    <h3 className="step-title">{step.title}</h3>
                    <p className="step-description">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Demo Video Section (optional) */}
        {demoVideoUrl && (
          <section className="demo-section" role="region" aria-labelledby="demo-heading">
            <div className="section-container">
              <MetallicText
                as="h2"
                variant="brandText"
                className="section-title"
                metallicGradients={siteConfig.metallicGradients}
                id="demo-heading"
              >
                Демонстрація роботи
              </MetallicText>

              <div className="video-container">
                <iframe
                  src={demoVideoUrl}
                  title="Демонстрація Telegram бота"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </section>
        )}

        {/* FAQ Section */}
        <section id="faq" className="faq-section" role="region" aria-labelledby="faq-heading">
          <div className="section-container">
            <MetallicText
              as="h2"
              variant="brandText"
              className="section-title"
              metallicGradients={siteConfig.metallicGradients}
              id="faq-heading"
            >
              Часті питання
            </MetallicText>

            <div className="faq-accordion" role="list">
              {faqItems.map((faq, index) => {
                const isExpanded = expandedFaqIndex === index;
                const faqId = `faq-${index}`;
                const answerId = `answer-${index}`;

                return (
                  <div
                    key={index}
                    className={`faq-item ${isExpanded ? 'expanded' : ''}`}
                    role="listitem"
                  >
                    <button
                      className="faq-question"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isExpanded}
                      aria-controls={answerId}
                      id={faqId}
                    >
                      <span className="question-text">{faq.question}</span>
                      <Icon
                        name={isExpanded ? 'chevronUp' : 'chevronDown'}
                        size="md"
                        color="#0088cc"
                        aria-hidden="true"
                      />
                    </button>
                    <div
                      id={answerId}
                      className="faq-answer"
                      role="region"
                      aria-labelledby={faqId}
                      hidden={!isExpanded}
                    >
                      <p dangerouslySetInnerHTML={{ __html: faq.answer }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="cta-section" role="region" aria-label="Заклик до дії">
          <div className="section-container">
            <MetallicText
              as="h2"
              variant="gold"
              className="cta-title"
            >
              Готові спробувати?
            </MetallicText>
            <p className="cta-description">
              Почніть розмову з ботом прямо зараз і отримайте миттєві відповіді на всі
              запитання про електросамокати
            </p>
            <MetallicButton
              variant="blue"
              size="lg"
              onClick={handleCtaClick}
              aria-label={`Відкрити Telegram бот ${botUsername}`}
            >
              <Icon name="telegram" size="lg" color="#ffffff" />
              <span>Відкрити бота в Telegram</span>
            </MetallicButton>
          </div>
        </section>
      </div>
    </>
  );
}

export default TelegramBotPage;
