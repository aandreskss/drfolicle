'use server';
import { updateTag } from 'next/cache';
import { serviceClient } from '@/lib/content/server-client';
import { redirect } from 'next/navigation';

export async function saveTreatment(formData: FormData) {
  const id      = formData.get('id') as string;
  const nameEs  = formData.get('name_es') as string;
  const nameEn  = formData.get('name_en') as string;
  const shortEs = formData.get('short_es') as string;
  const shortEn = formData.get('short_en') as string;
  const visible     = formData.get('visible')     === 'on';
  const show_home   = formData.get('show_home')   === 'on';
  const show_menu   = formData.get('show_menu')   === 'on';
  const show_footer = formData.get('show_footer') === 'on';
  const home_layout = parseInt(formData.get('home_layout') as string) || 0;
  const position    = parseInt(formData.get('position') as string) || 0;

  await serviceClient()
    .from('treatments')
    .update({
      name:  { es: nameEs, en: nameEn },
      short: { es: shortEs, en: shortEn },
      visible, show_home, show_menu, show_footer, home_layout, position,
    })
    .eq('id', id);

  updateTag('site');
  redirect('/admin/tratamientos?saved=1');
}

export async function toggleTreatmentVisible(formData: FormData) {
  const id      = formData.get('id') as string;
  const visible = formData.get('visible') === 'true';
  await serviceClient().from('treatments').update({ visible: !visible }).eq('id', id);
  updateTag('site');
  redirect('/admin/tratamientos');
}
