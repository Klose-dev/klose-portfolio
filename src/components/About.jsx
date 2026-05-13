import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import TextGenerateEffect from './TextGenerateEffect'
import MagneticButton from './MagneticButton'
import Icon from './Icon'
import styles from './About.module.css'

const fadeIn = (dir = 'left', delay = 0) => ({
  hidden: { x: dir === 'left' ? -60 : 60, opacity: 0 },
  show:   { x: 0, opacity: 1, transition: { duration: 0.8, delay, ease: 'easeOut' } },
})

export default function About() {
  const ref   = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className={styles.about} id="about" ref={ref}>
      <h2 className="heading">
        About <span>Me</span>
      </h2>

      <div className={styles.container}>
        {/* Image */}
        <motion.div
          className={styles.imgWrap}
          variants={fadeIn('left')}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          <div className={styles.imgBox}>
            <img src="/images/klose_ab.png" alt="Klose ab" onError={e => { e.target.style.display='none' }} />
            <div className={styles.imgOverlay} />
          </div>
          <div className={styles.expBadge}>
            <span className={styles.expNum}>2+</span>
            <span className={styles.expLabel}>Years<br />Experience</span>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          className={styles.content}
          variants={fadeIn('right', 0.2)}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          <div className={styles.tag}>Full Stack Developer</div>

          {inView && (
            <TextGenerateEffect
              words="I am Akongseh Klose, a passionate software engineering student who loves transforming ideas into elegant, functional web experiences."
              duration={0.4}
              filter={true}
            />
          )}

          <p className={styles.bio}>
            With a strong foundation in both front end and backend development,
            I craft digital products that are not only visually stunning but also
            performant and user centric. I am constantly learning, building, and
            pushing boundaries in the world of web development.
          </p>

          <div className={styles.info}>
            {[
              { label: 'Name',       val: 'Akongseh Klose' },
              { label: 'Date of Birth', val: 'September,22 2004' },
              { label: 'Location',   val: 'Yaoundé, Cameroon' },
              { label: 'Email',      val: 'akongsehklose@gmail.com' },
              { label: 'Phone',      val: '+237 671313884' },
              { label: 'Freelance',  val: 'Available' },
            ].map(({ label, val }) => (
              <div key={label} className={styles.infoItem}>
                <span className={styles.infoLabel}>{label}:</span>
                <span className={styles.infoVal}>{val}</span>
              </div>
            ))}
          </div>

          <MagneticButton variant="solid">
            <Icon name="bx bx-download" className={styles.buttonIcon} /> Download CV
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  )
}
