'use client';

import { useState } from 'react';

export interface AccordionItem {
  id: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  labelOpen?: string;
  labelClose?: string;
}

export function Accordion({ items, labelOpen = 'Ver más', labelClose = 'Ver menos' }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="divide-y divide-line">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`acc-${item.id}`}
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="flex w-full items-start justify-between gap-4 py-5 text-left font-semibold text-ink hover:text-teal-deep transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:text-teal-deep min-h-[44px]"
            >
              <span>{item.question}</span>
              <span
                aria-hidden="true"
                className={`mt-0.5 shrink-0 text-teal transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </button>
            <div
              id={`acc-${item.id}`}
              role="region"
              hidden={!isOpen}
              className="pb-5 text-slate leading-relaxed"
            >
              <p>{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
