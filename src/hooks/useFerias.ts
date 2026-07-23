import { useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useQuery } from './useQuery';
import type { Feria } from '@/types';

/** Ferias públicas (activas), ordenadas. El estado se calcula en el frontend. */
export function useFerias() {
  const fetcher = useCallback(async (): Promise<Feria[]> => {
    const { data, error } = await supabase
      .from('ferias')
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

export type FeriaDraft = Omit<Feria, 'id' | 'created_at'>;

export async function fetchAllFerias(): Promise<Feria[]> {
  const { data, error } = await supabase
    .from('ferias')
    .select('*')
    .order('orden', { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function createFeria(draft: FeriaDraft): Promise<Feria> {
  const { data, error } = await supabase
    .from('ferias')
    .insert(draft)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateFeria(
  id: string,
  patch: Partial<FeriaDraft>,
): Promise<void> {
  const { error } = await supabase.from('ferias').update(patch).eq('id', id);
  if (error) throw error;
}

export async function deleteFeria(id: string): Promise<void> {
  const { error } = await supabase.from('ferias').delete().eq('id', id);
  if (error) throw error;
}
