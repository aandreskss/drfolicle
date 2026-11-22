-- Activa "Nuestro método" en la navegación principal
UPDATE public.settings
SET
  published = (
    SELECT jsonb_agg(
      CASE
        WHEN item->>'href' = '/nuestro-metodo'
        THEN jsonb_set(item, '{visible}', 'true')
        ELSE item
      END
    )
    FROM jsonb_array_elements(published) AS item
  ),
  draft = (
    SELECT jsonb_agg(
      CASE
        WHEN item->>'href' = '/nuestro-metodo'
        THEN jsonb_set(item, '{visible}', 'true')
        ELSE item
      END
    )
    FROM jsonb_array_elements(draft) AS item
  )
WHERE key = 'nav_main';
