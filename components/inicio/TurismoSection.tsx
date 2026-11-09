import { Link } from '@/i18n/navigation';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { slotUrl } from '@/lib/content/collections';
import type { PageSection, Lang } from '@/lib/content/types';
import { pickText, pickItem } from '@/lib/content/types';

interface Props {
  section: PageSection;
  lang: Lang;
}

export function TurismoSection({ section, lang }: Props) {
  const text = pickText(section.data.content, lang);
  const items = (section.data.lists?.lista?.items ?? []).filter((it) => it.visible);
  const slots = section.data.slots ?? [];
  const photos = slots.map((s) => ({ src: slotUrl(s.src), alt: s.alt?.[lang] || s.alt?.es || '' })).filter((p) => p.src);

  return (
    <section className="py-[clamp(72px,9vw,128px)]" style={{ background: '#00566E' }}>
      <div className="wrap grid gap-12 items-center lg:grid-cols-2">
        {/* Left — photos slideshow */}
        <div className="relative overflow-hidden rounded-[var(--radius-card)] aspect-[4/5]">
          {photos.length > 0 ? (
            photos.map((p, i) => (
              <div
                key={i}
                className="tour-s"
                style={{ backgroundImage: `url(${p.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                role="img"
                aria-label={p.alt}
              />
            ))
          ) : (
            <div className="h-full bg-teal-petroleo" />
          )}
        </div>

        {/* Right — text + list */}
        <div className="flex flex-col gap-7">
          <SectionHeading t1={text.t1 ?? ''} t2={text.t2} text={text.text} dark />

          {items.length > 0 && (
            <ul className="flex flex-col gap-3">
              {items.map((item, i) => {
                const d = pickItem(item, lang);
                return (
                  <li key={i} className="flex gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-lime text-dark" aria-hidden="true">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </span>
                    <div>
                      <p className="font-semibold text-white">{d.t}</p>
                      {d.d && <p className="mt-0.5 text-sm text-[#BFD6DB]">{d.d}</p>}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}

          {text.cta && (
            <Link
              href={text.ctaLink ?? '/turismo-medico'}
              className="btn self-start inline-flex h-12 items-center rounded-[14px] bg-lime px-6 text-[15px] font-bold text-dark hover:bg-lime-hover transition-colors duration-[180ms] focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_#00566E,0_0_0_6px_#C5D300]"
            >
              {text.cta}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
