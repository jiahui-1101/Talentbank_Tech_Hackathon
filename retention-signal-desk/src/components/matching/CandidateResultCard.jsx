import { useMemo, useState } from 'react'
import { Check, ChevronDown, Copy } from 'lucide-react'
import Avatar from '../ui/Avatar'
import AvailabilityRing from './AvailabilityRing'
import { cn } from '../../lib/cn'

const sourceConfig = {
  existing_employee: { color: 'var(--color-risk-low)', label: 'Internal Talent' },
  former_employee: { color: '#6577d8', label: 'Former Employee' },
  past_candidate: { color: 'var(--color-risk-high)', label: 'Past Candidate' },
  former_intern: { color: 'var(--color-risk-medium)', label: 'Former Intern' },
}

function getMessage(candidate, opportunity) {
  const [first, second] = candidate.skills
  if (candidate.source === 'existing_employee') return `Hi ${candidate.name}, your ${first} background and current ${candidate.currentRole || 'role'} experience could support our ${opportunity.title} succession plan. Would you be open to a growth conversation?`
  if (candidate.source === 'former_employee') return `Hi ${candidate.name}, it's been a while! Your background in ${first} and ${second} stood out when you were with us. We now have a ${opportunity.title} role that aligns with your trajectory. Open to a 15-min chat?`
  if (candidate.source === 'past_candidate') return `Hi ${candidate.name}, you interviewed with us previously for ${candidate.appliedRole || 'a role'}. We now have a ${opportunity.title} opportunity that's an even closer match. Your ${first} experience is exactly what we need. Open to reconnecting?`
  return `Hi ${candidate.name}, we remember your work during your internship. You've grown since then, and we have a ${opportunity.title} full-time role. Your ${first} skills are a strong match. Would you like to explore this?`
}

export default function CandidateResultCard({ candidate, opportunity, rank, matchScore }) {
  const [expanded, setExpanded] = useState(false)
  const [copied, setCopied] = useState(false)
  const config = sourceConfig[candidate.source]
  const message = getMessage(candidate, opportunity)
  const requiredSkills = useMemo(() => opportunity.requiredSkills.map((skill) => skill.toLowerCase()), [opportunity.requiredSkills])
  const copyMessage = () => navigator.clipboard.writeText(message).then(() => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  })

  return (
    <div className="animate-slide-up overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border-subtle)] bg-white shadow-[var(--shadow-card)] transition-all duration-200" style={{ borderLeft: `4px solid ${config.color}` }}>
      <div className="grid gap-5 p-5 sm:p-7 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-start">
        <div className="flex items-center gap-3 md:block">
          <Avatar name={candidate.name} size="md" />
          <span className="inline-block rounded-full px-3 py-1 text-xs font-bold md:mt-3" style={{ backgroundColor: `color-mix(in srgb, ${config.color} 15%, transparent)`, color: config.color }}>{config.label}</span>
        </div>

        <div className="min-w-0 flex-1">
          <div>
            <span className="mr-3 text-sm text-[var(--color-text-tertiary)]">#{rank}</span>
            <span className="text-xl font-black">{candidate.name}</span>
          </div>
          <div className="mt-2 text-base font-semibold text-[var(--color-text-secondary)]">{candidate.experienceYears} years experience</div>
          <div className="mt-4 flex flex-wrap gap-2">
            {candidate.skills.map((skill) => {
              const lower = skill.toLowerCase()
              const matches = requiredSkills.some((required) => required.includes(lower) || lower.includes(required))
              return (
                <span
                  key={skill}
                  className={cn('rounded-full px-3 py-1 text-xs font-semibold sm:text-sm', !matches && 'bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)]')}
                  style={matches ? { backgroundColor: `color-mix(in srgb, ${config.color} 15%, transparent)`, color: config.color } : undefined}
                >
                  {skill}
                </span>
              )
            })}
          </div>
        </div>

        <div className="flex items-center gap-4 text-center md:flex-col md:gap-0">
          <div>
          <div className="text-3xl font-black sm:text-4xl" style={{ color: config.color }}>{matchScore}</div>
          <span className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-tertiary)]">MATCH</span>
          </div>
          <div className="md:mt-3"><AvailabilityRing score={candidate.availabilityScore} /></div>
          <div className="mt-2 text-xs font-bold text-[var(--color-text-tertiary)]">Availability</div>
        </div>
      </div>

      <button type="button" className="flex w-full cursor-pointer items-center justify-between border-t border-[var(--color-border-subtle)] px-5 py-4 text-left transition-all hover:bg-[var(--color-bg-secondary)] sm:px-7" onClick={() => setExpanded(!expanded)}>
        <div className="text-base font-bold text-[var(--color-text-secondary)]">AI Outreach Draft</div>
        <ChevronDown size={16} className={cn('transition-transform duration-200', expanded && 'rotate-180')} />
      </button>

      <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: expanded ? '320px' : '0px' }}>
        <div className="px-5 pb-5 sm:px-7 sm:pb-7">
          <div className="rounded-[var(--radius-md)] bg-[var(--color-bg-secondary)] p-5 text-sm leading-7 text-[var(--color-text-secondary)] sm:text-base">{message}</div>
          <button type="button" className={cn('mt-4 flex items-center gap-2 text-sm font-bold', copied ? 'text-[var(--color-risk-low)]' : 'text-[var(--color-text-secondary)]')} onClick={copyMessage}>
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'Copied!' : 'Copy Message'}
          </button>
        </div>
      </div>
    </div>
  )
}
