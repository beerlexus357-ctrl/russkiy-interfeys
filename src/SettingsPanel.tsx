import { motion } from 'framer-motion'

type Props = {
  name: string
  quietHours: boolean
  onNameChange: (value: string) => void
  onQuietHoursChange: (value: boolean) => void
}

export function SettingsPanel({ name, quietHours, onNameChange, onQuietHoursChange }: Props) {
  return (
    <motion.main
      key="settings"
      className="panel settings"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="panel-head">
        <div>
          <h2>Настройки</h2>
          <p>Профиль и спокойный режим уведомлений.</p>
        </div>
      </div>

      <label className="field">
        <span>Имя</span>
        <input
          value={name}
          onChange={(event) => onNameChange(event.target.value)}
          placeholder="Как к вам обращаться"
        />
      </label>

      <label className="toggle">
        <input
          type="checkbox"
          checked={quietHours}
          onChange={(event) => onQuietHoursChange(event.target.checked)}
        />
        <span className="toggle-ui" aria-hidden />
        <span className="toggle-copy">
          <strong>Тихие часы</strong>
          <small>Скрывать второстепенные напоминания до вечера</small>
        </span>
      </label>

      <p className="hint">
        Язык интерфейса: русский. Все подписи, кнопки и подсказки уже настроены.
      </p>
    </motion.main>
  )
}
