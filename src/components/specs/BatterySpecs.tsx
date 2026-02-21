import { ProductSpecs } from '@scootify/shared/types/product';
import { SpecInfoButton } from './SpecInfoButton';
import styles from './BatterySpecs.module.css';

/**
 * Props for BatterySpecs component
 */
export interface BatterySpecsProps {
  /** Battery specifications from ProductSpecs */
  battery: ProductSpecs['battery'];
  /** Show info buttons for specs */
  showInfoButtons?: boolean;
  /** Compact mode (fewer details) */
  compact?: boolean;
  /** Additional CSS class */
  className?: string;
}

/**
 * Battery-specific specs display with voltage, capacity, and range.
 * 
 * @example
 * ```tsx
 * <BatterySpecs 
 *   battery={{ voltage: 48, capacity: 20, wattHours: 960 }}
 *   showInfoButtons
 * />
 * ```
 */
export function BatterySpecs({
  battery,
  showInfoButtons = false,
  compact = false,
  className = '',
}: BatterySpecsProps) {
  if (!battery) return null;

  const hasVoltageRange = battery.voltageMin && battery.voltage && battery.voltageMin !== battery.voltage;
  const hasCapacityRange = battery.capacityMin && battery.capacity && battery.capacityMin !== battery.capacity;

  return (
    <div className={`${styles.container} ${compact ? styles.compact : ''} ${className}`}>
      <h3 className={styles.heading}>Батарея</h3>
      
      <div className={styles.specs}>
        {/* Voltage */}
        {battery.voltage && (
          <div className={styles.spec}>
            <div className={styles.label}>
              Напруга
              {showInfoButtons && <SpecInfoButton specKey="voltage" size="sm" />}
            </div>
            <div className={styles.value}>
              {hasVoltageRange ? (
                <span>{battery.voltageMin}–{battery.voltage}V</span>
              ) : (
                <span>{battery.voltage}V</span>
              )}
            </div>
          </div>
        )}

        {/* Capacity */}
        {battery.capacity && (
          <div className={styles.spec}>
            <div className={styles.label}>
              Ємність
              {showInfoButtons && <SpecInfoButton specKey="capacity" size="sm" />}
            </div>
            <div className={styles.value}>
              {hasCapacityRange ? (
                <span>{battery.capacityMin}–{battery.capacity}Ah</span>
              ) : (
                <span>{battery.capacity}Ah</span>
              )}
            </div>
          </div>
        )}

        {/* Watt-hours */}
        {battery.wattHours && (
          <div className={styles.spec}>
            <div className={styles.label}>
              Енергія
              {showInfoButtons && <SpecInfoButton specKey={battery.wattHours >= 1000 ? 'energyKwh' : 'energy'} size="sm" />}
            </div>
            <div className={styles.value}>
              {battery.wattHours >= 1000 ? (
                <span>{(battery.wattHours / 1000).toFixed(1)} kWh</span>
              ) : (
                <span>{battery.wattHours} Wh</span>
              )}
            </div>
          </div>
        )}

        {/* Cells configuration */}
        {!compact && battery.cells && (
          <div className={styles.spec}>
            <div className={styles.label}>
              Конфігурація
              {showInfoButtons && <SpecInfoButton specKey="cells" size="sm" />}
            </div>
            <div className={styles.value}>{battery.cells}</div>
          </div>
        )}

        {/* Charge time */}
        {!compact && battery.chargeTime && (
          <div className={styles.spec}>
            <div className={styles.label}>
              Час зарядки
              {showInfoButtons && <SpecInfoButton specKey="chargeTime" size="sm" />}
            </div>
            <div className={styles.value}>
              {battery.chargeTime.min === battery.chargeTime.max ? (
                <span>{battery.chargeTime.min} год</span>
              ) : (
                <span>{battery.chargeTime.min}–{battery.chargeTime.max} год</span>
              )}
            </div>
          </div>
        )}

        {/* Water rating */}
        {!compact && battery.waterRating && (
          <div className={styles.spec}>
            <div className={styles.label}>
              Водозахист
              {showInfoButtons && <SpecInfoButton specKey={battery.waterRating.toLowerCase()} size="sm" />}
            </div>
            <div className={styles.value}>
              <span className={styles.badge}>{battery.waterRating}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BatterySpecs;
