import type { Metadata } from 'next';
import Link from 'next/link';
import { serviceClient } from '@/lib/content/server-client';
import { SubmitBtn } from '@/components/admin/SubmitBtn';
import { toggleTreatmentVisible } from './[id]/actions';

export const metadata: Metadata = { title: 'Tratamientos' };

export default async function TratamientosPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const { data: treatments } = await serviceClient()
    .from('treatments')
    .select('id,position,name,short,page_slug,show_home,show_menu,show_footer,visible')
    .order('position');

  return (
    <div className="max-w-[1000px]">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-ink">Tratamientos</h1>
        <p className="mt-0.5 text-sm text-slate">{treatments?.length ?? 0} tratamientos</p>
      </div>

      {saved && <div className="mb-4 rounded-[10px] border border-teal/20 bg-teal/5 px-4 py-3 text-sm font-semibold text-teal-deep">Guardado ✓</div>}

      <div className="rounded-[16px] border border-line bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line">
              {['Nombre', 'Slug', 'Inicio', 'Menú', 'Pie', 'Estado', 'Acciones'].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-slate">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {(treatments ?? []).map((t) => {
              const name = (t.name as { es: string }).es;
              return (
                <tr key={t.id} className="hover:bg-mist/30">
                  <td className="px-4 py-3 font-semibold text-ink">{name}</td>
                  <td className="px-4 py-3 text-slate text-xs">{t.page_slug ?? '—'}</td>
                  <td className="px-4 py-3 text-center">{t.show_home   ? '✓' : '—'}</td>
                  <td className="px-4 py-3 text-center">{t.show_menu   ? '✓' : '—'}</td>
                  <td className="px-4 py-3 text-center">{t.show_footer ? '✓' : '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-pill px-2.5 py-1 text-[11px] font-bold ${t.visible ? 'bg-teal/10 text-teal-deep' : 'bg-danger-bg text-danger'}`}>
                      {t.visible ? 'Visible' : 'Oculto'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <form action={toggleTreatmentVisible}>
                        <input type="hidden" name="id" value={t.id} />
                        <input type="hidden" name="visible" value={String(t.visible)} />
                        <SubmitBtn label={t.visible ? 'Ocultar' : 'Publicar'} variant={t.visible ? 'danger' : 'primary'} />
                      </form>
                      <Link href={`/admin/tratamientos/${t.id}`}
                        className="rounded-[8px] border border-line px-4 py-2 text-sm font-semibold text-ink hover:border-teal/40">
                        Editar
                      </Link>
                    </div>
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
