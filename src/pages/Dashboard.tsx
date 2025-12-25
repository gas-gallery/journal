import { Link } from 'react-router-dom'
import './Dashboard.css'

export const pageTitle = 'Dashboard'

function Dashboard() {
  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="dashboard-grid">
        <div className="card stat-card">
          <h3>All Tasks</h3>
          <p className="stat-number">0</p>
        </div>
        <div className="card stat-card">
          <h3>In Progress</h3>
          <p className="stat-number">0</p>
        </div>
        <div className="card stat-card">
          <h3>Completed</h3>
          <p className="stat-number">0</p>
        </div>
        <div className="card stat-card">
          <h3>Overdue</h3>
          <p className="stat-number">0</p>
        </div>
      </div>
      <div className="card">
        <h3>Recent Tasks</h3>
        <p className="empty-message">No tasks available</p>
        <Link to="/tasks" className="btn btn-primary">View Tasks</Link>
      </div>
    </div>
  )
}

export default Dashboard
