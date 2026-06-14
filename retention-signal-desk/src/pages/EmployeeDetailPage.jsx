import { ArrowRight } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import employees from '../data/employees'
import Avatar from '../components/ui/Avatar'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import EmptyState from '../components/ui/EmptyState'
import RiskScorePanel from '../components/team/RiskScorePanel'
import SuggestedActions from '../components/team/SuggestedActions'
import WorkSignals from '../components/team/WorkSignals'
import { useRiskColor } from '../hooks/useRiskColor'

function Header({ children }) {
  return <div className="section-label">{children}</div>
}

function DetailsCard({ employee }) {
  const rows = [['Salary', employee.salary], ['Department', employee.department], ['Level', employee.level], ['Employee ID', employee.id]]
  return (
    <Card>
      <Header>Profile Details</Header>
      <div className="mt-6 space-y-0">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-6 border-b border-[var(--color-border-subtle)] py-4 text-lg last:border-0">
            <span className="font-semibold text-[var(--color-text-secondary)]">{label}</span>
            <span className="mono font-bold text-[var(--color-text-primary)]">{value}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default function EmployeeDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const employee = employees.find((item) => item.id === id)
  const riskColor = useRiskColor(employee?.riskScore)

  if (!employee) {
    return <div><EmptyState title="Employee not found" description="This profile could not be located." /></div>
  }

  const findSuccessor = () => navigate('/matching/new', {
    state: {
      prefillRole: employee.role,
      prefillDepartment: employee.department,
      fromEmployee: { id: employee.id, name: employee.name, role: employee.role },
    },
  })

  return (
    <div className="space-y-7 pb-8">
      <section className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-card)]">
        <div className="flex items-center gap-6">
          <Avatar name={employee.name} score={employee.riskScore} size="lg" />
          <div className="min-w-0 flex-1">
            <div className="section-label text-[var(--color-accent)]">Risk Drill-In</div>
            <h2 className="mt-2 truncate text-3xl font-black">{employee.name}</h2>
            <div className="mt-2 text-base font-semibold text-[var(--color-text-secondary)]">{employee.role} · {employee.department}</div>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Badge label={employee.level} variant="default" />
          <Badge label={employee.salary} variant="default" />
          <Badge label={`Joined ${employee.joinDate.slice(0, 4)}`} variant="default" />
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="space-y-6">
          <RiskScorePanel employee={employee} />

          <Card className="border-l-4" style={{ borderLeftColor: riskColor }}>
            <Header>Predicted Trajectory</Header>
            <p className="mt-4 text-base italic leading-7 text-[var(--color-text-primary)]">{employee.trajectory}</p>
          </Card>

          <WorkSignals employee={employee} />

          <Card>
            <Header>Manager Feedback</Header>
            <div className="mt-4 rounded-[var(--radius-lg)] bg-[var(--color-bg-secondary)] p-5 text-base italic leading-7 text-[var(--color-text-secondary)]">
              {employee.managerComment}
            </div>
          </Card>
        </div>

        <aside className="space-y-6">
          <SuggestedActions actions={employee.suggestedActions} />

          <Card className="bg-[var(--color-accent-light)]" style={{ padding: 32 }}>
            <Button className="min-h-14 w-full" icon={ArrowRight} onClick={findSuccessor}>Find Potential Successor →</Button>
            <Button variant="ghost" className="mt-4 min-h-12 w-full" onClick={() => navigate('/team')}>← Back to Team</Button>
          </Card>

          <DetailsCard employee={employee} />
        </aside>
      </div>
    </div>
  )
}
