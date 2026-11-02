import { AnimatePresence, motion } from 'framer-motion'
import type { FormEvent } from 'react'
import type { Task } from './types'

type Props = {
  name: string
  tasks: Task[]
  draft: string
  onDraftChange: (value: string) => void
  onAddTask: (event: FormEvent) => void
  onToggleTask: (id: string) => void
  onRemoveTask: (id: string) => void
}

export function Workspace({
  name,
  tasks,
  draft,
  onDraftChange,
  onAddTask,
  onToggleTask,
  onRemoveTask,
}: Props) {
  const openCount = tasks.filter((task) => !task.done).length

  return (
    <motion.main
      key="workspace"
      className="panel workspace"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="panel-head">
        <div>
          <h2>Рабочее место</h2>
          <p>
            Здравствуйте, {name}. Сейчас открыто задач: {openCount}.
          </p>
        </div>
      </div>

      <form className="task-form" onSubmit={onAddTask}>
        <label className="sr-only" htmlFor="task">
          Новая задача
        </label>
        <input
          id="task"
          value={draft}
          onChange={(event) => onDraftChange(event.target.value)}
          placeholder="Что нужно сделать?"
          autoComplete="off"
        />
        <button type="submit" className="btn primary">
          Добавить
        </button>
      </form>

      <ul className="task-list">
        <AnimatePresence initial={false}>
          {tasks.map((task) => (
            <motion.li
              key={task.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -12 }}
              className={task.done ? 'task done' : 'task'}
            >
              <button
                type="button"
                className="check"
                aria-pressed={task.done}
                aria-label={task.done ? 'Отметить как невыполненную' : 'Отметить как выполненную'}
                onClick={() => onToggleTask(task.id)}
              />
              <span>{task.title}</span>
              <button
                type="button"
                className="remove"
                aria-label="Удалить задачу"
                onClick={() => onRemoveTask(task.id)}
              >
                Удалить
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </motion.main>
  )
}
