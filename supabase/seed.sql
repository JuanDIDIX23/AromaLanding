-- ============================================================================
-- AromaticCol — Datos de ejemplo representativos (opcional)
-- ----------------------------------------------------------------------------
-- Ejecuta esto DESPUÉS de schema.sql para tener contenido con el que ver la
-- landing antes de cargar tus fotos reales desde /admin. Las imágenes quedan
-- vacías a propósito (imagen_url = null): la UI muestra un placeholder elegante
-- hasta que subas fotografía real desde el panel.
--
-- Textos basados en el glosario de marca (CLAUDE.md). Ajusta precios/estados
-- desde el admin. Idempotente por nombre para no duplicar.
-- ============================================================================

-- Productos destacados -------------------------------------------------------
insert into public.productos (categoria, nombre, descripcion, tag, destacado, activo, orden)
select * from (values
  ('Difusores', 'Difusor de aroma ultrasónico',
   'Dispersa aceites esenciales en el aire mediante ultrasonido. Aromatiza espacios cerrados, mejora la concentración y el descanso, y purifica el ambiente.',
   'Más vendido', true, true, 1),
  ('Esencias', 'Esencias de aromaterapia',
   'Extractos concentrados de plantas, flores y frutos. Reducen la ansiedad, favorecen el sueño y alivian molestias físicas en difusor, masaje o inhalación.',
   'Natural', true, true, 2),
  ('Humidificadores', 'Humidificador de ambiente',
   'Libera vapor de agua para combatir la resequedad de piel, garganta y ojos, facilitar la respiración y aliviar la congestión.',
   null, true, true, 3),
  ('Pebeteros', 'Pebetero eléctrico decorativo',
   'Pieza dual de luz y aroma: el calor de un bombillo halógeno funde esencias, aceites o ceras para ambientar con calidez.',
   null, true, true, 4),
  ('Decoración', 'Lámpara de sal del Himalaya',
   'Cristal natural de sal con luz cálida y suave. Aporta atmósfera acogedora y bienestar a cualquier rincón del hogar.',
   'Edición cálida', true, true, 5),
  ('Esencias', 'Esencia hidrosoluble',
   'Aroma concentrado que se disuelve en agua sin residuos grasos. Ideal para humidificadores y brumizadores; protege los filtros de la grasa.',
   null, true, true, 6)
) as v(categoria, nombre, descripcion, tag, destacado, activo, orden)
where not exists (select 1 from public.productos p where p.nombre = v.nombre);

-- Ferias (activa ahora / próxima / pasada, según fechas relativas) -----------
insert into public.ferias (nombre, centro_comercial, ciudad, dias_horario, fecha_inicio, fecha_fin, descripcion, activa, orden)
select * from (values
  ('Feria de Bienestar Sensorial', 'C.C. Andino', 'Bogotá', 'Todos los días · 10:00 a 20:00',
   (current_date - 2), (current_date + 3),
   'Ven a vivir la experiencia AromaticCol: prueba nuestros aromas insignia y descubre tu favorito.', true, 1),
  ('Mercado de Diseño y Aroma', 'C.C. El Tesoro', 'Medellín', 'Fines de semana · 11:00 a 21:00',
   (current_date + 14), (current_date + 16),
   'Una selección editorial de difusores y esencias en el corazón de El Poblado.', true, 2),
  ('Expo Hogar & Bienestar', 'C.C. Chipichape', 'Cali', 'Viernes a domingo · 10:00 a 19:00',
   (current_date - 40), (current_date - 37),
   'Gracias a todos los que nos visitaron. ¡Nos vemos en la próxima!', true, 3)
) as v(nombre, centro_comercial, ciudad, dias_horario, fecha_inicio, fecha_fin, descripcion, activa, orden)
where not exists (select 1 from public.ferias f where f.nombre = v.nombre);

-- Cobertura ------------------------------------------------------------------
insert into public.cobertura (ciudad, departamento, activa, orden)
select * from (values
  ('Bogotá', 'Cundinamarca', true, 1),
  ('Medellín', 'Antioquia', true, 2),
  ('Cali', 'Valle del Cauca', true, 3),
  ('Barranquilla', 'Atlántico', true, 4),
  ('Bucaramanga', 'Santander', true, 5),
  ('Cartagena', 'Bolívar', true, 6)
) as v(ciudad, departamento, activa, orden)
where not exists (select 1 from public.cobertura c where c.ciudad = v.ciudad);

-- Configuración (stats + enlaces) — actualiza la fila singleton --------------
update public.configuracion set
  clientes_felices   = 1200,
  ciudades           = (select count(*) from public.cobertura where activa),
  productos_vendidos = 8500,
  calificacion       = 4.9
where singleton = true;

-- Nota: whatsapp_numero, instagram_url y store_url se dejan como estén.
-- Configúralos desde /admin o directamente aquí si lo prefieres.
