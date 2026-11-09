import { Link } from '@/i18n/navigation';

export interface Crumb {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  crumbs: Crumb[];
  homeLabel?: string;
}

export function Breadcrumbs({ crumbs, homeLabel = 'Inicio' }: BreadcrumbsProps) {
  const all: Crumb[] = [{ label: homeLabel, href: '/' }, ...crumbs];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: c.href } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Migas de pan">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-slate">
          {all.map((crumb, i) => {
            const isLast = i === all.length - 1;
            return (
              <li key={i} className="flex items-center gap-1.5">
                {i > 0 && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                )}
                {isLast || !crumb.href ? (
                  <span className={isLast ? 'font-semibold text-ink' : ''}>{crumb.label}</span>
                ) : (
                  <Link href={crumb.href} className="hover:text-teal-deep transition-colors duration-150 underline-offset-2 hover:underline">
                    {crumb.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
