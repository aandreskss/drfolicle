'use server';
import { updateTag } from 'next/cache';
import { serviceClient } from '@/lib/content/server-client';
import { redirect } from 'next/navigation';

export async function saveTeamMember(formData: FormData) {
  const id      = formData.get('id') as string | null;
  const name    = formData.get('name') as string;
  const roleEs  = formData.get('role_es') as string;
  const roleEn  = formData.get('role_en') as string;
  const credEs  = formData.get('cred_es') as string;
  const credEn  = formData.get('cred_en') as string;
  const photoPath = (formData.get('photo_path') as string).trim();
  const visible = formData.get('visible') === 'on';
  const pos     = parseInt(formData.get('position') as string) || 0;

  if (!name.trim()) redirect('/admin/equipo?error=El+nombre+es+obligatorio');

  const db = serviceClient();

  let photo_media_id: string | null = null;
  if (photoPath) {
    const { data: media } = await db.from('media').select('id').eq('path', photoPath).single();
    if (media) {
      photo_media_id = media.id;
    } else {
      const { data: newMedia } = await db
        .from('media')
        .insert({ path: photoPath, kind: 'image', name: photoPath.split('/').pop() ?? photoPath, category: 'Equipo' })
        .select('id')
        .single();
      if (newMedia) photo_media_id = newMedia.id;
    }
  }

  const payload = {
    name,
    role:        { es: roleEs, en: roleEn },
    credentials: { es: credEs, en: credEn },
    photo_media_id,
    visible,
    position: pos,
    needs_info: false,
  };

  if (id) {
    await db.from('team_members').update(payload).eq('id', id);
  } else {
    await db.from('team_members').insert(payload);
  }

  updateTag('site');
  redirect('/admin/equipo?saved=1');
}

export async function deleteTeamMember(formData: FormData) {
  const id = formData.get('id') as string;
  await serviceClient().from('team_members').delete().eq('id', id);
  updateTag('site');
  redirect('/admin/equipo');
}

export async function toggleTeamVisible(formData: FormData) {
  const id      = formData.get('id') as string;
  const visible = formData.get('visible') === 'true';
  await serviceClient().from('team_members').update({ visible: !visible }).eq('id', id);
  updateTag('site');
  redirect('/admin/equipo');
}
