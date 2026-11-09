import { Link } from '@/i18n/navigation';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { PageSection, Lang } from '@/lib/content/types';
import { pickText } from '@/lib/content/types';

interface Props {
  section: PageSection;
  lang: Lang;
}

export function CtaSection({ section, lang }: Props) {
  const text = pickText(section.data.content, lang);

  return (
    <section className="bg-dark py-[clamp(64px,8vw,112px)]">
      <div className="wrap flex flex-col items-center gap-8 text-center">
        <div className="max-w-[580px]">
          <SectionHeading t1={text.t1 ?? ''} t2={text.t2} text={text.text} dark center />
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href={text.ctaLink ?? '/contacto'}
            className="btn inline-flex h-14 items-center rounded-[14px] bg-lime px-8 text-base font-bold text-dark hover:bg-lime-hover transition-colors duration-[180ms] focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_#0A2730,0_0_0_6px_#C5D300]"
          >
            {text.cta ?? 'Valoración gratis'}
          </Link>
          <a
            href="https://wa.me/19548535335?text=Hola%2C%20quiero%20agendar%20una%20valoraci%C3%B3n."
            target="_blank"
            rel="noopener noreferrer"
            className="btn inline-flex h-14 items-center gap-2.5 rounded-[14px] border border-white/20 px-7 text-base font-bold text-white hover:border-white/40 hover:bg-white/10 transition-all duration-[180ms] focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_#0A2730,0_0_0_6px_#C5D300]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 19.5l1.2-3.7A8 8 0 1 1 8.4 19z" />
            </svg>
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
