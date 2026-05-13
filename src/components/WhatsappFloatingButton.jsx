import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import Icon from './Icon'
import styles from './WhatsappFloatingButton.module.css'

export default function WhatsappFloatingButton() {
  const btnRef = useRef(null)

  useEffect(() => {
    const btn = btnRef.current
    if (!btn) return

    const onMove = (e) => {
      const { left, top, width, height } = btn.getBoundingClientRect()
      const x = e.clientX - (left + width / 2)
      const y = e.clientY - (top + height / 2)
      gsap.to(btn, { x: x * 0.35, y: y * 0.35, duration: 0.7, ease: 'power3.out' })
    }

    const onLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.3)' })
    }

    btn.addEventListener('mousemove', onMove)
    btn.addEventListener('mouseleave', onLeave)
    return () => {
      btn.removeEventListener('mousemove', onMove)
      btn.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <a
      ref={btnRef}
      href="#contact"
      className={styles.button}
      aria-label="Jump to contact form"
      title="Contact via WhatsApp"
    >
      <span className={styles.pulse} aria-hidden="true" />
      <Icon name="fab fa-whatsapp" className={styles.icon} />
      <span className={styles.label}>WhatsApp</span>
    </a>
  )
}
