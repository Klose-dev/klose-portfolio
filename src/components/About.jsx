import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import TextGenerateEffect from './TextGenerateEffect'
import MagneticButton from './MagneticButton'
import Icon from './Icon'
import { useLanguage } from '../context/LanguageContext'
import styles from './About.module.css'

const fadeIn = (dir = 'left', delay = 0) => ({
  hidden: { x: dir === 'left' ? -60 : 60, opacity: 0 },
  show:   { x: 0, opacity: 1, transition: { duration: 0.8, delay, ease: 'easeOut' } },
})

export default function About() {
  const ref   = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const { t } = useLanguage()

  return (
    <section className={styles.about} id="about" ref={ref}>
      <h2 className="heading">
        {t('about.heading')} <span>{t('about.accent')}</span>
      </h2>

      <div className={styles.container}>
        {/* Image */}
        <motion.div
          className={styles.imgWrap}
          variants={fadeIn('left')}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          whileHover={{ rotateY: 3, rotateX: -2, scale: 1.01 }}
          transition={{ duration: 0.3 }}
          style={{ perspective: 1000 }}
        >
          <div className={styles.imgBox}>
            <img src="/klose-k.jpeg" alt="Portrait of Akongseh Klose" loading="lazy" />
            <div className={styles.imgOverlay} />
          </div>
          <div className={styles.expBadge}>
            <span className={styles.expNum}>3+</span>
            <span className={styles.expLabel}>{t('about.experience')}</span>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          className={styles.content}
          variants={fadeIn('right', 0.2)}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          <div className={styles.tag}>{t('about.tag')}</div>

          {inView && (
            <TextGenerateEffect
              words={t('about.intro')}
              duration={0.4}
              filter={true}
            />
          )}

          <p className={styles.bio}>
            {t('about.bio')}
          </p>

          <div className={styles.info}>
            {[
              { label: t('about.name'),       val: 'Akongseh Klose' },
              { label: t('about.location'),   val: 'Yaoundé, Cameroon' },
              { label: t('about.freelance'),  val: t('about.available') },
            ].map(({ label, val }) => (
              <div key={label} className={styles.infoItem}>
                <span className={styles.infoLabel}>{label}:</span>
                <span className={styles.infoVal}>{val}</span>
              </div>
            ))}
          </div>

          <MagneticButton variant="solid">
            <Icon name="bx bx-download" className={styles.buttonIcon} /> {t('about.download')}
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  )
}