import { Icon, type IconName } from '../Icon';
import type { ProductSpecs } from '@scootify/shared/types/product';

export interface SpecBadge {
  icon: IconName;
  iconColor?: string;
  value: string;
  label: string;
}

export interface KeySpecsBadgesProps {
  /** Full product specs object — automatically extracts key metrics */
  specs?: ProductSpecs;
  /** Or provide custom badges directly (overrides specs extraction) */
  badges?: SpecBadge[];
  /** Additional CSS class name */
  className?: string;
}

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 12,
  padding: '16px 0',
};

const badgeStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  padding: 12,
  background: 'var(--surface, #1a1a2e)',
  borderRadius: 12,
};

const valueStyle: React.CSSProperties = {
  fontSize: 16,
  fontWeight: 600,
  color: 'var(--foreground, #fff)',
};

const labelStyle: React.CSSProperties = {
  fontSize: 12,
  color: 'var(--foreground-muted, #999)',
};

/**
 * Extract key spec badges from a ProductSpecs object.
 * Returns up to 4 badges for the most important metrics.
 */
function extractBadges(specs: ProductSpecs): SpecBadge[] {
  const badges: SpecBadge[] = [];

  if (specs.performance?.maxSpeed) {
    badges.push({
      icon: 'lightning',
      iconColor: 'gold',
      value: `${specs.performance.maxSpeed} км/год`,
      label: 'Макс. швидкість',
    });
  }

  if (specs.performance?.range) {
    badges.push({
      icon: 'mapPin',
      iconColor: 'blue',
      value: `${specs.performance.range} км`,
      label: 'Запас ходу',
    });
  }

  const totalPower =
    specs.motor?.count && specs.motor?.powerPerMotor
      ? specs.motor.count * specs.motor.powerPerMotor
      : specs.motor?.totalPower;

  if (totalPower) {
    badges.push({
      icon: 'lightning',
      iconColor: 'gold',
      value: `${totalPower}W`,
      label: 'Потужність',
    });
  }

  if (specs.battery?.voltage) {
    const capacity = specs.battery.capacity ? ` ${specs.battery.capacity}Ah` : '';
    badges.push({
      icon: 'lightning',
      iconColor: 'blue',
      value: `${specs.battery.voltage}V${capacity}`,
      label: 'Батарея',
    });
  }

  return badges;
}

/**
 * KeySpecsBadges — displays key product specs as icon + value badges.
 *
 * Can be driven by a ProductSpecs object (auto-extraction) or custom badges array.
 *
 * @example Auto from specs
 * ```tsx
 * <KeySpecsBadges specs={product.specs} />
 * ```
 *
 * @example Custom badges
 * ```tsx
 * <KeySpecsBadges badges={[
 *   { icon: 'lightning', iconColor: 'gold', value: '120 км/год', label: 'Макс. швидкість' },
 * ]} />
 * ```
 */
export function KeySpecsBadges({ specs, badges, className }: KeySpecsBadgesProps) {
  const displayBadges = badges || (specs ? extractBadges(specs) : []);

  if (displayBadges.length === 0) return null;

  return (
    <div className={className} style={gridStyle}>
      {displayBadges.map((badge, index) => (
        <div key={index} style={badgeStyle}>
          <Icon
            name={badge.icon}
            size="md"
            metallic={badge.iconColor as 'gold' | 'blue' | 'silver' | undefined}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={valueStyle}>{badge.value}</span>
            <span style={labelStyle}>{badge.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
