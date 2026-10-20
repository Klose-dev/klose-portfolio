import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { SparkleParticles } from './SparkleParticles'
import MagneticButton from './MagneticButton'
import Icon from './Icon'
import { useLanguage } from '../context/LanguageContext'
import styles from './Hero.module.css'

const socials = [
  { icon: 'fab fa-github',         href: '#', label: 'GitHub' },
  { icon: 'bx bxl-linkedin',       href: '#', label: 'LinkedIn' },
  { icon: 'fab fa-whatsapp',       href: '#', label: 'WhatsApp' },
]

const stats = [
  { value: 6, suffix: '+', label: 'Featured Projects' },
  { value: 10, suffix: '+', label: 'Technologies Used' },
]

const fadeLeft = {
  hidden: { x: -40, opacity: 0 },
  show: { x: 0, opacity: 1, transition: { duration: 0.7, ease: 'easeOut' } },
}
const fadeRight = {
  hidden: { x: 40, opacity: 0 },
  show: { x: 0, opacity: 1, transition: { duration: 0.7, ease: 'easeOut' } },
}

function CountUp({ end, suffix = '' }) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    let frameId = 0
    const duration = 1200
    const start = performance.now()

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(end * eased))

      if (progress < 1) {
        frameId = requestAnimationFrame(tick)
      }
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [end])

  return <>{value}{suffix}</>
}

export default function Hero() {
  const heroRef = useRef(null)
  const [showParticles, setShowParticles] = useState(true)
  const { t } = useLanguage()

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    const observer = new IntersectionObserver(
      ([entry]) => setShowParticles(Boolean(entry?.isIntersecting)),
      { root: null, threshold: 0.12 }
    )

    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  return (
    <section className={styles.hero} id="home" ref={heroRef}>
      <div className={styles.sparkleBackdrop}>
        {showParticles && (
          <SparkleParticles
            className={styles.sparkleParticles}
            backgroundColor="transparent"
            zIndexLevel={0}
          />
        )}
      </div>

      <div className={styles.container}>
        <motion.div
          className={styles.content}
          variants={fadeLeft}
          initial="hidden"
          animate="show"
        >
          <motion.div
            className={styles.badge}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className={styles.badgeDot} />
            <span>{t('hero.availability')}</span>
          </motion.div>

          <motion.h1
            className={styles.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            Akongseh <span className={styles.nameHighlight}>Klose</span>
          </motion.h1>

          <motion.h2
            className={styles.headline}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.7 }}
          >
            {t('hero.headline')}
          </motion.h2>

          <motion.p
            className={styles.description}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
          >
            {t('hero.description')}
          </motion.p>

          <motion.div
            className={styles.statsStrip}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.6 }}
          >
            {stats.map((stat, index) => (
              <div key={index} className={styles.statCard}>
                <div className={styles.statCopy}>
                  <span className={styles.statValue}>
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className={styles.statLabel}>{t('hero.stats')[index]}</span>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            className={styles.socials}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            {socials.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className={styles.socialIcon}
                aria-label={social.label}
              >
                <Icon name={social.icon} className={styles.socialIconSvg} />
              </a>
            ))}
          </motion.div>

          <motion.div
            className={styles.ctas}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.6 }}
          >
            <MagneticButton variant="solid" className={styles.heroPrimaryBtn}>
              <Icon name="bx bx-folder-open" className={styles.buttonIcon} /> {t('hero.viewProjects')}
            </MagneticButton>
            <MagneticButton variant="glass" className={styles.heroSecondaryBtn}>
              <Icon name="bx bx-download" className={styles.buttonIcon} /> {t('hero.download')}
            </MagneticButton>
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.carouselWrap}
          variants={fadeRight}
          initial="hidden"
          animate="show"
        >
          <div className={styles.heroImageFrame}>
            <img
              src="/klose-k.jpeg"
              alt="Portrait of Akongseh Klose"
              className={`${styles.heroImage} ${styles.heroImageActive}`}
              loading="lazy"
            />
            <div className={styles.heroImageOverlay} />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
