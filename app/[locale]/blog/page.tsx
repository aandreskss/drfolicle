import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getPosts, getAllMedia } from '@/lib/content/collections';
import { BlogClient } from '@/components/blog/BlogClient';
import type { BlogPost } from '@/components/blog/BlogClient';
import type { Lang } from '@/lib/content/types';
import { pick } from '@/lib/content/types';
import { Link } from '@/i18n/navigation';

export const metadata: Metadata = {
  title: 'Blog de restauración capilar',
  description: 'Artículos sobre trasplante capilar, técnica FUE, cuidado del cabello y turismo médico en Medellín.',
};

function formatDate(iso: string | null, lang: Lang): string {
  if (!iso) return '';
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(lang === 'en' ? 'en-US' : 'es-CO', { day: 'numeric', month: 'short' });
  } catch {
    return '';
  }
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const lang = locale as Lang;

  const [posts, mediaMap] = await Promise.all([
    getPosts(),
    getAllMedia(),
  ]);

  const converted: BlogPost[] = posts.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: pick(p.title, lang),
    excerpt: pick(p.excerpt, lang),
    coverSrc: p.cover_media_id ? (mediaMap[p.cover_media_id] ?? null) : null,
    cat: p.tags[0] ?? '',
    date: formatDate(p.published_at, lang),
    author: lang === 'en' ? 'Dr Follicle Team' : 'Equipo Dr Follicle',
  }));

  const homeLabel = lang === 'en' ? 'Home' : 'Inicio';

  return (
    <main>
      <section aria-labelledby="h-t" style={{ padding: 'clamp(40px,6vw,80px) 0 clamp(72px,9vw,128px)' }}>
        <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {/* Breadcrumbs */}
          <nav aria-label={lang === 'en' ? 'Breadcrumb' : 'Ruta'} style={{ fontSize: '13px', color: '#4B5F66', display: 'flex', gap: '8px' }}>
            <Link href="/" style={{ color: '#4B5F66', textDecoration: 'none' }}>{homeLabel}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" style={{ color: '#0A2730', fontWeight: 600 }}>Blog</span>
          </nav>

          <BlogClient posts={converted} lang={lang} />
        </div>
      </section>
    </main>
  );
}
