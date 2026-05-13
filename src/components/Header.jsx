import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedLogo from './AnimatedLogo'
import { useTheme } from '../context/ThemeContext'
import Icon from './Icon'
import styles from './Header.module.css'

const navLinks = [
  { href: '#home',      label: 'Home'      },
  { href: '#about',     label: 'About'     },
  { href: '#services',  label: 'Services'  },
  { href: '#skills',    label: 'Skills'    },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#contact',   label: 'Contact'   },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('#home')
  const { isDark, toggle } = useTheme()

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('section[id]'))
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible?.target?.id) {
          setActive(`#${visible.target.id}`)
        }
      },
      {
        root: null,
        rootMargin: '-22% 0px -60% 0px',
        threshold: [0.15, 0.3, 0.5, 0.7],
      }
    )

    sections.forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <motion.header
      className={styles.header}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <AnimatedLogo size="md" />

      <nav className={`${styles.navbar} ${menuOpen ? styles.open : ''}`}>
        {navLinks.map(link => (
          <a
            key={link.href}
            href={link.href}
            className={`${styles.navLink} ${active === link.href ? styles.navActive : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className={styles.actions}>
        <button className={styles.themeBtn} onClick={toggle} aria-label="Toggle theme">
          {isDark
            ? <Icon name="bx bx-sun" className={styles.themeIcon} />
            : <Icon name="bx bx-moon" className={styles.themeIcon} />
          }
        </button>
        <button
          className={`${styles.menuBtn} ${menuOpen ? styles.menuOpen : ''}`}
          onClick={() => setMenuOpen(p => !p)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className={`${styles.mobileLink} ${active === link.href ? styles.navActive : ''}`}
                onClick={() => setMenuOpen(false)}
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
