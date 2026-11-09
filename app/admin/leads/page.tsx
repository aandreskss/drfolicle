import type { Metadata } from 'next';
import { serviceClient } from '@/lib/content/server-client';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Solicitudes' };

const STATUS_LABEL: Record<string, string> = {
  nueva: 'Nueva', contactado: 'Contactado',
  valoracion_agendada: 'Agendado', descartado: 'Descartado',
};
const STATUS_COLOR: Record<string, string> = {
  nueva: 'bg-teal/10 text-teal-deep',
  contactado: 'bg-warn-bg text-warn',
  valoracion_agendada: 'bg-mist text-teal-deep',
  descartado: 'bg-danger-bg text-danger',
};

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const db = serviceClient();

  let q = db
    .from('leads')
    .select('id,name,email,phone,interests,message,source_page,status,created_at')
    .order('created_at', { ascending: false });
  if (status) q = q.eq('status', status);

  const { data: leads } = await q;

  const filters = [
    { label: 'Todas', value: '' },
    { label: 'Nuevas', value: 'nueva' },
    { label: 'Contactadas', value: 'contactado' },
    { label: 'Agendadas', value: 'valoracion_agendada' },
    { label: 'Descartadas', value: 'descartado' },
  ];

  return (
    <div className="max-w-[1100px]">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-ink">Solicitudes</h1>
        <p className="mt-0.5 text-sm text-slate">{leads?.length ?? 0} solicitudes encontradas</p>
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap gap-2">
        {filters.map((f) => (
          <Link
            key={f.value}
            href={f.value ? `/admin/leads?status=${f.value}` : '/admin/leads'}
            className={`rounded-pill px-4 py-1.5 text-sm font-semibold transition-colors ${
              (status ?? '') === f.value
                ? 'bg-teal text-white'
                : 'border border-line bg-white text-slate hover:border-teal/40 hover:text-ink'
            }`}
          >
            {f.label}
          </Link>
        ))}
      </div>

      <div className="rounded-[16px] border border-line bg-white">
        {!leads || leads.length === 0 ? (
          <p className="px-6 py-12 text-center text-sm text-slate">No hay solicitudes.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line">
                  {['Nombre', 'Email', 'Teléfono', 'Intereses', 'Estado', 'Fecha'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-slate">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {leads.map((l) => (
                  <tr key={l.id} className="hover:bg-mist/30">
                    <td className="px-4 py-3 font-semibold text-ink">
                      <Link href={`/admin/leads/${l.id}`} className="hover:text-teal-deep hover:underline">
                        {l.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-slate">{l.email}</td>
                    <td className="px-4 py-3 text-slate">{l.phone ?? '—'}</td>
                    <td className="px-4 py-3 text-slate">{(l.interests as string[]).slice(0, 2).join(', ') || '—'}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-pill px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${STATUS_COLOR[l.status] ?? 'bg-mist text-slate'}`}>
                        {STATUS_LABEL[l.status] ?? l.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate">
                      {new Date(l.created_at).toLocaleDateString('es', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
