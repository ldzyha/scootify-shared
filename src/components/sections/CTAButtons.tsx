import { Icon, type IconName } from '../Icon';

export interface CTAButton {
  href: string;
  label: string;
  icon?: IconName;
  /** Metallic gradient name for background */
  variant?: string;
  /** Opens in new tab */
  external?: boolean;
}

export interface CTAButtonsProps {
  buttons: CTAButton[];
  /** Additional CSS class name */
  className?: string;
}

const containerStyle: React.CSSProperties = {
  display: 'flex',
  gap: 12,
  flexWrap: 'wrap',
};

/**
 * Generate a metallic gradient background for a button variant.
 */
function getBackground(variant?: string): string {
  switch (variant) {
    case 'blue':
      return 'linear-gradient(135deg, #1e90ff, #00bfff)';
    case 'gold':
      return 'linear-gradient(135deg, #C9B037, #D4C76A)';
    case 'green':
      return 'linear-gradient(135deg, #22c55e, #4ade80)';
    case 'brandBg':
    case 'brandText':
      return 'var(--brand-gradient, linear-gradient(135deg, #C9B037, #D4C76A))';
    default:
      return 'linear-gradient(135deg, #1e90ff, #00bfff)';
  }
}

function getTextColor(variant?: string): string {
  if (variant === 'gold' || variant === 'brandText') return '#121212';
  return '#ffffff';
}

/**
 * CTAButtons — renders a row of CTA action buttons with metallic gradients.
 *
 * Used for consultation contact buttons (Telegram + Phone) or purchase actions.
 *
 * @example
 * ```tsx
 * <CTAButtons buttons={[
 *   { href: 'https://t.me/scootify_eco', label: 'Замовити в Telegram', icon: 'telegram', variant: 'brandText', external: true },
 *   { href: 'tel:+380772770006', label: 'Зателефонувати', icon: 'phone', variant: 'blue' },
 * ]} />
 * ```
 */
export function CTAButtons({ buttons, className }: CTAButtonsProps) {
  return (
    <div className={className} style={containerStyle}>
      {buttons.map((btn, index) => (
        <a
          key={index}
          href={btn.href}
          {...(btn.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          style={{
            background: getBackground(btn.variant),
            color: getTextColor(btn.variant),
            border: 'none',
            borderRadius: 9999,
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            textDecoration: 'none',
            transition: 'all 0.2s ease',
            padding: '16px 32px',
            fontSize: 16,
          }}
        >
          {btn.icon && <Icon name={btn.icon} size="sm" />}
          {btn.label}
        </a>
      ))}
    </div>
  );
}
