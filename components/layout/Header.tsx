import { getLocale, getTranslations } from 'next-intl/server';
import { getSettings } from '@/lib/content/settings';
import { getTreatments } from '@/lib/content/collections';
import { HeaderInner } from './HeaderInner';
import type { I18n } from '@/lib/content/types';

interface NavItem {
  position: number;
  label: I18n;
  href: string;
  visible: boolean;
  has_submenu: boolean;
}

interface ButtonsSettings {
  cta: string;
}

const EN_NAV_LABELS: Record<string, string> = {
  '/': 'Home',
  '/servicios': 'Services',
  '/nuestro-metodo': 'Our method',
  '/turismo-medico': 'Medical tourism',
  '/resultados': 'Results',
  '/blog': 'Blog',
  '/contacto': 'Contact',
  '/nosotros': 'About us',
};

export async function Header() {
  const [navItems, treatments, buttons, t, tSite, locale] = await Promise.all([
    getSettings<NavItem[]>('nav_main'),
    getTreatments(),
    getSettings<ButtonsSettings>('buttons'),
    getTranslations('nav'),
    getTranslations('site'),
    getLocale(),
  ]);

  const enrichedNavItems = (navItems ?? []).map((item) => ({
    ...item,
    label: {
      ...item.label,
      en: item.label.en || EN_NAV_LABELS[item.href] || item.label.es,
    },
  }));

  const ctaLabel = locale === 'en' ? tSite('cta') : (buttons?.cta ?? 'Valoración gratis');

  return (
    <HeaderInner
      navItems={enrichedNavItems}
      treatments={treatments}
      ctaLabel={ctaLabel}
      labelOpenMenu={t('openMenu')}
      labelCloseMenu={t('closeMenu')}
      labelLang={t('lang')}
      labelSkip={t('skipToContent')}
      labelViewAll={t('viewAllServices')}
    />
  );
}
