import { useEffect, useState } from 'react';
import { Plus, Trash2, Pencil } from 'lucide-react';
import type { GaleriaItem, GaleriaCategoria } from '@/types';
import {
  useGaleria,
  createGaleriaItem,
  updateGaleriaItem,
  deleteGaleriaItem,
  type GaleriaDraft,
} from '@/hooks/useGaleria';
import { PageHeader } from '../components/PageHeader';
import { Modal } from '../components/Modal';
import { ImageUploader } from '../components/ImageUploader';
import {
  AdminButton,
  Field,
  Panel,
  Select,
  Spinner,
  TextInput,
} from '../components/ui';

const CATEGORIAS: GaleriaCategoria[] = [
  'producto',
  'feria',
  'ambiente',
  'cliente',
];

const emptyDraft: GaleriaDraft = {
  imagen_url: '',
  categoria: 'ambiente',
  titulo: null,
  orden: 0,
};

export function GaleriaPage() {
  const { data, loading, refetch } = useGaleria();
  const [editing, setEditing] = useState<GaleriaItem | 'new' | null>(null);
  const [draft, setDraft] = useState<GaleriaDraft>(emptyDraft);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editing === 'new') setDraft({ ...emptyDraft, orden: (data?.length ?? 0) + 1 });
    else if (editing) {
      const { id: _id, created_at: _c, ...rest } = editing;
      setDraft(rest);
    }
  }, [editing, data?.length]);

  async function save() {
    if (!draft.imagen_url) {
      alert('Sube una imagen primero.');
      return;
    }
    setSaving(true);
    try {
      if (editing === 'new') await createGaleriaItem(draft);
      else if (editing) await updateGaleriaItem(editing.id, draft);
      setEditing(null);
      refetch();
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Error al guardar');
    } finally {
      setSaving(false);
    }
  }

  async function remove(item: GaleriaItem) {
    if (!confirm('¿Eliminar esta foto?')) return;
    await deleteGaleriaItem(item.id);
    refetch();
  }

  return (
    <div>
      <PageHeader
        title="Galería"
        description="Fotografía real del sitio. También alimenta el fondo del Hero."
        action={
          <AdminButton onClick={() => setEditing('new')}>
            <Plus className="h-4 w-4" /> Agregar foto
          </AdminButton>
        }
      />

      {loading ? (
        <Spinner />
      ) : !data || data.length === 0 ? (
        <Panel className="text-center text-sm text-stone">
          Aún no hay fotos en la galería.
        </Panel>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {data.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-xl border border-line bg-white"
            >
              <img
                src={item.imagen_url}
                alt={item.titulo ?? 'Foto de galería'}
                className="aspect-square w-full object-cover"
              />
              <span className="absolute left-2 top-2 rounded-full bg-ink/70 px-2 py-0.5 text-[10px] uppercase text-cream">
                {item.categoria}
              </span>
              <div className="absolute inset-x-0 bottom-0 flex justify-end gap-1 bg-gradient-to-t from-ink/70 to-transparent p-2 opacity-0 transition group-hover:opacity-100">
                <button
                  onClick={() => setEditing(item)}
                  aria-label="Editar"
                  className="rounded-lg bg-white/90 p-1.5 text-espresso hover:bg-white"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => remove(item)}
                  aria-label="Eliminar"
                  className="rounded-lg bg-white/90 p-1.5 text-red-600 hover:bg-white"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={editing !== null}
        onClose={() => setEditing(null)}
        title={editing === 'new' ? 'Agregar foto' : 'Editar foto'}
      >
        <div className="space-y-4">
          <ImageUploader
            value={draft.imagen_url || null}
            onChange={(url) => setDraft({ ...draft, imagen_url: url ?? '' })}
            folder="galeria"
          />
          <Field label="Categoría">
            <Select
              value={draft.categoria}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  categoria: e.target.value as GaleriaCategoria,
                })
              }
            >
              {CATEGORIAS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Título (opcional)">
            <TextInput
              value={draft.titulo ?? ''}
              onChange={(e) =>
                setDraft({ ...draft, titulo: e.target.value || null })
              }
            />
          </Field>
          <Field label="Orden">
            <TextInput
              type="number"
              value={draft.orden}
              onChange={(e) =>
                setDraft({ ...draft, orden: Number(e.target.value) })
              }
            />
          </Field>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <AdminButton variant="secondary" onClick={() => setEditing(null)}>
            Cancelar
          </AdminButton>
          <AdminButton onClick={save} disabled={saving}>
            {saving ? 'Guardando…' : 'Guardar'}
          </AdminButton>
        </div>
      </Modal>
    </div>
  );
}
