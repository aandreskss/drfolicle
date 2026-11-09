import { slotUrl } from '@/lib/content/collections';
import { TestimoniosClient } from './TestimoniosClient';
import type { PageSection, Lang, Testimonial } from '@/lib/content/types';
import { pickText, pick } from '@/lib/content/types';

interface Props {
  section: PageSection;
  lang: Lang;
  testimonials: Testimonial[];
}

export function TestimoniosSection({ section, lang, testimonials }: Props) {
  const text = pickText(section.data.content, lang);
  const visible = testimonials.filter((t) => t.authorization_confirmed);
  const slots = section.data.slots ?? [];
  const videoSrc = slotUrl(slots[0]?.src);
  const videoPoster = slotUrl(slots[1]?.src);

  const items = visible.map((t) => ({
    id: t.id,
    quote: pick(t.quote, lang),
    author: t.author,
    meta: [t.country, t.treatment].filter(Boolean).join(' · '),
  }));

  return (
    <section aria-labelledby="tes-t" aria-roledescription="carrusel" style={{ padding: 'clamp(72px,9vw,128px) 0' }}>
      <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>

        {/* Título */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '24px' }}>
          <h2 id="tes-t" style={{ margin: 0, fontSize: 'clamp(34px,4.4vw,60px)', lineHeight: 1, letterSpacing: '-0.035em', fontWeight: 800 }}>
            {text.t1}
            {text.t2 && <> <em className="accent">{text.t2}</em></>}
          </h2>
        </div>

        {items.length > 0 ? (
          <TestimoniosClient items={items} videoSrc={videoSrc} videoPoster={videoPoster} lang={lang} />
        ) : (
          <p style={{ color: '#4B5F66', fontSize: '16px' }}>Los testimonios se mostrarán aquí una vez autorizados por los pacientes.</p>
        )}
      </div>
    </section>
  );
}
