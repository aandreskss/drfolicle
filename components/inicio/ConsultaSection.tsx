import { Link } from '@/i18n/navigation';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { PageSection, Lang } from '@/lib/content/types';
import { pickText, pickItem } from '@/lib/content/types';

interface Props {
  section: PageSection;
  lang: Lang;
}

export function ConsultaSection({ section, lang }: Props) {
  const text = pickText(section.data.content, lang);
  const garantias = (section.data.lists?.garantias?.items ?? []).filter((it) => it.visible);

  return (
    <section id="contacto" className="py-[clamp(72px,9vw,128px)] bg-dark">
      <div className="wrap">
        <div className="mx-auto max-w-[640px] text-center">
          <SectionHeading t1={text.t1 ?? ''} t2={text.t2} text={text.text} dark center />

          <div className="mt-10 flex flex-col items-center gap-5">
            <Link
              href="/contacto"
              className="btn inline-flex h-14 items-center rounded-[14px] bg-lime px-8 text-base font-bold text-dark hover:bg-lime-hover transition-colors duration-[180ms] focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_#0A2730,0_0_0_6px_#C5D300]"
            >
              {text.cta ?? (lang === 'en' ? 'Request free assessment' : 'Solicitar valoración gratis')}
            </Link>

            {garantias.length > 0 && (
              <ul className="flex flex-col gap-2 text-sm text-[#BFD6DB]">
                {garantias.map((g, i) => {
                  const d = pickItem(g, lang);
                  return (
                    <li key={i} className="flex items-center gap-2 justify-center">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9BD3DC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      {d.t}
                    </li>
                  );
                })}
              </ul>
            )}

            <div className="mt-2 flex items-center gap-4">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xs font-semibold uppercase tracking-widest text-white/30">
                {lang === 'en' ? 'or' : 'o'}
              </span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <a
              href="https://wa.me/19548535335?text=Hola%2C%20quiero%20agendar%20una%20valoraci%C3%B3n."
              target="_blank"
              rel="noopener noreferrer"
              className="btn inline-flex h-12 items-center gap-2.5 rounded-[14px] border border-white/20 px-6 text-sm font-bold text-white hover:border-white/40 hover:bg-white/10 transition-all duration-[180ms] focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_#0A2730,0_0_0_6px_#C5D300]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 19.5l1.2-3.7A8 8 0 1 1 8.4 19z" />
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
