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

export function Accordion({ items }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} style={{ borderBottom: '1px solid #D5E3E6' }}>
            <h3 style={{ margin: 0 }}>
              <button
                type="button"
                className="chip"
                aria-expanded={isOpen}
                aria-controls={`acc-${item.id}`}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                style={{
                  width: '100%',
                  minHeight: '72px',
                  background: 'none',
                  border: 0,
                  padding: '18px 0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '24px',
                  textAlign: 'left',
                  font: `700 clamp(17px,1.5vw,20px) Manrope, sans-serif`,
                  color: '#0A2730',
                  cursor: 'pointer',
                  borderRadius: '8px',
                }}
              >
                <span>{item.question}</span>
                <span
                  style={{
                    flexShrink: 0,
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: isOpen ? '#0A2730' : '#F7F8F5',
                    color: isOpen ? '#FFFFFF' : '#0A2730',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background-color .18s',
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    aria-hidden="true"
                    style={{ transform: `rotate(${isOpen ? 45 : 0}deg)`, transition: 'transform .32s cubic-bezier(.2,.7,.2,1)' }}
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </button>
            </h3>
            <div
              id={`acc-${item.id}`}
              role="region"
              hidden={!isOpen}
              style={{ padding: '0 64px 24px 0', fontSize: '16px', color: '#24414A', margin: 0 }}
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </>
  );
}
