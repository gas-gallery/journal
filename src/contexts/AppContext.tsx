import { createContext, useContext, useState, ReactNode } from 'react'

interface AppContextType {
  showDescription: boolean
  setShowDescription: (show: boolean) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [showDescription, setShowDescription] = useState(true)

  return (
    <AppContext.Provider value={{ showDescription, setShowDescription }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}
