import { useState, useEffect } from 'react'
import { API, Project } from '../utils/api'
import './Projects.css'

export const pageTitle = 'Projects'

function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [showInput, setShowInput] = useState(false)
  const [newProjectName, setNewProjectName] = useState('')

  useEffect(() => {
    loadProjects()
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
      <div className="projects-content">
        {selectedProjectId ? (
          <div className="project-detail">
            <h2>{projects.find(p => p.id === selectedProjectId)?.name}</h2>
            <p className="empty-message">Project details will be displayed here</p>
          </div>
        ) : (
          <p className="empty-message">Select a project</p>
        )}
      </div>
    </div>
  )
}

export default Projects
