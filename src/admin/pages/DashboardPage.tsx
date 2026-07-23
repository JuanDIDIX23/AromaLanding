import { Link } from 'react-router-dom';
import {
  Package,
  CalendarDays,
  Images,
  MapPin,
  Inbox,
  ArrowRight,
} from 'lucide-react';
import { useProductos } from '@/hooks/useProductos';
import { useFerias } from '@/hooks/useFerias';
import { useGaleria } from '@/hooks/useGaleria';
import { useCobertura } from '@/hooks/useCobertura';
import { useProspectos } from '@/hooks/useProspectos';
import { PageHeader } from '../components/PageHeader';
import { Panel } from '../components/ui';

export function DashboardPage() {
  const productos = useProductos();
  const ferias = useFerias();
  const galeria = useGaleria();
  const cobertura = useCobertura();
  const prospectos = useProspectos();

  const nuevos =
    prospectos.data?.filter((p) => p.estado === 'nuevo').length ?? 0;

  const stats = [
    {
      label: 'Productos activos',
      value: productos.data?.length,
      icon: Package,
      to: '/admin/productos',
    },
    {
      label: 'Ferias activas',
      value: ferias.data?.length,
      icon: CalendarDays,
      to: '/admin/ferias',
    },
    {
      label: 'Fotos en galería',
      value: galeria.data?.length,
      icon: Images,
      to: '/admin/galeria',
    },
    {
      label: 'Ciudades',
      value: cobertura.data?.length,
      icon: MapPin,
      to: '/admin/cobertura',
    },
  ];

  return (
    <div>
      <PageHeader
        title="Panel"
        description="Resumen del contenido de tu sitio AromaticCol."
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, to }) => (
          <Link key={label} to={to}>
            <Panel className="transition hover:border-clay-300 hover:shadow-md">
              <Icon className="h-5 w-5 text-clay-500" />
              <p className="mt-3 font-serif text-3xl text-ink">
                {value ?? '—'}
              </p>
              <p className="text-sm text-stone">{label}</p>
            </Panel>
          </Link>
        ))}
      </div>

      <div className="mt-6">
        <Link to="/admin/prospectos">
          <Panel className="flex items-center justify-between transition hover:border-clay-300 hover:shadow-md">
            <div className="flex items-center gap-4">
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-clay-50 text-clay-500">
                <Inbox className="h-5 w-5" />
              </span>
              <div>
                <p className="font-medium text-espresso">
                  Bandeja de prospectos
                </p>
                <p className="text-sm text-stone">
                  {nuevos > 0
                    ? `${nuevos} nuevo${nuevos === 1 ? '' : 's'} sin contactar`
                    : 'Sin prospectos nuevos'}
                </p>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-stone" />
          </Panel>
        </Link>
      </div>
    </div>
  );
}
