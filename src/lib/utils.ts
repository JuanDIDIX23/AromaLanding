import type { Feria, FeriaEstado } from '@/types';

/** Une clases condicionalmente (mini-clsx). */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}

/** Estado de una feria calculado desde sus fechas (no desde un booleano). */
export function feriaEstado(feria: Feria, today = new Date()): FeriaEstado {
  const { fecha_inicio, fecha_fin } = feria;
  if (!fecha_inicio && !fecha_fin) return 'sin-fecha';

  // Normaliza a medianoche local para comparar por día.
  const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const inicio = fecha_inicio ? parseDateLocal(fecha_inicio) : null;
  const fin = fecha_fin ? parseDateLocal(fecha_fin) : inicio;

  if (inicio && t < inicio) return 'proxima';
  if (fin && t > fin) return 'pasada';
  return 'activa';
}

/** Parsea "YYYY-MM-DD" como fecha local (evita el desfase UTC de new Date). */
export function parseDateLocal(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}

const MESES = [
  'ene', 'feb', 'mar', 'abr', 'may', 'jun',
  'jul', 'ago', 'sep', 'oct', 'nov', 'dic',
];

/** "12 mar" / "12 mar – 15 mar" a partir de fechas ISO. */
export function formatRango(
  inicio: string | null,
  fin: string | null,
): string {
  if (!inicio && !fin) return '';
  const f = (iso: string) => {
    const d = parseDateLocal(iso);
    return `${d.getDate()} ${MESES[d.getMonth()]}`;
  };
  if (inicio && fin && inicio !== fin) return `${f(inicio)} – ${f(fin)}`;
  return f((inicio ?? fin)!);
}

/** Formatea números grandes: 8500 → "8.500", 1200000 → "1,2 M". */
export function formatStat(n: number): string {
  if (n >= 1_000_000) {
    return `${(n / 1_000_000).toLocaleString('es-CO', { maximumFractionDigits: 1 })} M`;
  }
  return n.toLocaleString('es-CO');
}

/** Construye un enlace de WhatsApp con mensaje prellenado. */
export function whatsappLink(numero: string, mensaje?: string): string {
  const limpio = numero.replace(/[^\d]/g, '');
  const texto = mensaje ? `?text=${encodeURIComponent(mensaje)}` : '';
  return `https://wa.me/${limpio}${texto}`;
}
