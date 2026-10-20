import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import Icon from './Icon'
import { useLanguage } from '../context/LanguageContext'
import styles from './WhatsappFloatingButton.module.css'

const PHONE_NUMBER = '237671313884'

export default function WhatsappFloatingButton() {
  const wrapperRef = useRef(null)
  const inView = useInView(wrapperRef, { once: true, margin: '-200px' })
  const { t } = useLanguage()

  const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(t('whatsapp.message'))}`

  return (
    <motion.div
      ref={wrapperRef}
      initial={{ opacity: 0, y: 40, scale: 0.8 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
    >
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.button}
        aria-label={t('whatsapp.aria')}
        title={t('whatsapp.title')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className={styles.pulse} aria-hidden="true" />
        <Icon name="fab fa-whatsapp" className={styles.icon} />
        <span className={styles.label}>{t('whatsapp.label')}</span>
      </motion.a>
    </motion.div>
  )
}
