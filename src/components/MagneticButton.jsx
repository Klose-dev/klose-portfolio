import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { cn } from '../lib/utils'
import styles from './MagneticButton.module.css'

export default function MagneticButton({ children, className, onClick, variant = 'outline' }) {
  const btnRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const btn = btnRef.current
    const text = textRef.current
    if (!btn || !text) return

    const onMove = (e) => {
      const { left, top, width, height } = btn.getBoundingClientRect()
      const x = e.clientX - (left + width / 2)
      const y = e.clientY - (top + height / 2)
      gsap.to(btn,  { x: x * 0.35, y: y * 0.35, duration: 0.7, ease: 'power3.out' })
      gsap.to(text, { x: x * 0.12, y: y * 0.12, duration: 0.7, ease: 'power3.out' })
    }

    const onLeave = () => {
      gsap.to(btn,  { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.3)' })
      gsap.to(text, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.3)' })
    }

    btn.addEventListener('mousemove', onMove)
    btn.addEventListener('mouseleave', onLeave)
    return () => {
      btn.removeEventListener('mousemove', onMove)
      btn.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      className={cn(styles.btn, styles[variant], className)}
    >
      <span ref={textRef} className={styles.text}>
        {children}
      </span>
    </button>
  )
}
