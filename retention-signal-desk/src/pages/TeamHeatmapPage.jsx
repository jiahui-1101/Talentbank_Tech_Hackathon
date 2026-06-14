import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import employees from '../data/employees'
import EmployeeCard from '../components/team/EmployeeCard'
import EmptyState from '../components/ui/EmptyState'
import { cn } from '../lib/cn'

const departments = ['All Departments', 'Engineering', 'Product', 'Design', 'Marketing', 'Operations']
const riskLevels = ['All', 'High', 'Medium', 'Low']

export default function TeamHeatmapPage() {
  const [search, setSearch] = useState('')
  const [department, setDepartment] = useState('All Departments')
  const [riskLevel, setRiskLevel] = useState('All')

  const filteredEmployees = useMemo(() => {
    const query = search.trim().toLowerCase()
    return employees
      .filter((employee) => {
        const matchesSearch = !query || employee.name.toLowerCase().includes(query) || employee.role.toLowerCase().includes(query)
        const matchesDepartment = department === 'All Departments' || employee.department === department
        const matchesRisk = riskLevel === 'All' || employee.riskLevel === riskLevel
        return matchesSearch && matchesDepartment && matchesRisk
      })
      .sort((a, b) => b.riskScore - a.riskScore)
  }, [search, department, riskLevel])

  return (
    <div className="space-y-7 pb-8">
      <section className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-8 shadow-[var(--shadow-card)]">
        <div className="section-label text-[var(--color-accent)]">Retention Map</div>
        <h2 className="mt-3 text-4xl font-black">Team Risk Zones</h2>
        <p className="mt-3 text-lg text-[var(--color-text-secondary)]">
          {filteredEmployees.length} employees · tap any card to see full risk profile
        </p>
      </section>

      <section className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-card)]">
        <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]" />
          <input
            className="w-full rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-bg)] py-4 pl-11 pr-4 text-base outline-none focus:border-[var(--color-accent)]"
            placeholder="Search name or role..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        <select className="w-full rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-bg)] px-4 py-4 text-base md:w-64" value={department} onChange={(event) => setDepartment(event.target.value)}>
          {departments.map((item) => <option key={item}>{item}</option>)}
        </select>
        </div>
        <div className="mt-5 flex gap-3 overflow-x-auto">
          {riskLevels.map((level) => (
            <button
              key={level}
              type="button"
              className={cn(
                'shrink-0 rounded-full px-5 py-2.5 text-sm font-black uppercase tracking-wide transition',
                riskLevel === level ? 'bg-[var(--color-accent)] text-white' : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)]',
              )}
              onClick={() => setRiskLevel(level)}
            >
              {level}
            </button>
          ))}
        </div>
      </section>

      {filteredEmployees.length ? (
        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredEmployees.map((employee, index) => <EmployeeCard key={employee.id} employee={employee} index={index} />)}
        </section>
      ) : (
        <EmptyState title="No employees found" description="Try adjusting your filters." />
      )}
    </div>
  )
}
