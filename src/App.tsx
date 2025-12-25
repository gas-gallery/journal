import { Routes, Route } from 'react-router-dom'
import VSCodeLayout from './components/VSCodeLayout'
import Inbox from './pages/Inbox'
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
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="tasks" element={<TaskList />} />
        <Route path="tasks/:id" element={<TaskDetail />} />
      </Routes>
    </VSCodeLayout>
  )
}

export default App
