'use client';

import { useState, useRef, KeyboardEvent } from 'react';
import Image from 'next/image';

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

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_420px] items-start">
      {/* Panel */}
      <div>
        <div className="rounded-[var(--radius-card)] bg-white border border-line p-7 md:p-9 min-h-[260px]">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-teal mb-3">
            {stepLabel} {active + 1} / {steps.length}
          </p>
          <h3 className="text-2xl font-extrabold text-ink tracking-tight mb-3">{step?.t}</h3>
          <p className="text-slate leading-relaxed">{step?.d}</p>
          {tags.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {tags.map((tag, i) => (
                <span key={i} className="inline-flex items-center rounded-pill bg-mist px-3 py-1 text-xs font-semibold text-teal-deep">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Tabs below on mobile */}
        <div role="tablist" aria-label={stepLabel} className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {steps.map((s, i) => {
            const isActive = i === active;
            return (
              <button
                key={i}
                ref={(el) => { tabsRef.current[i] = el; }}
                role="tab"
                type="button"
                id={`proc-tab-${i}`}
                aria-selected={isActive}
                aria-controls={`proc-panel-${i}`}
                tabIndex={isActive ? 0 : -1}
                onKeyDown={(e) => handleKeyDown(e, i)}
                onClick={() => setActive(i)}
                className={`flex shrink-0 h-11 items-center gap-2 rounded-[12px] border px-4 text-sm font-bold transition-all duration-[180ms] cursor-pointer focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_#F7F8F5,0_0_0_6px_#0196AD] ${
                  isActive
                    ? 'border-teal bg-teal text-white'
                    : 'border-line bg-white text-ink hover:border-teal-deep'
                }`}
              >
                <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                  isActive ? 'bg-white/20' : 'bg-mist text-teal-deep'
                }`}>
                  {i + 1}
                </span>
                <span className="hidden sm:inline">{s.t}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Image */}
      <div className="relative hidden lg:block aspect-[4/5] overflow-hidden rounded-[var(--radius-card)]">
        {step?.imgSrc ? (
          <Image
            src={step.imgSrc}
            alt={step.imgAlt ?? step.t}
            fill
            className="object-cover transition-opacity duration-300"
            sizes="420px"
          />
        ) : (
          <div className="h-full w-full bg-mist" />
        )}
      </div>
    </div>
  );
}
