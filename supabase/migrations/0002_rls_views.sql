-- Seguridad: RLS en todas las tablas + vistas públicas que solo exponen lo publicado.
alter table public.profiles enable row level security;
alter table public.media enable row level security;
alter table public.settings enable row level security;
alter table public.pages enable row level security;
alter table public.page_sections enable row level security;
alter table public.treatments enable row level security;
alter table public.cases enable row level security;
alter table public.team_members enable row level security;
alter table public.testimonials enable row level security;
alter table public.videos enable row level security;
alter table public.faqs enable row level security;
alter table public.post_categories enable row level security;
alter table public.posts enable row level security;
alter table public.leads enable row level security;
alter table public.publish_log enable row level security;
alter table public.redirects enable row level security;

-- Personal del panel: acceso total a todo (admin y editor). Solo admin gestiona usuarios.
do $$
declare t text;
begin
  foreach t in array array['media','settings','pages','page_sections','treatments','cases','team_members','testimonials','videos','faqs','post_categories','posts','leads','publish_log','redirects']
  loop
    execute format('create policy "staff all" on public.%I for all to authenticated using (public.is_staff()) with check (public.is_staff())', t);
  end loop;
end $$;
create policy "profiles self read" on public.profiles for select to authenticated using (id = auth.uid() or public.is_admin());
create policy "profiles admin write" on public.profiles for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Lectura pública (anon) de colecciones: solo lo marcado como visible/publicado.
create policy "public media" on public.media for select to anon using (true);
create policy "public pages" on public.pages for select to anon using (true);
create policy "public treatments" on public.treatments for select to anon using (visible);
create policy "public cases" on public.cases for select to anon using (visible and consent_verified);
create policy "public team" on public.team_members for select to anon using (visible);
create policy "public testimonials" on public.testimonials for select to anon using (visible);
create policy "public videos" on public.videos for select to anon using (visible);
create policy "public faqs" on public.faqs for select to anon using (visible);
create policy "public post categories" on public.post_categories for select to anon using (true);
create policy "public posts" on public.posts for select to anon using (status = 'published' and (published_at is null or published_at <= now()));
create policy "public redirects" on public.redirects for select to anon using (true);
-- leads, publish_log, profiles, settings y page_sections NO tienen política para anon.
-- Los leads se insertan desde la ruta del servidor (service role) con honeypot y límite de frecuencia.

-- Vistas públicas: exponen solo lo publicado (nunca los borradores).
create or replace view public.v_page_sections with (security_invoker = false) as
  select page_slug, key, published_position as position, data_published as data
    from public.page_sections
   where published_visible is true and data_published is not null;
create or replace view public.v_settings with (security_invoker = false) as
  select key, published as value from public.settings where is_public and published is not null;
grant select on public.v_page_sections, public.v_settings to anon, authenticated;

-- Defensa en profundidad: aunque no exista política, anon no debe ni tocar estas tablas.
revoke all on public.leads, public.settings, public.page_sections, public.profiles, public.publish_log from anon;
