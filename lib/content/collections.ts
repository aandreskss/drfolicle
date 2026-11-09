import { unstable_cache } from 'next/cache';
import { anonClient } from './client';
import type { Treatment, Case, TeamMember, Testimonial, Video, Faq, Post, Media } from './types';

export const getTreatments = unstable_cache(
  async (): Promise<Treatment[]> => {
    const { data, error } = await anonClient()
      .from('treatments')
      .select('id,position,name,short,image_media_id,home_layout,show_home,show_menu,show_footer,page_slug,visible')
      .eq('visible', true)
      .order('position');
    if (error) { console.error('getTreatments', error.message); return []; }
    return (data ?? []) as Treatment[];
  },
  ['treatments'],
  { tags: ['site'] }
);

export const getCases = unstable_cache(
  async (category?: 'capilar' | 'barba' | 'cejas'): Promise<Case[]> => {
    let q = anonClient()
      .from('cases')
      .select('id,position,title,category,before_media_id,after_media_id,months,units,origin,consent_verified,visible')
      .eq('visible', true)
      .eq('consent_verified', true)
      .order('position');
    if (category) q = q.eq('category', category);
    const { data, error } = await q;
    if (error) { console.error('getCases', error.message); return []; }
    return (data ?? []) as Case[];
  },
  ['cases'],
  { tags: ['site'] }
);

export const getTeam = unstable_cache(
  async (): Promise<TeamMember[]> => {
    const { data, error } = await anonClient()
      .from('team_members')
      .select('id,position,name,role,credentials,photo_media_id,needs_info,visible')
      .eq('visible', true)
      .order('position');
    if (error) { console.error('getTeam', error.message); return []; }
    return (data ?? []) as TeamMember[];
  },
  ['team'],
  { tags: ['site'] }
);

export const getTestimonials = unstable_cache(
  async (): Promise<Testimonial[]> => {
    const { data, error } = await anonClient()
      .from('testimonials')
      .select('id,position,author,country,treatment,quote,source_note,authorization_confirmed,video_id,visible')
      .eq('visible', true)
      .order('position');
    if (error) { console.error('getTestimonials', error.message); return []; }
    return (data ?? []) as Testimonial[];
  },
  ['testimonials'],
  { tags: ['site'] }
);

export const getVideos = unstable_cache(
  async (): Promise<Video[]> => {
    const { data, error } = await anonClient()
      .from('videos')
      .select('id,position,title,description,video_media_id,poster_media_id,spoken_language,visible')
      .eq('visible', true)
      .order('position');
    if (error) { console.error('getVideos', error.message); return []; }
    return (data ?? []) as Video[];
  },
  ['videos'],
  { tags: ['site'] }
);

export const getFaqs = unstable_cache(
  async (scope?: string): Promise<Faq[]> => {
    let q = anonClient()
      .from('faqs')
      .select('id,position,scopes,question,answer,video_id,visible')
      .eq('visible', true)
      .order('position');
    if (scope) q = q.contains('scopes', [scope]);
    const { data, error } = await q;
    if (error) { console.error('getFaqs', error.message); return []; }
    return (data ?? []) as Faq[];
  },
  ['faqs'],
  { tags: ['site'] }
);

export const getPosts = unstable_cache(
  async (): Promise<Post[]> => {
    const { data, error } = await anonClient()
      .from('posts')
      .select('id,slug,legacy_path,title,excerpt,source_language,cover_media_id,category_id,author_id,tags,status,published_at,seo_title,seo_description')
      .eq('status', 'published')
      .lte('published_at', new Date().toISOString())
      .order('published_at', { ascending: false });
    if (error) { console.error('getPosts', error.message); return []; }
    return (data ?? []) as Post[];
  },
  ['posts'],
  { tags: ['site'] }
);

export const getPost = unstable_cache(
  async (slug: string): Promise<Post | null> => {
    const { data, error } = await anonClient()
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();
    if (error) { return null; }
    return data as Post;
  },
  ['post'],
  { tags: ['site'] }
);

export const getMediaByPath = unstable_cache(
  async (path: string): Promise<Media | null> => {
    const { data, error } = await anonClient()
      .from('media')
      .select('*')
      .eq('path', path)
      .single();
    if (error) { return null; }
    return data as Media;
  },
  ['media'],
  { tags: ['site'] }
);

/** URL pública de un archivo en el bucket media. */
export function mediaUrl(path: string): string {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  return `${url}/storage/v1/object/public/media/${path}`;
}

/** Mapa de id → URL para todos los archivos de media. */
export const getAllMedia = unstable_cache(
  async (): Promise<Record<string, string>> => {
    const { data, error } = await anonClient()
      .from('media')
      .select('id,path');
    if (error) { console.error('getAllMedia', error.message); return {}; }
    type Row = { id: string; path: string };
    return Object.fromEntries(
      ((data ?? []) as Row[]).map((m) => [m.id, mediaUrl(m.path)])
    );
  },
  ['media-map'],
  { tags: ['site'] }
);

/** Convierte un src de slot (ruta relativa o URL) a URL usable en <img>. */
export function slotUrl(src: string | undefined): string | null {
  if (!src) return null;
  if (src.startsWith('http')) return src;
  return `/${src}`;
}
