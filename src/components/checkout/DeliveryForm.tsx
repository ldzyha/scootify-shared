'use client';

import React, { useState, useEffect, useId } from 'react';
import { Icon } from '../Icon';
import { validateDeliveryInfo } from '@scootify/shared/lib/validation';
import type { DeliveryInfo, DeliveryCity, DeliveryWarehouse, DeliveryStreet, ValidationErrors } from '@scootify/shared/types/checkout';
import type { UseNovaPoshtaCitiesResult, UseNovaPoshtaWarehousesResult, UseNovaPoshtaStreetsResult } from '@scootify/shared/hooks/useNovaPoshta';
import styles from './DeliveryForm.module.css';

/**
 * Props for DeliveryForm component
 */
export interface DeliveryFormProps {
  /** Current delivery information */
  value: DeliveryInfo;
  /** Change handler called when any field updates */
  onChange: (value: DeliveryInfo) => void;
  /** Nova Poshta cities hook result */
  citiesHook: UseNovaPoshtaCitiesResult;
  /** Nova Poshta warehouses hook result */
  warehousesHook: UseNovaPoshtaWarehousesResult;
  /** Nova Poshta streets hook result */
  streetsHook: UseNovaPoshtaStreetsResult;
  /** Validation errors for display */
  errors?: ValidationErrors;
  /** Whether the form is disabled */
  disabled?: boolean;
  /** Whether to show validation errors */
  showErrors?: boolean;
  /** Additional CSS class */
  className?: string;
  /** Delivery cost in UAH (if calculated) */
  deliveryCostUah?: number;
  /** Payment method configuration */
  paymentMethod?: {
    prepaymentPercent: number;
    onChange: (percent: number) => void;
  };
}

const DELIVERY_METHODS = [
  { value: 'nova-poshta-branch', label: 'Відділення Нової Пошти', icon: 'package' as const },
  { value: 'nova-poshta-courier', label: "Кур'єр Нової Пошти", icon: 'truck' as const },
] as const;

const PREPAYMENT_OPTIONS = [
  { value: 0, label: 'Повна оплата при отриманні (післяплата)' },
  { value: 50, label: '50% передплата + 50% при отриманні' },
  { value: 100, label: '100% передплата' },
];

/**
 * DeliveryForm - Delivery method and address selection component
 * 
 * Features:
 * - Delivery method selector (warehouse/courier)
 * - Nova Poshta integration with autocomplete
 * - City search with debouncing
 * - Warehouse selection for branch delivery
 * - Street + building/apartment for courier delivery
 * - Delivery cost display
 * - Payment method selector (prepayment/COD)
 * - Real-time validation
 * 
 * @example
 * ```tsx
 * const [delivery, setDelivery] = useState<DeliveryInfo>({
 *   method: 'nova-poshta-branch',
 *   city: null,
 *   warehouse: null,
 * });
 * 
 * const citiesHook = useNovaPoshtaCities({ apiKey: 'xxx' });
 * const warehousesHook = useNovaPoshtaWarehouses({ apiKey: 'xxx' }, delivery.city?.ref);
 * const streetsHook = useNovaPoshtaStreets({ apiKey: 'xxx' }, delivery.city?.ref);
 * 
 * <DeliveryForm
 *   value={delivery}
 *   onChange={setDelivery}
 *   citiesHook={citiesHook}
 *   warehousesHook={warehousesHook}
 *   streetsHook={streetsHook}
 *   deliveryCostUah={150}
 * />
 * ```
 */
export function DeliveryForm({
  value,
  onChange,
  citiesHook,
  warehousesHook,
  streetsHook,
  errors = {},
  disabled = false,
  showErrors = false,
  className = '',
  deliveryCostUah,
  paymentMethod,
}: DeliveryFormProps) {
  const cityInputId = useId();
  const warehouseSelectId = useId();
  const streetInputId = useId();
  const buildingInputId = useId();
  const apartmentInputId = useId();

  const [citySearch, setCitySearch] = useState(value.city?.name || '');
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [streetSearch, setStreetSearch] = useState(value.street?.name || '');
  const [showStreetDropdown, setShowStreetDropdown] = useState(false);

  // Trigger city search
  useEffect(() => {
    citiesHook.search(citySearch);
  }, [citySearch]);

  // Trigger street search
  useEffect(() => {
    streetsHook.search(streetSearch);
  }, [streetSearch]);

  const handleMethodChange = (method: 'nova-poshta-branch' | 'nova-poshta-courier') => {
    onChange({
      ...value,
      method,
      warehouse: method === 'nova-poshta-branch' ? value.warehouse : null,
      street: method === 'nova-poshta-courier' ? value.street : null,
      buildingNumber: method === 'nova-poshta-courier' ? value.buildingNumber : undefined,
      apartmentNumber: method === 'nova-poshta-courier' ? value.apartmentNumber : undefined,
    });
  };

  const handleCitySelect = (city: DeliveryCity) => {
    onChange({
      ...value,
      city,
      warehouse: null,
      street: null,
    });
    setCitySearch(city.name);
    setShowCityDropdown(false);
  };

  const handleWarehouseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const warehouseRef = e.target.value;
    const warehouse = warehousesHook.warehouses.find(w => w.ref === warehouseRef);
    onChange({
      ...value,
      warehouse: warehouse ? { ref: warehouse.ref, name: warehouse.name || '', number: warehouse.number } : null,
    });
  };

  const handleStreetSelect = (street: DeliveryStreet) => {
    onChange({
      ...value,
      street,
    });
    setStreetSearch(street.name);
    setShowStreetDropdown(false);
  };

  const handleBuildingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...value,
      buildingNumber: e.target.value,
    });
  };

  const handleApartmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...value,
      apartmentNumber: e.target.value,
    });
  };

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>Доставка</h2>
        <p className={styles.subtitle}>
          Оберіть зручний спосіб доставки
        </p>
      </div>

      <div className={styles.form}>
        {/* Delivery Method Selector */}
        <div className={styles.field}>
          <label className={styles.label}>
            Спосіб доставки
            <span className={styles.required}>*</span>
          </label>
          <div className={styles.methodGrid}>
            {DELIVERY_METHODS.map((method) => (
              <button
                key={method.value}
                type="button"
                onClick={() => handleMethodChange(method.value)}
                disabled={disabled}
                className={`${styles.methodButton} ${value.method === method.value ? styles.methodButtonActive : ''}`}
              >
                <Icon name={method.icon} size="md" />
                <span>{method.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* City Autocomplete */}
        <div className={styles.field}>
          <label htmlFor={cityInputId} className={styles.label}>
            Місто
            <span className={styles.required}>*</span>
          </label>
          <div className={styles.autocompleteWrapper}>
            <input
              id={cityInputId}
              type="text"
              value={citySearch}
              onChange={(e) => {
                setCitySearch(e.target.value);
                setShowCityDropdown(true);
              }}
              onFocus={() => setShowCityDropdown(true)}
              disabled={disabled}
              placeholder="Почніть вводити назву міста..."
              className={`${styles.input} ${showErrors && errors.city ? styles.inputError : ''}`}
              autoComplete="off"
            />
            {showCityDropdown && citiesHook.cities.length > 0 && (
              <ul className={styles.dropdown} role="listbox">
                {citiesHook.cities.map((city) => (
                  <li
                    key={city.ref}
                    onClick={() => handleCitySelect({ ref: city.ref, name: city.name, region: city.area })}
                    className={styles.dropdownItem}
                    role="option"
                  >
                    <span className={styles.dropdownItemName}>{city.name}</span>
                    {city.area && (
                      <span className={styles.dropdownItemMeta}>{city.area}</span>
                    )}
                  </li>
                ))}
              </ul>
            )}
            {citiesHook.isLoading && (
              <div className={styles.loader}>Завантаження...</div>
            )}
          </div>
          {showErrors && errors.city && (
            <p className={styles.errorText} role="alert">{errors.city}</p>
          )}
        </div>

        {/* Warehouse Selector (for branch delivery) */}
        {value.method === 'nova-poshta-branch' && value.city && (
          <div className={styles.field}>
            <label htmlFor={warehouseSelectId} className={styles.label}>
              Відділення
              <span className={styles.required}>*</span>
            </label>
            <select
              id={warehouseSelectId}
              value={value.warehouse?.ref || ''}
              onChange={handleWarehouseChange}
              disabled={disabled || warehousesHook.isLoading}
              className={`${styles.select} ${showErrors && errors.warehouse ? styles.inputError : ''}`}
            >
              <option value="">Оберіть відділення...</option>
              {warehousesHook.warehouses.map((warehouse) => (
                <option key={warehouse.ref} value={warehouse.ref}>
                  {warehouse.name || `Відділення ${warehouse.number}`}
                </option>
              ))}
            </select>
            {warehousesHook.isLoading && (
              <div className={styles.loader}>Завантаження відділень...</div>
            )}
            {showErrors && errors.warehouse && (
              <p className={styles.errorText} role="alert">{errors.warehouse}</p>
            )}
          </div>
        )}

        {/* Street Autocomplete + Building/Apartment (for courier delivery) */}
        {value.method === 'nova-poshta-courier' && value.city && (
          <>
            <div className={styles.field}>
              <label htmlFor={streetInputId} className={styles.label}>
                Вулиця
                <span className={styles.required}>*</span>
              </label>
              <div className={styles.autocompleteWrapper}>
                <input
                  id={streetInputId}
                  type="text"
                  value={streetSearch}
                  onChange={(e) => {
                    setStreetSearch(e.target.value);
                    setShowStreetDropdown(true);
                  }}
                  onFocus={() => setShowStreetDropdown(true)}
                  disabled={disabled}
                  placeholder="Почніть вводити назву вулиці..."
                  className={`${styles.input} ${showErrors && errors.street ? styles.inputError : ''}`}
                  autoComplete="off"
                />
                {showStreetDropdown && streetsHook.streets.length > 0 && (
                  <ul className={styles.dropdown} role="listbox">
                    {streetsHook.streets.map((street) => (
                      <li
                        key={street.ref}
                        onClick={() => handleStreetSelect({ ref: street.ref, name: street.name })}
                        className={styles.dropdownItem}
                        role="option"
                      >
                        {street.name}
                      </li>
                    ))}
                  </ul>
                )}
                {streetsHook.isLoading && (
                  <div className={styles.loader}>Завантаження...</div>
                )}
              </div>
              {showErrors && errors.street && (
                <p className={styles.errorText} role="alert">{errors.street}</p>
              )}
            </div>

            <div className={styles.addressRow}>
              <div className={styles.field}>
                <label htmlFor={buildingInputId} className={styles.label}>
                  Будинок
                  <span className={styles.required}>*</span>
                </label>
                <input
                  id={buildingInputId}
                  type="text"
                  value={value.buildingNumber || ''}
                  onChange={handleBuildingChange}
                  disabled={disabled}
                  placeholder="123"
                  className={`${styles.input} ${showErrors && errors.buildingNumber ? styles.inputError : ''}`}
                />
                {showErrors && errors.buildingNumber && (
                  <p className={styles.errorText} role="alert">{errors.buildingNumber}</p>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor={apartmentInputId} className={styles.label}>
                  Квартира
                  <span className={styles.optional}>(необов'язково)</span>
                </label>
                <input
                  id={apartmentInputId}
                  type="text"
                  value={value.apartmentNumber || ''}
                  onChange={handleApartmentChange}
                  disabled={disabled}
                  placeholder="45"
                  className={styles.input}
                />
              </div>
            </div>
          </>
        )}

        {/* Delivery Cost Display */}
        {deliveryCostUah !== undefined && (
          <div className={styles.deliveryCost}>
            <Icon name="truck" size="sm" />
            <span>Вартість доставки:</span>
            <strong>{deliveryCostUah} ₴</strong>
          </div>
        )}

        {/* Payment Method Selector */}
        {paymentMethod && (
          <div className={styles.field}>
            <label className={styles.label}>
              Спосіб оплати
              <span className={styles.required}>*</span>
            </label>
            <div className={styles.paymentOptions}>
              {PREPAYMENT_OPTIONS.map((option) => (
                <label
                  key={option.value}
                  className={`${styles.radioLabel} ${paymentMethod.prepaymentPercent === option.value ? styles.radioLabelActive : ''}`}
                >
                  <input
                    type="radio"
                    name="prepayment"
                    value={option.value}
                    checked={paymentMethod.prepaymentPercent === option.value}
                    onChange={() => paymentMethod.onChange(option.value)}
                    disabled={disabled}
                    className={styles.radioInput}
                  />
                  <span className={styles.radioText}>{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DeliveryForm;
