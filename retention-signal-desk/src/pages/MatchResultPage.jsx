import { useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import opportunities from '../data/opportunities'
import Avatar from '../components/ui/Avatar'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'
import CandidateResultCard from '../components/matching/CandidateResultCard'
import { getTalentPool } from '../lib/talentPool'
import { cn } from '../lib/cn'

const sortOptions = [['match', 'Match'], ['availability', 'Availability'], ['experience', 'Experience']]

function getMatches(opportunity, fromEmployee) {
  return getTalentPool(fromEmployee?.id)
    .map((candidate) => {
      const matchingSkills = candidate.skills.filter((skill) =>
        opportunity.requiredSkills.some((req) => {
          const skillLower = skill.toLowerCase()
          const reqLower = req.toLowerCase()
          return reqLower.includes(skillLower) || skillLower.includes(reqLower)
        }),
      )
      const skillScore = Math.min(matchingSkills.length / opportunity.requiredSkills.length, 1)
      const expScore = Math.min(candidate.experienceYears / (opportunity.minExperience || 1), 1)
      const matchScore = Math.round((skillScore * 0.5 + expScore * 0.2 + candidate.availabilityScore * 0.3) * 100)
      return { ...candidate, matchScore, matchingSkills }
    })
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 10)
}

export default function MatchResultPage() {
  const { jobId } = useParams()
  const { state: routeState } = useLocation()
  const navigate = useNavigate()
  const [sortBy, setSortBy] = useState('match')
  const opportunity = routeState?.requiredSkills ? routeState : opportunities.find((item) => item.id === jobId)
  const top10 = useMemo(() => (opportunity ? getMatches(opportunity, routeState?.fromEmployee) : []), [opportunity, routeState?.fromEmployee])
  const sorted = useMemo(() => [...top10].sort((a, b) => {
    if (sortBy === 'availability') return b.availabilityScore - a.availabilityScore
    if (sortBy === 'experience') return b.experienceYears - a.experienceYears
    return b.matchScore - a.matchScore
  }), [top10, sortBy])

  if (!opportunity) {
    return <div><EmptyState title="Opportunity not found" description="This role could not be located." /></div>
  }

  return (
    <div className="space-y-6 pb-8">
      {routeState?.fromEmployee ? (
        <section className="flex items-center gap-4 rounded-[var(--radius-xl)] border-l-4 border-[var(--color-risk-high)] bg-[var(--color-risk-high-bg)] p-5 shadow-[var(--shadow-card)] sm:p-7">
          <Avatar name={routeState.fromEmployee.name} size="sm" />
          <div>
            <div className="text-base font-black sm:text-xl">Succession match for {routeState.fromEmployee.name}</div>
            <div className="mt-1 text-sm font-semibold text-[var(--color-text-secondary)] sm:text-base">Finding candidates for {opportunity.title}</div>
          </div>
        </section>
      ) : null}

      <section className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-card)] sm:p-7">
        <div className="section-label text-[var(--color-accent-ink)]">Top 10 Matches</div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <h2 className="break-words text-2xl font-black sm:text-4xl">{opportunity.title}</h2>
          <Badge label={opportunity.department} variant="default" />
          <Badge label={opportunity.urgency} variant={opportunity.urgency.toLowerCase()} />
        </div>
        <div className="mt-4 text-sm font-semibold text-[var(--color-text-secondary)] sm:text-base">
          Matched {top10.length} candidates from pool of {getTalentPool(routeState?.fromEmployee?.id).length}
        </div>
      </section>

      <section className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-card)]">
        <div className="mb-4 section-label">Sort Candidates</div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {sortOptions.map(([value, label]) => (
            <button
              key={value}
              type="button"
              className={cn(
                'min-h-11 rounded-full px-5 py-3 text-[12px] font-extrabold uppercase tracking-[0.075em] transition-all active:scale-[0.98]',
                sortBy === value
                  ? 'bg-[#47cfc0] text-[#123d39] shadow-[0_8px_18px_rgba(71,207,192,0.2)]'
                  : 'bg-[#252624] text-white/70 hover:text-white',
              )}
              onClick={() => setSortBy(value)}
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      <main className="space-y-6">
        {sorted.map((candidate, index) => (
          <CandidateResultCard key={candidate.id} rank={index + 1} candidate={candidate} opportunity={opportunity} matchScore={candidate.matchScore} />
        ))}
      </main>

      <Button variant="ghost" className="w-full" onClick={() => navigate('/matching')}>← Back to Matching</Button>
    </div>
  )
}
