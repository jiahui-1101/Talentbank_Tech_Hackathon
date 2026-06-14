import { useEffect, useRef } from 'react'
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
  const scrollContainerRef = useRef(null)
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

  useEffect(() => {
    scrollContainerRef.current?.scrollTo({ top: 0, left: 0 })
  }, [pathname])

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-[var(--color-bg)]">
      <TopBar title={getPageTitle(pathname)}>
        <nav className="hidden items-center gap-1 rounded-full border border-black/[0.06] bg-white/80 p-1 shadow-[0_8px_24px_rgba(20,21,18,0.05)] backdrop-blur-xl md:flex">
          {navItems.map(([label, Icon, to]) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                cn(
                  'flex h-9 min-w-[88px] items-center justify-center gap-2 rounded-full px-4 text-[11px] font-black transition-all duration-300',
                  isActive
                    ? 'bg-[#20211f] text-white shadow-[0_6px_16px_rgba(0,0,0,0.16)]'
                    : 'text-black/45 hover:bg-[#eef0e6] hover:text-black',
                )
              }
            >
              <Icon size={14} />
              {label}
            </NavLink>
          ))}
        </nav>
      </TopBar>

      <div className="flex h-7 flex-shrink-0 items-center overflow-hidden border-y border-black/[0.045] bg-[#20211f] text-white">
        <div className="flex animate-[ticker_42s_linear_infinite] gap-20 whitespace-nowrap font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-white/55">
          {[...tickerItems, ...tickerItems, ...tickerItems].map((item, index) => (
            <span key={`${item}-${index}`} className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
              {item}
            </span>
          ))}
        </div>
      </div>

      <main className="relative min-h-0 flex-1 overflow-hidden">
        <div ref={scrollContainerRef} className="page-enter h-full overflow-y-auto overflow-x-hidden px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
          <div className="mx-auto min-h-full max-w-[1600px]">
            <Outlet />
          </div>
        </div>
      </main>

      <nav className="flex h-16 flex-shrink-0 items-center justify-around border-t border-black/[0.06] bg-white px-3 md:hidden">
        {navItems.map(([label, Icon, to]) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              cn(
                'flex min-w-[64px] flex-col items-center gap-1 rounded-2xl px-3 py-2 text-[9px] font-black uppercase tracking-wider transition',
                isActive ? 'bg-[#20211f] text-[var(--color-accent)]' : 'text-black/35',
              )
            }
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
