import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { getPageSections } from '@/lib/content/sections';
import { getPosts, getAllMedia } from '@/lib/content/collections';
import { PageHero } from '@/components/sections/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import type { Lang } from '@/lib/content/types';
import { pick } from '@/lib/content/types';

export const metadata: Metadata = {
  title: 'Blog de restauración capilar',
  description: 'Artículos sobre trasplante capilar, técnica FUE, cuidado del cabello y turismo médico en Medellín.',
};

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const lang = locale as Lang;

  const [sections, posts, mediaMap] = await Promise.all([
    getPageSections('blog'),
    getPosts(),
    getAllMedia(),
  ]);

  const heroSection = sections.find((s) => s.key === 'hero');
  const homeLabel = lang === 'en' ? 'Home' : 'Inicio';

  return (
    <>
      <div className="wrap pt-6">
        <Breadcrumbs crumbs={[{ label: 'Blog' }]} homeLabel={homeLabel} />
      </div>

      {heroSection && <PageHero section={heroSection} lang={lang} />}

      <section className="py-[clamp(72px,9vw,128px)]">
        <div className="wrap">
          {posts.length === 0 ? (
            <p className="text-slate text-center py-20">
              {lang === 'en' ? 'No articles published yet.' : 'Aún no hay artículos publicados.'}
            </p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => {
                const title = pick(post.title, lang);
                const excerpt = pick(post.excerpt, lang);
                const coverSrc = post.cover_media_id ? mediaMap[post.cover_media_id] : null;
                return (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="card group flex flex-col rounded-[var(--radius-card)] border border-line bg-white overflow-hidden hover:border-teal transition-colors duration-150"
                  >
                    <div className="relative aspect-[16/9] bg-mist overflow-hidden">
                      {coverSrc ? (
                        <Image
                          src={coverSrc}
                          alt={title}
                          fill
                          className="object-cover"
                          sizes="(max-width:640px) 100vw, 33vw"
                        />
                      ) : (
                        <div className="h-full bg-mist" />
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="mb-3 flex flex-wrap gap-2">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="rounded-pill bg-mist px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-teal-deep">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h2 className="font-extrabold text-ink text-lg leading-tight flex-1">{title}</h2>
                      {excerpt && <p className="mt-2 text-sm text-slate leading-relaxed line-clamp-3">{excerpt}</p>}
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-teal-deep">
                        {lang === 'en' ? 'Read article' : 'Leer artículo'}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
