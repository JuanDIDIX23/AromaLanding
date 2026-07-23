import { useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useQuery } from './useQuery';
import type { Producto } from '@/types';

/** Productos públicos (activos), ordenados. Filtro opcional por destacados. */
export function useProductos(soloDestacados = false) {
  const fetcher = useCallback(async (): Promise<Producto[]> => {
    let q = supabase
      .from('productos')
      .select('*')
      .eq('activo', true)
      .order('orden', { ascending: true });
    if (soloDestacados) q = q.eq('destacado', true);
    const { data, error } = await q;
    if (error) throw error;
    return data ?? [];
  }, [soloDestacados]);

  return useQuery(fetcher);
}

// --------------------------------------------------------------------------
// CRUD para el panel admin (requiere sesión autenticada por RLS)
// --------------------------------------------------------------------------

export type ProductoDraft = Omit<Producto, 'id' | 'created_at'>;

export async function fetchAllProductos(): Promise<Producto[]> {
  const { data, error } = await supabase
    .from('productos')
    .select('*')
    .order('orden', { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function createProducto(draft: ProductoDraft): Promise<Producto> {
  const { data, error } = await supabase
    .from('productos')
    .insert(draft)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateProducto(
  id: string,
  patch: Partial<ProductoDraft>,
): Promise<void> {
  const { error } = await supabase.from('productos').update(patch).eq('id', id);
  if (error) throw error;
}

export async function deleteProducto(id: string): Promise<void> {
  const { error } = await supabase.from('productos').delete().eq('id', id);
  if (error) throw error;
}
