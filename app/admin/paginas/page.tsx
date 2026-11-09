import type { Metadata } from 'next';
import Link from 'next/link';
import { serviceClient } from '@/lib/content/server-client';

export const metadata: Metadata = { title: 'Páginas' };

export default async function PaginasPage() {
  const db = serviceClient();
  const { data: pages } = await db
    .from('pages')
    .select('slug,route,title,english_enabled')
    .order('slug');

  const { data: sectionCounts } = await db
    .from('page_sections')
    .select('page_slug, id');

  const countMap: Record<string, number> = {};
  sectionCounts?.forEach((s) => {
    countMap[s.page_slug] = (countMap[s.page_slug] ?? 0) + 1;
  });

  return (
    <div className="max-w-[900px]">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-ink">Páginas</h1>
        <p className="mt-0.5 text-sm text-slate">Editor de contenido por sección</p>
      </div>

      <div className="rounded-[16px] border border-line bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line">
              {['Página', 'Ruta', 'Secciones', 'Inglés', 'Acciones'].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-slate">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {(pages ?? []).map((p) => {
              const title = (p.title as { es: string }).es;
              return (
                <tr key={p.slug} className="hover:bg-mist/30">
                  <td className="px-4 py-3 font-semibold text-ink">{title}</td>
                  <td className="px-4 py-3 text-xs text-slate">{p.route}</td>
                  <td className="px-4 py-3 text-slate">{countMap[p.slug] ?? 0} secciones</td>
                  <td className="px-4 py-3 text-center">{p.english_enabled ? '✓' : '—'}</td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/paginas/${p.slug}`}
                      className="rounded-[8px] border border-line px-4 py-2 text-sm font-semibold text-ink hover:border-teal/40">
                      Editar secciones →
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
