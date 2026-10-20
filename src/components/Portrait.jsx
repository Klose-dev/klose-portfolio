import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Portrait({ src, alt, inView, className = '' }) {
  const imgRef = useRef(null)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && imgRef.current) {
          imgRef.current.src = src
          observer.unobserve(imgRef.current)
        }
      },
      { rootMargin: '100px' }
    )

    if (imgRef.current) observer.observe(imgRef.current)
    return () => observer.disconnect()
  }, [src])

  if (error || !src) {
    return (
      <motion.div
        className={`portrait-avatar ${className}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
        role="img"
        aria-label={alt}
      >
        <span className="avatar-initials">AK</span>
      </motion.div>
    )
  }

  return (
    <motion.figure
      className={`portrait-figure ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
      whileHover={{ rotateY: 3, rotateX: -2, scale: 1.01 }}
      transition={{ duration: 0.3 }}
      style={{ perspective: 1000 }}
    >
      <img
        ref={imgRef}
        data-src={src}
        alt={alt}
        className={`portrait-img ${loaded ? 'loaded' : ''}`}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        loading="lazy"
      />
      <figcaption className="visually-hidden">{alt}</figcaption>
    </motion.figure>
  )
}