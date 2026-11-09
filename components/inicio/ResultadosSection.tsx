import { Link } from '@/i18n/navigation';
import { BeforeAfter } from '@/components/ui/BeforeAfter';
import { SectionHeading } from '@/components/ui/SectionHeading';
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
  const visible = cases.filter((c) => c.before_media_id && c.after_media_id);
  if (visible.length === 0) return null;

  return (
    <section className="bg-dark py-[clamp(72px,9vw,128px)]">
      <div className="wrap">
        <div className="mb-10">
          <SectionHeading t1={text.t1 ?? ''} t2={text.t2} text={text.text} dark />
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {visible.slice(0, 6).map((c) => {
            const beforeSrc = c.before_media_id ? mediaMap[c.before_media_id] : null;
            const afterSrc = c.after_media_id ? mediaMap[c.after_media_id] : null;
            if (!beforeSrc || !afterSrc) return null;

            return (
              <BeforeAfter
                key={c.id}
                before={{ src: beforeSrc, alt: pick(c.title, lang) }}
                after={{ src: afterSrc, alt: pick(c.title, lang) }}
                labelBefore={lang === 'en' ? 'Before' : 'Antes'}
                labelAfter={lang === 'en' ? 'After' : 'Después'}
                caseLabel={lang === 'en' ? 'Real case' : 'Caso real'}
              />
            );
          })}
        </div>

        {text.cta && (
          <div className="mt-10 text-center">
            <Link
              href={text.ctaLink ?? '/contacto'}
              className="btn inline-flex h-14 items-center rounded-[14px] bg-lime px-7 text-base font-bold text-dark hover:bg-lime-hover transition-colors duration-[180ms] focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_#0A2730,0_0_0_6px_#C5D300]"
            >
              {text.cta}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
