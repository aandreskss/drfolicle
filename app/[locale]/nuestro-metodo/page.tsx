import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { getPageSections } from '@/lib/content/sections';
import { PageHero } from '@/components/sections/PageHero';
import { CtaSection } from '@/components/sections/CtaSection';
import { ItemsGrid } from '@/components/sections/ItemsGrid';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProcesoStepper } from '@/components/inicio/ProcesoStepper';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { slotUrl } from '@/lib/content/collections';
import type { Lang, PageSection } from '@/lib/content/types';
import { pickText, pickItem } from '@/lib/content/types';

export const metadata: Metadata = {
  title: 'Nuestro método',
  description: 'Conoce el proceso Dr Follicle: diagnóstico, plan personalizado y técnica FUE para restauración capilar.',
};

function EtapasSection({ section, lang }: { section: PageSection; lang: Lang }) {
  const text = pickText(section.data.content, lang);
  const rawSteps = (section.data.lists?.etapas?.items ?? []).filter((it) => it.visible);
  const slots = section.data.slots ?? [];

  const steps = rawSteps.map((step, i) => {
    const d = pickItem(step, lang);
    const slot = slots[i];
    return {
      t: d.t ?? '',
      d: d.d ?? '',
      m: d.m,
      imgSrc: slotUrl(slot?.src),
      imgAlt: slot?.alt?.[lang as 'es' | 'en'] || slot?.alt?.es || d.t,
    };
  });

  if (steps.length === 0) return null;

  return (
    <section className="py-[clamp(72px,9vw,128px)] bg-mist-2">
      <div className="wrap">
        <div className="mb-10 max-w-[520px]">
          <SectionHeading t1={text.t1 ?? ''} t2={text.t2} />
        </div>
        <ProcesoStepper steps={steps} stepLabel={lang === 'en' ? 'Stage' : 'Etapa'} />
      </div>
    </section>
  );
}

function CaminosSection({ section, lang }: { section: PageSection; lang: Lang }) {
  const text = pickText(section.data.content, lang);
  const items = (section.data.lists?.items?.items ?? []).filter((it) => it.visible);
  if (items.length === 0) return null;
  return (
    <section className="py-[clamp(72px,9vw,128px)]">
      <div className="wrap">
        <div className="mb-10 max-w-[520px]">
          <SectionHeading t1={text.t1 ?? ''} t2={text.t2} />
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {items.map((item, i) => {
            const d = pickItem(item, lang);
            return (
              <div key={i} className="rounded-[var(--radius-card)] bg-dark p-8">
                {d.m && <p className="text-[11px] font-bold uppercase tracking-widest text-lime mb-3">{d.m}</p>}
                <h3 className="text-2xl font-extrabold text-white tracking-tight mb-3">{d.t}</h3>
                {d.d && <p className="text-[#BFD6DB] leading-relaxed">{d.d}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default async function MetodoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const lang = locale as Lang;

  const sections = await getPageSections('nuestro-metodo');
  const get = (key: string) => sections.find((s) => s.key === key);
  const homeLabel = lang === 'en' ? 'Home' : 'Inicio';

  return (
    <>
      <div className="wrap pt-6">
        <Breadcrumbs crumbs={[{ label: lang === 'en' ? 'Our method' : 'Nuestro método' }]} homeLabel={homeLabel} />
      </div>

      {get('hero') && <PageHero section={get('hero')!} lang={lang} />}
      {get('pilares') && <ItemsGrid section={get('pilares')!} lang={lang} cols={3} />}
      {get('etapas') && <EtapasSection section={get('etapas')!} lang={lang} />}
      {get('caminos') && <CaminosSection section={get('caminos')!} lang={lang} />}
      {get('beneficios') && <ItemsGrid section={get('beneficios')!} lang={lang} cols={4} />}
      {get('cta') && <CtaSection section={get('cta')!} lang={lang} />}
    </>
  );
}
