import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import MagneticButton from './MagneticButton'
import Icon from './Icon'
import { useLanguage } from '../context/LanguageContext'
import styles from './About.module.css'

const fadeUp = {
  hidden: { y: 40, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.7, ease: 'easeOut' } },
}

const fadeRight = {
  hidden: { x: 40, opacity: 0 },
  show: { x: 0, opacity: 1, transition: { duration: 0.7, delay: 0.15, ease: 'easeOut' } },
}

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { t } = useLanguage()

  const paragraphs = t('about.paragraphs')
  const coreIdentityTags = t('about.coreIdentityTags')

  return (
    <section className={styles.about} id="about" ref={ref}>
      <div className={styles.container}>
        {/* Left Column - Visual */}
        <motion.div
          className={styles.visual}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          <div className={styles.visualInner} />
        </motion.div>

        {/* Right Column - Content */}
        <motion.div
          className={styles.content}
          variants={fadeRight}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          <motion.h2
            className={styles.heading}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          >
            {t('about.heading')} <span>{t('about.accent')}</span>
          </motion.h2>

          <div className={styles.underline} aria-hidden="true" />

          <motion.p
            className={styles.paragraph}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
          >
            {paragraphs[0]}
          </motion.p>

          <motion.p
            className={styles.paragraph}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
          >
            {paragraphs[1]}
          </motion.p>

          <motion.div
            className={styles.coreIdentity}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: 'easeOut' }}
          >
            <span className={styles.coreIdentityLabel}>{t('about.coreIdentityLabel')}</span>
            <div className={styles.tags}>
              {coreIdentityTags.map((tag, index) => (
                <span key={index} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}