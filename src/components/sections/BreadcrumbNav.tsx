import { Icon } from '../Icon';

export interface BreadcrumbNavItem {
  label: string;
  href?: string;
}

export interface BreadcrumbNavProps {
  items: BreadcrumbNavItem[];
  /** Render a link element — defaults to plain <a> */
  renderLink?: (href: string, children: React.ReactNode, key?: string | number) => React.ReactNode;
  /** Additional CSS class name */
  className?: string;
}

const navStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  fontSize: 14,
  color: 'var(--foreground-muted, #999)',
  marginBottom: 32,
  flexWrap: 'wrap',
};

const linkStyle: React.CSSProperties = {
  color: 'var(--foreground-muted, #999)',
  textDecoration: 'none',
  transition: 'color 0.15s ease',
};

/**
 * BreadcrumbNav — shared breadcrumb navigation for product & legal pages.
 *
 * Renders a flat list of links separated by chevron icons.
 * The last item is treated as the current page (no link, aria-current).
 *
 * @example
 * ```tsx
 * <BreadcrumbNav
 *   items={[
 *     { label: 'Каталог', href: '/' },
 *     { label: product.name },
 *   ]}
 *   renderLink={(href, children) => <Link href={href}>{children}</Link>}
 * />
 * ```
 */
export function BreadcrumbNav({ items, renderLink, className }: BreadcrumbNavProps) {
  const defaultRenderLink = (href: string, children: React.ReactNode) => (
    <a href={href} style={linkStyle}>
      {children}
    </a>
  );

  const link = renderLink || defaultRenderLink;

  return (
    <nav
      className={className}
      style={navStyle}
      aria-label="Breadcrumb"
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={index} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            {index > 0 && (
              <Icon name="chevronRight" size="xs" color="var(--foreground-muted, #666)" />
            )}
            {isLast || !item.href ? (
              <span aria-current={isLast ? 'page' : undefined}>
                {item.label}
              </span>
            ) : (
              link(item.href, item.label, index)
            )}
          </span>
        );
      })}
    </nav>
  );
}
