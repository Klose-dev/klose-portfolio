import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import styles from './Experience.module.css'

const techIconMap = {
  SiReact: () => import('react-icons/si').then(m => m.SiReact),
  SiPhp: () => import('react-icons/si').then(m => m.SiPhp),
  SiLaravel: () => import('react-icons/si').then(m => m.SiLaravel),
  SiMysql: () => import('react-icons/si').then(m => m.SiMysql),
  SiPython: () => import('react-icons/si').then(m => m.SiPython),
  SiJavascript: () => import('react-icons/si').then(m => m.SiJavascript),
  SiHtml5: () => import('react-icons/si').then(m => m.SiHtml5),
  SiOpencv: () => import('react-icons/si').then(m => m.SiOpencv),
  SiPostman: () => import('react-icons/si').then(m => m.SiPostman),
  SiPostgresql: () => import('react-icons/si').then(m => m.SiPostgresql),
}

function TechIcon({ iconName }) {
  const [Icon, setIcon] = useState(null)

  useEffect(() => {
    const loader = techIconMap[iconName]
    if (loader) {
      loader().then(module => setIcon(() => module.default))
    }
  }, [iconName])

  if (!Icon) return <span className={styles.techTagFallback}>&nbsp;</span>

  return <Icon className={styles.techIcon} aria-hidden="true" style={{ width: '1.25rem', height: '1.25rem', flexShrink: 0 }} />
}

function ExperienceCard({ item, index, inView }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20
    setMousePos({ x, y })
  }

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={cardRef}
      className={styles.item}
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: 'easeOut' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); handleMouseLeave() }}
      style={{
        transform: `perspective(1000px) rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg)`,
        transition: 'transform 0.3s ease-out',
      }}
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
            <div key={i} className={styles.techTag}>
              <TechIcon iconName={tech.icon} />
              <span className={styles.techName}>{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

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
          <ExperienceCard key={index} item={item} index={index} inView={inView} />
        ))}
      </div>
    </section>
  )
}