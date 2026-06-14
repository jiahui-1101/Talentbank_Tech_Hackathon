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
      <section className="relative overflow-hidden rounded-[38px] border border-black/5 bg-[#e9eadf] p-6 shadow-[0_20px_60px_rgba(30,31,27,0.07)] lg:p-8">
      <div className="pointer-events-none absolute -right-20 -top-28 h-80 w-80 rounded-full bg-[#fff29b] opacity-65 blur-[85px]" />
        <div className="relative"></div>
        <div className="section-label text-[#8c8d84]">Retention Map</div>
        <h2 className="mt-4 text-[52px] font-semibold tracking-[-0.05em] leading-[1] text-[#18181a]">
          Team Risk Zones
        </h2>
        <p className="mt-4 text-[15px] font-medium leading-6 text-[#6c6d66]">
          {filteredEmployees.length} employees · tap any card to see full risk profile
        </p>
      </section>

      <section className="rounded-[38px]border border-black/5 bg-white p-6 shadow-[0_20px_40px_rgba(30,31,27,0.05)]">
        <div className="relative">
          <Search size={17} className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]" />
          <input
            className="w-full rounded-full border border-black/5 bg-[#f1f2ea] py-4 pl-13 pr-5 text-base"
            placeholder="Search name or role..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[auto_1fr] lg:items-start">
          <div>
            <div className="mb-3 text-[11px] font-black uppercase tracking-[0.22em] text-[#8c8d84]">Risk Level</div>
            <div className="flex flex-wrap gap-2">
              {riskLevels.map((level) => (
                <button
                  key={level}
                  type="button"
                  className={cn(
                    'rounded-full px-5 py-2.5 text-[12px] font-extrabold uppercase tracking-[0.075em] transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.97]',
                    riskLevel === level
                      ? 'bg-[#ff6b6b] text-white shadow-[0_8px_18px_rgba(255,107,107,0.24)]'
                      : 'bg-[#252624] text-white/65 hover:bg-[#343532] hover:text-white',
                  )}
                  onClick={() => setRiskLevel(level)}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-3 text-[11px] font-black uppercase tracking-[0.22em] text-[#8c8d84]">Department</div>
            <div className="flex flex-wrap gap-2">
              {departments.map((item, index) => (
                <button
                  key={item}
                  type="button"
                  className={cn(
                    'rounded-full px-5 py-2.5 text-[12px] font-extrabold transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.97]',
                    department === item
                      ? index % 2 === 0
                        ? 'rotate-[-1deg] bg-[#47cfc0] text-[#123d39] shadow-[0_8px_18px_rgba(71,207,192,0.22)]'
                        : 'rotate-[1deg] bg-[#ff8d7d] text-[#54221c] shadow-[0_8px_18px_rgba(255,141,125,0.22)]'
                      : 'bg-[#252624] text-white/65 hover:bg-[#343532] hover:text-white',
                  )}
                  onClick={() => setDepartment(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
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
