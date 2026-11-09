'use client';

import { useState, useRef, KeyboardEvent } from 'react';

export interface ProcesoStep {
  t: string;
  d: string;
  m?: string;
  imgSrc?: string | null;
  imgAlt?: string;
}

interface Props {
  steps: ProcesoStep[];
  stepLabel: string;
}

export function ProcesoStepper({ steps, stepLabel }: Props) {
  const [active, setActive] = useState(0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  function handleKeyDown(e: KeyboardEvent, index: number) {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const next = (index + 1) % steps.length;
      setActive(next);
      tabsRef.current[next]?.focus();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prev = (index - 1 + steps.length) % steps.length;
      setActive(prev);
      tabsRef.current[prev]?.focus();
    }
  }

  const step = steps[active];
  const tags = step?.m ? step.m.split(',').map((s) => s.trim()).filter(Boolean) : [];
  const progress = active / (steps.length - 1);

  function goNext() {
    const next = (active + 1) % steps.length;
    setActive(next);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>

      {/* ── Tabs con progress bar ── */}
      <div
        role="tablist"
        aria-label={stepLabel}
        style={{ position: 'relative', display: 'grid', gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}
      >
        {/* Línea de fondo */}
        <div aria-hidden="true" style={{ position: 'absolute', left: '22px', right: '22px', top: '21px', height: '2px', background: '#D5E3E6' }} />
        {/* Línea de progreso */}
        <div aria-hidden="true" style={{ position: 'absolute', left: '22px', top: '21px', height: '2px', width: `calc((100% - 44px) * ${progress})`, background: '#0196AD', transition: 'width .32s cubic-bezier(.2,.7,.2,1)' }} />

        {steps.map((s, i) => {
          const isActive = i === active;
          const isDone = i < active;
          return (
            <button
              key={i}
              ref={(el) => { tabsRef.current[i] = el; }}
              role="tab"
              type="button"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              onKeyDown={(e) => handleKeyDown(e, i)}
              onClick={() => setActive(i)}
              className="chip"
              style={{
                position: 'relative',
                background: 'none',
                border: 0,
                padding: '0 8px 0 0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '14px',
                cursor: 'pointer',
                textAlign: 'left',
                fontFamily: 'Manrope, sans-serif',
                borderRadius: '12px',
              }}
            >
              <span style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '15px',
                background: isActive ? '#0196AD' : isDone ? '#0196AD' : '#FFFFFF',
                color: isActive || isDone ? '#FFFFFF' : '#0A2730',
                border: `2px solid ${isActive ? '#0196AD' : isDone ? '#0196AD' : '#D5E3E6'}`,
              }}>
                {isDone
                  ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg>
                  : i + 1}
              </span>
              <span className="steplabel" style={{ fontSize: '15px', fontWeight: 700, color: isActive ? '#0A2730' : '#4B5F66', lineHeight: 1.3 }}>
                {s.t}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Panel con imagen + texto ── */}
      <div
        role="tabpanel"
        className="g-step"
        style={{
          display: 'grid',
          gap: 'clamp(28px,4vw,64px)',
          alignItems: 'center',
          background: '#F7F8F5',
          borderRadius: '32px',
          padding: 'clamp(16px,2vw,24px)',
        }}
      >
        {/* Imagen */}
        <div style={{ height: 'clamp(280px,30vw,420px)', borderRadius: '24px', overflow: 'hidden', position: 'relative', background: '#E3F2F4' }}>
          {step?.imgSrc
            ? <img src={step.imgSrc} alt={step.imgAlt ?? step.t} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 35%', display: 'block' }} />
            : <div className="ph" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', padding: '24px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#00566E', maxWidth: '280px', lineHeight: 1.5 }}>{step?.t}</span>
              </div>}
        </div>

        {/* Contenido */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '8px clamp(8px,2vw,32px) 8px 0' }}>
          <span style={{ fontSize: '12px', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700, color: '#007A8C' }}>
            {stepLabel} {active + 1} de {steps.length}
          </span>
          <strong style={{ fontSize: 'clamp(26px,2.6vw,36px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>{step?.t}</strong>
          <p style={{ margin: 0, fontSize: '17px', color: '#24414A' }}>{step?.d}</p>
          {tags.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {tags.map((tag, i) => (
                <span key={i} style={{ height: '34px', padding: '0 14px', borderRadius: '999px', background: '#E3F2F4', color: '#00566E', fontSize: '13px', fontWeight: 700, display: 'inline-flex', alignItems: 'center' }}>
                  {tag}
                </span>
              ))}
            </div>
          )}
          <button
            type="button"
            className="btn"
            onClick={goNext}
            style={{ alignSelf: 'flex-start', marginTop: '8px', height: '52px', padding: '0 22px', border: 0, borderRadius: '14px', background: '#007A8C', color: '#FFFFFF', font: '700 15px Manrope, sans-serif', display: 'inline-flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
          >
            {active < steps.length - 1 ? 'Siguiente etapa' : 'Solicitar valoración'}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
