import { unstable_cache } from 'next/cache';
import { anonClient } from './client';
import type { PageSection, SectionData } from './types';

export const getPageSections = unstable_cache(
  async (pageSlug: string): Promise<PageSection[]> => {
    const { data, error } = await anonClient()
      .from('v_page_sections')
      .select('page_slug, key, position, data')
      .eq('page_slug', pageSlug)
      .order('position');

    if (error) {
      console.error('getPageSections', pageSlug, error.message);
      return [];
    }

    type Row = { page_slug: string; key: string; position: number; data: SectionData };
    return ((data ?? []) as Row[]).map((row) => ({
      page_slug: row.page_slug,
      key: row.key,
      position: row.position,
      data: row.data,
    }));
  },
  ['page-sections'],
  { tags: ['site'] }
);

/** Devuelve una sección específica o undefined si no existe / no está publicada. */
export async function getSection(
  pageSlug: string,
  key: string
): Promise<PageSection | undefined> {
  const sections = await getPageSections(pageSlug);
  return sections.find((s) => s.key === key);
}
