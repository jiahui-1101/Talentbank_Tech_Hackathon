import candidates from '../data/candidates'
import employees from '../data/employees'

const roleSkills = {
  Engineer: ['React', 'TypeScript', 'Node.js', 'API Integration', 'SQL'],
  Product: ['Product Management', 'Roadmapping', 'SQL', 'Data Analysis'],
  Designer: ['Figma', 'UX Research', 'Design Systems', 'Prototyping'],
  Marketing: ['Marketing Analytics', 'SEO', 'Campaign Strategy', 'Copywriting'],
  Operations: ['Operations', 'Process Improvement', 'Excel', 'Forecasting'],
}

function inferSkills(employee) {
  const key = Object.keys(roleSkills).find((item) => employee.role.includes(item))
  return roleSkills[key] || roleSkills[employee.department] || ['Data Analysis', 'Stakeholder Management', 'Process Improvement', 'SQL']
}

function yearsSince(date) {
  return Math.max(1, new Date().getFullYear() - new Date(date).getFullYear())
}

export function getTalentPool(excludeEmployeeId) {
  const internal = employees
    .filter((employee) => employee.id !== excludeEmployeeId)
    .map((employee) => ({
      id: employee.id,
      name: employee.name,
      source: 'existing_employee',
      skills: inferSkills(employee),
      experienceYears: yearsSince(employee.joinDate) + (employee.level === 'Senior' ? 4 : employee.level === 'Mid' ? 2 : 0),
      availabilityScore: Math.max(0.25, Math.min(0.9, 1 - employee.riskScore / 140)),
      rehireable: true,
      currentRole: employee.role,
      department: employee.department,
    }))

  return [...internal, ...candidates]
}
