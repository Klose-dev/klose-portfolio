import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import MagneticButton from './MagneticButton'
import Icon from './Icon'
import { useLanguage } from '../context/LanguageContext'
import styles from './Contact.module.css'

const whatsappNumber = '237671313884'

const fields = [
  { name: 'name',    labelKey: 'fullName',     type: 'text',  icon: 'bx bx-user',     half: true  },
  { name: 'email',   labelKey: 'emailAddress', type: 'email', icon: 'bx bx-envelope', half: true  },
  { name: 'phone',   labelKey: 'phoneNumber',  type: 'tel',   icon: 'bx bx-phone',    half: true  },
  { name: 'subject', labelKey: 'subject',      type: 'text',  icon: 'bx bx-book-alt', half: true  },
  { name: 'message', labelKey: 'message',      type: 'area',  icon: 'bx bx-message',  half: false },
]

const contactInfo = [
  { icon: 'bx bx-map',         labelKey: 'location',   val: 'Yaoundé, Cameroon'    },
  { icon: 'bx bx-envelope',    labelKey: 'email',      val: 'akongsehklose22@gmail.com'    },
  { icon: 'fab fa-whatsapp',   labelKey: 'whatsapp',   val: '+237 671 313 884'     },
]

export default function Contact() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [form, setForm]     = useState({})
  const [sent, setSent]     = useState(false)
  const [error, setError]   = useState('')
  const { t } = useLanguage()

  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()

    const name = (form.name || '').trim()
    const email = (form.email || '').trim()
    const phone = (form.phone || '').trim()
    const subject = (form.subject || '').trim()
    const message = (form.message || '').trim()

    if (!name || !email || !phone || !subject || !message) {
      setError(true)
      return
    }

    setError(false)

    const text = [
      `${t('contact.messageIntro')} ${name}`,
      `${t('contact.email')}: ${email}`,
      `${t('contact.phoneNumber')}: ${phone}`,
      `${t('contact.subject')}: ${subject}`,
      '',
      message,
    ].join('\n')

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')

    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <section className={styles.section} id="contact" ref={ref}>
      <h2 className="heading">
        {t('contact.heading')} <span>{t('contact.accent')}</span>
      </h2>

      <div className={styles.container}>
        {/* Info */}
        <motion.div
          className={styles.info}
          initial={{ x: -60, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h3 className={styles.infoTitle}>{t('contact.title')}</h3>
          <p className={styles.infoDesc}>
            {t('contact.description')}
          </p>

          <div className={styles.infoCards}>
            {contactInfo.map(c => (
              <div key={c.labelKey} className={styles.infoCard}>
                <div className={styles.infoIcon}>
                  <Icon name={c.icon} className={styles.infoIconInner} />
                </div>
                <div>
                  <div className={styles.infoLabel}>{t(`contact.${c.labelKey}`)}</div>
                  <div className={styles.infoVal}>{c.val}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          className={styles.form}
          onSubmit={onSubmit}
          initial={{ x: 60, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <div className={styles.grid}>
            {fields.map(f => (
              <div key={f.name} className={`${styles.field} ${f.half ? styles.half : styles.full}`}>
                <label className={styles.label} htmlFor={f.name}>
                  <Icon name={f.icon} className={styles.labelIcon} /> {t(`contact.${f.labelKey}`)}
                </label>
                {f.type === 'area' ? (
                  <textarea
                    id={f.name}
                    name={f.name}
                    rows={5}
                    className={styles.input}
                    placeholder={t(`contact.${f.labelKey}`)}
                    onChange={onChange}
                    required
                  />
                ) : (
                  <input
                    id={f.name}
                    name={f.name}
                    type={f.type}
                    className={styles.input}
                    placeholder={t(`contact.${f.labelKey}`)}
                    onChange={onChange}
                    required
                  />
                )}
              </div>
            ))}
          </div>

          <div className={styles.submitRow}>
            <MagneticButton variant="solid">
              {sent ? <><Icon name="bx bx-check-circle" className={styles.buttonIcon} /> {t('contact.sent')}</> : <><Icon name="bx bx-send" className={styles.buttonIcon} /> {t('contact.send')}</>}
            </MagneticButton>
          </div>

          {error && (
          <p className={styles.formError}>{t('contact.error')}</p>
          )}

          <p className={styles.formHint}>
            {t('contact.hint')}
          </p>
        </motion.form>
      </div>
    </section>
  )
}
