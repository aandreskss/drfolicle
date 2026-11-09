import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getPageSections } from '@/lib/content/sections';
import { getTestimonials, getFaqs } from '@/lib/content/collections';
import { PageHero } from '@/components/sections/PageHero';
import { CtaSection } from '@/components/sections/CtaSection';
import { ItemsGrid } from '@/components/sections/ItemsGrid';
import { FaqSection } from '@/components/inicio/FaqSection';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { slotUrl } from '@/lib/content/collections';
import { Link } from '@/i18n/navigation';
import type { Lang, PageSection, Testimonial } from '@/lib/content/types';
import { pickText, pickItem, pick } from '@/lib/content/types';

export const metadata: Metadata = {
  title: 'Turismo médico capilar en Medellín',
  description: 'Restauración capilar en Medellín con acompañamiento completo para pacientes internacionales.',
};

function ViajeSection({ section, lang }: { section: PageSection; lang: Lang }) {
  const text = pickText(section.data.content, lang);
  const steps = (section.data.lists?.etapas?.items ?? []).filter((it) => it.visible);
  if (steps.length === 0) return null;
  return (
    <section className="py-[clamp(72px,9vw,128px)] bg-mist-2">
      <div className="wrap">
        <div className="mb-10 max-w-[520px]">
          <SectionHeading t1={text.t1 ?? ''} t2={text.t2} />
        </div>
        <ol className="relative border-l-2 border-teal pl-8 flex flex-col gap-8">
          {steps.map((item, i) => {
            const d = pickItem(item, lang);
            return (
              <li key={i} className="relative">
                <span className="absolute -left-[41px] flex h-6 w-6 items-center justify-center rounded-full bg-teal text-[11px] font-extrabold text-white ring-4 ring-mist-2">
                  {i + 1}
                </span>
                {d.m && <p className="text-[11px] font-bold uppercase tracking-widest text-teal mb-1">{d.m}</p>}
                <h3 className="font-extrabold text-ink text-lg">{d.t}</h3>
                {d.d && <p className="mt-1 text-slate text-sm leading-relaxed">{d.d}</p>}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function TestimonioSection({ section, lang, testimonials }: { section: PageSection; lang: Lang; testimonials: Testimonial[] }) {
  const text = pickText(section.data.content, lang);
  const t = testimonials.find((t) => t.authorization_confirmed);
  if (!t) return null;
  return (
    <section className="py-[clamp(72px,9vw,128px)] bg-dark">
      <div className="wrap max-w-[800px] text-center">
        <SectionHeading t1={text.t1 ?? ''} t2={text.t2} dark center />
        <blockquote className="mt-8 rounded-[var(--radius-card)] bg-white/5 border border-white/10 p-8">
          <p className="text-xl text-white leading-relaxed italic">&ldquo;{pick(t.quote, lang)}&rdquo;</p>
          <footer className="mt-5">
            <p className="font-bold text-lime">{t.author}</p>
            <p className="text-sm text-[#BFD6DB]">{[t.country, t.treatment].filter(Boolean).join(' · ')}</p>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}

export default async function TurismoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const lang = locale as Lang;

  const [sections, testimonials, faqs] = await Promise.all([
    getPageSections('turismo-medico'),
    getTestimonials(),
    getFaqs('turismo'),
  ]);

  const get = (key: string) => sections.find((s) => s.key === key);
  const homeLabel = lang === 'en' ? 'Home' : 'Inicio';

  return (
    <>
      <div className="wrap pt-6">
        <Breadcrumbs crumbs={[{ label: lang === 'en' ? 'Medical tourism' : 'Turismo médico' }]} homeLabel={homeLabel} />
      </div>

      {get('hero') && <PageHero section={get('hero')!} lang={lang} />}
      {get('viaje') && <ViajeSection section={get('viaje')!} lang={lang} />}
      {get('estadia') && <ItemsGrid section={get('estadia')!} lang={lang} cols={4} />}
      {get('testimonio') && <TestimonioSection section={get('testimonio')!} lang={lang} testimonials={testimonials} />}
      {get('faq') && faqs.length > 0 && <FaqSection section={get('faq')!} lang={lang} faqs={faqs} />}
      {get('cta') && <CtaSection section={get('cta')!} lang={lang} />}
    </>
  );
}
