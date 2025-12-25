import { useState, useEffect } from 'react'
import { API, Project, ProjectTask } from '../utils/api'
import { useAppContext } from '../contexts/AppContext'
import './Projects.css'

export const pageTitle = 'Projects'

function Projects() {
  const { showDescription } = useAppContext()
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [showInput, setShowInput] = useState(false)
  const [newProjectName, setNewProjectName] = useState('')
  const [projectTasks, setProjectTasks] = useState<ProjectTask[]>([])
  const [tasksLoading, setTasksLoading] = useState(true)
  const [editingItem, setEditingItem] = useState<{ type: 'project' | 'milestone' | 'task' | 'description', id: string, value: string } | null>(null)

  useEffect(() => {
    loadProjects()
    loadProjectTasks()
  }, [])

  const loadProjects = async () => {
    try {
      setLoading(true)
      const response = await API.getProjects()
      if (response.success && response.data) {
        setProjects(response.data)
        if (response.data.length > 0 && !selectedProjectId) {
          setSelectedProjectId(response.data[0].id)
        }
      }
    } catch (error) {
      console.error('Failed to load projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadProjectTasks = async () => {
    try {
      setTasksLoading(true)
      const response = await API.getProjectTasks()
      if (response.success && response.data) {
        setProjectTasks(response.data)
      }
    } catch (error) {
      console.error('Failed to load project tasks:', error)
    } finally {
      setTasksLoading(false)
    }
  }

  const handleCreateProject = async () => {
    if (newProjectName.trim().length > 0) {
      try {
        const response = await API.createProject(newProjectName.trim())
        if (response.success && response.data) {
          setProjects([response.data, ...projects])
          setSelectedProjectId(response.data.id)
          setNewProjectName('')
          setShowInput(false)
        }
      } catch (error) {
        console.error('Failed to create project:', error)
      }
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCreateProject()
    } else if (e.key === 'Escape') {
      setShowInput(false)
      setNewProjectName('')
    }
  }

  const handleEditClick = (type: 'project' | 'milestone' | 'task' | 'description', id: string, currentValue: string) => {
    setEditingItem({ type, id, value: currentValue })
  }

  const handleEditChange = (value: string) => {
    if (editingItem) {
      setEditingItem({ ...editingItem, value })
    }
  }

  const handleEditSave = async () => {
    if (!editingItem) return

    try {
      let response
      switch (editingItem.type) {
        case 'project':
          response = await API.updateProjectName(editingItem.id, editingItem.value)
          break
        case 'milestone':
          response = await API.updateMilestoneName(editingItem.id, editingItem.value)
          break
        case 'task':
          response = await API.updateTaskName(editingItem.id, editingItem.value)
          break
        case 'description':
          response = await API.updateTaskDescription(editingItem.id, editingItem.value)
          break
      }

      if (response?.success) {
        // Update local state
        setProjectTasks(prevTasks =>
          prevTasks.map(task => {
            if (editingItem.type === 'project' && task.project_id === editingItem.id) {
              return { ...task, project_name: editingItem.value }
            } else if (editingItem.type === 'milestone' && task.milestone_id === editingItem.id) {
              return { ...task, milestone_name: editingItem.value }
            } else if (editingItem.type === 'task' && task.task_id === editingItem.id) {
              return { ...task, task_name: editingItem.value }
            } else if (editingItem.type === 'description' && task.task_id === editingItem.id) {
              return { ...task, description: editingItem.value }
            }
            return task
          })
        )
      }
    } catch (error) {
      console.error('Failed to update:', error)
    } finally {
      setEditingItem(null)
    }
  }

  const handleEditKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleEditSave()
    } else if (e.key === 'Escape') {
      setEditingItem(null)
    }
  }

  const handleToggleTaskDone = async (taskId: string, currentDone: boolean) => {
    try {
      const response = await API.updateTaskDone(taskId, !currentDone)
      if (response.success) {
        setProjectTasks(prevTasks =>
          prevTasks.map(task =>
            task.task_id === taskId ? { ...task, done: !currentDone } : task
          )
        )
      }
    } catch (error) {
      console.error('Failed to update task done status:', error)
    }
  }

  return (
    <div className="projects">
      <div className="projects-navigation">
        <div className="projects-nav-header">
          <h3>Projects</h3>
          <button 
            className="add-project-btn"
            onClick={() => setShowInput(!showInput)}
            title="Add Project"
          >
            +
          </button>
        </div>
        {showInput && (
          <div className="projects-input-container">
            <input
              type="text"
              className="project-input"
              placeholder="New project name..."
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              onKeyDown={handleKeyPress}
              onBlur={handleCreateProject}
              autoFocus
            />
          </div>
        )}
        <div className="projects-nav-list">
          {loading ? (
            <p className="nav-loading">Loading...</p>
          ) : projects.length === 0 ? (
            <p className="nav-empty">No projects</p>
          ) : (
            <ul>
              {projects.map((project) => (
                <li
                  key={project.id}
                  className={selectedProjectId === project.id ? 'active' : ''}
                  onClick={() => setSelectedProjectId(project.id)}
                >
                  {project.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="projects-content" id="projects-content">
        {tasksLoading ? (
          <p className="empty-message">Loading tasks...</p>
        ) : projectTasks.length === 0 ? (
          <p className="empty-message">No tasks found</p>
        ) : (
          <div className="tasks-list">
            {(() => {
              let currentProject = ''
              let currentProjectId = ''
              let currentMilestone = ''
              let currentMilestoneId = ''
              return projectTasks.map((task, index) => (
                <div key={index}>
                  {task.project_name !== currentProject && (() => {
                    currentProject = task.project_name
                    currentProjectId = task.project_id
                    currentMilestone = ''
                    currentMilestoneId = ''
                    return editingItem?.type === 'project' && editingItem.id === task.project_id ? (
                      <input
                        className="edit-input project-edit"
                        value={editingItem.value}
                        onChange={(e) => handleEditChange(e.target.value)}
                        onBlur={handleEditSave}
                        onKeyDown={handleEditKeyDown}
                        autoFocus
                      />
                    ) : (
                      <h1 
                        className="project-heading editable"
                        onClick={() => handleEditClick('project', task.project_id, task.project_name)}
                      >
                        {task.project_name}
                      </h1>
                    )
                  })()}
                  {task.milestone_name && task.milestone_name !== currentMilestone && (() => {
                    currentMilestone = task.milestone_name
                    currentMilestoneId = task.milestone_id || ''
                    return editingItem?.type === 'milestone' && editingItem.id === task.milestone_id ? (
                      <input
                        className="edit-input milestone-edit"
                        value={editingItem.value}
                        onChange={(e) => handleEditChange(e.target.value)}
                        onBlur={handleEditSave}
                        onKeyDown={handleEditKeyDown}
                        autoFocus
                      />
                    ) : (
                      <h2 
                        className="milestone-heading editable"
                        onClick={() => handleEditClick('milestone', task.milestone_id || '', task.milestone_name || '')}
                      >
                        {task.milestone_name}
                      </h2>
                    )
                  })()}
                  <div className={`task-item ${task.done ? 'done' : ''}`}>
                    <input
                      type="checkbox"
                      className="task-checkbox"
                      checked={task.done}
                      onChange={() => handleToggleTaskDone(task.task_id, task.done)}
                    />
                    <div className="task-content">
                      {editingItem?.type === 'task' && editingItem.id === task.task_id ? (
                      <input
                        className="edit-input task-edit"
                        value={editingItem.value}
                        onChange={(e) => handleEditChange(e.target.value)}
                        onBlur={handleEditSave}
                        onKeyDown={handleEditKeyDown}
                        autoFocus
                      />
                    ) : (
                      <h3 
                        className="task-heading editable"
                        onClick={() => handleEditClick('task', task.task_id, task.task_name)}
                      >
                        {task.task_name}
                      </h3>
                    )}
                    {showDescription && task.description && (
                      editingItem?.type === 'description' && editingItem.id === task.task_id ? (
                        <textarea
                          className="edit-textarea"
                          value={editingItem.value}
                          onChange={(e) => handleEditChange(e.target.value)}
                          onBlur={handleEditSave}
                          onKeyDown={handleEditKeyDown}
                          autoFocus
                        />
                      ) : (
                        <p 
                          className="task-description editable"
                          onClick={() => handleEditClick('description', task.task_id, task.description || '')}
                        >
                          {task.description}
                        </p>
                      )
                    )}
                    </div>
                  </div>
                </div>
              ))
            })()}
          </div>
        )}
      </div>
    </div>
  )
}

export default Projects
