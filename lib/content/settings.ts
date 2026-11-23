import { cache } from 'react';
import { anonClient } from './client';

type SettingKey = 'contact' | 'social' | 'footer' | 'buttons' | 'nav_main' | 'seo_defaults';

const getAllSettings = cache(
  async (): Promise<Record<string, unknown>> => {
    const { data, error } = await anonClient()
      .from('v_settings')
      .select('key, value');

    if (error) {
      console.error('getAllSettings', error.message);
      return {};
    }

    type Row = { key: string; value: unknown };
    return Object.fromEntries(((data ?? []) as Row[]).map((r) => [r.key, r.value]));
  }
);

export async function getSettings<T = unknown>(key: SettingKey): Promise<T | null> {
  const all = await getAllSettings();
  return (all[key] as T) ?? null;
}

export { getAllSettings };
