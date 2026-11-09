'use server';
import { updateTag } from 'next/cache';
import { serviceClient } from '@/lib/content/server-client';
import { redirect } from 'next/navigation';

async function resolveOrCreateMedia(db: ReturnType<typeof serviceClient>, path: string, category: string) {
  if (!path.trim()) return null;
  const { data } = await db.from('media').select('id').eq('path', path).single();
  if (data) return data.id;
  const { data: n } = await db
    .from('media')
    .insert({ path, kind: 'image', name: path.split('/').pop() ?? path, category })
    .select('id')
    .single();
  return n?.id ?? null;
}

export async function saveCase(formData: FormData) {
  const id          = formData.get('id') as string | null;
  const titleEs     = formData.get('title_es') as string;
  const category    = formData.get('category') as string;
  const months      = formData.get('months') as string;
  const units       = formData.get('units') as string;
  const origin      = formData.get('origin') as string;
  const consent     = formData.get('consent_verified') === 'on';
  const visible     = formData.get('visible') === 'on';
  const pos         = parseInt(formData.get('position') as string) || 0;
  const beforePath  = formData.get('before_path') as string;
  const afterPath   = formData.get('after_path') as string;

  if (!titleEs.trim()) redirect('/admin/casos?error=El+título+es+obligatorio');

  const db = serviceClient();
  const before_media_id = await resolveOrCreateMedia(db, beforePath, 'Resultados');
  const after_media_id  = await resolveOrCreateMedia(db, afterPath,  'Resultados');

  const payload = {
    title: { es: titleEs, en: '' },
    category,
    months,
    units,
    origin,
    consent_verified: consent,
    visible,
    position: pos,
    before_media_id,
    after_media_id,
  };

  if (id) {
    await db.from('cases').update(payload).eq('id', id);
  } else {
    await db.from('cases').insert(payload);
  }

  updateTag('site');
  redirect('/admin/casos?saved=1');
}

export async function deleteCase(formData: FormData) {
  const id = formData.get('id') as string;
  await serviceClient().from('cases').delete().eq('id', id);
  updateTag('site');
  redirect('/admin/casos');
}

export async function toggleCaseVisible(formData: FormData) {
  const id      = formData.get('id') as string;
  const visible = formData.get('visible') === 'true';
  await serviceClient().from('cases').update({ visible: !visible }).eq('id', id);
  updateTag('site');
  redirect('/admin/casos');
}
