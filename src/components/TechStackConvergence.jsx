import {
  SiHtml5,
  SiCss,
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
  SiNpm,
  SiVercel,
  SiFramer,
  SiCssmodules,
} from 'react-icons/si'
import { VscVscode } from 'react-icons/vsc'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import styles from './TechStackConvergence.module.css'

const techGroups = [
  {
    key: 'frameworks',
    technologies: [
      { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
      { name: 'CSS3', icon: SiCss, color: '#1572B6' },
      { name: 'JavaScript', icon: SiJavascript, color: '#A78900' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { name: 'React', icon: SiReact, color: '#087EA4' },
      { name: 'Vite', icon: SiVite, color: '#9B6E00' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#0789A6' },
      { name: 'Framer Motion', icon: SiFramer, color: '#0055FF' },
      { name: 'CSS Modules', icon: SiCssmodules, color: '#F1F5F9' },
    ],
  },
  {
    key: 'backend',
    technologies: [
      { name: 'Node.js', icon: SiNodedotjs, color: '#5FA04E' },
      { name: 'Express.js', icon: SiExpress, color: '#FFFFFF' },
      { name: 'Python', icon: SiPython, color: '#3776AB' },
      { name: 'REST API', icon: SiOpenapiinitiative, color: '#548A2B' },
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
      { name: 'Prisma', icon: SiPrisma, color: '#2D3748', darkColor: '#F5F5F5' },
    ],
  },
  {
    key: 'tools',
    technologies: [
      { name: 'Git', icon: SiGit, color: '#F05032' },
      { name: 'GitHub', icon: SiGithub, color: '#FFFFFF' },
      { name: 'VS Code', icon: VscVscode, color: '#007ACC' },
      { name: 'npm', icon: SiNpm, color: '#CB3837' },
      { name: 'Vercel', icon: SiVercel, color: '#FFFFFF' },
    ],
  },
]

const cardVariants = {
  hidden: { y: 30, opacity: 0, scale: 0.9 },
  show: (i) => ({
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.04, ease: 'easeOut' },
  }),
}

const groupVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, staggerChildren: 0.04, delayChildren: 0.1 },
  },
}

function TechCard({ tech, isDark }) {
  const Icon = tech.icon
  const iconColor = tech.darkColor && isDark
    ? tech.darkColor
    : tech.color === '#FFFFFF' || tech.color === '#F1F5F9'
      ? 'var(--text-color)'
      : tech.color

  return (
    <motion.li
      className={styles.card}
      variants={cardVariants}
      whileHover={{ y: -4, scale: 1.02, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.96 }}
    >
      <span className={styles.iconTile} aria-hidden="true">
        <Icon className={styles.techIcon} style={{ color: iconColor }} />
      </span>
      <span className={styles.techName}>{tech.name}</span>
    </motion.li>
  )
}

function TechGroup({ group, isDark, inView, t }) {
  return (
    <motion.div className={styles.group} variants={groupVariants} initial="hidden" animate={inView ? 'show' : 'hidden'}>
      <motion.h3
        className={styles.groupTitle}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {t(`skills.categories.${group.key}`)}
      </motion.h3>
      <motion.ul className={styles.grid} variants={{ show: { transition: { staggerChildren: 0.04 } } }}>
        {group.technologies.map(tech => (
          <TechCard key={tech.name} tech={tech} isDark={isDark} />
        ))}
      </motion.ul>
    </motion.div>
  )
}

export default function TechStackConvergence() {
  const { t } = useLanguage()
  const { isDark } = useTheme()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className={styles.section} id="tech-stack" ref={ref}>
      <motion.h2
        className="heading"
        initial={{ y: 30, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        {t('skills.stackHeading')}
      </motion.h2>

      <div className={styles.groups}>
        {techGroups.map(group => (
          <TechGroup key={group.key} group={group} isDark={isDark} inView={inView} t={t} />
        ))}
      </div>
    </section>
  )
}
