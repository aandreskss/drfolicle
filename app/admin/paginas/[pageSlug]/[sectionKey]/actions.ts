'use server';
import { updateTag } from 'next/cache';
import { serviceClient } from '@/lib/content/server-client';
import { redirect } from 'next/navigation';

export async function saveSection(formData: FormData) {
  const pageSlug   = formData.get('page_slug') as string;
  const sectionKey = formData.get('section_key') as string;
  const visible    = formData.get('visible') === 'on';

  const db = serviceClient();
  const { data: current } = await db
    .from('page_sections')
    .select('data_draft')
    .eq('page_slug', pageSlug)
    .eq('key', sectionKey)
    .single();

  if (!current) redirect(`/admin/paginas/${pageSlug}?error=Sección+no+encontrada`);

  const draft = (current.data_draft ?? {}) as Record<string, unknown>;
  const contentEs = (draft.content as { es?: Record<string, string>; en?: Record<string, string> } | undefined);

  const es: Record<string, string> = { ...(contentEs?.es ?? {}) };
  const en: Record<string, string> = { ...(contentEs?.en ?? {}) };

  for (const field of ['eyebrow', 't1', 't2', 'text', 'cta', 'ctaLink', 'cta2', 'cta2Link']) {
    const valEs = formData.get(`es_${field}`) as string | null;
    const valEn = formData.get(`en_${field}`) as string | null;
    if (valEs !== null) es[field] = valEs;
    if (valEn !== null) en[field] = valEn;
  }

  const newData = { ...draft, content: { es, en } };

  await db
    .from('page_sections')
    .update({
      data_draft:        newData,
      data_published:    newData,
      visible,
      published_visible: visible,
    })
    .eq('page_slug', pageSlug)
    .eq('key', sectionKey);

  updateTag('site');
  redirect(`/admin/paginas/${pageSlug}?saved=${sectionKey}`);
}
