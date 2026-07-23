import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  CalendarDays,
  Images,
  MapPin,
  Inbox,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const NAV = [
  { to: '/admin', label: 'Panel', icon: LayoutDashboard, end: true },
  { to: '/admin/productos', label: 'Productos', icon: Package },
  { to: '/admin/ferias', label: 'Ferias', icon: CalendarDays },
  { to: '/admin/galeria', label: 'Galería', icon: Images },
  { to: '/admin/cobertura', label: 'Cobertura', icon: MapPin },
  { to: '/admin/prospectos', label: 'Prospectos', icon: Inbox },
  { to: '/admin/configuracion', label: 'Configuración', icon: Settings },
];

export function AdminLayout() {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  async function handleSignOut() {
    await signOut();
    navigate('/admin/login', { replace: true });
  }

  return (
    <div className="min-h-screen bg-cream text-espresso">
      {/* Topbar móvil */}
      <header className="flex items-center justify-between border-b border-line bg-white px-4 py-3 lg:hidden">
        <span className="font-serif text-lg text-ink">AromaticCol</span>
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          className="rounded-lg p-2 hover:bg-cream"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={cn(
            'fixed inset-y-0 left-0 z-40 w-64 shrink-0 border-r border-line bg-white transition-transform lg:static lg:translate-x-0',
            open ? 'translate-x-0' : '-translate-x-full',
          )}
        >
          <div className="hidden items-center gap-2 px-6 py-5 lg:flex">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-ink font-serif text-cream">
              A
            </span>
            <div>
              <p className="font-serif text-ink">AromaticCol</p>
              <p className="text-xs text-stone-light">Panel de administración</p>
            </div>
          </div>

          <nav className="space-y-1 px-3 py-4">
            {NAV.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-ink text-cream'
                      : 'text-stone hover:bg-cream hover:text-espresso',
                  )
                }
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="absolute inset-x-0 bottom-0 space-y-1 border-t border-line p-3">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-stone hover:bg-cream hover:text-espresso"
            >
              <ExternalLink className="h-4 w-4" />
              Ver sitio
            </a>
            <button
              onClick={handleSignOut}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-stone hover:bg-cream hover:text-espresso"
            >
              <LogOut className="h-4 w-4" />
              Cerrar sesión
            </button>
          </div>
        </aside>

        {/* Overlay móvil */}
        {open && (
          <div
            className="fixed inset-0 z-30 bg-ink/40 lg:hidden"
            onClick={() => setOpen(false)}
          />
        )}

        {/* Contenido */}
        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
