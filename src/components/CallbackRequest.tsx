'use client';

import { useState, useRef, type ReactNode } from 'react';
import { Icon } from './Icon';

export interface CallbackRequestProps {
  /** Called when user submits phone number. Return { success: true } or { success: false, error: string } */
  onSubmit: (phone: string) => Promise<{ success: boolean; error?: string }>;
  /** URL to privacy policy page */
  privacyUrl?: string;
  /** Compact mode for sidebars */
  compact?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Custom title */
  title?: string;
  /** Custom subtitle */
  subtitle?: string;
  /** Custom success message */
  successMessage?: ReactNode;
}

/**
 * CallbackRequest - Phone callback form with Ukrainian phone validation.
 *
 * Uses CSS custom properties for theming:
 * - `--primary` / `--primary-dark` / `--primary-light` for brand colors
 * - `--background` / `--surface` / `--foreground` for neutrals
 *
 * @example
 * ```tsx
 * <CallbackRequest
 *   onSubmit={async (phone) => {
 *     const res = await fetch('/api/callback', { method: 'POST', body: JSON.stringify({ phone }) });
 *     return res.ok ? { success: true } : { success: false, error: 'Failed' };
 *   }}
 *   privacyUrl="/policies/polityka-konfidentsiinosti/"
 * />
 * ```
 */
export function CallbackRequest({
  onSubmit,
  privacyUrl,
  compact = false,
  className = '',
  title = 'Замовити дзвінок',
  subtitle = 'Наш менеджер зв\'яжеться з вами для консультації',
  successMessage,
}: CallbackRequestProps) {
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const phoneInputRef = useRef<HTMLInputElement>(null);

  const validatePhone = (phoneNumber: string): boolean => {
    const digits = phoneNumber.replace(/\D/g, '');
    if (digits.startsWith('380') && digits.length === 12) return true;
    if (digits.startsWith('0') && !digits.startsWith('0380') && digits.length === 10) return true;
    return false;
  };

  const isPhoneValid = validatePhone(phone);

  const formatPhone = (value: string): string => {
    let digits = value.replace(/[^\d+]/g, '');

    if (digits.startsWith('+380')) {
      digits = digits.slice(0, 13);
      if (digits.length > 4) {
        const parts = [digits.slice(0, 4), digits.slice(4, 6), digits.slice(6, 9), digits.slice(9, 11), digits.slice(11, 13)];
        digits = parts.filter(Boolean).join(' ');
      }
    } else if (digits.startsWith('380')) {
      digits = '+' + digits;
      return formatPhone(digits);
    } else if (digits.startsWith('0')) {
      digits = digits.slice(0, 10);
      if (digits.length > 3) {
        const parts = [digits.slice(0, 3), digits.slice(3, 6), digits.slice(6, 8), digits.slice(8, 10)];
        digits = parts.filter(Boolean).join(' ');
      }
    } else if (digits.length > 0 && !digits.startsWith('+')) {
      return formatPhone('+380' + digits);
    }

    return digits.trim();
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validatePhone(phone)) {
      setError('Введіть коректний номер телефону');
      phoneInputRef.current?.focus();
      return;
    }

    setIsSubmitting(true);
    const result = await onSubmit(phone.replace(/\s/g, ''));
    setIsSubmitting(false);

    if (result.success) {
      setIsSuccess(true);
      setPhone('');
      setTimeout(() => setIsSuccess(false), 5000);
    } else {
      setError(result.error || 'Щось пішло не так. Спробуйте ще раз.');
    }
  };

  const successContent = successMessage ?? (
    <div className="text-center space-y-3">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
        style={{ background: 'var(--gradient-brand, var(--primary))' }}
      >
        <Icon name="check" size="lg" className="text-background" />
      </div>
      <h3 className="text-xl font-bold text-foreground">Дякуємо!</h3>
      <p className="text-foreground-muted text-sm">Ми зателефонуємо вам найближчим часом</p>
    </div>
  );

  const phoneField = (
    <div>
      <label htmlFor={`callback-phone${compact ? '-compact' : ''}`} className={compact ? 'sr-only' : 'block text-sm font-semibold text-foreground-muted mb-2'}>
        Номер телефону
      </label>
      <input
        ref={phoneInputRef}
        id={`callback-phone${compact ? '-compact' : ''}`}
        type="tel"
        value={phone}
        onChange={handlePhoneChange}
        placeholder="+380 XX XXX XX XX"
        disabled={isSubmitting}
        className="w-full px-4 py-3 bg-surface border rounded-xl text-foreground placeholder-foreground-muted/50 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          borderColor: error ? 'var(--error)' : 'var(--border)',
        }}
        aria-invalid={error ? 'true' : 'false'}
      />
      {error && (
        <p className="mt-2 text-sm flex items-center gap-1" style={{ color: 'var(--error)' }}>
          <Icon name="info" size="xs" />
          {error}
        </p>
      )}
    </div>
  );

  const submitButton = (
    <button
      type="submit"
      disabled={isSubmitting || !isPhoneValid}
      className="w-full py-3 px-6 font-bold rounded-xl transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      style={{
        background: isSubmitting || !isPhoneValid ? 'var(--surface-hover)' : 'var(--gradient-brand, var(--primary))',
        color: isSubmitting || !isPhoneValid ? 'var(--foreground-muted)' : 'var(--background)',
      }}
    >
      {isSubmitting ? (
        <>
          <Icon name="spinner" size="sm" className="animate-spin" />
          Відправляємо...
        </>
      ) : (
        <>
          <Icon name="phone" size="sm" />
          Замовити дзвінок
        </>
      )}
    </button>
  );

  if (compact) {
    return (
      <div className={`bg-surface/50 border border-border rounded-2xl p-6 ${className}`}>
        {isSuccess ? successContent : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-center space-y-2">
              <h3 className="text-lg font-bold text-foreground">{title}</h3>
              <p className="text-foreground-muted text-sm">{subtitle}</p>
            </div>
            {phoneField}
            {submitButton}
          </form>
        )}
      </div>
    );
  }

  return (
    <section className={`py-12 lg:py-16 relative overflow-hidden ${className}`}>
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {isSuccess ? (
          <div className="text-center space-y-6">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto animate-bounce"
              style={{ background: 'var(--gradient-brand, var(--primary))' }}
            >
              <Icon name="check" size="xl" className="text-background" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Дякуємо за заявку!</h2>
            <p className="text-xl text-foreground-muted max-w-xl mx-auto">
              Наш менеджер зв&apos;яжеться з вами найближчим часом для уточнення деталей
            </p>
          </div>
        ) : (
          <div className="bg-surface/50 backdrop-blur-xl rounded-3xl border border-border overflow-hidden">
            <div className="p-8 lg:p-12">
              <div className="text-center mb-8">
                <div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
                  style={{ background: 'var(--gradient-brand, var(--primary))' }}
                >
                  <Icon name="phone" size="lg" className="text-background" />
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">{title}</h2>
                <p className="text-lg text-foreground-muted max-w-2xl mx-auto">{subtitle}</p>
              </div>

              <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
                {phoneField}
                {submitButton}

                {privacyUrl && (
                  <p className="text-sm text-foreground-muted/60 text-center">
                    Натискаючи кнопку, ви погоджуєтесь з{' '}
                    <a href={privacyUrl} className="underline underline-offset-2 transition-colors hover:text-foreground-muted" style={{ color: 'var(--primary)' }}>
                      політикою конфіденційності
                    </a>
                  </p>
                )}
              </form>

              <div className="mt-10 pt-8 border-t border-border flex flex-wrap justify-center gap-8">
                {['Швидка відповідь', 'Безкоштовна консультація', 'Без спаму'].map((label) => (
                  <div key={label} className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--primary-alpha-10)' }}>
                      <Icon name="check" size="xs" color="var(--primary)" />
                    </div>
                    <span className="text-sm text-foreground-muted">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default CallbackRequest;
