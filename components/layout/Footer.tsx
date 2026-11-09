import Image from 'next/image';
import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getSettings } from '@/lib/content/settings';
import { getTreatments } from '@/lib/content/collections';
import type { I18n } from '@/lib/content/types';

interface NavItem {
  position: number;
  label: I18n;
  href: string;
  visible: boolean;
}

interface FooterSettings {
  desc: string;
  legal: string;
  links: string[];
}

interface ContactSettings {
  phone: string;
  email: string;
  city: string;
}

interface SocialItem {
  name: string;
  url: string;
  on: boolean;
}

const socialIcons: Record<string, React.ReactNode> = {
  Instagram: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  Facebook: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  YouTube: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
    </svg>
  ),
  TikTok: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.72a8.19 8.19 0 0 0 4.79 1.53V6.79a4.85 4.85 0 0 1-1.02-.1z" />
    </svg>
  ),
};

const pageHrefs: Record<string, string> = {
  'Nosotros': '/nosotros',
  'Nuestro método': '/nuestro-metodo',
  'Resultados': '/resultados',
  'Turismo médico': '/turismo-medico',
  'Blog': '/blog',
  'Contacto': '/contacto',
};

export async function Footer() {
  const [footer, contact, social, treatments, navItems, t, locale] = await Promise.all([
    getSettings<FooterSettings>('footer'),
    getSettings<ContactSettings>('contact'),
    getSettings<SocialItem[]>('social'),
    getTreatments(),
    getSettings<NavItem[]>('nav_main'),
    getTranslations('footer'),
    getLocale(),
  ]);

  const lang = locale as 'es' | 'en';
  const pickLabel = (i18n: I18n) => i18n[lang] || i18n.es;

  const footerTreatments = treatments.filter((tr) => tr.show_footer);
  const activeSocial = (social ?? []).filter((s) => s.on);
  const footerLinks = footer?.links ?? [];
  const navMap = Object.fromEntries(
    (navItems ?? []).map((n) => [n.label.es, n.href])
  );

  return (
    <footer className="bg-dark text-white">
      <div className="wrap py-16 md:py-20">
        <div className="grid gap-10 md:gap-12 g-foot">
          {/* Col 1: Brand */}
          <div className="space-y-5 md:col-span-2 lg:col-span-1">
            <Link href="/" aria-label="Dr Follicle Solutions — inicio">
              <Image
                src="/images/logo-white.png"
                alt="Dr Follicle Solutions"
                width={160}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            {footer?.desc && (
              <p className="text-sm leading-relaxed text-[#BFD6DB] max-w-[36ch]">{footer.desc}</p>
            )}
            {activeSocial.length > 0 && (
              <div>
                <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#9BD3DC]">
                  {t('followUs')}
                </p>
                <div className="flex gap-3">
                  {activeSocial.map((s) => (
                    <a
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.name}
                      className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-white/10 text-white hover:bg-teal hover:text-white transition-colors duration-[180ms] focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_#0A2730,0_0_0_6px_#C5D300]"
                    >
                      {socialIcons[s.name] ?? s.name[0]}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Col 2: Services */}
          {footerTreatments.length > 0 && (
            <div>
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.16em] text-[#9BD3DC]">
                {t('services')}
              </p>
              <ul className="space-y-2">
                {footerTreatments.map((tr) => (
                  <li key={tr.id}>
                    <Link
                      href={tr.page_slug ? `/${tr.page_slug}` : '/servicios'}
                      className="text-sm text-white/80 hover:text-white transition-colors duration-150 focus-visible:outline-none focus-visible:underline"
                    >
                      {pickLabel(tr.name)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Col 3: Pages */}
          {footerLinks.length > 0 && (
            <div>
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.16em] text-[#9BD3DC]">
                {t('pages')}
              </p>
              <ul className="space-y-2">
                {footerLinks.map((label) => {
                  const href = navMap[label] ?? pageHrefs[label] ?? '#';
                  return (
                    <li key={label}>
                      <Link
                        href={href}
                        className="text-sm text-white/80 hover:text-white transition-colors duration-150 focus-visible:outline-none focus-visible:underline"
                      >
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {/* Col 4: Contact */}
          {contact && (
            <div>
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.16em] text-[#9BD3DC]">
                {t('contact')}
              </p>
              <ul className="space-y-3 text-sm text-white/80">
                <li>
                  <a
                    href={`tel:${contact.phone.replace(/\s/g, '')}`}
                    className="hover:text-white transition-colors duration-150"
                  >
                    {contact.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    className="hover:text-white transition-colors duration-150 break-all"
                  >
                    {contact.email}
                  </a>
                </li>
                {contact.city && (
                  <li className="text-white/60">{contact.city}</li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Legal bar */}
      <div className="border-t border-white/10">
        <div className="wrap flex flex-wrap items-center justify-between gap-3 py-5 text-xs text-white/40">
          <span>{footer?.legal}</span>
          <a
            href="https://drfolliclesolutions.com/privacidad-seguridad-y-condiciones/"
            className="hover:text-white/70 transition-colors duration-150 underline-offset-2 hover:underline"
          >
            {t('privacyPolicy')}
          </a>
        </div>
      </div>
    </footer>
  );
}
