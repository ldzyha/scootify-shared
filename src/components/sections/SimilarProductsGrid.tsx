import { MetallicText } from '../MetallicText';
import type { ReactNode } from 'react';

export interface SimilarProductsGridProps {
  /** Section title (default: "Схожі моделі") */
  title?: string;
  /** Number of items (used to skip rendering if 0) */
  count: number;
  /** Render the product tiles — each site uses its own ProductTile */
  children: ReactNode;
  /** Additional CSS class name */
  className?: string;
}

const sectionStyle: React.CSSProperties = {
  marginBottom: 64,
};

const titleStyle: React.CSSProperties = {
  fontSize: 24,
  fontWeight: 700,
  margin: '0 0 20px',
};

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
  gap: 16,
};

/**
 * SimilarProductsGrid — titled grid section for related product tiles.
 *
 * This is a layout wrapper — each site provides its own ProductTile as children.
 *
 * @example
 * ```tsx
 * <SimilarProductsGrid count={similar.length}>
 *   {similar.map(p => <ProductTile key={p.id} product={p} />)}
 * </SimilarProductsGrid>
 * ```
 */
export function SimilarProductsGrid({
  title = 'Схожі моделі',
  count,
  children,
  className,
}: SimilarProductsGridProps) {
  if (count === 0) return null;

  return (
    <section className={className} style={sectionStyle}>
      <MetallicText variant="silver" as="h2" style={titleStyle}>
        {title}
      </MetallicText>
      <div style={gridStyle}>
        {children}
      </div>
    </section>
  );
}
