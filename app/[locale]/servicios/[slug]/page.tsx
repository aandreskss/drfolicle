import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getPageSections } from '@/lib/content/sections';
import { getTreatments, getCases, getFaqs, getAllMedia } from '@/lib/content/collections';
import { PageHero } from '@/components/sections/PageHero';
import { CtaSection } from '@/components/sections/CtaSection';
import { ItemsGrid } from '@/components/sections/ItemsGrid';
import { TimelineItems } from '@/components/sections/TimelineItems';
import { FaqSection } from '@/components/inicio/FaqSection';
import { ResultadosSection } from '@/components/inicio/ResultadosSection';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import type { Lang, PageSection } from '@/lib/content/types';
import { pickText, pickItem, pick } from '@/lib/content/types';
import { slotUrl } from '@/lib/content/collections';

export async function generateStaticParams() {
  const treatments = await getTreatments();
  return treatments
    .filter((t) => t.page_slug)
    .flatMap((t) =>
      ['es', 'en'].map((locale) => ({ locale, slug: t.page_slug! }))
    );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const treatments = await getTreatments();
  const t = treatments.find((tr) => tr.page_slug === slug);
  if (!t) return {};
  const name = pick(t.name, 'es');
  return {
    title: name,
    description: pick(t.short, 'es'),
  };
}

function DatosSection({ section, lang }: { section: PageSection; lang: Lang }) {
  const items = (section.data.lists?.items?.items ?? []).filter((it) => it.visible);
  if (items.length === 0) return null;
  return (
    <section className="border-b border-line py-10 bg-white">
      <div className="wrap grid gap-4 grid-cols-2 sm:grid-cols-4">
        {items.map((item, i) => {
          const d = pickItem(item, lang);
          return (
            <div key={i} className="rounded-[16px] bg-mist p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-slate mb-1">{d.t}</p>
              <p className="font-extrabold text-ink">{d.d}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ZonasSection({ section, lang }: { section: PageSection; lang: Lang }) {
  const text = pickText(section.data.content, lang);
  const items = (section.data.lists?.items?.items ?? []).filter((it) => it.visible);
  if (items.length === 0) return null;
  return (
    <section className="py-[clamp(72px,9vw,128px)] bg-mist-2">
      <div className="wrap">
        <div className="mb-10 max-w-[520px]">
          <SectionHeading t1={text.t1 ?? ''} t2={text.t2} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => {
            const d = pickItem(item, lang);
            return (
              <div key={i} className="rounded-[20px] bg-white border border-line p-6">
                <div className="mb-3 h-10 w-10 rounded-full bg-mist flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0196AD" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" />
                  </svg>
                </div>
                <h3 className="font-bold text-ink">{d.t}</h3>
                {d.d && <p className="mt-1 text-sm text-slate leading-relaxed">{d.d}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FueSection({ section, lang }: { section: PageSection; lang: Lang }) {
  const text = pickText(section.data.content, lang);
  const pasos = (section.data.lists?.pasos?.items ?? []).filter((it) => it.visible);
  const beneficios = (section.data.lists?.beneficios?.items ?? []).filter((it) => it.visible);
  return (
    <section className="py-[clamp(72px,9vw,128px)]">
      <div className="wrap">
        <div className="mb-10 max-w-[520px]">
          <SectionHeading t1={text.t1 ?? ''} t2={text.t2} />
        </div>
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            {pasos.map((p, i) => {
              const d = pickItem(p, lang);
              return (
                <div key={i} className="flex gap-4 rounded-[16px] border border-line bg-white p-5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal text-sm font-extrabold text-white">{i + 1}</span>
                  <div>
                    <p className="font-bold text-ink">{d.t}</p>
                    {d.d && <p className="mt-1 text-sm text-slate leading-relaxed">{d.d}</p>}
                  </div>
                </div>
              );
            })}
          </div>
          {beneficios.length > 0 && (
            <div className="flex flex-col gap-3">
              {beneficios.map((b, i) => {
                const d = pickItem(b, lang);
                return (
                  <div key={i} className="flex gap-3 items-start">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0196AD" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0" aria-hidden="true">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <p className="font-semibold text-ink">{d.t}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function RelacionadosSection({ treatments, currentSlug, lang }: { treatments: Awaited<ReturnType<typeof getTreatments>>; currentSlug: string; lang: Lang; }) {
  const others = treatments.filter((t) => t.page_slug !== currentSlug && t.visible);
  if (others.length === 0) return null;
  return (
    <section className="py-16 border-t border-line">
      <div className="wrap">
        <h2 className="text-xl font-extrabold text-ink mb-6">
          {lang === 'en' ? 'Other treatments' : 'Otros tratamientos'}
        </h2>
        <div className="flex flex-wrap gap-3">
          {others.map((t) => (
            <Link
              key={t.id}
              href={`/servicios/${t.page_slug}`}
              className="rounded-pill border border-line bg-white px-5 py-2.5 text-sm font-semibold text-ink hover:border-teal hover:text-teal-deep transition-all duration-150 focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_#0196AD]"
            >
              {pick(t.name, lang)}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default async function TratamientoPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const lang = locale as Lang;

  const [sections, treatments, cases, faqs, mediaMap] = await Promise.all([
    getPageSections(slug),
    getTreatments(),
    getCases(),
    getFaqs(slug),
    getAllMedia(),
  ]);

  if (sections.length === 0) notFound();

  const treatment = treatments.find((t) => t.page_slug === slug);

  const get = (key: string) => sections.find((s) => s.key === key);

  const heroSection = get('hero');
  const datosSection = get('datos');
  const zonasSection = get('zonas');
  const fueSection = get('fue');
  const esperarSection = get('esperar');
  const resultadosSection = get('resultados');
  const faqSection = get('faq');
  const ctaSection = get('cta');

  const treatmentName = treatment ? pick(treatment.name, lang) : '';
  const parentLabel = lang === 'en' ? 'Services' : 'Servicios';
  const homeLabel = lang === 'en' ? 'Home' : 'Inicio';

  return (
    <>
      <div className="wrap pt-6">
        <Breadcrumbs
          crumbs={[{ label: parentLabel, href: '/servicios' }, { label: treatmentName }]}
          homeLabel={homeLabel}
        />
      </div>

      {heroSection && <PageHero section={heroSection} lang={lang} />}
      {datosSection && <DatosSection section={datosSection} lang={lang} />}
      {zonasSection && <ZonasSection section={zonasSection} lang={lang} />}
      {fueSection && <FueSection section={fueSection} lang={lang} />}
      {esperarSection && <TimelineItems section={esperarSection} lang={lang} />}
      {resultadosSection && cases.length > 0 && (
        <ResultadosSection section={resultadosSection} lang={lang} cases={cases} mediaMap={mediaMap} />
      )}
      {faqSection && faqs.length > 0 && (
        <FaqSection section={faqSection} lang={lang} faqs={faqs} />
      )}
      <RelacionadosSection treatments={treatments} currentSlug={slug} lang={lang} />
      {ctaSection && <CtaSection section={ctaSection} lang={lang} />}
    </>
  );
}
