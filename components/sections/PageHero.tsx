import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import type { PageSection, Lang } from '@/lib/content/types';
import { pickText } from '@/lib/content/types';
import { slotUrl } from '@/lib/content/collections';

interface Props {
  section: PageSection;
  lang: Lang;
  /** Reemplaza el ctaLink si no viene en la sección */
  defaultCtaHref?: string;
}

export function PageHero({ section, lang, defaultCtaHref = '/contacto' }: Props) {
  const text = pickText(section.data.content, lang);
  const imgSlot = section.data.slots?.[0];
  const imgSrc = slotUrl(imgSlot?.src);

  return (
    <section className="border-b border-line py-[clamp(56px,7vw,96px)]">
      <div className="wrap grid items-center gap-10 md:grid-cols-[1fr_auto]">
        <div className="max-w-[620px]">
          {text.eyebrow && (
            <span className="mb-4 inline-flex items-center gap-2 rounded-pill border border-line bg-white px-4 py-1.5 text-[13px] font-semibold text-teal-deep">
              <span className="h-1.5 w-1.5 rounded-full bg-teal" aria-hidden="true" />
              {text.eyebrow}
            </span>
          )}
          <h1 className="text-[clamp(32px,4.5vw,58px)] font-extrabold leading-[1.08] tracking-[-0.035em] text-wrap-balance text-ink">
            {text.t1}
            {text.t2 && (
              <>
                {' '}
                <em className="accent">{text.t2}</em>
              </>
            )}
          </h1>
          {text.text && (
            <p className="mt-5 text-[clamp(16px,1.6vw,18px)] leading-relaxed text-slate max-w-[52ch]">
              {text.text}
            </p>
          )}
          {text.cta && (
            <Link
              href={text.ctaLink ?? defaultCtaHref}
              className="btn mt-7 inline-flex h-12 items-center rounded-[14px] bg-teal-deep px-6 text-[15px] font-bold text-white hover:bg-teal-petroleo transition-colors duration-[180ms] focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_#F7F8F5,0_0_0_6px_#0196AD]"
            >
              {text.cta}
            </Link>
          )}
        </div>

        {imgSrc && (
          <div className="hidden md:block relative w-[320px] aspect-[3/4] overflow-hidden rounded-[var(--radius-card)] shrink-0">
            <Image
              src={imgSrc}
              alt={imgSlot?.alt?.[lang] || imgSlot?.alt?.es || ''}
              fill
              className="object-cover"
              sizes="320px"
              priority
            />
          </div>
        )}
      </div>
    </section>
  );
}
