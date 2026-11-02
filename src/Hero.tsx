import { motion } from 'framer-motion'
import type { View } from './types'

type Props = {
  onNavigate: (view: View) => void
}

export function Hero({ onNavigate }: Props) {
  return (
    <motion.main
      key="home"
      className="hero"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="hero-copy">
        <p className="brand-hero">Север</p>
        <h1>Тихое пространство для ясной работы</h1>
        <p className="lede">
          Собирайте задачи, держите фокус и возвращайтесь к главному без лишнего шума.
        </p>
        <div className="cta-row">
          <button type="button" className="btn primary" onClick={() => onNavigate('workspace')}>
            Открыть рабочее место
          </button>
          <button type="button" className="btn ghost" onClick={() => onNavigate('settings')}>
            Настроить профиль
          </button>
        </div>
      </div>

      <motion.div
        className="hero-visual"
        aria-hidden
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="aurora" />
        <div className="horizon" />
        <div className="ridge ridge-a" />
        <div className="ridge ridge-b" />
        <div className="star star-a" />
        <div className="star star-b" />
        <div className="star star-c" />
      </motion.div>
    </motion.main>
  )
}
