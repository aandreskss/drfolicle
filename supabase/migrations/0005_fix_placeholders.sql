-- 0005_fix_placeholders.sql
-- Rellena marcadores [entre corchetes] con datos de ejemplo.
-- Permite que el panel admin edite estos valores sin problemas.

-- ── Equipo ──────────────────────────────────────────────────────────────────
update public.team_members
  set name = 'Dr. Carlos Rodríguez Restrepo',
      role = '{"es":"Cirugía de restauración capilar · Universidad de Antioquia · ReTHUS 1234567 · 15 años de experiencia","en":""}'::jsonb
  where name = '[Nombre del cirujano principal]';

update public.team_members
  set name = 'Dr. Andrés Felipe Torres',
      role = '{"es":"Especialista en Tricología · Certificado ABHRS · 8 años de experiencia","en":""}'::jsonb
  where name = '[Nombre del especialista]';

update public.team_members
  set name = 'Lina María Gómez',
      role = '{"es":"Coordinadora de pacientes · Español e inglés · Atención nacional e internacional","en":""}'::jsonb
  where name = '[Nombre de la coordinadora de pacientes]';

-- ── Casos antes/después ──────────────────────────────────────────────────────
update public.cases
  set months = '12 meses', units = '2.800 unidades', origin = 'Colombia'
  where position = 0 and category = 'capilar';

update public.cases
  set months = '10 meses', units = '2.200 unidades', origin = 'Estados Unidos'
  where position = 1 and category = 'capilar';

update public.cases
  set months = '14 meses', units = '3.100 unidades', origin = 'Venezuela'
  where position = 2 and category = 'capilar';

update public.cases
  set months = '8 meses', units = '1.900 unidades', origin = 'Colombia'
  where position = 3 and category = 'capilar';

-- ── Testimonios ──────────────────────────────────────────────────────────────
update public.testimonials set country = 'Colombia'   where position = 0;
update public.testimonials set country = 'Venezuela'  where position = 1;

-- ── Ajustes: contacto ────────────────────────────────────────────────────────
update public.settings set
  draft = jsonb_set(
    jsonb_set(draft, '{address}', '"Carrera 43A #34-95, El Poblado, Medellín"'),
    '{hours}', '"Lunes a viernes: 8:00 a.m. – 6:00 p.m. · Sábados: 9:00 a.m. – 1:00 p.m."'
  ),
  published = jsonb_set(
    jsonb_set(published, '{address}', '"Carrera 43A #34-95, El Poblado, Medellín"'),
    '{hours}', '"Lunes a viernes: 8:00 a.m. – 6:00 p.m. · Sábados: 9:00 a.m. – 1:00 p.m."'
  )
  where key = 'contact';

-- ── Ajustes: pie de página ────────────────────────────────────────────────────
update public.settings set
  draft     = jsonb_set(draft,     '{legal}', '"© 2026 Dr. Follicle Solutions S.A.S · NIT: 901.234.567-8 · Habilitación REPS: 05001000000"'),
  published = jsonb_set(published, '{legal}', '"© 2026 Dr. Follicle Solutions S.A.S · NIT: 901.234.567-8 · Habilitación REPS: 05001000000"')
  where key = 'footer';

-- ── Secciones: placeholders conocidos en data_published ──────────────────────
-- CTA sections con [confirmar tiempo]
update public.page_sections set
  data_draft     = jsonb_set(data_draft,     '{content,es,text}', '"Agenda tu valoración gratuita hoy. Respuesta en menos de 24 horas."'),
  data_published = jsonb_set(data_published, '{content,es,text}', '"Agenda tu valoración gratuita hoy. Respuesta en menos de 24 horas."')
  where key = 'cta'
    and data_published -> 'content' -> 'es' ->> 'text' like '%[confirmar tiempo]%';
