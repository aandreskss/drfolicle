-- Buckets: "media" (público, imágenes y videos del sitio) y "consents" (privado, autorizaciones de pacientes).
insert into storage.buckets (id, name, public) values ('media','media', true) on conflict (id) do nothing;
insert into storage.buckets (id, name, public) values ('consents','consents', false) on conflict (id) do nothing;

create policy "media public read" on storage.objects for select to anon, authenticated using (bucket_id = 'media');
create policy "media staff write" on storage.objects for all to authenticated
  using (bucket_id = 'media' and public.is_staff()) with check (bucket_id = 'media' and public.is_staff());
create policy "consents staff only" on storage.objects for all to authenticated
  using (bucket_id = 'consents' and public.is_staff()) with check (bucket_id = 'consents' and public.is_staff());
