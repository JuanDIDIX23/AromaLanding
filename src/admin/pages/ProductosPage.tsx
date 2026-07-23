import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Star } from 'lucide-react';
import type { Producto } from '@/types';
import {
  fetchAllProductos,
  createProducto,
  updateProducto,
  deleteProducto,
  type ProductoDraft,
} from '@/hooks/useProductos';
import { PageHeader } from '../components/PageHeader';
import { Modal } from '../components/Modal';
import { ImageUploader } from '../components/ImageUploader';
import {
  AdminButton,
  Field,
  Panel,
  Spinner,
  TextArea,
  TextInput,
  Toggle,
} from '../components/ui';

const emptyDraft: ProductoDraft = {
  categoria: '',
  nombre: '',
  descripcion: '',
  tag: null,
  imagen_url: null,
  destacado: true,
  activo: true,
  orden: 0,
};

export function ProductosPage() {
  const [items, setItems] = useState<Producto[] | null>(null);
  const [editing, setEditing] = useState<Producto | 'new' | null>(null);
  const [draft, setDraft] = useState<ProductoDraft>(emptyDraft);
  const [saving, setSaving] = useState(false);

  async function load() {
    setItems(await fetchAllProductos());
  }
  useEffect(() => {
    load();
  }, []);

  function openNew() {
    setDraft({ ...emptyDraft, orden: (items?.length ?? 0) + 1 });
    setEditing('new');
  }
  function openEdit(p: Producto) {
    const { id: _id, created_at: _c, ...rest } = p;
    setDraft(rest);
    setEditing(p);
  }

  async function save() {
    setSaving(true);
    try {
      if (editing === 'new') await createProducto(draft);
      else if (editing) await updateProducto(editing.id, draft);
      setEditing(null);
      await load();
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Error al guardar');
    } finally {
      setSaving(false);
    }
  }

  async function remove(p: Producto) {
    if (!confirm(`¿Eliminar "${p.nombre}"?`)) return;
    await deleteProducto(p.id);
    await load();
  }

  return (
    <div>
      <PageHeader
        title="Productos"
        description="Catálogo introductorio. Marca como destacados los que aparecen en la landing."
        action={
          <AdminButton onClick={openNew}>
            <Plus className="h-4 w-4" /> Nuevo producto
          </AdminButton>
        }
      />

      {!items ? (
        <Spinner />
      ) : items.length === 0 ? (
        <Panel className="text-center text-sm text-stone">
          Aún no hay productos. Crea el primero.
        </Panel>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <Panel key={p.id} className="flex flex-col p-0">
              <div className="aspect-[4/3] overflow-hidden rounded-t-xl bg-cream">
                {p.imagen_url ? (
                  <img
                    src={p.imagen_url}
                    alt={p.nombre}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="grid h-full place-items-center text-xs text-stone-light">
                    Sin imagen
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col p-4">
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-xs uppercase tracking-wide text-clay-500">
                    {p.categoria}
                  </span>
                  {p.destacado && (
                    <Star className="h-3.5 w-3.5 fill-clay-400 text-clay-400" />
                  )}
                  {!p.activo && (
                    <span className="rounded bg-stone/10 px-1.5 py-0.5 text-[10px] text-stone">
                      Inactivo
                    </span>
                  )}
                </div>
                <p className="font-medium text-espresso">{p.nombre}</p>
                <p className="mt-1 line-clamp-2 flex-1 text-sm text-stone">
                  {p.descripcion}
                </p>
                <div className="mt-3 flex gap-2">
                  <AdminButton
                    variant="secondary"
                    onClick={() => openEdit(p)}
                    className="flex-1"
                  >
                    <Pencil className="h-4 w-4" /> Editar
                  </AdminButton>
                  <AdminButton
                    variant="ghost"
                    onClick={() => remove(p)}
                    aria-label="Eliminar"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </AdminButton>
                </div>
              </div>
            </Panel>
          ))}
        </div>
      )}

      <Modal
        open={editing !== null}
        onClose={() => setEditing(null)}
        title={editing === 'new' ? 'Nuevo producto' : 'Editar producto'}
        wide
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Nombre">
            <TextInput
              value={draft.nombre}
              onChange={(e) => setDraft({ ...draft, nombre: e.target.value })}
            />
          </Field>
          <Field label="Categoría">
            <TextInput
              value={draft.categoria}
              placeholder="Difusores, Esencias, Humidificadores…"
              onChange={(e) => setDraft({ ...draft, categoria: e.target.value })}
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Descripción">
              <TextArea
                value={draft.descripcion}
                onChange={(e) =>
                  setDraft({ ...draft, descripcion: e.target.value })
                }
              />
            </Field>
          </div>
          <Field label="Etiqueta (opcional)" hint="Ej: Más vendido, Natural">
            <TextInput
              value={draft.tag ?? ''}
              onChange={(e) =>
                setDraft({ ...draft, tag: e.target.value || null })
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
          <div className="sm:col-span-2">
            <ImageUploader
              value={draft.imagen_url}
              onChange={(url) => setDraft({ ...draft, imagen_url: url })}
              folder="productos"
            />
          </div>
          <div className="flex items-center gap-6 sm:col-span-2">
            <Toggle
              checked={draft.destacado}
              onChange={(v) => setDraft({ ...draft, destacado: v })}
              label="Destacado en la landing"
            />
            <Toggle
              checked={draft.activo}
              onChange={(v) => setDraft({ ...draft, activo: v })}
              label="Activo"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <AdminButton variant="secondary" onClick={() => setEditing(null)}>
            Cancelar
          </AdminButton>
          <AdminButton
            onClick={save}
            disabled={saving || !draft.nombre || !draft.categoria}
          >
            {saving ? 'Guardando…' : 'Guardar'}
          </AdminButton>
        </div>
      </Modal>
    </div>
  );
}
