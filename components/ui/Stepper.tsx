'use client';

import { useState, useRef, KeyboardEvent } from 'react';

export interface StepperStep {
  t: string;
  d: string;
}

interface StepperProps {
  steps: StepperStep[];
  stepLabel?: string;
}

export function Stepper({ steps, stepLabel = 'Etapa' }: StepperProps) {
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

  return (
    <div>
      <div role="tablist" aria-label={stepLabel} className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {steps.map((step, i) => {
          const isActive = i === active;
          return (
            <button
              key={i}
              ref={(el) => { tabsRef.current[i] = el; }}
              role="tab"
              type="button"
              id={`step-tab-${i}`}
              aria-selected={isActive}
              aria-controls={`step-panel-${i}`}
              tabIndex={isActive ? 0 : -1}
              onKeyDown={(e) => handleKeyDown(e, i)}
              onClick={() => setActive(i)}
              className={`flex shrink-0 items-center gap-2.5 rounded-[14px] border px-4 py-3 text-sm font-bold transition-all duration-[180ms] cursor-pointer focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_#F7F8F5,0_0_0_6px_#0196AD] ${
                isActive
                  ? 'border-teal bg-teal text-white'
                  : 'border-line bg-white text-ink hover:border-teal-deep hover:text-teal-deep'
              }`}
            >
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs ${
                  isActive ? 'bg-white/20 text-white' : 'bg-mist text-teal-deep'
                }`}
              >
                {i + 1}
              </span>
              {step.t}
            </button>
          );
        })}
      </div>

      <div className="mt-6">
        {steps.map((step, i) => (
          <div
            key={i}
            role="tabpanel"
            id={`step-panel-${i}`}
            aria-labelledby={`step-tab-${i}`}
            hidden={i !== active}
            className="rounded-[20px] border border-line bg-white p-6 md:p-8"
          >
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal mb-2">
              {stepLabel} {i + 1}
            </p>
            <h3 className="text-xl font-extrabold text-ink tracking-tight mb-3">{step.t}</h3>
            <p className="text-slate leading-relaxed">{step.d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
