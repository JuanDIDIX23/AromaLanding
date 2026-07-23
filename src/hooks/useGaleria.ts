import { useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useQuery } from './useQuery';
import type { GaleriaItem } from '@/types';

/** Galería pública, ordenada. */
export function useGaleria() {
  const fetcher = useCallback(async (): Promise<GaleriaItem[]> => {
    const { data, error } = await supabase
      .from('galeria')
      .select('*')
      .order('orden', { ascending: true });
    if (error) throw error;
    return data ?? [];
  }, []);

  return useQuery(fetcher);
}

// --------------------------------------------------------------------------
// CRUD admin
// --------------------------------------------------------------------------

export type GaleriaDraft = Omit<GaleriaItem, 'id' | 'created_at'>;

export async function createGaleriaItem(
  draft: GaleriaDraft,
): Promise<GaleriaItem> {
  const { data, error } = await supabase
    .from('galeria')
    .insert(draft)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateGaleriaItem(
  id: string,
  patch: Partial<GaleriaDraft>,
): Promise<void> {
  const { error } = await supabase.from('galeria').update(patch).eq('id', id);
  if (error) throw error;
}

export async function deleteGaleriaItem(id: string): Promise<void> {
  const { error } = await supabase.from('galeria').delete().eq('id', id);
  if (error) throw error;
}
