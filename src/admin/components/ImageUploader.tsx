import { useState, useRef } from 'react';
import { Upload, Trash2, Image as ImageIcon } from 'lucide-react';
import { uploadImage } from '@/lib/supabase';

/**
 * Sube una imagen a Supabase Storage (bucket `imagenes/<folder>`) y devuelve
 * la URL pública vía onChange. Muestra vista previa y permite quitarla.
 */
export function ImageUploader({
  value,
  onChange,
  folder,
  label = 'Imagen',
}: {
  value: string | null;
  onChange: (url: string | null) => void;
  folder: string;
  label?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setError(null);
    if (!file.type.startsWith('image/')) {
      setError('El archivo debe ser una imagen.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('La imagen no debe superar 5 MB.');
      return;
    }
    setUploading(true);
    try {
      const url = await uploadImage(file, folder);
      onChange(url);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al subir la imagen.');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <span className="mb-1.5 block text-sm font-medium text-espresso">
        {label}
      </span>

      {value ? (
        <div className="relative inline-block">
          <img
            src={value}
            alt="Vista previa"
            className="h-40 w-40 rounded-lg border border-line object-cover"
          />
          <button
            type="button"
            onClick={() => onChange(null)}
            aria-label="Quitar imagen"
            className="absolute -right-2 -top-2 rounded-full bg-red-600 p-1.5 text-white shadow hover:bg-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex h-40 w-40 flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-line bg-cream text-stone transition hover:border-clay-400 hover:text-clay-500 disabled:opacity-60"
        >
          {uploading ? (
            <>
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-line border-t-clay-500" />
              <span className="text-xs">Subiendo…</span>
            </>
          ) : (
            <>
              <Upload className="h-6 w-6" />
              <span className="text-xs">Subir imagen</span>
            </>
          )}
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = '';
        }}
      />

      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      {!value && !error && (
        <p className="mt-1 flex items-center gap-1 text-xs text-stone-light">
          <ImageIcon className="h-3 w-3" /> JPG o PNG, máx. 5 MB
        </p>
      )}
    </div>
  );
}
