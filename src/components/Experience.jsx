import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Icon from './Icon'
import { useLanguage } from '../context/LanguageContext'
import styles from './Experience.module.css'

export default function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { t } = useLanguage()

  const experienceItems = t('experience.items')

  return (
    <section className={styles.experience} id="experience" ref={ref}>
      <motion.h2
        className="heading"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        {t('experience.heading')} <span>{t('experience.accent')}</span>
      </motion.h2>

      <div className={styles.timeline}>
        {experienceItems.map((item, index) => (
          <motion.div
            key={index}
            className={styles.item}
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.12, ease: 'easeOut' }}
          >
            <div className={styles.marker} aria-hidden="true">
              <span className={styles.markerDot} />
              <span className={styles.markerLine} />
            </div>
            <div className={styles.content}>
              <div className={styles.header}>
                <div className={styles.roleCompany}>
                  <h3 className={styles.role}>{item.role}</h3>
                  <span className={styles.company}>{item.company}</span>
                </div>
                <time className={styles.period}>{item.period}</time>
              </div>
              <p className={styles.description}>{item.description}</p>
              <div className={styles.technologies}>
                {item.technologies.map((tech, i) => (
                  <span key={i} className={styles.techTag}>{tech}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}