import { useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useQuery } from './useQuery';
import type { Cobertura } from '@/types';

/** Cobertura pública (ciudades activas), ordenada. */
export function useCobertura() {
  const fetcher = useCallback(async (): Promise<Cobertura[]> => {
    const { data, error } = await supabase
      .from('cobertura')
      .select('*')
      .eq('activa', true)
      .order('orden', { ascending: true });
    if (error) throw error;
    return data ?? [];
  }, []);

  return useQuery(fetcher);
}

// --------------------------------------------------------------------------
// CRUD admin
// --------------------------------------------------------------------------

export type CoberturaDraft = Omit<Cobertura, 'id'>;

export async function fetchAllCobertura(): Promise<Cobertura[]> {
  const { data, error } = await supabase
    .from('cobertura')
    .select('*')
    .order('orden', { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function createCobertura(
  draft: CoberturaDraft,
): Promise<Cobertura> {
  const { data, error } = await supabase
    .from('cobertura')
    .insert(draft)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateCobertura(
  id: string,
  patch: Partial<CoberturaDraft>,
): Promise<void> {
  const { error } = await supabase.from('cobertura').update(patch).eq('id', id);
  if (error) throw error;
}

export async function deleteCobertura(id: string): Promise<void> {
  const { error } = await supabase.from('cobertura').delete().eq('id', id);
  if (error) throw error;
}
