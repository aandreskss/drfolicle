import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getPageSections } from '@/lib/content/sections';
import { getCases, getTestimonials, getAllMedia } from '@/lib/content/collections';
import { PageHero } from '@/components/sections/PageHero';
import { CtaSection } from '@/components/sections/CtaSection';
import { TestimoniosSection } from '@/components/inicio/TestimoniosSection';
import { BeforeAfter } from '@/components/ui/BeforeAfter';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import type { Lang, PageSection, Case } from '@/lib/content/types';
import { pickText, pick } from '@/lib/content/types';

export const metadata: Metadata = {
  title: 'Resultados · antes y después',
  description: 'Galería de resultados de trasplante capilar, barba y cejas. Fotografías reales con autorización.',
};

function GaleriaSection({
  section,
  lang,
  cases,
  mediaMap,
}: {
  section: PageSection;
  lang: Lang;
  cases: Case[];
  mediaMap: Record<string, string>;
}) {
  const text = pickText(section.data.content, lang);
  const visible = cases.filter((c) => c.before_media_id && c.after_media_id);
  if (visible.length === 0) return null;

  return (
    <section className="py-[clamp(72px,9vw,128px)]">
      <div className="wrap">
        {text.t1 && (
          <div className="mb-10 max-w-[520px]">
            <SectionHeading t1={text.t1} t2={text.t2} text={text.text} />
          </div>
        )}
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((c) => {
            const beforeSrc = c.before_media_id ? mediaMap[c.before_media_id] : null;
            const afterSrc = c.after_media_id ? mediaMap[c.after_media_id] : null;
            if (!beforeSrc || !afterSrc) return null;
            return (
              <div key={c.id} className="flex flex-col gap-2">
                <BeforeAfter
                  before={{ src: beforeSrc, alt: pick(c.title, lang) }}
                  after={{ src: afterSrc, alt: pick(c.title, lang) }}
                  labelBefore={lang === 'en' ? 'Before' : 'Antes'}
                  labelAfter={lang === 'en' ? 'After' : 'Después'}
                  caseLabel={lang === 'en' ? 'Real case' : 'Caso real'}
                />
                <div className="px-1">
                  <p className="font-semibold text-ink text-sm">{pick(c.title, lang)}</p>
                  <p className="text-xs text-slate mt-0.5">
                    {[
                      c.units && `${c.units} unidades`,
                      c.months && `${c.months}`,
                      c.origin,
                    ]
                      .filter(Boolean)
                      .join(' · ')}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default async function ResultadosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const lang = locale as Lang;

  const [sections, cases, testimonials, mediaMap] = await Promise.all([
    getPageSections('resultados'),
    getCases(),
    getTestimonials(),
    getAllMedia(),
  ]);

  const get = (key: string) => sections.find((s) => s.key === key);
  const homeLabel = lang === 'en' ? 'Home' : 'Inicio';

  return (
    <>
      <div className="wrap pt-6">
        <Breadcrumbs crumbs={[{ label: lang === 'en' ? 'Results' : 'Resultados' }]} homeLabel={homeLabel} />
      </div>

      {get('hero') && <PageHero section={get('hero')!} lang={lang} />}
      {get('hero') && <GaleriaSection section={get('hero')!} lang={lang} cases={cases} mediaMap={mediaMap} />}
      {get('historias') && testimonials.length > 0 && (
        <TestimoniosSection section={get('historias')!} lang={lang} testimonials={testimonials} />
      )}
      {get('cta') && <CtaSection section={get('cta')!} lang={lang} />}
    </>
  );
}
