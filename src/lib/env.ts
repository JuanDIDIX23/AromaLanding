import type { Configuracion } from '@/types';
import { whatsappLink } from './utils';

/** Variables de entorno del sitio (valores por defecto de fábrica). */
export const env = {
  storeUrl: import.meta.env.VITE_STORE_URL ?? '',
  whatsappNumero: import.meta.env.VITE_WHATSAPP_NUMBER ?? '',
  instagramUrl: import.meta.env.VITE_INSTAGRAM_URL ?? '',
};

/**
 * Resuelve los enlaces de contacto/tienda. La configuración editable desde el
 * panel admin tiene prioridad; si un campo está vacío, cae al valor de `.env`.
 */
export function resolveLinks(config: Configuracion | null) {
  const whatsappNumero = config?.whatsapp_numero || env.whatsappNumero;
  const instagramUrl = config?.instagram_url || env.instagramUrl;
  const storeUrl = config?.store_url || env.storeUrl;

  return {
    whatsappNumero,
    instagramUrl,
    storeUrl,
    hasWhatsapp: Boolean(whatsappNumero),
    hasInstagram: Boolean(instagramUrl),
    hasStore: Boolean(storeUrl),
    /** Enlace de WhatsApp con mensaje prellenado opcional. */
    whatsapp: (mensaje?: string) =>
      whatsappNumero ? whatsappLink(whatsappNumero, mensaje) : '',
  };
}

export type ResolvedLinks = ReturnType<typeof resolveLinks>;

export const WHATSAPP_DEFAULT_MSG =
  'Hola AromaticCol 🌿, me gustaría conocer más sobre sus aromas y productos.';
