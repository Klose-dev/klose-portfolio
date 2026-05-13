import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import styles from './Testimonials.module.css'

const testimonials = [
  {
    name: 'Mr Kanjo Elkamira',
    role: 'Field Supervisor YIBS',
    avatar: '/images/testi1.jpg',
    text: "Klose's ability to transform complex requirements into elegant, functional web solutions is remarkable. IdeaMarket is a testament to his technical skill and creative vision.",
    stars: 5,
  },
  {
    name: 'Mr. Yuven Carlson',
    role: 'Academic Supervisor YIBS',
    avatar: '/images/testi2.jpg',
    text: "An outstanding student whose dedication to software engineering goes beyond the classroom. His project demonstrates real world problem solving at an impressive level.",
    stars: 4.5,
  },
  {
    name: 'DIGIMARK CONSULTING Team',
    role: 'Internship Organization',
    avatar: '/images/testi3.jpg',
    text: "Klose integrated seamlessly into our team and delivered production quality code. His full stack knowledge and work ethic are exceptional for someone at his stage.",
    stars: 4,
  },
  {
    name: 'Colleague Developer',
    role: 'Peer at YIBS',
    avatar: '/images/testi4.jpg',
    text: "Working alongside Klose has been inspiring. His eye for design combined with strong backend knowledge makes him a truly full stack talent.",
    stars: 5,
  },
]

export default function Testimonials() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className={styles.section} id="testimonials" ref={ref}>
      <h2 className="heading">
        What People <span>Say</span>
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
                <p className={styles.text}>"{t.text}"</p>
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
                    <div className={styles.role}>{t.role}</div>
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
