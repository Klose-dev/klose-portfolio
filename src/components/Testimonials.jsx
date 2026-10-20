import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { useLanguage } from '../context/LanguageContext'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import styles from './Testimonials.module.css'

const testimonials = [
  {
    name: 'Mr Kanjo Elkamira',
    avatar: '/images/testi1.jpg',
    stars: 5,
  },
  {
    name: 'Mr. Yuven Carlson',
    avatar: '/images/testi2.jpg',
    stars: 4.5,
  },
  {
    name: 'DIGIMARK CONSULTING Team',
    avatar: '/images/testi3.jpg',
    stars: 4,
  },
  {
    name: 'Colleague Developer',
    avatar: '/images/testi4.jpg',
    stars: 5,
  },
]

export default function Testimonials() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { t } = useLanguage()
  const translatedEntries = t('testimonials.entries')

  return (
    <section className={styles.section} id="testimonials" ref={ref}>
      <h2 className="heading">
        {t('testimonials.heading')} <span>{t('testimonials.accent')}</span>
      </h2>

      <motion.div
        className={styles.swiperWrap}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            768:  { slidesPerView: 2 },
            1100: { slidesPerView: 3 },
          }}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false, stopOnLastSlide: false }}
          loop={true}
          className={styles.swiper}
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <div className={styles.card}>
                <div className={styles.stars}>
                  {'★'.repeat(t.stars)}
                </div>
                <p className={styles.text}>"{translatedEntries[i].text}"</p>
                <div className={styles.author}>
                  <div className={styles.avatar}>
                    <img
                      src={t.avatar}
                      alt={t.name}
                      onError={e => { e.target.style.display='none' }}
                    />
                    <span className={styles.avatarFallback}>
                      {t.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className={styles.name}>{t.name}</div>
                    <div className={styles.role}>{translatedEntries[i].role}</div>
                  </div>
                </div>
                <div className={styles.quoteIcon}>"</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </section>
  )
}
