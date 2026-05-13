import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import MagneticButton from './MagneticButton'
import Icon from './Icon'
import styles from './Contact.module.css'

const whatsappNumber = '237671313884'

const fields = [
  { name: 'name',    label: 'Full Name',     type: 'text',  icon: 'bx bx-user',     half: true  },
  { name: 'email',   label: 'Email Address', type: 'email', icon: 'bx bx-envelope', half: true  },
  { name: 'phone',   label: 'Phone Number',  type: 'tel',   icon: 'bx bx-phone',    half: true  },
  { name: 'subject', label: 'Subject',       type: 'text',  icon: 'bx bx-book-alt', half: true  },
  { name: 'message', label: 'Your Message',  type: 'area',  icon: 'bx bx-message',  half: false },
]

const contactInfo = [
  { icon: 'bx bx-map',         label: 'Location',   val: 'Yaoundé, Cameroon'    },
  { icon: 'bx bx-envelope',    label: 'Email',      val: 'akongsehklose22@gmail.com'    },
  { icon: 'fab fa-whatsapp',   label: 'WhatsApp',   val: '+237 671 313 884'     },
]

export default function Contact() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [form, setForm]     = useState({})
  const [sent, setSent]     = useState(false)
  const [error, setError]   = useState('')

  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()

    const name = (form.name || '').trim()
    const email = (form.email || '').trim()
    const phone = (form.phone || '').trim()
    const subject = (form.subject || '').trim()
    const message = (form.message || '').trim()

    if (!name || !email || !phone || !subject || !message) {
      setError('Please fill in all fields before sending.')
      return
    }

    setError('')

    const text = [
      `New portfolio message from ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Subject: ${subject}`,
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
        Contact <span>Me</span>
      </h2>

      <div className={styles.container}>
        {/* Info */}
        <motion.div
          className={styles.info}
          initial={{ x: -60, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h3 className={styles.infoTitle}>Let's work together</h3>
          <p className={styles.infoDesc}>
            Have a project in mind or want to discuss an opportunity?
            I'd love to hear from you. Drop me a message and I'll get back to you as soon as possible.
          </p>

          <div className={styles.infoCards}>
            {contactInfo.map(c => (
              <div key={c.label} className={styles.infoCard}>
                <div className={styles.infoIcon}>
                  <Icon name={c.icon} className={styles.infoIconInner} />
                </div>
                <div>
                  <div className={styles.infoLabel}>{c.label}</div>
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
                  <Icon name={f.icon} className={styles.labelIcon} /> {f.label}
                </label>
                {f.type === 'area' ? (
                  <textarea
                    id={f.name}
                    name={f.name}
                    rows={5}
                    className={styles.input}
                    placeholder={f.label}
                    onChange={onChange}
                    required
                  />
                ) : (
                  <input
                    id={f.name}
                    name={f.name}
                    type={f.type}
                    className={styles.input}
                    placeholder={f.label}
                    onChange={onChange}
                    required
                  />
                )}
              </div>
            ))}
          </div>

          <div className={styles.submitRow}>
            <MagneticButton variant="solid">
              {sent ? <><Icon name="bx bx-check-circle" className={styles.buttonIcon} /> Sent!</> : <><Icon name="bx bx-send" className={styles.buttonIcon} /> Send Message</>}
            </MagneticButton>
          </div>

          {error && (
            <p className={styles.formError}>{error}</p>
          )}

          <p className={styles.formHint}>
            Your message will open in WhatsApp and be sent to +237 671 313 884.
          </p>
        </motion.form>
      </div>
    </section>
  )
}
