import { Routes, Route } from 'react-router-dom'
import VSCodeLayout from './components/VSCodeLayout'
import Dashboard from './pages/Dashboard'
import TaskList from './pages/TaskList'
import TaskDetail from './pages/TaskDetail'
import './App.css'

function App() {
  return (
    <VSCodeLayout>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="tasks" element={<TaskList />} />
        <Route path="tasks/:id" element={<TaskDetail />} />
      </Routes>
    </VSCodeLayout>
  )
}

export default App
