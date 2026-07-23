import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, MapPin } from 'lucide-react';
import type { Cobertura } from '@/types';
import {
  fetchAllCobertura,
  createCobertura,
  updateCobertura,
  deleteCobertura,
  type CoberturaDraft,
} from '@/hooks/useCobertura';
import { PageHeader } from '../components/PageHeader';
import { Modal } from '../components/Modal';
import {
  AdminButton,
  Field,
  Panel,
  Spinner,
  TextInput,
  Toggle,
} from '../components/ui';

const emptyDraft: CoberturaDraft = {
  ciudad: '',
  departamento: '',
  activa: true,
  orden: 0,
};

export function CoberturaPage() {
  const [items, setItems] = useState<Cobertura[] | null>(null);
  const [editing, setEditing] = useState<Cobertura | 'new' | null>(null);
  const [draft, setDraft] = useState<CoberturaDraft>(emptyDraft);
  const [saving, setSaving] = useState(false);

  async function load() {
    setItems(await fetchAllCobertura());
  }
  useEffect(() => {
    load();
  }, []);

  function openNew() {
    setDraft({ ...emptyDraft, orden: (items?.length ?? 0) + 1 });
    setEditing('new');
  }
  function openEdit(c: Cobertura) {
    const { id: _id, ...rest } = c;
    setDraft(rest);
    setEditing(c);
  }

  async function save() {
    setSaving(true);
    try {
      if (editing === 'new') await createCobertura(draft);
      else if (editing) await updateCobertura(editing.id, draft);
      setEditing(null);
      await load();
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Error al guardar');
    } finally {
      setSaving(false);
    }
  }

  async function remove(c: Cobertura) {
    if (!confirm(`¿Eliminar "${c.ciudad}"?`)) return;
    await deleteCobertura(c.id);
    await load();
  }

  return (
    <div>
      <PageHeader
        title="Cobertura"
        description="Ciudades con presencia de marca. El conteo se refleja en las estadísticas del sitio."
        action={
          <AdminButton onClick={openNew}>
            <Plus className="h-4 w-4" /> Nueva ciudad
          </AdminButton>
        }
      />

      {!items ? (
        <Spinner />
      ) : items.length === 0 ? (
        <Panel className="text-center text-sm text-stone">
          Aún no hay ciudades registradas.
        </Panel>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((c) => (
            <Panel key={c.id} className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-clay-50 text-clay-500">
                <MapPin className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-espresso">{c.ciudad}</p>
                <p className="text-sm text-stone">{c.departamento}</p>
              </div>
              {!c.activa && (
                <span className="text-xs text-stone-light">Oculta</span>
              )}
              <AdminButton variant="ghost" onClick={() => openEdit(c)} aria-label="Editar">
                <Pencil className="h-4 w-4" />
              </AdminButton>
              <AdminButton variant="ghost" onClick={() => remove(c)} aria-label="Eliminar">
                <Trash2 className="h-4 w-4 text-red-500" />
              </AdminButton>
            </Panel>
          ))}
        </div>
      )}

      <Modal
        open={editing !== null}
        onClose={() => setEditing(null)}
        title={editing === 'new' ? 'Nueva ciudad' : 'Editar ciudad'}
      >
        <div className="space-y-4">
          <Field label="Ciudad">
            <TextInput
              value={draft.ciudad}
              onChange={(e) => setDraft({ ...draft, ciudad: e.target.value })}
            />
          </Field>
          <Field label="Departamento">
            <TextInput
              value={draft.departamento}
              onChange={(e) =>
                setDraft({ ...draft, departamento: e.target.value })
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
          <AdminButton onClick={save} disabled={saving || !draft.ciudad}>
            {saving ? 'Guardando…' : 'Guardar'}
          </AdminButton>
        </div>
      </Modal>
    </div>
  );
}
