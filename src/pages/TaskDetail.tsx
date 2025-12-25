import { useParams, useNavigate } from 'react-router-dom'
import './TaskDetail.css'

function TaskDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  return (
    <div className="task-detail">
      <div className="task-detail-header">
        <h2>Task Details</h2>
        <button 
          className="btn btn-secondary"
          onClick={() => navigate('/tasks')}
        >
          Back
        </button>
      </div>

      <div className="card">
        <div className="detail-section">
          <h3>Title</h3>
          <p>Task {id}</p>
        </div>
        <div className="detail-section">
          <h3>Description</h3>
          <p>Task details will be displayed here.</p>
        </div>
        <div className="detail-section">
          <h3>Status</h3>
          <span className="status-badge status-todo">To Do</span>
        </div>
        <div className="detail-section">
          <h3>Due Date</h3>
          <p>2025-12-31</p>
        </div>
        <div className="detail-actions">
          <button className="btn btn-primary">Edit</button>
          <button className="btn btn-secondary">Delete</button>
        </div>
      </div>
    </div>
  )
}

export default TaskDetail
