import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import type { Feria } from '@/types';
import {
  fetchAllFerias,
  createFeria,
  updateFeria,
  deleteFeria,
  type FeriaDraft,
} from '@/hooks/useFerias';
import { feriaEstado, formatRango } from '@/lib/utils';
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

const emptyDraft: FeriaDraft = {
  nombre: '',
  centro_comercial: '',
  ciudad: '',
  dias_horario: '',
  fecha_inicio: null,
  fecha_fin: null,
  descripcion: null,
  imagen_url: null,
  activa: true,
  orden: 0,
};

const ESTADO_LABEL: Record<string, string> = {
  activa: 'Activa ahora',
  proxima: 'Próxima',
  pasada: 'Pasada',
  'sin-fecha': 'Sin fecha',
};

export function FeriasPage() {
  const [items, setItems] = useState<Feria[] | null>(null);
  const [editing, setEditing] = useState<Feria | 'new' | null>(null);
  const [draft, setDraft] = useState<FeriaDraft>(emptyDraft);
  const [saving, setSaving] = useState(false);

  async function load() {
    setItems(await fetchAllFerias());
  }
  useEffect(() => {
    load();
  }, []);

  function openNew() {
    setDraft({ ...emptyDraft, orden: (items?.length ?? 0) + 1 });
    setEditing('new');
  }
  function openEdit(f: Feria) {
    const { id: _id, created_at: _c, ...rest } = f;
    setDraft(rest);
    setEditing(f);
  }

  async function save() {
    setSaving(true);
    try {
      if (editing === 'new') await createFeria(draft);
      else if (editing) await updateFeria(editing.id, draft);
      setEditing(null);
      await load();
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Error al guardar');
    } finally {
      setSaving(false);
    }
  }

  async function remove(f: Feria) {
    if (!confirm(`¿Eliminar "${f.nombre}"?`)) return;
    await deleteFeria(f.id);
    await load();
  }

  return (
    <div>
      <PageHeader
        title="Ferias"
        description="El estado (activa / próxima / pasada) se calcula automáticamente según las fechas."
        action={
          <AdminButton onClick={openNew}>
            <Plus className="h-4 w-4" /> Nueva feria
          </AdminButton>
        }
      />

      {!items ? (
        <Spinner />
      ) : items.length === 0 ? (
        <Panel className="text-center text-sm text-stone">
          Aún no hay ferias registradas.
        </Panel>
      ) : (
        <div className="space-y-3">
          {items.map((f) => {
            const estado = feriaEstado(f);
            return (
              <Panel key={f.id} className="flex flex-wrap items-center gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        estado === 'activa'
                          ? 'bg-forest text-cream'
                          : estado === 'proxima'
                            ? 'bg-clay-100 text-clay-600'
                            : 'bg-stone/10 text-stone'
                      }`}
                    >
                      {ESTADO_LABEL[estado]}
                    </span>
                    {!f.activa && (
                      <span className="text-xs text-stone-light">(oculta)</span>
                    )}
                  </div>
                  <p className="mt-1 font-medium text-espresso">{f.nombre}</p>
                  <p className="text-sm text-stone">
                    {f.centro_comercial} · {f.ciudad}
                    {f.dias_horario ? ` · ${f.dias_horario}` : ''}
                  </p>
                  {(f.fecha_inicio || f.fecha_fin) && (
                    <p className="text-xs text-stone-light">
                      {formatRango(f.fecha_inicio, f.fecha_fin)}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <AdminButton variant="secondary" onClick={() => openEdit(f)}>
                    <Pencil className="h-4 w-4" /> Editar
                  </AdminButton>
                  <AdminButton
                    variant="ghost"
                    onClick={() => remove(f)}
                    aria-label="Eliminar"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </AdminButton>
                </div>
              </Panel>
            );
          })}
        </div>
      )}

      <Modal
        open={editing !== null}
        onClose={() => setEditing(null)}
        title={editing === 'new' ? 'Nueva feria' : 'Editar feria'}
        wide
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Nombre del evento">
            <TextInput
              value={draft.nombre}
              onChange={(e) => setDraft({ ...draft, nombre: e.target.value })}
            />
          </Field>
          <Field label="Centro comercial">
            <TextInput
              value={draft.centro_comercial}
              onChange={(e) =>
                setDraft({ ...draft, centro_comercial: e.target.value })
              }
            />
          </Field>
          <Field label="Ciudad">
            <TextInput
              value={draft.ciudad}
              onChange={(e) => setDraft({ ...draft, ciudad: e.target.value })}
            />
          </Field>
          <Field label="Días y horario" hint="Ej: Todos los días · 10:00 a 20:00">
            <TextInput
              value={draft.dias_horario}
              onChange={(e) =>
                setDraft({ ...draft, dias_horario: e.target.value })
              }
            />
          </Field>
          <Field label="Fecha de inicio">
            <TextInput
              type="date"
              value={draft.fecha_inicio ?? ''}
              onChange={(e) =>
                setDraft({ ...draft, fecha_inicio: e.target.value || null })
              }
            />
          </Field>
          <Field label="Fecha de fin">
            <TextInput
              type="date"
              value={draft.fecha_fin ?? ''}
              onChange={(e) =>
                setDraft({ ...draft, fecha_fin: e.target.value || null })
              }
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Descripción (opcional)">
              <TextArea
                value={draft.descripcion ?? ''}
                onChange={(e) =>
                  setDraft({ ...draft, descripcion: e.target.value || null })
                }
              />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <ImageUploader
              value={draft.imagen_url}
              onChange={(url) => setDraft({ ...draft, imagen_url: url })}
              folder="ferias"
              label="Imagen (opcional)"
            />
          </div>
          <Toggle
            checked={draft.activa}
            onChange={(v) => setDraft({ ...draft, activa: v })}
            label="Visible en el sitio"
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <AdminButton variant="secondary" onClick={() => setEditing(null)}>
            Cancelar
          </AdminButton>
          <AdminButton
            onClick={save}
            disabled={
              saving ||
              !draft.nombre ||
              !draft.centro_comercial ||
              !draft.ciudad
            }
          >
            {saving ? 'Guardando…' : 'Guardar'}
          </AdminButton>
        </div>
      </Modal>
    </div>
  );
}
