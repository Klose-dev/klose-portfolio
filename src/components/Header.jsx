import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedLogo from './AnimatedLogo'
import styles from './Header.module.css'

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#skills', label: 'Skills' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#contact', label: 'Contact' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('#home')

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

      <nav className={styles.navbar} aria-label="Main navigation">
        {navLinks.map(link => (
          <a
            key={link.href}
            href={link.href}
            className={`${styles.navLink} ${active === link.href ? styles.navActive : ''}`}
            onClick={closeMenu}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className={styles.actions}>
        <button
          className={`${styles.menuBtn} ${menuOpen ? styles.menuOpen : ''}`}
          onClick={() => setMenuOpen(p => !p)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
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
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
