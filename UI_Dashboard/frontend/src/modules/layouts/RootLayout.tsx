import { NavLink, Outlet } from 'react-router-dom'

function SidebarLink({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block rounded-md px-3 py-2 text-sm font-medium ${
          isActive ? 'bg-brand-50 text-brand-700' : 'text-gray-700 hover:bg-gray-100'
        }`
      }
      end
    >
      {label}
    </NavLink>
  )
}

export default function RootLayout() {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-[240px_1fr]">
      <aside className="hidden md:flex flex-col gap-2 border-r bg-white p-3">
        <div className="px-2 py-3 text-lg font-semibold">UI-Dashboards</div>
        <nav className="flex flex-col gap-1">
          <SidebarLink to="/" label="Cards 1" />
          <SidebarLink to="/cards-2" label="Cards 2" />
          <SidebarLink to="/charts" label="Charts" />
          <SidebarLink to="/table" label="Table" />
        </nav>
      </aside>

      <div className="flex flex-col">
        <header className="md:hidden sticky top-0 z-10 bg-white border-b p-3">
          <div className="text-base font-semibold">UI-Dashboards</div>
        </header>
        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}


