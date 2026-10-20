import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedLogo from './AnimatedLogo'
import Icon from './Icon'
import { useTheme } from '../context/ThemeContext'
import { useLanguage } from '../context/LanguageContext'
import styles from './Header.module.css'

const TRANSITION_LABELS = {
  'fade-scale': 'Fade',
  'rotate-flip': 'Flip',
  'slide-reveal': 'Slide',
  'ripple-wave': 'Ripple',
  'particle-burst': 'Burst',
}

const navLinks = [
  { href: '#home', key: 'home' },
  { href: '#about', key: 'about' },
  { href: '#services', key: 'services' },
  { href: '#skills', key: 'skills' },
  { href: '#portfolio', key: 'portfolio' },
  { href: '#contact', key: 'contact' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('#home')
  const { isDark, toggle, transitionStyle } = useTheme()
  const { language, setLanguage, labels, t } = useLanguage()

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('section[id]'))
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => {
            const aDistance = Math.abs(a.target.getBoundingClientRect().top - 120)
            const bDistance = Math.abs(b.target.getBoundingClientRect().top - 120)
            return b.intersectionRatio - a.intersectionRatio || aDistance - bDistance
          })

        const nextSection = visible[0]
        if (nextSection?.target?.id) {
          setActive(`#${nextSection.target.id}`)
        }
      },
      {
        root: null,
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0, 0.15, 0.3, 0.5, 0.7, 1],
      }
    )

    sections.forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(min-width: 901px)')

    const closeOnDesktop = () => {
      if (mediaQuery.matches) {
        setMenuOpen(false)
      }
    }

    closeOnDesktop()

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', closeOnDesktop)
      return () => mediaQuery.removeEventListener('change', closeOnDesktop)
    }

    mediaQuery.addListener(closeOnDesktop)
    return () => mediaQuery.removeListener(closeOnDesktop)
  }, [])

  useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <motion.header
      className={styles.header}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <AnimatedLogo size="md" />

      <nav className={styles.navbar} aria-label={t('common.mainNavigation')}>
        {navLinks.map(link => (
          <a
            key={link.href}
            href={link.href}
            className={`${styles.navLink} ${active === link.href ? styles.navActive : ''}`}
            onClick={closeMenu}
          >
            {labels[link.key]}
          </a>
        ))}
      </nav>

      <div className={styles.actions}>
        <div className={styles.languageSwitch} aria-label={t('common.languageSelection')}>
          <button
            className={`${styles.languageBtn} ${language === 'en' ? styles.languageActive : ''}`}
            onClick={() => setLanguage('en')}
            type="button"
            aria-pressed={language === 'en'}
          >
            EN
          </button>
          <button
            className={`${styles.languageBtn} ${language === 'fr' ? styles.languageActive : ''}`}
            onClick={() => setLanguage('fr')}
            type="button"
            aria-pressed={language === 'fr'}
          >
            FR
          </button>
        </div>
        <button
          className={styles.themeBtn}
          onClick={toggle}
          type="button"
          aria-label={isDark ? t('common.switchToLight') : t('common.switchToDark')}
          title={isDark ? t('common.lightMode') : t('common.darkMode')}
        >
          <Icon name={isDark ? 'bx bx-sun' : 'bx bx-moon'} className={styles.themeIcon} />
          <span className={styles.transitionLabel}>{TRANSITION_LABELS[transitionStyle]}</span>
        </button>
        <button
          className={`${styles.menuBtn} ${menuOpen ? styles.menuOpen : ''}`}
          onClick={() => setMenuOpen(p => !p)}
          aria-label={menuOpen ? t('common.closeMenu') : t('common.openMenu')}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          type="button"
        >
          <span /><span /><span />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-navigation"
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            role="menu"
            aria-label="Mobile navigation"
          >
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className={`${styles.mobileLink} ${active === link.href ? styles.navActive : ''}`}
                onClick={closeMenu}
              >
                {labels[link.key]}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
