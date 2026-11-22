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
| `TratamientosSection` | `tratamientos` | Grid 4 cards; **CardT1 usa video** `/videos/beard-treatment.mp4` (autoPlay/loop/muted) |
| `ResultadosSection` | `resultados` | Comparador antes/después |
| `CienciaSection` | `ciencia` | Card "No duele." usa **video** `/videos/does-it-hurt.mp4` (con controles) |
| `ProcesoSection` / `ProcesoStepper` | `proceso` | Stepper 5 etapas; **Etapa 1 muestra iframe YouTube** `IurbJx78HvU` |
| `GarantiasSection` | `especialistas` | Reemplaza sección de equipo (decisión: clínica opera en varias sedes). Video `/videos/when-does-it-grow.mp4` + 6 diferenciadores en grid |
| `TurismoSection` | `turismo` | Fondo verde oscuro; **video** `/videos/from-usa-to-medellin.mp4` reemplaza carousel de fotos (autoPlay/loop/muted) |
| `TestimoniosSection` | `testimonios` | Slider de testimonios |
| `ConsultaSection` | `consulta` | Formulario de contacto |
| `FaqSection` | `faq` | Acordeón |

## Videos en `public/videos/`
| Archivo | Dónde se usa |
|---|---|
| `beard-treatment.mp4` | CardT1 de Tratamientos (trasplante capilar) |
| `does-it-hurt.mp4` | Card "No duele." en CienciaSection |
| `when-does-it-grow.mp4` | GarantiasSection (columna izquierda) |
| `from-usa-to-medellin.mp4` | TurismoSection (cápsula principal) |

## Decisiones tomadas
- **Sección de equipo eliminada del home:** El cliente opera en varias clínicas y no quiere mostrar los cirujanos. Se reemplazó `EspecialistasSection` por `GarantiasSection` (key `especialistas` se mantiene para respetar el CMS). Los datos de equipo siguen existiendo en la BD y en `/nosotros`.
- **Videos hardcodeados en componentes:** Los videos son assets de producción específicos que no rotan. No pasan por el CMS para evitar complejidad innecesaria.
- **iframe YouTube en ProcesoStepper:** Solo se muestra en `active === 0` (Etapa 1). CSP `frame-src` configurada en `next.config.ts` para permitir `www.youtube.com`.

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
