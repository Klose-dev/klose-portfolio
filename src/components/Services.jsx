import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Icon from './Icon'
import { useLanguage } from '../context/LanguageContext'
import styles from './Services.module.css'

const services = [
  {
    icon: 'bx bx-code-alt',
    titleKey: 'webTitle',
    descKey: 'webDesc',
    tags: ['React', 'PHP', 'Laravel', 'MySQL', 'Python'],
  },
  {
    icon: 'bx bx-wrench',
    titleKey: 'maintenanceTitle',
    descKey: 'maintenanceDesc',
    tags: ['Performance', 'Security', 'Updates', 'React Native'],
  },
  {
    icon: 'bx bx-palette',
    titleKey: 'designTitle',
    descKey: 'designDesc',
    tags: ['UI/UX', 'Figma', 'CSS', 'Responsive', 'React JS'],
  },
]

const cardVariants = {
  hidden: { y: 60, opacity: 0 },
  show: (i) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, delay: i * 0.15, ease: 'easeOut' },
  }),
}

export default function Services() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { t } = useLanguage()

  return (
    <section className={styles.services} id="services" ref={ref}>
      <h2 className="heading">
        {t('services.heading')} <span>{t('services.accent')}</span>
      </h2>

      <div className={styles.grid}>
        {services.map((s, i) => (
          <motion.div
            key={i}
            className={styles.card}
            variants={cardVariants}
            custom={i}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
          >
            <div className={styles.iconWrap}>
              <Icon name={s.icon} className={styles.serviceIcon} />
              <div className={styles.iconGlow} />
            </div>
            <h3 className={styles.title}>{t(`services.${s.titleKey}`)}</h3>
            <p className={styles.desc}>{t(`services.${s.descKey}`)}</p>
            <div className={styles.tags}>
              {s.tags.map(t => (
                <span key={t} className={styles.tag}>{t}</span>
              ))}
            </div>
            <div className={styles.cardGlow} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
