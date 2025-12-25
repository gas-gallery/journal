import { useState, useEffect, KeyboardEvent } from 'react'
import { API, InboxTask } from '../utils/api'
import './Inbox.css'

export const pageTitle = 'Inbox'

function Inbox() {
  const [tasks, setTasks] = useState<InboxTask[]>([])
  const [newTaskName, setNewTaskName] = useState('')
  const [loading, setLoading] = useState(true)
  const [menuTaskId, setMenuTaskId] = useState<string | null>(null)

  useEffect(() => {
    loadTasks()
  }, [])

  const loadTasks = async () => {
    try {
      setLoading(true)
      const response = await API.getInboxTasks()
      if (response.success && response.data) {
        setTasks(response.data)
      }
    } catch (error) {
      console.error('Failed to load tasks:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTaskName.trim()) {
      try {
        const response = await API.createInboxTask(newTaskName.trim())
        if (response.success && response.data) {
          setTasks([response.data, ...tasks])
          setNewTaskName('')
        }
      } catch (error) {
        console.error('Failed to create task:', error)
      }
    }
  }

  const handleToggleDone = async (id: string, done: boolean) => {
    try {
      const response = await API.updateInboxTask(id, !done)
      if (response.success) {
        setTasks(tasks.filter(task => task.id !== id))
      }
    } catch (error) {
      console.error('Failed to update task:', error)
    }
  }

  const handleDeleteTask = async (id: string) => {
    try {
      const response = await API.deleteInboxTask(id)
      if (response.success) {
        setTasks(tasks.filter(task => task.id !== id))
        setMenuTaskId(null)
      }
    } catch (error) {
      console.error('Failed to delete task:', error)
    }
  }

  const handleSetSomeday = async (id: string) => {
    try {
      const response = await API.setSomedayInboxTask(id)
      if (response.success) {
        setTasks(tasks.filter(task => task.id !== id))
        setMenuTaskId(null)
      }
    } catch (error) {
      console.error('Failed to set someday:', error)
    }
  }

  return (
    <div className="inbox">
      <div className="inbox-header">
        <h2>Inbox</h2>
      </div>
      
      <div className="inbox-input-container">
        <input
          type="text"
          className="inbox-input"
          placeholder="New task name..."
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>

      <div className="inbox-list">
        {loading ? (
          <p className="empty-message">Loading...</p>
        ) : tasks.length === 0 ? (
          <p className="empty-message">No tasks in inbox</p>
        ) : (
          <ul className="task-list">
            {tasks.map((task) => (
              <li key={task.id} className="task-item">
                <label className="task-checkbox-label">
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => handleToggleDone(task.id, task.done)}
                  />
                  <span className="task-name">{task.name}</span>
                </label>
                <div className="task-actions">
                  <button
                    className="task-menu-button"
                    onClick={() => setMenuTaskId(menuTaskId === task.id ? null : task.id)}
                  >
                    •••
                  </button>
                  {menuTaskId === task.id && (
                    <div className="task-menu">
                      <button
                        className="task-menu-item"
                        onClick={() => handleSetSomeday(task.id)}
                      >
                        Someday
                      </button>
                      <button
                        className="task-menu-item"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Inbox
