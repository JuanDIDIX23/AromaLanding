import { useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useQuery } from './useQuery';
import type { Prospecto, ProspectoEstado, ProspectoInput } from '@/types';

/** Envía un lead desde el formulario público de contacto (insert público). */
export async function enviarProspecto(input: ProspectoInput): Promise<void> {
  const { error } = await supabase.from('prospectos').insert({
    ...input,
    correo: input.correo || null,
    interes: input.interes || null,
    mensaje: input.mensaje || null,
  });
  if (error) throw error;
}

// --------------------------------------------------------------------------
// Bandeja de prospectos (admin)
// --------------------------------------------------------------------------

/** Lista de prospectos, más recientes primero (requiere sesión). */
export function useProspectos() {
  const fetcher = useCallback(async (): Promise<Prospecto[]> => {
    const { data, error } = await supabase
      .from('prospectos')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data ?? [];
  }, []);

  return useQuery(fetcher);
}

export async function updateProspectoEstado(
  id: string,
  estado: ProspectoEstado,
): Promise<void> {
  const { error } = await supabase
    .from('prospectos')
    .update({ estado })
    .eq('id', id);
  if (error) throw error;
}

export async function deleteProspecto(id: string): Promise<void> {
  const { error } = await supabase.from('prospectos').delete().eq('id', id);
  if (error) throw error;
}
