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
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import styles from './TechStackConvergence.module.css'

const techGroups = [
  {
    key: 'frontend',
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

export default function TechStackConvergence() {
  const { t } = useLanguage()
  const { isDark } = useTheme()

  return (
    <section className={styles.section} id="tech-stack">
      <h2 className="heading">{t('skills.stackHeading')}</h2>

      <div className={styles.groups}>
        {techGroups.map(group => (
          <div className={styles.group} key={group.key}>
            <h3 className={styles.groupTitle}>{t(`skills.categories.${group.key}`)}</h3>
            <ul className={styles.grid}>
              {group.technologies.map(tech => {
                const Icon = tech.icon
                const iconColor = tech.darkColor && isDark
                  ? tech.darkColor
                  : tech.color === '#FFFFFF' || tech.color === '#F1F5F9'
                    ? 'var(--text-color)'
                    : tech.color

                return (
                  <li className={styles.card} key={tech.name}>
                    <span className={styles.iconTile} aria-hidden="true">
                      <Icon className={styles.techIcon} style={{ color: iconColor }} />
                    </span>
                    <span className={styles.techName}>{tech.name}</span>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
