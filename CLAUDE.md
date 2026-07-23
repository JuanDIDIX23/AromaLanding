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

---

# Notas técnicas del proyecto (para desarrollo)

- **Stack:** React 19 + TypeScript + Vite · Tailwind CSS v4 (`@tailwindcss/vite`, tokens con `@theme` en `src/index.css`) · Supabase (DB, Auth, Storage) · React Router v7 · Framer Motion · React Hook Form + Zod · lucide-react.
- **Alias de import:** `@/` → `src/`.
- **Alcance:** landing pública + panel admin. **No** hay carrito/checkout aquí; la tienda es un proyecto aparte enlazado vía `VITE_STORE_URL` (si está vacío, los CTA de tienda caen a WhatsApp).
- **Datos:** todo el contenido (productos, ferias, galería, cobertura, configuración) se administra desde `/admin`, nunca hardcodeado. Los `hooks/` leen de Supabase.
- **Estado de ferias** (activa/próxima/pasada) se calcula en el frontend desde `fecha_inicio`/`fecha_fin`, no con un booleano manual.
- **RLS obligatorio:** lectura pública solo de filas `activo/activa = true`; inserción pública solo en `prospectos`; el resto requiere sesión autenticada. Ver `supabase/schema.sql`.
- **Diseño:** solo fotografía real (Supabase Storage), nunca stock genérico. Animaciones sutiles ("lujo silencioso").
- **Comandos:** `npm run dev` · `npm run build` · `npm run lint` (oxlint).
