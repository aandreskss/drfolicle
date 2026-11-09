interface VideoCardProps {
  src: string;
  poster?: string;
  title?: string;
  className?: string;
}

export function VideoCard({ src, poster, title, className = '' }: VideoCardProps) {
  return (
    <figure className={`overflow-hidden rounded-[var(--radius-card)] bg-dark ${className}`}>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        controls
        playsInline
        preload="none"
        poster={poster}
        title={title}
        className="w-full aspect-video object-cover"
      >
        <source src={src} />
      </video>
      {title && (
        <figcaption className="px-4 py-3 text-sm font-semibold text-white/80">
          {title}
        </figcaption>
      )}
    </figure>
  );
}
