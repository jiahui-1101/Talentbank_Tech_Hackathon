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
      <label className="mb-3 block text-[11px] font-extrabold uppercase tracking-[0.08em] text-[var(--color-text-secondary)]">{label}</label>
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
        className={cn('h-13 w-full rounded-[18px] border bg-white px-4 text-sm font-semibold outline-none transition focus:border-[#47cfc0] focus:shadow-[0_0_0_4px_rgba(71,207,192,0.12)]', error ? 'border-red-400' : 'border-[var(--color-border)]')}
        placeholder={placeholder}
        value={input}
        onChange={(event) => setInput(event.target.value)}
        onKeyDown={addTag}
      />
      <div className="mt-3 flex flex-wrap gap-3">
        {value.map((tag) => (
          <span key={tag} className="flex items-center gap-2 rounded-full bg-[var(--color-bg-secondary)] px-4 py-2 text-sm font-bold">
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
    'h-13 w-full rounded-[18px] border bg-white px-4 text-sm font-semibold outline-none transition focus:border-[#47cfc0] focus:shadow-[0_0_0_4px_rgba(71,207,192,0.12)]',
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
      
      <div 
        onClick={() => navigate('/matching')}
        className="inline-flex cursor-pointer items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#7a7b73] hover:text-[#18181a]"
      >
        ← Back
      </div>
      <section className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-card)] sm:p-8">
        <div className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-[#fce055] opacity-30 blur-[100px]" />
        
        <div className="relative z-10">
          <div className="section-label">Create Demand Signal</div>
          <h2 className="mt-4 text-[42px] sm:text-[52px] font-semibold tracking-[-0.05em] leading-[1] text-[#18181a]">
            New Opportunity
          </h2>
          <p className="mt-3 text-base leading-7 text-[var(--color-text-secondary)]">
            Describe the role and let the talent pool surface warm matches.
          </p>
        </div>
      </section>
      {/* -------------------------------------- */}

      {showBanner && state?.fromEmployee ? (
        <div className="mb-6 flex items-start justify-between gap-4 rounded-[var(--radius-md)] border-l-4 border-[#47cfc0] bg-[#edf7f5] px-5 py-4">
          <div className="text-sm font-bold sm:text-base">
            Finding successor for {state.fromEmployee.name} · {state.fromEmployee.role}
          </div>
          <button className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]" onClick={() => setShowBanner(false)}>×</button>
        </div>
      ) : null}

      <section className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-card)]">
        <div className="grid gap-6 xl:grid-cols-2">
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
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {urgencyOptions.map(([label, Icon]) => (
              <button key={label} type="button" className={cn(
                'flex min-h-16 cursor-pointer items-center justify-center gap-3 rounded-[18px] border-2 p-4 text-center text-[12px] font-extrabold uppercase tracking-[0.075em] transition-all active:scale-[0.98] sm:min-h-20 sm:flex-col sm:gap-2',
                urgency === label
                  ? label === 'High'
                    ? 'border-[#ff6b6b] bg-[#fff0ee] text-[#a73535]'
                    : label === 'Medium'
                      ? 'border-[#47cfc0] bg-[#edf9f7] text-[#17655d]'
                      : 'border-[#7085d8] bg-[#f0f2ff] text-[#394b98]'
                  : 'border-[var(--color-border)] bg-white text-[var(--color-text-secondary)] hover:border-black/20',
              )} onClick={() => setUrgency(label)}>
                <Icon size={22} />
                <span>{label}</span>
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