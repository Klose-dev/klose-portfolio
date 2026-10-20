import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import gsap from 'gsap'
import Icon from './Icon'
import { useLanguage } from '../context/LanguageContext'
import styles from './WhatsappFloatingButton.module.css'

export default function WhatsappFloatingButton() {
  const btnRef = useRef(null)
  const wrapperRef = useRef(null)
  const inView = useInView(wrapperRef, { once: true, margin: '-200px' })
  const { t } = useLanguage()

  useEffect(() => {
    const btn = btnRef.current
    if (!btn) return

    const onMove = (e) => {
      const { left, top, width, height } = btn.getBoundingClientRect()
      const x = e.clientX - (left + width / 2)
      const y = e.clientY - (top + height / 2)
      gsap.to(btn, { x: x * 0.35, y: y * 0.35, duration: 0.7, ease: 'power3.out' })
    }

    const onLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.3)' })
    }

    btn.addEventListener('mousemove', onMove)
    btn.addEventListener('mouseleave', onLeave)
    return () => {
      btn.removeEventListener('mousemove', onMove)
      btn.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <motion.div
      ref={wrapperRef}
      initial={{ opacity: 0, y: 40, scale: 0.8 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
    >
      <motion.a
        ref={btnRef}
        href="#contact"
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
