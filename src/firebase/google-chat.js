"use strict";
/**
 * Google Chat notification card builders
 * Shared across all site Firebase Functions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOrderNumber = generateOrderNumber;
exports.buildProductUrl = buildProductUrl;
exports.buildCallbackCard = buildCallbackCard;
exports.buildOrderCard = buildOrderCard;
exports.sendGoogleChatNotification = sendGoogleChatNotification;
/**
 * Generate order number with site prefix
 * Format: PREFIX-XXXXXX (6-digit timestamp suffix)
 */
function generateOrderNumber(prefix) {
    return `${prefix}${String(Date.now()).slice(-6)}`;
}
/**
 * Build product URL from site config
 */
function buildProductUrl(site, slug) {
    const path = site.productUrlPattern.replace(':slug', slug);
    return `https://${site.domain}${path}${path.endsWith('/') ? '' : '/'}`;
}
/**
 * Build Google Chat card for callback request
 */
function buildCallbackCard(site, data) {
    const timestamp = new Date().toLocaleString('uk-UA', { timeZone: 'Europe/Kyiv' });
    const widgets = [
        {
            decoratedText: {
                topLabel: 'Телефон',
                text: data.phone,
                icon: { knownIcon: 'PHONE' },
                button: {
                    text: 'Подзвонити',
                    onClick: { openLink: { url: `tel:${data.phone.replace(/\s/g, '')}` } },
                },
            },
        },
    ];
    if (data.productName && data.productSlug) {
        widgets.push({
            decoratedText: {
                topLabel: 'Товар',
                text: data.productName,
                button: {
                    text: 'Переглянути',
                    onClick: { openLink: { url: buildProductUrl(site, data.productSlug) } },
                },
            },
        });
    }
    widgets.push({
        decoratedText: { topLabel: 'Сайт', text: site.domain },
    });
    return {
        cardsV2: [
            {
                cardId: `callback-${Date.now()}`,
                card: {
                    header: {
                        title: `📞 Зворотній дзвінок — ${site.siteName}`,
                        subtitle: timestamp,
                    },
                    sections: [{ widgets }],
                },
            },
        ],
    };
}
/**
 * Build Google Chat card for order notification
 */
function buildOrderCard(site, orderNumber, data) {
    const itemsText = data.items
        .map((item) => `📦 ${item.name} (${item.quantity} шт.)`)
        .join('\n');
    const subtotalText = data.subtotalUsdCents
        ? `$${(data.subtotalUsdCents / 100).toFixed(2)}`
        : '';
    const customerWidgets = [
        {
            decoratedText: {
                topLabel: "Ім'я",
                text: data.customer.name,
                icon: { knownIcon: 'PERSON' },
            },
        },
        {
            decoratedText: {
                topLabel: 'Телефон',
                text: data.customer.phone,
                icon: { knownIcon: 'PHONE' },
                button: {
                    text: 'Подзвонити',
                    onClick: { openLink: { url: `tel:${data.customer.phone.replace(/\s/g, '')}` } },
                },
            },
        },
    ];
    const sections = [
        { header: 'Клієнт', widgets: customerWidgets },
        { header: 'Товари', widgets: [{ textParagraph: { text: itemsText } }] },
    ];
    if (data.delivery?.city) {
        sections.push({
            header: 'Доставка',
            widgets: [
                {
                    textParagraph: {
                        text: [data.delivery.city, data.delivery.warehouse].filter(Boolean).join(', '),
                    },
                },
            ],
        });
    }
    sections.push({
        widgets: [{ decoratedText: { topLabel: 'Сайт', text: site.domain } }],
    });
    return {
        cardsV2: [
            {
                cardId: `order-${orderNumber}`,
                card: {
                    header: {
                        title: `🛒 Замовлення ${orderNumber} — ${site.siteName}`,
                        subtitle: subtotalText,
                    },
                    sections,
                },
            },
        ],
    };
}
/**
 * Send notification to Google Chat webhook
 */
async function sendGoogleChatNotification(payload, webhookUrl) {
    if (!webhookUrl) {
        console.error('GOOGLE_CHAT_WEBHOOK_URL not configured');
        return false;
    }
    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        if (!response.ok) {
            console.error('Google Chat webhook failed:', response.status);
            return false;
        }
        return true;
    }
    catch (error) {
        console.error('Error sending to Google Chat:', error);
        return false;
    }
}
//# sourceMappingURL=google-chat.js.map