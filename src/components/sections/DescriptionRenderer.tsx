import type { ReactNode } from 'react';

export interface DescriptionRendererProps {
  /** Raw description text (may contain markdown-like formatting) */
  text: string;
  /** Rendering mode: 'plain' for simple text, 'markdown' for headers/bold/lists/links */
  mode?: 'plain' | 'markdown';
  /** Additional CSS class name for the container */
  className?: string;
}

/**
 * Parse markdown links: [text](url) -> <a> elements
 */
function parseLinks(text: string): ReactNode {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    const linkMatch = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
    if (linkMatch) {
      const [, linkText, url] = linkMatch;
      return (
        <a
          key={i}
          href={url}
          style={{
            color: 'var(--accent, #1e90ff)',
            textDecoration: 'underline',
            textUnderlineOffset: 2,
            transition: 'color 0.15s ease',
          }}
          target={url.startsWith('http') ? '_blank' : undefined}
          rel={url.startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          {linkText}
        </a>
      );
    }
    return part;
  });
}

/**
 * Parse text with bold markers (**text**) and links
 */
function parseBoldAndLinks(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} style={{ fontWeight: 600, color: 'var(--foreground, #fff)' }}>
          {parseLinks(part.slice(2, -2))}
        </strong>
      );
    }
    return <span key={i}>{parseLinks(part)}</span>;
  });
}

/**
 * Parse a single line that might be a bullet point
 */
function renderBulletLine(line: string, index: number): ReactNode {
  if (line.startsWith('• ')) {
    return (
      <li
        key={index}
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 8,
          marginBottom: 8,
        }}
      >
        <span
          style={{
            color: 'var(--accent, #1e90ff)',
            marginTop: 6,
            flexShrink: 0,
          }}
        >
          •
        </span>
        <span style={{ color: 'var(--foreground-muted, #999)' }}>
          {parseBoldAndLinks(line.slice(2))}
        </span>
      </li>
    );
  }
  return line ? (
    <p key={index} style={{ color: 'var(--foreground-muted, #999)', lineHeight: 1.6 }}>
      {parseBoldAndLinks(line)}
    </p>
  ) : null;
}

/**
 * Render markdown-style paragraphs with headers, bold, bullets, and links.
 */
function renderMarkdown(text: string): ReactNode {
  const paragraphs = text.split(/\n\n+/);

  return paragraphs.map((paragraph, pIndex) => {
    // ## Header
    if (paragraph.startsWith('## ')) {
      return (
        <h3
          key={pIndex}
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: 'var(--foreground, #fff)',
            marginTop: pIndex === 0 ? 0 : 32,
            marginBottom: 12,
          }}
        >
          {paragraph.slice(3)}
        </h3>
      );
    }

    // ### Header (possibly with content below)
    if (paragraph.startsWith('### ')) {
      if (paragraph.includes('\n')) {
        const [header, ...rest] = paragraph.split('\n');
        return (
          <div key={pIndex} style={{ margin: '16px 0' }}>
            <h4
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: 'var(--foreground, #fff)',
                marginTop: 24,
                marginBottom: 8,
              }}
            >
              {header.slice(4)}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {rest.map((line, lIndex) => renderBulletLine(line, lIndex))}
            </ul>
          </div>
        );
      }
      return (
        <h4
          key={pIndex}
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: 'var(--foreground, #fff)',
            marginTop: pIndex === 0 ? 0 : 24,
            marginBottom: 8,
          }}
        >
          {paragraph.slice(4)}
        </h4>
      );
    }

    // Bullet list paragraph
    if (paragraph.includes('\n• ') || paragraph.startsWith('• ')) {
      const lines = paragraph.split('\n');
      return (
        <ul key={pIndex} style={{ listStyle: 'none', padding: 0, margin: '16px 0' }}>
          {lines.map((line, lIndex) => renderBulletLine(line, lIndex))}
        </ul>
      );
    }

    // Regular paragraph with bold + links
    return (
      <p
        key={pIndex}
        style={{
          color: 'var(--foreground-muted, #999)',
          lineHeight: 1.7,
          marginBottom: 16,
        }}
      >
        {parseBoldAndLinks(paragraph)}
      </p>
    );
  });
}

/**
 * DescriptionRenderer — renders product descriptions with optional markdown support.
 *
 * - `plain` mode: just renders the text as-is in a paragraph
 * - `markdown` mode: supports ## headers, ### sub-headers, **bold**, [links](url), and • bullet lists
 *
 * @example Plain text
 * ```tsx
 * <DescriptionRenderer text={product.description} mode="plain" />
 * ```
 *
 * @example Markdown
 * ```tsx
 * <DescriptionRenderer text={product.description} mode="markdown" />
 * ```
 */
export function DescriptionRenderer({
  text,
  mode = 'plain',
  className,
}: DescriptionRendererProps) {
  if (!text) return null;

  if (mode === 'plain') {
    return (
      <div className={className}>
        <p
          style={{
            color: 'var(--foreground-muted, #999)',
            fontSize: 16,
            lineHeight: 1.7,
            maxWidth: 700,
          }}
        >
          {text}
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      {renderMarkdown(text)}
    </div>
  );
}

/**
 * Standalone markdown utilities for custom rendering.
 */
export { parseLinks, parseBoldAndLinks };
