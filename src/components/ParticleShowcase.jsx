import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import styles from './ParticleShowcase.module.css'

const PARTICLE_COUNT = 2200
const SLIDE_DURATION = 6500
const TRANSITION_DURATION = 1400
const SAMPLE_GAP = 2
const CUBE_DIVISIONS = 5
const CUBE_SEGMENT_PARTICLES = 32

function createNodeCubeParticles() {
  const points = []
  const grid = Array.from({ length: CUBE_DIVISIONS + 1 }, (_, index) => (
    -1 + (2 * index) / CUBE_DIVISIONS
  ))

  for (let axis = 0; axis < 3; axis += 1) {
    const fixedAxes = [0, 1, 2].filter(index => index !== axis)
    for (const first of grid) {
      for (const second of grid) {
        for (let step = 0; step < CUBE_SEGMENT_PARTICLES; step += 1) {
          const point = [0, 0, 0]
          point[fixedAxes[0]] = first
          point[fixedAxes[1]] = second
          point[axis] = -1 + (2 * step) / (CUBE_SEGMENT_PARTICLES - 1)
          points.push({
            position: point,
              isNode: step === CUBE_SEGMENT_PARTICLES - 1
                || step % (CUBE_SEGMENT_PARTICLES / CUBE_DIVISIONS) === 0,
          })
        }
      }
    }
  }

  return points
}

const nodeCubeParticles = createNodeCubeParticles()

const slides = [
  { type: 'text', key: 'name', text: 'AKONGSEH KLOSE' },
  { type: 'shape', key: 'nodeCube' },
  { type: 'text', key: 'frontendDeveloper', text: 'FRONTEND DEVELOPER' },
  { type: 'shape', key: 'react' },
  { type: 'text', key: 'backendDeveloper', text: 'BACKEND DEVELOPER' },
  { type: 'shape', key: 'chip' },
  { type: 'text', key: 'fullStack', text: 'FULL STACK' },
  { type: 'shape', key: 'database' },
  { type: 'text', key: 'developer', text: 'DEVELOPER' },
  { type: 'shape', key: 'laptop' },
  { type: 'text', key: 'designer', text: 'DESIGNER' },
  { type: 'text', key: 'drummer', text: 'DRUMMER' },
]

function drawShape(context, width, height, shape) {
  context.clearRect(0, 0, width, height)
  context.fillStyle = '#fff'
  context.strokeStyle = '#fff'
  context.lineWidth = Math.max(6, Math.min(width, height) * 0.024)
  context.lineCap = 'round'
  context.lineJoin = 'round'

  if (shape === 'nodeCube') {
    return
  }

  if (shape === 'react') {
    const centerX = width / 2
    const centerY = height * 0.48
    const radius = Math.min(width * 0.16, height * 0.34, 105)

    for (let index = 0; index < 3; index += 1) {
      context.beginPath()
      context.ellipse(centerX, centerY, radius, radius * 0.38, (index * Math.PI) / 3, 0, Math.PI * 2)
      context.stroke()
    }
    context.beginPath()
    context.arc(centerX, centerY, Math.max(7, radius * 0.1), 0, Math.PI * 2)
    context.fill()
    return
  }

  if (shape === 'chip') {
    const centerX = width / 2
    const centerY = height * 0.48
    const size = Math.min(width * 0.18, height * 0.36, 112)
    context.strokeRect(centerX - size, centerY - size * 0.72, size * 2, size * 1.44)
    context.strokeRect(centerX - size * 0.68, centerY - size * 0.48, size * 1.36, size * 0.96)

    for (let index = -2; index <= 2; index += 1) {
      const offset = (index * size) / 3
      context.beginPath()
      context.moveTo(centerX + offset, centerY - size * 0.72)
      context.lineTo(centerX + offset, centerY - size * 1.08)
      context.moveTo(centerX + offset, centerY + size * 0.72)
      context.lineTo(centerX + offset, centerY + size * 1.08)
      context.moveTo(centerX - size, centerY + offset * 0.72)
      context.lineTo(centerX - size * 1.35, centerY + offset * 0.72)
      context.moveTo(centerX + size, centerY + offset * 0.72)
      context.lineTo(centerX + size * 1.35, centerY + offset * 0.72)
      context.stroke()
    }
    return
  }

  if (shape === 'database') {
    const centerX = width / 2
    const centerY = height * 0.48
    const radiusX = Math.min(width * 0.16, 105)
    const radiusY = Math.min(height * 0.12, 38)
    const top = centerY - radiusY * 1.8
    const bottom = centerY + radiusY * 1.8
    context.beginPath()
    context.ellipse(centerX, top, radiusX, radiusY, 0, 0, Math.PI * 2)
    context.moveTo(centerX - radiusX, top)
    context.lineTo(centerX - radiusX, bottom)
    context.ellipse(centerX, bottom, radiusX, radiusY, 0, Math.PI, 0, true)
    context.moveTo(centerX + radiusX, top)
    context.lineTo(centerX + radiusX, bottom)
    context.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, Math.PI)
    context.stroke()
    return
  }

  const centerX = width / 2
  const centerY = height * 0.48
  const screenWidth = Math.min(width * 0.34, 235)
  const screenHeight = Math.min(height * 0.52, 165)
  const left = centerX - screenWidth / 2
  const top = centerY - screenHeight / 2

  context.beginPath()
  context.roundRect(left, top, screenWidth, screenHeight, 10)
  context.stroke()
  context.beginPath()
  context.moveTo(left - 20, top + screenHeight + 18)
  context.lineTo(left + screenWidth + 20, top + screenHeight + 18)
  context.lineTo(left + screenWidth, top + screenHeight + 34)
  context.lineTo(left, top + screenHeight + 34)
  context.closePath()
  context.stroke()
  context.beginPath()
  for (let index = 0; index < 4; index += 1) {
    const lineY = centerY - screenHeight * 0.2 + index * screenHeight * 0.13
    const lineStart = left + screenWidth * (0.14 + (index % 2) * 0.08)
    const lineEnd = lineStart + screenWidth * (index % 2 ? 0.5 : 0.68)
    context.moveTo(lineStart, lineY)
    context.lineTo(lineEnd, lineY)
  }
  context.stroke()
}

function createTarget(context, width, height, shape) {
  if (shape === 'nodeCube') {
    const project = createNodeCubeProjector(width, height, 0)
    return Array.from({ length: PARTICLE_COUNT }, (_, index) => {
      const particle = nodeCubeParticles[Math.floor(index * nodeCubeParticles.length / PARTICLE_COUNT)]
      return project(particle.position).point
    })
  }

  drawShape(context, width, height, shape)
  const pixels = context.getImageData(0, 0, width, height).data
  const points = []
  const edgeReach = SAMPLE_GAP * 3

  for (let y = 0; y < height; y += SAMPLE_GAP) {
    for (let x = 0; x < width; x += SAMPLE_GAP) {
      if (pixels[(y * width + x) * 4 + 3] <= 40) continue

      const isNearEdge = [
        [Math.max(0, x - edgeReach), y],
        [Math.min(width - 1, x + edgeReach), y],
        [x, Math.max(0, y - edgeReach)],
        [x, Math.min(height - 1, y + edgeReach)],
      ].some(([sampleX, sampleY]) => pixels[(sampleY * width + sampleX) * 4 + 3] <= 40)

      if (isNearEdge) points.push({ x, y })
    }
  }

  let seed = Array.from(shape).reduce((value, character) => (
    (value * 31 + character.charCodeAt(0)) >>> 0
  ), 7)
  const random = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0
    return seed / 4294967296
  }
  const selectedPoints = []
  const sampleCount = Math.min(PARTICLE_COUNT, points.length)
  for (let index = 0; index < sampleCount; index += 1) {
    const swapIndex = index + Math.floor(random() * (points.length - index))
    const point = points[index]
    points[index] = points[swapIndex]
    points[swapIndex] = point
    selectedPoints.push(points[index])
  }
  while (selectedPoints.length < PARTICLE_COUNT) {
    selectedPoints.push(
      selectedPoints[selectedPoints.length % sampleCount] || { x: width / 2, y: height / 2 },
    )
  }

  return selectedPoints
}

function createNodeCubeProjector(width, height, elapsed) {
  const yaw = elapsed * 0.00032
  const pitch = 0.48 + Math.sin(elapsed * 0.00021) * 0.12
  const roll = -0.16
  const cosYaw = Math.cos(yaw)
  const sinYaw = Math.sin(yaw)
  const cosPitch = Math.cos(pitch)
  const sinPitch = Math.sin(pitch)
  const cosRoll = Math.cos(roll)
  const sinRoll = Math.sin(roll)
  const scale = Math.min(width * 0.34, height * 0.43)

  return ([x, y, z]) => {
    const rotatedX = x * cosYaw + z * sinYaw
    const rotatedZ = -x * sinYaw + z * cosYaw
    const rotatedY = y * cosPitch - rotatedZ * sinPitch
    const pitchedZ = y * sinPitch + rotatedZ * cosPitch
    const finalX = rotatedX * cosRoll - rotatedY * sinRoll
    const finalY = rotatedX * sinRoll + rotatedY * cosRoll
    const perspective = 4.4 / (4.4 - pitchedZ)

    return {
      point: {
        x: width / 2 + finalX * scale * perspective,
        y: height / 2 + finalY * scale * perspective,
      },
      depth: pitchedZ,
    }
  }
}

export default function ParticleShowcase() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const { t } = useLanguage()
  const [activeSlideInstance, setActiveSlideInstance] = useState(0)
  const [completedSlideInstance, setCompletedSlideInstance] = useState(-1)
  const [outgoingText, setOutgoingText] = useState(null)
  const [isSectionVisible, setIsSectionVisible] = useState(false)
  const activeSlide = slides[activeSlideInstance % slides.length]

  useEffect(() => {
    const section = sectionRef.current
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!section || !canvas || !context) return undefined

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const shapeSlides = slides.filter(slide => slide.type === 'shape')
    const shapeTargetIndices = new Map(shapeSlides.map((slide, index) => [slide.key, index]))
    let width = 0
    let height = 0
    let targets = []
    let initialPoints = []
    let particles = []
    let frame = 0
    let isVisible = false
    let startedAt = 0
    let pausedAt = 0
    let particleColor = '#000000'
    let lastSlideInstance = -1
    let outgoingTextTimeout = 0

    const ease = progress => progress * progress * (3 - 2 * progress)
    const interpolate = (from, to, progress) => ({
      x: from.x + (to.x - from.x) * progress,
      y: from.y + (to.y - from.y) * progress,
    })

    const draw = timestamp => {
      frame = 0
      if (!isVisible || !targets.length) return

      if (!startedAt) startedAt = timestamp
      const elapsed = reducedMotion ? 0 : timestamp - startedAt
      const slideInstance = Math.floor(elapsed / SLIDE_DURATION)
      const slideIndex = slideInstance % slides.length
      const slide = slides[slideIndex]
      const previousSlide = slides[(slideIndex - 1 + slides.length) % slides.length]
      const phase = elapsed % SLIDE_DURATION
      const transitionProgress = Math.min(1, phase / TRANSITION_DURATION)
      const transitionEase = ease(transitionProgress)

      if (slideInstance !== lastSlideInstance) {
        lastSlideInstance = slideInstance
        setActiveSlideInstance(slideInstance)
        if (slide.type === 'shape' && previousSlide.type === 'text') {
          setOutgoingText({ text: previousSlide.text, instance: slideInstance })
          window.clearTimeout(outgoingTextTimeout)
          outgoingTextTimeout = window.setTimeout(() => {
            setOutgoingText(current => (
              current?.instance === slideInstance ? null : current
            ))
          }, 280)
        } else {
          setOutgoingText(null)
        }
      }

      context.clearRect(0, 0, width, height)
      if (slide.type === 'text') {
        if (phase < TRANSITION_DURATION) {
          const from = previousSlide.type === 'shape'
            ? targets[shapeTargetIndices.get(previousSlide.key)]
            : initialPoints
          context.fillStyle = particleColor
          for (let index = 0; index < PARTICLE_COUNT; index += 1) {
            const point = interpolate(from[index], initialPoints[index], transitionEase)
            const particle = particles[index]
            context.globalAlpha = particle.opacity * (1 - transitionEase)
            context.beginPath()
            context.arc(point.x, point.y, particle.radius, 0, Math.PI * 2)
            context.fill()
          }
          context.globalAlpha = 1
        }
        if (!reducedMotion) frame = window.requestAnimationFrame(draw)
        return
      }

      const shapeIndex = shapeTargetIndices.get(slide.key)
      const to = targets[shapeIndex]
      const previousShapeIndex = previousSlide.type === 'shape'
        ? shapeTargetIndices.get(previousSlide.key)
        : -1
      const from = previousShapeIndex >= 0 ? targets[previousShapeIndex] : initialPoints
      const isChangingShape = previousShapeIndex >= 0
      const isNodeCube = slide.key === 'nodeCube'
      const projectNodeCube = isNodeCube ? createNodeCubeProjector(width, height, elapsed) : null

      context.fillStyle = particleColor
      for (let index = 0; index < PARTICLE_COUNT; index += 1) {
        const projected = isNodeCube
          ? projectNodeCube(
              nodeCubeParticles[Math.floor(index * nodeCubeParticles.length / PARTICLE_COUNT)].position,
            )
          : { point: to[index], depth: 0 }
        let point = projected.point
        let alpha = 1
        if (phase < TRANSITION_DURATION) {
          if (isChangingShape && transitionProgress < 0.42) {
            const disperseProgress = ease(transitionProgress / 0.42)
            point = interpolate(from[index], initialPoints[index], disperseProgress)
            alpha = 1 - disperseProgress * 0.45
          } else {
            const gatherStart = isChangingShape ? 0.42 : 0
            const gatherProgress = ease((transitionProgress - gatherStart) / (1 - gatherStart))
            const gatherFrom = isChangingShape ? initialPoints[index] : from[index]
            point = interpolate(gatherFrom, projected.point, gatherProgress)
            alpha = isChangingShape ? 0.55 + gatherProgress * 0.45 : gatherProgress
          }
        }
        const particle = particles[index]

        const nodeIndex = Math.floor(index * nodeCubeParticles.length / PARTICLE_COUNT)
        const nodeBoost = isNodeCube && nodeCubeParticles[nodeIndex].isNode ? 1.4 : 1
        context.globalAlpha = Math.min(
          1,
          particle.opacity * alpha * (0.78 + (projected.depth + 1) * 0.12) * nodeBoost,
        )
        context.beginPath()
        context.arc(point.x, point.y, particle.radius * nodeBoost, 0, Math.PI * 2)
        context.fill()
      }
      context.globalAlpha = 1

      if (!reducedMotion) frame = window.requestAnimationFrame(draw)
    }

    const scheduleDraw = () => {
      if (isVisible && !frame) frame = window.requestAnimationFrame(draw)
    }

    const resize = () => {
      const bounds = canvas.getBoundingClientRect()
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      width = Math.max(1, Math.round(bounds.width))
      height = Math.max(1, Math.round(bounds.height))
      canvas.width = Math.round(width * pixelRatio)
      canvas.height = Math.round(height * pixelRatio)
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)

      const rootStyles = getComputedStyle(document.documentElement)
      particleColor = rootStyles.getPropertyValue('--primary-mid').trim() || '#000000'

      const mask = document.createElement('canvas')
      mask.width = width
      mask.height = height
      const maskContext = mask.getContext('2d', { willReadFrequently: true })
      targets = shapeSlides.map(slide => createTarget(maskContext, width, height, slide.key))
      initialPoints = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
      }))
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        radius: 1.8 + Math.random() * 0.5,
        opacity: 1,
      }))
      startedAt = 0
      scheduleDraw()
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(section)
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
      setIsSectionVisible(isVisible)
      if (isVisible) {
        if (pausedAt && startedAt) startedAt += performance.now() - pausedAt
        pausedAt = 0
        scheduleDraw()
      } else if (frame) {
        pausedAt = performance.now()
        window.cancelAnimationFrame(frame)
        frame = 0
      }
    }, { rootMargin: '100px' })
    const themeObserver = new MutationObserver(() => {
      const rootStyles = getComputedStyle(document.documentElement)
      particleColor = rootStyles.getPropertyValue('--primary-mid').trim() || '#000000'
      scheduleDraw()
    })
    themeObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] })
    visibilityObserver.observe(section)
    resize()

    return () => {
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      themeObserver.disconnect()
      window.clearTimeout(outgoingTextTimeout)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section className={styles.section} id="particle-showcase" ref={sectionRef}>
      <div className={styles.copy}>
        <p className={styles.eyebrow}>AKONGSEH KLOSE / CREATIVE DEVELOPER</p>
        <h2 className={styles.heading}>{t('particleShowcase.heading')}</h2>
        <p className={styles.description}>{t('particleShowcase.description')}</p>
      </div>
      <div className={styles.animationStage}>
        <canvas
          ref={canvasRef}
          className={styles.canvas}
          aria-hidden="true"
        />
        <div className={styles.typingStage} aria-live="polite" aria-atomic="true">
          {activeSlide.type === 'text' ? (
            <span
              key={activeSlideInstance}
              className={`${styles.typingText} ${completedSlideInstance === activeSlideInstance ? styles.typingComplete : ''}`}
              style={{
                '--typing-steps': activeSlide.text.length,
                '--typing-duration': `${Math.min(3.6, Math.max(1.7, activeSlide.text.length * 0.12))}s`,
                '--typing-delay': `${TRANSITION_DURATION}ms`,
                animationPlayState: isSectionVisible ? 'running' : 'paused',
              }}
              onAnimationEnd={() => setCompletedSlideInstance(activeSlideInstance)}
            >
              {activeSlide.text}
            </span>
          ) : outgoingText ? (
            <span key={outgoingText.instance} className={styles.outgoingText}>
              {outgoingText.text}
            </span>
          ) : null}
        </div>
      </div>
    </section>
  )
}
