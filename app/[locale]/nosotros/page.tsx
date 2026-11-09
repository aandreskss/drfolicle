import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { getPageSections } from '@/lib/content/sections';
import { getTeam, getAllMedia } from '@/lib/content/collections';
import { PageHero } from '@/components/sections/PageHero';
import { CtaSection } from '@/components/sections/CtaSection';
import { ItemsGrid } from '@/components/sections/ItemsGrid';
import { TimelineItems } from '@/components/sections/TimelineItems';
import { EspecialistasSection } from '@/components/inicio/EspecialistasSection';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { slotUrl } from '@/lib/content/collections';
import type { Lang, PageSection } from '@/lib/content/types';
import { pickText, pickItem } from '@/lib/content/types';

export const metadata: Metadata = {
  title: 'Nosotros',
  description: 'Conoce a Dr Follicle Solutions: filosofía, equipo y técnica FUE para restauración capilar en Medellín.',
};

function FilosofiaSection({ section, lang }: { section: PageSection; lang: Lang }) {
  const text = pickText(section.data.content, lang);
  const items = (section.data.lists?.items?.items ?? []).filter((it) => it.visible);
  return (
    <section className="py-[clamp(72px,9vw,128px)] bg-mist-2">
      <div className="wrap">
        <div className="mb-10 max-w-[520px]">
          <SectionHeading t1={text.t1 ?? ''} t2={text.t2} text={text.text} />
        </div>
        {items.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-3">
            {items.map((item, i) => {
              const d = pickItem(item, lang);
              return (
                <div key={i} className="rounded-[20px] bg-white border border-line p-7">
                  <span className="mb-4 block text-3xl font-extrabold text-teal opacity-30">0{i + 1}</span>
                  <h3 className="font-extrabold text-ink text-lg mb-2">{d.t}</h3>
                  {d.d && <p className="text-sm text-slate leading-relaxed">{d.d}</p>}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

function TecnicaSection({ section, lang }: { section: PageSection; lang: Lang }) {
  const text = pickText(section.data.content, lang);
  const items = (section.data.lists?.items?.items ?? []).filter((it) => it.visible);
  const imgSrc = slotUrl(section.data.slots?.[0]?.src);
  const imgAlt = section.data.slots?.[0]?.alt?.[lang] || section.data.slots?.[0]?.alt?.es || '';

  return (
    <section className="py-[clamp(72px,9vw,128px)]">
      <div className="wrap grid gap-12 items-center lg:grid-cols-2">
        {imgSrc && (
          <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)]">
            <Image src={imgSrc} alt={imgAlt} fill className="object-cover" sizes="50vw" />
          </div>
        )}
        <div>
          <SectionHeading t1={text.t1 ?? ''} t2={text.t2} text={text.text} />
          {items.length > 0 && (
            <ul className="mt-7 flex flex-col gap-4">
              {items.map((item, i) => {
                const d = pickItem(item, lang);
                return (
                  <li key={i} className="flex gap-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0196AD" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0" aria-hidden="true">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <div>
                      <p className="font-bold text-ink">{d.t}</p>
                      {d.d && <p className="text-sm text-slate mt-0.5">{d.d}</p>}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

export default async function NosotrosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const lang = locale as Lang;

  const [sections, team, mediaMap] = await Promise.all([
    getPageSections('nosotros'),
    getTeam(),
    getAllMedia(),
  ]);

  const get = (key: string) => sections.find((s) => s.key === key);
  const homeLabel = lang === 'en' ? 'Home' : 'Inicio';

  return (
    <>
      <div className="wrap pt-6">
        <Breadcrumbs crumbs={[{ label: lang === 'en' ? 'About' : 'Nosotros' }]} homeLabel={homeLabel} />
      </div>

      {get('hero') && <PageHero section={get('hero')!} lang={lang} />}
      {get('filosofia') && <FilosofiaSection section={get('filosofia')!} lang={lang} />}
      {get('equipo') && (
        <EspecialistasSection section={get('equipo')!} lang={lang} team={team} mediaMap={mediaMap} />
      )}
      {get('tecnica') && <TecnicaSection section={get('tecnica')!} lang={lang} />}
      {get('compromisos') && <ItemsGrid section={get('compromisos')!} lang={lang} cols={2} />}
      {get('largoplazo') && <TimelineItems section={get('largoplazo')!} lang={lang} listKey="tiempos" />}
      {get('cta') && <CtaSection section={get('cta')!} lang={lang} />}
    </>
  );
}
