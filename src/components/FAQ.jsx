import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Icon from './Icon'
import { useLanguage } from '../context/LanguageContext'
import styles from './FAQ.module.css'

export default function FAQ() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { t } = useLanguage()
  const [openIndex, setOpenIndex] = useState(null)

  const faqItems = t('faq.items')

  return (
    <section className={styles.faq} id="faq" ref={ref}>
      <motion.h2
        className="heading"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {t('faq.heading')}
      </motion.h2>

      <motion.div
        className={styles.grid}
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {faqItems.map((item, index) => (
          <motion.div
            key={index}
            className={styles.card}
            initial={{ y: 30, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.08 }}
          >
            <button
              className={styles.question}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              aria-expanded={openIndex === index}
            >
              <span className={styles.questionText}>{item.q}</span>
              <motion.div
                className={styles.iconWrap}
                animate={{ rotate: openIndex === index ? 45 : 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <Icon name="bx bx-plus" className={styles.icon} />
              </motion.div>
            </button>
            <motion.div
              className={styles.answer}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: openIndex === index ? 'auto' : 0, opacity: openIndex === index ? 1 : 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              style={{ overflow: 'hidden' }}
            >
              <p className={styles.answerText}>{item.a}</p>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}