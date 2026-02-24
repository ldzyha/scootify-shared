import { Icon, type IconName } from '../Icon';

export interface GuaranteeBadge {
  icon: IconName;
  iconColor?: 'blue' | 'gold' | 'green' | 'silver';
  text: string;
}

export interface GuaranteeBadgesProps {
  /** Custom badges array */
  badges?: GuaranteeBadge[];
  /** Shorthand: warranty months (generates warranty badge automatically) */
  warrantyMonths?: number;
  /** Shorthand: show preorder badge with shipping days */
  preorderDays?: number;
  /** Shorthand: include standard shipping badge */
  showShipping?: boolean;
  /** Additional CSS class name */
  className?: string;
}

const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  paddingTop: 16,
  borderTop: '1px solid var(--surface-hover, #333)',
};

const badgeStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  fontSize: 14,
  color: 'var(--foreground-muted, #999)',
};

/**
 * GuaranteeBadges — displays warranty, shipping, and preorder info badges.
 *
 * Can be used with shorthand props or fully custom badges.
 *
 * @example Shorthand
 * ```tsx
 * <GuaranteeBadges warrantyMonths={6} showShipping preorderDays={14} />
 * ```
 *
 * @example Custom
 * ```tsx
 * <GuaranteeBadges badges={[
 *   { icon: 'shieldCheck', iconColor: 'blue', text: 'Гарантія 24 місяці' },
 *   { icon: 'truck', iconColor: 'green', text: 'Безкоштовна доставка' },
 * ]} />
 * ```
 */
export function GuaranteeBadges({
  badges,
  warrantyMonths,
  preorderDays,
  showShipping = true,
  className,
}: GuaranteeBadgesProps) {
  // Build badges from shorthand props if no custom badges provided
  const displayBadges: GuaranteeBadge[] = badges || [];

  if (!badges) {
    if (warrantyMonths) {
      displayBadges.push({
        icon: 'shieldCheck',
        iconColor: 'blue',
        text: `Гарантія ${warrantyMonths} місяців`,
      });
    }
    if (showShipping) {
      displayBadges.push({
        icon: 'truck',
        iconColor: 'blue',
        text: 'Доставка по всій Україні',
      });
    }
    if (preorderDays) {
      displayBadges.push({
        icon: 'clock',
        iconColor: 'gold',
        text: `Передзамовлення ~${preorderDays} днів`,
      });
    }
  }

  if (displayBadges.length === 0) return null;

  return (
    <div className={className} style={containerStyle}>
      {displayBadges.map((badge, index) => (
        <div key={index} style={badgeStyle}>
          <Icon name={badge.icon} size="sm" metallic={badge.iconColor} />
          <span>{badge.text}</span>
        </div>
      ))}
    </div>
  );
}
