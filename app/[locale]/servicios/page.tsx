import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { getPageSections } from '@/lib/content/sections';
import { getTreatments, getAllMedia } from '@/lib/content/collections';
import { PageHero } from '@/components/sections/PageHero';
import { CtaSection } from '@/components/sections/CtaSection';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import type { Lang } from '@/lib/content/types';
import { pick } from '@/lib/content/types';

export const metadata: Metadata = {
  title: 'Servicios de restauración capilar',
  description: 'Tratamientos de restauración capilar en Medellín. Trasplante capilar, barba y cejas con técnica FUE.',
};

export default async function ServiciosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const lang = locale as Lang;

  const [sections, treatments, mediaMap] = await Promise.all([
    getPageSections('servicios'),
    getTreatments(),
    getAllMedia(),
  ]);

  const heroSection = sections.find((s) => s.key === 'hero');
  const ctaSection = sections.find((s) => s.key === 'cta');

  return (
    <>
      <div className="wrap pt-6">
        <Breadcrumbs crumbs={[{ label: lang === 'en' ? 'Services' : 'Servicios' }]} homeLabel={lang === 'en' ? 'Home' : 'Inicio'} />
      </div>

      {heroSection && <PageHero section={heroSection} lang={lang} />}

      <section className="py-[clamp(72px,9vw,128px)]">
        <div className="wrap">
          <div className="grid gap-6 sm:grid-cols-2">
            {treatments.map((t) => {
              const name = pick(t.name, lang);
              const short = pick(t.short, lang);
              const imgSrc = t.image_media_id ? mediaMap[t.image_media_id] : null;
              const href = t.page_slug ? `/servicios/${t.page_slug}` : '/servicios';

              return (
                <Link
                  key={t.id}
                  href={href}
                  className="card group relative flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-white hover:border-teal transition-colors duration-150"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-mist">
                    {imgSrc ? (
                      <Image
                        src={imgSrc}
                        alt={name}
                        fill
                        className="object-cover"
                        sizes="(max-width:640px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="h-full bg-mist" />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h2 className="text-xl font-extrabold text-ink tracking-tight">{name}</h2>
                    <p className="mt-2 text-sm text-slate leading-relaxed flex-1">{short}</p>
                    <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-teal-deep">
                      {lang === 'en' ? 'Learn more' : 'Conocer más'}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {ctaSection && <CtaSection section={ctaSection} lang={lang} />}
    </>
  );
}
