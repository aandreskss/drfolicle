import { VideoAutoplay } from '@/components/ui/VideoAutoplay';

interface VideoCardProps {
  src: string;
  poster?: string;
  title?: string;
  className?: string;
}

export function VideoCard({ src, poster, title, className = '' }: VideoCardProps) {
  return (
    <figure className={`overflow-hidden rounded-[var(--radius-card)] bg-dark ${className}`}>
      <VideoAutoplay
        src={src}
        controls
        playsInline
        poster={poster}
        aria-label={title}
        className="w-full aspect-video object-cover"
      />
      {title && (
        <figcaption className="px-4 py-3 text-sm font-semibold text-white/80">
          {title}
        </figcaption>
      )}
    </figure>
  );
}
