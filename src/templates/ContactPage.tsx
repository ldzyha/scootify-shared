import React, { useState } from 'react';
import { SiteConfig } from '../types';
import { MetallicText } from '../components/MetallicText';
import { MetallicButton } from '../components/MetallicButton';
import { Icon } from '../components/Icon';
import { PhoneInput } from '../components/PhoneInput';
import { Toast } from '../components/Toast';
import { CallButton } from '../components/CallButton';
import { JsonLd } from '../components/JsonLd';
import { SeoHead } from '../components/SeoHead';
import { QRCodeCanvas } from 'qrcode.react';
import { validateEmail, validatePhone, validateRequired } from '../lib/validation';
import styles from './ContactPage.module.css';

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface BusinessHours {
  day: string;
  open: string;
  close: string;
  closed?: boolean;
}

export interface ContactPageProps {
  siteConfig: SiteConfig;
  showContactForm?: boolean;
  onFormSubmit?: (data: ContactFormData) => Promise<void>;
  mapEmbedUrl?: string;
  businessHours?: BusinessHours[];
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  siteConfig,
  showContactForm = true,
  onFormSubmit,
  mapEmbedUrl,
  businessHours,
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [showPhoneQR, setShowPhoneQR] = useState(false);
  const [showTelegramQR, setShowTelegramQR] = useState(false);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    const nameError = validateRequired(formData.name, 'Name');
    if (nameError) newErrors.name = nameError;

    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;

    const phoneError = validatePhone(formData.phone);
    if (phoneError) newErrors.phone = phoneError;

    const subjectError = validateRequired(formData.subject, 'Subject');
    if (subjectError) newErrors.subject = subjectError;

    const messageError = validateRequired(formData.message, 'Message');
    if (messageError) newErrors.message = messageError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check honeypot
    if (honeypot) {
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (onFormSubmit) {
        await onFormSubmit(formData);
      }

      setToastMessage('Message sent successfully! We\'ll get back to you soon.');
      setToastType('success');
      setShowToast(true);

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      setErrors({});
    } catch (error) {
      setToastMessage('Failed to send message. Please try again.');
      setToastType('error');
      setShowToast(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handlePhoneChange = (value: string) => {
    setFormData((prev) => ({ ...prev, phone: value }));
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: undefined }));
    }
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(type);
      setTimeout(() => setCopySuccess(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const phoneUrl = `tel:${siteConfig.phone}`;
  const telegramUrl = siteConfig.telegram
    ? `https://t.me/${siteConfig.telegram.replace('@', '')}`
    : '';

  // Structured data for LocalBusiness
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.companyName,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: siteConfig.address
      ? {
          '@type': 'PostalAddress',
          streetAddress: siteConfig.address.street,
          addressLocality: siteConfig.address.city,
          addressRegion: siteConfig.address.state,
          postalCode: siteConfig.address.zip,
          addressCountry: siteConfig.address.country,
        }
      : undefined,
    geo: siteConfig.coordinates
      ? {
          '@type': 'GeoCoordinates',
          latitude: siteConfig.coordinates.lat,
          longitude: siteConfig.coordinates.lng,
        }
      : undefined,
    openingHoursSpecification: businessHours?.map((hours) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: hours.day,
      opens: hours.closed ? undefined : hours.open,
      closes: hours.closed ? undefined : hours.close,
    })),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.phone,
      email: siteConfig.email,
      contactType: 'customer service',
    },
  };

  return (
    <>
      <SeoHead
        title={`Contact Us - ${siteConfig.companyName}`}
        description={`Get in touch with ${siteConfig.companyName}. Call us at ${siteConfig.phone}, email ${siteConfig.email}, or use our contact form.`}
        siteConfig={siteConfig}
      />
      <JsonLd data={localBusinessSchema} />

      <div className={styles.contactPage}>
        <div className={styles.header}>
          <MetallicText variant="h1" className={styles.title}>
            Contact Us
          </MetallicText>
          <p className={styles.description}>
            Have questions? We'd love to hear from you. Send us a message and
            we'll respond as soon as possible.
          </p>
        </div>

        <div className={styles.contactMethods}>
          <div className={styles.methodCard}>
            <div className={styles.methodIcon}>
              <Icon name="phone" size={32} />
            </div>
            <h3 className={styles.methodTitle}>Phone</h3>
            <div className={styles.methodContent}>
              <CallButton
                phoneNumber={siteConfig.phone}
                className={styles.phoneLink}
              >
                {siteConfig.phone}
              </CallButton>
              <button
                className={styles.qrToggle}
                onClick={() => setShowPhoneQR(!showPhoneQR)}
                aria-label="Toggle phone QR code"
              >
                <Icon name="qrcode" size={20} />
                {showPhoneQR ? 'Hide QR' : 'Show QR'}
              </button>
              {showPhoneQR && (
                <div className={styles.qrCode}>
                  <QRCodeCanvas value={phoneUrl} size={150} />
                  <p className={styles.qrLabel}>Scan to call</p>
                </div>
              )}
            </div>
          </div>

          <div className={styles.methodCard}>
            <div className={styles.methodIcon}>
              <Icon name="email" size={32} />
            </div>
            <h3 className={styles.methodTitle}>Email</h3>
            <div className={styles.methodContent}>
              <a
                href={`mailto:${siteConfig.email}`}
                className={styles.emailLink}
              >
                {siteConfig.email}
              </a>
              <button
                className={styles.copyButton}
                onClick={() => copyToClipboard(siteConfig.email, 'email')}
                aria-label="Copy email address"
              >
                <Icon
                  name={copySuccess === 'email' ? 'check' : 'copy'}
                  size={20}
                />
                {copySuccess === 'email' ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          {siteConfig.telegram && (
            <div className={styles.methodCard}>
              <div className={styles.methodIcon}>
                <Icon name="telegram" size={32} />
              </div>
              <h3 className={styles.methodTitle}>Telegram</h3>
              <div className={styles.methodContent}>
                <a
                  href={telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.telegramLink}
                >
                  {siteConfig.telegram}
                </a>
                <button
                  className={styles.qrToggle}
                  onClick={() => setShowTelegramQR(!showTelegramQR)}
                  aria-label="Toggle Telegram QR code"
                >
                  <Icon name="qrcode" size={20} />
                  {showTelegramQR ? 'Hide QR' : 'Show QR'}
                </button>
                {showTelegramQR && (
                  <div className={styles.qrCode}>
                    <QRCodeCanvas value={telegramUrl} size={150} />
                    <p className={styles.qrLabel}>Scan to chat</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {siteConfig.address && (
            <div className={styles.methodCard}>
              <div className={styles.methodIcon}>
                <Icon name="map-pin" size={32} />
              </div>
              <h3 className={styles.methodTitle}>Address</h3>
              <div className={styles.methodContent}>
                <address className={styles.address}>
                  {siteConfig.address.street}
                  <br />
                  {siteConfig.address.city}, {siteConfig.address.state}{' '}
                  {siteConfig.address.zip}
                  <br />
                  {siteConfig.address.country}
                </address>
              </div>
            </div>
          )}
        </div>

        {businessHours && businessHours.length > 0 && (
          <section className={styles.businessHours}>
            <h2 className={styles.sectionTitle}>Business Hours</h2>
            <div className={styles.hoursTable}>
              {businessHours.map((hours, index) => (
                <div key={index} className={styles.hoursRow}>
                  <span className={styles.hoursDay}>{hours.day}</span>
                  <span className={styles.hoursTime}>
                    {hours.closed ? 'Closed' : `${hours.open} - ${hours.close}`}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {mapEmbedUrl && (
          <section className={styles.mapSection}>
            <h2 className={styles.sectionTitle}>Find Us</h2>
            <div className={styles.mapContainer}>
              <iframe
                src={mapEmbedUrl}
                className={styles.mapEmbed}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location map"
              />
            </div>
          </section>
        )}

        {showContactForm && (
          <section className={styles.formSection}>
            <h2 className={styles.sectionTitle}>Send Us a Message</h2>
            <form onSubmit={handleSubmit} className={styles.contactForm}>
              {/* Honeypot field */}
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className={styles.honeypot}
                tabIndex={-1}
                aria-hidden="true"
                autoComplete="off"
              />

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.label}>
                    Name <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`${styles.input} ${
                      errors.name ? styles.inputError : ''
                    }`}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && (
                    <span id="name-error" className={styles.errorMessage}>
                      {errors.name}
                    </span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>
                    Email <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`${styles.input} ${
                      errors.email ? styles.inputError : ''
                    }`}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <span id="email-error" className={styles.errorMessage}>
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="phone" className={styles.label}>
                    Phone <span className={styles.required}>*</span>
                  </label>
                  <PhoneInput
                    id="phone"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    error={errors.phone}
                    className={styles.phoneInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="subject" className={styles.label}>
                    Subject <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`${styles.input} ${
                      errors.subject ? styles.inputError : ''
                    }`}
                    aria-invalid={!!errors.subject}
                    aria-describedby={
                      errors.subject ? 'subject-error' : undefined
                    }
                  />
                  {errors.subject && (
                    <span id="subject-error" className={styles.errorMessage}>
                      {errors.subject}
                    </span>
                  )}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.label}>
                  Message <span className={styles.required}>*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className={`${styles.textarea} ${
                    errors.message ? styles.inputError : ''
                  }`}
                  aria-invalid={!!errors.message}
                  aria-describedby={
                    errors.message ? 'message-error' : undefined
                  }
                />
                {errors.message && (
                  <span id="message-error" className={styles.errorMessage}>
                    {errors.message}
                  </span>
                )}
              </div>

              <div
                className={styles.formActions}
                role="status"
                aria-live="polite"
              >
                <MetallicButton
                  type="submit"
                  disabled={isSubmitting}
                  className={styles.submitButton}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </MetallicButton>
              </div>
            </form>
          </section>
        )}

        {siteConfig.socialMedia && (
          <section className={styles.socialSection}>
            <h2 className={styles.sectionTitle}>Follow Us</h2>
            <div className={styles.socialLinks}>
              {siteConfig.socialMedia.facebook && (
                <a
                  href={siteConfig.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="Facebook"
                >
                  <Icon name="facebook" size={24} />
                </a>
              )}
              {siteConfig.socialMedia.instagram && (
                <a
                  href={siteConfig.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="Instagram"
                >
                  <Icon name="instagram" size={24} />
                </a>
              )}
              {siteConfig.socialMedia.twitter && (
                <a
                  href={siteConfig.socialMedia.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="Twitter"
                >
                  <Icon name="twitter" size={24} />
                </a>
              )}
              {siteConfig.socialMedia.linkedin && (
                <a
                  href={siteConfig.socialMedia.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="LinkedIn"
                >
                  <Icon name="linkedin" size={24} />
                </a>
              )}
            </div>
          </section>
        )}

        {showToast && (
          <Toast
            message={toastMessage}
            type={toastType}
            onClose={() => setShowToast(false)}
          />
        )}
      </div>
    </>
  );
};
