export const instant = false;

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { getPost, getPosts, getAllMedia } from '@/lib/content/collections';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import type { Lang, PostBlock } from '@/lib/content/types';
import { pick } from '@/lib/content/types';
import { slotUrl, mediaUrl } from '@/lib/content/collections';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  const lang = locale as Lang;
  const title = post.seo_title ? pick(post.seo_title, lang) : pick(post.title, lang);
  const description = post.seo_description ? pick(post.seo_description, lang) : pick(post.excerpt, lang);
  return { title, description };
}

function readingTime(blocks: PostBlock[]): number {
  const words = blocks
    .filter((b) => b.text)
    .map((b) => b.text!.split(' ').length)
    .reduce((a, b) => a + b, 0);
  return Math.max(1, Math.round(words / 200));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const lang = locale as Lang;

  const [post, mediaMap] = await Promise.all([
    getPost(slug),
    getAllMedia(),
  ]);

  if (!post) notFound();

  const title = pick(post.title, lang);
  const excerpt = pick(post.excerpt, lang);
  const blocks = (post.body[lang] ?? post.body.es) as PostBlock[];
  const coverSrc = post.cover_media_id ? mediaMap[post.cover_media_id] : null;
  const minutes = readingTime(blocks);
  const homeLabel = lang === 'en' ? 'Home' : 'Inicio';

  return (
    <>
      <div className="wrap pt-6">
        <Breadcrumbs
          crumbs={[{ label: 'Blog', href: '/blog' }, { label: title }]}
          homeLabel={homeLabel}
        />
      </div>

      <article className="py-[clamp(48px,6vw,80px)]">
        <div className="wrap max-w-[760px]">
          {/* Header */}
          <header className="mb-10">
            <div className="mb-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="rounded-pill bg-mist px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-teal-deep">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-[clamp(28px,4vw,46px)] font-extrabold leading-[1.1] tracking-[-0.03em] text-ink mb-4">
              {title}
            </h1>
            {excerpt && <p className="text-lg text-slate leading-relaxed mb-5">{excerpt}</p>}
            <p className="text-sm text-slate">
              {post.published_at && new Date(post.published_at).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}
              {' · '}
              {minutes} {lang === 'en' ? 'min read' : 'min de lectura'}
            </p>
          </header>

          {/* Cover */}
          {coverSrc && (
            <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-[var(--radius-card)]">
              <Image src={coverSrc} alt={title} fill className="object-cover" sizes="760px" priority />
            </div>
          )}

          {/* Body */}
          <div className="prose prose-lg max-w-none">
            {blocks.map((block, i) => {
              switch (block.type) {
                case 'h2':
                  return <h2 key={i} className="text-2xl font-extrabold text-ink mt-10 mb-4 tracking-tight">{block.text}</h2>;
                case 'p':
                  return <p key={i} className="text-ink leading-relaxed mb-5">{block.text}</p>;
                case 'quote':
                  return (
                    <blockquote key={i} className="my-6 border-l-4 border-teal pl-5 italic text-slate">
                      {block.text}
                    </blockquote>
                  );
                case 'img':
                  return block.src ? (
                    <figure key={i} className="my-8 overflow-hidden rounded-[20px]">
                      <img src={`/${block.src}`} alt="" className="w-full h-auto" loading="lazy" />
                    </figure>
                  ) : null;
                default:
                  return null;
              }
            })}
          </div>

          {/* Footer CTA */}
          <div className="mt-14 rounded-[var(--radius-card)] bg-dark p-8 text-center">
            <p className="text-xl font-extrabold text-white mb-2">
              {lang === 'en' ? '¿Ready to take the first step?' : '¿Listo para dar el primer paso?'}
            </p>
            <p className="text-[#BFD6DB] mb-6 text-sm">
              {lang === 'en' ? 'Request your free assessment.' : 'Solicita tu valoración gratuita.'}
            </p>
            <Link
              href="/contacto"
              className="btn inline-flex h-12 items-center rounded-[14px] bg-lime px-7 font-bold text-dark hover:bg-lime-hover transition-colors duration-[180ms] focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_#0A2730,0_0_0_6px_#C5D300]"
            >
              {lang === 'en' ? 'Free Assessment' : 'Valoración gratis'}
            </Link>
          </div>

          {/* Back link */}
          <div className="mt-8">
            <Link href="/blog" className="lnk inline-flex items-center gap-1.5 text-sm font-semibold text-teal-deep hover:underline">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              {lang === 'en' ? 'Back to blog' : 'Volver al blog'}
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
