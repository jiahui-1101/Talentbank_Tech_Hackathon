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
      <section className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white shadow-[var(--shadow-card)]" style={{ padding: 36 }}>
        <div className="section-label text-[var(--color-accent)]">Succession Engine</div>
        <h2 className="mt-4 text-4xl font-black">Opportunity Matching</h2>
        <p className="mt-4 max-w-4xl text-lg leading-8 text-[var(--color-text-secondary)]">
          Match open roles to current employees, former employees, past candidates, and former interns.
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
              <div className="mono text-4xl font-black text-[var(--color-accent)]">{count}</div>
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
