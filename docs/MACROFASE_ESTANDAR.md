# MACROFASE · todo el catálogo de Mundaca's Solutions al nuevo estándar

Checklist vivo por pieza. Se actualiza al cerrar cada fase. Regla de oro: **no se marca nada como pasado si no se ejecutó**.

## Dónde vive cada pieza (descubierto en disco, 2026-10-23)

| Fase | Pieza | Carpeta local | Remoto | Rama de trabajo |
| --- | --- | --- | --- | --- |
| 1 | mundacasolutions.com | `Empresa\Mundacas Solutions Landing\mundaca-solutions` | `cristobalMundacaV/mundaca-solutions` | `remodelacion-estandar-premium` (base: `origin/master`, que incluye el cierre SEO) |
| 2 | Landing de Foodies | `Personales\RestoPlus\foodies-landing` | `cristobalMundacaV/RestoPlus` (el `CLAUDE.md` lo nombra canónico) | por crear |
| 3 | Landing de Carbono Zero | `Empresa\Productos Estrellas\carbono-zero\carbono-landing` | `Mundaca-Solutions/carbono-zero` | por crear |
| 4 | Delanoe Motos | `Clientes\Claudio Delanoe\delanoeMotos` (sin git) | por confirmar | por crear |
| 5 | Consultora jurídica | `Clientes\Pia Caro\web-consultora-juridica` | `cristobalMundacaV/web-consultora-juridica` | por crear |
| 6 | Clínica Dib / Bahamonde | `Clientes\Paulina Vargas\starter`, `Clientes\Carlos Bahamonde\carlos-bahamonde-store` | `Mundaca-Solutions/clinica-dib-cl`, `Mundaca-Solutions/bahamonde-store` | por crear |
| 7 | Sección "Resultados" | mundaca-solutions | — | misma rama de la Fase 1 |

Sin commit ni push en ninguna fase hasta que el dueño lo pida.

## Fase 1 · mundacasolutions.com

### Hecho

- [x] Guía de arte escrita ANTES de construir: `docs/ART_DIRECTION_GUIDE.md` (paleta azul noche `#071425` + latón `#e6b450`, texto de acento sobre claro `#8a5a00`).
- [x] Estructura estándar: `src/styles/{tokens,brand,motion,a11y}.css` + CSS Modules. Se borraron `globals.css` (2.673 líneas), los 6 `landing-saas*.css` y `seo-pages.css`.
- [x] Fuentes Fraunces + Figtree autoalojadas (`@fontsource-variable/*` + `next/font/local`); se quitó Inter/Manrope.
- [x] Home servida desde el servidor (antes: un solo `"use client"` de 684 líneas). Cliente solo en Header, Reveal, WhatsAppFab, HashScroll y formulario.
- [x] Sin framer-motion ni lucide-react; iconos propios; entrada de página con `app/template.tsx` (sin blur).
- [x] `src/content/*.ts` tipado; `/productos/[slug]` y `/soluciones/[slug]` por datos con `generateStaticParams` (`dynamicParams = false`).
- [x] Orden de la home según la misión: hero con onda → ticker → productos → Cafetal → principio 4+4 → IA en capas → problemas → soluciones (oscuro) → método → socio → contacto → footer. (Resultados entra en la Fase 7.)
- [x] Header con menú "Soluciones" que abre por CLIC (Escape, clic fuera, foco), cajón móvil; botón flotante WhatsApp `#0f7a3b`, oculto en `/contacto`.
- [x] Las tres soluciones enlazadas desde la home, el menú y el footer.
- [x] Bug JSON-LD: el logo de Organization apuntaba a `logo-mundaca-solutions.png`; ahora usa un archivo que existe (y hay prueba que lo verifica). Se usa la versión a color (`logo-mundacas-solutions-color.png`) porque el logo blanco no se ve sobre el fondo claro de los buscadores.
- [x] Anclas: `bookingUrl` por defecto `/#contacto`; `/#cafetal` y `/#metodo`. Además `HashScroll`: Next no scrolleaba a la ancla cuando la pantalla de carga se montaba antes que la sección (bug real reproducido bajo carga).
- [x] SEO: se conservaron URLs, title/description/canonical, H1, sitemap de 11 rutas, robots con `Disallow: /api/`, JSON-LD y hubs `/productos/*`; se agregó BreadcrumbList; Open Graph por página.
- [x] Corregido: las descripciones de `/productos/foodies` y `/productos/carbono-zero` salían con `&apos;` literal; la miga de pan de `/productos` decía "Inicio / Inicio / Productos".
- [x] Extraído el schema zod a `src/lib/contact-schema.ts`; la API (`route.ts`) quedó con su lógica intacta (rate limit, honeypot, origen, Resend).
- [x] Formulario con errores por campo en español simple + ícono; ningún mensaje técnico llega al usuario ("Failed to fetch" se detectó y corrigió).
- [x] Páginas internas con contenido ya existente reutilizado (tarjetas, problemas, método, casos); nada inventado.
- [x] Referencia del crédito de agencia en `docs/madeby/` (la home de la agencia no lleva `MadeBy`).
- [x] Next 16.2.10 → 16.4.3 (la auditoría marcaba una vulnerabilidad crítica en `next` ≤ 16.4.0), React 19.3, `@types/node` 22.

### Verificación ejecutada (puerto 3200 para e2e, 3300 para revisión visual)

| Chequeo | Resultado |
| --- | --- |
| `tsc --noEmit` | limpio |
| `eslint .` | limpio |
| Vitest | 31 de 31 pasan (4 archivos) |
| `next build` | limpio, 15 páginas estáticas, 0 rutas dinámicas salvo `/api/*` |
| Playwright (escritorio 1440 + móvil 375) | 159 pasan · 41 omitidas a propósito (pruebas solo-escritorio o solo-móvil) · 0 fallan (200 pruebas; la suite anterior de 186 se corrió dos veces seguidas sin fallas, la ampliada una vez) |
| Revisiones ECC | `react-reviewer`, `security-reviewer`, `silent-failure-hunter` corridos; hallazgos aplicados: cajón móvil (resize/atrás/foco/`inert`), `HashScroll` con hash mal formado, región `status` persistente, honeypot con etiqueta neutra, foco al primer campo inválido, sitemap/robots derivados del contenido, validaciones de contenido que fallan en el build, CI con `npm ci` + audit + tests + e2e |
| No corrido en esta fase | `performance-optimizer` y `seo-specialist` (sin Lighthouse); prueba de CSP; la API `/api/contact` real (siempre simulada) |
| axe WCAG A/AA (2.0, 2.1, 2.2) | 0 violaciones en las 11 rutas + 404 + menú abierto + cajón móvil + formulario con error |
| Medidas con JS | sin scroll horizontal Y nada cortado al borde derecho a 1440 y 375; tarjetas de igual altura por fila; principio 4+4 (2×4 en celular); soluciones 2+2; problemas 4 en fila |
| Consola y red | sin errores en las 11 rutas; ninguna petición a Google Fonts |
| Navegador real | revisado a 1440 y 375 (capturas por tramos); se corrigieron en la revisión: título del hero demasiado alto, botones de tarjeta inconsistentes, número de tarjeta sobre el logo, desborde en móvil |

### Pendiente / decisión del dueño

- [ ] **Correo visible**: la producción muestra `NEXT_PUBLIC_CONTACT_EMAIL` (un gmail) y el código por defecto es `contacto@mundacasolutions.com`. Hoy un solo lugar (`src/content/site.ts`) decide para header, footer, contacto y legales; el valor por defecto es `contacto@mundacasolutions.com`. Falta que el dueño confirme cuál mostrar.
- [ ] Sección "Resultados" (Fase 7).
- [ ] Textos legales sin cambios de fondo; revisión legal sigue pendiente del dueño.
- [ ] Hallazgos de seguridad PRE-EXISTENTES en `/api/contact` (no se tocaron por instrucción): la confirmación se envía a cualquier correo que escriba quien llena el formulario (posible relé de spam), el rate limit es en memoria y confía en `x-forwarded-for`, el `Origin` ausente se acepta. Recomendado: reto anti-bot (Turnstile), límite por correo y almacenamiento durable.
- [ ] Sin Content-Security-Policy (hay HSTS, XFO, nosniff, etc.). Recomendado: partir en modo "report-only".
- [ ] `package-lock.json` es nuevo y debe versionarse (el CI ahora usa `npm ci`).
- [ ] Rendimiento: no se corrió Lighthouse en esta fase.

## Fase 2 · Landing de Foodies (`Personales\RestoPlus\foodies-landing`)

Verificación ejecutada el 2026-10-23 después de los últimos arreglos de revisión (Header con `inert` en el skip link, `error.tsx`):

| Chequeo | Resultado |
| --- | --- |
| `tsc --noEmit` / `eslint` | limpios |
| Vitest | 34 de 34 pasan (3 archivos) |
| `next build` | limpio |
| Playwright (escritorio + móvil) | 194 pasan · 36 omitidas a propósito · 0 fallan |

Restricciones respetadas: sin push, sin deploy, sin SSH a producción, lógica de pago intacta.

- [ ] Decisión del dueño: republicar los planes de instalación; host canónico (`webfoodies` vs `foodies`); el identificador `Checkout:` visible en pantalla.

## Fase 3 · Landing de Carbono Zero (`Empresa\Productos Estrellas\carbono-zero\carbono-landing`, rama `remodelacion-landing-estandar`)

Reescrita sobre `src/{app,components,content,lib,styles}` en TypeScript, con guía de arte (`docs/ART_DIRECTION_GUIDE.md`) y `docs/REMODELACION-LANDING.md`. Se retiraron `app/` y `components/` antiguos con `git rm`.

| Chequeo (corrida de la fase) | Resultado |
| --- | --- |
| Vitest | 32 de 32 |
| Playwright | 166 pasan · 36 omitidas · 0 fallan |
| axe WCAG A/AA | 0 violaciones |
| `npm audit` | 0 vulnerabilidades |

- [ ] Decisión del dueño: imagen Open Graph 1200×630, ofertas/JSON-LD, paneles de demostración con `aria-hidden`.

## Fase 4 · Delanoe Motos — NO se modificó

Quedó sin tocar a propósito: es un sistema en producción (Vite + Django) y hay una decisión que solo el dueño puede tomar.

- [ ] **Decisión:** restilizar en sitio manteniendo Vite + Django, o migrar el sitio público a Next.js sobre el starter.
- [ ] **Hallazgo urgente de seguridad:** hay volcados de base de datos (SQL) versionados en GitHub. Hay que retirarlos del historial y rotar las credenciales que contengan.

## Fase 5 · Consultora jurídica → `PC Consultoría` (`Clientes\Pia Caro\pc-consultoria`, repo nuevo sin commits)

Se **rehízo desde cero** sobre `mundaca-web-starter` por pedido del dueño ("la hice con otras herramientas, no queda buena"). Usa solo el contenido existente; todo lo no confirmado figura como "Por confirmar". El repo viejo (`web-consultora-juridica`) no se tocó.

| Chequeo | Resultado |
| --- | --- |
| `tsc --noEmit` / `eslint` / `audit:purity` | limpios / limpio / 0 hallazgos |
| Vitest | 47 de 47 (8 archivos) |
| Playwright (escritorio 1440 + móvil 375) | 146 pasan · 30 omitidas a propósito · 0 fallan (incluye axe WCAG 2.2 A/AA) |
| `npm audit` | 0 vulnerabilidades |
| Revisión (`react-reviewer`) | 4 altos + 5 medios corregidos; los de severidad baja no se trataron |

Detalle en `pc-consultoria/docs/ENTREGA.md`, `PENDIENTES_DEL_CLIENTE.md` y `ANTES_DE_PUBLICAR.md`.

- [ ] Sin panel de administración (el sitio anterior tenía un CMS Django): confirmar si se necesita uno.
- [ ] Confirmar "dos abogadas", razón social, RUT, domicilio, correo visible; revisión legal de los textos.
- [ ] Producción: `MAIL_PROVIDER=resend`, `MAIL_TO/FROM`, `NEXT_PUBLIC_SITE_URL`; confirmar licencia de la imagen de fondo.
- [ ] Repo antiguo: `data_dump.json` versionado con tablas de usuarios y sesiones.
- No verificado: envío real por Resend, Turnstile real, Lighthouse.

## Fase 6 · Crédito MadeBy en los sitios de clientes

Logo de Mundaca's Solutions (clic abre en pestaña nueva con `rel="noopener noreferrer"`) en el pie de cada sitio, con el mismo componente `MadeBy`/`FooterBar`.

| Sitio | Rama | Tsc / eslint | Vitest | Playwright |
| --- | --- | --- | --- | --- |
| Bahamonde (`carlos-bahamonde-store`) | `madeby-logo-estandar` | limpios | 57 de 57 | 74 pasan · 26 omitidas · 0 fallan |
| Clínica Dib (`Paulina Vargas\starter`) | `panel-contenido` | limpios | 168 de 168 | 113 pasan · 11 omitidas · 0 fallan |
| PC Consultoría | (repo nuevo) | limpios | ver Fase 5 | ver Fase 5 |
| Foodies, Carbono, mundacasolutions.com | ver sus fases | | | |

Notas: en Dib el árbol de trabajo ya tenía cambios ajenos a este crédito (workflows de deploy, `docs/DEPLOY*.md`); no se tocaron. `npm run audit:purity` en Dib marca `docs/PANEL_CONTENIDO.md` por marca de la plantilla de la clínica (ya existía). Delanoe: sin cambios (Fase 4).

## Fase 7 · Sección "Resultados" (mundacasolutions.com)

`src/content/results.ts` (filtro `visibleResults`: productos propios + clientes autorizados con URL), `ResultsSection` al final de la home, pruebas `tests/unit/results.test.ts` y `e2e/results.spec.ts`. Corrida de la fase: Vitest 44, Playwright 172 pasan · 42 omitidas · 0 fallan.

- [ ] **Autorización por cliente antes de nombrarlo o enlazarlo.** URL conocida: Clínica Dib (`https://clinicadib.cl`). Sin URL confirmada: Bahamonde, Delanoe, consultora. Mientras no haya autorización, el cliente no se muestra.
