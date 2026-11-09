import { SectionHeading } from '@/components/ui/SectionHeading';
import type { PageSection, Lang } from '@/lib/content/types';
import { pickText, pickItem } from '@/lib/content/types';

interface Props {
  section: PageSection;
  lang: Lang;
  listKey?: string;
}

export function TimelineItems({ section, lang, listKey = 'items' }: Props) {
  const text = pickText(section.data.content, lang);
  const items = (section.data.lists?.[listKey]?.items ?? []).filter((it) => it.visible);
  if (items.length === 0) return null;

  return (
    <section className="py-[clamp(72px,9vw,128px)]">
      <div className="wrap max-w-[800px]">
        {(text.t1 || text.t2) && (
          <div className="mb-10">
            <SectionHeading t1={text.t1 ?? ''} t2={text.t2} text={text.text} />
          </div>
        )}
        <ol className="relative border-l-2 border-line pl-8 flex flex-col gap-8">
          {items.map((item, i) => {
            const d = pickItem(item, lang);
            return (
              <li key={i} className="relative">
                <span className="absolute -left-[41px] flex h-6 w-6 items-center justify-center rounded-full bg-teal text-[11px] font-extrabold text-white ring-4 ring-ground">
                  {i + 1}
                </span>
                {d.m && (
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-teal mb-1">{d.m}</p>
                )}
                <h3 className="font-extrabold text-ink text-lg leading-tight">{d.t}</h3>
                {d.d && <p className="mt-2 text-slate leading-relaxed">{d.d}</p>}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
