import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Icon from './Icon'
import { useLanguage } from '../context/LanguageContext'
import styles from './Portfolio.module.css'

const faceIdLogo = `data:image/svg+xml,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" role="img" aria-label="Face ID logo">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#000000"/>
      <stop offset="100%" stop-color="#1a1a1a"/>
    </linearGradient>
    <linearGradient id="ring" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f5f5f5"/>
      <stop offset="100%" stop-color="#b5b5b5"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="800" rx="48" fill="url(#bg)"/>
  <circle cx="600" cy="310" r="156" fill="none" stroke="url(#ring)" stroke-width="18"/>
  <circle cx="600" cy="310" r="104" fill="none" stroke="#f5f5f5" stroke-width="10" stroke-dasharray="16 22" opacity="0.9"/>
  <circle cx="555" cy="292" r="18" fill="#f5f5f5"/>
  <circle cx="645" cy="292" r="18" fill="#f5f5f5"/>
  <path d="M554 358c21 28 71 28 92 0" fill="none" stroke="#f5f5f5" stroke-width="14" stroke-linecap="round"/>
  <path d="M490 205h-56c-30 0-54 24-54 54v56" fill="none" stroke="#b5b5b5" stroke-width="12" stroke-linecap="round"/>
  <path d="M810 205h56c30 0 54 24 54 54v56" fill="none" stroke="#b5b5b5" stroke-width="12" stroke-linecap="round"/>
  <path d="M490 415h-56c-30 0-54-24-54-54v-56" fill="none" stroke="#b5b5b5" stroke-width="12" stroke-linecap="round"/>
  <path d="M810 415h56c30 0 54-24 54-54v-56" fill="none" stroke="#b5b5b5" stroke-width="12" stroke-linecap="round"/>
  <text x="600" y="612" text-anchor="middle" font-family="Arial, sans-serif" font-size="72" font-weight="700" fill="#f5f5f5">FACE ID</text>
  <text x="600" y="672" text-anchor="middle" font-family="Arial, sans-serif" font-size="30" font-weight="500" fill="#b5b5b5">Attendance Verification</text>
</svg>
`)}`

const projects = [
  {
    title: 'Face Recognition Attendance',
    category: 'AI/ML',
    tags: ['Python', 'OpenCV', 'React'],
    img: faceIdLogo,
    imageFit: 'contain',
    imageBg: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
    desc: 'Advanced facial recognition system for automated attendance tracking in educational institutions.',
    link: '#',
  },
  {
    title: 'AI Chat Bot',
    category: 'AI App',
    tags: ['Python', 'OpenAI API', 'NLP'],
    img: 'https://images.unsplash.com/photo-1679403766680-9aa2b959417d?auto=format&fit=crop&w=1600&q=80',
    desc: 'Python driven AI chatbot with NLP workflows, intelligent responses, and support automation for user conversations.',
    link: '#',
  },
  {
    title: 'IdeaMarket',
    category: 'Blockchain Project',
    tags: ['Python', 'Blockchain', 'Web3'],
    img: 'https://images.unsplash.com/photo-1743336751210-5205213290ca?auto=format&fit=crop&w=1600&q=80',
    desc: 'A blockchain powered marketplace for ideas, built with Python and modern decentralized workflows to support transparent ownership and collaboration.',
    link: '#',
  },
  {
    title: 'E Commerce Store',
    category: 'Web Design',
    tags: ['React', 'CSS'],
    img: 'https://images.unsplash.com/photo-1688561807381-05137151978f?auto=format&fit=crop&w=1600&q=80',
    desc: 'Modern e commerce UI with cart, checkout and product management.',
    link: '#',
  },
  {
    title: 'Admin Dashboard',
    category: 'Dashboard',
    tags: ['Python', 'JavaScript', 'Chart.js'],
    img: 'https://images.unsplash.com/photo-1686061592689-312bbfb5c055?auto=format&fit=crop&w=1600&q=80',
    desc: 'Admin dashboard built with Python and JavaScript for analytics, reporting, and clear role based management.',
    link: '#',
  },
  {
    title: 'Blog Platform',
    category: 'CMS',
    tags: ['Laravel', 'MySQL'],
    img: 'https://images.unsplash.com/photo-1524635962361-d7f8ae9c79b1?auto=format&fit=crop&w=1600&q=80',
    desc: 'Content management system with rich editor, SEO tools and comments.',
    link: '#',
  },
]

const cardVariants = {
  hidden: { scale: 0.92, opacity: 0 },
  show: (i) => ({
    scale: 1,
    opacity: 1,
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' },
  }),
}

export default function Portfolio() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [flippedIndex, setFlippedIndex] = useState(null)
  const [canHover, setCanHover] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const media = window.matchMedia('(hover: hover) and (pointer: fine)')

    const syncCapability = () => {
      setCanHover(media.matches)
      if (media.matches) {
        setFlippedIndex(null)
      }
    }

    syncCapability()

    const onScroll = () => {
      if (!media.matches) {
        setFlippedIndex(null)
      }
    }

    if (media.addEventListener) {
      media.addEventListener('change', syncCapability)
    } else {
      media.addListener(syncCapability)
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      if (media.removeEventListener) {
        media.removeEventListener('change', syncCapability)
      } else {
        media.removeListener(syncCapability)
      }
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const handleCardClick = (index) => {
    if (canHover) return
    setFlippedIndex(prev => (prev === index ? null : index))
  }

  const handleCardKeyDown = (event, index) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setFlippedIndex(prev => (prev === index ? null : index))
    }
  }

  const isExternalLink = (href) => /^https?:\/\//i.test(href)
  const translatedProjects = t('portfolio.projects')

  return (
    <section className={styles.portfolio} id="portfolio" ref={ref}>
      <div className={styles.sectionIntro}>
        <p className={styles.sectionKicker}>{t('portfolio.kicker')}</p>
        <h2 className={styles.sectionTitle}>
          {t('portfolio.heading')} <span>{t('portfolio.accent')}</span>
        </h2>
        <p className={styles.sectionText}>
          {t('portfolio.intro')}
        </p>
      </div>

      <div className={styles.grid}>
        {projects.map((p, i) => {
          const translated = translatedProjects[i]
          return (
          <motion.div
            key={i}
            className={`${styles.card} ${flippedIndex === i ? styles.flipped : ''}`}
            variants={cardVariants}
            custom={i}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            whileHover={{ y: -6 }}
            onClick={() => handleCardClick(i)}
            onKeyDown={(event) => handleCardKeyDown(event, i)}
            tabIndex={0}
            role="button"
            aria-pressed={flippedIndex === i}
          >
            <div className={styles.cardInner}>
              <div className={`${styles.face} ${styles.front}`}>
                <div className={styles.imgBox}>
                  <div
                    className={styles.imgPlaceholder}
                    style={{
                      backgroundImage: `url(${p.img})`,
                      backgroundSize: p.imageFit || 'cover',
                      backgroundColor: p.imageBg ? '#000000' : undefined,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                    }}
                  />
                </div>

                <div className={styles.cardInfo}>
                  <div className={styles.cardMeta}>
                    <span className={styles.category}>{translated.category}</span>
                    <div className={styles.tags}>
                      {p.tags.map(t => <span key={t} className={styles.tag}>{t}</span>)}
                    </div>
                  </div>
                  <h3 className={styles.cardTitle}>{translated.title}</h3>
                  <p className={styles.frontHint}>
                    {canHover ? t('portfolio.hover') : t('portfolio.tap')}
                  </p>
                </div>
              </div>

              <div className={`${styles.face} ${styles.back}`}>
                <p className={styles.backKicker}>{t('portfolio.overview')}</p>
                <h3 className={styles.backTitle}>{translated.title}</h3>
                <p className={styles.backDesc}>{translated.description}</p>
                <div className={styles.backTags}>
                  {p.tags.map(t => <span key={t} className={styles.backTag}>{t}</span>)}
                </div>
                <a
                  href={p.link}
                  className={styles.overlayBtn}
                  onClick={(event) => event.stopPropagation()}
                  target={isExternalLink(p.link) ? '_blank' : undefined}
                  rel={isExternalLink(p.link) ? 'noreferrer' : undefined}
                >
                  <Icon name="bx bx-link-external" className={styles.overlayBtnIcon} /> {t('portfolio.view')}
                </a>
              </div>
            </div>
          </motion.div>
          )
        })}
      </div>
    </section>
  )
}
