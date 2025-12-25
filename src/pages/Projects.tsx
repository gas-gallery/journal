import './Projects.css'

export const pageTitle = 'Projects'

function Projects() {
  return (
    <div className="projects">
      <div className="projects-header">
        <h2>Projects</h2>
      </div>
      <div className="projects-content">
        <p className="empty-message">No projects</p>
      </div>
    </div>
  )
}

export default Projects
