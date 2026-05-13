import { motion } from 'framer-motion'
import AnimatedLogo from './AnimatedLogo'
import Icon from './Icon'
import styles from './Footer.module.css'

const navLinks = [
  { href: '#home',      label: 'Home'      },
  { href: '#about',     label: 'About'     },
  { href: '#services',  label: 'Services'  },
  { href: '#skills',    label: 'Skills'    },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#casestudy', label: 'Projects'  },
  { href: '#contact',   label: 'Contact'   },
]

const socials = [
  { icon: 'bx bxl-facebook',      href: '#', label: 'Facebook'  },
  { icon: 'bx bxl-twitter',       href: '#', label: 'Twitter'   },
  { icon: 'bx bxl-instagram-alt', href: '#', label: 'Instagram' },
  { icon: 'fab fa-github',        href: '#', label: 'GitHub'    },
  { icon: 'bx bxl-linkedin',      href: '#', label: 'LinkedIn'  },
]

const services = [
  'Web Development',
  'Website Maintenance',
  'Web Design',
  'UI/UX Design',
  'Backend Development',
]

export default function Footer() {
  const handleBackToTop = (event) => {
    event.preventDefault()
    const target = document.getElementById('home')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.shimmer} />

      <div className={styles.top}>
        {/* Brand */}
        <div className={styles.brand}>
          <AnimatedLogo size="md" />
          <p className={styles.tagline}>
            Building beautiful, functional web experiences from Yaoundé, Cameroon.
            Open to freelance and full time opportunities.
          </p>
          <div className={styles.socials}>
            {socials.map(s => (
              <a key={s.label} href={s.href} aria-label={s.label} className={styles.socialIcon}>
                <Icon name={s.icon} className={styles.socialIconSvg} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Quick Links</h4>
          <ul className={styles.list}>
            {navLinks.map(l => (
              <li key={l.href}>
                <a href={l.href} className={styles.link}>
                  <Icon name="bx bx-chevron-right" className={styles.linkIcon} /> {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Services</h4>
          <ul className={styles.list}>
            {services.map(s => (
              <li key={s}>
                <span className={styles.link}>
                  <Icon name="bx bx-chevron-right" className={styles.linkIcon} /> {s}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact blurb */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Get In Touch</h4>
          <div className={styles.contactItems}>
            {[
              { icon: 'bx bx-map',      val: 'Yaoundé, Cameroon'  },
              { icon: 'bx bx-envelope', val: 'akongsehklose@gmail.com'  },
              { icon: 'bx bx-phone',    val: '+237 671313884'   },
            ].map(c => (
              <div key={c.icon} className={styles.contactItem}>
                <Icon name={c.icon} className={styles.contactIcon} />
                <span>{c.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p className={styles.copy}>
          © {new Date().getFullYear()} <span>Akongseh Klose</span>. All rights reserved.
        </p>
        <p className={styles.made}>
          Made with <span>♥</span> in Cameroon
        </p>
        <motion.a
          href="#home"
          className={styles.topBtn}
          aria-label="Back to top"
          onClick={handleBackToTop}
          whileHover={{ y: -4, boxShadow: '0 0 2rem rgba(101,198,183,0.5)' }}
          transition={{ duration: 0.3 }}
        >
          <Icon name="bx bx-up-arrow-alt" className={styles.topBtnIcon} />
        </motion.a>
      </div>
    </footer>
  )
}
