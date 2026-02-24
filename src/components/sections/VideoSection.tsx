import { VideoEmbed } from '../VideoEmbed';
import { MetallicText } from '../MetallicText';
import type { ProductVideo } from '@scootify/shared/types/product';

export interface VideoSectionProps {
  /** Array of video objects with id and optional aspectRatio */
  videos: ProductVideo[];
  /** Product name for video titles */
  productName: string;
  /** Section title (default: "Відео") */
  title?: string;
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
  gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
  gap: 16,
};

/**
 * VideoSection — renders a titled grid of video embeds.
 *
 * @example
 * ```tsx
 * <VideoSection
 *   videos={[{ id: 'abc123', type: 'youtube' }]}
 *   productName="Tiger T10"
 * />
 * ```
 */
export function VideoSection({
  videos,
  productName,
  title = 'Відео',
  className,
}: VideoSectionProps) {
  if (!videos || videos.length === 0) return null;

  return (
    <section className={className} style={sectionStyle}>
      <MetallicText variant="silver" as="h2" style={titleStyle}>
        {title}
      </MetallicText>
      <div style={gridStyle}>
        {videos.map((video) => (
          <VideoEmbed
            key={video.id}
            videoId={video.id}
            title={`${productName} video`}
            aspectRatio={video.aspectRatio || '16/9'}
          />
        ))}
      </div>
    </section>
  );
}
