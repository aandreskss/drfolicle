import { Link } from '@/i18n/navigation';
import { slotUrl } from '@/lib/content/collections';
import type { PageSection, Lang } from '@/lib/content/types';
import { pickText, pickItem } from '@/lib/content/types';

interface Props {
  section: PageSection;
  lang: Lang;
}

const TURISMO_ICONS = [
  <svg key="0" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C5D300" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/></svg>,
  <svg key="1" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C5D300" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M10.5 13.5L3 10l18-7-7 18-3.5-7.5z"/><path d="M10.5 13.5L21 3"/></svg>,
  <svg key="2" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C5D300" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3l7 3v5c0 4.6-3 8.1-7 10-4-1.9-7-5.4-7-10V6z"/><path d="M12 9v6M9 12h6"/></svg>,
  <svg key="3" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C5D300" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 20V9l8-5 8 5v11"/><path d="M9.5 20v-5h5v5"/></svg>,
  <svg key="4" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C5D300" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.4"/></svg>,
  <svg key="5" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C5D300" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="5" y="4" width="14" height="17" rx="2.5"/><path d="M9 4.5h6M9 13l2 2 4-4"/></svg>,
  <svg key="6" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C5D300" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 19.5l1.2-3.7A8 8 0 1 1 8.4 19z"/><path d="M9 11h6M9 14h3.5"/></svg>,
];

export function TurismoSection({ section, lang }: Props) {
  const text = pickText(section.data.content, lang);
  const items = (section.data.lists?.lista?.items ?? []).filter((it) => it.visible);
  const slots = section.data.slots ?? [];
  const photos = slots.map((s) => ({ src: slotUrl(s.src), alt: s.alt?.[lang] || s.alt?.es || '' })).filter((p) => p.src);
  const clinicPhoto = slotUrl(slots[slots.length - 1]?.src);

  return (
    <section id="turismo" className="dark" aria-labelledby="tur-t" style={{ background: '#00566E', color: '#FFFFFF', padding: 'clamp(72px,9vw,128px) 0', overflow: 'hidden' }}>
      <div className="wrap g-tour" style={{ display: 'grid', gap: 'clamp(40px,5vw,80px)', alignItems: 'start' }}>

        {/* ── Columna izquierda: imágenes ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {text.eyebrow && (
            <span style={{ fontSize: '12px', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700, color: '#C5D300' }}>
              {text.eyebrow}
            </span>
          )}
          <h2 id="tur-t" style={{ margin: 0, fontSize: 'clamp(34px,4vw,56px)', lineHeight: 1.02, letterSpacing: '-0.035em', fontWeight: 800, textWrap: 'balance' as never }}>
            {text.t1}
            {text.t2 && <> <em className="accent">{text.t2}</em></>}
          </h2>

          {/* Fotos de Medellín */}
          <div style={{ position: 'relative', height: 'clamp(320px,36vw,500px)', marginTop: '16px' }}>
            {/* Foto principal (carousel animado) */}
            <div style={{ position: 'absolute', left: 0, top: 0, width: '78%', height: '88%', borderRadius: '28px 28px 999px 999px / 28px 28px 300px 300px', overflow: 'hidden', background: '#0C4A5E' }}>
              {photos.length > 0 ? photos.map((p, i) => (
                <div key={i} className="tour-s" role="img" aria-label={p.alt}>
                  <img src={p.src!} alt={p.alt} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '55% 50%', display: 'block' }} />
                </div>
              )) : (
                <div className="ph-d" style={{ position: 'absolute', inset: 0 }} />
              )}
            </div>

            {/* Foto clínica (esquina inferior derecha) */}
            {clinicPhoto && (
              <div style={{ position: 'absolute', right: 0, bottom: 0, width: '44%', height: '58%', borderRadius: '24px', overflow: 'hidden', border: '6px solid #00566E' }}>
                <img src={clinicPhoto} alt="Paciente durante el diseño de su línea frontal en la clínica" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 40%', display: 'block' }} />
              </div>
            )}
          </div>
        </div>

        {/* ── Columna derecha: texto + lista ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', paddingTop: '8px' }}>
          {text.text && (
            <p style={{ margin: 0, fontSize: '18px', color: '#DCEBEE' }}>{text.text}</p>
          )}

          {items.length > 0 && (
            <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column' }}>
              {items.map((item, i) => {
                const d = pickItem(item, lang);
                return (
                  <li key={i} style={{ display: 'grid', gridTemplateColumns: '44px 1fr', gap: '18px', padding: '18px 0', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
                    {TURISMO_ICONS[i] ?? TURISMO_ICONS[0]}
                    <div>
                      <strong style={{ fontSize: '17px' }}>{d.t}</strong>
                      {d.d && <><br /><span style={{ fontSize: '15px', color: '#BFD6DB' }}>{d.d}</span></>}
                    </div>
                  </li>
                );
              })}
            </ol>
          )}

          {text.cta && (
            <Link
              href={text.ctaLink ?? '/turismo-medico'}
              className="btn"
              style={{ alignSelf: 'flex-start', minHeight: '56px', padding: '14px 26px', borderRadius: '14px', background: '#C5D300', color: '#0A2730', fontWeight: 700, fontSize: '16px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px', lineHeight: 1.3 }}
            >
              {text.cta}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
                <path d="M5 12h14M13 6l6 6-6 6"/>
              </svg>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
