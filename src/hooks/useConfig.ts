import { useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useQuery } from './useQuery';
import type { Configuracion } from '@/types';

/** Fila única de configuración (stats + enlaces). */
export function useConfig() {
  const fetcher = useCallback(async (): Promise<Configuracion | null> => {
    const { data, error } = await supabase
      .from('configuracion')
      .select('*')
      .limit(1)
      .maybeSingle();
    if (error) throw error;
    return data;
  }, []);

  return useQuery(fetcher);
}

export type ConfigPatch = Partial<
  Omit<Configuracion, 'id' | 'updated_at'>
>;

/** Actualiza la fila singleton de configuración. */
export async function updateConfig(
  id: string,
  patch: ConfigPatch,
): Promise<void> {
  const { error } = await supabase
    .from('configuracion')
    .update(patch)
    .eq('id', id);
  if (error) throw error;
}
