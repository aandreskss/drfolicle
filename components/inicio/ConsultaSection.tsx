import type { PageSection, Lang } from '@/lib/content/types';
import { pickText, pickItem } from '@/lib/content/types';
import { ConsultaForm } from './ConsultaForm';

interface Props {
  section: PageSection;
  lang: Lang;
}

export function ConsultaSection({ section, lang }: Props) {
  const text = pickText(section.data.content, lang);
  const garantias = (section.data.lists?.garantias?.items ?? []).filter((it) => it.visible);

  return (
    <section id="contacto" aria-labelledby="con-t" style={{ background: '#E3F2F4', padding: 'clamp(72px,9vw,128px) 0' }}>
      <div className="wrap g-form" style={{ display: 'grid', gap: 'clamp(32px,5vw,80px)', alignItems: 'start' }}>

        {/* ── Columna izquierda: info ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <h2 id="con-t" style={{ margin: 0, fontSize: 'clamp(34px,4.4vw,60px)', lineHeight: 1, letterSpacing: '-0.035em', fontWeight: 800 }}>
            {text.t1}
            {text.t2 && <> <em className="accent" style={{ color: '#007A8C' }}>{text.t2}</em></>}
          </h2>
          {text.text && (
            <p style={{ margin: 0, fontSize: '18px', color: '#24414A' }}>{text.text}</p>
          )}

          {/* Garantías / bullets */}
          {garantias.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '15px', color: '#24414A' }}>
              {garantias.map((g, i) => {
                const d = pickItem(g, lang);
                return (
                  <span key={i} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#007A8C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l4 4 10-10"/></svg>
                    {d.t}
                  </span>
                );
              })}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '15px', color: '#24414A' }}>
              <span style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#007A8C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l4 4 10-10"/></svg>
                Respuesta en menos de 24 horas
              </span>
              <span style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#007A8C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l4 4 10-10"/></svg>
                No te pediremos fotografías en este paso
              </span>
              <span style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#007A8C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l4 4 10-10"/></svg>
                Atención en español e inglés
              </span>
            </div>
          )}

          {/* Bloque WhatsApp */}
          <div style={{ background: '#00566E', color: '#FFFFFF', borderRadius: '24px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <strong style={{ fontSize: '20px' }}>¿Prefieres escribirnos ahora?</strong>
            <span style={{ fontSize: '15px', color: '#DCEBEE' }}>Habla directamente con nuestro equipo por WhatsApp: +1 (954) 853-5335.</span>
            <a
              href="https://wa.me/19548535335"
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              style={{ alignSelf: 'flex-start', height: '52px', padding: '0 22px', borderRadius: '14px', background: '#C5D300', color: '#0A2730', fontWeight: 700, fontSize: '15px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 19.5l1.2-3.7A8 8 0 1 1 8.4 19z"/></svg>
              Escribir por WhatsApp
            </a>
          </div>
        </div>

        {/* ── Columna derecha: formulario ── */}
        <ConsultaForm lang={lang} />
      </div>
    </section>
  );
}
