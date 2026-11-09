'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

type NavItem = { href: string; label: string; exact?: boolean; icon: React.ReactNode };
type NavGroup = { group: string | null; items: NavItem[] };

const ICON = (path: string | string[]) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {(Array.isArray(path) ? path : [path]).map((d, i) => <path key={i} d={d} />)}
  </svg>
);

const NAV: NavGroup[] = [
  {
    group: null,
    items: [
      {
        href: '/admin', label: 'Dashboard', exact: true,
        icon: ICON(['M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', 'M9 22V12h6v10']),
      },
    ],
  },
  {
    group: 'Gestión',
    items: [
      {
        href: '/admin/leads', label: 'Solicitudes',
        icon: ICON(['M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z', 'M22 6L12 13 2 6']),
      },
      {
        href: '/admin/blog', label: 'Blog',
        icon: ICON('M12 20h9 M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z'),
      },
      {
        href: '/admin/paginas', label: 'Páginas',
        icon: ICON(['M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z', 'M14 2v6h6']),
      },
    ],
  },
  {
    group: 'Colecciones',
    items: [
      {
        href: '/admin/tratamientos', label: 'Tratamientos',
        icon: ICON('M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'),
      },
      {
        href: '/admin/casos', label: 'Casos',
        icon: ICON(['M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z', 'M3.27 6.96L12 12.01l8.73-5.05 M12 22.08V12']),
      },
      {
        href: '/admin/equipo', label: 'Equipo',
        icon: ICON(['M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2', 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', 'M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75']),
      },
      {
        href: '/admin/testimonios', label: 'Testimonios',
        icon: ICON('M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'),
      },
      {
        href: '/admin/faqs', label: 'FAQs',
        icon: ICON(['M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z', 'M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3 M12 17h.01']),
      },
    ],
  },
  {
    group: 'Sistema',
    items: [
      {
        href: '/admin/medios', label: 'Medios',
        icon: ICON(['M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z', 'M8.5 10a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z M21 15l-5-5L5 21']),
      },
      {
        href: '/admin/ajustes', label: 'Ajustes',
        icon: ICON(['M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', 'M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z']),
      },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(href + '/');
  }

  return (
    <aside className="flex h-full w-[220px] shrink-0 flex-col bg-[#0A2730] text-white">
      {/* Brand */}
      <div className="flex h-14 items-center border-b border-white/10 px-5">
        <span className="text-sm font-extrabold tracking-tight">Dr Follicle</span>
        <span className="ml-1.5 rounded-[4px] bg-white/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[#9BD3DC]">
          Panel
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {NAV.map((group, gi) => (
          <div key={gi} className={gi > 0 ? 'mt-5' : ''}>
            {group.group && (
              <p className="mb-1.5 px-2 text-[10px] font-bold uppercase tracking-widest text-white/30">
                {group.group}
              </p>
            )}
            <ul className="flex flex-col gap-0.5">
              {group.items.map((item) => {
                const active = isActive(item.href, item.exact);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-2.5 rounded-[8px] px-3 py-2 text-sm font-semibold transition-colors duration-100 ${
                        active
                          ? 'bg-white/15 text-white'
                          : 'text-white/60 hover:bg-white/8 hover:text-white'
                      }`}
                    >
                      <span className={active ? 'text-[#9BD3DC]' : ''}>{item.icon}</span>
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 px-5 py-3">
        <p className="text-[10px] text-white/25">© 2025 Dr Follicle Solutions</p>
      </div>
    </aside>
  );
}
