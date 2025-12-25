import { useState, ReactNode, useEffect, KeyboardEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { API, InboxTask } from '../utils/api'
import './VSCodeLayout.css'

interface VSCodeLayoutProps {
  children: ReactNode
}

function VSCodeLayout({ children }: VSCodeLayoutProps) {
  const navigate = useNavigate()
  const [activeView, setActiveView] = useState<'inbox' | 'forecast' | 'flagged' | 'projects' | 'tags' | 'review'>('inbox')
  const [sidebarVisible, setSidebarVisible] = useState(false)
  const [secondarySidebarView, setSecondarySidebarView] = useState<'find' | null>(null)
  const [inboxTasks, setInboxTasks] = useState<InboxTask[]>([])
  const [newTaskName, setNewTaskName] = useState('')
  const [menuTaskId, setMenuTaskId] = useState<string | null>(null)

  useEffect(() => {
    if (activeView === 'inbox') {
      loadInboxTasks()
    }
  }, [activeView])

  const loadInboxTasks = async () => {
    try {
      const response = await API.getInboxTasks()
      if (response.success && response.data) {
        setInboxTasks(response.data)
      }
    } catch (error) {
      console.error('Failed to load inbox tasks:', error)
    }
  }

  const handleKeyPress = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTaskName.trim()) {
      try {
        const response = await API.createInboxTask(newTaskName.trim())
        if (response.success && response.data) {
          setInboxTasks([response.data, ...inboxTasks])
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
        setInboxTasks(inboxTasks.filter(task => task.id !== id))
      }
    } catch (error) {
      console.error('Failed to update task:', error)
    }
  }

  const handleDeleteTask = async (id: string) => {
    try {
      const response = await API.deleteInboxTask(id)
      if (response.success) {
        setInboxTasks(inboxTasks.filter(task => task.id !== id))
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
        setInboxTasks(inboxTasks.filter(task => task.id !== id))
        setMenuTaskId(null)
      }
    } catch (error) {
      console.error('Failed to set someday:', error)
    }
  }

  const handleViewChange = (view: typeof activeView, path: string) => {
    setActiveView(view)
    navigate(path)
  }

  const handleSecondarySidebarClick = (view: 'find') => {
    if (secondarySidebarView === view) {
      setSecondarySidebarView(null)
      setSidebarVisible(false)
    } else {
      setSecondarySidebarView(view)
      setSidebarVisible(true)
    }
  }

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
              className={`activity-item ${activeView === 'inbox' ? 'active' : ''}`}
              onClick={() => handleViewChange('inbox', '/inbox')}
              title="Inbox"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3H4.99c-1.11 0-1.98.89-1.98 2L3 19c0 1.11.88 2 1.99 2H19c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm0 12h-4c0 1.66-1.35 3-3 3s-3-1.34-3-3H4.99V5H19v10z"/>
              </svg>
            </button>
            <button 
              className={`activity-item ${activeView === 'forecast' ? 'active' : ''}`}
              onClick={() => handleViewChange('forecast', '/forecast')}
              title="Forecast"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"/>
              </svg>
            </button>
            <button 
              className={`activity-item ${activeView === 'flagged' ? 'active' : ''}`}
              onClick={() => handleViewChange('flagged', '/flagged')}
              title="Flagged"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"/>
              </svg>
            </button>
            <button 
              className={`activity-item ${activeView === 'projects' ? 'active' : ''}`}
              onClick={() => handleViewChange('projects', '/projects')}
              title="Projects"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
              </svg>
            </button>
            <button 
              className={`activity-item ${activeView === 'tags' ? 'active' : ''}`}
              onClick={() => handleViewChange('tags', '/tags')}
              title="Tags"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/>
              </svg>
            </button>
            <button 
              className={`activity-item ${activeView === 'review' ? 'active' : ''}`}
              onClick={() => handleViewChange('review', '/review')}
              title="Review"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
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

        {/* Sidebar - between editor-container and secondary-sidebar */}
        {sidebarVisible && (
          <div className="sidebar">
            <div className="sidebar-header">
              <span className="sidebar-title">
                {secondarySidebarView === 'find' && 'FIND'}
              </span>
              <button 
                className="sidebar-close"
                onClick={() => setSidebarVisible(false)}
              >
                ✕
              </button>
            </div>
            <div className="sidebar-content">
              {secondarySidebarView === 'find' && (
                <div className="search-view">
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search..."
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Secondary Sidebar */}
        <div className="secondary-sidebar">
          <div className="secondary-sidebar-items">
            <button 
              className={`secondary-sidebar-item ${secondarySidebarView === 'find' ? 'active' : ''}`}
              onClick={() => handleSecondarySidebarClick('find')}
              title="Find"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            </button>
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
