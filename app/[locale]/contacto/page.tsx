import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getPageSections } from '@/lib/content/sections';
import { getSettings } from '@/lib/content/settings';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { LeadForm } from '@/components/contact/LeadForm';
import type { Lang, PageSection } from '@/lib/content/types';
import { pickText, pickItem } from '@/lib/content/types';

export const metadata: Metadata = {
  title: 'Contacto y valoración',
  description: 'Solicita tu valoración gratuita de restauración capilar con Dr Follicle Solutions en Medellín.',
};

interface ContactSettings {
  phone: string;
  wa: string;
  email: string;
  address: string;
  city: string;
  hours: string;
}

function ContactHero({ section, lang, contact }: { section: PageSection; lang: Lang; contact: ContactSettings | null }) {
  const text = pickText(section.data.content, lang);
  const avisos = (section.data.lists?.avisos?.items ?? []).filter((it) => it.visible);

  const channels = [
    contact?.phone && {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.44 10a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.55 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.1a16 16 0 0 0 6 6l.86-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
      label: lang === 'en' ? 'Phone' : 'Teléfono',
      value: contact.phone,
      href: `tel:${contact.phone.replace(/\s/g, '')}`,
    },
    contact?.wa && {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 19.5l1.2-3.7A8 8 0 1 1 8.4 19z" />
        </svg>
      ),
      label: 'WhatsApp',
      value: contact.wa,
      href: `https://wa.me/${contact.wa.replace(/\D/g, '')}?text=${encodeURIComponent('Hola, quiero agendar una valoración.')}`,
    },
    contact?.email && {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
        </svg>
      ),
      label: lang === 'en' ? 'Email' : 'Correo',
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
  ].filter(Boolean) as { icon: React.ReactNode; label: string; value: string; href: string }[];

  return (
    <section className="border-b border-line py-[clamp(56px,7vw,96px)]">
      <div className="wrap">
        <div className="mb-10 max-w-[560px]">
          <SectionHeading t1={text.t1 ?? ''} t2={text.t2} text={text.text} />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {channels.map((ch, i) => (
            <a
              key={i}
              href={ch.href}
              target={ch.href.startsWith('http') ? '_blank' : undefined}
              rel={ch.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="flex gap-4 items-start rounded-[20px] border border-line bg-white p-6 hover:border-teal hover:bg-mist transition-all duration-150 focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_#0196AD]"
            >
              <span className="mt-0.5 text-teal shrink-0">{ch.icon}</span>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate mb-1">{ch.label}</p>
                <p className="font-semibold text-ink break-all">{ch.value}</p>
              </div>
            </a>
          ))}
        </div>
        {avisos.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-3">
            {avisos.map((a, i) => {
              const d = pickItem(a, lang);
              return (
                <li key={i} className="flex items-center gap-2 rounded-pill bg-mist px-4 py-2 text-sm font-semibold text-teal-deep">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  {d.t}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}

export default async function ContactoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const lang = locale as Lang;

  const [sections, contact] = await Promise.all([
    getPageSections('contacto'),
    getSettings<ContactSettings>('contact'),
  ]);

  const heroSection = sections.find((s) => s.key === 'hero');
  const homeLabel = lang === 'en' ? 'Home' : 'Inicio';

  return (
    <>
      <div className="wrap pt-6">
        <Breadcrumbs crumbs={[{ label: lang === 'en' ? 'Contact' : 'Contacto' }]} homeLabel={homeLabel} />
      </div>

      {heroSection && <ContactHero section={heroSection} lang={lang} contact={contact} />}

      <section className="py-[clamp(72px,9vw,128px)]">
        <div className="wrap max-w-[640px]">
          <SectionHeading
            t1={lang === 'en' ? 'Request your free' : 'Solicita tu'}
            t2={lang === 'en' ? 'assessment.' : 'valoración gratuita.'}
            text={lang === 'en'
              ? 'Fill in the form and a specialist will contact you to schedule your assessment.'
              : 'Déjanos tus datos y un especialista te contactará para agendar tu valoración.'}
          />
          <div className="mt-8">
            <LeadForm lang={lang} waPhone={contact?.wa ?? '19548535335'} />
          </div>
        </div>
      </section>
    </>
  );
}
