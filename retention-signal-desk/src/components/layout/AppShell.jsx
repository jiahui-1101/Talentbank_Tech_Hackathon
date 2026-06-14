import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { Briefcase, Home, Plus, Users } from 'lucide-react'
import employees from '../../data/employees'
import candidates from '../../data/candidates'
import opportunities from '../../data/opportunities'
import TopBar from './TopBar'
import { cn } from '../../lib/cn'

const navItems = [
  ['Home', Home, '/'],
  ['Team', Users, '/team'],
  ['Match', Briefcase, '/matching'],
  ['New', Plus, '/matching/new'],
]

function getPageTitle(pathname) {
  if (pathname === '/') return 'Overview'
  if (pathname === '/team') return 'Team Heatmap'
  if (pathname.startsWith('/team/')) {
    const id = pathname.split('/')[2]
    const employee = employees.find((item) => item.id === id)
    return employee ? `${employee.name} · Risk Profile` : 'Team · Employee Detail'
  }
  if (pathname === '/matching') return 'Opportunity Matching'
  if (pathname === '/matching/new') return 'New Opportunity'
  if (pathname.startsWith('/matching/')) return 'Match Results'
  return 'Overview'
}

export default function AppShell() {
  const { pathname } = useLocation()
  const highRisk = employees.filter((employee) => employee.riskLevel === 'High').length
  const openRoles = opportunities.filter((opportunity) => opportunity.status === 'Open').length
  const tickerItems = [
    `EMPLOYEES · ${employees.length}`,
    `HIGH RISK · ${highRisk} active`,
    `OPEN ROLES · ${openRoles}`,
    `TALENT POOL · ${candidates.length + employees.length}`,
    'SUCCESSION ENGINE · online',
    'AI ADVISOR · demo mode',
  ]

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-[var(--color-bg)]">
      <TopBar title={getPageTitle(pathname)} />

      <div className="flex h-7 flex-shrink-0 items-center overflow-hidden border-b border-[var(--color-border)] bg-[var(--color-bg-tertiary)]">
        <div className="flex animate-[ticker_42s_linear_infinite] gap-20 whitespace-nowrap font-mono text-xs tracking-[0.08em] text-[var(--color-text-secondary)]">
          {[...tickerItems, ...tickerItems, ...tickerItems].map((item, index) => (
            <span key={`${item}-${index}`} className="inline-flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-current" />
              {item}
            </span>
          ))}
        </div>
      </div>

      <nav className="relative z-10 flex h-20 flex-shrink-0 items-center justify-center gap-5 border-b border-[var(--color-border)] bg-white px-8 shadow-[0_4px_16px_rgba(13,17,23,0.04)]">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
        {navItems.map(([label, Icon, to]) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              cn(
                'relative flex h-12 min-w-36 items-center justify-center gap-2 rounded-[var(--radius-lg)] border px-5 font-mono text-xs font-bold uppercase tracking-[0.08em] transition-all after:absolute after:bottom-2 after:left-5 after:right-5 after:h-0.5 after:origin-left after:rounded-full after:bg-gradient-to-r after:from-[var(--color-accent)] after:to-[var(--color-accent-hover)] after:transition-transform',
                isActive
                  ? 'border-blue-200 bg-[var(--color-accent-light)] text-[var(--color-accent)] after:scale-x-100'
                  : 'border-transparent text-[var(--color-text-tertiary)] after:scale-x-0 hover:border-[var(--color-border)] hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)]',
              )
            }
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>

      <main className="relative z-10 min-h-0 flex-1 overflow-hidden">
        <div
          className="page-enter h-full overflow-y-auto overflow-x-hidden"
          style={{ padding: '36px 48px 56px' }}
        >
          <div className="min-h-full">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  )
}
