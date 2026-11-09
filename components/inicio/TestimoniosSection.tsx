import { SectionHeading } from '@/components/ui/SectionHeading';
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
  if (visible.length === 0) return null;

  return (
    <section className="py-[clamp(72px,9vw,128px)] overflow-hidden">
      <div className="wrap">
        <div className="mb-10 max-w-[520px]">
          <SectionHeading t1={text.t1 ?? ''} t2={text.t2} />
        </div>

        <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none -mx-[var(--wrap-pad)] px-[var(--wrap-pad)]">
          {visible.map((t) => {
            const quote = pick(t.quote, lang);
            return (
              <blockquote
                key={t.id}
                className="shrink-0 w-[min(360px,85vw)] snap-start rounded-[var(--radius-card)] bg-white border border-line p-7 flex flex-col gap-4"
              >
                <div className="flex gap-1" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#C5D300" aria-hidden="true">
                      <polygon points="12,2 15.1,8.3 22,9.3 17,14.1 18.2,21 12,17.8 5.8,21 7,14.1 2,9.3 8.9,8.3" />
                    </svg>
                  ))}
                </div>
                <p className="text-ink leading-relaxed flex-1">
                  &ldquo;{quote}&rdquo;
                </p>
                <footer>
                  <p className="font-bold text-ink">{t.author}</p>
                  <p className="text-sm text-slate">
                    {[t.country, t.treatment].filter(Boolean).join(' · ')}
                  </p>
                </footer>
              </blockquote>
            );
          })}
        </div>
      </div>
    </section>
  );
}
