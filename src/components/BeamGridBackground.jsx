import React, { useEffect, useRef, useState } from 'react'

export default function BeamGridBackground({
  gridSize = 40,
  gridColor = '#e5e7eb',
  darkGridColor = '#27272a',
  beamColor = 'rgba(0, 180, 255, 0.8)',
  darkBeamColor = 'rgba(0, 255, 255, 0.8)',
  beamSpeed = 0.1,
  beamThickness = 3,
  beamGlow = true,
  glowIntensity = 50,
  beamCount = 8,
  extraBeamCount = 3,
  idleSpeed = 1.15,
  interactive = true,
  asBackground = true,
  className = '',
  children,
  showFade = true,
  fadeIntensity = 20,
  ...props
}) {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const bgCanvasRef = useRef(null)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const mouseRef = useRef({ x: 0, y: 0 })
  const lastMouseMoveRef = useRef(Date.now())

  useEffect(() => {
    const updateDarkMode = () => {
      const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches
      setIsDarkMode(document.documentElement.classList.contains('dark') || prefersDark)
    }

    updateDarkMode()
    const observer = new MutationObserver(() => updateDarkMode())
    observer.observe(document.documentElement, { attributes: true })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1

      canvas.width = Math.max(1, Math.floor(rect.width * dpr))
      canvas.height = Math.max(1, Math.floor(rect.height * dpr))
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      if (!bgCanvasRef.current) {
        bgCanvasRef.current = document.createElement('canvas')
      }

      const bgCanvas = bgCanvasRef.current
      bgCanvas.width = canvas.width
      bgCanvas.height = canvas.height
      const bgCtx = bgCanvas.getContext('2d')
      if (!bgCtx) return
      bgCtx.setTransform(dpr, 0, 0, dpr, 0, 0)

      bgCtx.clearRect(0, 0, rect.width, rect.height)
      bgCtx.strokeStyle = isDarkMode ? darkGridColor : gridColor
      bgCtx.lineWidth = 1
      bgCtx.beginPath()
      for (let x = 0; x <= rect.width; x += gridSize) {
        bgCtx.moveTo(x, 0)
        bgCtx.lineTo(x, rect.height)
      }
      for (let y = 0; y <= rect.height; y += gridSize) {
        bgCtx.moveTo(0, y)
        bgCtx.lineTo(rect.width, y)
      }
      bgCtx.stroke()
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const rect = () => container.getBoundingClientRect()
    const cols = () => Math.max(1, Math.floor(rect().width / gridSize))
    const rows = () => Math.max(1, Math.floor(rect().height / gridSize))

    const primaryBeams = Array.from({ length: beamCount }).map(() => ({
      x: Math.floor(Math.random() * cols()),
      y: Math.floor(Math.random() * rows()),
      dir: Math.random() > 0.5 ? 'x' : 'y',
      offset: Math.random() * gridSize,
      speed: beamSpeed + Math.random() * 0.3,
      type: 'primary',
    }))

    const extraBeams = Array.from({ length: extraBeamCount }).map(() => ({
      x: Math.floor(Math.random() * cols()),
      y: Math.floor(Math.random() * rows()),
      dir: Math.random() > 0.5 ? 'x' : 'y',
      offset: Math.random() * gridSize,
      speed: beamSpeed * 0.5 + Math.random() * 0.1,
      type: 'extra',
    }))

    const allBeams = [...primaryBeams, ...extraBeams]

    const updateMouse = (e) => {
      const bounds = container.getBoundingClientRect()
      mouseRef.current.x = e.clientX - bounds.left
      mouseRef.current.y = e.clientY - bounds.top
      lastMouseMoveRef.current = Date.now()
    }

    if (interactive) window.addEventListener('mousemove', updateMouse)

    let animationFrameId

    const draw = () => {
      const bounds = rect()
      const width = bounds.width
      const height = bounds.height
      const bgCanvas = bgCanvasRef.current
      const bgCtx = bgCanvas?.getContext('2d')

      if (!bgCanvas || !bgCtx) {
        animationFrameId = requestAnimationFrame(draw)
        return
      }

      ctx.clearRect(0, 0, width, height)
      ctx.drawImage(bgCanvas, 0, 0, width, height)

      const activeBeamColor = isDarkMode ? darkBeamColor : beamColor
      const now = Date.now()
      const idle = now - lastMouseMoveRef.current > 2000

      allBeams.forEach((beam) => {
        ctx.strokeStyle = activeBeamColor
        ctx.lineWidth = beam.type === 'extra' ? beamThickness * 0.75 : beamThickness
        ctx.shadowBlur = beamGlow ? glowIntensity : 0
        ctx.shadowColor = activeBeamColor

        const beamLength = gridSize * 1.5
        ctx.beginPath()

        if (beam.dir === 'x') {
          const y = beam.y * gridSize
          const start = -beamLength + (beam.offset % (width + beamLength))
          ctx.moveTo(start, y)
          ctx.lineTo(start + beamLength, y)
          beam.offset += (idle ? beam.speed * idleSpeed : beam.speed) * 60 * 0.016
          if (beam.offset > width + beamLength) beam.offset = -beamLength
        } else {
          const x = beam.x * gridSize
          const start = -beamLength + (beam.offset % (height + beamLength))
          ctx.moveTo(x, start)
          ctx.lineTo(x, start + beamLength)
          beam.offset += (idle ? beam.speed * idleSpeed : beam.speed) * 60 * 0.016
          if (beam.offset > height + beamLength) beam.offset = -beamLength
        }

        ctx.stroke()
      })

      ctx.shadowBlur = 0

      if (interactive && !idle) {
        const targetX = mouseRef.current.x
        const targetY = mouseRef.current.y
        const centerGx = Math.floor(targetX / gridSize) * gridSize
        const centerGy = Math.floor(targetY / gridSize) * gridSize

        const highlights = [
          { radius: 0, lineWidth: beamThickness * 3, glowFactor: 3 },
          { radius: 1, lineWidth: beamThickness * 1.5, glowFactor: 1.5 },
          { radius: 2, lineWidth: beamThickness * 0.75, glowFactor: 0.75 },
        ]

        highlights.forEach(({ radius, lineWidth, glowFactor }) => {
          ctx.strokeStyle = activeBeamColor
          ctx.lineWidth = lineWidth
          ctx.shadowBlur = glowIntensity * glowFactor
          ctx.shadowColor = activeBeamColor

          for (let dx = -radius; dx <= radius; dx++) {
            for (let dy = -radius; dy <= radius; dy++) {
              if (radius === 1 && Math.abs(dx) === 0 && Math.abs(dy) === 0) continue
              if (radius === 2 && Math.abs(dx) <= 1 && Math.abs(dy) <= 1) continue

              const cellX = centerGx + dx * gridSize
              const cellY = centerGy + dy * gridSize

              if (cellX >= 0 && cellX < width && cellY >= 0 && cellY < height) {
                ctx.beginPath()
                ctx.rect(cellX, cellY, gridSize, gridSize)
                ctx.stroke()
              }
            }
          }
        })
      }

      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      if (interactive) window.removeEventListener('mousemove', updateMouse)
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [
    gridSize,
    gridColor,
    darkGridColor,
    beamColor,
    darkBeamColor,
    beamSpeed,
    beamThickness,
    beamGlow,
    glowIntensity,
    beamCount,
    extraBeamCount,
    idleSpeed,
    interactive,
    isDarkMode,
  ])

  return (
    <div
      ref={containerRef}
      className={className}
      {...props}
      style={{
        position: asBackground ? 'absolute' : 'relative',
        top: asBackground ? 0 : undefined,
        left: asBackground ? 0 : undefined,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        ...(props.style || {}),
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      {showFade && (
        <div
          style={{
            pointerEvents: 'none',
            position: 'absolute',
            inset: 0,
            background: isDarkMode ? 'black' : 'white',
            opacity: 0.12,
            maskImage: `radial-gradient(ellipse at center, transparent ${fadeIntensity}%, black)`,
            WebkitMaskImage: `radial-gradient(ellipse at center, transparent ${fadeIntensity}%, black)`,
          }}
        />
      )}
      {!asBackground && (
        <div style={{ position: 'relative', zIndex: 1, width: '100%', height: '100%' }}>
          {children}
        </div>
      )}
    </div>
  )
}
