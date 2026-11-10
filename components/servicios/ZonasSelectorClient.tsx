'use client';

import { useState } from 'react';
import type { Lang } from '@/lib/content/types';

export interface ZonaItem {
  name: string;
  text: string;
}

interface Props {
  zones: ZonaItem[];
  slug: string;
  lang: Lang;
  sectionTitle: string;
  sectionAccent: string;
}

type DiagramType = 'scalp' | 'face';

const DIAGRAM: Record<string, DiagramType> = {
  'trasplante-capilar': 'scalp',
  'trasplante-de-barba': 'face',
  'trasplante-de-cejas': 'face',
  'terapias-capilares': 'scalp',
};

const ZONE_HLS: Record<string, string[][]> = {
  'trasplante-capilar': [['front'], ['temp'], ['crown'], ['all']],
  'trasplante-de-barba': [['beard', 'must'], ['must'], ['cheek'], ['scar']],
  'trasplante-de-cejas': [['brow'], ['browLine'], ['brow', 'browLine']],
  'terapias-capilares': [['all'], ['all'], ['front', 'crown']],
};

function computeHl(slug: string, idx: number) {
  const hl = { all: '#FFFFFF', front: 'transparent', temp: 'transparent', crown: 'transparent', beard: 'transparent', must: 'transparent', cheek: 'transparent', scar: 'transparent', brow: '#E3F2F4', browLine: '0' };
  const on = 'rgba(1,150,173,0.55)';
  const keys = (ZONE_HLS[slug] ?? [])[idx] ?? [];
  keys.forEach((k) => {
    if (k === 'all') hl.all = 'rgba(1,150,173,0.28)';
    else if (k === 'scar') hl.scar = '#0196AD';
    else if (k === 'brow') hl.brow = '#0196AD';
    else if (k === 'browLine') hl.browLine = '4 4';
    else (hl as Record<string, string>)[k] = on;
  });
  return hl;
}

function ScalpSvg({ hl, zoneName, lang }: { hl: ReturnType<typeof computeHl>; zoneName: string; lang: Lang }) {
  const label = lang === 'en' ? `Top view of the head with the ${zoneName} zone highlighted` : `Vista superior de la cabeza con la zona ${zoneName} resaltada`;
  return (
    <svg viewBox="0 0 300 340" width="100%" style={{ maxWidth: '420px', display: 'block' }} role="img" aria-label={label}>
      <ellipse cx="26" cy="190" rx="14" ry="30" fill="#FFFFFF" stroke="#0A2730" strokeWidth="1.5"/>
      <ellipse cx="274" cy="190" rx="14" ry="30" fill="#FFFFFF" stroke="#0A2730" strokeWidth="1.5"/>
      <ellipse cx="150" cy="182" rx="122" ry="150" fill={hl.all} stroke="#0A2730" strokeWidth="1.5"/>
      <path d="M58 112 Q150 10 242 112 L226 138 Q150 54 74 138 Z" fill={hl.front}/>
      <ellipse cx="72" cy="128" rx="26" ry="34" fill={hl.temp}/>
      <ellipse cx="228" cy="128" rx="26" ry="34" fill={hl.temp}/>
      <circle cx="150" cy="248" r="48" fill={hl.crown}/>
      <path d="M150 232 q14 6 10 18 q-6 12 -18 6" fill="none" stroke="#0A2730" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
      <path d="M150 60 Q150 182 150 322" stroke="#0A2730" strokeWidth="1" strokeDasharray="3 6" opacity="0.35"/>
      <text x="150" y="22" textAnchor="middle" fontFamily="Manrope, sans-serif" fontSize="11" fontWeight="700" fill="#4B5F66" letterSpacing="1.5">FRENTE</text>
      <text x="150" y="338" textAnchor="middle" fontFamily="Manrope, sans-serif" fontSize="11" fontWeight="700" fill="#4B5F66" letterSpacing="1.5">NUCA · ZONA DONANTE</text>
    </svg>
  );
}

function FaceSvg({ hl, zoneName, lang }: { hl: ReturnType<typeof computeHl>; zoneName: string; lang: Lang }) {
  const label = lang === 'en' ? `Front face view with the ${zoneName} zone highlighted` : `Rostro de frente con la zona ${zoneName} resaltada`;
  return (
    <svg viewBox="0 0 300 340" width="100%" style={{ maxWidth: '420px', display: 'block' }} role="img" aria-label={label}>
      <ellipse cx="44" cy="176" rx="13" ry="28" fill="#FFFFFF" stroke="#0A2730" strokeWidth="1.5"/>
      <ellipse cx="256" cy="176" rx="13" ry="28" fill="#FFFFFF" stroke="#0A2730" strokeWidth="1.5"/>
      <path d="M150 28 C 222 28 252 84 252 160 C 252 250 210 312 150 316 C 90 312 48 250 48 160 C 48 84 78 28 150 28 Z" fill="#FFFFFF" stroke="#0A2730" strokeWidth="1.5"/>
      <path d="M52 196 C 58 270 96 308 150 314 C 204 308 242 270 248 196 C 236 236 214 258 190 266 C 172 276 128 276 110 266 C 86 258 64 236 52 196 Z" fill={hl.beard}/>
      <ellipse cx="88" cy="214" rx="20" ry="26" fill={hl.cheek}/>
      <ellipse cx="212" cy="214" rx="20" ry="26" fill={hl.cheek}/>
      <path d="M116 238 Q150 222 184 238 Q150 252 116 238 Z" fill={hl.must}/>
      <path d="M84 124 Q106 108 134 118" fill="none" stroke={hl.brow} strokeWidth="11" strokeLinecap="round"/>
      <path d="M216 124 Q194 108 166 118" fill="none" stroke={hl.brow} strokeWidth="11" strokeLinecap="round"/>
      <path d="M84 124 Q106 108 134 118" fill="none" stroke="#0A2730" strokeWidth="1.2" strokeDasharray={hl.browLine} strokeLinecap="round"/>
      <path d="M216 124 Q194 108 166 118" fill="none" stroke="#0A2730" strokeWidth="1.2" strokeDasharray={hl.browLine} strokeLinecap="round"/>
      <path d="M98 148 q14 -8 28 0 M174 148 q14 -8 28 0" fill="none" stroke="#0A2730" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M150 150 L 142 196 Q 150 202 158 196" fill="none" stroke="#0A2730" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M128 254 Q150 262 172 254" fill="none" stroke="#0A2730" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M214 272 l 16 -12" stroke={hl.scar} strokeWidth="4" strokeLinecap="round"/>
      <text x="150" y="16" textAnchor="middle" fontFamily="Manrope, sans-serif" fontSize="11" fontWeight="700" fill="#4B5F66" letterSpacing="1.5">ZONA RECEPTORA</text>
    </svg>
  );
}

export function ZonasSelectorClient({ zones, slug, lang, sectionTitle, sectionAccent }: Props) {
  const [idx, setIdx] = useState(0);
  if (!zones.length) return null;

  const activeIdx = Math.min(idx, zones.length - 1);
  const hl = computeHl(slug, activeIdx);
  const diagramType = DIAGRAM[slug] ?? 'scalp';
  const zoneName = zones[activeIdx]?.name ?? '';
  const caption = lang === 'en' ? 'Illustrative diagram. Your case design is defined in the consultation.' : 'Ilustración orientativa. El diseño de tu caso se define en la valoración.';

  return (
    <section aria-labelledby="z-t" style={{ background: '#FFFFFF', padding: 'clamp(72px,9vw,128px) 0' }}>
      <div className="wrap g-two" style={{ display: 'grid', gap: 'clamp(40px,5vw,80px)', alignItems: 'center' }}>

        {/* Left: title + tablist */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <h2 id="z-t" style={{ margin: 0, fontSize: 'clamp(34px,4.4vw,60px)', lineHeight: 1, letterSpacing: '-0.035em', fontWeight: 800, textWrap: 'balance' as never }}>
            {sectionTitle}{' '}
            <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: 'italic', fontWeight: 400, color: '#0196AD' }}>{sectionAccent}</span>
          </h2>

          <div role="tablist" aria-label={lang === 'en' ? 'Options' : 'Opciones'} style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid #0A2730' }}>
            {zones.map((z, i) => {
              const on = i === activeIdx;
              return (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  className="chip"
                  onClick={() => setIdx(i)}
                  aria-selected={on}
                  style={{ background: 'none', border: 0, borderBottom: '1px solid #D5E3E6', padding: '20px 0', display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left', fontFamily: 'Manrope, sans-serif', color: '#0A2730', cursor: 'pointer', borderRadius: 0 }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '14px', width: '100%' }}>
                    <span style={{ width: '14px', height: '14px', borderRadius: '50%', border: '2px solid #0196AD', background: on ? '#0196AD' : 'transparent', flexShrink: 0 }} />
                    <strong style={{ fontSize: '22px', letterSpacing: '-0.015em', flex: 1 }}>{z.name}</strong>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={on ? '#007A8C' : '#B9CDD2'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6"/>
                    </svg>
                  </span>
                  {on && z.text && (
                    <span style={{ paddingLeft: '28px', fontSize: '16px', lineHeight: 1.55, color: '#24414A' }}>{z.text}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: SVG diagram */}
        <div style={{ background: '#F7F8F5', borderRadius: '32px', padding: 'clamp(24px,4vw,56px)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          {diagramType === 'scalp'
            ? <ScalpSvg hl={hl} zoneName={zoneName} lang={lang} />
            : <FaceSvg hl={hl} zoneName={zoneName} lang={lang} />
          }
          <span style={{ fontSize: '13px', color: '#4B5F66', textAlign: 'center' }}>{caption}</span>
        </div>

      </div>
    </section>
  );
}
