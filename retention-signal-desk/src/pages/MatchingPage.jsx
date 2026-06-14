import { useNavigate } from 'react-router-dom'
import { Briefcase, Plus, UserCheck } from 'lucide-react'
import opportunities from '../data/opportunities'
import employees from '../data/employees'
import candidates from '../data/candidates'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import OpportunityCard from '../components/matching/OpportunityCard'

const poolStats = [
  ['Current Employees', employees.length, 'Internal mobility'],
  ['Former Employees', candidates.filter((c) => c.source === 'former_employee').length, 'Previously vetted'],
  ['Past Candidates', candidates.filter((c) => c.source === 'past_candidate').length, 'Interviewed before'],
  ['Former Interns', candidates.filter((c) => c.source === 'former_intern').length, 'Culture-fit proven'],
]

export default function MatchingPage() {
  const navigate = useNavigate()

  return (
    <div className="space-y-8 pb-8">
      <section className="relative overflow-hidden rounded-[38px] border border-black/5 bg-[#e9eadf] p-6 shadow-[0_20px_60px_rgba(30,31,27,0.07)] lg:p-8">
        <div className="pointer-events-none absolute -right-20 -top-28 h-80 w-80 rounded-full bg-[#fff29b] opacity-65 blur-[85px]" />
        <div className="section-label">Succession Engine</div>

        <h2 className="mt-4 text-[52px] font-semibold tracking-[-0.05em] leading-[1] text-[#18181a]">
          Opportunity Matching
        </h2>

        <p className="mt-4 text-[15px] font-medium leading-6 text-[#6c6d66]">
          Match open roles to current employees, former employees, past candidates and former interns.
        </p>
        <Button className="mt-8 min-h-14 w-full sm:w-auto" icon={Plus} onClick={() => navigate('/matching/new')}>Create New Opportunity</Button>
      </section>

      <Card className="border-l-4 border-l-[var(--color-accent)]" style={{ padding: 32 }}>
        <div className="flex items-center gap-2 lg:col-span-2">
          <UserCheck size={22} className="text-[var(--color-accent)]" />
          <div className="section-label">Unified Talent Pool</div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-5 md:grid-cols-4">
          {poolStats.map(([label, count, subtitle]) => (
            <div key={label} className="rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-tertiary)]" style={{ minHeight: 150, padding: 24 }}>
              <div className="mono text-4xl font-black text-[var(--color-accent-ink)]">{count}</div>
              <div className="section-label mt-5">{label}</div>
              <div className="mt-2 text-base font-semibold text-[var(--color-text-secondary)]">{subtitle}</div>
            </div>
          ))}
        </div>
      </Card>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="flex items-center gap-3 lg:col-span-2">
          <Briefcase size={22} className="text-[var(--color-accent)]" />
          <div className="section-label">Open Opportunities</div>
        </div>
        {opportunities.map((opp) => (
          <OpportunityCard key={opp.id} opportunity={opp} onMatch={() => navigate(`/matching/${opp.id}/results`)} />
        ))}
      </section>
    </div>
  )
}
