# CLAUDE.md · Dr Follicle Solutions — Proyecto web

Sitio web premium para una clínica de restauración capilar en Medellín, Colombia. Pacientes locales e internacionales (esp. EE.UU.).

**Handoff con diseño aprobado:** `C:\Users\Andre\OneDrive\Documentos\Claude\Projects\Follicle\follicle-handoff\`

---

## Stack

Next.js 16.4.5 App Router · TypeScript · Tailwind v4 + PostCSS · Supabase (runtime) · next-intl (es/en) · pnpm

Comandos: `pnpm dev` · `pnpm lint` · `pnpm typecheck` · `pnpm build`

**No es export estático.** El sitio corre como servidor Next.js completo. `output: 'export'` fue eliminado.

---

## Deploy

- **Plataforma:** Railway — auto-deploy en cada push a `main` de `aandreskss/drfolicle`
- **Build:** Railway ejecuta `pnpm build` y levanta el servidor Next.js
- **Tiempo de build:** ~3-5 minutos desde el push hasta live
- El sitio en producción es `drfolicle-production.up.railway.app`

---

## Arquitectura

- Páginas se arman desde `page_sections` en Supabase. `app/[locale]/page.tsx` mapea `section.key` → componente.
- Todo texto sale del CMS via `pickText()` / `pickItem()`. No codificar copy en componentes salvo etiquetas de UI pequeñas y fallbacks.
- El sitio lee `v_page_sections` y `v_settings` (vistas de publicado). Nunca exponer `data_draft`.
- GitHub: `aandreskss/drfolicle` · rama `main`
- Supabase proyecto ref: `zcfncpnvetubtgnierac`

---

## Supabase — Runtime

Los componentes leen Supabase **en tiempo de ejecución** (no solo en build).

- `lib/content/client.ts` usa `cache: 'no-store'` en el fetch para evitar que el Data Cache de Next.js persista respuestas entre builds en Railway.
- Tabla `page_sections`: columnas `data_draft` / `data_published` (JSONB). La app solo lee `v_page_sections` (vista de `data_published`).
- Tabla `settings`: columnas `draft` / `published` (JSONB). La app solo lee `v_settings`.
- **Free Tier:** El proyecto se pausa tras 7 días sin actividad. Keepalive en **cron-job.org**: ping HTTP cada 3 días. Si aparece `ENOTFOUND zcfncpnvetubtgnierac.supabase.co` → reanudar desde el dashboard de Supabase.

### Estructura de datos en page_sections

```
data_published: {
  content: { es: { t1, t2, text, ... }, en: { t1, t2, text, ... } },
  lists: {
    <listKey>: {
      items: [{ visible: bool, es: { t, d, ... }, en: { t, d, ... } }]
    }
  },
  slots: [{ src: string }]
}
```

### pickText / pickItem

- `pickText(o, lang)` — merge de `o.es` con campos no-vacíos de `o[lang]`. Si `en` está vacío, retorna valores ES.
- `pickItem(it, lang)` — `lang === 'en' ? { ...it.es, ...nonEmpty(it.en) } : it.es`. Si `it.en` está vacío, retorna valores ES → causa texto en español en modo EN. **Fix: seed las traducciones EN en Supabase.**

---

## i18n

- Dos locales: `es` (default) y `en`. Rutas: `/es/...` y `/en/...`.
- Todas las páginas deben usar `generateMetadata` (async, recibe `params`) en lugar de `export const metadata` estático.
- `components/layout/Header.tsx` tiene `EN_NAV_LABELS` — mapa `href → label EN` como fallback cuando `item.label.en` está vacío en Supabase.
- Orden del navbar viene del campo `position` en `settings.nav_main` (Supabase).

### Orden del navbar actual

| position | href | visible |
|---|---|---|
| 0 | `/` | ✓ |
| 1 | `/servicios` | ✓ |
| 2 | `/nuestro-metodo` | ✓ |
| 3 | `/turismo-medico` | ✓ |
| 4 | `/resultados` | ✓ |
| 5 | `/blog` | ✓ |
| 6 | `/contacto` | ✓ |
| 7 | `/nosotros` | ✗ |

---

## Páginas implementadas

| Ruta | Archivo | Notas |
|---|---|---|
| `/` | `app/[locale]/page.tsx` | Home, todos los bloques CMS |
| `/servicios` | `app/[locale]/servicios/page.tsx` | Grid de tratamientos |
| `/servicios/[slug]` | `app/[locale]/servicios/[slug]/page.tsx` | Página dinámica por tratamiento |
| `/nuestro-metodo` | `app/[locale]/nuestro-metodo/page.tsx` | STEPS/TIMELINE hardcodeados EN/ES + CMS override en `etapas` |
| `/turismo-medico` | `app/[locale]/turismo-medico/page.tsx` | Stepper `viaje.etapas` del CMS |
| `/resultados` | `app/[locale]/resultados/page.tsx` | Galería de casos + testimonios |
| `/blog` | `app/[locale]/blog/page.tsx` | Listado artículos |
| `/blog/[slug]` | `app/[locale]/blog/[slug]/page.tsx` | Artículo individual |
| `/contacto` | `app/[locale]/contacto/page.tsx` | Form + canales + mapa |
| `/privacidad` | `app/[locale]/privacidad/page.tsx` | Política privacidad/términos — **contenido hardcodeado EN/ES**, 20 secciones |
| `/nosotros` | `app/[locale]/nosotros/page.tsx` | Oculto en navbar (visible: false) |

---

## Seed scripts (`scripts/`)

Todos son Node ESM, leen `.env.local` para las keys de Supabase.

| Script | Qué hace |
|---|---|
| `seed-blog.mjs` | Artículos del blog (body JSONB) |
| `seed-services.mjs` | Traducciones EN de items de listas en páginas de servicios (63 items) |
| `seed-turismo.mjs` | Traducciones EN de 7 etapas de `viaje.etapas` en turismo-medico |
| `seed-contacto-metodo.mjs` | EN para `contacto.hero.avisos` (2 items) y `nuestro-metodo.etapas.etapas` (4 items) |
| `fix-nav-order.mjs` | Reordena posiciones del navbar en `settings.nav_main` |
| `check-nav.mjs` | Imprime el estado actual de `nav_main` en Supabase |

**Patrón de seed para list items:**
```js
updateListItem(pageSlug, sectionKey, listKey, esT, enData)
// Busca item donde item.es.t === esT y merge enData en item.en
// Actualiza data_draft y data_published
```

**Patrón de update para settings:**
```js
// settings table usa columnas `draft` y `published` (no value_draft/value_published)
// Filtrar por .eq('key', 'nav_main'), no hay columna id
```

---

## Componentes del Home (`components/inicio/`)

| Componente | CMS key | Notas |
|---|---|---|
| `HeroSection` | `hero` | 3 círculos con imágenes del CMS |
| `ConfianzaSection` | `confianza` | Logos + stats |
| `TratamientosSection` | `tratamientos` | Grid 4 cards; CardT1 usa video `/videos/beard-treatment.mp4`; CardT4 usa imagen `/images/terapias-cirujano.jpg` |
| `ResultadosSection` | `resultados` | Comparador antes/después |
| `CienciaSection` | `ciencia` | Card "No duele." usa video `/videos/does-it-hurt.mp4` |
| `ProcesoSection` / `ProcesoStepper` | `proceso` | Stepper 5 etapas; Etapa 1 muestra iframe YouTube `IurbJx78HvU` |
| `GarantiasSection` | `especialistas` | Video `/videos/when-does-it-grow.mp4` + 6 diferenciadores |
| `TurismoSection` | `turismo` | Fondo verde oscuro; iframe YouTube Short `X4N6CAHaYjc` |
| `TestimoniosSection` | `testimonios` | Slider; filtra por `visible`; video `/videos/testimonio-reel.mp4` |
| `ConsultaSection` | `consulta` | Formulario → abre WhatsApp con datos del lead |
| `FaqSection` | `faq` | Acordeón |

---

## Componentes de layout

- **`Header.tsx`** — Server component. Carga `nav_main` y `treatments` de Supabase. `EN_NAV_LABELS` como fallback de etiquetas EN.
- **`HeaderInner.tsx`** — Client component. Dropdown de servicios, hamburger, lang switcher.
- **`MobileBar.tsx`** — CTA flotante en mobile. CTA y mensaje WA son locale-aware.
- **`WhatsAppButton.tsx`** — Botón flotante WA. Mensaje EN/ES según locale.
- **`Footer.tsx`** — Links de privacidad apuntan a `/privacidad` (interno). `exploreLinks` hardcodeados EN/ES.

---

## Páginas de servicios

- **`trasplante-capilar`** — Sección FUE: layout 2 col, video `how-long-capilar.mp4` derecha (aspecto 9/16). Lógica: `slug === 'trasplante-capilar'`.
- **`terapias-capilares`** — Hero fallback: imagen `/images/terapias-cirujano.jpg`. Lógica: `slug === 'terapias-capilares'`.

---

## Videos en `public/videos/`

| Archivo | Dónde se usa |
|---|---|
| `beard-treatment.mp4` | CardT1 de Tratamientos |
| `does-it-hurt.mp4` | CienciaSection |
| `when-does-it-grow.mp4` | GarantiasSection |
| `how-long-capilar.mp4` | Sección FUE en `/servicios/trasplante-capilar` |
| `testimonio-reel.mp4` | TestimoniosSection |
| `from-usa-to-medellin.mp4` | Sin uso confirmado aún |

---

## Tokens de diseño clave

- Lima `#C5D300` **solo** sobre fondo oscuro
- Teal `#0196AD` · Teal profundo `#007A8C` · Ink `#0A2730`
- Accent italic: `font-family: 'Instrument Serif'; font-style: italic`
- Grids responsive en `globals.css`: `.g-hero`, `.g-two`, `.g-three`, `.g-four`, `.g-spec`, `.g-tour`, `.g-foot`, `.g-faq`

---

## Reglas de contenido

- No inventar reseñas, estadísticas, credenciales, precios ni afirmaciones médicas.
- Fotos de pacientes solo con `cases.consent_verified = true`.
- Ningún texto `[entre corchetes]` en producción.
- Toda página nueva debe tener `generateMetadata` async con variantes ES/EN.
