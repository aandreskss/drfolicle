import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { mediaUrl } from '@/lib/content/collections';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { PageSection, Lang, Treatment } from '@/lib/content/types';
import { pickText, pick } from '@/lib/content/types';

interface Props {
  section: PageSection;
  lang: Lang;
  treatments: Treatment[];
  mediaMap: Record<string, string>;
}

const layoutClass: Record<number, string> = {
  0: 't1',
  1: 't2',
  2: 't3',
  3: 't4',
};

export function TratamientosSection({ section, lang, treatments, mediaMap }: Props) {
  const text = pickText(section.data.content, lang);
  const homeItems = treatments.filter((t) => t.show_home);
  if (homeItems.length === 0) return null;

  return (
    <section className="py-[clamp(72px,9vw,128px)]">
      <div className="wrap">
        <div className="mb-10 max-w-[600px]">
          <SectionHeading t1={text.t1 ?? ''} t2={text.t2} text={text.text} />
        </div>

        <div className="grid gap-3 g-treat">
          {homeItems.map((t) => {
            const name = pick(t.name, lang);
            const short = pick(t.short, lang);
            const imgSrc = t.image_media_id ? mediaMap[t.image_media_id] : null;
            const href = t.page_slug ? `/${t.page_slug}` : '/servicios';
            const cls = layoutClass[t.home_layout] ?? '';

            return (
              <Link
                key={t.id}
                href={href}
                className={`card group relative overflow-hidden rounded-[var(--radius-card)] bg-dark min-h-[220px] ${cls}`}
              >
                {imgSrc && (
                  <Image
                    src={imgSrc}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-[560ms] group-hover:scale-[1.04]"
                    sizes="(max-width:960px) 100vw, 50vw"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-lime mb-1">
                    {short}
                  </p>
                  <h3 className="text-xl font-extrabold text-white leading-tight tracking-tight">
                    {name}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
