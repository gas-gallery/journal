import { Outlet, Link } from 'react-router-dom'
import './Layout.css'

function Layout() {
  return (
    <div className="layout">
      <header className="header">
        <div className="container">
          <nav className="nav">
            <h1 className="logo">Task Management</h1>
            <ul className="nav-menu">
              <li><Link to="/" className="nav-link">Dashboard</Link></li>
              <li><Link to="/tasks" className="nav-link">Tasks</Link></li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="main">
        <div className="container">
          <Outlet />
        </div>
      </main>
      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 Task Management</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout
