import { useEffect, useRef } from 'react'
import createGlobe from 'cobe'
import { cn } from '../lib/utils'
import styles from './GlobeBackground.module.css'

const hexToRgbNormalized = (hex) => {
  let r = 0
  let g = 0
  let b = 0

  const cleanHex = hex.startsWith('#') ? hex.slice(1) : hex

  if (cleanHex.length === 3) {
    r = parseInt(cleanHex[0] + cleanHex[0], 16)
    g = parseInt(cleanHex[1] + cleanHex[1], 16)
    b = parseInt(cleanHex[2] + cleanHex[2], 16)
  } else if (cleanHex.length === 6) {
    r = parseInt(cleanHex.substring(0, 2), 16)
    g = parseInt(cleanHex.substring(2, 4), 16)
    b = parseInt(cleanHex.substring(4, 6), 16)
  } else {
    return [0, 0, 0]
  }

  return [r / 255, g / 255, b / 255]
}

export default function GlobeBackground({
  className,
  theta = 0.45,
  dark = 1,
  scale = 1.1,
  diffuse = 1.1,
  mapSamples = 16000,
  mapBrightness = 6,
  mapBaseBrightness = 0.08,
  baseColor = '#041f3d',
  markerColor = '#a5f3ff',
  glowColor = '#7dd3fc',
}) {
  const canvasRef = useRef(null)
  const globeRef = useRef(null)
  const phiRef = useRef(0)
  const thetaRef = useRef(theta)
  const isDragging = useRef(false)
  const lastMouseX = useRef(0)
  const lastMouseY = useRef(0)
  const autoRotateSpeed = 0.0175

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resolvedBaseColor = typeof baseColor === 'string'
      ? hexToRgbNormalized(baseColor)
      : baseColor || [0.043, 0.31, 0.54]

    const resolvedMarkerColor = typeof markerColor === 'string'
      ? hexToRgbNormalized(markerColor)
      : markerColor || [0.88, 0.95, 1]

    const resolvedGlowColor = typeof glowColor === 'string'
      ? hexToRgbNormalized(glowColor)
      : glowColor || [0.576, 0.804, 1]

    const initGlobe = () => {
      if (globeRef.current) {
        globeRef.current.destroy()
        globeRef.current = null
      }

      const rect = canvas.getBoundingClientRect()
      const devicePixelRatio = window.devicePixelRatio || 1
      const internalWidth = Math.max(1, Math.floor(rect.width * devicePixelRatio))
      const internalHeight = Math.max(1, Math.floor(rect.height * devicePixelRatio))

      canvas.width = internalWidth
      canvas.height = internalHeight
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`

      globeRef.current = createGlobe(canvas, {
        devicePixelRatio,
        width: internalWidth,
        height: internalHeight,
        phi: phiRef.current,
        theta: thetaRef.current,
        dark,
        scale,
        diffuse,
        mapSamples,
        mapBrightness,
        mapBaseBrightness,
        baseColor: resolvedBaseColor,
        markerColor: resolvedMarkerColor,
        glowColor: resolvedGlowColor,
        opacity: 1,
        offset: [0, 0],
        markers: [],
        onRender: (state) => {
          if (!isDragging.current) {
            phiRef.current += autoRotateSpeed
          }
          state.phi = phiRef.current
          state.theta = thetaRef.current
        },
      })
    }

    const onMouseDown = (e) => {
      isDragging.current = true
      lastMouseX.current = e.clientX
      lastMouseY.current = e.clientY
      canvas.style.cursor = 'grabbing'
    }

    const onMouseMove = (e) => {
      if (!isDragging.current) return

      const deltaX = e.clientX - lastMouseX.current
      const deltaY = e.clientY - lastMouseY.current
      const rotationSpeed = 0.005

      phiRef.current += deltaX * rotationSpeed
      thetaRef.current = Math.max(
        -Math.PI / 2,
        Math.min(Math.PI / 2, thetaRef.current - deltaY * rotationSpeed)
      )

      lastMouseX.current = e.clientX
      lastMouseY.current = e.clientY
    }

    const onMouseUp = () => {
      isDragging.current = false
      canvas.style.cursor = 'grab'
    }

    const onMouseLeave = () => {
      if (isDragging.current) {
        isDragging.current = false
        canvas.style.cursor = 'grab'
      }
    }

    initGlobe()
    canvas.addEventListener('mousedown', onMouseDown)
    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mouseup', onMouseUp)
    canvas.addEventListener('mouseleave', onMouseLeave)

    const handleResize = () => {
      initGlobe()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      canvas.removeEventListener('mousedown', onMouseDown)
      canvas.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mouseup', onMouseUp)
      canvas.removeEventListener('mouseleave', onMouseLeave)
      if (globeRef.current) {
        globeRef.current.destroy()
        globeRef.current = null
      }
    }
  }, [theta, dark, scale, diffuse, mapSamples, mapBrightness, mapBaseBrightness, baseColor, markerColor, glowColor])

  return (
    <div className={cn(styles.globeWrap, className)}>
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        style={{
          cursor: 'grab',
        }}
      />
    </div>
  )
}
