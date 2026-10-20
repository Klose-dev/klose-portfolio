import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import MagneticButton from './MagneticButton'
import Icon from './Icon'
import StatCard from './StatCard'
import SkillChip from './SkillChip'
import HighlightCard from './HighlightCard'
import Portrait from './Portrait'
import styles from './About.module.css'

const fadeUp = {
  hidden: { y: 30, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.7, ease: 'easeOut' } },
}

const fadeRight = {
  hidden: { x: 30, opacity: 0 },
  show: { x: 0, opacity: 1, transition: { duration: 0.7, delay: 0.1, ease: 'easeOut' } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

export default function AboutSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const { t } = useLanguage()

  const about = t('about')

  return (
    <section className={styles.about} id="about" ref={ref} aria-labelledby="about-heading">
      <motion.div
        className={styles.grid}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        variants={staggerContainer}
        transition={{ staggerChildren: 0.12 }}
      >
        {/* Left Column - Portrait */}
        <motion.div className={styles.visual} variants={fadeUp}>
          <Portrait
            src="/klose-k.jpeg"
            alt="Portrait of Akongseh Klose"
            inView={inView}
            className={styles.portrait}
          />
        </motion.div>

        {/* Right Column - Content */}
        <motion.div className={styles.content} variants={fadeRight}>
          <motion.h2
            id="about-heading"
            className={styles.heading}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          >
            {about.heading} <span>{about.accent}</span>
          </motion.h2>

          <div className={styles.underline} aria-hidden="true" />

          <motion.p
            className={styles.headline}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
          >
            {about.headline}
          </motion.p>

          <motion.div
            className={styles.bio}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
          >
            {about.bio.map((paragraph, i) => (
              <p key={i} className={styles.bioParagraph}>{paragraph}</p>
            ))}
          </motion.div>

          <motion.p
            className={styles.currently}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: 'easeOut' }}
          >
            <span className={styles.currentlyLabel}>{about.currently}</span>
          </motion.p>

          {/* Stats Row */}
          <motion.div
            className={styles.stats}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.55, ease: 'easeOut' }}
            role="list"
            aria-label={about.stats[0]?.label || 'Statistics'}
          >
            {about.stats.map((stat, i) => (
              <StatCard
                key={stat.label}
                label={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                delay={i * 0.08}
                inView={inView}
              />
            ))}
          </motion.div>

          {/* Skills */}
          <motion.div
            className={styles.skills}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65, ease: 'easeOut' }}
          >
            <h3 className={styles.skillsTitle}>Core Skills</h3>
            <div className={styles.skillsList} role="list" aria-label="Core skills">
              {about.skills.map((skill, i) => (
                <SkillChip key={skill} name={skill} index={i} inView={inView} />
              ))}
            </div>
          </motion.div>

          {/* Highlights */}
          <motion.div
            className={styles.highlights}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75, ease: 'easeOut' }}
          >
            {about.highlights.map((highlight, i) => (
              <HighlightCard
                key={highlight.title}
                title={highlight.title}
                items={highlight.items}
                index={i}
                inView={inView}
              />
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            className={styles.ctas}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85, ease: 'easeOut' }}
          >
            <MagneticButton variant="solid" className={styles.ctaPrimary} href="#contact">
              <Icon name="bx bx-download" className={styles.buttonIcon} /> {about.ctaPrimary}
            </MagneticButton>
            <MagneticButton variant="glass" className={styles.ctaSecondary} href="#contact">
              <Icon name="bx bx-message-rounded" className={styles.buttonIcon} /> {about.ctaSecondary}
            </MagneticButton>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}