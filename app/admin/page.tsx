import type { Metadata } from 'next';
import { serviceClient } from '@/lib/content/server-client';

export const metadata: Metadata = { title: 'Dashboard' };

type Lead = {
  id: string;
  name: string;
  email: string;
  interests: string[];
  status: string;
  created_at: string;
};

const STATUS_LABELS: Record<string, string> = {
  nueva: 'Nueva',
  contactado: 'Contactado',
  valoracion_agendada: 'Agendado',
  descartado: 'Descartado',
};

const STATUS_COLORS: Record<string, string> = {
  nueva: 'bg-teal/10 text-teal-deep',
  contactado: 'bg-warn-bg text-warn',
  valoracion_agendada: 'bg-mist text-teal-deep',
  descartado: 'bg-danger-bg text-danger',
};

function StatCard({ label, value, sub, accent }: { label: string; value: number; sub?: string; accent?: boolean }) {
  return (
    <div className={`rounded-[16px] border p-6 ${accent ? 'border-teal/30 bg-teal/5' : 'border-line bg-white'}`}>
      <p className="text-xs font-bold uppercase tracking-widest text-slate">{label}</p>
      <p className={`mt-2 text-4xl font-extrabold ${accent ? 'text-teal-deep' : 'text-ink'}`}>{value}</p>
      {sub && <p className="mt-1 text-xs text-slate">{sub}</p>}
    </div>
  );
}

export default async function DashboardPage() {
  const db = serviceClient();

  const [
    { count: totalLeads },
    { count: newLeads },
    { data: postRows },
    { count: visibleCases },
    { data: recentLeads },
  ] = await Promise.all([
    db.from('leads').select('*', { count: 'exact', head: true }),
    db.from('leads').select('*', { count: 'exact', head: true }).eq('status', 'nueva'),
    db.from('posts').select('status'),
    db.from('cases').select('*', { count: 'exact', head: true }).eq('visible', true),
    db.from('leads')
      .select('id,name,email,interests,status,created_at')
      .order('created_at', { ascending: false })
      .limit(8),
  ]);

  const publishedPosts = postRows?.filter((p) => p.status === 'published').length ?? 0;
  const draftPosts = postRows?.filter((p) => p.status !== 'published').length ?? 0;

  return (
    <div className="max-w-[1100px]">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-ink">Dashboard</h1>
        <p className="mt-1 text-sm text-slate">Resumen del sitio Dr Follicle Solutions</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Solicitudes nuevas" value={newLeads ?? 0} sub="Pendientes de contacto" accent />
        <StatCard label="Total solicitudes" value={totalLeads ?? 0} />
        <StatCard label="Posts publicados" value={publishedPosts} sub={`${draftPosts} en borrador`} />
        <StatCard label="Casos visibles" value={visibleCases ?? 0} sub="Con consentimiento" />
      </div>

      {/* Recent leads */}
      <div className="mt-8 rounded-[16px] border border-line bg-white">
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <h2 className="font-extrabold text-ink">Solicitudes recientes</h2>
          <a href="/admin/leads" className="text-sm font-semibold text-teal-deep hover:underline">
            Ver todas →
          </a>
        </div>

        {!recentLeads || recentLeads.length === 0 ? (
          <p className="px-6 py-10 text-center text-sm text-slate">
            Aún no hay solicitudes.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line">
                  <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-widest text-slate">Nombre</th>
                  <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-widest text-slate">Email</th>
                  <th className="hidden px-6 py-3 text-left text-xs font-bold uppercase tracking-widest text-slate md:table-cell">Intereses</th>
                  <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-widest text-slate">Estado</th>
                  <th className="hidden px-6 py-3 text-left text-xs font-bold uppercase tracking-widest text-slate lg:table-cell">Fecha</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {(recentLeads as Lead[]).map((lead) => (
                  <tr key={lead.id} className="hover:bg-mist/30 transition-colors duration-100">
                    <td className="px-6 py-3 font-semibold text-ink">{lead.name}</td>
                    <td className="px-6 py-3 text-slate">{lead.email}</td>
                    <td className="hidden px-6 py-3 text-slate md:table-cell">
                      {lead.interests.slice(0, 2).join(', ') || '—'}
                    </td>
                    <td className="px-6 py-3">
                      <span className={`rounded-pill px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${STATUS_COLORS[lead.status] ?? 'bg-mist text-slate'}`}>
                        {STATUS_LABELS[lead.status] ?? lead.status}
                      </span>
                    </td>
                    <td className="hidden px-6 py-3 text-slate lg:table-cell">
                      {new Date(lead.created_at).toLocaleDateString('es', {
                        day: 'numeric', month: 'short', year: 'numeric',
                      })}
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
