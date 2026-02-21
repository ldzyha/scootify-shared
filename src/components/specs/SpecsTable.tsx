import { ProductSpecs } from '@scootify/shared/types/product';
import { SpecInfoButton } from './SpecInfoButton';
import styles from './SpecsTable.module.css';

/**
 * Spec row item for the table
 */
export interface SpecRow {
  /** Spec key for info button (from specs-explainer.ts) */
  key?: string;
  /** Row label */
  label: string;
  /** Row value (can be string, number, or JSX) */
  value: React.ReactNode;
  /** Optional badge/tag styling for value */
  badge?: boolean;
}

/**
 * Spec section with grouped rows
 */
export interface SpecSection {
  /** Section title */
  title: string;
  /** Rows in this section */
  rows: SpecRow[];
}

/**
 * Props for SpecsTable component
 */
export interface SpecsTableProps {
  /** Product specifications */
  specs: ProductSpecs;
  /** Show info buttons for specs */
  showInfoButtons?: boolean;
  /** Additional CSS class */
  className?: string;
}

/**
 * Main specs table component with grouped sections.
 * Displays all product specifications in an organized table format.
 * 
 * @example
 * ```tsx
 * <SpecsTable 
 *   specs={productSpecs}
 *   showInfoButtons
 * />
 * ```
 */
export function SpecsTable({
  specs,
  showInfoButtons = false,
  className = '',
}: SpecsTableProps) {
  const sections: SpecSection[] = [];

  // Performance section
  if (specs.performance) {
    const rows: SpecRow[] = [];
    
    if (specs.performance.maxSpeed) {
      rows.push({
        key: 'maxSpeed',
        label: 'Максимальна швидкість',
        value: `${specs.performance.maxSpeed} км/год`,
      });
    }
    
    if (specs.performance.maxSpeedLimited) {
      rows.push({
        label: 'Обмежена швидкість',
        value: `${specs.performance.maxSpeedLimited} км/год`,
      });
    }
    
    if (specs.performance.range) {
      rows.push({
        key: 'range',
        label: 'Запас ходу',
        value: `${specs.performance.range} км`,
      });
    }
    
    if (specs.performance.maxIncline) {
      rows.push({
        key: 'maxIncline',
        label: 'Максимальний підйом',
        value: `${specs.performance.maxIncline}°`,
      });
    }
    
    if (specs.performance.maxLoad) {
      rows.push({
        key: 'maxLoad',
        label: 'Максимальне навантаження',
        value: `${specs.performance.maxLoad} кг`,
      });
    }
    
    if (rows.length > 0) {
      sections.push({ title: 'Характеристики', rows });
    }
  }

  // Motor section
  if (specs.motor) {
    const rows: SpecRow[] = [];
    
    if (specs.motor.totalPower) {
      rows.push({
        key: specs.motor.totalPower >= 1000 ? 'powerKw' : 'power',
        label: 'Потужність двигуна',
        value: specs.motor.totalPower >= 1000 
          ? `${(specs.motor.totalPower / 1000).toFixed(1)} kW`
          : `${specs.motor.totalPower} W`,
      });
    }
    
    if (specs.motor.count && specs.motor.count > 1) {
      rows.push({
        key: 'dualMotor',
        label: 'Кількість моторів',
        value: specs.motor.count,
      });
    }
    
    if (specs.motor.type) {
      rows.push({
        key: specs.motor.type === 'hub' ? 'hubMotor' : 'beltDrive',
        label: 'Тип приводу',
        value: specs.motor.type === 'hub' ? 'Hub Motor' : specs.motor.type === 'belt' ? 'Belt Drive' : 'Chain Drive',
        badge: true,
      });
    }
    
    if (rows.length > 0) {
      sections.push({ title: 'Двигун', rows });
    }
  }

  // Battery section
  if (specs.battery) {
    const rows: SpecRow[] = [];
    
    if (specs.battery.voltage) {
      rows.push({
        key: 'voltage',
        label: 'Напруга',
        value: specs.battery.voltageMin && specs.battery.voltage !== specs.battery.voltageMin
          ? `${specs.battery.voltageMin}–${specs.battery.voltage}V`
          : `${specs.battery.voltage}V`,
      });
    }
    
    if (specs.battery.capacity) {
      rows.push({
        key: 'capacity',
        label: 'Ємність',
        value: specs.battery.capacityMin && specs.battery.capacity !== specs.battery.capacityMin
          ? `${specs.battery.capacityMin}–${specs.battery.capacity}Ah`
          : `${specs.battery.capacity}Ah`,
      });
    }
    
    if (specs.battery.wattHours) {
      rows.push({
        key: specs.battery.wattHours >= 1000 ? 'energyKwh' : 'energy',
        label: 'Енергія',
        value: specs.battery.wattHours >= 1000
          ? `${(specs.battery.wattHours / 1000).toFixed(1)} kWh`
          : `${specs.battery.wattHours} Wh`,
      });
    }
    
    if (specs.battery.cells) {
      rows.push({
        key: 'cells',
        label: 'Конфігурація елементів',
        value: specs.battery.cells,
      });
    }
    
    if (specs.battery.chargeTime) {
      rows.push({
        key: 'chargeTime',
        label: 'Час зарядки',
        value: specs.battery.chargeTime.min === specs.battery.chargeTime.max
          ? `${specs.battery.chargeTime.min} год`
          : `${specs.battery.chargeTime.min}–${specs.battery.chargeTime.max} год`,
      });
    }
    
    if (rows.length > 0) {
      sections.push({ title: 'Батарея', rows });
    }
  }

  // Physical section
  if (specs.physical) {
    const rows: SpecRow[] = [];
    
    if (specs.physical.weight) {
      rows.push({
        label: 'Вага',
        value: `${specs.physical.weight} кг`,
      });
    }
    
    if (specs.physical.wheelSize) {
      rows.push({
        label: 'Розмір коліс',
        value: `${specs.physical.wheelSize}"`,
      });
    }
    
    if (specs.physical.wheelType) {
      rows.push({
        label: 'Тип коліс',
        value: specs.physical.wheelType === 'pneumatic' ? 'Пневматичні' 
          : specs.physical.wheelType === 'solid' ? 'Литі' 
          : 'Безкамерні',
      });
    }
    
    if (specs.physical.foldable !== undefined) {
      rows.push({
        label: 'Складний',
        value: specs.physical.foldable ? 'Так' : 'Ні',
      });
    }
    
    if (specs.physical.dimensions) {
      const d = specs.physical.dimensions;
      rows.push({
        label: 'Габарити',
        value: `${d.length} × ${d.width} × ${d.height} см`,
      });
    }
    
    if (specs.physical.foldedDimensions) {
      const d = specs.physical.foldedDimensions;
      rows.push({
        label: 'Габарити в складеному вигляді',
        value: `${d.length} × ${d.width} × ${d.height} см`,
      });
    }
    
    if (rows.length > 0) {
      sections.push({ title: 'Фізичні параметри', rows });
    }
  }

  // Safety section
  if (specs.safety) {
    const rows: SpecRow[] = [];
    
    if (specs.safety.waterRating) {
      rows.push({
        key: specs.safety.waterRating.toLowerCase(),
        label: 'Водозахист',
        value: specs.safety.waterRating,
        badge: true,
      });
    }
    
    if (specs.safety.brakeType) {
      rows.push({
        label: 'Тип гальм',
        value: specs.safety.brakeType,
      });
    }
    
    if (specs.safety.suspensionFront && specs.safety.suspensionFront !== 'none') {
      rows.push({
        key: 'suspensionFront',
        label: 'Передня підвіска',
        value: specs.safety.suspensionFront === 'spring' ? 'Пружинна'
          : specs.safety.suspensionFront === 'hydraulic' ? 'Гідравлічна'
          : specs.safety.suspensionFront,
      });
    }
    
    if (specs.safety.suspensionRear && specs.safety.suspensionRear !== 'none') {
      rows.push({
        key: 'suspensionRear',
        label: 'Задня підвіска',
        value: specs.safety.suspensionRear === 'spring' ? 'Пружинна'
          : specs.safety.suspensionRear === 'hydraulic' ? 'Гідравлічна'
          : specs.safety.suspensionRear,
      });
    }
    
    if (rows.length > 0) {
      sections.push({ title: 'Безпека', rows });
    }
  }

  // Features section
  if (specs.features) {
    const rows: SpecRow[] = [];
    
    if (specs.features.display) {
      rows.push({
        key: 'display',
        label: 'Дисплей',
        value: 'Так',
      });
    }
    
    if (specs.features.app) {
      rows.push({
        key: 'appControl',
        label: 'Мобільний додаток',
        value: 'Так',
      });
    }
    
    if (specs.features.cruiseControl) {
      rows.push({
        key: 'cruiseControl',
        label: 'Круїз-контроль',
        value: 'Так',
      });
    }
    
    if (specs.features.regenerativeBrake) {
      rows.push({
        key: 'regenerativeBraking',
        label: 'Рекуперація енергії',
        value: 'Так',
      });
    }
    
    if (specs.features.turnSignals) {
      rows.push({
        label: 'Поворотники',
        value: 'Так',
      });
    }
    
    if (specs.features.rgbLeds) {
      rows.push({
        key: 'lights',
        label: 'RGB підсвітка',
        value: 'Так',
      });
    }
    
    if (specs.features.alarm || specs.features.alarmWithWheelLock) {
      rows.push({
        label: 'Сигналізація',
        value: specs.features.alarmWithWheelLock ? 'З блокуванням колеса' : 'Так',
      });
    }
    
    if (specs.features.nfc) {
      rows.push({
        label: 'NFC',
        value: 'Так',
      });
    }
    
    if (rows.length > 0) {
      sections.push({ title: 'Додаткові функції', rows });
    }
  }

  if (sections.length === 0) {
    return null;
  }

  return (
    <div className={`${styles.container} ${className}`}>
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className={styles.section}>
          <h3 className={styles.sectionTitle}>{section.title}</h3>
          <div className={styles.table}>
            {section.rows.map((row, rowIndex) => (
              <div key={rowIndex} className={styles.row}>
                <div className={styles.label}>
                  {row.label}
                  {showInfoButtons && row.key && <SpecInfoButton specKey={row.key} size="sm" />}
                </div>
                <div className={styles.value}>
                  {row.badge ? (
                    <span className={styles.badge}>{row.value}</span>
                  ) : (
                    row.value
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SpecsTable;
