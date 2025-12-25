import { Routes, Route } from 'react-router-dom'
import VSCodeLayout from './components/VSCodeLayout'
import Inbox from './pages/Inbox'
import Forecast from './pages/Forecast'
import Flagged from './pages/Flagged'
import Projects from './pages/Projects'
import Tags from './pages/Tags'
import Review from './pages/Review'
import Dashboard from './pages/Dashboard'
import TaskList from './pages/TaskList'
import TaskDetail from './pages/TaskDetail'
import './App.css'

function App() {
  return (
    <VSCodeLayout>
      <Routes>
        <Route index element={<Inbox />} />
        <Route path="inbox" element={<Inbox />} />
        <Route path="forecast" element={<Forecast />} />
        <Route path="flagged" element={<Flagged />} />
        <Route path="projects" element={<Projects />} />
        <Route path="tags" element={<Tags />} />
        <Route path="review" element={<Review />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="tasks" element={<TaskList />} />
        <Route path="tasks/:id" element={<TaskDetail />} />
      </Routes>
    </VSCodeLayout>
  )
}

export default App
