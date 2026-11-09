import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { serviceClient } from '@/lib/content/server-client';

export const metadata: Metadata = { title: 'Secciones' };

export default async function PageSectionsPage({ params }: { params: Promise<{ pageSlug: string }> }) {
  const { pageSlug } = await params;
  const db = serviceClient();

  const { data: page } = await db.from('pages').select('slug,title').eq('slug', pageSlug).single();
  if (!page) notFound();

  const { data: sections } = await db
    .from('page_sections')
    .select('id,key,name,position,visible,published_visible,source_collection')
    .eq('page_slug', pageSlug)
    .order('position');

  const title = (page.title as { es: string }).es;

  return (
    <div className="max-w-[900px]">
      <div className="mb-6 flex items-center gap-3">
        <Link href="/admin/paginas" className="text-sm font-semibold text-slate hover:text-ink">← Páginas</Link>
        <span className="text-slate">/</span>
        <span className="text-sm font-semibold text-ink">{title}</span>
      </div>

      <div className="rounded-[16px] border border-line bg-white">
        {!sections || sections.length === 0 ? (
          <p className="px-6 py-12 text-center text-sm text-slate">No hay secciones para esta página.</p>
        ) : (
          <ul className="divide-y divide-line">
            {sections.map((s) => (
              <li key={s.id} className="flex items-center gap-4 px-5 py-4">
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-ink">{s.name}</p>
                  <div className="mt-0.5 flex items-center gap-3 text-xs text-slate">
                    <span className="font-mono">{s.key}</span>
                    <span>pos: {s.position}</span>
                    {s.source_collection && <span>→ {s.source_collection}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className={`rounded-pill px-2.5 py-1 text-[11px] font-bold ${
                    s.published_visible ? 'bg-teal/10 text-teal-deep' : 'bg-danger-bg text-danger'
                  }`}>
                    {s.published_visible ? 'Visible' : 'Oculta'}
                  </span>
                  <Link href={`/admin/paginas/${pageSlug}/${s.key}`}
                    className="rounded-[8px] border border-line px-4 py-2 text-sm font-semibold text-ink hover:border-teal/40">
                    Editar →
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
