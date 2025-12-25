import { useState } from 'react'
import { Link } from 'react-router-dom'
import './TaskList.css'

interface Task {
  id: string
  title: string
  description: string
  status: 'todo' | 'in-progress' | 'done'
  dueDate: string
}

function TaskList() {
  const [tasks] = useState<Task[]>([])
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="task-list">
      <div className="task-list-header">
        <h2>Tasks</h2>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'New Task'}
        </button>
      </div>

      {showForm && (
        <div className="card">
          <h3>Create New Task</h3>
          <form className="task-form">
            <div className="form-group">
              <label className="form-label">Title</label>
              <input type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea className="form-control" rows={3}></textarea>
            </div>
            <div className="form-group">
              <label className="form-label">Due Date</label>
              <input type="date" className="form-control" />
            </div>
            <div className="form-group">
              <label className="form-label">Status</label>
              <select className="form-control">
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Create</button>
          </form>
        </div>
      )}

      <div className="tasks-container">
        {tasks.length === 0 ? (
          <div className="card">
            <p className="empty-message">No tasks available</p>
          </div>
        ) : (
          tasks.map(task => (
            <div key={task.id} className="card task-card">
              <div className="task-header">
                <h3>{task.title}</h3>
                <span className={`status-badge status-${task.status}`}>
                  {task.status === 'todo' && 'To Do'}
                  {task.status === 'in-progress' && 'In Progress'}
                  {task.status === 'done' && 'Done'}
                </span>
              </div>
              <p className="task-description">{task.description}</p>
              <div className="task-footer">
                <span className="task-due-date">Due: {task.dueDate}</span>
                <Link to={`/tasks/${task.id}`} className="btn btn-secondary">Details</Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default TaskList
