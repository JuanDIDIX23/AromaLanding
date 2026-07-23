import { Mail, Phone, Trash2, MessageCircle } from 'lucide-react';
import type { ProspectoEstado } from '@/types';
import {
  useProspectos,
  updateProspectoEstado,
  deleteProspecto,
} from '@/hooks/useProspectos';
import { whatsappLink } from '@/lib/utils';
import { PageHeader } from '../components/PageHeader';
import { Panel, Select, Spinner } from '../components/ui';

const ESTADOS: ProspectoEstado[] = [
  'nuevo',
  'contactado',
  'cotizado',
  'cerrado',
  'descartado',
];

const ESTADO_STYLE: Record<ProspectoEstado, string> = {
  nuevo: 'bg-forest text-cream',
  contactado: 'bg-clay-100 text-clay-600',
  cotizado: 'bg-amber-100 text-amber-700',
  cerrado: 'bg-emerald-100 text-emerald-700',
  descartado: 'bg-stone/10 text-stone',
};

export function ProspectosPage() {
  const { data, loading, refetch } = useProspectos();

  async function setEstado(id: string, estado: ProspectoEstado) {
    await updateProspectoEstado(id, estado);
    refetch();
  }

  async function remove(id: string) {
    if (!confirm('¿Eliminar este prospecto?')) return;
    await deleteProspecto(id);
    refetch();
  }

  return (
    <div>
      <PageHeader
        title="Prospectos"
        description="Leads recibidos desde el formulario de contacto del sitio."
      />

      {loading ? (
        <Spinner />
      ) : !data || data.length === 0 ? (
        <Panel className="text-center text-sm text-stone">
          Aún no has recibido prospectos.
        </Panel>
      ) : (
        <div className="space-y-3">
          {data.map((p) => (
            <Panel key={p.id} className="flex flex-wrap items-start gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${ESTADO_STYLE[p.estado]}`}
                  >
                    {p.estado}
                  </span>
                  <p className="font-medium text-espresso">{p.nombre}</p>
                  <span className="text-xs text-stone-light">
                    {new Date(p.created_at).toLocaleDateString('es-CO', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>

                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-stone">
                  <a
                    href={whatsappLink(p.telefono)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 hover:text-clay-500"
                  >
                    <Phone className="h-3.5 w-3.5" /> {p.telefono}
                  </a>
                  {p.correo && (
                    <a
                      href={`mailto:${p.correo}`}
                      className="inline-flex items-center gap-1 hover:text-clay-500"
                    >
                      <Mail className="h-3.5 w-3.5" /> {p.correo}
                    </a>
                  )}
                </div>

                {p.interes && (
                  <p className="mt-1 text-sm text-stone">
                    <span className="font-medium">Interés:</span> {p.interes}
                  </p>
                )}
                {p.mensaje && (
                  <p className="mt-1 text-sm text-espresso">“{p.mensaje}”</p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={whatsappLink(
                    p.telefono,
                    `Hola ${p.nombre}, gracias por escribir a AromaticCol 🌿`,
                  )}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Responder por WhatsApp"
                  className="rounded-lg p-2 text-forest hover:bg-cream"
                >
                  <MessageCircle className="h-5 w-5" />
                </a>
                <Select
                  value={p.estado}
                  onChange={(e) =>
                    setEstado(p.id, e.target.value as ProspectoEstado)
                  }
                  className="w-auto"
                >
                  {ESTADOS.map((e) => (
                    <option key={e} value={e}>
                      {e}
                    </option>
                  ))}
                </Select>
                <button
                  onClick={() => remove(p.id)}
                  aria-label="Eliminar"
                  className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </Panel>
          ))}
        </div>
      )}
    </div>
  );
}
