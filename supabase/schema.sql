  -- ============================================================================
  -- AromaticCol — Esquema de base de datos (Supabase / PostgreSQL)
  -- ----------------------------------------------------------------------------
  -- Cómo usar:
  --   1. Crea un proyecto en https://supabase.com
  --   2. Abre "SQL Editor" → "New query"
  --   3. Pega este archivo completo y ejecútalo (Run)
  --   4. Crea tu usuario admin en Authentication → Users → "Add user"
  --      (email + contraseña). Ese usuario podrá entrar a /admin.
  --   5. Copia Project URL y anon key (Settings → API) a tu archivo .env
  --
  -- Idempotente: puede re-ejecutarse sin romper (usa IF NOT EXISTS / DROP POLICY).
  -- ============================================================================

  -- gen_random_uuid() viene con pgcrypto (habilitado por defecto en Supabase).
  create extension if not exists pgcrypto;

  -- ----------------------------------------------------------------------------
  -- Helper: mantener updated_at automáticamente
  -- ----------------------------------------------------------------------------
  create or replace function public.set_updated_at()
  returns trigger
  language plpgsql
  as $$
  begin
    new.updated_at = now();
    return new;
  end;
  $$;

  -- ============================================================================
  -- TABLAS
  -- ============================================================================

  -- Productos ------------------------------------------------------------------
  create table if not exists public.productos (
    id          uuid primary key default gen_random_uuid(),
    categoria   text not null,
    nombre      text not null,
    descripcion text not null default '',
    tag         text,
    imagen_url  text,
    destacado   boolean not null default false,
    activo      boolean not null default true,
    orden       int not null default 0,
    created_at  timestamptz not null default now()
  );
  create index if not exists productos_activo_orden_idx on public.productos (activo, orden);
  create index if not exists productos_destacado_idx on public.productos (destacado) where destacado;

  -- Ferias ---------------------------------------------------------------------
  create table if not exists public.ferias (
    id              uuid primary key default gen_random_uuid(),
    nombre          text not null,
    centro_comercial text not null,
    ciudad          text not null,
    dias_horario    text not null default '',
    fecha_inicio    date,
    fecha_fin       date,
    descripcion     text,
    imagen_url      text,
    activa          boolean not null default true,
    orden           int not null default 0,
    created_at      timestamptz not null default now()
  );
  create index if not exists ferias_activa_fecha_idx on public.ferias (activa, fecha_inicio);

  -- Galería --------------------------------------------------------------------
  create table if not exists public.galeria (
    id          uuid primary key default gen_random_uuid(),
    imagen_url  text not null,
    categoria   text not null default 'ambiente'
                check (categoria in ('producto', 'feria', 'ambiente', 'cliente')),
    titulo      text,
    orden       int not null default 0,
    created_at  timestamptz not null default now()
  );
  create index if not exists galeria_orden_idx on public.galeria (orden);

  -- Cobertura ------------------------------------------------------------------
  create table if not exists public.cobertura (
    id           uuid primary key default gen_random_uuid(),
    ciudad       text not null,
    departamento text not null default '',
    activa       boolean not null default true,
    orden        int not null default 0
  );
  create index if not exists cobertura_activa_orden_idx on public.cobertura (activa, orden);

  -- Configuración (singleton) --------------------------------------------------
  create table if not exists public.configuracion (
    id                  uuid primary key default gen_random_uuid(),
    clientes_felices    int not null default 0,
    ciudades            int not null default 0,
    productos_vendidos  int not null default 0,
    calificacion        numeric(2,1) not null default 0,
    whatsapp_numero     text not null default '',
    instagram_url       text not null default '',
    store_url           text not null default '',
    -- singleton: garantiza que solo exista una fila
    singleton           boolean not null default true unique,
    updated_at          timestamptz not null default now(),
    constraint configuracion_singleton_chk check (singleton = true)
  );

  drop trigger if exists configuracion_set_updated_at on public.configuracion;
  create trigger configuracion_set_updated_at
    before update on public.configuracion
    for each row execute function public.set_updated_at();

  -- Inserta la fila única (no hace nada si ya existe).
  insert into public.configuracion (singleton)
  values (true)
  on conflict (singleton) do nothing;

  -- Prospectos (leads del formulario de contacto) ------------------------------
  create table if not exists public.prospectos (
    id         uuid primary key default gen_random_uuid(),
    nombre     text not null,
    telefono   text not null,
    correo     text,
    interes    text,
    mensaje    text,
    estado     text not null default 'nuevo'
              check (estado in ('nuevo', 'contactado', 'cotizado', 'cerrado', 'descartado')),
    created_at timestamptz not null default now()
  );
  create index if not exists prospectos_estado_idx on public.prospectos (estado, created_at desc);

  -- ============================================================================
  -- ROW LEVEL SECURITY
  -- ============================================================================
  alter table public.productos     enable row level security;
  alter table public.ferias        enable row level security;
  alter table public.galeria       enable row level security;
  alter table public.cobertura     enable row level security;
  alter table public.configuracion enable row level security;
  alter table public.prospectos    enable row level security;

  -- Limpia políticas previas para poder re-ejecutar ----------------------------
  drop policy if exists productos_public_read     on public.productos;
  drop policy if exists productos_admin_all       on public.productos;
  drop policy if exists ferias_public_read        on public.ferias;
  drop policy if exists ferias_admin_all          on public.ferias;
  drop policy if exists galeria_public_read       on public.galeria;
  drop policy if exists galeria_admin_all         on public.galeria;
  drop policy if exists cobertura_public_read     on public.cobertura;
  drop policy if exists cobertura_admin_all       on public.cobertura;
  drop policy if exists configuracion_public_read on public.configuracion;
  drop policy if exists configuracion_admin_all   on public.configuracion;
  drop policy if exists prospectos_public_insert  on public.prospectos;
  drop policy if exists prospectos_admin_read      on public.prospectos;
  drop policy if exists prospectos_admin_update    on public.prospectos;
  drop policy if exists prospectos_admin_delete    on public.prospectos;

  -- Productos: lectura pública solo de activos; admin = todo -------------------
  create policy productos_public_read on public.productos
    for select using (activo = true);
  create policy productos_admin_all on public.productos
    for all to authenticated using (true) with check (true);

  -- Ferias: lectura pública solo de activas; admin = todo ----------------------
  create policy ferias_public_read on public.ferias
    for select using (activa = true);
  create policy ferias_admin_all on public.ferias
    for all to authenticated using (true) with check (true);

  -- Galería: lectura pública total; admin = todo -------------------------------
  create policy galeria_public_read on public.galeria
    for select using (true);
  create policy galeria_admin_all on public.galeria
    for all to authenticated using (true) with check (true);

  -- Cobertura: lectura pública solo de activas; admin = todo -------------------
  create policy cobertura_public_read on public.cobertura
    for select using (activa = true);
  create policy cobertura_admin_all on public.cobertura
    for all to authenticated using (true) with check (true);

  -- Configuración: lectura pública; admin = actualizar ------------------------
  create policy configuracion_public_read on public.configuracion
    for select using (true);
  create policy configuracion_admin_all on public.configuracion
    for all to authenticated using (true) with check (true);

  -- Prospectos: cualquiera puede INSERTAR (formulario de contacto);
  -- solo admin puede leer / actualizar / borrar -------------------------------
  create policy prospectos_public_insert on public.prospectos
    for insert to anon, authenticated with check (true);
  create policy prospectos_admin_read on public.prospectos
    for select to authenticated using (true);
  create policy prospectos_admin_update on public.prospectos
    for update to authenticated using (true) with check (true);
  create policy prospectos_admin_delete on public.prospectos
    for delete to authenticated using (true);

  -- ============================================================================
  -- STORAGE — bucket público de imágenes (productos, ferias, galería)
  -- ============================================================================
  insert into storage.buckets (id, name, public)
  values ('imagenes', 'imagenes', true)
  on conflict (id) do nothing;

  drop policy if exists imagenes_public_read   on storage.objects;
  drop policy if exists imagenes_admin_insert  on storage.objects;
  drop policy if exists imagenes_admin_update  on storage.objects;
  drop policy if exists imagenes_admin_delete  on storage.objects;

  create policy imagenes_public_read on storage.objects
    for select using (bucket_id = 'imagenes');
  create policy imagenes_admin_insert on storage.objects
    for insert to authenticated with check (bucket_id = 'imagenes');
  create policy imagenes_admin_update on storage.objects
    for update to authenticated using (bucket_id = 'imagenes') with check (bucket_id = 'imagenes');
  create policy imagenes_admin_delete on storage.objects
    for delete to authenticated using (bucket_id = 'imagenes');

  -- ============================================================================
  -- LISTO. Recuerda crear tu usuario admin en Authentication → Users.
  -- ============================================================================
