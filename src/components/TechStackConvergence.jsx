import { useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiVite,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiOpenapiinitiative,
  SiPostgresql,
  SiPrisma,
  SiGit,
  SiGithub,
  SiVisualstudiocode,
  SiNpm,
  SiVercel,
  SiFramer,
  SiCssmodules,
} from 'react-icons/si'
import AnimatedLogo from './AnimatedLogo'
import styles from './TechStackConvergence.module.css'

const techNodes = [
  { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
  { name: 'CSS3', icon: SiCss3, color: '#1572B6' },
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'Vite', icon: SiVite, color: '#FFCC00' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#5FA04E' },
  { name: 'Express.js', icon: SiExpress, color: '#FFFFFF' },
  { name: 'Python', icon: SiPython, color: '#3776AB' },
  { name: 'REST API', icon: SiOpenapiinitiative, color: '#6BA539' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
  { name: 'Prisma', icon: SiPrisma, color: '#2D3748' },
  { name: 'Git', icon: SiGit, color: '#F05032' },
  { name: 'GitHub', icon: SiGithub, color: '#FFFFFF' },
  { name: 'VS Code', icon: SiVisualstudiocode, color: '#007ACC' },
  { name: 'npm', icon: SiNpm, color: '#CB3837' },
  { name: 'Vercel', icon: SiVercel, color: '#FFFFFF' },
  { name: 'Framer Motion', icon: SiFramer, color: '#0055FF' },
  { name: 'CSS Modules', icon: SiCssmodules, color: '#F1F5F9' },
]

export default function TechStackConvergence() {
  const positions = useMemo(() => {
    const count = techNodes.length
    return techNodes.map((_, index) => {
      const angle = (index / count) * Math.PI * 2 - Math.PI / 2
      const radius = 32 + (index % 2) * 10
      const x = 50 + Math.cos(angle) * radius
      const y = 50 + Math.sin(angle) * radius
      return { x, y }
    })
  }, [])

  return (
    <section className={styles.section}>
      <h2 className="heading">
        My <span>Tech Stack</span>
      </h2>

      <div className={styles.canvasWrap}>
        <div className={styles.canvas}>
          <div className={styles.receiver} aria-hidden="true">
            <div className={styles.ringOuter}>
              <AnimatedLogo size="sm" />
            </div>
            <div className={styles.ringMid} />
            <div className={styles.ringInner} />
            <div className={styles.core} />
          </div>

          {techNodes.map((tech, index) => {
            const Icon = tech.icon
            return (
              <motion.div
                key={tech.name}
                className={styles.node}
                initial={{ opacity: 0, scale: 0.8, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.05, ease: 'easeOut' }}
                style={{ left: `${positions[index].x}%`, top: `${positions[index].y}%` }}
              >
                <div aria-label={tech.name} title={tech.name}>
                  <Icon className={styles.techIcon} style={{ color: tech.color }} />
                </div>
                <span className={styles.nodeLabel}>{tech.name}</span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
