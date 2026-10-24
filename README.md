# Mundaca's Solutions — Landing corporativa

Sitio corporativo construido con Next.js 16 (App Router, componentes de servidor por defecto), TypeScript estricto, CSS Modules + tokens, Resend y almacenamiento opcional de leads en Supabase. Sigue el estándar web premium de la agencia: ver `docs/ART_DIRECTION_GUIDE.md` (marca, paleta, tipografía, composición) y `docs/MACROFASE_ESTANDAR.md` (estado de la remodelación).

## Incluye

- Hero oscuro con onda, ticker, productos propios, caso Cafetal, principio, IA en capas, problemas, soluciones, método, socio tecnológico y contacto.
- Páginas por datos (`src/content`): `/productos/[slug]` y `/soluciones/[slug]` con `generateStaticParams`.
- Fuentes autoalojadas (Fraunces + Figtree vía `@fontsource-variable/*` y `next/font/local`).
- Animaciones propias (`app/template.tsx`, `Reveal`, ticker) con soporte para `prefers-reduced-motion`; sin framer-motion.
- Pruebas: Vitest (unitarias), Playwright en escritorio y móvil, axe WCAG A/AA.
- SEO completo: metadata, Open Graph, Twitter Card, sitemap, robots y JSON-LD (Organization, WebSite, ProfessionalService, SoftwareApplication, BreadcrumbList).
- PWA manifest, favicon y Apple Touch Icon.
- Formulario con validación compartida, honeypot, consentimiento, control de origen, límite de payload y rate limit básico.
- Correos interno y de confirmación mediante Resend.
- Persistencia opcional de leads en Supabase usando la service role solo desde servidor.
- Páginas de Privacidad, Términos, 404 y error seguro.
- Endpoint de salud: `/api/health`.
- Headers de seguridad y respuestas API sin caché.

## Requisitos

- Node.js 22.x.
- Una cuenta de Vercel.
- Una API key de Resend.
- Dominio verificado en Resend para enviar desde `@mundacasolutions.com`.
- Supabase es opcional.

## Desarrollo local

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abrir `http://localhost:3000`.

## Validación antes de desplegar

```bash
npm run check
```

Para comprobar que las variables de producción están completas:

```bash
npm run preflight
```

El comando ejecuta lint, typecheck y build de producción.

## Variables de entorno

```env
NEXT_PUBLIC_SITE_URL=https://mundacasolutions.com
NEXT_PUBLIC_BOOKING_URL=
NEXT_PUBLIC_WHATSAPP_URL=https://wa.me/56966635509?text=Hola%2C%20quiero%20conversar%20con%20Mundaca%27s%20Solutions%20sobre%20una%20necesidad%20de%20mi%20empresa.
NEXT_PUBLIC_CONTACT_EMAIL=contacto@mundacasolutions.com

RESEND_API_KEY=
CONTACT_TO_EMAIL=contacto@mundacasolutions.com
CONTACT_FROM_EMAIL=Mundaca's Solutions <contacto@mundacasolutions.com>

SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_LEADS_TABLE=landing_leads
```

`NEXT_PUBLIC_BOOKING_URL` puede apuntar a Calendly, Cal.com o Google Calendar Appointment Schedule. Al dejarlo vacío, los CTA abren la sección de contacto.

## Configuración de Resend

1. Agregar y verificar `mundacasolutions.com` en Resend.
2. Crear una API key de envío.
3. En Vercel, definir `RESEND_API_KEY` para Production, Preview y Development según corresponda.
4. Definir `CONTACT_TO_EMAIL` con el correo que recibirá las solicitudes.
5. Definir `CONTACT_FROM_EMAIL` con una dirección del dominio verificado.
6. Volver a desplegar después de modificar variables.

Durante pruebas puede usarse:

```env
CONTACT_FROM_EMAIL=Mundaca's Solutions <onboarding@resend.dev>
```

## Persistencia opcional en Supabase

```sql
create table if not exists public.landing_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text not null,
  email text not null,
  phone text,
  service text not null,
  timeline text not null,
  message text not null,
  consent boolean not null default true,
  privacy_version text not null,
  consent_at timestamptz not null,
  source text not null default 'mundaca-solutions-landing',
  status text not null default 'nuevo',
  created_at timestamptz not null default now()
);

alter table public.landing_leads enable row level security;
```

No crear una política pública de inserción. La escritura se realiza desde `/api/contact` usando la service role key, que nunca debe exponerse con el prefijo `NEXT_PUBLIC_`.

## Despliegue en Vercel

1. Subir este proyecto a GitHub.
2. En Vercel, seleccionar **Add New → Project** e importar el repositorio.
3. Framework Preset: **Next.js**.
4. Root Directory: raíz del repositorio.
5. Build Command: `npm run build`.
6. Agregar todas las variables necesarias en **Project Settings → Environment Variables**.
7. Desplegar y comprobar:
   - `/`
   - `/privacidad`
   - `/terminos`
   - `/robots.txt`
   - `/sitemap.xml`
   - `/api/health`
   - envío real del formulario
8. Conectar `mundacasolutions.com` y `www.mundacasolutions.com`.
9. Elegir un único dominio canónico y redirigir el otro desde Vercel.
10. Confirmar los registros DNS de Resend antes de cambiar el remitente definitivo.

## Checklist de lanzamiento

- [ ] Logo oficial revisado.
- [ ] Dominio conectado a Vercel.
- [ ] Dominio verificado en Resend.
- [ ] Formulario probado desde el dominio final.
- [ ] Correo interno recibido correctamente.
- [ ] Correo de confirmación recibido por el prospecto.
- [ ] Tabla Supabase creada, si se utilizará.
- [ ] Enlaces de WhatsApp y agenda revisados.
- [ ] Política de Privacidad revisada con asesoría legal si la campaña lo exige.
- [ ] `npm run check` aprobado.

## Estructura principal

```text
src/
├─ app/                 rutas (home, productos/[slug], soluciones/[slug], contacto, legales, api/contact)
│  ├─ template.tsx      entrada de página (animación en cada navegación)
│  └─ error / loading / not-found / global-error
├─ components/
│  ├─ layout/           Header (menú Soluciones por clic), Footer, WhatsAppFab, HashScroll
│  ├─ ui/               iconos propios, botones, contenedores
│  ├─ motion/           Reveal
│  ├─ sections/         secciones de la home y de las páginas internas
│  ├─ contact/          formulario (usa el mismo schema que la API)
│  ├─ seo/              JSON-LD y migas de pan
│  └─ legal/
├─ content/             todo el texto, tipado (site, home, products, solutions, legal)
├─ lib/                 contact-schema, contact-options, seo, fonts
└─ styles/              tokens · brand · motion · a11y
e2e/  tests/unit/       Playwright (+ axe) y Vitest
docs/                   guía de arte, estado de la macrofase, crédito MadeBy, SEO
```

## Pruebas

```bash
npm test            # Vitest
npm run build && npm run test:e2e   # Playwright escritorio + móvil + axe (puerto 3200, API simulada)
```

Tras cada `build`, reinicia tu servidor (`npm start`) o verás CSS viejo.
