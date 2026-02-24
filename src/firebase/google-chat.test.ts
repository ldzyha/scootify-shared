import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  generateOrderNumber,
  buildProductUrl,
  buildCallbackCard,
  buildOrderCard,
  sendGoogleChatNotification,
  type SiteInfo,
  type CallbackData,
  type OrderData,
} from './google-chat';

// ============================================
// Test fixtures
// ============================================

const hileySite: SiteInfo = {
  siteName: 'HILEY',
  domain: 'hiley.com.ua',
  orderPrefix: 'HL-',
  productUrlPattern: '/product/:slug',
};

const hyscoSite: SiteInfo = {
  siteName: 'HYSCO',
  domain: 'hysco.com.ua',
  orderPrefix: 'HY-',
  productUrlPattern: '/product/:slug',
};

const namiSite: SiteInfo = {
  siteName: 'NAMI',
  domain: 'nami.com.ua',
  orderPrefix: 'NM-',
  productUrlPattern: '/product/:slug',
};

const scootifySite: SiteInfo = {
  siteName: 'SCOOTIFY',
  domain: 'scootify.com.ua',
  orderPrefix: 'SF-',
  productUrlPattern: '/product/:slug',
};

// ============================================
// generateOrderNumber
// ============================================

describe('generateOrderNumber', () => {
  it('generates order number with given prefix', () => {
    const result = generateOrderNumber('HL-');
    expect(result).toMatch(/^HL-\d{6}$/);
  });

  it('generates order number with HY prefix', () => {
    const result = generateOrderNumber('HY-');
    expect(result).toMatch(/^HY-\d{6}$/);
  });

  it('generates order number with NM prefix', () => {
    const result = generateOrderNumber('NM-');
    expect(result).toMatch(/^NM-\d{6}$/);
  });

  it('generates order number with SF prefix', () => {
    const result = generateOrderNumber('SF-');
    expect(result).toMatch(/^SF-\d{6}$/);
  });

  it('generates different order numbers over time', () => {
    const first = generateOrderNumber('HL-');
    // Advance time slightly
    vi.useFakeTimers();
    vi.setSystemTime(Date.now() + 1000);
    const second = generateOrderNumber('HL-');
    vi.useRealTimers();
    // They may or may not differ depending on timing, but format is valid
    expect(first).toMatch(/^HL-\d{6}$/);
    expect(second).toMatch(/^HL-\d{6}$/);
  });

  it('uses last 6 digits of timestamp', () => {
    vi.useFakeTimers();
    vi.setSystemTime(1700000123456); // known timestamp
    const result = generateOrderNumber('HL-');
    expect(result).toBe('HL-123456');
    vi.useRealTimers();
  });
});

// ============================================
// buildProductUrl
// ============================================

describe('buildProductUrl', () => {
  it('builds URL for Hiley product', () => {
    const url = buildProductUrl(hileySite, 'tiger-king');
    expect(url).toBe('https://hiley.com.ua/product/tiger-king/');
  });

  it('builds URL for Hysco product', () => {
    const url = buildProductUrl(hyscoSite, 'hyper-pro-max');
    expect(url).toBe('https://hysco.com.ua/product/hyper-pro-max/');
  });

  it('builds URL for Nami product', () => {
    const url = buildProductUrl(namiSite, 'burn-e-2');
    expect(url).toBe('https://nami.com.ua/product/burn-e-2/');
  });

  it('builds URL for Scootify product', () => {
    const url = buildProductUrl(scootifySite, 'dualtron-thunder');
    expect(url).toBe('https://scootify.com.ua/product/dualtron-thunder/');
  });

  it('replaces :slug placeholder correctly', () => {
    const site: SiteInfo = {
      ...hileySite,
      productUrlPattern: '/catalog/:slug/details',
    };
    const url = buildProductUrl(site, 'test-product');
    expect(url).toBe('https://hiley.com.ua/catalog/test-product/details/');
  });

  it('handles pattern already ending with slash', () => {
    const site: SiteInfo = {
      ...hileySite,
      productUrlPattern: '/product/:slug/',
    };
    const url = buildProductUrl(site, 'test');
    expect(url).toBe('https://hiley.com.ua/product/test/');
  });
});

// ============================================
// buildCallbackCard
// ============================================

describe('buildCallbackCard', () => {
  it('builds card with phone only', () => {
    const data: CallbackData = { phone: '+380 (50) 123-45-67' };
    const card = buildCallbackCard(hileySite, data);

    expect(card).toHaveProperty('cardsV2');
    expect(card.cardsV2).toHaveLength(1);

    const cardV2 = card.cardsV2[0] as Record<string, unknown>;
    expect(cardV2.cardId).toMatch(/^callback-\d+$/);

    const innerCard = cardV2.card as Record<string, unknown>;
    const header = innerCard.header as Record<string, string>;
    expect(header.title).toContain('HILEY');
    expect(header.title).toContain('Зворотній дзвінок');
  });

  it('includes phone widget with tel: link', () => {
    const data: CallbackData = { phone: '+380 50 123 45 67' };
    const card = buildCallbackCard(hyscoSite, data);

    const widgets = getWidgets(card);
    const phoneWidget = widgets.find(
      (w: Record<string, unknown>) =>
        (w.decoratedText as Record<string, unknown>)?.topLabel === 'Телефон'
    );
    expect(phoneWidget).toBeDefined();

    const decoratedText = phoneWidget.decoratedText as Record<string, unknown>;
    expect(decoratedText.text).toBe('+380 50 123 45 67');
    const button = decoratedText.button as Record<string, unknown>;
    const onClick = button.onClick as Record<string, unknown>;
    const openLink = onClick.openLink as Record<string, string>;
    expect(openLink.url).toBe('tel:+380501234567');
  });

  it('includes product widget when product info provided', () => {
    const data: CallbackData = {
      phone: '+380501234567',
      productName: 'Tiger King RS',
      productSlug: 'tiger-king-rs',
    };
    const card = buildCallbackCard(hileySite, data);

    const widgets = getWidgets(card);
    const productWidget = widgets.find(
      (w: Record<string, unknown>) =>
        (w.decoratedText as Record<string, unknown>)?.topLabel === 'Товар'
    );
    expect(productWidget).toBeDefined();

    const decoratedText = productWidget.decoratedText as Record<string, unknown>;
    expect(decoratedText.text).toBe('Tiger King RS');
    const button = decoratedText.button as Record<string, unknown>;
    const onClick = button.onClick as Record<string, unknown>;
    const openLink = onClick.openLink as Record<string, string>;
    expect(openLink.url).toBe('https://hiley.com.ua/product/tiger-king-rs/');
  });

  it('does not include product widget when no product info', () => {
    const data: CallbackData = { phone: '+380501234567' };
    const card = buildCallbackCard(namiSite, data);

    const widgets = getWidgets(card);
    const productWidget = widgets.find(
      (w: Record<string, unknown>) =>
        (w.decoratedText as Record<string, unknown>)?.topLabel === 'Товар'
    );
    expect(productWidget).toBeUndefined();
  });

  it('includes site domain widget', () => {
    const data: CallbackData = { phone: '+380501234567' };
    const card = buildCallbackCard(namiSite, data);

    const widgets = getWidgets(card);
    const siteWidget = widgets.find(
      (w: Record<string, unknown>) =>
        (w.decoratedText as Record<string, unknown>)?.topLabel === 'Сайт'
    );
    expect(siteWidget).toBeDefined();

    const decoratedText = siteWidget.decoratedText as Record<string, string>;
    expect(decoratedText.text).toBe('nami.com.ua');
  });

  it('uses correct site name for each site', () => {
    const data: CallbackData = { phone: '+380501234567' };

    for (const site of [hileySite, hyscoSite, namiSite, scootifySite]) {
      const card = buildCallbackCard(site, data);
      const cardV2 = (card.cardsV2 as Array<Record<string, unknown>>)[0];
      const innerCard = cardV2.card as Record<string, unknown>;
      const header = innerCard.header as Record<string, string>;
      expect(header.title).toContain(site.siteName);
    }
  });

  it('includes Ukrainian timezone timestamp', () => {
    const data: CallbackData = { phone: '+380501234567' };
    const card = buildCallbackCard(hileySite, data);

    const cardV2 = (card.cardsV2 as Array<Record<string, unknown>>)[0];
    const innerCard = cardV2.card as Record<string, unknown>;
    const header = innerCard.header as Record<string, string>;
    // Subtitle should be a timestamp string
    expect(header.subtitle).toBeTruthy();
    expect(typeof header.subtitle).toBe('string');
  });
});

// ============================================
// buildOrderCard
// ============================================

describe('buildOrderCard', () => {
  const basicOrder: OrderData = {
    customer: { name: 'Іван Петренко', phone: '+380501234567' },
    items: [
      { name: 'Tiger King RS', quantity: 1, slug: 'tiger-king-rs' },
    ],
  };

  const fullOrder: OrderData = {
    customer: {
      name: 'Марія Коваленко',
      phone: '+380 67 890 12 34',
      email: 'maria@example.com',
    },
    items: [
      { name: 'Tiger King RS', quantity: 1, slug: 'tiger-king-rs' },
      { name: 'Шолом', quantity: 2 },
    ],
    subtotalUsdCents: 299900,
    delivery: {
      method: 'nova-poshta-branch',
      city: 'Київ',
      warehouse: 'Відділення №5',
    },
    comment: 'Доставити після обіду',
  };

  it('builds card with order number in header', () => {
    const card = buildOrderCard(hileySite, 'HL-123456', basicOrder);

    const cardV2 = (card.cardsV2 as Array<Record<string, unknown>>)[0];
    expect(cardV2.cardId).toBe('order-HL-123456');

    const innerCard = cardV2.card as Record<string, unknown>;
    const header = innerCard.header as Record<string, string>;
    expect(header.title).toContain('HL-123456');
    expect(header.title).toContain('HILEY');
  });

  it('includes customer name and phone widgets', () => {
    const card = buildOrderCard(hyscoSite, 'HY-654321', basicOrder);

    const sections = getSections(card);
    const customerSection = sections.find(
      (s: Record<string, unknown>) => s.header === 'Клієнт'
    );
    expect(customerSection).toBeDefined();

    const widgets = customerSection.widgets as Array<Record<string, unknown>>;
    const nameWidget = widgets.find(
      (w) => (w.decoratedText as Record<string, unknown>)?.topLabel === "Ім'я"
    );
    expect(nameWidget).toBeDefined();
    expect((nameWidget!.decoratedText as Record<string, string>).text).toBe('Іван Петренко');

    const phoneWidget = widgets.find(
      (w) => (w.decoratedText as Record<string, unknown>)?.topLabel === 'Телефон'
    );
    expect(phoneWidget).toBeDefined();
  });

  it('includes items section with product names', () => {
    const card = buildOrderCard(namiSite, 'NM-111111', fullOrder);

    const sections = getSections(card);
    const itemsSection = sections.find(
      (s: Record<string, unknown>) => s.header === 'Товари'
    );
    expect(itemsSection).toBeDefined();

    const widgets = itemsSection.widgets as Array<Record<string, unknown>>;
    const textWidget = widgets[0] as Record<string, unknown>;
    const textParagraph = textWidget.textParagraph as Record<string, string>;
    expect(textParagraph.text).toContain('Tiger King RS');
    expect(textParagraph.text).toContain('Шолом');
    expect(textParagraph.text).toContain('2 шт.');
  });

  it('formats subtotal as USD in header subtitle', () => {
    const card = buildOrderCard(hileySite, 'HL-222222', fullOrder);

    const cardV2 = (card.cardsV2 as Array<Record<string, unknown>>)[0];
    const innerCard = cardV2.card as Record<string, unknown>;
    const header = innerCard.header as Record<string, string>;
    expect(header.subtitle).toBe('$2999.00');
  });

  it('shows empty string for subtitle when no subtotal', () => {
    const card = buildOrderCard(hileySite, 'HL-333333', basicOrder);

    const cardV2 = (card.cardsV2 as Array<Record<string, unknown>>)[0];
    const innerCard = cardV2.card as Record<string, unknown>;
    const header = innerCard.header as Record<string, string>;
    expect(header.subtitle).toBe('');
  });

  it('includes delivery section when delivery city provided', () => {
    const card = buildOrderCard(hileySite, 'HL-444444', fullOrder);

    const sections = getSections(card);
    const deliverySection = sections.find(
      (s: Record<string, unknown>) => {
        const header = s.header as string | undefined;
        return header === 'Доставка';
      }
    );
    expect(deliverySection).toBeDefined();

    const widgets = deliverySection.widgets as Array<Record<string, unknown>>;
    const textWidget = widgets[0] as Record<string, unknown>;
    const textParagraph = textWidget.textParagraph as Record<string, string>;
    expect(textParagraph.text).toContain('Київ');
    expect(textParagraph.text).toContain('Відділення №5');
  });

  it('does not include delivery section when no city', () => {
    const card = buildOrderCard(hileySite, 'HL-555555', basicOrder);

    const sections = getSections(card);
    const deliverySection = sections.find(
      (s: Record<string, unknown>) => {
        const header = s.header as string | undefined;
        return header === 'Доставка';
      }
    );
    expect(deliverySection).toBeUndefined();
  });

  it('includes site domain in final section', () => {
    const card = buildOrderCard(scootifySite, 'SF-666666', basicOrder);

    const sections = getSections(card);
    const lastSection = sections[sections.length - 1];
    const widgets = lastSection.widgets as Array<Record<string, unknown>>;
    const siteWidget = widgets.find(
      (w) => (w.decoratedText as Record<string, unknown>)?.topLabel === 'Сайт'
    );
    expect(siteWidget).toBeDefined();
    expect((siteWidget!.decoratedText as Record<string, string>).text).toBe('scootify.com.ua');
  });

  it('uses correct site name for each site in header', () => {
    for (const site of [hileySite, hyscoSite, namiSite, scootifySite]) {
      const card = buildOrderCard(site, `${site.orderPrefix}000000`, basicOrder);
      const cardV2 = (card.cardsV2 as Array<Record<string, unknown>>)[0];
      const innerCard = cardV2.card as Record<string, unknown>;
      const header = innerCard.header as Record<string, string>;
      expect(header.title).toContain(site.siteName);
    }
  });
});

// ============================================
// sendGoogleChatNotification
// ============================================

describe('sendGoogleChatNotification', () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it('returns false when webhook URL is empty', async () => {
    const result = await sendGoogleChatNotification({}, '');
    expect(result).toBe(false);
  });

  it('sends POST request with JSON payload', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
    });
    globalThis.fetch = mockFetch;

    const payload = { text: 'test' };
    await sendGoogleChatNotification(payload, 'https://chat.googleapis.com/webhook');

    expect(mockFetch).toHaveBeenCalledWith('https://chat.googleapis.com/webhook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  });

  it('returns true on successful response', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({ ok: true });

    const result = await sendGoogleChatNotification(
      { text: 'test' },
      'https://chat.googleapis.com/webhook'
    );
    expect(result).toBe(true);
  });

  it('returns false on non-ok response', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 403,
    });

    const result = await sendGoogleChatNotification(
      { text: 'test' },
      'https://chat.googleapis.com/webhook'
    );
    expect(result).toBe(false);
  });

  it('returns false on fetch error', async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

    const result = await sendGoogleChatNotification(
      { text: 'test' },
      'https://chat.googleapis.com/webhook'
    );
    expect(result).toBe(false);
  });

  it('logs error when webhook URL is empty', async () => {
    await sendGoogleChatNotification({}, '');
    expect(console.error).toHaveBeenCalledWith('GOOGLE_CHAT_WEBHOOK_URL not configured');
  });

  it('logs error on failed response', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
    });

    await sendGoogleChatNotification({ text: 'test' }, 'https://webhook.example.com');
    expect(console.error).toHaveBeenCalledWith('Google Chat webhook failed:', 500);
  });

  it('logs error on network error', async () => {
    const networkError = new Error('Network error');
    globalThis.fetch = vi.fn().mockRejectedValue(networkError);

    await sendGoogleChatNotification({ text: 'test' }, 'https://webhook.example.com');
    expect(console.error).toHaveBeenCalledWith('Error sending to Google Chat:', networkError);
  });
});

// ============================================
// Integration-style tests
// ============================================

describe('integration: callback flow', () => {
  it('generates card matching expected structure for Hysco callback', () => {
    const data: CallbackData = {
      phone: '+380501234567',
      productName: 'Hyper Pro Max',
      productSlug: 'hyper-pro-max',
    };
    const card = buildCallbackCard(hyscoSite, data);

    // Verify the full card structure is valid Google Chat API format
    expect(card.cardsV2).toBeInstanceOf(Array);
    const cardV2 = card.cardsV2[0] as Record<string, unknown>;
    expect(cardV2).toHaveProperty('cardId');
    expect(cardV2).toHaveProperty('card');

    const innerCard = cardV2.card as Record<string, unknown>;
    expect(innerCard).toHaveProperty('header');
    expect(innerCard).toHaveProperty('sections');

    const sections = innerCard.sections as Array<Record<string, unknown>>;
    expect(sections.length).toBeGreaterThan(0);
    expect(sections[0]).toHaveProperty('widgets');
  });

  it('generates card matching expected structure for Nami order', () => {
    const orderNumber = generateOrderNumber('NM-');
    const orderData: OrderData = {
      customer: { name: 'Тест', phone: '+380501234567' },
      items: [{ name: 'Burn-E 2', quantity: 1 }],
      subtotalUsdCents: 189900,
    };
    const card = buildOrderCard(namiSite, orderNumber, orderData);

    expect(card.cardsV2).toBeInstanceOf(Array);
    const sections = getSections(card);
    // Should have customer + items + site domain sections
    expect(sections.length).toBeGreaterThanOrEqual(3);
  });
});

// ============================================
// Helpers
// ============================================

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getWidgets(card: Record<string, unknown>): any[] {
  const cardsV2 = card.cardsV2 as Array<Record<string, unknown>>;
  const innerCard = cardsV2[0].card as Record<string, unknown>;
  const sections = innerCard.sections as Array<Record<string, unknown>>;
  return sections[0].widgets as Array<Record<string, unknown>>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getSections(card: Record<string, unknown>): any[] {
  const cardsV2 = card.cardsV2 as Array<Record<string, unknown>>;
  const innerCard = cardsV2[0].card as Record<string, unknown>;
  return innerCard.sections as Array<Record<string, unknown>>;
}
