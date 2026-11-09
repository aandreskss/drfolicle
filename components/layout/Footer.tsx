import { getLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getSettings } from '@/lib/content/settings';
import { getTreatments } from '@/lib/content/collections';
import type { I18n } from '@/lib/content/types';

interface FooterSettings {
  desc: I18n | string;
  legal: string;
}

interface ContactSettings {
  phone: string;
  wa: string;
  email: string;
  address: string;
  city: string;
  hours: string;
}

interface SocialItem {
  name: string;
  url: string;
  on: boolean;
}

interface NavItem {
  label: I18n;
  href: string;
  visible: boolean;
}

const socialIcons: Record<string, React.ReactNode> = {
  Instagram: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="0.8" fill="currentColor"/>
    </svg>
  ),
  Facebook: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
      <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z"/>
    </svg>
  ),
  YouTube: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true">
      <rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="M10 9.5v5l4.5-2.5z" fill="currentColor"/>
    </svg>
  ),
  TikTok: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.72a8.19 8.19 0 0 0 4.79 1.53V6.79a4.85 4.85 0 0 1-1.02-.1z"/>
    </svg>
  ),
};

const exploreLinks = [
  { es: 'Nosotros', en: 'About us', href: '/nosotros' },
  { es: 'Nuestro método', en: 'Our method', href: '/nuestro-metodo' },
  { es: 'Turismo médico', en: 'Medical tourism', href: '/turismo-medico' },
  { es: 'Resultados', en: 'Results', href: '/resultados' },
  { es: 'Blog', en: 'Blog', href: '/blog' },
  { es: 'Contacto', en: 'Contact', href: '/contacto' },
];

export async function Footer() {
  const [footer, contact, social, treatments, locale] = await Promise.all([
    getSettings<FooterSettings>('footer'),
    getSettings<ContactSettings>('contact'),
    getSettings<SocialItem[]>('social'),
    getTreatments(),
    getLocale(),
  ]);

  const lang = locale as 'es' | 'en';
  const pickLabel = (i18n: I18n) => i18n[lang] || i18n.es;

  const footerTreatments = treatments.filter((tr) => tr.show_footer);
  const activeSocial = (social ?? []).filter((s) => s.on);

  const desc = footer?.desc
    ? typeof footer.desc === 'string' ? footer.desc : (footer.desc[lang] || footer.desc.es)
    : (lang === 'en'
      ? 'Hair restoration clinic in Medellín, Colombia. Hair, beard, and eyebrow transplants for national and international patients.'
      : 'Clínica de restauración capilar en Medellín, Colombia. Trasplante capilar, de barba y de cejas para pacientes nacionales e internacionales.');

  const waNumber = contact?.wa ?? contact?.phone ?? '19548535335';
  const waClean = waNumber.replace(/\D/g, '');
  const waDisplay = contact?.phone ?? '+1 (954) 853-5335';

  const legalText = footer?.legal ?? `© ${new Date().getFullYear()} Dr. Follicle Solutions Inc`;

  return (
    <footer style={{ background: '#0A2730', color: '#FFFFFF', padding: 'clamp(64px,7vw,96px) 0 32px' }}>
      <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: '56px' }}>

        {/* Grid */}
        <div className="g-foot" style={{ display: 'grid', gap: '40px' }}>

          {/* Col 1: Brand + desc + CTA */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '360px' }}>
            <Link href="/" aria-label={lang === 'en' ? 'Dr Follicle Solutions, home' : 'Dr Follicle Solutions, inicio'}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo-white.png" alt="Dr Follicle Solutions" style={{ height: '64px', width: 'auto', alignSelf: 'flex-start', display: 'block' }} />
            </Link>
            <p style={{ margin: 0, fontSize: '15px', color: '#BFD6DB' }}>{desc}</p>
            <Link
              href="/contacto"
              className="btn"
              style={{ alignSelf: 'flex-start', height: '52px', padding: '0 22px', borderRadius: '14px', background: '#C5D300', color: '#0A2730', fontWeight: 700, fontSize: '15px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
            >
              {lang === 'en' ? 'Free assessment' : 'Valoración gratis'}
            </Link>
          </div>

          {/* Col 2: Explora */}
          <nav aria-label={lang === 'en' ? 'Explore' : 'Explora'} style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '15px' }}>
            <strong style={{ fontSize: '12px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#9BD3DC' }}>
              {lang === 'en' ? 'Explore' : 'Explora'}
            </strong>
            {exploreLinks.map((l) => (
              <Link key={l.href} href={l.href} style={{ color: '#FFFFFF', textDecoration: 'none' }}>
                {lang === 'en' ? l.en : l.es}
              </Link>
            ))}
          </nav>

          {/* Col 3: Servicios */}
          <nav aria-label={lang === 'en' ? 'Services' : 'Servicios'} style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '15px' }}>
            <strong style={{ fontSize: '12px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#9BD3DC' }}>
              {lang === 'en' ? 'Services' : 'Servicios'}
            </strong>
            {footerTreatments.map((tr) => (
              <Link
                key={tr.id}
                href={tr.page_slug ? `/servicios/${tr.page_slug}` : '/servicios'}
                style={{ color: '#FFFFFF', textDecoration: 'none' }}
              >
                {pickLabel(tr.name)}
              </Link>
            ))}
          </nav>

          {/* Col 4: Contacto + redes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '15px' }}>
            <strong style={{ fontSize: '12px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#9BD3DC' }}>
              {lang === 'en' ? 'Contact' : 'Contacto'}
            </strong>
            <a
              href={`https://wa.me/${waClean}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#FFFFFF', textDecoration: 'none' }}
            >
              {waDisplay} · WhatsApp
            </a>
            {contact?.email && (
              <a href={`mailto:${contact.email}`} style={{ color: '#FFFFFF', textDecoration: 'none' }}>
                {contact.email}
              </a>
            )}
            <span style={{ color: '#BFD6DB' }}>
              {contact?.city ?? 'Medellín, Antioquia, Colombia'}
              {(contact?.address || contact?.hours) && (
                <><br />{[contact?.address, contact?.hours].filter(Boolean).join(' · ')}</>
              )}
            </span>
            {activeSocial.length > 0 && (
              <div style={{ display: 'flex', gap: '8px', paddingTop: '8px' }}>
                {activeSocial.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.3)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}
                  >
                    {socialIcons[s.name] ?? s.name[0]}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Tagline decorativa */}
        <div aria-hidden="true" style={{ fontSize: 'clamp(56px,11vw,168px)', lineHeight: 0.9, letterSpacing: '-0.05em', fontWeight: 800, color: '#12343E' }}>
          {lang === 'en' ? <>From the <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: 'italic', fontWeight: 400, color: '#0E5C72' }}>root.</span></> : <>Desde la <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: 'italic', fontWeight: 400, color: '#0E5C72' }}>raíz.</span></>}
        </div>

        {/* Barra legal */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '16px', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '24px', fontSize: '13px', color: '#BFD6DB' }}>
          <span>{legalText}</span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            <a href="https://drfolliclesolutions.com/privacidad-seguridad-y-condiciones/" style={{ color: '#BFD6DB', textDecoration: 'none' }}>
              {lang === 'en' ? 'Privacy, security and terms' : 'Privacidad, seguridad y condiciones'}
            </a>
            <a href="https://drfolliclesolutions.com/privacidad-seguridad-y-condiciones/" style={{ color: '#BFD6DB', textDecoration: 'none' }}>
              {lang === 'en' ? 'Data processing' : 'Tratamiento de datos'}
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
