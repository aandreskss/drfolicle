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

export async function Header() {
  const [navItems, treatments, buttons, t] = await Promise.all([
    getSettings<NavItem[]>('nav_main'),
    getTreatments(),
    getSettings<ButtonsSettings>('buttons'),
    getTranslations('nav'),
  ]);

  return (
    <HeaderInner
      navItems={navItems ?? []}
      treatments={treatments}
      ctaLabel={buttons?.cta ?? 'Valoración gratis'}
      labelOpenMenu={t('openMenu')}
      labelCloseMenu={t('closeMenu')}
      labelLang={t('lang')}
    />
  );
}
