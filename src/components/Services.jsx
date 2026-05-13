import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Icon from './Icon'
import styles from './Services.module.css'

const services = [
  {
    icon: 'bx bx-code-alt',
    title: 'Web Development',
    desc: 'Building robust, scalable web applications using modern technologies like React, PHP, Laravel and MySQL with clean, maintainable code architecture.',
    tags: ['React', 'PHP', 'Laravel', 'MySQL', 'Python'],
  },
  {
    icon: 'bx bx-wrench',
    title: 'Website Maintenance',
    desc: 'Keeping your web presence optimized, secure, and up to date. From bug fixes to performance enhancements and regular content updates.',
    tags: ['Performance', 'Security', 'Updates', 'React Native'],
  },
  {
    icon: 'bx bx-palette',
    title: 'Web Design',
    desc: 'Designing visually stunning, user-focused interfaces with careful attention to typography, color theory, spacing, and responsive layouts.',
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

  return (
    <section className={styles.services} id="services" ref={ref}>
      <h2 className="heading">
        My <span>Services</span>
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
            <h3 className={styles.title}>{s.title}</h3>
            <p className={styles.desc}>{s.desc}</p>
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
