import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { slotUrl } from '@/lib/content/collections';
import type { PageSection, Lang } from '@/lib/content/types';
import { pickText } from '@/lib/content/types';

interface Props {
  section: PageSection;
  lang: Lang;
  ctaLabel?: string;
}

export function HeroSection({ section, lang, ctaLabel }: Props) {
  const text = pickText(section.data.content, lang);
  const slots = section.data.slots ?? [];

  const img1 = slotUrl(slots[0]?.src);
  const img2 = slotUrl(slots[1]?.src);
  const img3 = slotUrl(slots[2]?.src);

  return (
    <section className="relative overflow-hidden py-[clamp(64px,8vw,112px)]">
      <div className="wrap grid items-center gap-10 g-hero">
        {/* Left — copy */}
        <div className="flex flex-col gap-6 max-w-[580px]">
          {text.eyebrow && (
            <span className="inline-flex self-start items-center gap-2 rounded-pill border border-line bg-white px-4 py-1.5 text-[13px] font-semibold text-teal-deep">
              <span className="h-1.5 w-1.5 rounded-full bg-teal" aria-hidden="true" />
              {text.eyebrow}
            </span>
          )}

          <h1 className="text-[clamp(38px,5.5vw,72px)] font-extrabold leading-[1.05] tracking-[-0.04em] text-wrap-balance text-ink">
            {text.t1}
            {text.t2 && (
              <>
                {' '}
                <em className="accent">{text.t2}</em>
              </>
            )}
          </h1>

          {text.text && (
            <p className="text-[clamp(16px,1.8vw,19px)] leading-relaxed text-slate max-w-[48ch]">
              {text.text}
            </p>
          )}

          <div className="flex flex-wrap gap-3">
            {text.cta && (
              <Link
                href={text.ctaLink ?? '/contacto'}
                className="btn inline-flex h-14 items-center rounded-[14px] bg-teal-deep px-7 text-base font-bold text-white hover:bg-teal-petroleo transition-colors duration-[180ms] focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_#F7F8F5,0_0_0_6px_#0196AD]"
              >
                {text.cta}
              </Link>
            )}
            {text.cta2 && (
              <a
                href={text.cta2Link ?? 'https://wa.me/19548535335'}
                target="_blank"
                rel="noopener noreferrer"
                className="btn inline-flex h-14 items-center gap-2.5 rounded-[14px] border-[1.5px] border-ink px-7 text-base font-bold text-ink hover:bg-ink hover:text-white transition-all duration-[180ms] focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_#F7F8F5,0_0_0_6px_#0196AD]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 19.5l1.2-3.7A8 8 0 1 1 8.4 19z" />
                </svg>
                {text.cta2}
              </a>
            )}
          </div>
        </div>

        {/* Right — images */}
        <div className="relative hidden md:grid grid-cols-2 grid-rows-2 gap-3 h-[520px]">
          {img1 && (
            <div className="relative col-span-2 row-span-1 overflow-hidden rounded-[var(--radius-card)]">
              <Image
                src={img1}
                alt={slots[0]?.alt?.[lang] || slots[0]?.alt?.es || ''}
                fill
                className="object-cover"
                sizes="45vw"
                priority
              />
            </div>
          )}
          {img2 && (
            <div className="relative overflow-hidden rounded-[20px]">
              <Image
                src={img2}
                alt={slots[1]?.alt?.[lang] || slots[1]?.alt?.es || ''}
                fill
                className="object-cover"
                sizes="22vw"
              />
            </div>
          )}
          {img3 && (
            <div className="relative overflow-hidden rounded-[20px]">
              <Image
                src={img3}
                alt={slots[2]?.alt?.[lang] || slots[2]?.alt?.es || ''}
                fill
                className="object-cover"
                sizes="22vw"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
