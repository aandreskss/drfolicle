# CLAUDE.md · Dr Follicle Solutions — Proyecto web

Sitio web premium + panel de administración para una clínica de restauración capilar en Medellín, Colombia. Pacientes locales e internacionales (esp. EE.UU.).

**Handoff con diseño aprobado y migraciones:** `C:\Users\Andre\OneDrive\Documentos\Claude\Projects\Follicle\follicle-handoff\`

## Stack
Next.js 16 App Router · TypeScript estricto · Tailwind v4 · Supabase (Postgres/Auth/Storage/RLS) · Vercel · next-intl (es/en) · pnpm

Comandos: `pnpm dev` · `pnpm lint` · `pnpm typecheck` · `pnpm build`

## Arquitectura
- Las páginas se arman desde `page_sections` en Supabase. El registro en `app/[locale]/page.tsx` mapea `section.key` → componente.
- Todo texto sale del CMS via `pickText()` / `pickItem()` / `pick()`. No codificar copy en componentes salvo etiquetas de UI.
- Videos locales van en `public/videos/` y se referencian con ruta `/videos/nombre.mp4` directamente en el componente.
- El sitio lee solo `v_page_sections` y `v_settings` (publicado). Nunca exponer `data_draft`.
- GitHub: `aandreskss/drfolicle` · rama `main`
- Supabase proyecto ref: `zcfncpnvetubtgnierac`

## Páginas implementadas
- `/` — Home (todos los bloques, ver sección de componentes abajo)
- `/nosotros` · `/nuestro-metodo` · `/turismo-medico` · `/resultados` · `/blog` · `/blog/[slug]` · `/contacto` · `/servicios`
- `/servicios/trasplante-capilar` · `/servicios/trasplante-de-barba` · `/servicios/trasplante-de-cejas` · `/servicios/terapias-capilares`
- `/admin` — panel (login, páginas/secciones, tratamientos, casos, equipo, leads)

## Componentes del Home (`components/inicio/`)

| Componente | CMS key | Notas |
|---|---|---|
| `HeroSection` | `hero` | 3 círculos con imágenes del CMS |
| `ConfianzaSection` | `confianza` | Logos + stats |
| `TratamientosSection` | `tratamientos` | Grid 4 cards; **CardT1** usa video `/videos/beard-treatment.mp4` (autoPlay/loop/muted); **CardT4** (Terapias) muestra imagen `/images/terapias-cirujano.jpg` a la izquierda + texto oscuro a la derecha |
| `ResultadosSection` | `resultados` | Comparador antes/después |
| `CienciaSection` | `ciencia` | Card "No duele." usa **video** `/videos/does-it-hurt.mp4` (con controles) |
| `ProcesoSection` / `ProcesoStepper` | `proceso` | Stepper 5 etapas; **Etapa 1 muestra iframe YouTube** `IurbJx78HvU` |
| `GarantiasSection` | `especialistas` | Reemplaza sección de equipo. Video `/videos/when-does-it-grow.mp4` + 6 diferenciadores en grid |
| `TurismoSection` | `turismo` | Fondo verde oscuro; **iframe YouTube Short** `X4N6CAHaYjc` en la cápsula principal (reemplazó `/videos/from-usa-to-medellin.mp4`) |
| `TestimoniosSection` | `testimonios` | Slider; filtra por `visible`; **video hardcodeado** `/videos/testimonio-reel.mov`; prop `youtubeId` disponible en `TestimoniosClient` para override futuro |
| `ConsultaSection` | `consulta` | Formulario de contacto |
| `FaqSection` | `faq` | Acordeón |

## Videos en `public/videos/`
| Archivo | Dónde se usa |
|---|---|
| `beard-treatment.mp4` | CardT1 de Tratamientos (trasplante capilar) |
| `does-it-hurt.mp4` | Card "No duele." en CienciaSection |
| `when-does-it-grow.mp4` | GarantiasSection (columna izquierda) |
| `how-long-capilar.mp4` | Sección FUE en `/servicios/trasplante-capilar` (layout 2 columnas, aspecto 9/16) |
| `testimonio-reel.mov` | TestimoniosSection — panel de video izquierdo |

## Imágenes en `public/images/`
| Archivo | Dónde se usa |
|---|---|
| `terapias-cirujano.jpg` | CardT4 en TratamientosSection; hero fallback en `/servicios/terapias-capilares` |

## Páginas de servicios (`app/[locale]/servicios/[slug]/page.tsx`)
- **`trasplante-capilar`** — Sección FUE usa layout 2 columnas: título+texto izquierda, video `how-long-capilar.mp4` derecha (aspecto 9/16, `maxHeight: 520px`). La lógica usa `slug === 'trasplante-capilar'`.
- **`terapias-capilares`** — Hero usa imagen hardcodeada `/images/terapias-cirujano.jpg` como fallback cuando no hay `heroImgUrl` del CMS. La lógica usa `slug === 'terapias-capilares'`.

## Blog
- 5 artículos con contenido completo en Supabase (body JSONB `{es:[], en:[...bloques...]}`).
- Bloques soportados: `{type:'p'|'h2'|'quote'|'img', text:'...'}`.
- Script de seed: `scripts/seed-blog.mjs` (Node ESM, lee keys de `.env.local`).
- Migración SQL: `supabase/migrations/0006_blog_content.sql`.
- Para re-aplicar: `node scripts/seed-blog.mjs` desde la raíz del proyecto.

## Supabase — Free Tier
- Proyecto se pausa si no hay actividad por 7 días. Keepalive configurado en **cron-job.org**: ping HTTP cada 3 días a la REST API con `apikey` (anon key) y `Authorization: Bearer <service_role_key>`.
- Si aparece `ENOTFOUND zcfncpnvetubtgnierac.supabase.co`, el proyecto está pausado → reanudar desde el dashboard de Supabase.

## Decisiones tomadas
- **Sección de equipo eliminada del home:** El cliente opera en varias clínicas y no quiere mostrar los cirujanos. Se reemplazó `EspecialistasSection` por `GarantiasSection` (key `especialistas` se mantiene para respetar el CMS). Los datos de equipo siguen existiendo en la BD y en `/nosotros`.
- **Videos hardcodeados en componentes:** Los videos son assets de producción específicos que no rotan. No pasan por el CMS para evitar complejidad innecesaria.
- **iframe YouTube en ProcesoStepper:** Solo se muestra en `active === 0` (Etapa 1). CSP `frame-src` configurada en `next.config.ts` para permitir `www.youtube.com`.
- **TurismoSection usa YouTube Short:** La cápsula de video usa iframe en lugar de video local para ahorrar ancho de banda y facilitar actualizaciones.
- **TestimoniosSection filtra por `visible`:** No por `authorization_confirmed` (que estaba todo en `false` en seed). `visible = true` en todos los testimonios del seed.
- **CardT4 layout imagen+texto:** Imagen del cirujano a la izquierda (42% flex), texto sobre fondo `#00566E` a la derecha. No usa CMS para la imagen.
- **Slug-specific layouts en servicios:** En vez de crear archivos de página separados, se usan condicionales `slug === 'nombre'` dentro del componente compartido `[slug]/page.tsx`.

## Tokens de diseño clave
- Lima `#C5D300` **solo** sobre fondo oscuro
- Teal `#0196AD` · Teal profundo `#007A8C` · Ink `#0A2730`
- Accent italic: `font-family: 'Instrument Serif'; font-style: italic`
- Grids responsive en `globals.css` (`.g-hero`, `.g-two`, `.g-three`, `.g-spec`, `.g-tour`, etc.)
- `export const instant = false` en rutas dinámicas con params

## Reglas de contenido
- No inventar reseñas, estadísticas, credenciales, precios ni afirmaciones médicas.
- Fotos de pacientes solo con `cases.consent_verified = true`.
- Ningún texto `[entre corchetes]` en producción.
