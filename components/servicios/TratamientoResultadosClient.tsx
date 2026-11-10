'use client';

import { useState } from 'react';
import type { Lang } from '@/lib/content/types';

export interface CaseData {
  id: string;
  title: string;
  beforeUrl: string | null;
  afterUrl: string | null;
  months: string | null;
  units: string | null;
  origin: string | null;
}

interface Props {
  cases: CaseData[];
  t1: string;
  t2: string;
  disclaimerText: string;
  lang: Lang;
  resultadosPath: string;
}

export function TratamientoResultadosClient({ cases, t1, t2, disclaimerText, lang, resultadosPath }: Props) {
  const [caseIdx, setCaseIdx] = useState(0);
  const [baPos, setBaPos] = useState(50);

  if (!cases.length) return null;

  const idx = Math.min(caseIdx, cases.length - 1);
  const cur = cases[idx];
  const curNum = String(idx + 1).padStart(2, '0');
  const baRight = 100 - baPos;
  const pad = (n: number) => String(n).padStart(2, '0');

  const unitsLabel = lang === 'en' ? 'Follicular units' : 'Unidades foliculares';
  const monthsLabel = lang === 'en' ? 'Elapsed time' : 'Tiempo transcurrido';
  const originLabel = lang === 'en' ? 'Visit from' : 'Nos visita desde';
  const allResultsLabel = lang === 'en' ? 'View all results' : 'Ver todos los resultados';
  const caseLabel = lang === 'en' ? 'Case' : 'Caso';
  const beforeLabel = lang === 'en' ? 'Before' : 'Antes';
  const afterLabel = lang === 'en' ? 'After' : 'Después';
  const compareLabel = lang === 'en' ? 'Compare before and after' : 'Comparar antes y después';

  return (
    <section className="dark" aria-labelledby="r-t" style={{ background: '#0A2730', color: '#FFFFFF', padding: 'clamp(72px,9vw,128px) 0' }}>
      <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>

        <h2 id="r-t" style={{ margin: 0, fontSize: 'clamp(34px,4.4vw,60px)', lineHeight: 1, letterSpacing: '-0.035em', fontWeight: 800, maxWidth: '760px' }}>
          {t1}{' '}
          <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: 'italic', fontWeight: 400, color: '#5EC4D3' }}>{t2}</span>
        </h2>

        <div className="g-res" style={{ display: 'grid', gap: '32px', alignItems: 'stretch' }}>

          {/* Before/after slider */}
          <div className="ba" style={{ position: 'relative', height: 'clamp(360px,40vw,540px)', borderRadius: '28px', overflow: 'hidden', background: '#17353E' }}>
            {cur.afterUrl && (
              <img src={cur.afterUrl} alt={`${afterLabel}: ${cur.title}`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 35%', display: 'block' }} />
            )}
            {cur.beforeUrl && (
              <div style={{ position: 'absolute', inset: 0, clipPath: `inset(0 ${baRight}% 0 0)` }}>
                <img src={cur.beforeUrl} alt={`${beforeLabel}: ${cur.title}`} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 35%', display: 'block' }} />
              </div>
            )}
            <span style={{ position: 'absolute', left: '22px', top: '22px', fontSize: '12px', fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', background: 'rgba(10,39,48,0.78)', color: '#FFFFFF', padding: '6px 12px', borderRadius: '999px', pointerEvents: 'none' }}>{beforeLabel}</span>
            <span style={{ position: 'absolute', right: '22px', top: '22px', fontSize: '12px', fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', background: '#FFFFFF', color: '#0A2730', padding: '6px 12px', borderRadius: '999px', pointerEvents: 'none' }}>{afterLabel}</span>
            <div aria-hidden="true" style={{ position: 'absolute', top: 0, bottom: 0, left: `${baPos}%`, width: '2px', background: '#C5D300', transform: 'translateX(-1px)', pointerEvents: 'none' }}>
              <div style={{ position: 'absolute', top: '50%', left: '50%', width: '52px', height: '52px', margin: '-26px 0 0 -26px', borderRadius: '50%', background: '#C5D300', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0A2730' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 7l-5 5 5 5M15 7l5 5-5 5"/>
                </svg>
              </div>
            </div>
            <label htmlFor="ba-slider" style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clipPath: 'inset(50%)' }}>{compareLabel}</label>
            <input
              id="ba-slider"
              type="range"
              min={0}
              max={100}
              step={5}
              value={baPos}
              onChange={(e) => setBaPos(Number(e.target.value))}
            />
          </div>

          {/* Right panel */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '28px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <span style={{ fontSize: '12px', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700, color: '#C5D300' }}>{caseLabel} {curNum}</span>
              <strong style={{ fontSize: 'clamp(26px,2.4vw,34px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>{cur.title}</strong>
              <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid rgba(255,255,255,0.18)' }}>
                {cur.units && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.18)', fontSize: '15px' }}>
                    <span style={{ color: '#BFD6DB' }}>{unitsLabel}</span>
                    <span style={{ fontWeight: 600 }}>{cur.units}</span>
                  </div>
                )}
                {cur.months && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.18)', fontSize: '15px' }}>
                    <span style={{ color: '#BFD6DB' }}>{monthsLabel}</span>
                    <span style={{ fontWeight: 600 }}>{cur.months}</span>
                  </div>
                )}
                {cur.origin && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.18)', fontSize: '15px' }}>
                    <span style={{ color: '#BFD6DB' }}>{originLabel}</span>
                    <span style={{ fontWeight: 600, textAlign: 'right' }}>{cur.origin}</span>
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                {cases.map((c, i) => (
                  <button
                    key={c.id}
                    type="button"
                    className="chip"
                    onClick={() => { setCaseIdx(i); setBaPos(50); }}
                    aria-pressed={i === idx}
                    aria-label={`${caseLabel} ${pad(i + 1)}`}
                    style={{ width: '72px', height: '72px', borderRadius: '16px', border: `2px solid ${i === idx ? '#C5D300' : 'rgba(255,255,255,0.18)'}`, cursor: 'pointer', padding: 0, overflow: 'hidden', background: '#1B3B45' }}
                  >
                    {c.afterUrl && (
                      <img src={c.afterUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    )}
                  </button>
                ))}
              </div>
              <a href={resultadosPath} className="lnk" style={{ color: '#9BD3DC', fontWeight: 700, fontSize: '15px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                {allResultsLabel}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6"/>
                </svg>
              </a>
              {disclaimerText && (
                <span style={{ fontSize: '13px', lineHeight: 1.5, color: '#BFD6DB' }}>{disclaimerText}</span>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
