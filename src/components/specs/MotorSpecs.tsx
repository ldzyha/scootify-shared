import { ProductSpecs } from '@scootify/shared/types/product';
import { SpecInfoButton } from './SpecInfoButton';
import styles from './MotorSpecs.module.css';

/**
 * Props for MotorSpecs component
 */
export interface MotorSpecsProps {
  /** Motor specifications from ProductSpecs */
  motor: ProductSpecs['motor'];
  /** Show info buttons for specs */
  showInfoButtons?: boolean;
  /** Compact mode (fewer details) */
  compact?: boolean;
  /** Additional CSS class */
  className?: string;
}

/**
 * Motor-specific specs display with power, torque, and efficiency.
 * 
 * @example
 * ```tsx
 * <MotorSpecs 
 *   motor={{ count: 2, powerPerMotor: 1000, totalPower: 2000, type: 'hub' }}
 *   showInfoButtons
 * />
 * ```
 */
export function MotorSpecs({
  motor,
  showInfoButtons = false,
  compact = false,
  className = '',
}: MotorSpecsProps) {
  if (!motor) return null;

  const isDualMotor = motor.count === 2;

  return (
    <div className={`${styles.container} ${compact ? styles.compact : ''} ${className}`}>
      <h3 className={styles.heading}>Двигун</h3>
      
      <div className={styles.specs}>
        {/* Total Power */}
        {motor.totalPower && (
          <div className={styles.spec}>
            <div className={styles.label}>
              Потужність
              {showInfoButtons && <SpecInfoButton specKey={motor.totalPower >= 1000 ? 'powerKw' : 'power'} size="sm" />}
            </div>
            <div className={styles.value}>
              {motor.totalPower >= 1000 ? (
                <span>{(motor.totalPower / 1000).toFixed(1)} kW</span>
              ) : (
                <span>{motor.totalPower} W</span>
              )}
            </div>
            {isDualMotor && motor.powerPerMotor && (
              <div className={styles.subValue}>
                {motor.powerPerMotor}W × 2
              </div>
            )}
          </div>
        )}

        {/* Motor Count / Type */}
        {motor.count && motor.count > 1 && (
          <div className={styles.spec}>
            <div className={styles.label}>
              Кількість моторів
              {showInfoButtons && <SpecInfoButton specKey="dualMotor" size="sm" />}
            </div>
            <div className={styles.value}>
              {motor.count === 2 ? 'Dual Motor' : `${motor.count} мотори`}
            </div>
          </div>
        )}

        {/* Motor Type */}
        {!compact && motor.type && (
          <div className={styles.spec}>
            <div className={styles.label}>
              Тип приводу
              {showInfoButtons && <SpecInfoButton specKey={motor.type === 'hub' ? 'hubMotor' : 'beltDrive'} size="sm" />}
            </div>
            <div className={styles.value}>
              <span className={styles.badge}>
                {motor.type === 'hub' && 'Hub Motor'}
                {motor.type === 'belt' && 'Belt Drive'}
                {motor.type === 'chain' && 'Chain Drive'}
              </span>
            </div>
          </div>
        )}

        {/* Power per motor (if dual) */}
        {!compact && isDualMotor && motor.powerPerMotor && (
          <div className={styles.spec}>
            <div className={styles.label}>
              На мотор
              {showInfoButtons && <SpecInfoButton specKey="power" size="sm" />}
            </div>
            <div className={styles.value}>
              {motor.powerPerMotor >= 1000 ? (
                <span>{(motor.powerPerMotor / 1000).toFixed(1)} kW</span>
              ) : (
                <span>{motor.powerPerMotor} W</span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MotorSpecs;
