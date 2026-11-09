import { SectionHeading } from '@/components/ui/SectionHeading';
import type { PageSection, Lang } from '@/lib/content/types';
import { pickText, pickItem } from '@/lib/content/types';

interface Props {
  section: PageSection;
  lang: Lang;
  listKey?: string;
  dark?: boolean;
  cols?: 2 | 3 | 4;
}

export function ItemsGrid({ section, lang, listKey = 'items', dark = false, cols = 3 }: Props) {
  const text = pickText(section.data.content, lang);
  const items = (section.data.lists?.[listKey]?.items ?? []).filter((it) => it.visible);
  if (items.length === 0) return null;

  const colClass = { 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-2 lg:grid-cols-3', 4: 'sm:grid-cols-2 lg:grid-cols-4' }[cols];

  return (
    <section className={`py-[clamp(72px,9vw,128px)] ${dark ? 'bg-dark' : 'bg-white'}`}>
      <div className="wrap">
        {(text.t1 || text.t2) && (
          <div className="mb-10 max-w-[560px]">
            <SectionHeading t1={text.t1 ?? ''} t2={text.t2} text={text.text} dark={dark} />
          </div>
        )}
        <div className={`grid gap-5 grid-cols-1 ${colClass}`}>
          {items.map((item, i) => {
            const d = pickItem(item, lang);
            return (
              <div
                key={i}
                className={`rounded-[20px] border p-6 ${dark ? 'border-white/10 bg-white/5' : 'border-line bg-ground'}`}
              >
                <span className={`mb-3 block text-[11px] font-bold uppercase tracking-[0.16em] ${dark ? 'text-[#9BD3DC]' : 'text-teal'}`}>
                  0{i + 1}
                </span>
                <p className={`font-extrabold text-lg leading-tight ${dark ? 'text-white' : 'text-ink'}`}>{d.t}</p>
                {d.d && (
                  <p className={`mt-2 text-sm leading-relaxed ${dark ? 'text-[#BFD6DB]' : 'text-slate'}`}>{d.d}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
