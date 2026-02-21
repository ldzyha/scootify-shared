'use client';

import React, { useId } from 'react';
import { PhoneInput } from '../PhoneInput';
import { validateCustomerInfo } from '@scootify/shared/lib/validation';
import type { CustomerInfo, ValidationErrors } from '@scootify/shared/types/checkout';
import styles from './CustomerInfoForm.module.css';

/**
 * Props for CustomerInfoForm component
 */
export interface CustomerInfoFormProps {
  /** Current customer information */
  value: CustomerInfo;
  /** Change handler called when any field updates */
  onChange: (value: CustomerInfo) => void;
  /** Validation errors for display */
  errors?: ValidationErrors;
  /** Whether the form is disabled */
  disabled?: boolean;
  /** Whether to show validation errors */
  showErrors?: boolean;
  /** Additional CSS class */
  className?: string;
  /** Whether to show callback button on phone input */
  showPhoneCallback?: boolean;
}

/**
 * CustomerInfoForm - Customer information collection component
 * 
 * Features:
 * - Name and phone (required) + email (optional)
 * - Uses shared PhoneInput component with Ukrainian formatting
 * - Real-time validation with error display
 * - Controlled component pattern
 * - Accessible form labels and error messages
 * 
 * @example
 * ```tsx
 * const [customer, setCustomer] = useState<CustomerInfo>({
 *   name: '',
 *   phone: '',
 *   email: ''
 * });
 * const [errors, setErrors] = useState<ValidationErrors>({});
 * 
 * const handleChange = (value: CustomerInfo) => {
 *   setCustomer(value);
 *   setErrors(validateCustomerInfo(value));
 * };
 * 
 * <CustomerInfoForm
 *   value={customer}
 *   onChange={handleChange}
 *   errors={errors}
 *   showErrors={true}
 * />
 * ```
 */
export function CustomerInfoForm({
  value,
  onChange,
  errors = {},
  disabled = false,
  showErrors = false,
  className = '',
  showPhoneCallback = false,
}: CustomerInfoFormProps) {
  const nameId = useId();
  const emailId = useId();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...value,
      name: e.target.value,
    });
  };

  const handlePhoneChange = (phone: string) => {
    onChange({
      ...value,
      phone,
    });
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...value,
      email: e.target.value,
    });
  };

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>Контактна інформація</h2>
        <p className={styles.subtitle}>
          Вкажіть ваші дані для зв'язку
        </p>
      </div>

      <div className={styles.form}>
        {/* Name Input */}
        <div className={styles.field}>
          <label htmlFor={nameId} className={styles.label}>
            Ім'я та прізвище
            <span className={styles.required}>*</span>
          </label>
          <input
            id={nameId}
            type="text"
            name="name"
            value={value.name}
            onChange={handleNameChange}
            disabled={disabled}
            required
            autoComplete="name"
            placeholder="Іван Петренко"
            className={`${styles.input} ${showErrors && errors.name ? styles.inputError : ''}`}
            aria-invalid={showErrors && !!errors.name}
            aria-describedby={showErrors && errors.name ? `${nameId}-error` : undefined}
          />
          {showErrors && errors.name && (
            <p id={`${nameId}-error`} className={styles.errorText} role="alert">
              {errors.name}
            </p>
          )}
        </div>

        {/* Phone Input */}
        <div className={styles.field}>
          <PhoneInput
            value={value.phone}
            onChange={handlePhoneChange}
            label="Телефон"
            error={showErrors ? errors.phone : undefined}
            required
            disabled={disabled}
            showCallbackButton={showPhoneCallback}
            context="checkout"
          />
        </div>

        {/* Email Input (Optional) */}
        <div className={styles.field}>
          <label htmlFor={emailId} className={styles.label}>
            Email
            <span className={styles.optional}>(необов'язково)</span>
          </label>
          <input
            id={emailId}
            type="email"
            name="email"
            value={value.email || ''}
            onChange={handleEmailChange}
            disabled={disabled}
            autoComplete="email"
            placeholder="ivan@example.com"
            className={`${styles.input} ${showErrors && errors.email ? styles.inputError : ''}`}
            aria-invalid={showErrors && !!errors.email}
            aria-describedby={showErrors && errors.email ? `${emailId}-error` : undefined}
          />
          {showErrors && errors.email && (
            <p id={`${emailId}-error`} className={styles.errorText} role="alert">
              {errors.email}
            </p>
          )}
          <p className={styles.hint}>
            Email потрібен для отримання підтвердження замовлення
          </p>
        </div>
      </div>
    </div>
  );
}

export default CustomerInfoForm;
