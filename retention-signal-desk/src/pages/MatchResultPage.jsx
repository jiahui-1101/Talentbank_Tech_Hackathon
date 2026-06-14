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
    <div className="space-y-8 pb-8">
      {routeState?.fromEmployee ? (
        <section className="flex items-center gap-5 rounded-[var(--radius-xl)] border-l-4 border-[var(--color-risk-high)] bg-[var(--color-risk-high-bg)] p-8 shadow-[var(--shadow-card)]">
          <Avatar name={routeState.fromEmployee.name} size="sm" />
          <div>
            <div className="text-xl font-black">Succession match for {routeState.fromEmployee.name}</div>
            <div className="mt-2 text-lg font-semibold text-[var(--color-text-secondary)]">Finding candidates for {opportunity.title}</div>
          </div>
        </section>
      ) : null}

      <section className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-8 shadow-[var(--shadow-card)]">
        <div className="section-label text-[var(--color-accent)]">Top 10 Matches</div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <h2 className="text-4xl font-black">{opportunity.title}</h2>
          <Badge label={opportunity.department} variant="default" />
          <Badge label={opportunity.urgency} variant={opportunity.urgency.toLowerCase()} />
        </div>
        <div className="mt-4 text-lg font-semibold text-[var(--color-text-secondary)]">
          Matched {top10.length} candidates from pool of {getTalentPool(routeState?.fromEmployee?.id).length}
        </div>
      </section>

      <section className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-card)]">
        <div className="mb-4 section-label">Sort Candidates</div>
        <div className="flex gap-4">
          {sortOptions.map(([value, label]) => (
            <button
              key={value}
              type="button"
              className={cn('min-h-14 flex-1 rounded-full px-5 py-3 text-base font-black uppercase tracking-wide transition', sortBy === value ? 'bg-[var(--color-accent)] text-white' : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)]')}
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
