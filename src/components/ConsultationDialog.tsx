'use client';

import { useState } from 'react';
import { Icon } from './Icon';
import { PhoneInput } from './PhoneInput';
import type { SiteConfig } from '../types/site-config';

export interface ConsultationDialogProps {
  productName: string;
  productSku?: string;
  siteConfig: SiteConfig;
  onClose: () => void;
  onSubmit?: (data: ConsultationFormData) => Promise<void>;
}

export interface ConsultationFormData {
  name: string;
  phone: string;
  message?: string;
  productName: string;
  productSku?: string;
}

/**
 * ConsultationDialog - Dialog for consultation request
 * Opens when user clicks consultation button for scooters
 * 
 * @example
 * ```tsx
 * <ConsultationDialog
 *   productName="Kaabo Wolf King GTR"
 *   productSku="KAABO-WK-GTR"
 *   siteConfig={siteConfig}
 *   onClose={() => setShowDialog(false)}
 * />
 * ```
 */
export function ConsultationDialog({
  productName,
  productSku,
  siteConfig,
  onClose,
  onSubmit,
}: ConsultationDialogProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !phone.trim()) {
      setSubmitError('Будь ласка, заповніть всі обов\'язкові поля');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    const formData: ConsultationFormData = {
      name: name.trim(),
      phone: phone.trim(),
      message: message.trim(),
      productName,
      productSku,
    };

    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        // Default: log to console (в реальному проекті - відправка на сервер)
        console.log('Consultation request:', formData);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      setSubmitSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      setSubmitError('Помилка відправки. Спробуйте пізніше або зателефонуйте нам.');
      console.error('Consultation submit error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="bg-surface rounded-2xl p-8 max-w-md w-full text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-green-500/20 rounded-full flex items-center justify-center">
            <Icon name="check" size="lg" className="text-green-400" />
          </div>
          <h3 className="text-xl font-bold">Дякуємо за запит!</h3>
          <p className="text-foreground-muted">
            Наш менеджер зв'яжеться з вами найближчим часом
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-surface rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold mb-1">Замовити консультацію</h3>
            <p className="text-sm text-foreground-muted">{productName}</p>
            {productSku && (
              <p className="text-xs text-foreground-muted mt-1">SKU: {productSku}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-surface-hover rounded-lg transition-colors"
            aria-label="Закрити"
          >
            <Icon name="close" size="sm" />
          </button>
        </div>

        {/* Disclaimer */}
        <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <div className="flex gap-3">
            <Icon name="info" size="sm" className="text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-foreground-muted">
              <p className="font-medium text-foreground mb-1">Ми не є офіційним дистриб'ютором</p>
              <p>
                Ми допоможемо вам обрати ідеальний електросамокат та з'єднаємо вас 
                з перевіреним офіційним дистриб'ютором для оформлення замовлення.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="consultation-name" className="block text-sm font-medium mb-2">
              Ім'я <span className="text-red-400">*</span>
            </label>
            <input
              id="consultation-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Введіть ваше ім'я"
              className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="consultation-phone" className="block text-sm font-medium mb-2">
              Телефон <span className="text-red-400">*</span>
            </label>
            <PhoneInput
              value={phone}
              onChange={setPhone}
              placeholder="+380 XX XXX XX XX"
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="consultation-message" className="block text-sm font-medium mb-2">
              Коментар (необов'язково)
            </label>
            <textarea
              id="consultation-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Опишіть що вас цікавить..."
              rows={4}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Error */}
          {submitError && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-sm text-red-400">{submitError}</p>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Icon name="loader" size="sm" className="animate-spin" />
                Відправка...
              </>
            ) : (
              'Відправити запит'
            )}
          </button>

          {/* Info */}
          <p className="text-xs text-foreground-muted text-center">
            Натискаючи кнопку, ви погоджуєтесь з{' '}
            <a href="/polityka-konfidentsiinosti" className="underline hover:text-foreground">
              політикою конфіденційності
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default ConsultationDialog;
