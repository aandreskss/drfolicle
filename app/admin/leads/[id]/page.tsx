import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { serviceClient } from '@/lib/content/server-client';
import { SubmitBtn } from '@/components/admin/SubmitBtn';
import { updateLeadStatus } from './actions';

export const metadata: Metadata = { title: 'Solicitud' };

const STATUS_OPTIONS = [
  { value: 'nueva', label: 'Nueva' },
  { value: 'contactado', label: 'Contactado' },
  { value: 'valoracion_agendada', label: 'Valoración agendada' },
  { value: 'descartado', label: 'Descartado' },
];

export default async function LeadDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  const { id } = await params;
  const { saved } = await searchParams;
  const db = serviceClient();
  const { data: lead } = await db.from('leads').select('*').eq('id', id).single();
  if (!lead) notFound();

  const action = updateLeadStatus.bind(null, id);

  return (
    <div className="max-w-[700px]">
      <div className="mb-6 flex items-center gap-3">
        <Link href="/admin/leads" className="text-sm font-semibold text-slate hover:text-ink">← Solicitudes</Link>
        <span className="text-slate">/</span>
        <span className="text-sm font-semibold text-ink">{lead.name}</span>
      </div>

      {saved && (
        <div className="mb-4 rounded-[10px] border border-teal/20 bg-teal/5 px-4 py-3 text-sm font-semibold text-teal-deep">
          Estado actualizado ✓
        </div>
      )}

      <div className="rounded-[16px] border border-line bg-white p-6">
        <h1 className="text-xl font-extrabold text-ink">{lead.name}</h1>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 text-sm">
          <Info label="Email" value={lead.email} />
          <Info label="Teléfono" value={lead.phone ?? '—'} />
          <Info label="Origen" value={lead.source_page ?? '—'} />
          <Info label="Fecha" value={new Date(lead.created_at).toLocaleDateString('es', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })} />
        </div>
        {lead.interests?.length > 0 && (
          <div className="mt-4">
            <p className="text-xs font-bold uppercase tracking-widest text-slate mb-1">Intereses</p>
            <div className="flex flex-wrap gap-2">
              {(lead.interests as string[]).map((i: string) => (
                <span key={i} className="rounded-pill border border-line px-3 py-1 text-xs font-semibold text-ink">{i}</span>
              ))}
            </div>
          </div>
        )}
        {lead.message && (
          <div className="mt-4">
            <p className="text-xs font-bold uppercase tracking-widest text-slate mb-1">Mensaje</p>
            <p className="rounded-[8px] bg-mist px-4 py-3 text-sm text-ink">{lead.message}</p>
          </div>
        )}
      </div>

      <div className="mt-4 rounded-[16px] border border-line bg-white p-6">
        <h2 className="mb-4 font-extrabold text-ink">Gestión</h2>
        <form action={action} className="flex flex-col gap-4">
          <div>
            <label className="block mb-1 text-sm font-semibold text-ink">Estado</label>
            <select name="status" defaultValue={lead.status}
              className="w-full rounded-[8px] border border-line px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-teal/40">
              {STATUS_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block mb-1 text-sm font-semibold text-ink">Notas internas</label>
            <textarea name="notes" defaultValue={(lead as never as { notes?: string }).notes ?? ''}
              rows={3}
              className="w-full rounded-[8px] border border-line px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-teal/40"
              placeholder="Notas privadas sobre este contacto…" />
          </div>
          <div><SubmitBtn label="Actualizar" /></div>
        </form>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-widest text-slate mb-0.5">{label}</p>
      <p className="text-sm text-ink">{value}</p>
    </div>
  );
}
