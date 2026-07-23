import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * `true` cuando las variables de entorno de Supabase están configuradas.
 * Permite que la landing degrade con elegancia (mostrar placeholders / ocultar
 * secciones) en lugar de romperse si el backend aún no está conectado.
 */
export const isSupabaseConfigured = Boolean(url && anonKey);

if (!isSupabaseConfigured && import.meta.env.DEV) {
  // Aviso solo en desarrollo, no rompe la app.
  console.warn(
    '[AromaticCol] Supabase no está configurado. Rellena VITE_SUPABASE_URL y ' +
      'VITE_SUPABASE_ANON_KEY en .env para conectar el backend.',
  );
}

// Se usan placeholders inofensivos si faltan las variables, para no lanzar en
// import. Cualquier consulta fallará de forma controlada y los hooks lo manejan.
export const supabase = createClient(
  url ?? 'https://placeholder.supabase.co',
  anonKey ?? 'placeholder-anon-key',
);

/** Sube un archivo al bucket `imagenes` y devuelve su URL pública. */
export async function uploadImage(
  file: File,
  folder: string,
): Promise<string> {
  const ext = file.name.split('.').pop() ?? 'jpg';
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage
    .from('imagenes')
    .upload(path, file, { cacheControl: '3600', upsert: false });

  if (error) throw error;

  const { data } = supabase.storage.from('imagenes').getPublicUrl(path);
  return data.publicUrl;
}

/** Borra una imagen del bucket a partir de su URL pública. */
export async function deleteImageByUrl(publicUrl: string): Promise<void> {
  const marker = '/imagenes/';
  const idx = publicUrl.indexOf(marker);
  if (idx === -1) return;
  const path = publicUrl.slice(idx + marker.length);
  await supabase.storage.from('imagenes').remove([path]);
}
