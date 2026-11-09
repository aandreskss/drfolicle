'use client';

import { useState } from 'react';

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  meta: string;
}

interface Props {
  items: TestimonialItem[];
  videoSrc?: string | null;
  videoPoster?: string | null;
  lang: string;
}

export function TestimoniosClient({ items, videoSrc, videoPoster, lang }: Props) {
  const [idx, setIdx] = useState(0);
  if (items.length === 0) return null;

  const testi = items[idx];
  const total = items.length;
  const prev = () => setIdx((i) => (i - 1 + total) % total);
  const next = () => setIdx((i) => (i + 1) % total);

  return (
    <>
      {/* Header navigation */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span aria-live="polite" style={{ fontSize: '14px', fontWeight: 700, color: '#4B5F66', minWidth: '48px' }}>
            {idx + 1} / {total}
          </span>
          <button type="button" className="btn chip" onClick={prev} aria-label="Testimonio anterior" style={{ width: '52px', height: '52px', borderRadius: '50%', border: '1.5px solid #0A2730', background: 'transparent', color: '#0A2730', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>
          </button>
          <button type="button" className="btn chip" onClick={next} aria-label="Siguiente testimonio" style={{ width: '52px', height: '52px', borderRadius: '50%', border: '1.5px solid #0A2730', background: 'transparent', color: '#0A2730', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="g-testi" style={{ display: 'grid', gap: '24px', alignItems: 'stretch' }}>

        {/* Video (izquierda, 5fr) */}
        <figure style={{ margin: 0, position: 'relative', height: 'clamp(460px,44vw,620px)', borderRadius: '28px', overflow: 'hidden', background: '#0A2730' }}>
          {videoSrc ? (
            <video
              controls
              playsInline
              preload="none"
              poster={videoPoster ?? undefined}
              aria-label="Video: paciente internacional cuenta por qué eligió Dr Follicle Solutions"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            >
              <source src={videoSrc} />
            </video>
          ) : (
            <div className="ph-d" style={{ position: 'absolute', inset: 0 }} />
          )}
          <figcaption style={{ position: 'absolute', left: '16px', top: '16px', display: 'inline-flex', alignItems: 'center', gap: '8px', height: '32px', padding: '0 12px', borderRadius: '999px', background: 'rgba(10,39,48,0.82)', color: '#FFFFFF', fontSize: '12px', fontWeight: 700, pointerEvents: 'none' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#C5D300' }} />
            Paciente internacional · video en inglés
          </figcaption>
        </figure>

        {/* Cita (derecha, 7fr) */}
        <figure style={{ margin: 0, background: '#FFFFFF', borderRadius: '28px', padding: 'clamp(28px,4vw,56px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '32px' }}>
          <svg width="44" height="34" viewBox="0 0 44 34" fill="#0196AD" aria-hidden="true">
            <path d="M0 34V20C0 8 6 1 18 0v7c-6 1-9 5-9 11h9v16zm26 0V20c0-12 6-19 18-20v7c-6 1-9 5-9 11h9v16z"/>
          </svg>
          <blockquote style={{ margin: 0, fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(26px,2.6vw,38px)', lineHeight: 1.2, letterSpacing: '-0.01em' }}>
            &ldquo;{testi.quote}&rdquo;
          </blockquote>
          <figcaption style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '16px', borderTop: '1px solid #D5E3E6', paddingTop: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <strong style={{ fontSize: '17px' }}>{testi.author}</strong>
              <span style={{ fontSize: '14px', color: '#4B5F66' }}>{testi.meta}</span>
            </div>
            <span style={{ fontSize: '12px', color: '#4B5F66', maxWidth: '300px', textAlign: 'right' }}>
              Reseña publicada en drfolliclesolutions.com.
            </span>
          </figcaption>
        </figure>
      </div>

      {/* Dots */}
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            className="chip"
            onClick={() => setIdx(i)}
            aria-label={`Ir al testimonio ${i + 1}`}
            aria-current={i === idx ? 'true' : undefined}
            style={{ width: '44px', height: '44px', border: 0, background: 'none', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', borderRadius: '50%' }}
          >
            <span style={{ width: i === idx ? '24px' : '8px', height: '8px', borderRadius: '999px', background: i === idx ? '#0196AD' : '#D5E3E6', transition: 'width .32s' }} />
          </button>
        ))}
      </div>
    </>
  );
}
