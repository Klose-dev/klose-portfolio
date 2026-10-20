import { motion } from 'framer-motion'
import AnimatedLogo from './AnimatedLogo'
import Icon from './Icon'
import { useLanguage } from '../context/LanguageContext'
import styles from './Footer.module.css'

const navLinks = [
  { href: '#home',      key: 'home'      },
  { href: '#about',     key: 'about'     },
  { href: '#services',  key: 'services'  },
  { href: '#skills',    key: 'skills'    },
  { href: '#portfolio', key: 'portfolio' },
  { href: '#casestudy', key: 'projects'  },
  { href: '#contact',   key: 'contact'   },
]

const socials = [
  { icon: 'bx bxl-facebook',      href: '#', label: 'Facebook'  },
  { icon: 'bx bxl-twitter',       href: '#', label: 'Twitter'   },
  { icon: 'bx bxl-instagram-alt', href: '#', label: 'Instagram' },
  { icon: 'fab fa-github',        href: '#', label: 'GitHub'    },
  { icon: 'bx bxl-linkedin',      href: '#', label: 'LinkedIn'  },
]

export default function Footer() {
  const { t, labels } = useLanguage()
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
            {t('footer.tagline')}
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
          <h4 className={styles.colTitle}>{t('footer.quickLinks')}</h4>
          <ul className={styles.list}>
            {navLinks.map(l => (
              <li key={l.href}>
                <a href={l.href} className={styles.link}>
                  <Icon name="bx bx-chevron-right" className={styles.linkIcon} /> {labels[l.key]}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>{t('footer.services')}</h4>
          <ul className={styles.list}>
            {t('footer.serviceList').map((service, index) => (
              <li key={index}>
                <span className={styles.link}>
                  <Icon name="bx bx-chevron-right" className={styles.linkIcon} /> {service}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact blurb */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>{t('footer.getInTouch')}</h4>
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
          © {new Date().getFullYear()} <span>Akongseh Klose</span>. {t('footer.rights')}
        </p>
        <motion.a
          href="#home"
          className={styles.topBtn}
          aria-label={t('footer.backToTop')}
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
