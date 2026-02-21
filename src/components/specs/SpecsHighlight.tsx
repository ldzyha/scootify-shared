import { Icon } from '../Icon';
import styles from './SpecsHighlight.module.css';

/**
 * Individual spec item for highlighting
 */
export interface HighlightSpec {
  /** Icon name from Icon component */
  icon?: string;
  /** Spec label (e.g., "Max Speed") */
  label: string;
  /** Spec value (e.g., "45 km/h") */
  value: string | number;
  /** Optional unit (e.g., "km/h") - shown separately from value */
  unit?: string;
}

/**
 * Props for SpecsHighlight component
 */
export interface SpecsHighlightProps {
  /** Array of key specs to highlight */
  specs: HighlightSpec[];
  /** Layout variant */
  variant?: 'horizontal' | 'vertical' | 'grid';
  /** Additional CSS class */
  className?: string;
  /** Show icons for specs */
  showIcons?: boolean;
}

/**
 * Highlighted key specs component for product cards and quick views.
 * Shows speed, range, power, and other key metrics.
 * 
 * @example
 * ```tsx
 * <SpecsHighlight 
 *   specs={[
 *     { icon: 'lightning', label: 'Max Speed', value: 45, unit: 'km/h' },
 *     { icon: 'battery', label: 'Range', value: 60, unit: 'km' },
 *     { label: 'Power', value: 2000, unit: 'W' }
 *   ]}
 *   variant="horizontal"
 *   showIcons
 * />
 * ```
 */
export function SpecsHighlight({
  specs,
  variant = 'horizontal',
  className = '',
  showIcons = true,
}: SpecsHighlightProps) {
  if (!specs || specs.length === 0) return null;

  return (
    <div className={`${styles.container} ${styles[variant]} ${className}`}>
      {specs.map((spec, index) => (
        <div key={index} className={styles.spec}>
          {showIcons && spec.icon && (
            <div className={styles.icon}>
              <Icon name={spec.icon} size="md" />
            </div>
          )}
          <div className={styles.content}>
            <div className={styles.value}>
              {spec.value}
              {spec.unit && <span className={styles.unit}>{spec.unit}</span>}
            </div>
            <div className={styles.label}>{spec.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Helper function to create common spec highlights from ProductSpecs
 */
export function createSpecsFromProduct(specs: {
  maxSpeed?: number;
  range?: number;
  totalPower?: number;
  voltage?: number;
  capacity?: number;
}): HighlightSpec[] {
  const highlights: HighlightSpec[] = [];

  if (specs.maxSpeed) {
    highlights.push({
      icon: 'lightning',
      label: 'Швидкість',
      value: specs.maxSpeed,
      unit: 'км/год',
    });
  }

  if (specs.range) {
    highlights.push({
      label: 'Запас ходу',
      value: specs.range,
      unit: 'км',
    });
  }

  if (specs.totalPower) {
    highlights.push({
      label: 'Потужність',
      value: specs.totalPower >= 1000 ? (specs.totalPower / 1000).toFixed(1) : specs.totalPower,
      unit: specs.totalPower >= 1000 ? 'kW' : 'W',
    });
  }

  if (specs.voltage && specs.capacity) {
    highlights.push({
      label: 'Батарея',
      value: `${specs.voltage}V ${specs.capacity}Ah`,
    });
  } else if (specs.voltage) {
    highlights.push({
      label: 'Напруга',
      value: specs.voltage,
      unit: 'V',
    });
  }

  return highlights;
}

export default SpecsHighlight;
