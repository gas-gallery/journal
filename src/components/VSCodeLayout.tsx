import { useState, ReactNode } from 'react'
import './VSCodeLayout.css'

interface VSCodeLayoutProps {
  children: ReactNode
}

function VSCodeLayout({ children }: VSCodeLayoutProps) {
  const [activeView, setActiveView] = useState<'explorer' | 'search' | 'tasks'>('explorer')
  const [sidebarVisible, setSidebarVisible] = useState(true)

  return (
    <div className="vscode-layout">
      {/* Title Bar */}
      <div className="title-bar">
        <div className="title-bar-left">
          <span className="app-icon">📋</span>
          <span className="app-name">Task Management</span>
        </div>
        <div className="title-bar-center">
          <span className="current-file">Dashboard</span>
        </div>
        <div className="title-bar-right">
          <button className="title-btn">−</button>
          <button className="title-btn">□</button>
          <button className="title-btn">✕</button>
        </div>
      </div>

      <div className="main-container">
        {/* Activity Bar */}
        <div className="activity-bar">
          <div className="activity-items">
            <button 
              className={`activity-item ${activeView === 'explorer' ? 'active' : ''}`}
              onClick={() => {
                setActiveView('explorer')
                setSidebarVisible(true)
              }}
              title="Explorer"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.5 3h6.5l2 2h8.5c.83 0 1.5.67 1.5 1.5v11c0 .83-.67 1.5-1.5 1.5h-17c-.83 0-1.5-.67-1.5-1.5v-13c0-.83.67-1.5 1.5-1.5z"/>
              </svg>
            </button>
            <button 
              className={`activity-item ${activeView === 'search' ? 'active' : ''}`}
              onClick={() => {
                setActiveView('search')
                setSidebarVisible(true)
              }}
              title="Search"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.5 14h-.79l-.28-.27c.98-1.14 1.57-2.62 1.57-4.23 0-3.59-2.91-6.5-6.5-6.5s-6.5 2.91-6.5 6.5 2.91 6.5 6.5 6.5c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99 1.49-1.49-4.99-5zm-6 0c-2.49 0-4.5-2.01-4.5-4.5s2.01-4.5 4.5-4.5 4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5z"/>
              </svg>
            </button>
            <button 
              className={`activity-item ${activeView === 'tasks' ? 'active' : ''}`}
              onClick={() => {
                setActiveView('tasks')
                setSidebarVisible(true)
              }}
              title="Tasks"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3h-4.18c-.42-1.16-1.52-2-2.82-2-1.3 0-2.4.84-2.82 2h-4.18c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-14c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 14l-4-4 1.41-1.41 2.59 2.58 6.59-6.59 1.41 1.42-8 8z"/>
              </svg>
            </button>
          </div>
          <div className="activity-items-bottom">
            <button className="activity-item" title="Settings">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22l-1.92 3.32c-.12.21-.07.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zm-7.14 2.06c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Sidebar */}
        {sidebarVisible && (
          <div className="sidebar">
            <div className="sidebar-header">
              <span className="sidebar-title">
                {activeView === 'explorer' && 'EXPLORER'}
                {activeView === 'search' && 'SEARCH'}
                {activeView === 'tasks' && 'TASKS'}
              </span>
              <button 
                className="sidebar-close"
                onClick={() => setSidebarVisible(false)}
              >
                ✕
              </button>
            </div>
            <div className="sidebar-content">
              {activeView === 'explorer' && (
                <div className="tree-view">
                  <div className="tree-item expanded">
                    <span className="tree-icon">▼</span>
                    <span className="tree-label">TASK MANAGEMENT</span>
                  </div>
                  <div className="tree-item-child">
                    <div className="tree-item">
                      <span className="tree-icon">📄</span>
                      <span className="tree-label">Dashboard</span>
                    </div>
                    <div className="tree-item">
                      <span className="tree-icon">📄</span>
                      <span className="tree-label">Tasks</span>
                    </div>
                  </div>
                </div>
              )}
              {activeView === 'search' && (
                <div className="search-view">
                  <input 
                    type="text" 
                    className="search-input" 
                    placeholder="Search tasks..."
                  />
                </div>
              )}
              {activeView === 'tasks' && (
                <div className="tasks-view">
                  <p className="empty-state">No tasks running</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Editor Area */}
        <div className="editor-container">
          <div className="editor-tabs">
            <div className="editor-tab active">
              <span className="tab-icon">📊</span>
              <span className="tab-label">Dashboard</span>
              <button className="tab-close">✕</button>
            </div>
          </div>
          <div className="editor-content">
            {children}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="status-bar">
        <div className="status-left">
          <span className="status-item">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            main
          </span>
          <span className="status-item">✓ 0 ✗ 0</span>
        </div>
        <div className="status-right">
          <span className="status-item">Ln 1, Col 1</span>
          <span className="status-item">UTF-8</span>
          <span className="status-item">TypeScript React</span>
        </div>
      </div>
    </div>
  )
}

export default VSCodeLayout
