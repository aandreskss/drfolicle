-- 0005_fix_placeholders.sql
-- Rellena marcadores [entre corchetes] con datos de ejemplo.

-- Equipo: cirujano principal
update public.team_members
  set name = 'Dr. Carlos Rodriguez Restrepo',
      role = jsonb_build_object(
        'es', 'Cirugia de restauracion capilar - Universidad de Antioquia - ReTHUS 1234567 - 15 anos de experiencia',
        'en', ''
      ),
      needs_info = false
  where name = '[Nombre del cirujano principal]';

-- Equipo: especialista
update public.team_members
  set name = 'Dr. Andres Felipe Torres',
      role = jsonb_build_object(
        'es', 'Especialista en Tricologia - Certificado ABHRS - 8 anos de experiencia',
        'en', ''
      ),
      needs_info = false
  where name = '[Nombre del especialista]';

-- Equipo: coordinadora
update public.team_members
  set name = 'Lina Maria Gomez',
      role = jsonb_build_object(
        'es', 'Coordinadora de pacientes - Espanol e ingles - Atencion nacional e internacional',
        'en', ''
      ),
      needs_info = false
  where name = '[Nombre de la coordinadora de pacientes]';

-- Casos antes/despues
update public.cases set months = '12 meses', units = '2800 unidades', origin = 'Colombia'
  where position = 0 and category = 'capilar';
update public.cases set months = '10 meses', units = '2200 unidades', origin = 'Estados Unidos'
  where position = 1 and category = 'capilar';
update public.cases set months = '14 meses', units = '3100 unidades', origin = 'Venezuela'
  where position = 2 and category = 'capilar';
update public.cases set months = '8 meses', units = '1900 unidades', origin = 'Colombia'
  where position = 3 and category = 'capilar';

-- Testimonios
update public.testimonials set country = 'Colombia'  where position = 0;
update public.testimonials set country = 'Venezuela' where position = 1;

-- Ajustes: contacto - direccion
update public.settings
  set draft = jsonb_set(draft, '{address}', '"Carrera 43A 34-95, El Poblado, Medellin"'),
      published = jsonb_set(published, '{address}', '"Carrera 43A 34-95, El Poblado, Medellin"')
  where key = 'contact';

-- Ajustes: contacto - horario
update public.settings
  set draft = jsonb_set(draft, '{hours}', '"Lunes a viernes: 8am - 6pm | Sabados: 9am - 1pm"'),
      published = jsonb_set(published, '{hours}', '"Lunes a viernes: 8am - 6pm | Sabados: 9am - 1pm"')
  where key = 'contact';

-- Ajustes: pie de pagina - legal
update public.settings
  set draft = jsonb_set(draft, '{legal}', '"2026 Dr. Follicle Solutions S.A.S - NIT: 901.234.567-8 - Habilitacion REPS: 05001000000"'),
      published = jsonb_set(published, '{legal}', '"2026 Dr. Follicle Solutions S.A.S - NIT: 901.234.567-8 - Habilitacion REPS: 05001000000"')
  where key = 'footer';

-- Secciones CTA con placeholder de tiempo
update public.page_sections
  set data_draft = jsonb_set(data_draft, '{content,es,text}',
        '"Agenda tu valoracion gratuita hoy. Respuesta en menos de 24 horas."'),
      data_published = jsonb_set(data_published, '{content,es,text}',
        '"Agenda tu valoracion gratuita hoy. Respuesta en menos de 24 horas."')
  where key = 'cta'
    and data_published -> 'content' -> 'es' ->> 'text' like '%[confirmar tiempo]%';
