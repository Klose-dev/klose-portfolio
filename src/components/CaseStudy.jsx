import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import MagneticButton from './MagneticButton'
import Icon from './Icon'
import { useLanguage } from '../context/LanguageContext'
import styles from './CaseStudy.module.css'

const roles = [
  { icon: 'bx bx-bulb' },
  { icon: 'bx bx-trending-up' },
  { icon: 'bx bx-shield' },
]

const techChips = [
  'Python', 'OpenCV', 'Face Recognition', 'JavaScript', 'PostgreSQL', 'Machine Learning', 'REST API', 'Real time Updates',
]

const cardVariants = {
  hidden: { y: 50, opacity: 0 },
  show: (i) => ({
    y: 0, opacity: 1,
    transition: { duration: 0.7, delay: i * 0.15, ease: 'easeOut' },
  }),
}

export default function CaseStudy() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { t } = useLanguage()
  const translatedRoles = t('caseStudy.roles')

  return (
    <section className={styles.section} id="casestudy" ref={ref}>
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <span className={styles.eyebrow}>{t('caseStudy.eyebrow')}</span>
        <h2 className="heading" style={{ marginBottom: '1.5rem' }}>
          {t('caseStudy.heading')} <span>{t('caseStudy.accent')}</span>
        </h2>
        <p className={styles.problem}>
          <strong>{t('caseStudy.problemLabel')}</strong> {t('caseStudy.problem')}
        </p>
      </motion.div>

      {/* Role cards */}
      <div className={styles.roleGrid}>
        {roles.map((r, i) => (
          <motion.div
            key={i}
            className={styles.roleCard}
            variants={cardVariants}
            custom={i}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            whileHover={{ y: -6, transition: { duration: 0.3 } }}
          >
            <div className={styles.roleIcon}>
              <Icon name={r.icon} className={styles.roleIconSvg} />
            </div>
            <h3 className={styles.roleTitle}>{translatedRoles[i].title}</h3>
            <p className={styles.roleDesc}>{translatedRoles[i].description}</p>
          </motion.div>
        ))}
      </div>

      {/* Tech chips */}
      <motion.div
        className={styles.techRow}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <span className={styles.techLabel}>{t('caseStudy.builtWith')}</span>
        <div className={styles.chips}>
          {techChips.map(c => (
            <span key={c} className={styles.chip}>{c}</span>
          ))}
        </div>
      </motion.div>

      {/* CTAs */}
      <motion.div
        className={styles.ctas}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.65, duration: 0.6 }}
      >
        <MagneticButton variant="solid">
          <Icon name="bx bx-link-external" className={styles.ctaIcon} /> {t('caseStudy.liveDemo')}
        </MagneticButton>
        <MagneticButton variant="outline">
          <Icon name="fab fa-github" className={styles.ctaIcon} /> {t('caseStudy.viewCode')}
        </MagneticButton>
      </motion.div>
    </section>
  )
}
