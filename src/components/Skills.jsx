import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Icon from './Icon'
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

function Ring({ pct, label, icon, inView }) {
  const dashOffset = CIRC - (pct / 100) * CIRC

  return (
    <div className={styles.ringWrap}>
      <div className={styles.ringIconAbove}>
        <Icon name={icon} className={styles.skillIcon} />
      </div>
      <div className={styles.svgBox}>
        <svg viewBox="0 0 120 120" width="140" height="140">
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
          <defs>
            <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="var(--primary-dark)" />
              <stop offset="100%" stopColor="var(--primary-mid)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center percentage */}
        <div className={styles.ringCenter}>
          <motion.span
            className={styles.pct}
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
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

  return (
    <section className={styles.skills} id="skills" ref={ref}>
      <h2 className="heading">
        My <span>Skills</span>
      </h2>

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
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <Ring {...s} inView={inView} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
