import type { Metadata } from 'next';
import { serviceClient } from '@/lib/content/server-client';
import { SubmitBtn } from '@/components/admin/SubmitBtn';
import { saveContact, saveFooter, saveSocial, saveButtons, saveNotifications } from './actions';

export const metadata: Metadata = { title: 'Ajustes' };

const IN = 'w-full rounded-[8px] border border-line bg-white px-3 py-2 text-sm text-ink placeholder-slate/40 focus:outline-none focus:ring-2 focus:ring-teal/40';
const LB = 'block mb-1 text-sm font-semibold text-ink';

function Card({ title, saved, children }: { title: string; saved: boolean; children: React.ReactNode }) {
  return (
    <div className="mt-6 rounded-[16px] border border-line bg-white p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-extrabold text-ink">{title}</h2>
        {saved && <span className="text-sm font-semibold text-teal-deep">Guardado ✓</span>}
      </div>
      {children}
    </div>
  );
}

function Toggle({ name, label, checked }: { name: string; label: string; checked: boolean }) {
  return (
    <label className="flex cursor-pointer items-center gap-3">
      <input type="checkbox" name={name} defaultChecked={checked} className="peer sr-only" />
      <div className="relative h-5 w-9 rounded-full bg-line transition-colors peer-checked:bg-teal after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-4" />
      <span className="text-sm text-ink">{label}</span>
    </label>
  );
}

type Contact = { phone: string; wa: string; email: string; address: string; city: string; hours: string };
type Footer  = { desc: string; legal: string; links: string[] };
type Social  = { name: string; url: string; on: boolean }[];
type Buttons = { cta: string; waLabel: string; waMsg: string; barOn: boolean; waOn: boolean };
type Notif   = { emailOn: boolean; emails: string; waOn: boolean };

export default async function AjustesPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const db = serviceClient();

  const { data: rows } = await db
    .from('settings')
    .select('key, draft')
    .in('key', ['contact', 'footer', 'social', 'buttons', 'notifications']);

  const get = (k: string) => rows?.find((r) => r.key === k)?.draft ?? {};

  const contact = get('contact') as Contact;
  const footer  = get('footer')  as Footer;
  const social  = (get('social') ?? []) as Social;
  const buttons = get('buttons') as Buttons;
  const notif   = get('notifications') as Notif;

  const networks = ['Instagram', 'Facebook', 'YouTube', 'TikTok'];

  return (
    <div className="max-w-[760px]">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-ink">Ajustes</h1>
        <p className="mt-0.5 text-sm text-slate">Configuración global del sitio</p>
      </div>

      {/* Contacto */}
      <Card title="Contacto" saved={saved === 'contact'}>
        <form action={saveContact} className="grid gap-4 sm:grid-cols-2">
          {[
            { label: 'Teléfono', name: 'phone', val: contact.phone },
            { label: 'WhatsApp', name: 'wa', val: contact.wa },
            { label: 'Email', name: 'email', val: contact.email },
            { label: 'Ciudad', name: 'city', val: contact.city },
          ].map(({ label, name, val }) => (
            <div key={name}>
              <label className={LB}>{label}</label>
              <input name={name} defaultValue={val} className={IN} />
            </div>
          ))}
          <div className="sm:col-span-2">
            <label className={LB}>Dirección</label>
            <input name="address" defaultValue={contact.address} className={IN} />
          </div>
          <div className="sm:col-span-2">
            <label className={LB}>Horario de atención</label>
            <input name="hours" defaultValue={contact.hours} className={IN} />
          </div>
          <div className="sm:col-span-2 mt-2"><SubmitBtn label="Guardar contacto" /></div>
        </form>
      </Card>

      {/* Pie de página */}
      <Card title="Pie de página" saved={saved === 'footer'}>
        <form action={saveFooter} className="flex flex-col gap-4">
          <div>
            <label className={LB}>Descripción</label>
            <textarea name="desc" defaultValue={footer.desc} rows={3} className={IN} />
          </div>
          <div>
            <label className={LB}>Texto legal (copyright, NIT, habilitación)</label>
            <input name="legal" defaultValue={footer.legal} className={IN} />
          </div>
          <div><SubmitBtn label="Guardar pie de página" /></div>
        </form>
      </Card>

      {/* Redes sociales */}
      <Card title="Redes sociales" saved={saved === 'social'}>
        <form action={saveSocial} className="flex flex-col gap-4">
          {networks.map((name) => {
            const s = social.find((x) => x.name === name) ?? { name, url: '', on: false };
            return (
              <div key={name} className="flex gap-3 items-end">
                <div className="flex-1">
                  <label className={LB}>{name}</label>
                  <input name={`social_url_${name}`} defaultValue={s.url} className={IN} placeholder="https://…" />
                </div>
                <div className="pb-2">
                  <input type="checkbox" name={`social_on_${name}`} defaultChecked={s.on}
                    className="h-4 w-4 rounded border-line accent-teal" />
                </div>
              </div>
            );
          })}
          <div><SubmitBtn label="Guardar redes" /></div>
        </form>
      </Card>

      {/* Botones CTA */}
      <Card title="Botones CTA" saved={saved === 'buttons'}>
        <form action={saveButtons} className="flex flex-col gap-4">
          <div>
            <label className={LB}>Texto del botón principal</label>
            <input name="cta" defaultValue={buttons.cta} className={IN} />
          </div>
          <div>
            <label className={LB}>Etiqueta del botón WhatsApp</label>
            <input name="waLabel" defaultValue={buttons.waLabel} className={IN} />
          </div>
          <div>
            <label className={LB}>Mensaje predeterminado de WhatsApp</label>
            <textarea name="waMsg" defaultValue={buttons.waMsg} rows={2} className={IN} />
          </div>
          <div className="flex flex-col gap-2">
            <Toggle name="barOn" label="Mostrar barra de WhatsApp" checked={buttons.barOn} />
            <Toggle name="waOn"  label="Mostrar botón flotante de WhatsApp" checked={buttons.waOn} />
          </div>
          <div><SubmitBtn label="Guardar botones" /></div>
        </form>
      </Card>

      {/* Notificaciones */}
      <Card title="Notificaciones" saved={saved === 'notifications'}>
        <form action={saveNotifications} className="flex flex-col gap-4">
          <div>
            <label className={LB}>Email que recibe las notificaciones</label>
            <input name="emails" defaultValue={notif.emails} className={IN} />
          </div>
          <div className="flex flex-col gap-2">
            <Toggle name="emailOn"    label="Recibir notificaciones por email"    checked={notif.emailOn} />
            <Toggle name="waOn_notif" label="Recibir notificaciones por WhatsApp" checked={notif.waOn}   />
          </div>
          <div><SubmitBtn label="Guardar notificaciones" /></div>
        </form>
      </Card>
    </div>
  );
}
