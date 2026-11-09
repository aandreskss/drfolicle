'use client';
import { useState } from 'react';
import type { Lang } from '@/lib/content/types';

export interface ViajeStep {
  when: string;
  title: string;
  text: string;
  we: string;
  you: string;
  imgSrc: string | null;
  imgAlt: string;
}

export function ViajeStepperClient({ steps, lang }: { steps: ViajeStep[]; lang: Lang }) {
  const [idx, setIdx] = useState(0);
  if (!steps.length) return null;
  const cur = steps[idx];
  const n = steps.length;
  const pad = (x: number) => String(x).padStart(2, '0');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      <div role="tablist" aria-label={lang === 'en' ? 'Journey stages' : 'Etapas del viaje'} className="g-six" style={{ display: 'grid', gap: '10px' }}>
        {steps.map((s, i) => {
          const on = i === idx;
          return (
            <button
              key={i}
              type="button"
              role="tab"
              className="chip"
              onClick={() => setIdx(i)}
              aria-selected={on}
              style={{
                border: `1.5px solid ${on ? '#0A2730' : '#D5E3E6'}`,
                background: on ? '#0A2730' : '#FFFFFF',
                color: on ? '#FFFFFF' : '#0A2730',
                borderRadius: '20px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '10px',
                textAlign: 'left',
                fontFamily: 'Manrope, sans-serif',
                cursor: 'pointer',
                minHeight: '132px',
              }}
            >
              <span style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 800, color: on ? '#C5D300' : '#007A8C' }}>{s.when}</span>
              <strong style={{ fontSize: '16px', lineHeight: 1.25 }}>{s.title}</strong>
            </button>
          );
        })}
      </div>

      <div role="tabpanel" className="g-panel" style={{ display: 'grid', gap: 'clamp(24px,4vw,56px)', background: '#FFFFFF', borderRadius: '32px', padding: 'clamp(20px,3vw,40px)', alignItems: 'center' }}>
        <div style={{ height: 'clamp(260px,28vw,380px)', borderRadius: '24px', overflow: 'hidden', position: 'relative', background: '#E3F2F4' }}>
          {cur.imgSrc && (
            <img src={cur.imgSrc} alt={cur.imgAlt} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 40%', display: 'block' }} />
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <span style={{ fontSize: '12px', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700, color: '#007A8C' }}>
            {lang === 'en' ? 'Stage' : 'Etapa'} {pad(idx + 1)} {lang === 'en' ? 'of' : 'de'} {pad(n)} · {cur.when}
          </span>
          <strong style={{ fontSize: 'clamp(26px,2.6vw,36px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>{cur.title}</strong>
          <p style={{ margin: 0, fontSize: '17px', color: '#24414A' }}>{cur.text}</p>
          <div className="g-two" style={{ display: 'grid', gap: '16px' }}>
            {cur.we && (
              <div style={{ background: '#E3F2F4', borderRadius: '18px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '12px', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 800, color: '#00566E' }}>
                  {lang === 'en' ? 'Us' : 'Nosotros'}
                </span>
                <span style={{ fontSize: '15px', color: '#0A2730' }}>{cur.we}</span>
              </div>
            )}
            {cur.you && (
              <div style={{ background: '#F7F8F5', borderRadius: '18px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '12px', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 800, color: '#4B5F66' }}>
                  {lang === 'en' ? 'You' : 'Tú'}
                </span>
                <span style={{ fontSize: '15px', color: '#0A2730' }}>{cur.you}</span>
              </div>
            )}
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              className="btn"
              onClick={() => setIdx((idx - 1 + n) % n)}
              aria-label={lang === 'en' ? 'Previous stage' : 'Etapa anterior'}
              style={{ width: '52px', height: '52px', borderRadius: '50%', border: '1.5px solid #0A2730', background: 'transparent', color: '#0A2730', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => setIdx((idx + 1) % n)}
              aria-label={lang === 'en' ? 'Next stage' : 'Etapa siguiente'}
              style={{ width: '52px', height: '52px', borderRadius: '50%', border: '1.5px solid #0A2730', background: 'transparent', color: '#0A2730', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
