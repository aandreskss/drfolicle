'use server';
import { serviceClient } from '@/lib/content/server-client';
import { redirect } from 'next/navigation';

export async function updateLeadStatus(id: string, formData: FormData) {
  const status = formData.get('status') as string;
  const notes = formData.get('notes') as string;
  const db = serviceClient();
  await db.from('leads').update({ status, notes } as never).eq('id', id);
  redirect(`/admin/leads/${id}?saved=1`);
}
