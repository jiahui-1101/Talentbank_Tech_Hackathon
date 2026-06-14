import { useMemo } from 'react'
import {
  AlertTriangle,
  ArrowUpRight,
  Briefcase,
  Plus,
  Sparkles,
  Users,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import employees from '../data/employees'
import candidates from '../data/candidates'
import opportunities from '../data/opportunities'
import RiskDistribution from '../components/dashboard/RiskDistribution'
import Avatar from '../components/ui/Avatar'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

export default function DashboardPage() {
  const navigate = useNavigate()
  const stats = useMemo(() => {
    const riskCounts = employees.reduce(
      (acc, employee) => ({ ...acc, [employee.riskLevel]: acc[employee.riskLevel] + 1 }),
      { Low: 0, Medium: 0, High: 0 },
    )
    const openRoles = opportunities.filter((role) => role.status === 'Open')
    const topRisk = [...employees].sort((a, b) => b.riskScore - a.riskScore).slice(0, 4)
    const avgRisk = Math.round(employees.reduce((sum, employee) => sum + employee.riskScore, 0) / employees.length)
    const activeProjects = employees.reduce((sum, employee) => sum + employee.activeProjects, 0)
    const recognition = employees.reduce((sum, employee) => sum + employee.recognitionCount, 0)
  
    const totalEmployees = employees.length
    const talentPoolCount = candidates.length

    return { 
      riskCounts, 
      openRoles, 
      topRisk, 
      avgRisk, 
      activeProjects, 
      recognition,
      totalEmployees,
      talentPoolCount
    }
  }, [])

  return (
    <div className="flex min-h-full flex-col gap-5 pb-8">
      <section className="relative overflow-hidden rounded-[38px] border border-black/5 bg-[#e9eadf] p-6 shadow-[0_20px_60px_rgba(30,31,27,0.07)] lg:p-8">
        <div className="pointer-events-none absolute -right-20 -top-28 h-80 w-80 rounded-full bg-[#fff29b] opacity-65 blur-[85px]" />
        
        <div className="relative flex flex-col justify-between gap-10 xl:flex-row xl:items-end">
          <div className="max-w-lg xl:pb-2">
            <div className="section-label">Retention Signal Desk</div>
            <h2 className="mt-4 text-[52px] font-semibold tracking-[-0.05em] leading-[1] text-[#18181a]">
              Workforce Overview
            </h2>
            <p className="mt-4 max-w-md text-[15px] font-medium leading-6 text-[#6c6d66]">
              Live retention, mobility and talent demand signals.
            </p>
          </div>

          <div className="flex w-full max-w-[640px] flex-col gap-6">
            
            <div className="grid grid-cols-3 gap-3">
              {[
                ['Employees', stats.totalEmployees, 'All Depts'],
                ['Open Roles', stats.openRoles.length, 'Active Demand'],
                ['Talent Pool', stats.talentPoolCount, 'Unified Profiles'],
              ].map(([label, value, subtitle]) => (
                <div key={label} className="flex h-[76px] max-w-[220px] flex-col justify-center rounded-[20px] border border-white/80 bg-white/50 px-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]">
                  <div className="text-[10px] font-black uppercase tracking-wider text-black/50">{label}</div>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="mono text-3xl font-black tracking-tighter text-[#1a1b18] leading-none">{value}</span>
                    <span className="text-[9px] font-bold uppercase text-black/30">{subtitle}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                ['High Risk', stats.riskCounts.High, 'bg-[#20211f] text-white'],
                ['Medium Risk', stats.riskCounts.Medium, 'bg-[#ffd85a] text-[#24251f]'],
                ['Low Risk', stats.riskCounts.Low, 'bg-white/70 text-[#24251f]'],
              ].map(([label, value, style]) => (
                <div key={label}>
                  <div className="mb-1 text-[11px] font-semibold text-black/50">{label}</div>
                  <div className={`flex h-12 w-full items-center justify-between rounded-full px-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)] ${style}`}>
                    <span className="mono text-[22px] font-black leading-none">{value}</span>
                    <span className="text-[10px] font-black uppercase tracking-[0.12em] opacity-45">people</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
          
        </div>
      </section>
      
      <section className="grid gap-5 xl:grid-cols-[1.38fr_0.82fr]">
        <Card className="relative overflow-hidden bg-[#20211f] text-white" style={{ padding: 32 }}>
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[var(--color-accent)] opacity-15 blur-[70px]" />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="section-label !text-[var(--color-accent)]">Immediate Attention</div>
              <div className="mt-5 flex items-end gap-4">
                <span className="mono text-[86px] font-black leading-[0.8] tracking-[-0.09em]">{stats.riskCounts.High}</span>
                <span className="max-w-[190px] pb-1 text-xl font-bold leading-[1.05] text-white/70">
                  employees require action
                </span>
              </div>
            </div>
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-white/70">
              <span className="h-2 w-2 rounded-full bg-[var(--color-risk-high)]" />
              {stats.riskCounts.High} active risks
            </div>
          </div>

          <div className="relative mt-10">
            <RiskDistribution counts={stats.riskCounts} total={employees.length} />
          </div>

          <div className="relative mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              ['Avg Risk', stats.avgRisk, '/100'],
              ['Projects', stats.activeProjects, 'active'],
              ['Recognition', stats.recognition, 'signals'],
            ].map(([label, value, unit]) => (
              <div key={label} className="rounded-[22px] border border-white/10 bg-white/[0.055] p-5">
                <div className="section-label !text-white/35">{label}</div>
                <div className="mono mt-3 text-2xl font-black">
                  {value}<span className="ml-2 text-[10px] text-white/35">{unit}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid gap-5">
          <Card className="relative overflow-hidden bg-white" style={{ padding: 28 }}>
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-[#111a2c] px-4 py-2 shadow-[0_8px_22px_rgba(17,26,44,0.16)]">
            <AlertTriangle
            size={14}
            strokeWidth={2.4}
            className="text-[#ffd85a]"/>
            <span className="bg-gradient-to-r from-[#7dd3fc] via-[#60a5fa] to-[#a78bfa] bg-clip-text font-mono text-[10px] font-black tracking-[0.16em] text-transparent">
              AI ADVISOR + ANOMALIES
            </span>
            </div>
            <Sparkles size={24} className="absolute right-7 top-7 text-black/10" />
            <p className="mt-8 text-2xl font-black leading-tight tracking-[-0.035em] text-[#171814]">
              {stats.topRisk[0].name} may begin external search within 60 days.
            </p>
            <div className="mt-6 rounded-[20px] bg-[#f1f2ea] px-5 py-4 font-mono text-xs leading-6 text-[#62655c]">
              Department: {stats.topRisk[0].department} · Score: {stats.topRisk[0].riskScore}/100 · Action: schedule manager intervention.
            </div>
          </Card>

          <Card style={{ padding: 26 }}>
            <div className="mb-5 flex items-center justify-between">
              <div className="section-label">System Event Log</div>
              <span className="h-2 w-2 rounded-full bg-[var(--color-risk-low)] shadow-[0_0_0_5px_var(--color-risk-low-bg)]" />
            </div>
            <div className="space-y-3">
              {stats.topRisk.map((employee, index) => (
                <div key={employee.id} className="grid grid-cols-[42px_46px_1fr] gap-2 border-b border-black/5 pb-3 text-xs leading-5 last:border-0 last:pb-0">
                  <span className="mono text-black/35">09:{(index + 1) * 11}</span>
                  <span className="mono font-black text-[var(--color-risk-high)]">RISK</span>
                  <span className="font-semibold text-[#5f6259]">{employee.name} · {employee.riskDrivers[0].label}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <Card style={{ padding: 28 }}>
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <div className="section-label">High-Risk Profiles</div>
              <h3 className="mt-2 text-2xl font-black tracking-[-0.04em]">People to check in with.</h3>
            </div>
            <Button variant="ghost" onClick={() => navigate('/team')}>View All →</Button>
          </div>
          <div className="grid gap-3 lg:grid-cols-2">
            {stats.topRisk.map((employee) => (
              <button
                key={employee.id}
                onClick={() => navigate(`/team/${employee.id}`)}
                className="group w-full rounded-[22px] border border-black/[0.06] bg-[#f1f2ea] p-4 text-left transition duration-300 hover:-translate-y-0.5 hover:border-black/20 hover:bg-white hover:shadow-[0_14px_30px_rgba(23,24,20,0.08)]"
              >
                <div className="flex items-center gap-3">
                  <Avatar name={employee.name} score={employee.riskScore} size="sm" />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-black">{employee.name}</div>
                    <div className="mt-1 truncate text-xs font-semibold text-black/45">{employee.role} · {employee.department}</div>
                  </div>
                  <Badge label={employee.riskLevel} variant={employee.riskLevel.toLowerCase()} />
                </div>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-black/5">
                  <div className="h-full rounded-full bg-[var(--color-risk-high)] transition-all group-hover:brightness-90" style={{ width: `${employee.riskScore}%` }} />
                </div>
              </button>
            ))}
          </div>
        </Card>

        <Card style={{ padding: 28 }}>
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#20211f] text-[var(--color-accent)]">
              <Briefcase size={18} />
            </div>
            <div>
              <div className="section-label">Open Opportunities</div>
              <h3 className="mt-1 text-xl font-black tracking-[-0.035em]">Active demand.</h3>
            </div>
          </div>
          <div className="space-y-2">
            {stats.openRoles.slice(0, 5).map((opportunity) => (
              <button
                key={opportunity.id}
                onClick={() => navigate(`/matching/${opportunity.id}/results`)}
                className="group flex w-full items-center gap-4 rounded-[18px] px-4 py-3 text-left transition hover:bg-[#f1f2ea]"
              >
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-black">{opportunity.title}</div>
                  <div className="mt-1 text-xs font-semibold text-black/40">{opportunity.department} · {opportunity.minExperience}+ yrs</div>
                </div>
                <Badge label={opportunity.urgency} variant={opportunity.urgency.toLowerCase()} />
                <ArrowUpRight size={15} className="text-black/25 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-black" />
              </button>
            ))}
          </div>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {[
          [Users, 'Team Heatmap', 'Monitor risk zones', '/team', 'All profiles'],
          [Briefcase, 'Opportunity Matching', 'Find successors', '/matching', `${stats.openRoles.length} open`],
          [Plus, 'Create Demand Signal', 'Launch new search', '/matching/new', 'New role'],
        ].map(([Icon, title, description, path, stat], index) => (
          <Card
            key={title}
            hover
            className={index === 1 ? 'bg-[#20211f] text-white' : index === 2 ? 'bg-[var(--color-accent)]' : ''}
            onClick={() => navigate(path)}
            style={{ padding: 26 }}
          >
            <div className="flex items-start justify-between">
              <Icon size={22} className={index === 1 ? 'text-[var(--color-accent)]' : ''} />
              <ArrowUpRight size={18} className="opacity-35" />
            </div>
            <div className="mt-8 text-lg font-black tracking-[-0.025em]">{title}</div>
            <div className="mt-1 text-sm font-semibold opacity-50">{description}</div>
            <div className="mt-5 inline-flex rounded-full border border-current/10 px-3 py-1.5 font-mono text-[10px] font-black uppercase tracking-[0.1em] opacity-60">{stat}</div>
          </Card>
        ))}
      </section>
    </div>
  )
}