import type { PageSection, Lang } from '@/lib/content/types';
import { pickText, pickItem } from '@/lib/content/types';

interface Props {
  section: PageSection;
  lang: Lang;
}

export function ConfianzaSection({ section, lang }: Props) {
  const items = section.data.lists?.items?.items ?? [];
  const visible = items.filter((it) => it.visible);
  if (visible.length === 0) return null;

  return (
    <section className="border-y border-line bg-white py-10">
      <div className="wrap grid gap-6 g-trust">
        {visible.map((item, i) => {
          const d = pickItem(item, lang);
          return (
            <div key={i} className="flex flex-col gap-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-teal">
                0{i + 1}
              </span>
              <p className="font-extrabold text-ink leading-tight">{d.t}</p>
              <p className="text-sm text-slate leading-relaxed">{d.d}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
