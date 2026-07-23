import { useEffect, useState } from 'react';
import { Save } from 'lucide-react';
import type { Configuracion } from '@/types';
import { useConfig, updateConfig, type ConfigPatch } from '@/hooks/useConfig';
import { PageHeader } from '../components/PageHeader';
import { AdminButton, Field, Panel, Spinner, TextInput } from '../components/ui';

export function ConfiguracionPage() {
  const { data, loading, refetch } = useConfig();
  const [form, setForm] = useState<ConfigPatch>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (data) {
      const { id: _id, updated_at: _u, ...rest } = data;
      setForm(rest);
    }
  }, [data]);

  function set<K extends keyof Configuracion>(key: K, value: Configuracion[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setSaved(false);
  }

  async function save() {
    if (!data) return;
    setSaving(true);
    try {
      await updateConfig(data.id, form);
      setSaved(true);
      refetch();
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Error al guardar');
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <Spinner />;

  return (
    <div className="max-w-2xl">
      <PageHeader
        title="Configuración"
        description="Estadísticas del sitio y enlaces de contacto/tienda."
      />

      <div className="space-y-6">
        <Panel>
          <h2 className="mb-4 font-serif text-lg text-ink">
            Estadísticas (Hero)
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Clientes felices">
              <TextInput
                type="number"
                value={form.clientes_felices ?? 0}
                onChange={(e) =>
                  set('clientes_felices', Number(e.target.value))
                }
              />
            </Field>
            <Field
              label="Ciudades"
              hint="Debe coincidir con las ciudades de Cobertura."
            >
              <TextInput
                type="number"
                value={form.ciudades ?? 0}
                onChange={(e) => set('ciudades', Number(e.target.value))}
              />
            </Field>
            <Field label="Productos vendidos">
              <TextInput
                type="number"
                value={form.productos_vendidos ?? 0}
                onChange={(e) =>
                  set('productos_vendidos', Number(e.target.value))
                }
              />
            </Field>
            <Field label="Calificación (0–5)">
              <TextInput
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={form.calificacion ?? 0}
                onChange={(e) => set('calificacion', Number(e.target.value))}
              />
            </Field>
          </div>
        </Panel>

        <Panel>
          <h2 className="mb-4 font-serif text-lg text-ink">Enlaces</h2>
          <div className="space-y-4">
            <Field
              label="Número de WhatsApp"
              hint="Formato internacional, ej: 573001234567"
            >
              <TextInput
                value={form.whatsapp_numero ?? ''}
                onChange={(e) => set('whatsapp_numero', e.target.value)}
                placeholder="573001234567"
              />
            </Field>
            <Field label="URL de Instagram">
              <TextInput
                value={form.instagram_url ?? ''}
                onChange={(e) => set('instagram_url', e.target.value)}
                placeholder="https://instagram.com/aromaticcol"
              />
            </Field>
            <Field
              label="URL de la tienda"
              hint="Si se deja vacía, el botón de tienda cae a WhatsApp."
            >
              <TextInput
                value={form.store_url ?? ''}
                onChange={(e) => set('store_url', e.target.value)}
                placeholder="https://tienda.aromaticcol.com"
              />
            </Field>
          </div>
        </Panel>

        <div className="flex items-center gap-3">
          <AdminButton onClick={save} disabled={saving}>
            <Save className="h-4 w-4" />
            {saving ? 'Guardando…' : 'Guardar cambios'}
          </AdminButton>
          {saved && (
            <span className="text-sm text-forest">Cambios guardados ✓</span>
          )}
        </div>
      </div>
    </div>
  );
}
