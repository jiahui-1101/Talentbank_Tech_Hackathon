import { useMemo } from 'react'
import { AlertTriangle, Briefcase, Plus, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import employees from '../data/employees'
import candidates from '../data/candidates'
import opportunities from '../data/opportunities'
import RiskDistribution from '../components/dashboard/RiskDistribution'
import Avatar from '../components/ui/Avatar'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

function KpiTile({ label, value, unit, subtitle, tone = 'accent', delay = 0 }) {
  const toneMap = {
    accent: ['text-[var(--color-accent)]', 'from-[var(--color-accent)] to-[var(--color-accent-hover)]'],
    success: ['text-[var(--color-risk-low)]', 'from-[var(--color-risk-low)] to-emerald-300'],
    warning: ['text-[var(--color-risk-medium)]', 'from-[var(--color-risk-medium)] to-amber-300'],
    danger: ['text-[var(--color-risk-high)]', 'from-[var(--color-risk-high)] to-red-300'],
  }
  const [textClass, barClass] = toneMap[tone]

  return (
    <div
      className="animate-slide-up relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white shadow-[var(--shadow-card)]"
      style={{ animationDelay: `${delay}ms`, padding: '28px 32px 26px' }}
    >
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${barClass}`} />
      <div className="section-label leading-none">{label}</div>
      <div className={`mono mt-4 text-4xl font-black leading-none ${textClass}`}>
        {value}
        {unit ? <span className="ml-2 align-middle text-base font-semibold opacity-60">{unit}</span> : null}
      </div>
      <div className="mt-5 text-base font-semibold text-[var(--color-text-secondary)]">{subtitle}</div>
    </div>
  )
}

export default function DashboardPage() {
  const navigate = useNavigate()
  const stats = useMemo(() => {
    const riskCounts = employees.reduce((acc, employee) => ({ ...acc, [employee.riskLevel]: acc[employee.riskLevel] + 1 }), { Low: 0, Medium: 0, High: 0 })
    const openRoles = opportunities.filter((role) => role.status === 'Open')
    const topRisk = [...employees].sort((a, b) => b.riskScore - a.riskScore).slice(0, 4)
    const avgRisk = Math.round(employees.reduce((sum, employee) => sum + employee.riskScore, 0) / employees.length)
    const activeProjects = employees.reduce((sum, employee) => sum + employee.activeProjects, 0)
    const recognition = employees.reduce((sum, employee) => sum + employee.recognitionCount, 0)
    return { riskCounts, openRoles, topRisk, avgRisk, activeProjects, recognition }
  }, [])

  return (
    <div className="flex min-h-full flex-col gap-8 pb-8">
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <KpiTile label="Employees" value={employees.length} subtitle="All departments" delay={40} />
        <KpiTile label="High Risk" value={stats.riskCounts.High} subtitle="Require action" tone="danger" delay={80} />
        <KpiTile label="Medium Risk" value={stats.riskCounts.Medium} subtitle="Watch list" tone="warning" delay={120} />
        <KpiTile label="Low Risk" value={stats.riskCounts.Low} subtitle="Stable zone" tone="success" delay={160} />
        <KpiTile label="Open Roles" value={stats.openRoles.length} subtitle="Active demand" delay={200} />
        <KpiTile label="Talent Pool" value={candidates.length + employees.length} subtitle="Unified profiles" tone="success" delay={240} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.45fr_1fr]">
        <Card className="relative overflow-hidden" style={{ padding: 36 }}>
          <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-risk-low)]" />
          <div className="flex items-start justify-between gap-8">
            <div>
              <div className="section-label text-[var(--color-accent)]">Retention Command Center</div>
              <h2 className="mt-4 text-5xl font-light leading-none text-[var(--color-text-primary)]">
                {Math.round(((employees.length - stats.riskCounts.High) / employees.length) * 100)}
                <span className="ml-2 text-2xl text-[var(--color-text-tertiary)]">%</span>
              </h2>
              <p className="mt-5 max-w-3xl text-base leading-7 text-[var(--color-text-secondary)]">
                Workforce stability remains healthy, but {stats.riskCounts.High} high-risk profiles need immediate retention or succession planning.
              </p>
            </div>
            <div className="shrink-0 rounded-full border border-amber-200 bg-[var(--color-risk-medium-bg)] px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.1em] text-[var(--color-risk-medium)]">
              Warning
            </div>
          </div>

          <div className="mt-8">
            <RiskDistribution counts={stats.riskCounts} total={employees.length} />
          </div>

          <div className="mt-8 grid grid-cols-3 gap-5">
            {[
              ['Avg Risk', stats.avgRisk, '/100'],
              ['Projects', stats.activeProjects, 'active'],
              ['Recognition', stats.recognition, 'signals'],
            ].map(([label, value, unit]) => (
              <div key={label} className="rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-tertiary)]" style={{ padding: 24, minHeight: 128 }}>
                <div className="section-label">{label}</div>
                <div className="mono mt-3 text-2xl font-bold">{value}<span className="ml-2 text-xs text-[var(--color-text-tertiary)]">{unit}</span></div>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid gap-6">
          <Card className="border-l-4 border-l-[var(--color-risk-medium)] bg-[var(--color-risk-medium-bg)]">
            <div className="flex items-center gap-2">
              <AlertTriangle size={16} className="text-[var(--color-risk-medium)]" />
              <div className="section-label text-[var(--color-risk-medium)]">AI Advisor + Anomalies</div>
            </div>
            <p className="mt-5 text-base font-bold leading-7 text-[var(--color-text-primary)]">
              {stats.topRisk[0].name} may begin external search within 60 days.
            </p>
            <div className="mt-4 font-mono text-xs leading-6 text-[var(--color-text-secondary)]">
              Department: {stats.topRisk[0].department} · Score: {stats.topRisk[0].riskScore}/100 · Action: schedule manager intervention.
            </div>
          </Card>

          <Card>
            <div className="mb-3 flex items-center justify-between">
              <div className="section-label">System Event Log</div>
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-risk-low)] shadow-[0_0_5px_rgba(5,150,105,0.5)]" />
            </div>
            <div className="space-y-4 text-base leading-7">
              {stats.topRisk.map((employee, index) => (
                <div key={employee.id} className="flex gap-3 text-[var(--color-text-secondary)]">
                  <span className="mono text-sm text-[var(--color-text-tertiary)]">09:{(index + 1) * 11}</span>
                  <span className="mono min-w-14 text-sm font-bold text-[var(--color-accent)]">[RISK]</span>
                  <span>{employee.name} · {employee.riskDrivers[0].label}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <div className="mb-6 flex items-center justify-between">
            <div className="section-label">High-Risk Profiles · Tap To Drill In</div>
            <Button variant="ghost" onClick={() => navigate('/team')}>View All →</Button>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            {stats.topRisk.map((employee) => (
              <button key={employee.id} onClick={() => navigate(`/team/${employee.id}`)} className="w-full rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-tertiary)] p-5 text-left transition hover:border-[var(--color-accent)] hover:bg-white">
                <div className="flex items-center gap-3">
                  <Avatar name={employee.name} score={employee.riskScore} size="sm" />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-base font-black">{employee.name}</div>
                    <div className="mt-1 truncate text-sm font-semibold text-[var(--color-text-secondary)]">{employee.role} · {employee.department}</div>
                  </div>
                  <Badge label={employee.riskLevel} variant={employee.riskLevel.toLowerCase()} />
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-[var(--color-border-subtle)]">
                  <div className="h-full rounded-full bg-[var(--color-risk-high)]" style={{ width: `${employee.riskScore}%` }} />
                </div>
              </button>
            ))}
          </div>
        </Card>

        <Card>
          <div className="mb-6 flex items-center gap-3">
            <Briefcase size={22} className="text-[var(--color-accent)]" />
            <div className="section-label">Open Opportunities</div>
          </div>
          <div className="space-y-4">
            {stats.openRoles.slice(0, 5).map((opportunity) => (
              <button key={opportunity.id} onClick={() => navigate(`/matching/${opportunity.id}/results`)} className="flex w-full items-center gap-4 rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-tertiary)] p-5 text-left hover:border-[var(--color-accent)] hover:bg-white">
                <div className="min-w-0 flex-1">
                  <div className="truncate text-base font-bold">{opportunity.title}</div>
                  <div className="mt-1 text-sm font-semibold text-[var(--color-text-secondary)]">{opportunity.department} · {opportunity.minExperience}+ yrs</div>
                </div>
                <Badge label={opportunity.urgency} variant={opportunity.urgency.toLowerCase()} />
              </button>
            ))}
          </div>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {[
          [Users, 'Team Heatmap', 'Monitor risk zones', '/team', 'All profiles'],
          [Briefcase, 'Opportunity Matching', 'Find successors', '/matching', `${stats.openRoles.length} open`],
          [Plus, 'Create Demand Signal', 'Launch new search', '/matching/new', 'New role'],
        ].map(([Icon, title, description, path, stat]) => (
          <Card key={title} hover className="relative overflow-hidden" onClick={() => navigate(path)}>
            <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)]" />
            <Icon size={26} className="text-[var(--color-accent)]" />
            <div className="mt-4 text-lg font-bold">{title}</div>
            <div className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">{description}</div>
            <div className="mt-5 inline-flex rounded-[var(--radius-sm)] border border-blue-200 bg-[var(--color-accent-light)] px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-[0.1em] text-[var(--color-accent)]">{stat}</div>
          </Card>
        ))}
      </section>
    </div>
  )
}
