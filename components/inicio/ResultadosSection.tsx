import { ResultadosClient } from './ResultadosClient';
import type { PageSection, Lang, Case } from '@/lib/content/types';
import { pickText, pick } from '@/lib/content/types';

interface Props {
  section: PageSection;
  lang: Lang;
  cases: Case[];
  mediaMap: Record<string, string>;
}

export function ResultadosSection({ section, lang, cases, mediaMap }: Props) {
  const text = pickText(section.data.content, lang);
  const visible = cases.filter((c) => c.visible && c.before_media_id && c.after_media_id && c.consent_verified);

  const caseItems = visible.map((c) => {
    const beforeSrc = c.before_media_id ? (mediaMap[c.before_media_id] ?? '') : '';
    const afterSrc  = c.after_media_id  ? (mediaMap[c.after_media_id]  ?? '') : '';
    return {
      id: c.id,
      title: pick(c.title, lang),
      tech: 'Trasplante capilar FUE',
      units: c.units ?? '',
      months: c.months ?? '',
      origin: c.origin ?? '',
      beforeSrc,
      afterSrc,
      beforeAlt: `Antes — ${pick(c.title, lang)}`,
      afterAlt: `Después — ${pick(c.title, lang)}`,
    };
  }).filter((c) => c.beforeSrc && c.afterSrc);

  return (
    <section id="resultados" className="dark" aria-labelledby="res-t" style={{ background: '#0A2730', color: '#FFFFFF', padding: 'clamp(72px,9vw,128px) 0' }}>
      <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>

        {/* Cabecera */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '24px' }}>
          <h2 id="res-t" style={{ margin: 0, fontSize: 'clamp(34px,4.4vw,60px)', lineHeight: 1, letterSpacing: '-0.035em', fontWeight: 800, maxWidth: '760px' }}>
            {text.t1}
            {text.t2 && <> <em className="accent">{text.t2}</em></>}
          </h2>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', height: '40px', padding: '0 16px', borderRadius: '999px', border: '1.5px solid rgba(255,255,255,0.35)', fontSize: '14px', fontWeight: 700 }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#C5D300' }} />
            Trasplante capilar · casos reales
          </span>
        </div>

        {caseItems.length > 0 ? (
          <ResultadosClient
            cases={caseItems}
            ctaHref={text.ctaLink ?? '/contacto'}
            ctaLabel={text.cta ?? (lang === 'en' ? 'Free assessment' : 'Valoración gratis')}
            lang={lang}
          />
        ) : (
          <div style={{ textAlign: 'center', padding: '64px 0', color: '#BFD6DB', fontSize: '15px' }}>
            Pronto publicaremos casos reales de pacientes con autorización.
          </div>
        )}

      </div>
    </section>
  );
}
