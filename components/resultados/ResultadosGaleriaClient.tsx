'use client';
import { useState } from 'react';
import type { Lang } from '@/lib/content/types';
import { Link } from '@/i18n/navigation';

export interface CaseCard {
  id: string;
  num: string;
  cat: string;
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

export function ResultadosGaleriaClient({ cases, lang, ctaHref }: { cases: CaseCard[]; lang: Lang; ctaHref: string }) {
  const [openIdx, setOpenIdx] = useState(-1);
  const [sliderPos, setSliderPos] = useState(50);

  const mc = openIdx >= 0 ? cases[openIdx] : null;
  const baRight = 100 - sliderPos;

  const goTo = (d: number) => {
    const next = (openIdx + d + cases.length) % cases.length;
    setOpenIdx(next);
    setSliderPos(50);
  };

  const labelBefore = lang === 'en' ? 'Before' : 'Antes';
  const labelAfter  = lang === 'en' ? 'After' : 'Después';

  return (
    <>
      <div className="g-cases" style={{ display: 'grid', gap: '24px' }}>
        {cases.map((c, i) => (
          <button
            key={c.id}
            type="button"
            className="case"
            onClick={() => { setOpenIdx(i); setSliderPos(50); }}
            aria-label={`${lang === 'en' ? 'View case' : 'Ver caso'}: ${c.title}`}
            style={{ border: 0, padding: 0, background: '#12343E', borderRadius: '28px', overflow: 'hidden', display: 'flex', flexDirection: 'column', textAlign: 'left', fontFamily: 'Manrope, sans-serif', color: '#FFFFFF', cursor: 'pointer' }}
          >
            <div style={{ position: 'relative', height: '280px', display: 'flex', width: '100%' }}>
              <img src={c.beforeSrc} alt="" style={{ width: '50%', height: '100%', objectFit: 'cover', objectPosition: '50% 35%', display: 'block', borderRight: '2px solid #0A2730' }} />
              <img src={c.afterSrc} alt="" style={{ width: '50%', height: '100%', objectFit: 'cover', objectPosition: '50% 35%', display: 'block' }} />
              <span style={{ position: 'absolute', left: '14px', top: '14px', fontSize: '11px', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', background: 'rgba(10,39,48,0.8)', padding: '5px 10px', borderRadius: '999px' }}>{labelBefore}</span>
              <span style={{ position: 'absolute', right: '14px', top: '14px', fontSize: '11px', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', background: '#FFFFFF', color: '#0A2730', padding: '5px 10px', borderRadius: '999px' }}>{labelAfter}</span>
            </div>
            <div style={{ padding: '20px 22px 22px', display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
              <span style={{ fontSize: '12px', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, color: '#C5D300' }}>
                {lang === 'en' ? 'Case' : 'Caso'} {c.num} · {c.cat}
              </span>
              <strong style={{ fontSize: '20px', letterSpacing: '-0.01em' }}>{c.title}</strong>
              {c.units && <span style={{ fontSize: '14px', color: '#BFD6DB' }}>{c.tech} · {c.units}</span>}
              {c.origin && <span style={{ fontSize: '13px', color: '#FFFFFF', fontWeight: 600 }}>{lang === 'en' ? 'Visits from' : 'Nos visita desde'}: {c.origin}</span>}
            </div>
          </button>
        ))}

        {/* CTA card */}
        <Link
          href={ctaHref}
          className="case"
          style={{ background: '#C5D300', color: '#0A2730', borderRadius: '28px', padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '24px', textDecoration: 'none', minHeight: '380px' }}
        >
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#0A2730" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 11h5v3a4 4 0 0 0 8 0v-3h5"/><path d="M12 17c0-5 1.5-9 5.5-13"/><circle cx="12" cy="16.6" r="1.3" fill="#0A2730"/></svg>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <strong style={{ fontSize: '26px', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              {lang === 'en' ? 'Your story could be next.' : 'Tu historia puede ser la siguiente.'}
            </strong>
            <span style={{ fontSize: '15px' }}>
              {lang === 'en' ? 'Request your free assessment and discover what\'s possible in your case.' : 'Pide tu valoración gratis y conoce qué es posible en tu caso.'}
            </span>
            <span style={{ fontWeight: 800, fontSize: '15px', display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
              {lang === 'en' ? 'Free assessment' : 'Valoración gratis'}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </span>
          </div>
        </Link>
      </div>

      {/* MODAL */}
      {mc && (
        <div className="dark" style={{ position: 'fixed', inset: 0, zIndex: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <button
            type="button"
            onClick={() => setOpenIdx(-1)}
            aria-label={lang === 'en' ? 'Close' : 'Cerrar'}
            style={{ position: 'absolute', inset: 0, border: 0, background: 'rgba(6,28,35,0.82)', cursor: 'pointer' }}
          />
          <section
            role="dialog"
            aria-modal
            aria-labelledby="m-t"
            className="g-modal"
            style={{ position: 'relative', width: 'min(1180px, 100%)', maxHeight: 'calc(100vh - 48px)', overflowY: 'auto', background: '#0A2730', color: '#FFFFFF', borderRadius: '32px', padding: 'clamp(16px,2vw,24px)', display: 'grid', gap: '28px', alignItems: 'stretch' }}
          >
            {/* Before/after slider */}
            <div className="ba" style={{ position: 'relative', minHeight: '460px', borderRadius: '24px', overflow: 'hidden', background: '#17353E' }}>
              <img src={mc.afterSrc} alt={mc.afterAlt} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 35%', display: 'block' }} />
              <div style={{ position: 'absolute', inset: 0, clipPath: `inset(0 ${baRight}% 0 0)` }}>
                <img src={mc.beforeSrc} alt={mc.beforeAlt} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 35%', display: 'block' }} />
              </div>
              <div aria-hidden style={{ position: 'absolute', top: 0, bottom: 0, left: `${sliderPos}%`, width: '2px', background: '#C5D300', transform: 'translateX(-1px)', pointerEvents: 'none' }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', width: '52px', height: '52px', margin: '-26px 0 0 -26px', borderRadius: '50%', background: '#C5D300', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0A2730' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 7l-5 5 5 5M15 7l5 5-5 5"/></svg>
                </div>
              </div>
              <label htmlFor="ba-m" style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clipPath: 'inset(50%)' }}>
                {lang === 'en' ? 'Compare before and after' : 'Comparar antes y después'}
              </label>
              <input
                id="ba-m"
                type="range"
                min="0"
                max="100"
                step="5"
                value={sliderPos}
                onChange={(e) => setSliderPos(Number(e.target.value))}
              />
            </div>

            {/* Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '12px 8px 12px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '12px', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700, color: '#C5D300' }}>
                  {lang === 'en' ? 'Case' : 'Caso'} {mc.num} · {mc.cat}
                </span>
                <button
                  type="button"
                  className="btn"
                  onClick={() => setOpenIdx(-1)}
                  aria-label={lang === 'en' ? 'Close' : 'Cerrar'}
                  style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.35)', background: 'transparent', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>
                </button>
              </div>
              <h2 id="m-t" style={{ margin: 0, fontSize: 'clamp(28px,2.6vw,38px)', lineHeight: 1.05, letterSpacing: '-0.025em', fontWeight: 800 }}>{mc.title}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid rgba(255,255,255,0.18)' }}>
                {[
                  [lang === 'en' ? 'Treatment' : 'Tratamiento', mc.tech],
                  [lang === 'en' ? 'Follicular units' : 'Unidades foliculares', mc.units],
                  [lang === 'en' ? 'Time elapsed' : 'Tiempo transcurrido', mc.months],
                  [lang === 'en' ? 'Visits from' : 'Nos visita desde', mc.origin],
                ].filter(([, v]) => v).map(([label, value]) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.18)', fontSize: '15px' }}>
                    <span style={{ color: '#BFD6DB' }}>{label}</span>
                    <span style={{ fontWeight: 600, textAlign: 'right' }}>{value}</span>
                  </div>
                ))}
              </div>
              <span style={{ fontSize: '13px', lineHeight: 1.5, color: '#BFD6DB' }}>
                {lang === 'en'
                  ? 'Real photograph published with patient consent. Results vary per case.'
                  : 'Fotografía real publicada con autorización del paciente. Los resultados varían según cada caso.'}
              </span>
              <div style={{ marginTop: 'auto', display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
                <button
                  type="button"
                  className="btn"
                  onClick={() => goTo(-1)}
                  aria-label={lang === 'en' ? 'Previous case' : 'Caso anterior'}
                  style={{ width: '52px', height: '52px', borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.35)', background: 'transparent', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => goTo(1)}
                  aria-label={lang === 'en' ? 'Next case' : 'Caso siguiente'}
                  style={{ width: '52px', height: '52px', borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.35)', background: 'transparent', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                </button>
                <Link
                  href={ctaHref}
                  className="btn"
                  style={{ marginLeft: 'auto', height: '52px', padding: '0 22px', borderRadius: '14px', background: '#C5D300', color: '#0A2730', fontWeight: 700, fontSize: '15px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
                >
                  {lang === 'en' ? 'Free assessment' : 'Valoración gratis'}
                </Link>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
