# CLAUDE.md · Dr Follicle Solutions — Proyecto web

Sitio web premium para una clínica de restauración capilar en Medellín, Colombia. Pacientes locales e internacionales (esp. EE.UU.).

**Handoff con diseño aprobado y migraciones:** `C:\Users\Andre\OneDrive\Documentos\Claude\Projects\Follicle\follicle-handoff\`

---

## ✅ Sitio funcionando en test.drfolliclesolutions.com

### Lección aprendida — GoDaddy subdominios
Al crear un subdominio en GoDaddy/cPanel, la carpeta se crea dentro de `public_html/`, no en la raíz del home. El document root correcto es `/home/grwkxoiacc1p/public_html/test.drfolliclesolutions.com`.

**Para futuros deploys (manual, simple):**
1. `pnpm build` → genera `out/` (usa `.env.local` automáticamente)
2. Comprimir `out/` en zip
3. Subir zip por cPanel File Manager a `public_html/test.drfolliclesolutions.com/`
4. Extraer ahí — permisos ya están correctos desde la extracción anterior

## 🔴 PENDIENTE — Próxima sesión

---

## Estado de la migración estática ✅ COMPLETADA EN CÓDIGO

### Cambios hechos esta sesión
- `output: 'export'` + `trailingSlash: true` + `images.unoptimized: true` en `next.config.ts`
- `generateStaticParams` agregado a `blog/[slug]/page.tsx` y `servicios/[slug]/page.tsx`
- `/app/admin/` y `/app/api/` eliminados
- `/components/admin/` eliminado
- Formulario de contacto → **abre WhatsApp directo** con los datos del form (sin Formspree, sin API)
- `postcss.config.mjs` creado con `@tailwindcss/postcss` para builds webpack
- `out/index.html` creado: detecta idioma del navegador → redirige a `/es/` o `/en/`
- Build local exitoso: 37 páginas estáticas generadas

### Stack actual (post-migración)
Next.js 16 · `output: 'export'` · Tailwind v4 + PostCSS · Supabase (solo build-time, no runtime) · next-intl (es/en) · pnpm

### Supabase sigue activo solo en build time
Los componentes siguen leyendo de Supabase pero SOLO durante `pnpm build`. El HTML generado es completamente estático. No hay dependencia de Supabase en producción.

---

## GoDaddy — Hosting de producción

| Dato | Valor |
|---|---|
| Dominio principal | `drfolliclesolutions.com` |
| Hosting | Web Hosting Deluxe (cPanel) |
| Servidor IP | `208.109.59.203` |
| FTP usuario | `drfolicle@drfolliclesolutions.com` |
| FTP directorio raíz | `/home/grwkxoiacc1p/public_html/test.drfolliclesolutions.com` |
| URL de prueba | `http://test.drfolliclesolutions.com` |
| WordPress (no tocar) | En `public_html/` del mismo hosting |

### Workflow de deploy manual
1. `pnpm build` → genera `out/`
2. Comprimir `out/` en zip
3. Subir zip via cPanel File Manager a `test.drfolliclesolutions.com/`
4. Extraer y verificar permisos (644/755)

### Próximo paso
- Configurar GitHub Actions para deploy automático por rsync/SSH en cada push a `main`
- Cuando esté aprobado, apuntar `drfolliclesolutions.com` al mismo directorio (o mover archivos a `public_html/`)

---

## Stack
Next.js 16 App Router · TypeScript estricto · Tailwind v4 · Supabase (Postgres, solo build-time) · next-intl (es/en) · pnpm

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
| `TurismoSection` | `turismo` | Fondo verde oscuro; **iframe YouTube Short** `X4N6CAHaYjc` en la cápsula principal |
| `TestimoniosSection` | `testimonios` | Slider; filtra por `visible`; **video hardcodeado** `/videos/testimonio-reel.mp4` |
| `ConsultaSection` | `consulta` | Formulario → abre WhatsApp con datos del lead |
| `FaqSection` | `faq` | Acordeón |

## Videos en `public/videos/`
| Archivo | Dónde se usa |
|---|---|
| `beard-treatment.mp4` | CardT1 de Tratamientos (trasplante capilar) |
| `does-it-hurt.mp4` | Card "No duele." en CienciaSection |
| `when-does-it-grow.mp4` | GarantiasSection (columna izquierda) |
| `how-long-capilar.mp4` | Sección FUE en `/servicios/trasplante-capilar` (layout 2 columnas, aspecto 9/16) |
| `testimonio-reel.mp4` | TestimoniosSection — panel de video izquierdo |

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

## Supabase — Free Tier
- Proyecto se pausa si no hay actividad por 7 días. Keepalive configurado en **cron-job.org**: ping HTTP cada 3 días a la REST API con `apikey` (anon key) y `Authorization: Bearer <service_role_key>`.
- Si aparece `ENOTFOUND zcfncpnvetubtgnierac.supabase.co`, el proyecto está pausado → reanudar desde el dashboard de Supabase.

## Decisiones tomadas
- **Admin panel eliminado:** No aplica en sitio estático. Claude Code actúa como CMS — editar archivos `.ts` en `/data/` cuando esté lista la migración de datos.
- **Formulario → WhatsApp directo:** Al enviar el form se construye un mensaje con los datos y se abre `wa.me/` con el texto pre-cargado. Sin APIs ni servicios externos.
- **Supabase solo en build-time:** Los componentes siguen leyendo de Supabase pero el output es HTML estático. En producción no hay llamadas a Supabase.
- **Videos hardcodeados en componentes:** Los videos son assets de producción específicos que no rotan. No pasan por el CMS para evitar complejidad innecesaria.
- **iframe YouTube en ProcesoStepper:** Solo se muestra en `active === 0` (Etapa 1).
- **TurismoSection usa YouTube Short:** iframe en lugar de video local para ahorrar ancho de banda.
- **TestimoniosSection filtra por `visible`:** No por `authorization_confirmed`.
- **Slug-specific layouts en servicios:** Condicionales `slug === 'nombre'` dentro del componente compartido `[slug]/page.tsx`.

## Tokens de diseño clave
- Lima `#C5D300` **solo** sobre fondo oscuro
- Teal `#0196AD` · Teal profundo `#007A8C` · Ink `#0A2730`
- Accent italic: `font-family: 'Instrument Serif'; font-style: italic`
- Grids responsive en `globals.css` (`.g-hero`, `.g-two`, `.g-three`, `.g-spec`, `.g-tour`, etc.)

## Reglas de contenido
- No inventar reseñas, estadísticas, credenciales, precios ni afirmaciones médicas.
- Fotos de pacientes solo con `cases.consent_verified = true`.
- Ningún texto `[entre corchetes]` en producción.
