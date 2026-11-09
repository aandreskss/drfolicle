-- Dr Follicle Solutions · esquema de base de datos (Supabase / PostgreSQL 15+)
-- Convenciones:
--   * Textos traducibles: jsonb {"es": "...", "en": "..."}
--   * Secciones, ajustes y navegación tienen borrador (draft) y publicado (published).
--     El sitio público SOLO lee lo publicado (ver vistas en 0002).
--   * Colecciones (servicios, casos, equipo, testimonios, videos, FAQ, blog) se publican con
--     su interruptor "visible" / "status"; los cambios se ven al guardar.

create extension if not exists pgcrypto;

-- ───────── utilidades ─────────
create or replace function public.set_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;

-- ───────── usuarios del panel ─────────
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'editor' check (role in ('admin','editor')),
  created_at timestamptz not null default now()
);

create or replace function public.is_staff() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles p where p.id = auth.uid());
$$;
create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin');
$$;

-- ───────── medios ─────────
create table public.media (
  id uuid primary key default gen_random_uuid(),
  path text not null unique,                 -- ruta en el bucket "media", p. ej. images/caso1-antes.jpg
  kind text not null check (kind in ('image','video')),
  name text not null,
  category text not null default 'Sin clasificar',  -- Hero, Tratamientos, Resultados, Equipo, Turismo, Videos…
  alt jsonb not null default '{"es":"","en":""}',
  width int, height int, bytes bigint, duration_seconds int,
  poster_media_id uuid references public.media(id) on delete set null,
  created_at timestamptz not null default now()
);

-- ───────── ajustes del sitio (contacto, redes, pie, botones, avisos, navegación) ─────────
create table public.settings (
  key text primary key,                      -- contact | social | footer | buttons | nav_main | notifications | seo_defaults
  draft jsonb not null default '{}',
  published jsonb,
  is_public boolean not null default true,   -- notifications = false
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id)
);
create trigger settings_updated before update on public.settings for each row execute function public.set_updated_at();

-- ───────── páginas y secciones ─────────
create table public.pages (
  slug text primary key,                     -- inicio, nosotros, servicios, trasplante-capilar…
  route text not null unique,                -- /, /nosotros, /servicios/trasplante-capilar…
  title jsonb not null,
  seo_title jsonb not null default '{"es":"","en":""}',
  seo_description jsonb not null default '{"es":"","en":""}',
  og_media_id uuid references public.media(id) on delete set null,
  english_enabled boolean not null default false,
  noindex boolean not null default false,
  updated_at timestamptz not null default now()
);
create trigger pages_updated before update on public.pages for each row execute function public.set_updated_at();

create table public.page_sections (
  id uuid primary key default gen_random_uuid(),
  page_slug text not null references public.pages(slug) on delete cascade,
  key text not null,                         -- hero, confianza, proceso… (clave estable que usa el código)
  name text not null,                        -- nombre que ve la clienta en el panel
  source_collection text,                    -- si los elementos vienen de otra colección (faqs, cases…)
  -- borrador (lo que se edita)
  position int not null,
  visible boolean not null default true,
  data_draft jsonb not null default '{}',    -- {content:{es:{},en:{}}, lists:{id:{items:[]}}, slots:[]}
  -- publicado (lo que lee el sitio)
  published_position int,
  published_visible boolean,
  data_published jsonb,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id),
  unique (page_slug, key)
);
create index on public.page_sections (page_slug, position);
create trigger sections_updated before update on public.page_sections for each row execute function public.set_updated_at();

-- ───────── colecciones ─────────
create table public.treatments (
  id uuid primary key default gen_random_uuid(),
  position int not null default 0,
  name jsonb not null, short jsonb not null default '{"es":"","en":""}',
  image_media_id uuid references public.media(id) on delete set null,
  home_layout smallint not null default 1 check (home_layout between 0 and 3),
  show_home boolean not null default true, show_menu boolean not null default true, show_footer boolean not null default true,
  page_slug text references public.pages(slug) on delete set null,
  visible boolean not null default false,
  updated_at timestamptz not null default now()
);
create trigger treatments_updated before update on public.treatments for each row execute function public.set_updated_at();

create table public.cases (
  id uuid primary key default gen_random_uuid(),
  position int not null default 0,
  title jsonb not null,
  category text not null check (category in ('capilar','barba','cejas')),
  before_media_id uuid references public.media(id) on delete set null,
  after_media_id uuid references public.media(id) on delete set null,
  months text, units text,
  origin text,                               -- "Nos visita desde"
  consent_verified boolean not null default false,
  consent_document_path text,                -- archivo privado en el bucket "consents"
  visible boolean not null default false,
  updated_at timestamptz not null default now(),
  -- regla de oro: nunca se publica un caso sin autorización escrita del paciente
  constraint case_requires_consent check (visible = false or consent_verified = true)
);
create trigger cases_updated before update on public.cases for each row execute function public.set_updated_at();

create table public.team_members (
  id uuid primary key default gen_random_uuid(),
  position int not null default 0,
  name text not null,
  role jsonb not null default '{"es":"","en":""}',
  credentials jsonb not null default '{"es":"","en":""}',   -- formación, registro ReTHUS, experiencia
  photo_media_id uuid references public.media(id) on delete set null,
  needs_info boolean not null default true,
  visible boolean not null default false,
  updated_at timestamptz not null default now()
);
create trigger team_updated before update on public.team_members for each row execute function public.set_updated_at();

create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  position int not null default 0,
  author text not null, country text, treatment text,
  quote jsonb not null,
  source_note text,
  authorization_confirmed boolean not null default false,
  video_id uuid,                              -- fk a videos (se agrega abajo)
  visible boolean not null default false,
  updated_at timestamptz not null default now()
);
create trigger testimonials_updated before update on public.testimonials for each row execute function public.set_updated_at();

create table public.videos (
  id uuid primary key default gen_random_uuid(),
  position int not null default 0,
  title jsonb not null, description text,
  video_media_id uuid references public.media(id) on delete set null,
  poster_media_id uuid references public.media(id) on delete set null,
  spoken_language text not null default 'es',
  visible boolean not null default true,
  updated_at timestamptz not null default now()
);
create trigger videos_updated before update on public.videos for each row execute function public.set_updated_at();
alter table public.testimonials add constraint testimonials_video_fk foreign key (video_id) references public.videos(id) on delete set null;

create table public.faqs (
  id uuid primary key default gen_random_uuid(),
  position int not null default 0,
  scopes text[] not null default '{inicio}',  -- dónde aparece: inicio, trasplante-capilar, trasplante-de-barba, trasplante-de-cejas, terapias-capilares, turismo-medico
  question jsonb not null, answer jsonb not null,
  video_id uuid references public.videos(id) on delete set null,
  medical_review_done boolean not null default false,
  visible boolean not null default true,
  updated_at timestamptz not null default now()
);
create trigger faqs_updated before update on public.faqs for each row execute function public.set_updated_at();

-- ───────── blog ─────────
create table public.post_categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique, name jsonb not null, position int not null default 0
);
create table public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,                  -- sin barras: all-inclusive-hair-transplant-package-medellin
  legacy_path text,                           -- URL del sitio actual, para redirección 301
  title jsonb not null,
  excerpt jsonb not null default '{"es":"","en":""}',
  source_language text not null default 'es' check (source_language in ('es','en')),
  body jsonb not null default '{"es":[],"en":[]}', -- bloques: {type:'p'|'h2'|'quote'|'img', text, src}
  cover_media_id uuid references public.media(id) on delete set null,
  category_id uuid references public.post_categories(id) on delete set null,
  author_id uuid references public.team_members(id) on delete set null,
  tags text[] not null default '{}',
  status text not null default 'draft' check (status in ('draft','review','scheduled','published')),
  published_at timestamptz,
  medical_review_done boolean not null default false,
  seo_title jsonb, seo_description jsonb,
  updated_at timestamptz not null default now()
);
-- medical_review_done es una advertencia en el panel (los 5 artículos actuales ya están publicados en el sitio vigente).
create index on public.posts (status, published_at desc);
create trigger posts_updated before update on public.posts for each row execute function public.set_updated_at();

-- ───────── solicitudes (leads) ─────────
create table public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null, country text, phone text, email text,
  interests text[] not null default '{}',     -- Cabello, Barba, Cejas, Aún no lo sé
  message text,
  source_page text,                           -- página desde la que escribió
  status text not null default 'nueva' check (status in ('nueva','contactado','valoracion_agendada','descartado')),
  whatsapp_opened boolean not null default false,
  internal_note text,
  consent_at timestamptz not null,            -- Ley 1581 de 2012
  consent_text_version text not null default 'v1',
  utm jsonb,
  ip_hash text
);
create index on public.leads (status, created_at desc);

-- ───────── operación ─────────
create table public.publish_log (
  id bigserial primary key,
  at timestamptz not null default now(),
  user_id uuid references auth.users(id),
  message text not null
);
create table public.redirects (
  from_path text primary key, to_path text not null, status smallint not null default 301
);

-- Publicar: copia borrador → publicado en secciones y ajustes y deja registro.
create or replace function public.publish_site(p_message text default 'Cambios publicados')
returns void language plpgsql security definer set search_path = public as $$
begin
  if not public.is_staff() then raise exception 'not allowed'; end if;
  update public.page_sections
     set published_position = position, published_visible = visible, data_published = data_draft;
  update public.settings set published = draft;
  insert into public.publish_log (user_id, message) values (auth.uid(), p_message);
end $$;

-- cantidad de cambios sin publicar (para el contador del panel)
create or replace function public.pending_changes() returns int
language sql stable security definer set search_path = public as $$
  select (select count(*) from public.page_sections
           where data_published is distinct from data_draft
              or published_position is distinct from position
              or published_visible is distinct from visible)::int
       + (select count(*) from public.settings where published is distinct from draft)::int;
$$;
