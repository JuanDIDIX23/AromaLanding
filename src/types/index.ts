// ============================================================================
// AromaticCol — Tipos de dominio (espejo del esquema de Supabase)
// ============================================================================

export type ProductoCategoria = string; // libre, administrada desde el panel

export interface Producto {
  id: string;
  categoria: ProductoCategoria;
  nombre: string;
  descripcion: string;
  tag: string | null;
  imagen_url: string | null;
  destacado: boolean;
  activo: boolean;
  orden: number;
  created_at: string;
}

export interface Feria {
  id: string;
  nombre: string;
  centro_comercial: string;
  ciudad: string;
  dias_horario: string;
  fecha_inicio: string | null; // YYYY-MM-DD
  fecha_fin: string | null; // YYYY-MM-DD
  descripcion: string | null;
  imagen_url: string | null;
  activa: boolean;
  orden: number;
  created_at: string;
}

/** Estado calculado en el frontend a partir de las fechas. */
export type FeriaEstado = 'activa' | 'proxima' | 'pasada' | 'sin-fecha';

export type GaleriaCategoria = 'producto' | 'feria' | 'ambiente' | 'cliente';

export interface GaleriaItem {
  id: string;
  imagen_url: string;
  categoria: GaleriaCategoria;
  titulo: string | null;
  orden: number;
  created_at: string;
}

export interface Cobertura {
  id: string;
  ciudad: string;
  departamento: string;
  activa: boolean;
  orden: number;
}

export interface Configuracion {
  id: string;
  clientes_felices: number;
  ciudades: number;
  productos_vendidos: number;
  calificacion: number;
  whatsapp_numero: string;
  instagram_url: string;
  store_url: string;
  updated_at: string;
}

export type ProspectoEstado =
  | 'nuevo'
  | 'contactado'
  | 'cotizado'
  | 'cerrado'
  | 'descartado';

export interface Prospecto {
  id: string;
  nombre: string;
  telefono: string;
  correo: string | null;
  interes: string | null;
  mensaje: string | null;
  estado: ProspectoEstado;
  created_at: string;
}

/** Payload que envía el formulario público de contacto. */
export type ProspectoInput = Pick<
  Prospecto,
  'nombre' | 'telefono' | 'correo' | 'interes' | 'mensaje'
>;
