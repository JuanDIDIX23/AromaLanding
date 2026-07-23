# AromaticCol — Landing + Panel de administración

Landing pública y panel de administración de **AromaticCol**, marca colombiana de
aromatización de espacios y bienestar sensorial. Construido con React 19 +
TypeScript + Vite, Tailwind CSS v4 y Supabase.

> El contexto de marca (misión, visión, glosario de productos, tono) vive en
> [`CLAUDE.md`](./CLAUDE.md) y es la fuente de verdad para todo el copy.

## Requisitos

- Node.js 20+ (probado con 24)
- Una cuenta gratuita en [Supabase](https://supabase.com)

## Puesta en marcha

### 1. Instalar dependencias

```bash
npm install
```

### 2. Crear el backend en Supabase

1. Crea un proyecto nuevo en [supabase.com](https://supabase.com).
2. Abre **SQL Editor → New query**, pega el contenido de
   [`supabase/schema.sql`](./supabase/schema.sql) y ejecútalo (crea tablas, RLS y
   el bucket de imágenes).
3. *(Opcional)* Ejecuta [`supabase/seed.sql`](./supabase/seed.sql) para tener
   contenido de ejemplo y ver la landing con datos antes de subir tus fotos.
4. Crea tu usuario administrador en **Authentication → Users → Add user**
   (email + contraseña). Con esas credenciales entrarás a `/admin`.

### 3. Variables de entorno

Copia `.env.example` a `.env` y rellena:

```
VITE_SUPABASE_URL=          # Settings → API → Project URL
VITE_SUPABASE_ANON_KEY=     # Settings → API → anon public key
VITE_STORE_URL=             # URL de la tienda (déjalo vacío por ahora)
VITE_WHATSAPP_NUMBER=       # ej: 573001234567
VITE_INSTAGRAM_URL=         # ej: https://instagram.com/aromaticcol
```

> Los enlaces de WhatsApp/Instagram/tienda también se pueden editar desde
> **/admin → Configuración**, que tiene prioridad sobre estas variables.

### 4. Ejecutar

```bash
npm run dev      # desarrollo (http://localhost:5173)
npm run build    # build de producción
npm run preview  # previsualizar el build
npm run lint     # oxlint
```

## Estructura

```
src/
  lib/            supabase.ts, utils.ts, env.ts
  contexts/       AuthContext (Supabase Auth)
  types/          tipos de dominio
  hooks/          useProductos, useFerias, useGaleria, useCobertura,
                  useConfig, useProspectos (+ CRUD para el admin)
  admin/          panel protegido (/admin): CRUD + bandeja de prospectos
  landing/
    sections/     Navbar, Hero, Nosotros, Products, Ferias, Galeria,
                  Cobertura, Contacto, Footer
    shared/       Button, Badge, SectionHeading, Reveal, SmartImage,
                  Lightbox, icons
    constants/    textos y navegación
supabase/         schema.sql (tablas + RLS + storage) y seed.sql
```

## Cómo administrar el contenido

Entra a **`/admin`** con tu usuario de Supabase. Desde ahí puedes gestionar, sin
tocar código:

- **Productos** — catálogo; marca "Destacado" para que aparezcan en la landing.
- **Ferias** — el estado (activa / próxima / pasada) se calcula solo por fechas.
- **Galería** — fotos reales; también alimentan el fondo del Hero.
- **Cobertura** — ciudades con presencia (el conteo se refleja en las estadísticas).
- **Prospectos** — bandeja de leads del formulario de contacto.
- **Configuración** — estadísticas del Hero y enlaces de contacto/tienda.

Las imágenes se suben a **Supabase Storage** (bucket `imagenes`), no se pegan URLs.

## Notas de diseño

- La landing degrada con elegancia: si aún no hay datos o imágenes, muestra
  placeholders de marca y omite bloques vacíos (p. ej. las estadísticas del Hero).
- La tienda e-commerce es un proyecto aparte: aquí solo se enlaza vía
  `VITE_STORE_URL`. Si está vacío, el botón "Explorar tienda completa" cae a
  WhatsApp automáticamente.
- Sin Supabase configurado la app no se rompe; el panel avisa que faltan las
  variables de entorno.
