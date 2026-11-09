import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getPageSections } from '@/lib/content/sections';
import { getSettings } from '@/lib/content/settings';
import { ContactFormClient } from '@/components/contact/ContactFormClient';
import type { Lang } from '@/lib/content/types';
import { pickText, pickItem } from '@/lib/content/types';
import { Link } from '@/i18n/navigation';

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
  const t = heroSection ? pickText(heroSection.data.content, lang) : null;
  const avisos = (heroSection?.data?.lists?.avisos?.items ?? []).filter((it) => it.visible);

  const homeLabel = lang === 'en' ? 'Home' : 'Inicio';
  const waNumber = contact?.wa ?? '19548535335';
  const email = contact?.email ?? 'dr.folliclesolutions@gmail.com';
  const address = contact?.address;
  const hours = contact?.hours;

  const h1Part1 = t?.t1 ?? (lang === 'en' ? 'Let\'s talk about' : 'Hablemos de');
  const h1Part2 = t?.t2 ?? (lang === 'en' ? 'your case.' : 'tu caso.');
  const subtitle = t?.text ?? (lang === 'en'
    ? 'Leave us your details and a specialist will contact you to schedule your assessment. The first assessment is free.'
    : 'Déjanos tus datos y un especialista te contactará para agendar tu valoración. La primera valoración no tiene costo.');

  const defaultNotices = lang === 'en'
    ? ["We won't ask for photos at this stage", 'Support in Spanish and English']
    : ['No te pediremos fotografías en este paso', 'Atención en español e inglés'];

  return (
    <main>
      {/* Contact section */}
      <section aria-labelledby="h-t" style={{ padding: 'clamp(40px,6vw,80px) 0 clamp(72px,9vw,120px)' }}>
        <div className="wrap g-con" style={{ display: 'grid', gap: 'clamp(32px,5vw,80px)', alignItems: 'start' }}>

          {/* Left column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {/* Breadcrumbs */}
            <nav aria-label={lang === 'en' ? 'Breadcrumb' : 'Ruta'} style={{ fontSize: '13px', color: '#4B5F66', display: 'flex', gap: '8px' }}>
              <Link href="/" style={{ color: '#4B5F66', textDecoration: 'none' }}>{homeLabel}</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page" style={{ color: '#0A2730', fontWeight: 600 }}>
                {lang === 'en' ? 'Contact' : 'Contacto'}
              </span>
            </nav>

            {/* Heading */}
            <h1 id="h-t" style={{ margin: 0, fontSize: 'clamp(46px,6vw,88px)', lineHeight: 0.94, letterSpacing: '-0.045em', fontWeight: 800 }}>
              {h1Part1} <em className="accent">{h1Part2}</em>
            </h1>

            {/* Subtitle */}
            <p style={{ margin: 0, fontSize: '19px', lineHeight: 1.55, color: '#24414A' }}>{subtitle}</p>

            {/* Channel cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* WhatsApp */}
              <a
                href={`https://wa.me/${waNumber.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="chan"
                style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '18px 20px', borderRadius: '20px', background: '#00566E', color: '#FFFFFF', textDecoration: 'none', border: '1.5px solid #00566E' }}
              >
                <span style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#C5D300', color: '#0A2730', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 19.5l1.2-3.7A8 8 0 1 1 8.4 19z"/></svg>
                </span>
                <span style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <strong style={{ fontSize: '17px' }}>WhatsApp</strong>
                  <span style={{ fontSize: '14px', color: '#DCEBEE' }}>
                    {lang === 'en' ? '+1 (954) 853-5335 · fastest response' : '+1 (954) 853-5335 · respuesta más rápida'}
                  </span>
                </span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </a>

              {/* Calendly */}
              <a
                href="https://calendly.com/dr-folliclesolutions/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="chan"
                style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '18px 20px', borderRadius: '20px', background: '#FFFFFF', color: '#0A2730', textDecoration: 'none', border: '1.5px solid #D5E3E6' }}
              >
                <span style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#E3F2F4', color: '#00566E', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/></svg>
                </span>
                <span style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <strong style={{ fontSize: '17px' }}>
                    {lang === 'en' ? '30-minute video call' : 'Videollamada de 30 minutos'}
                  </strong>
                  <span style={{ fontSize: '14px', color: '#4B5F66' }}>
                    {lang === 'en' ? 'Choose the day and time that works best for you' : 'Elige el día y la hora que te queden mejor'}
                  </span>
                </span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#007A8C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </a>

              {/* Email */}
              <a
                href={`mailto:${email}`}
                className="chan"
                style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '18px 20px', borderRadius: '20px', background: '#FFFFFF', color: '#0A2730', textDecoration: 'none', border: '1.5px solid #D5E3E6' }}
              >
                <span style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#E3F2F4', color: '#00566E', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M3.5 6.5l8.5 6.5 8.5-6.5"/></svg>
                </span>
                <span style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                  <strong style={{ fontSize: '17px' }}>
                    {lang === 'en' ? 'Email' : 'Correo electrónico'}
                  </strong>
                  <span style={{ fontSize: '14px', color: '#4B5F66', overflow: 'hidden', textOverflow: 'ellipsis' }}>{email}</span>
                </span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#007A8C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </a>
            </div>

            {/* Notices */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '15px', color: '#24414A' }}>
              {avisos.length > 0 ? (
                avisos.map((a, i) => {
                  const d = pickItem(a, lang);
                  return (
                    <span key={i} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#007A8C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l4 4 10-10"/></svg>
                      {d.t}
                    </span>
                  );
                })
              ) : (
                defaultNotices.map((notice, i) => (
                  <span key={i} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#007A8C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l4 4 10-10"/></svg>
                    {notice}
                  </span>
                ))
              )}
            </div>
          </div>

          {/* Right column — form card */}
          <div style={{ background: '#FFFFFF', borderRadius: '32px', padding: 'clamp(24px,4vw,48px)', minHeight: '640px' }}>
            <ContactFormClient lang={lang} waPhone={waNumber} />
          </div>
        </div>
      </section>

      {/* Map section */}
      <section aria-labelledby="u-t" style={{ padding: '0 0 clamp(72px,9vw,120px)' }}>
        <div className="wrap">
          <div className="ph" style={{ position: 'relative', height: 'clamp(360px,38vw,480px)', borderRadius: '32px', overflow: 'hidden' }}>
            {/* Decorative SVG */}
            <svg aria-hidden="true" viewBox="0 0 1200 480" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
              <path d="M-20 340 C 200 300, 380 380, 620 300 S 1000 200, 1240 240" stroke="#9BD3DC" strokeWidth="18" fill="none"/>
              <path d="M300 -20 L 420 520 M820 -20 L 700 520 M-20 120 L 1240 180" stroke="#FFFFFF" strokeWidth="10" fill="none"/>
            </svg>
            {/* Map pin */}
            <div style={{ position: 'absolute', left: '58%', top: '42%', transform: 'translate(-50%, -100%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ width: '56px', height: '56px', borderRadius: '50% 50% 50% 0', transform: 'rotate(-45deg)', background: '#007A8C', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 12px 24px rgba(10,39,48,0.25)' }}>
                <span style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#C5D300' }} />
              </span>
            </div>
            {/* Info card */}
            <div style={{ position: 'absolute', left: 'clamp(16px,3vw,40px)', bottom: 'clamp(16px,3vw,40px)', maxWidth: '380px', background: '#FFFFFF', borderRadius: '24px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '10px', boxShadow: '0 24px 48px rgba(10,39,48,0.12)' }}>
              <h2 id="u-t" style={{ margin: 0, fontSize: '22px', letterSpacing: '-0.015em' }}>
                {lang === 'en' ? 'Visit us in Medellín' : 'Visítanos en Medellín'}
              </h2>
              <span style={{ fontSize: '15px', color: '#24414A' }}>
                {address ? <>{address}<br /></> : null}
                Medellín, Antioquia, Colombia
              </span>
              {hours && <span style={{ fontSize: '14px', color: '#4B5F66' }}>{hours}</span>}
              <a
                href="#"
                className="lnk"
                style={{ fontWeight: 700, fontSize: '15px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#007A8C' }}
              >
                {lang === 'en' ? 'Open in Google Maps' : 'Abrir en Google Maps'}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
