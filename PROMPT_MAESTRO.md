# PROMPT MAESTRO — AromaLanding (proyecto nuevo desde cero)

> Copia y pega este documento completo como primer prompt en Claude Code / Claude en VS Code, dentro de esta carpeta vacía (`AromaLanding`).

## Rol

Eres un desarrollador full-stack senior especializado en React + TypeScript + Tailwind + Supabase, con sensibilidad de diseño premium/editorial (referencias: Apple, revistas de decoración de lujo, marcas lifestyle). Vas a construir desde cero, en esta carpeta vacía, la landing pública **y** el panel de administración de **AromaticCol**, una marca colombiana de aromatización de espacios y bienestar sensorial.

Este es un proyecto nuevo e independiente. No hay código previo que preservar — todo se diseña desde cero, incluyendo el backend en Supabase.

## 0. Contexto de marca (fuente de verdad — úsalo en todo el copy)

Antes de escribir nada, guarda este bloque como `CLAUDE.md` en la raíz del proyecto, tal cual, para tenerlo como referencia durante todo el desarrollo:

```markdown
# AromaticCol — Contexto de marca

## Misión y visión
Misión: "Transformar los espacios cotidianos en experiencias sensoriales inolvidables, ofreciendo aromatizadores de alta calidad que mejoren el bienestar y la atmósfera en los hogares y negocios".
Visión: "Ser reconocidos como líderes en el mercado de la aromatización, transformando el arte del aroma en una conexión emocional constante entre las personas y sus entornos".

## Historia de marca
Aromatic Col nació del deseo de un joven emprendedor colombiano de generar ingresos para apoyar a su familia y financiar sus estudios universitarios. Guiado por su fe, consolidó la marca como un "refugio sensorial" enfocado en el bienestar integral a través de esencias naturales, buscando el equilibrio entre mente, cuerpo y espíritu. Más que un emprendimiento, representa un compromiso con el crecimiento económico y la generación de oportunidades para familias en Colombia. Activa desde 2018 ("Aromaterapia · Relajación · Since 2018").

## Personalidad de marca
Elegante, moderna, sofisticada, confiable, cercana, profesional. Comunica calma, bienestar, exclusividad accesible y buen gusto. Nunca masiva, económica, agresiva o promocional. Concepto guía: "lujo silencioso" — la calidad habla por sí sola, sin excesos visuales. Referencias visuales: campañas editoriales de diseño interior, bienestar y tecnología de alta gama — más cerca de Apple y revistas de decoración de lujo que de catálogos tradicionales de aromatizantes.

## Paleta e imágenes
Beige, ivory, crema, blanco cálido, arena, madera natural, y negro elegante ocasional para contraste. Espacios limpios, cálidos, luminosos, organizados, acogedores. Las imágenes deben transmitir bienestar, relajación, lujo moderno, diseño interior, experiencia sensorial, confort emocional, estilo de vida premium. Productos como protagonistas (materiales, acabados, calidad percibida). Iluminación cinematográfica, suave, natural — nunca artificial ni de aspecto comercial/barato. El vapor de los difusores debe verse como humo elegante de chimenea — fluido, orgánico, delicado, realista — nunca humo digital artificial ni vapor excesivamente denso.

## Catálogo de aromas
Maracuyá, manzana verde, frutos rojos, zarzamora, uva, pasión frutal, lavanda, orquídea jazmín, eucalipto, brisa del mar, limoncillo y limón, sándalo, coco, café, cookies.

## Catálogo de productos (glosario para copy)
- **Difusores de aroma:** dispersan aceites esenciales/fragancias en el aire (ultrasonido, aire frío o calor). Aromatizan y ambientan espacios cerrados; mejoran bienestar emocional, concentración y sueño; también purifican el aire.
- **Humidificadores:** aumentan la humedad del ambiente liberando vapor de agua. Combaten resequedad de piel, garganta y ojos, facilitan la respiración y alivian congestión.
- **Difusores industriales:** distribuyen/dispersan aire, agua o aromas a gran escala. Climatización, oxigenación de aguas residuales, extracción de materias primas, aromatización profesional.
- **Esencias de aromaterapia (aceites esenciales):** extractos concentrados de plantas, flores, raíces o frutos. Uso en masajes, difusores o inhalación; reducen ansiedad, mejoran el sueño, alivian molestias físicas.
- **Esencia hidrosoluble:** aroma concentrado que se disuelve en agua, sin residuos grasos. Ideal para humidificadores, difusores, brumizadores y limpiadores; protege filtros de la acumulación de grasa.
- **Pebeteros:** recipientes (usualmente cerámica) que aromatizan por evaporación de aceites/esencias/ceras usando el calor de una vela.
- **Pebeteros eléctricos:** dispositivos decorativos duales (luz + aroma); usan el calor de un bombillo halógeno para calentar esencias, aceites o ceras.
- **Fragancias en aceite:** esencias concentradas sin alcohol, aroma intenso y duradero. Uso en piel (suaves, nutritivas) o en pebeteros/difusores; mayor fijación y rendimiento, alternativa natural.
- **Lámparas de sal:** cristales naturales de sal del Himalaya; luz cálida y suave. Beneficios atribuidos: purificar el aire, contrarrestar radiación electromagnética, mejorar el descanso.
- **Esferas de cristal:** piezas de vidrio o cuarzo sólidas y esféricas, uso decorativo, energético (Feng Shui) o místico.
- **Fuentes de agua decorativas:** elementos ornamentales con recirculación cerrada por bomba eléctrica; efectos visuales y sonoros relajantes.
- **Fuentes de incienso de reflujo ("cascadas de humo"):** quemadores decorativos para conos especiales; el humo desciende creando efecto de cascada. Uso en aromaterapia y decoración.

## Público objetivo
Personas que quieren mejorar la atmósfera de sus hogares; consumidores interesados en bienestar y decoración; profesionales que trabajan desde casa; negocios que buscan mejorar la experiencia de sus clientes (hoteles, oficinas, consultorios, restaurantes, tiendas, salones de belleza).

## Palabras clave
Bienestar, aroma, hogar, diseño, experiencia sensorial, elegancia, relajación, lujo silencioso, decoración, confort, estilo de vida, premium, minimalismo, sofisticación, armonía, calma, calidad, exclusividad.

## Idea central de toda pieza
"Transformar espacios cotidianos en experiencias sensoriales elegantes mediante aroma, diseño y bienestar."
```

## 1. Alcance de este proyecto

- **Backend:** nuevo, desde cero, en Supabase (ver esquema sugerido abajo).
- **Panel de administración:** incluido desde el inicio (el cliente debe poder editar productos, ferias, galería, cobertura y configuración sin tocar código).
- **Landing pública:** el foco principal de la primera entrega visual, pero depende de que el backend y el admin existan primero para tener datos reales con los que trabajar.
- **Tienda e-commerce:** es un proyecto aparte (en desarrollo). Esta landing NO debe implementar carrito ni checkout — solo debe enlazar hacia esa tienda mediante una URL configurable.

## 2. Stack técnico

- React 19 + TypeScript + Vite
- Tailwind CSS v4 (`@tailwindcss/vite`)
- Supabase (`@supabase/supabase-js`) — base de datos, autenticación y storage de imágenes
- React Router v7
- Framer Motion (animaciones)
- React Hook Form + Zod (formularios y validación)
- lucide-react (iconos)

### 2.1 Setup inicial (ejecutar en orden)

```bash
npm create vite@latest . -- --template react-ts
npm install
npm install @supabase/supabase-js react-router-dom framer-motion react-hook-form @hookform/resolvers zod lucide-react
npm install -D tailwindcss @tailwindcss/vite
```

Configura Tailwind v4 según su modelo actual (plugin de Vite + `@import "tailwindcss";` en el CSS principal, tokens de tema con `@theme` en vez de `tailwind.config.js` extendido si aplica). Crea `.env` con:

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_STORE_URL=            # URL de la tienda e-commerce (placeholder hasta que exista)
VITE_WHATSAPP_NUMBER=
VITE_INSTAGRAM_URL=
```

## 3. Esquema de base de datos (Supabase) — punto de partida sugerido

Diseña las tablas y ajústalas si lo consideras necesario, pero mantén esta estructura como base:

**`productos`**
`id uuid pk, categoria text, nombre text, descripcion text, tag text null, imagen_url text, destacado boolean default false, activo boolean default true, orden int, created_at timestamptz default now()`

**`ferias`**
`id uuid pk, nombre text, centro_comercial text, ciudad text, dias_horario text, fecha_inicio date null, fecha_fin date null, descripcion text null, imagen_url text null, activa boolean default true, orden int, created_at timestamptz default now()`
(Una feria se considera "próxima" si `fecha_inicio` es futura, "activa" si hoy cae entre `fecha_inicio` y `fecha_fin`, y "pasada" si `fecha_fin` ya ocurrió — calcula esto en el frontend a partir de las fechas, no con un campo booleano manual.)

**`galeria`**
`id uuid pk, imagen_url text, categoria text (producto | feria | ambiente | cliente), titulo text null, orden int, created_at timestamptz default now()`

**`cobertura`**
`id uuid pk, ciudad text, departamento text, activa boolean default true, orden int`

**`configuracion`** (fila única tipo singleton)
`id uuid pk, clientes_felices int, ciudades int, productos_vendidos int, calificacion numeric, whatsapp_numero text, instagram_url text, store_url text, updated_at timestamptz default now()`

**`prospectos`** (leads del formulario de contacto)
`id uuid pk, nombre text, telefono text, correo text null, interes text null, mensaje text null, estado text default 'nuevo', created_at timestamptz default now()`

**Autenticación del admin:** usa Supabase Auth (email + contraseña) para el o los usuarios administradores. No se necesita tabla de roles adicional si solo hay un rol admin único.

**Row Level Security (obligatorio):**
- Lectura pública (`select`) permitida en `productos`, `ferias`, `galeria`, `cobertura`, `configuracion` — solo filas con `activo`/`activa = true` cuando aplique.
- Inserción pública (`insert`) permitida solo en `prospectos` (el formulario de contacto).
- Todo lo demás (`insert`/`update`/`delete` en el resto de tablas, y cualquier operación sobre `prospectos` que no sea insertar) requiere usuario autenticado.

## 4. Estructura de carpetas sugerida

```
src/
  lib/supabase.ts
  contexts/AuthContext.tsx
  types/index.ts
  hooks/
    useProductos.ts
    useFerias.ts
    useGaleria.ts
    useCobertura.ts
    useConfig.ts
    useProspectos.ts
  admin/
    components/
    layout/
    pages/            # login, dashboard, productos, ferias, galería, cobertura, configuración, prospectos
  landing/
    sections/         # Navbar, Hero, Nosotros, Products, Ferias, Galeria, Cobertura, Contacto, Footer
    shared/           # Button, Badge, SectionHeading, Card, ImageCarousel, Lightbox, animations
    constants/
    LandingPage.tsx
  App.tsx
  main.tsx
```

## 5. Panel de administración

- Login protegido con Supabase Auth (ruta `/admin/login`, resto de `/admin/*` protegido).
- CRUD completo para: productos, ferias, galería, cobertura, configuración (edición de la fila única).
- Bandeja de prospectos: listado de leads del formulario de contacto, con estado (nuevo/contactado/etc.) editable.
- Subida de imágenes a Supabase Storage (no URLs externas manuales) para productos, ferias y galería.
- UI simple y funcional — no necesita el mismo nivel de diseño editorial que la landing pública, prioriza usabilidad para que el cliente (no técnico) pueda administrar su contenido sin errores.

## 6. Landing pública — estructura de secciones

### 6.1 Navbar
Inicio / Productos / Ferias / Contacto. Fijo con transición al hacer scroll.

### 6.2 Hero
- Carrusel de fotografía real como fondo (crossfade lento, 6–8s por imagen, ligero Ken Burns), con overlay cálido (crema/negro con opacidad baja) que garantice legibilidad sin perder la sensación luminosa de marca. Las imágenes vienen del mismo origen que la Galería (Supabase Storage) — nunca stock genérico que no calce con la estética.
- Titular corto y emocional basado en la idea central de marca. Subtítulo con propuesta de valor real, no adjetivos vacíos tipo "aesthetic".
- CTA primario "Ver productos" (ancla al catálogo) + CTA secundario WhatsApp.
- Stats (clientes, ciudades, productos vendidos) conectados a `configuracion` — si aún no hay datos cargados, omitir el bloque en vez de mostrar cifras inventadas.

### 6.3 Nosotros (confianza y transparencia)
- Historia breve del fundador (2–3 frases, tono cercano, basada en `CLAUDE.md`).
- Misión y visión como citas destacadas, tipografía editorial.
- 3–4 valores/pilares con iconografía (bienestar, calidad natural, cercanía, compromiso con Colombia).
- Badges de confianza (esencias naturales, atención directa por WhatsApp, presencia en varias ciudades).
- Foto real de producto/ambiente si no hay foto del fundador — nunca stock corporativo genérico.

### 6.4 Productos — catálogo introductorio (no e-commerce completo)
- Sección "Colección" con 4–6 categorías destacadas desde `useProductos` (filtrando `destacado = true`), cada una con foto real, nombre, descripción corta y precisa (usar el glosario de `CLAUDE.md`), tag opcional.
- CTA final muy visible: **"Explorar tienda completa"** → `VITE_STORE_URL`. Si esa variable está vacía, el botón cae a WhatsApp con mensaje prellenado en vez de romperse o apuntar a un enlace muerto.

### 6.5 Ferias — vitrina de eventos
- Tres estados calculados a partir de fechas: activa ahora / próximas / pasadas (ver sección 3).
- Cards con centro comercial, ciudad, días/horario, badge de estado, foto si existe.
- Mini-galería/timeline horizontal de ferias pasadas — refuerza presencia física real y recurrente.
- CTA: "Síguenos para enterarte de la próxima feria cerca de ti" → Instagram/WhatsApp.

### 6.6 Galería
- Grid (masonry o cuadrícula uniforme) con fotos reales desde `useGaleria`, con lightbox al hacer clic.
- Filtro opcional por categoría (producto / feria / ambiente / cliente).

### 6.7 Cobertura
- Ciudades/zonas con presencia de marca, desde `useCobertura`.
- Cuadrícula de tarjetas por ciudad con ícono de ubicación (más simple que un mapa interactivo para esta primera versión; se puede evolucionar después).
- El número de ciudades debe coincidir siempre con el usado en Hero/Stats (mismo origen de datos).

### 6.8 Contacto
- Formulario: nombre, teléfono, correo (opcional), interés, mensaje (opcional) — validado con Zod + React Hook Form, envía a `prospectos` vía Supabase.
- Accesos directos a WhatsApp e Instagram (`VITE_WHATSAPP_NUMBER`, `VITE_INSTAGRAM_URL`).

### 6.9 Footer
Navegación, redes sociales, línea de marca ("Aromaterapia · Relajación · Since 2018").

## 7. Sistema de diseño

**Paleta** (como tokens de Tailwind, no colores sueltos por componente):
- Base clara: ivory/crema, blanco cálido, arena
- Acento cálido: terracota/madera natural
- Contraste puntual: negro elegante o verde oscuro muy limitado — solo en una sección puntual, nunca dominante en todo el sitio
- Texto: gris cálido oscuro sobre fondos claros, crema sobre fondos oscuros

**Tipografía:**
- Encabezados: serif editorial (Playfair Display o Fraunces)
- Cuerpo/UI: sans serif limpia (Inter o Manrope)

**Componentes reutilizables:** Button (primary/secondary/ghost), Badge, SectionHeading (eyebrow + título + subtítulo opcional), Card base, ImageCarousel, Lightbox.

## 8. Interacción y sensación "moderna / tecnológica"

- Animaciones de entrada al hacer scroll (fade + translate leve) con Framer Motion — sutiles, coherentes con "lujo silencioso".
- Micro-interacciones en hover (cards de producto, ferias, galería): escalado suave, sombra — nada estridente.
- Opcional: mini-interacción "Descubre tu aroma ideal" (2–3 preguntas → recomendación de categoría → CTA a WhatsApp o tienda). No indispensable en la primera entrega.

## 9. Requisitos técnicos

- 100% responsive, mobile-first.
- Imágenes con lazy loading y tamaños adecuados (Supabase Storage con transformaciones si están disponibles).
- Accesibilidad: alt text real, contraste mínimo AA, foco visible en elementos interactivos.
- SEO básico: title/meta description, un solo `h1` por vista, encabezados semánticos.
- TypeScript estricto y `npm run lint` sin errores al terminar cada fase.

## 10. Orden de trabajo sugerido

1. Scaffold del proyecto (Vite + dependencias + Tailwind v4 + variables de entorno).
2. Crear `CLAUDE.md` con el contexto de marca (sección 0 de este documento).
3. Diseñar y crear el esquema en Supabase (tablas + RLS) según la sección 3.
4. Construir `lib/supabase.ts`, `types/index.ts` y los hooks de datos.
5. Construir autenticación y panel admin (CRUD completo + bandeja de prospectos).
6. Cargar datos de prueba reales (o al menos representativos) desde el admin para poder construir la landing con datos reales, no mocks.
7. Construir Navbar + Hero.
8. Construir Nosotros.
9. Construir Productos (catálogo + CTA tienda).
10. Construir Ferias.
11. Construir Galería.
12. Construir Cobertura.
13. Construir Contacto + Footer.
14. Revisión responsive + accesibilidad + lint + build de producción.

## 11. Qué no hacer

- No implementar carrito/checkout en esta landing — solo enlazar a la tienda vía `VITE_STORE_URL`.
- No usar copy inventado que contradiga `CLAUDE.md`.
- No hardcodear contenido que debería administrarse desde el panel admin (productos, ferias, galería, cobertura, configuración).
- No usar iconografía o fotografía de stock genérica que no calce con el concepto de "lujo silencioso".
- No omitir Row Level Security en Supabase — todas las tablas deben tener políticas explícitas antes de considerar el backend "listo".
