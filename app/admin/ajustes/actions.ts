'use server';
import { updateTag } from 'next/cache';
import { serviceClient } from '@/lib/content/server-client';
import { redirect } from 'next/navigation';

async function save(key: string, value: unknown) {
  const db = serviceClient();
  await db.from('settings').update({ draft: value, published: value }).eq('key', key);
  updateTag('site');
}

export async function saveContact(formData: FormData) {
  await save('contact', {
    phone:   formData.get('phone'),
    wa:      formData.get('wa'),
    email:   formData.get('email'),
    address: formData.get('address'),
    city:    formData.get('city'),
    hours:   formData.get('hours'),
  });
  redirect('/admin/ajustes?saved=contact');
}

export async function saveFooter(formData: FormData) {
  const db = serviceClient();
  const { data } = await db.from('settings').select('draft').eq('key', 'footer').single();
  const current = (data?.draft ?? {}) as Record<string, unknown>;
  const updated = { ...current, desc: formData.get('desc'), legal: formData.get('legal') };
  await save('footer', updated);
  redirect('/admin/ajustes?saved=footer');
}

export async function saveSocial(formData: FormData) {
  const networks = ['Instagram', 'Facebook', 'YouTube', 'TikTok'];
  const value = networks.map((name) => ({
    name,
    url: formData.get(`social_url_${name}`) ?? '',
    on: formData.get(`social_on_${name}`) === 'on',
  }));
  await save('social', value);
  redirect('/admin/ajustes?saved=social');
}

export async function saveButtons(formData: FormData) {
  const db = serviceClient();
  const { data } = await db.from('settings').select('draft').eq('key', 'buttons').single();
  const current = (data?.draft ?? {}) as Record<string, unknown>;
  const updated = {
    ...current,
    cta:      formData.get('cta'),
    waLabel:  formData.get('waLabel'),
    waMsg:    formData.get('waMsg'),
    barOn:    formData.get('barOn') === 'on',
    waOn:     formData.get('waOn') === 'on',
  };
  await save('buttons', updated);
  redirect('/admin/ajustes?saved=buttons');
}

export async function saveNotifications(formData: FormData) {
  const db = serviceClient();
  const { data } = await db.from('settings').select('draft').eq('key', 'notifications').single();
  const current = (data?.draft ?? {}) as Record<string, unknown>;
  const updated = {
    ...current,
    emailOn: formData.get('emailOn') === 'on',
    emails:  formData.get('emails'),
    waOn:    formData.get('waOn_notif') === 'on',
  };
  await db.from('settings').update({ draft: updated, published: updated }).eq('key', 'notifications');
  redirect('/admin/ajustes?saved=notifications');
}
