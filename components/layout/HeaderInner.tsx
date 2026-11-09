'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import type { I18n } from '@/lib/content/types';

interface NavItem {
  position: number;
  label: I18n;
  href: string;
  visible: boolean;
  has_submenu: boolean;
}

interface Treatment {
  id: string;
  name: I18n;
  short: I18n;
  page_slug: string | null;
  show_menu: boolean;
}

interface HeaderInnerProps {
  navItems: NavItem[];
  treatments: Treatment[];
  ctaLabel: string;
  labelOpenMenu: string;
  labelCloseMenu: string;
  labelLang: string;
}

export function HeaderInner({
  navItems,
  treatments,
  ctaLabel,
  labelOpenMenu,
  labelCloseMenu,
  labelLang,
}: HeaderInnerProps) {
  const locale = useLocale() as 'es' | 'en';
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuTreatments = treatments.filter((t) => t.show_menu);

  const pickLabel = (i18n: I18n) => i18n[locale] || i18n.es;

  function switchLocale(next: 'es' | 'en') {
    router.replace(pathname, { locale: next });
  }

  // Close dropdown on outside click
  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const visibleNav = navItems.filter((n) => n.visible).sort((a, b) => a.position - b.position);

  return (
    <>
      {/* Skip link */}
      <a
        href="#main-content"
        className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:top-4 focus-visible:left-4 focus-visible:z-50 focus-visible:rounded-[10px] focus-visible:bg-teal focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:font-bold focus-visible:text-white"
      >
        {labelOpenMenu === 'Abrir menú' ? 'Ir al contenido principal' : 'Skip to main content'}
      </a>

      <header
        className="sticky top-0 z-30 border-b border-line"
        style={{ background: 'rgba(247,248,245,0.92)', backdropFilter: 'blur(12px)' }}
      >
        <div className="wrap flex h-[88px] items-center justify-between gap-6 max-[1100px]:h-16">
          {/* Logo */}
          <Link href="/" aria-label="Dr Follicle Solutions — inicio" className="shrink-0">
            <Image
              src="/images/logo-color.png"
              alt="Dr Follicle Solutions"
              width={160}
              height={40}
              className="h-9 w-auto"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Principal" className="nav-links flex items-center gap-7 text-[15px] font-semibold">
            {visibleNav.map((item) =>
              item.has_submenu ? (
                <div key={item.position} className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    aria-expanded={dropdownOpen}
                    aria-haspopup="true"
                    onClick={() => setDropdownOpen((v) => !v)}
                    className="flex items-center gap-1.5 py-2 text-ink hover:text-teal-deep transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:text-teal-deep"
                  >
                    {pickLabel(item.label)}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      aria-hidden="true"
                      className={`transition-transform duration-[180ms] ${dropdownOpen ? 'rotate-180' : ''}`}
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>

                  {/* Dropdown panel */}
                  {dropdownOpen && (
                    <div
                      className="absolute top-[calc(100%+16px)] left-1/2 -translate-x-1/2 w-max max-w-[520px] rounded-[0_0_24px_24px] bg-white p-7 shadow-[0_32px_64px_rgba(10,39,48,0.10)]"
                      role="menu"
                    >
                      <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${Math.min(menuTreatments.length, 2)}, minmax(180px, 1fr))` }}>
                        {menuTreatments.map((t) => (
                          <Link
                            key={t.id}
                            href={t.page_slug ? `/${t.page_slug}` : item.href}
                            role="menuitem"
                            onClick={() => setDropdownOpen(false)}
                            className="rounded-[14px] border border-line p-4 hover:border-teal hover:bg-mist transition-all duration-150 focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_#0196AD]"
                          >
                            <p className="font-bold text-ink">{pickLabel(t.name)}</p>
                            <p className="mt-0.5 text-sm text-slate">{pickLabel(t.short)}</p>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-4 border-t border-line pt-4">
                        <Link
                          href={item.href}
                          role="menuitem"
                          onClick={() => setDropdownOpen(false)}
                          className="text-sm font-semibold text-teal-deep hover:underline"
                        >
                          Ver todos los servicios →
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.position}
                  href={item.href}
                  className="py-2 text-ink hover:text-teal-deep transition-colors duration-150 focus-visible:outline-none focus-visible:text-teal-deep"
                >
                  {pickLabel(item.label)}
                </Link>
              )
            )}
          </nav>

          {/* Right side: lang + CTA + hamburger */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Language toggle */}
            <div
              role="group"
              aria-label={labelLang}
              className="hide-sm flex rounded-pill border border-line-strong p-[3px]"
            >
              {(['es', 'en'] as const).map((lng) => (
                <button
                  key={lng}
                  type="button"
                  aria-pressed={locale === lng}
                  onClick={() => switchLocale(lng)}
                  className={`h-8 rounded-pill px-3 text-[13px] font-bold transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_#0196AD] ${
                    locale === lng
                      ? 'bg-ink text-white'
                      : 'bg-transparent text-slate hover:text-ink'
                  }`}
                >
                  {lng.toUpperCase()}
                </button>
              ))}
            </div>

            {/* CTA button */}
            <Link
              href="/contacto"
              className="btn hidden h-12 items-center rounded-[14px] bg-teal-deep px-5 text-[15px] font-bold text-white hover:bg-teal-petroleo transition-colors duration-[180ms] focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_#F7F8F5,0_0_0_6px_#0196AD] sm:inline-flex"
            >
              {ctaLabel}
            </Link>

            {/* Hamburger */}
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? labelCloseMenu : labelOpenMenu}
              onClick={() => setMenuOpen((v) => !v)}
              className="menu-btn btn flex h-12 w-12 items-center justify-center rounded-[14px] border-[1.5px] border-ink bg-transparent text-ink hover:bg-ink hover:text-white transition-all duration-[180ms] focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_#F7F8F5,0_0_0_6px_#0196AD]"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                {menuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <nav
          aria-label="Menú móvil"
          className="fixed top-16 left-0 right-0 z-20 border-b border-line bg-ground px-5 pb-6 pt-2 shadow-[0_24px_48px_rgba(10,39,48,0.12)]"
        >
          {visibleNav.map((item) => (
            <Link
              key={item.position}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="flex border-b border-line py-[14px] text-[26px] font-extrabold tracking-[-0.02em] text-ink hover:text-teal-deep transition-colors duration-150"
            >
              {pickLabel(item.label)}
            </Link>
          ))}
          <div className="mt-5 flex gap-3">
            <Link
              href="/contacto"
              onClick={() => setMenuOpen(false)}
              className="btn flex flex-1 h-14 items-center justify-center rounded-[14px] bg-teal-deep text-base font-bold text-white hover:bg-teal-petroleo transition-colors duration-[180ms]"
            >
              {ctaLabel}
            </Link>
            {/* Lang switcher in mobile menu */}
            <div role="group" aria-label={labelLang} className="flex rounded-pill border border-line-strong p-[2px]">
              {(['es', 'en'] as const).map((lng) => (
                <button
                  key={lng}
                  type="button"
                  aria-pressed={locale === lng}
                  onClick={() => { switchLocale(lng); setMenuOpen(false); }}
                  className={`h-11 min-w-[44px] rounded-pill px-3 text-sm font-bold transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_#0196AD] ${
                    locale === lng ? 'bg-ink text-white' : 'bg-transparent text-slate'
                  }`}
                >
                  {lng.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </nav>
      )}
    </>
  );
}
