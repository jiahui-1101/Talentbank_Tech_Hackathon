import { useState } from 'react'
import { Clock, Flame, Leaf } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import { cn } from '../lib/cn'

const departments = ['Engineering', 'Product', 'Design', 'Marketing', 'Operations']
const urgencyOptions = [['High', Flame], ['Medium', Clock], ['Low', Leaf]]

function Field({ label, error, children }) {
  return (
    <div>
      <label className="mb-3 block font-mono text-sm font-bold uppercase tracking-[0.1em] text-[var(--color-text-secondary)]">{label}</label>
      {children}
      {error ? <p className="mt-2 text-sm font-semibold text-[var(--color-risk-high)]">{error}</p> : null}
    </div>
  )
}

function TagInput({ value, setValue, placeholder, error }) {
  const [input, setInput] = useState('')
  const addTag = (event) => {
    if (event.key !== 'Enter') return
    event.preventDefault()
    const tag = input.trim()
    if (tag && !value.includes(tag)) setValue([...value, tag])
    setInput('')
  }

  return (
    <>
      <input
        className={cn('h-14 w-full rounded-[var(--radius-lg)] border bg-white px-4 text-base font-semibold outline-none transition focus:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(23,72,200,0.12)]', error ? 'border-red-400' : 'border-[var(--color-border)]')}
        placeholder={placeholder}
        value={input}
        onChange={(event) => setInput(event.target.value)}
        onKeyDown={addTag}
      />
      <div className="mt-3 flex flex-wrap gap-3">
        {value.map((tag) => (
          <span key={tag} className="flex items-center gap-2 rounded-full bg-[var(--color-bg-secondary)] px-4 py-2 text-base font-semibold">
            {tag}
            <button type="button" onClick={() => setValue(value.filter((item) => item !== tag))}>×</button>
          </span>
        ))}
      </div>
    </>
  )
}

export default function NewOpportunityPage() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const [showBanner, setShowBanner] = useState(Boolean(state?.fromEmployee))
  const [title, setTitle] = useState(state?.prefillRole || '')
  const [department, setDepartment] = useState(state?.prefillDepartment || 'Engineering')
  const [skills, setSkills] = useState([])
  const [cultureTags, setCultureTags] = useState([])
  const [minExperience, setMinExperience] = useState(3)
  const [urgency, setUrgency] = useState('Medium')
  const [errors, setErrors] = useState({})

  const inputClass = (error) => cn(
    'h-14 w-full rounded-[var(--radius-lg)] border bg-white px-4 text-base font-semibold outline-none transition focus:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(23,72,200,0.12)]',
    error ? 'border-red-400' : 'border-[var(--color-border)]',
  )

  const submit = () => {
    const nextErrors = {}
    if (!title.trim()) nextErrors.title = 'Job title is required.'
    if (!skills.length) nextErrors.skills = 'Add at least one required skill.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return
    navigate('/matching/new-result/results', {
      state: {
        id: `opp_${Date.now()}`,
        title,
        department,
        requiredSkills: skills,
        minExperience: Number(minExperience),
        cultureTags,
        urgency,
        status: 'Open',
        fromEmployee: state?.fromEmployee,
      },
    })
  }

  return (
    <div className="space-y-7 pb-8">
      <section className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-card)]">
        <Button variant="ghost" className="mb-4 px-0" onClick={() => navigate('/matching')}>← Back</Button>
        <div className="section-label text-[var(--color-accent)]">Create Demand Signal</div>
        <h2 className="mt-3 text-3xl font-black">New Opportunity</h2>
        <p className="mt-3 text-base leading-7 text-[var(--color-text-secondary)]">Describe the role and let the talent pool surface warm matches.</p>
      </section>
      {showBanner && state?.fromEmployee ? (
        <div className="mb-6 flex items-center justify-between rounded-[var(--radius-md)] border-l-4 border-[var(--color-accent)] bg-[var(--color-bg-secondary)] px-5 py-3">
          <div className="text-lg font-bold">
            Finding successor for {state.fromEmployee.name} · {state.fromEmployee.role}
          </div>
          <button className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]" onClick={() => setShowBanner(false)}>×</button>
        </div>
      ) : null}

      <section className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-card)]">
        <div className="grid gap-6 lg:grid-cols-2">
          <Field label="Job Title" error={errors.title}>
            <input className={inputClass(errors.title)} value={title} onChange={(event) => setTitle(event.target.value)} />
          </Field>
          <Field label="Department">
            <select className={inputClass()} value={department} onChange={(event) => setDepartment(event.target.value)}>
              {departments.map((item) => <option key={item}>{item}</option>)}
            </select>
          </Field>
          <Field label="Required Skills" error={errors.skills}>
            <TagInput value={skills} setValue={setSkills} placeholder="Press Enter to add a skill" error={errors.skills} />
          </Field>
          <Field label="Min Experience">
            <div className="relative">
              <input type="number" min="0" max="20" className={`${inputClass()} pr-24`} value={minExperience} onChange={(event) => setMinExperience(event.target.value)} />
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-base font-semibold text-[var(--color-text-secondary)]">years</span>
            </div>
          </Field>
          <Field label="Culture Tags">
            <TagInput value={cultureTags} setValue={setCultureTags} placeholder="e.g. collaborative" />
          </Field>
          <Field label="Urgency">
            <div className="grid grid-cols-3 gap-4">
            {urgencyOptions.map(([label, Icon]) => (
              <button key={label} type="button" className={cn('min-h-20 cursor-pointer rounded-[var(--radius-lg)] border-2 p-4 text-center transition-all', urgency === label ? 'border-[var(--color-accent)] bg-[var(--color-accent-light)]' : 'border-[var(--color-border)] bg-white hover:border-[var(--color-accent)]')} onClick={() => setUrgency(label)}>
                <Icon size={26} className="mx-auto mb-3" />
                <span className="text-base font-bold">{label}</span>
              </button>
            ))}
            </div>
          </Field>
        </div>
        <Button className="mt-8 w-full" onClick={submit}>Find Matches →</Button>
      </section>
    </div>
  )
}
