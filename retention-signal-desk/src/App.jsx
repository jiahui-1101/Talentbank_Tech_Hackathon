import { Route, Routes } from 'react-router-dom'
import AppShell from './components/layout/AppShell'
import DashboardPage from './pages/DashboardPage'
import TeamHeatmapPage from './pages/TeamHeatmapPage'
import EmployeeDetailPage from './pages/EmployeeDetailPage'
import MatchingPage from './pages/MatchingPage'
import NewOpportunityPage from './pages/NewOpportunityPage'
import MatchResultPage from './pages/MatchResultPage'

function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/team" element={<TeamHeatmapPage />} />
        <Route path="/team/:id" element={<EmployeeDetailPage />} />
        <Route path="/matching" element={<MatchingPage />} />
        <Route path="/matching/new" element={<NewOpportunityPage />} />
        <Route path="/matching/:jobId/results" element={<MatchResultPage />} />
      </Route>
    </Routes>
  )
}

export default App
