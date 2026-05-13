import { useEffect, useId, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

export function SparkleParticles({
  className = '',
  maxParticleSize = 1.2,
  minParticleSize = null,
  baseDensity = 120,
  maxSpeed = 1,
  minMoveSpeed = null,
  maxOpacity = 1,
  customDirection = '',
  opacityAnimationSpeed = 3,
  minParticleOpacity = null,
  particleColor,
  enableParallax = false,
  enableHoverGrab = false,
  backgroundColor = 'transparent',
  userOptions = {},
  zIndexLevel = 1,
  clickEffect = true,
  hoverMode = 'grab',
  particleCount = 4,
  particleShape = 'circle',
  enableCollisions = false,
}) {
  const [isEngineReady, setIsEngineReady] = useState(false)
  const [activeColor, setActiveColor] = useState('#000000')
  const instanceId = useId()
  const hardwareThreads = typeof navigator !== 'undefined' ? navigator.hardwareConcurrency || 4 : 4

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    const isCoarsePointer = window.matchMedia?.('(pointer: coarse)')?.matches

    if (prefersReducedMotion || (isCoarsePointer && hardwareThreads <= 4)) {
      setIsEngineReady(false)
      return
    }

    const resolveThemeColor = () => {
      if (particleColor) return particleColor
      return document.documentElement.classList.contains('dark')
        ? '#ffffff'
        : '#000000'
    }

    setActiveColor(resolveThemeColor())

    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => {
      setIsEngineReady(true)
    })

    const observer = new MutationObserver(() => {
      setActiveColor(resolveThemeColor())
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [particleColor])

  const mergedOptions = {
    background: {
      color: {
        value: backgroundColor,
      },
    },
    fullScreen: {
      enable: false,
      zIndex: zIndexLevel,
    },
    fpsLimit: 45,
    interactivity: {
      events: {
        onClick: {
          enable: clickEffect,
          mode: 'push',
        },
        onHover: {
          enable: enableHoverGrab,
          mode: hoverMode,
          parallax: {
            enable: enableParallax,
            force: 60,
            smooth: 10,
          },
        },
        resize: {
          enable: true,
        },
      },
      modes: {
        push: { quantity: particleCount },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: activeColor,
      },
      shape: {
        type: particleShape,
      },
      move: {
        enable: true,
        direction: customDirection === '' ? 'none' : customDirection,
        speed: {
          min: minMoveSpeed || maxSpeed / 130,
          max: maxSpeed,
        },
        straight: true,
      },
      collisions: {
        enable: enableCollisions,
        mode: 'bounce',
        bounce: {
          horizontal: { value: 1 },
          vertical: { value: 1 },
        },
      },
      number: {
        value: Math.min(baseDensity, hardwareThreads <= 4 ? 60 : 120),
      },
      opacity: {
        value: {
          min: minParticleOpacity || maxOpacity / 10,
          max: maxOpacity,
        },
        animation: {
          enable: true,
          sync: false,
          speed: opacityAnimationSpeed,
        },
      },
      size: {
        value: {
          min: minParticleSize || maxParticleSize / 1.5,
          max: maxParticleSize,
        },
      },
    },
    detectRetina: false,
    ...userOptions,
  }

  if (!isEngineReady) return null

  return (
    <Particles
      id={instanceId}
      options={mergedOptions}
      className={className}
    />
  )
}

export default SparkleParticles
