'use client';

import { useState, useId } from 'react';
import Image from 'next/image';

interface BeforeAfterProps {
  before: { src: string; alt: string };
  after: { src: string; alt: string };
  labelBefore?: string;
  labelAfter?: string;
  caseLabel?: string;
}

export function BeforeAfter({
  before,
  after,
  labelBefore = 'Antes',
  labelAfter = 'Después',
  caseLabel = 'Caso real',
}: BeforeAfterProps) {
  const [pos, setPos] = useState(50);
  const id = useId();

  return (
    <figure className="ba relative overflow-hidden rounded-[var(--radius-card)] select-none" aria-label={`${labelBefore} / ${labelAfter} — ${caseLabel}`}>
      {/* After image (full width, bottom layer) */}
      <div className="relative aspect-[4/5]">
        <Image src={after.src} alt={after.alt} fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />

        {/* Before image (clipped on top) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <Image src={before.src} alt={before.alt} fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
        </div>

        {/* Divider line */}
        <div
          className="absolute inset-y-0 w-[2px] bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.15)] pointer-events-none"
          style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white shadow-md flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0A2730" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <path d="M5 12h14M9 8l-4 4 4 4M15 8l4 4-4 4" />
            </svg>
          </div>
        </div>

        {/* Labels */}
        <span className="absolute top-3 left-3 rounded-pill bg-white/90 px-3 py-1 text-xs font-bold text-ink backdrop-blur-sm">
          {labelBefore}
        </span>
        <span className="absolute top-3 right-3 rounded-pill bg-white/90 px-3 py-1 text-xs font-bold text-ink backdrop-blur-sm">
          {labelAfter}
        </span>
        <span className="absolute bottom-3 left-3 rounded-pill bg-teal px-3 py-1 text-xs font-bold text-white">
          {caseLabel}
        </span>

        {/* Range input (invisible, full overlay) */}
        <label className="sr-only" htmlFor={id}>Comparar antes y después</label>
        <input
          id={id}
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
          aria-label="Comparar antes y después"
        />
      </div>
    </figure>
  );
}
