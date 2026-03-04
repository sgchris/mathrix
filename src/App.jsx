import { useContext } from 'react'
import AppProvider from './context/AppContext'
import { AppContext } from './context/useApp'
import TopicSidebar from './components/TopicSidebar/TopicSidebar'
import ExerciseHistorySidebar from './components/ExerciseHistorySidebar/ExerciseHistorySidebar'
import ExerciseArea from './components/ExerciseArea/ExerciseArea'
import './App.css'

function AppLayout() {
  const { appState } = useContext(AppContext)
  const hasActiveTopic = !!appState.activeTopic

  return (
    <div className={`app-layout${hasActiveTopic ? ' has-history' : ''}`}>
      <TopicSidebar />
      {hasActiveTopic && <ExerciseHistorySidebar />}
      <main className="main-area">
        <ExerciseArea />
      </main>
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppLayout />
    </AppProvider>
  )
}
