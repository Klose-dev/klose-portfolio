import { useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import styles from './ThemeTransitionOverlay.module.css'

const TRANSITION_KEYFRAMES = {
  'fade-scale': `
    @keyframes themeFadeScale {
      0% { opacity: 0; transform: scale(0.9); }
      40% { opacity: 0.12; transform: scale(1.01); }
      100% { opacity: 0; transform: scale(1); }
    }
  `,
  'rotate-flip': `
    @keyframes themeRotateFlip {
      0% { opacity: 0; transform: rotateX(90deg) scale(0.8); }
      50% { opacity: 0.1; transform: rotateX(0deg) scale(1.02); }
      100% { opacity: 0; transform: rotateX(-90deg) scale(0.8); }
    }
  `,
  'slide-reveal': `
    @keyframes themeSlideReveal {
      0% { clip-path: inset(0 100% 0 0); }
      40% { clip-path: inset(0 0% 0 0); opacity: 0.15; }
      100% { clip-path: inset(0 0 0 100%); opacity: 0; }
    }
  `,
  'ripple-wave': `
    @keyframes themeRippleWave {
      0% { width: 0; height: 0; opacity: 0.35; }
      60% { opacity: 0.15; }
      100% { width: 300vmax; height: 300vmax; opacity: 0; }
    }
  `,
  'particle-burst': `
    @keyframes themeParticleBurst {
      0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
      30% { opacity: 0.8; }
      100% { transform: translate(-50%, -50%) scale(300); opacity: 0; }
    }
    @keyframes themeParticleBurstBg {
      0% { opacity: 0; }
      25% { opacity: 0.12; }
      100% { opacity: 0; }
    }
  `,
}

const TRANSITION_STYLES = {
  'fade-scale': (isDark) => ({
    animation: 'themeFadeScale 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
    background: isDark ? '#0a0a0a' : '#ffffff',
  }),
  'rotate-flip': (isDark) => ({
    animation: 'themeRotateFlip 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
    background: 'linear-gradient(135deg, var(--primary-mid) 0%, var(--primary-dark) 50%, var(--primary-mid) 100%)',
  }),
  'slide-reveal': (isDark) => ({
    animation: 'themeSlideReveal 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
    background: isDark ? '#0a0a0a' : '#ffffff',
    clipPath: 'inset(0 100% 0 0)',
  }),
  'ripple-wave': (isDark) => ({
    animation: 'themeRippleWave 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
    background: 'radial-gradient(circle at center, var(--primary-mid) 0%, var(--primary-dark) 60%, transparent 100%)',
    borderRadius: '50%',
    top: '50%',
    left: '50%',
    width: '0',
    height: '0',
    transform: 'translate(-50%, -50%)',
  }),
  'particle-burst': (isDark) => ({
    animation: 'themeParticleBurst 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
    background: 'var(--primary-mid)',
    borderRadius: '50%',
    top: '50%',
    left: '50%',
    width: '4px',
    height: '4px',
    transform: 'translate(-50%, -50%)',
    boxShadow: `
      0 0 0 0 var(--primary-mid),
      60px 60px 0 0 var(--primary-dark),
      -60px -60px 0 0 var(--primary-dark),
      60px -60px 0 0 var(--primary-mid),
      -60px 60px 0 0 var(--primary-mid),
      -60px 0 0 0 var(--primary-dark),
      60px 0 0 0 var(--primary-mid),
      0 -60px 0 0 var(--primary-dark),
      0 60px 0 0 var(--primary-mid)
    `,
  }),
}

export default function ThemeTransitionOverlay() {
  const { transitionStyle, isDark } = useTheme()

  useEffect(() => {
    const styleSheet = document.createElement('style')
    styleSheet.id = 'theme-transition-keyframes'
    styleSheet.textContent = TRANSITION_KEYFRAMES[transitionStyle] || ''
    document.head.appendChild(styleSheet)
    return () => document.head.removeChild(styleSheet)
  }, [transitionStyle])

  if (!transitionStyle) return null

  const baseStyle = {
    position: 'fixed',
    inset: 0,
    zIndex: 9997,
    pointerEvents: 'none',
    opacity: 0,
  }

  const style = TRANSITION_STYLES[transitionStyle]
    ? { ...baseStyle, ...TRANSITION_STYLES[transitionStyle](isDark) }
    : baseStyle

  if (transitionStyle === 'particle-burst') {
    return (
      <>
        <div
          className={styles.overlay}
          style={style}
          aria-hidden="true"
        />
        <div
          className={styles.overlayBg}
          style={{
            ...baseStyle,
            background: isDark ? '#0a0a0a' : '#ffffff',
            animation: 'themeParticleBurstBg 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
            opacity: 0,
          }}
          aria-hidden="true"
        />
      </>
    )
  }

  return (
    <div
      className={styles.overlay}
      style={style}
      aria-hidden="true"
    />
  )
}