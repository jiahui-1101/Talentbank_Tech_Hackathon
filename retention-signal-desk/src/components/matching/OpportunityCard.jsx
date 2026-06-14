import Badge from '../ui/Badge'
import Button from '../ui/Button'
import Card from '../ui/Card'

function Pill({ children, accent = false }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-semibold ${
        accent
          ? 'bg-[#f5ffd8] text-[#95b300]'
          : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)]'
      }`}
    >
      {children}
    </span>
  )
}

export default function OpportunityCard({ opportunity, onMatch }) {
  const skills = opportunity.requiredSkills.slice(0, 3)
  const extra = opportunity.requiredSkills.length - skills.length

  return (
    <Card hover className="flex flex-col border-l-4 border-l-[var(--color-accent)]" style={{ padding: 32 }}>
      <div className="flex items-start gap-4">
        <h3 className="flex-1 text-xl font-black leading-tight">{opportunity.title}</h3>
        <Badge label={opportunity.urgency} variant={opportunity.urgency.toLowerCase()} />
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Badge
          label={opportunity.status}
          variant={opportunity.status === 'Open' ? 'low' : 'default'}
        />
      </div>
      <div className="ml-auto flex gap-2">
        <span className="text-base font-semibold text-[var(--color-text-secondary)]">
          {opportunity.minExperience}+ yrs exp
        </span>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {skills.map((skill) => <Pill key={skill}>{skill}</Pill>)}
        {extra > 0 ? <Pill>+{extra} more</Pill> : null}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {opportunity.cultureTags.map((tag) => <Pill key={tag} accent>{tag}</Pill>)}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Badge
          label={opportunity.status}
          variant={opportunity.status === 'Open' ? 'low' : 'default'}
        />

        <div className="ml-auto flex gap-2">
          <Button
            variant="ghost"
            className="px-5 py-3 rounded-full bg-[#f1f2ea] text-[15px] font-semibold tracking-[-0.02em]"
            onClick={onMatch}
          >
            View Matches
          </Button>
          {opportunity.status === 'Open' ? (
            <Button variant="secondary" className=" px-5 py-3 rounded-full text-[15px] font-semibold tracking-[-0.02em]">
              Details
            </Button>
          ) : null}
        </div>
      </div>
    </Card>
  )
}
