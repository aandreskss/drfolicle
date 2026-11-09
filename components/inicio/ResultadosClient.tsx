'use client';

import { useState, useId } from 'react';
import { Link } from '@/i18n/navigation';

export interface CaseItem {
  id: string;
  title: string;
  tech: string;
  units: string;
  months: string;
  origin: string;
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
}

interface Props {
  cases: CaseItem[];
  ctaHref: string;
  ctaLabel: string;
  lang: string;
}

export function ResultadosClient({ cases, ctaHref, ctaLabel, lang }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);
  const inputId = useId();

  if (cases.length === 0) return null;
  const cur = cases[currentIdx];
  const curNum = `Caso ${currentIdx + 1}`;
  const baRight = 100 - sliderPos;

  return (
    <div className="g-res" style={{ display: 'grid', gap: '32px', alignItems: 'stretch' }}>

      {/* ── Comparador antes/después ── */}
      <div
        className="ba"
        style={{ position: 'relative', height: 'clamp(360px,40vw,560px)', borderRadius: '28px', overflow: 'hidden' }}
        aria-label={`Antes y después — ${cur.title}`}
      >
        {/* Imagen después (capa inferior) */}
        <div style={{ position: 'absolute', inset: 0, background: '#255361' }}>
          <img src={cur.afterSrc} alt={cur.afterAlt} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 35%', display: 'block' }} />
        </div>

        {/* Imagen antes (recortada) */}
        <div style={{ position: 'absolute', inset: 0, clipPath: `inset(0 ${baRight}% 0 0)`, background: '#17353E' }}>
          <img src={cur.beforeSrc} alt={cur.beforeAlt} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 35%', display: 'block' }} />
        </div>

        {/* Etiquetas */}
        <span style={{ position: 'absolute', left: '22px', top: '22px', fontSize: '12px', fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', background: 'rgba(10,39,48,0.78)', color: '#FFFFFF', padding: '6px 12px', borderRadius: '999px', pointerEvents: 'none' }}>Antes</span>
        <span style={{ position: 'absolute', right: '22px', top: '22px', fontSize: '12px', fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', background: '#FFFFFF', color: '#0A2730', padding: '6px 12px', borderRadius: '999px', pointerEvents: 'none' }}>Después · {cur.months}</span>

        {/* Línea divisora */}
        <div aria-hidden="true" style={{ position: 'absolute', top: 0, bottom: 0, left: `${sliderPos}%`, width: '2px', background: '#C5D300', transform: 'translateX(-1px)', pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', width: '52px', height: '52px', margin: '-26px 0 0 -26px', borderRadius: '50%', background: '#C5D300', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0A2730' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 7l-5 5 5 5M15 7l5 5-5 5"/>
            </svg>
          </div>
        </div>

        {/* Input range (invisible, overlay completo) */}
        <label htmlFor={inputId} className="sr-only">Comparar antes y después</label>
        <input
          id={inputId}
          type="range"
          min={0}
          max={100}
          step={5}
          value={sliderPos}
          onChange={(e) => setSliderPos(Number(e.target.value))}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0, cursor: 'ew-resize', margin: 0 }}
          aria-label="Comparar antes y después"
        />
      </div>

      {/* ── Panel derecho ── */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '28px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <span style={{ fontSize: '12px', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700, color: '#C5D300' }}>{curNum}</span>
          <strong style={{ fontSize: 'clamp(26px,2.4vw,34px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>{cur.title}</strong>

          {/* Tabla de datos */}
          <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid rgba(255,255,255,0.18)' }}>
            {[
              { label: 'Tratamiento', value: cur.tech },
              { label: 'Detalle', value: cur.units },
              { label: 'Tiempo transcurrido', value: cur.months },
              { label: 'Nos visita desde', value: cur.origin },
            ].map((row) => (
              <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.18)', fontSize: '15px' }}>
                <span style={{ color: '#BFD6DB' }}>{row.label}</span>
                <span style={{ fontWeight: 600, textAlign: 'right' }}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Miniaturas */}
          <div style={{ display: 'flex', gap: '10px' }}>
            {cases.slice(0, 4).map((c, i) => (
              <button
                key={c.id}
                type="button"
                className="chip"
                onClick={() => { setCurrentIdx(i); setSliderPos(50); }}
                aria-pressed={i === currentIdx}
                aria-label={`Ver caso: ${c.title}`}
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '16px',
                  border: `2px solid ${i === currentIdx ? '#C5D300' : 'rgba(255,255,255,0.2)'}`,
                  cursor: 'pointer',
                  padding: 0,
                  overflow: 'hidden',
                  background: '#1B3B45',
                  color: '#FFFFFF',
                  font: '700 13px Manrope, sans-serif',
                }}
              >
                {c.afterSrc
                  ? <img src={c.afterSrc} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  : <span>{i + 1}</span>}
              </button>
            ))}
          </div>

          <Link
            href={ctaHref}
            className="btn"
            style={{ alignSelf: 'flex-start', height: '56px', padding: '0 26px', borderRadius: '14px', background: '#C5D300', color: '#0A2730', fontWeight: 700, fontSize: '16px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
          >
            {ctaLabel}
          </Link>
          <span style={{ fontSize: '13px', lineHeight: 1.5, color: '#BFD6DB' }}>Los resultados varían según cada paciente. Solo publicamos fotografías reales con autorización expresa.</span>
        </div>
      </div>
    </div>
  );
}
