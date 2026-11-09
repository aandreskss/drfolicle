import { setRequestLocale } from 'next-intl/server';
import { getPageSections } from '@/lib/content/sections';
import { getTreatments, getCases, getTeam, getTestimonials, getFaqs, getAllMedia } from '@/lib/content/collections';
import type { Lang, PageSection } from '@/lib/content/types';

import { HeroSection } from '@/components/inicio/HeroSection';
import { ConfianzaSection } from '@/components/inicio/ConfianzaSection';
import { TratamientosSection } from '@/components/inicio/TratamientosSection';
import { ResultadosSection } from '@/components/inicio/ResultadosSection';
import { CienciaSection } from '@/components/inicio/CienciaSection';
import { ProcesoSection } from '@/components/inicio/ProcesoSection';
import { EspecialistasSection } from '@/components/inicio/EspecialistasSection';
import { TurismoSection } from '@/components/inicio/TurismoSection';
import { TestimoniosSection } from '@/components/inicio/TestimoniosSection';
import { ConsultaSection } from '@/components/inicio/ConsultaSection';
import { FaqSection } from '@/components/inicio/FaqSection';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const lang = locale as Lang;

  const [sections, treatments, cases, team, testimonials, faqs, mediaMap] = await Promise.all([
    getPageSections('inicio'),
    getTreatments(),
    getCases(),
    getTeam(),
    getTestimonials(),
    getFaqs('inicio'),
    getAllMedia(),
  ]);

  const registry: Record<string, (s: PageSection) => React.ReactNode> = {
    hero: (s) => <HeroSection section={s} lang={lang} />,
    confianza: (s) => <ConfianzaSection section={s} lang={lang} />,
    tratamientos: (s) => <TratamientosSection section={s} lang={lang} treatments={treatments} mediaMap={mediaMap} />,
    resultados: (s) => <ResultadosSection section={s} lang={lang} cases={cases} mediaMap={mediaMap} />,
    ciencia: (s) => <CienciaSection section={s} lang={lang} />,
    proceso: (s) => <ProcesoSection section={s} lang={lang} />,
    especialistas: (s) => <EspecialistasSection section={s} lang={lang} team={team} mediaMap={mediaMap} />,
    turismo: (s) => <TurismoSection section={s} lang={lang} />,
    testimonios: (s) => <TestimoniosSection section={s} lang={lang} testimonials={testimonials} />,
    consulta: (s) => <ConsultaSection section={s} lang={lang} />,
    faq: (s) => <FaqSection section={s} lang={lang} faqs={faqs} />,
  };

  return (
    <>
      {sections.map((section) => {
        const render = registry[section.key];
        if (!render) return null;
        return <div key={section.key}>{render(section)}</div>;
      })}
    </>
  );
}
