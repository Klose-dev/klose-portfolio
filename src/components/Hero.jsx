import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { SparkleParticles } from './SparkleParticles'
import TextGenerateEffect from './TextGenerateEffect'
import MagneticButton from './MagneticButton'
import Icon from './Icon'
import { useLanguage } from '../context/LanguageContext'
import styles from './Hero.module.css'

const socials = [
  { icon: 'bx bxl-facebook',       href: '#' },
  { icon: 'bx bxl-twitter',        href: '#' },
  { icon: 'bx bxl-instagram-alt',  href: '#' },
  { icon: 'fab fa-github',         href: '#' },
  { icon: 'fab fa-telegram',       href: '#' },
  { icon: 'fab fa-whatsapp',       href: '#' },
  { icon: 'bx bxl-linkedin',       href: '#' },
]

const stats = [
  { value: 6, suffix: '+', icon: 'bx bx-check-circle' },
  { value: 4, suffix: '+', icon: 'bx bx-user' },
  { value: 10, suffix: '+', icon: 'bx bx-code-alt' },
]

const fadeLeft = {
  hidden: { x: -60, opacity: 0 },
  show: { x: 0, opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
}
const fadeRight = {
  hidden: { x: 60, opacity: 0 },
  show: { x: 0, opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
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

          <motion.h3
            className={styles.greeting}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {t('hero.greeting')}
          </motion.h3>

          <motion.h1
            className={styles.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Akongseh <span className={styles.nameHighlight}>Klose</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <TextGenerateEffect
              words={t('hero.paragraphs')}
              textClassName={styles.heroParagraph}
              duration={0.4}
              filter={true}
              loop={true}
              loopDelay={3500}
            />
          </motion.div>

          <motion.div
            className={styles.statsStrip}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.6 }}
          >
            {stats.map((stat, index) => (
              <div key={index} className={styles.statCard}>
                <div className={styles.statIconWrap} aria-hidden="true">
                  <Icon name={stat.icon} className={styles.statIcon} />
                </div>
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
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            {socials.map((social, index) => (
              <a key={index} href={social.href} className={styles.socialIcon}>
                <Icon name={social.icon} className={styles.socialIconSvg} />
              </a>
            ))}
          </motion.div>

          <motion.div
            className={styles.ctas}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            <MagneticButton variant="solid" className={styles.heroSolidBtn}>
              <Icon name="bx bx-download" className={styles.buttonIcon} /> {t('hero.download')}
            </MagneticButton>
            <MagneticButton variant="glass" className={styles.heroGlassBtn}>
              {t('hero.viewProjects')}
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
