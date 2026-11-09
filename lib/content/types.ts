// Tipos del modelo de contenido — espejo de supabase/migrations
export type Lang = 'es' | 'en';
export type I18n = { es: string; en: string };

/** Campos estándar de toda sección. El hero de Inicio añade eyebrow, cta2 y cta2Link. */
export interface SectionText {
  t1?: string;
  t2?: string;
  text?: string;
  cta?: string;
  ctaLink?: string;
  eyebrow?: string;
  cta2?: string;
  cta2Link?: string;
}

export interface ListField {
  key: string;
  label: string;
  multiline?: boolean;
}

export interface ListItem {
  visible: boolean;
  es: Record<string, string>;
  en: Record<string, string>;
}

export interface SectionList {
  head: string;
  noun: string;
  fields: ListField[];
  fixed?: boolean;
  items: ListItem[];
}

export interface MediaSlot {
  label: string;
  kind: 'img' | 'video';
  src: string;
  alt: I18n;
  note?: string;
}

export interface SectionData {
  content: { es: SectionText; en: SectionText };
  lists?: Record<string, SectionList>;
  slots?: MediaSlot[];
}

export interface PageSection {
  page_slug: string;
  key: string;
  position: number;
  data: SectionData;
}

/** Texto en el idioma activo, con respaldo en español cuando falta la traducción. */
export const pick = (v: I18n | undefined, lang: Lang) =>
  (v && (v[lang] || v.es)) || '';

export const pickText = (
  o: { es: SectionText; en: SectionText },
  lang: Lang
): SectionText => ({
  ...o.es,
  ...Object.fromEntries(Object.entries(o[lang] ?? {}).filter(([, x]) => x)),
});

const nonEmpty = (o: Record<string, string> = {}) =>
  Object.fromEntries(Object.entries(o).filter(([, x]) => x));

export const pickItem = (it: ListItem, lang: Lang) =>
  lang === 'en' ? { ...it.es, ...nonEmpty(it.en) } : it.es;

// ── Tipos de colecciones (espejo de las tablas) ──────────────────────────────

export interface Treatment {
  id: string;
  position: number;
  name: I18n;
  short: I18n;
  image_media_id: string | null;
  home_layout: 0 | 1 | 2 | 3;
  show_home: boolean;
  show_menu: boolean;
  show_footer: boolean;
  page_slug: string | null;
  visible: boolean;
}

export interface Case {
  id: string;
  position: number;
  title: I18n;
  category: 'capilar' | 'barba' | 'cejas';
  before_media_id: string | null;
  after_media_id: string | null;
  months: string | null;
  units: string | null;
  origin: string | null;
  consent_verified: boolean;
  visible: boolean;
}

export interface TeamMember {
  id: string;
  position: number;
  name: string;
  role: I18n;
  credentials: I18n;
  photo_media_id: string | null;
  needs_info: boolean;
  visible: boolean;
}

export interface Testimonial {
  id: string;
  position: number;
  author: string;
  country: string | null;
  treatment: string | null;
  quote: I18n;
  source_note: string | null;
  authorization_confirmed: boolean;
  video_id: string | null;
  visible: boolean;
}

export interface Video {
  id: string;
  position: number;
  title: I18n;
  description: string | null;
  video_media_id: string | null;
  poster_media_id: string | null;
  spoken_language: string;
  visible: boolean;
}

export interface Faq {
  id: string;
  position: number;
  scopes: string[];
  question: I18n;
  answer: I18n;
  video_id: string | null;
  visible: boolean;
}

export interface Post {
  id: string;
  slug: string;
  legacy_path: string | null;
  title: I18n;
  excerpt: I18n;
  source_language: 'es' | 'en';
  body: { es: PostBlock[]; en: PostBlock[] };
  cover_media_id: string | null;
  category_id: string | null;
  author_id: string | null;
  tags: string[];
  status: 'draft' | 'review' | 'scheduled' | 'published';
  published_at: string | null;
  seo_title: I18n | null;
  seo_description: I18n | null;
}

export interface PostBlock {
  type: 'p' | 'h2' | 'quote' | 'img';
  text?: string;
  src?: string;
}

export interface Media {
  id: string;
  path: string;
  kind: 'image' | 'video';
  name: string;
  category: string;
  alt: I18n;
  width: number | null;
  height: number | null;
  bytes: number | null;
  duration_seconds: number | null;
  poster_media_id: string | null;
}
