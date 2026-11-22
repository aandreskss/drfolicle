'use client';

import { useEffect, useRef } from 'react';

interface Props {
  src?: string | null;
  loop?: boolean;
  controls?: boolean;
  playsInline?: boolean;
  poster?: string;
  style?: React.CSSProperties;
  'aria-label'?: string;
  threshold?: number;
}

export function VideoAutoplay({ src, loop, controls, playsInline, poster, style, 'aria-label': ariaLabel, threshold = 0.25 }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [threshold]);

  if (!src) return null;

  return (
    <video
      ref={ref}
      src={src}
      muted
      loop={loop}
      controls={controls}
      playsInline={playsInline}
      preload="none"
      poster={poster}
      style={style}
      aria-label={ariaLabel}
    />
  );
}
