import { Accordion } from '@/components/ui/Accordion';
import { slotUrl } from '@/lib/content/collections';
import type { PageSection, Lang, Faq } from '@/lib/content/types';
import { pickText, pick } from '@/lib/content/types';

interface Props {
  section: PageSection;
  lang: Lang;
  faqs: Faq[];
}

export function FaqSection({ section, lang, faqs }: Props) {
  const text = pickText(section.data.content, lang);
  const slots = section.data.slots ?? [];
  const videos = slots.filter((s) => s.kind === 'video').map((s) => ({
    src: slotUrl(s.src),
    label: s.alt?.[lang] || s.alt?.es || '',
  })).filter((v) => v.src);

  if (faqs.length === 0) return null;

  const items = faqs.map((f) => ({
    id: f.id,
    question: pick(f.question, lang),
    answer: pick(f.answer, lang),
  }));

  return (
    <section aria-labelledby="faq-t" style={{ padding: 'clamp(72px,9vw,128px) 0' }}>
      <div className="wrap g-faq" style={{ display: 'grid', gap: 'clamp(32px,5vw,80px)', alignItems: 'start' }}>

        {/* ── Columna izquierda: título + videos ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h2 id="faq-t" style={{ margin: 0, fontSize: 'clamp(34px,4vw,52px)', lineHeight: 1, letterSpacing: '-0.035em', fontWeight: 800 }}>
            {text.t1 ?? (lang === 'en' ? 'Frequently asked' : 'Preguntas')}
            {text.t2
              ? <> <em className="accent">{text.t2}</em></>
              : <> <em className="accent">{lang === 'en' ? 'questions' : 'frecuentes'}</em></>}
          </h2>
          {text.text && (
            <p style={{ margin: 0, fontSize: '16px', color: '#4B5F66' }}>{text.text}</p>
          )}

          {/* Videos — si hay slots */}
          {videos.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '8px' }}>
              {videos.slice(0, 2).map((v, i) => (
                <figure key={i} style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ aspectRatio: '9 / 16', borderRadius: '18px', overflow: 'hidden', background: '#0A2730' }}>
                    <video
                      controls
                      playsInline
                      preload="none"
                      aria-label={v.label}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    >
                      <source src={v.src!} />
                    </video>
                  </div>
                  {v.label && (
                    <figcaption style={{ fontSize: '13px', lineHeight: 1.4 }}>
                      <strong>{v.label}</strong>
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          )}
        </div>

        {/* ── Columna derecha: acordeón ── */}
        <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid #0A2730' }}>
          <Accordion
            items={items}
            labelOpen={lang === 'en' ? 'View more' : 'Ver más'}
            labelClose={lang === 'en' ? 'View less' : 'Ver menos'}
          />
        </div>
      </div>
    </section>
  );
}
