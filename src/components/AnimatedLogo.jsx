import { motion } from 'framer-motion'
import Icon from './Icon'
import styles from './AnimatedLogo.module.css'

export default function AnimatedLogo({ size = 'md' }) {
  return (
    <motion.a
      href="#home"
      className={`${styles.logo} ${styles[size]}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      whileHover={{ scale: 1.05 }}
    >
      <span className={styles.iconWrap} aria-hidden="true">
        <Icon name="bx bx-code-alt" className={styles.logoIcon} />
      </span>
      <span className={styles.bracket}>&lt;</span>
      <span className={styles.name}>Klose</span>
      <span className={styles.slash}> /</span>
      <span className={styles.bracket}>&gt;</span>
      <span className={styles.cursor}>_</span>
    </motion.a>
  )
}
