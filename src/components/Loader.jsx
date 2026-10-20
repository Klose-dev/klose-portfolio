import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import styles from './Loader.module.css'

export default function Loader() {
  const { t } = useLanguage()

  return (
    <motion.div
      className={styles.overlay}
      role="status"
      aria-live="polite"
      aria-label={t('common.loadingPortfolio')}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <div className={styles.card}>
        <div className={styles.rings} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className={styles.copy}>
          <span className={styles.label}>{t('common.loading')}</span>
          <span className={styles.title}>Klose Portfolio</span>
        </div>
      </div>
    </motion.div>
  )
}
