import { motion } from 'framer-motion'
import {
  SiReact,
  SiPython,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiNodedotjs,
  SiMysql,
  SiLaravel,
} from 'react-icons/si'
import styles from './TechOrbit.module.css'

const outerOrbit = [
  { icon: SiReact, label: 'React' },
  { icon: SiPython, label: 'Python' },
  { icon: SiJavascript, label: 'JavaScript' },
  { icon: SiHtml5, label: 'HTML5' },
]

const innerOrbit = [
  { icon: SiCss, label: 'CSS' },
  { icon: SiNodedotjs, label: 'Node.js' },
  { icon: SiMysql, label: 'MySQL' },
  { icon: SiLaravel, label: 'Laravel' },
]

function OrbitRing({ nodes, className, radius, depth, reverse = false }) {
  const step = 360 / nodes.length

  return (
    <div
      className={`${styles.orbitRing} ${reverse ? styles.reverse : ''} ${className || ''}`}
      style={{ '--orbit-radius': radius, '--orbit-depth': depth }}
      aria-hidden="true"
    >
      {nodes.map((node, index) => {
        const Icon = node.icon
        return (
          <div
            key={node.label}
            className={styles.orbitNode}
            style={{ '--angle': `${index * step}deg` }}
          >
            <span className={styles.nodeFace}>
              <span className={styles.nodeIconWrap}>
                <Icon className={styles.nodeIcon} />
              </span>
              <span className={styles.nodeLabel}>{node.label}</span>
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default function TechOrbit({ className }) {
  return (
    <div className={`${styles.shell} ${className || ''}`}>
      <div className={styles.halo} />

      <motion.div
        className={styles.scene}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className={styles.tiltPlane}>
          <OrbitRing nodes={outerOrbit} radius="13.5rem" depth="36px" />
          <OrbitRing nodes={innerOrbit} radius="9.4rem" depth="-18px" reverse />

          <div className={styles.core}>
            <span className={styles.coreKicker}>IT</span>
            <span className={styles.coreTitle}>Technology</span>
            <span className={styles.coreSub}>3D Orbit</span>
          </div>
        </div>

        <div className={styles.captionRow}>
          <span>React</span>
          <span>Python</span>
          <span>JavaScript</span>
          <span>Node.js</span>
        </div>
      </motion.div>
    </div>
  )
}
