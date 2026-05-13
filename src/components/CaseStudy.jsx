import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import MagneticButton from './MagneticButton'
import Icon from './Icon'
import styles from './CaseStudy.module.css'

const roles = [
  {
    icon: 'bx bx-bulb',
    title: 'Employee Registration',
    desc: 'Employees register in the system with their facial biometric data securely stored. The system captures multiple face angles for accurate recognition.',
  },
  {
    icon: 'bx bx-trending-up',
    title: 'Attendance Tracking',
    desc: 'Real time attendance recording through facial recognition as employees enter the office. Instant notifications sent to managers and administrators.',
  },
  {
    icon: 'bx bx-shield',
    title: 'Analytics & Reporting',
    desc: 'Comprehensive attendance reports with AI powered insights. Historical data analysis, patterns, and predictive warnings for employees who may be at risk.'
  },
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

  return (
    <section className={styles.section} id="casestudy" ref={ref}>
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <span className={styles.eyebrow}>Featured Project</span>
        <h2 className="heading" style={{ marginBottom: '1.5rem' }}>
          Face Recognition <span>Attendance System</span>
        </h2>
        <p className={styles.problem}>
          <strong>Problem:</strong> Is an advanced face recognition based attendance system designed for company employees. It streamlines attendance tracking, enhances security, and reduces manual errors by automatically recording employee presence using facial identification.
        </p>
      </motion.div>

      {/* Role cards */}
      <div className={styles.roleGrid}>
        {roles.map((r, i) => (
          <motion.div
            key={r.title}
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
            <h3 className={styles.roleTitle}>{r.title}</h3>
            <p className={styles.roleDesc}>{r.desc}</p>
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
        <span className={styles.techLabel}>Built with:</span>
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
          <Icon name="bx bx-link-external" className={styles.ctaIcon} /> Live Demo
        </MagneticButton>
        <MagneticButton variant="outline">
          <Icon name="fab fa-github" className={styles.ctaIcon} /> View Code
        </MagneticButton>
      </motion.div>
    </section>
  )
}
