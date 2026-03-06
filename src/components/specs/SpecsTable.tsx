import { ProductSpecs } from '@scootify/shared/types/product';
import { specsExplainer } from '@scootify/shared/data/specs-explainer';
import styles from './SpecsTable.module.css';

/**
 * Spec row item for the table
 */
export interface SpecRow {
  /** Spec key for info tooltip (from specs-explainer.ts) */
  key?: string;
  /** Row label */
  label: string;
  /** Row value (can be string, number, or JSX) */
  value: React.ReactNode;
  /** Optional badge/tag styling for value */
  badge?: boolean;
  /** Icon name for the row (used in features list) */
  icon?: string;
}

/**
 * Spec section with grouped rows
 */
export interface SpecSection {
  /** Section title */
  title: string;
  /** Section icon name */
  icon?: string;
  /** Rows in this section */
  rows: SpecRow[];
}

/**
 * Props for SpecsTable component
 */
export interface SpecsTableProps {
  /** Product specifications */
  specs: ProductSpecs;
  /** Show info tooltips for specs */
  showInfoButtons?: boolean;
  /** Additional CSS class */
  className?: string;
}

// ============================================================
// Inline SVG icons (no external dependency)
// ============================================================

const GroupIcons: Record<string, React.ReactNode> = {
  performance: (
    // Lightning bolt
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  motor: (
    // Settings/gear
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.6 9a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  ),
  battery: (
    // Battery
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="1" y="6" width="18" height="12" rx="2" ry="2" />
      <path d="M23 13v-2" />
      <line x1="5" y1="12" x2="9" y2="12" />
      <line x1="7" y1="10" x2="7" y2="14" />
    </svg>
  ),
  physical: (
    // Ruler / dimensions
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 3H3a2 2 0 00-2 2v14a2 2 0 002 2h18a2 2 0 002-2V5a2 2 0 00-2-2z" />
      <path d="M9 3v18" />
      <path d="M9 8H3" />
      <path d="M9 13H3" />
      <path d="M9 18H3" />
    </svg>
  ),
  safety: (
    // Shield check
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  features: (
    // Star
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
};

// Small inline icons for individual feature rows
const FeatureIcons: Record<string, React.ReactNode> = {
  display: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  ),
  cruiseControl: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  ),
  nfc: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12.55a11 11 0 0 1 14.08 0" />
      <path d="M1.42 9a16 16 0 0 1 21.16 0" />
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
      <circle cx="12" cy="20" r="1" fill="currentColor" />
    </svg>
  ),
  app: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>
  ),
  rgbLeds: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  ),
  alarm: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 01-3.46 0" />
    </svg>
  ),
  alarmWithWheelLock: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  ),
  regenerativeBrake: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="23 4 23 10 17 10" />
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
    </svg>
  ),
  turnSignals: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
  dualMotorMode: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="8" cy="12" r="3" />
      <circle cx="16" cy="12" r="3" />
      <line x1="11" y1="12" x2="13" y2="12" />
    </svg>
  ),
};

// Info icon SVG
const InfoIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

// ============================================================
// Inline tooltip component (CSS-only, no Dialog dependency)
// ============================================================

interface SpecTooltipProps {
  specKey: string;
}

function SpecTooltip({ specKey }: SpecTooltipProps) {
  const explanation = specsExplainer[specKey];
  if (!explanation) return null;

  return (
    <span className={styles.tooltipWrapper}>
      <span className={styles.tooltipTrigger} tabIndex={0} role="button" aria-label={`Що таке ${explanation.title}?`}>
        <InfoIcon />
      </span>
      <span className={styles.tooltipPopover} role="tooltip">
        <strong className={styles.tooltipTitle}>{explanation.title}</strong>
        <span className={styles.tooltipText}>{explanation.explanation}</span>
        {explanation.example && (
          <span className={styles.tooltipExample}>
            <em>Напр.:</em> {explanation.example}
          </span>
        )}
      </span>
    </span>
  );
}

// ============================================================
// Build sections from ProductSpecs
// ============================================================

function buildSections(specs: ProductSpecs): SpecSection[] {
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
        label: 'Обмежена швидкість (EU)',
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

    if (specs.performance.acceleration025) {
      rows.push({
        key: 'acceleration025',
        label: 'Розгін 0–25 км/год',
        value: `${specs.performance.acceleration025} с`,
      });
    }

    if (specs.performance.brakingDistance) {
      rows.push({
        key: 'brakingDistance',
        label: 'Гальмівна відстань',
        value: `${specs.performance.brakingDistance} м`,
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
      sections.push({ title: 'Продуктивність', icon: 'performance', rows });
    }
  }

  // Motor section
  if (specs.motor) {
    const rows: SpecRow[] = [];

    if (specs.motor.count) {
      rows.push({
        key: specs.motor.count > 1 ? 'dualMotor' : undefined,
        label: 'Кількість моторів',
        value: specs.motor.count,
      });
    }

    if (specs.motor.powerPerMotor && specs.motor.count) {
      const motorLabel = specs.motor.count > 1
        ? `${specs.motor.count}×${specs.motor.powerPerMotor} W`
        : `${specs.motor.powerPerMotor} W`;
      rows.push({
        key: 'power',
        label: 'Номінальна потужність',
        value: motorLabel,
      });
    }

    if (specs.motor.peakPower || specs.motor.totalPower) {
      const pw = specs.motor.peakPower ?? specs.motor.totalPower!;
      rows.push({
        key: 'peakPower',
        label: 'Пікова потужність',
        value: pw >= 1000 ? `${(pw / 1000).toFixed(1)} kW (${pw} W)` : `${pw} W`,
      });
    }

    if (specs.motor.type) {
      const typeMap: Record<string, string> = {
        hub: 'Hub Motor (мотор-колесо)',
        belt: 'Belt Drive (ремінь)',
        chain: 'Chain Drive (ланцюг)',
      };
      rows.push({
        key: specs.motor.type === 'hub' ? 'hubMotor' : 'beltDrive',
        label: 'Тип приводу',
        value: typeMap[specs.motor.type] ?? specs.motor.type,
        badge: true,
      });
    }

    if (specs.motor.controller) {
      rows.push({
        key: 'controller',
        label: 'Контролер',
        value: specs.motor.controller,
      });
    }

    if (rows.length > 0) {
      sections.push({ title: 'Мотор', icon: 'motor', rows });
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
          ? `${specs.battery.voltageMin}–${specs.battery.voltage} V`
          : `${specs.battery.voltage} V`,
      });
    }

    if (specs.battery.capacity) {
      rows.push({
        key: 'capacity',
        label: 'Ємність',
        value: specs.battery.capacityMin && specs.battery.capacity !== specs.battery.capacityMin
          ? `${specs.battery.capacityMin}–${specs.battery.capacity} Ah`
          : `${specs.battery.capacity} Ah`,
      });
    }

    if (specs.battery.wattHours) {
      rows.push({
        key: specs.battery.wattHours >= 1000 ? 'energyKwh' : 'energy',
        label: 'Енергія',
        value: specs.battery.wattHours >= 1000
          ? `${(specs.battery.wattHours / 1000).toFixed(2)} kWh (${specs.battery.wattHours} Wh)`
          : `${specs.battery.wattHours} Wh`,
      });
    }

    if (specs.battery.cells) {
      rows.push({
        key: 'cells',
        label: 'Елементи',
        value: specs.battery.cells,
      });
    }

    if (specs.battery.waterRating) {
      rows.push({
        key: 'batteryWaterRating',
        label: 'Водозахист батареї',
        value: specs.battery.waterRating,
        badge: true,
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

    if (specs.battery.chargerSpec) {
      rows.push({
        key: 'chargerSpec',
        label: 'Зарядний пристрій',
        value: specs.battery.chargerSpec,
      });
    }

    if (rows.length > 0) {
      sections.push({ title: 'Батарея', icon: 'battery', rows });
    }
  }

  // Physical section
  if (specs.physical) {
    const rows: SpecRow[] = [];

    if (specs.physical.weight) {
      rows.push({
        key: 'weight',
        label: 'Вага',
        value: `${specs.physical.weight} кг`,
      });
    }

    if (specs.physical.wheelSize) {
      rows.push({
        key: 'wheelSize',
        label: 'Розмір коліс',
        value: `${specs.physical.wheelSize}″`,
      });
    }

    if (specs.physical.wheelType) {
      const typeMap: Record<string, string> = {
        pneumatic: 'Пневматичні',
        solid: 'Суцільні (безкамерні)',
        tubeless: 'Безкамерні',
      };
      const keyMap: Record<string, string> = {
        pneumatic: 'wheelTypePneumatic',
        solid: 'wheelTypeSolid',
        tubeless: 'wheelTypePneumatic',
      };
      rows.push({
        key: keyMap[specs.physical.wheelType],
        label: 'Тип коліс',
        value: typeMap[specs.physical.wheelType] ?? specs.physical.wheelType,
      });
    }

    if (specs.physical.tireSpec) {
      rows.push({
        key: 'tireSpec',
        label: 'Специфікація шини',
        value: specs.physical.tireSpec,
      });
    }

    if (specs.physical.foldable !== undefined) {
      rows.push({
        key: 'foldable',
        label: 'Складний корпус',
        value: specs.physical.foldable ? 'Так' : 'Ні',
      });
    }

    if (specs.physical.dimensions) {
      const d = specs.physical.dimensions;
      rows.push({
        key: 'dimensions',
        label: 'Габарити (Д×Ш×В)',
        value: `${d.length} × ${d.width} × ${d.height} мм`,
      });
    }

    if (specs.physical.foldedDimensions) {
      const d = specs.physical.foldedDimensions;
      rows.push({
        key: 'foldedDimensions',
        label: 'Габарити складений',
        value: `${d.length} × ${d.width} × ${d.height} мм`,
      });
    }

    if (rows.length > 0) {
      sections.push({ title: 'Корпус та колеса', icon: 'physical', rows });
    }
  }

  // Safety section
  if (specs.safety) {
    const rows: SpecRow[] = [];

    if (specs.safety.waterRating) {
      rows.push({
        key: specs.safety.waterRating.toLowerCase(),
        label: 'Водозахист корпусу',
        value: specs.safety.waterRating,
        badge: true,
      });
    }

    if (specs.safety.brakeType) {
      rows.push({
        key: 'brakeType',
        label: 'Тип гальм',
        value: specs.safety.brakeType,
      });
    }

    if (specs.safety.brakePistons) {
      rows.push({
        key: 'brakePistons',
        label: 'Поршні гальма',
        value: `${specs.safety.brakePistons}-piston`,
      });
    }

    if (specs.safety.suspensionFront && specs.safety.suspensionFront !== 'none') {
      const suspMap: Record<string, string> = {
        spring: 'Пружинна',
        hydraulic: 'Гідравлічна',
        'inverted fork': 'Перевернута вилка',
      };
      rows.push({
        key: 'suspensionFront',
        label: 'Передня підвіска',
        value: suspMap[specs.safety.suspensionFront] ?? specs.safety.suspensionFront,
      });
    }

    if (specs.safety.suspensionRear && specs.safety.suspensionRear !== 'none') {
      const suspMap: Record<string, string> = {
        spring: 'Пружинна',
        hydraulic: 'Гідравлічна',
      };
      rows.push({
        key: 'suspensionRear',
        label: 'Задня підвіска',
        value: suspMap[specs.safety.suspensionRear] ?? specs.safety.suspensionRear,
      });
    }

    if (specs.safety.suspensionAdjustable) {
      rows.push({
        key: 'suspensionAdjustable',
        label: 'Регульована підвіска',
        value: 'Так',
      });
    }

    if (specs.safety.frameType) {
      rows.push({
        key: 'frameType',
        label: 'Тип рами',
        value: specs.safety.frameType,
      });
    }

    if (specs.safety.steeringColumn) {
      rows.push({
        label: 'Рульова колонка',
        value: specs.safety.steeringColumn,
      });
    }

    if (specs.safety.dashboardProtection) {
      rows.push({
        key: 'dashboardProtection',
        label: 'Захист панелі',
        value: specs.safety.dashboardProtection,
        badge: true,
      });
    }

    if (rows.length > 0) {
      sections.push({ title: 'Безпека та підвіска', icon: 'safety', rows });
    }
  }

  // Features section — one row per feature
  if (specs.features) {
    const rows: SpecRow[] = [];
    const f = specs.features;

    if (f.display) {
      rows.push({ key: 'display', label: 'Дисплей', value: 'Так', icon: 'display' });
    }
    if (f.app) {
      rows.push({ key: 'appControl', label: 'Мобільний додаток', value: 'Так', icon: 'app' });
    }
    if (f.cruiseControl) {
      rows.push({ key: 'cruiseControl', label: 'Круїз-контроль', value: 'Так', icon: 'cruiseControl' });
    }
    if (f.nfc) {
      rows.push({ key: 'nfc', label: 'NFC-розблокування', value: 'Так', icon: 'nfc' });
    }
    if (f.regenerativeBrake) {
      rows.push({ key: 'regenerativeBraking', label: 'Рекуперація енергії', value: 'Так', icon: 'regenerativeBrake' });
    }
    if (f.turnSignals) {
      rows.push({ key: 'turnSignals', label: 'Поворотники', value: 'Так', icon: 'turnSignals' });
    }
    if (f.dualMotorMode) {
      rows.push({ key: 'dualMotorMode', label: 'Dual Motor Mode', value: 'Так', icon: 'dualMotorMode' });
    }
    if (f.alarmWithWheelLock) {
      rows.push({ key: 'alarmWithWheelLock', label: 'Сигналізація + блокування колеса', value: 'Так', icon: 'alarmWithWheelLock' });
    } else if (f.alarm) {
      rows.push({ key: 'alarm', label: 'Сигналізація', value: 'Так', icon: 'alarm' });
    }
    if (f.rgbLeds) {
      rows.push({ key: 'rgbLeds', label: 'RGB-підсвітка', value: 'Так', icon: 'rgbLeds' });
    }

    if (rows.length > 0) {
      sections.push({ title: 'Функції та можливості', icon: 'features', rows });
    }
  }

  return sections;
}

// ============================================================
// Main component
// ============================================================

/**
 * Main specs table component with grouped sections, group icons, and inline tooltips.
 * Displays all product specifications in an organized table format.
 *
 * @example
 * ```tsx
 * <SpecsTable specs={productSpecs} showInfoButtons />
 * ```
 */
export function SpecsTable({
  specs,
  showInfoButtons = false,
  className = '',
}: SpecsTableProps) {
  const sections = buildSections(specs);

  if (sections.length === 0) {
    return null;
  }

  return (
    <div className={`${styles.container} ${className}`}>
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className={styles.section}>
          <div className={styles.sectionHeader}>
            {section.icon && GroupIcons[section.icon] && (
              <span className={styles.sectionIcon}>
                {GroupIcons[section.icon]}
              </span>
            )}
            <h3 className={styles.sectionTitle}>{section.title}</h3>
          </div>
          <div className={styles.table}>
            {section.rows.map((row, rowIndex) => (
              <div key={rowIndex} className={styles.row}>
                <div className={styles.label}>
                  {row.icon && FeatureIcons[row.icon] && (
                    <span className={styles.featureIcon}>
                      {FeatureIcons[row.icon]}
                    </span>
                  )}
                  <span>{row.label}</span>
                  {showInfoButtons && row.key && (
                    <SpecTooltip specKey={row.key} />
                  )}
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
