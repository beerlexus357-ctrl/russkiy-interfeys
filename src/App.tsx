import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'
import { INITIAL_TASKS } from './data'
import { Hero } from './Hero'
import { SettingsPanel } from './SettingsPanel'
import type { Task, View } from './types'
import { Workspace } from './Workspace'

function App() {
  const [view, setView] = useState<View>('home')
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS)
  const [draft, setDraft] = useState('')
  const [name, setName] = useState('Алексей')
  const [quietHours, setQuietHours] = useState(true)

  function addTask(event: FormEvent) {
    event.preventDefault()
    const title = draft.trim()
    if (!title) return
    setTasks((prev) => [{ id: crypto.randomUUID(), title, done: false }, ...prev])
    setDraft('')
  }

  function toggleTask(id: string) {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, done: !task.done } : task)),
    )
  }

  function removeTask(id: string) {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  return (
    <div className="app">
      <header className="topbar">
        <button className="brand" type="button" onClick={() => setView('home')}>
          <span className="brand-mark" aria-hidden />
          Север
        </button>
        <nav className="nav" aria-label="Основная навигация">
          <button
            type="button"
            className={view === 'home' ? 'nav-link active' : 'nav-link'}
            onClick={() => setView('home')}
          >
            Главная
          </button>
          <button
            type="button"
            className={view === 'workspace' ? 'nav-link active' : 'nav-link'}
            onClick={() => setView('workspace')}
          >
            Рабочее место
          </button>
          <button
            type="button"
            className={view === 'settings' ? 'nav-link active' : 'nav-link'}
            onClick={() => setView('settings')}
          >
            Настройки
          </button>
        </nav>
      </header>

      <AnimatePresence mode="wait">
        {view === 'home' && <Hero onNavigate={setView} />}
        {view === 'workspace' && (
          <Workspace
            name={name}
            tasks={tasks}
            draft={draft}
            onDraftChange={setDraft}
            onAddTask={addTask}
            onToggleTask={toggleTask}
            onRemoveTask={removeTask}
          />
        )}
        {view === 'settings' && (
          <SettingsPanel
            name={name}
            quietHours={quietHours}
            onNameChange={setName}
            onQuietHoursChange={setQuietHours}
          />
        )}
      </AnimatePresence>

      <footer className="footer">
        <span>Север · интерфейс на русском</span>
      </footer>
    </div>
  )
}

export default App
