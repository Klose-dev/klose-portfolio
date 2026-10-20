import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Icon from './Icon'
import { useLanguage } from '../context/LanguageContext'
import styles from './Skills.module.css'

const skills = [
  { label: 'PHP',         pct: 85, icon: 'bx bxl-php'          },
  { label: 'MySQL',       pct: 80, icon: 'bx bxs-data'         },
  { label: 'Laravel',     pct: 75, icon: 'bx bxl-laravel'      },
  { label: 'JavaScript',  pct: 88, icon: 'bx bxl-javascript'   },
  { label: 'HTML & CSS',  pct: 90, icon: 'bx bxl-html5'        },
  { label: 'React JS',    pct: 50, icon: 'bx bxl-react'        },
  { label: 'Python',      pct: 70, icon: 'bx bxl-python'       },
  { label: 'React Native', pct: 20, icon: 'bx bxl-react'       },
]

const R        = 52
const CIRC     = 2 * Math.PI * R

function Ring({ pct, label, icon, inView, index }) {
  const dashOffset = CIRC - (pct / 100) * CIRC
  const [isHovered, setIsHovered] = useState(false)
  const [rotateAngle, setRotateAngle] = useState(0)

  useEffect(() => {
    if (!inView || !isHovered) return
    let frame = 0
    const animate = () => {
      setRotateAngle(prev => (prev + 0.3) % 360)
      frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [inView, isHovered])

  return (
    <div className={styles.ringWrap} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className={styles.ringIconAbove}>
        <Icon name={icon} className={styles.skillIcon} />
      </div>
      <div className={styles.svgBox}>
        <svg viewBox="0 0 120 120" width="140" height="140" style={{ transform: `rotate(${rotateAngle}deg)` }}>
          {/* Outer glow ring */}
          <circle
            cx="60" cy="60" r={R + 6}
            fill="none"
            stroke="var(--primary-mid)"
            strokeWidth="1"
            opacity={isHovered ? 0.3 : 0}
            style={{ transition: 'opacity 0.3s ease' }}
          />
          {/* Track */}
          <circle
            cx="60" cy="60" r={R}
            fill="none"
            stroke="var(--surface-border)"
            strokeWidth="8"
          />
          {/* Animated progress */}
          <motion.circle
            cx="60" cy="60" r={R}
            fill="none"
            stroke="url(#greenGrad)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={CIRC}
            initial={{ strokeDashoffset: CIRC }}
            animate={{ strokeDashoffset: inView ? dashOffset : CIRC }}
            transition={{ duration: 1.6, ease: 'easeOut', delay: 0.2 }}
            transform="rotate(-90 60 60)"
          />
          {/* Inner subtle ring */}
          <circle
            cx="60" cy="60" r={R - 10}
            fill="none"
            stroke="var(--surface-border)"
            strokeWidth="1"
            opacity="0.5"
          />
          <defs>
            <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="var(--primary-dark)" />
              <stop offset="100%" stopColor="var(--primary-mid)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Floating particles */}
        {inView && isHovered && Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className={styles.floatParticle}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.25, ease: 'easeInOut' }}
            style={{
              transformOrigin: '60px 60px',
              transform: `rotate(${i * 45}deg) translateY(-70px)`,
            }}
          />
        ))}

        {/* Center percentage */}
        <div className={styles.ringCenter}>
          <motion.span
            className={styles.pct}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.5 }}
            transition={{ delay: 0.8, duration: 0.5, type: 'spring', stiffness: 200 }}
          >
            {inView ? pct : 0}%
          </motion.span>
        </div>
      </div>
      <span className={styles.ringLabel}>{label}</span>
    </div>
  )
}

export default function Skills() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { t } = useLanguage()

  return (
    <section className={styles.skills} id="skills" ref={ref}>
      <motion.h2
        className="heading"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {t('skills.heading')}
      </motion.h2>

      <motion.div
        className={styles.grid}
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {skills.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ y: 40, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: i * 0.08 }}
          >
            <Ring {...s} inView={inView} index={i} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
