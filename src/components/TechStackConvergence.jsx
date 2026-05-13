import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import { SiPhp, SiMysql, SiLaravel, SiJavascript, SiHtml5, SiReact, SiGit, SiVite } from 'react-icons/si'
import { FaPython } from 'react-icons/fa'
import { BiMobile } from 'react-icons/bi'
import AnimatedLogo from './AnimatedLogo'
import styles from './TechStackConvergence.module.css'

const TECH_NODES = [
  { icon: <SiPhp         className={styles.techIcon} style={{color:'var(--text-color)'}} />, label:'PHP'           },
  { icon: <SiMysql       className={styles.techIcon} style={{color:'var(--text-color)'}} />, label:'MySQL'         },
  { icon: <SiLaravel     className={styles.techIcon} style={{color:'var(--text-color)'}} />, label:'Laravel'       },
  { icon: <SiJavascript  className={styles.techIcon} style={{color:'var(--text-color)'}} />, label:'JavaScript'    },
  { icon: <SiHtml5       className={styles.techIcon} style={{color:'var(--text-color)'}} />, label:'HTML5'         },
  { icon: <FaPython      className={styles.techIcon} style={{color:'var(--text-color)'}} />, label:'Python'        },
  { icon: <SiReact       className={styles.techIcon} style={{color:'var(--text-color)'}} />, label:'React JS'      },
  { icon: <BiMobile      className={styles.techIcon} style={{color:'var(--text-color)'}} />, label:'React Native'  },
]

const EXTRA_CHIPS = [
  { icon: <SiGit    style={{color:'var(--text-color)'}} />, label:'Git'          },
  { icon: <SiVite   style={{color:'var(--text-color)'}} />, label:'Vite'         },
]

export default function TechStackConvergence() {
  const sectionRef   = useRef(null)
  const canvasRef    = useRef(null)
  const iconRefs     = useRef([])
  const receiverRef  = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(Boolean(entry?.isIntersecting))
      },
      { root: null, threshold: 0.18, rootMargin: '120px 0px' }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const container = canvasRef.current
    if (!container) return

    let w = container.clientWidth
    let h = container.clientHeight

    const params = {
      curveLength:   58,
      straightLength:58,
      lineCount:     TECH_NODES.length,
      spreadHeight:  42,
      spreadDepth:   0,
      curvePower:    0.9,
      lineOpacity:   0.35,
      signalCount:   10,
      speedGlobal:   0.35,
      trailLength:   5,
    }

    const segCount  = 60
    const scene     = new THREE.Scene()
    const camera    = new THREE.PerspectiveCamera(45, w / h, 1, 1000)
    camera.position.set(0, 0, 100)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(devicePixelRatio, w < 768 ? 1 : 1.25))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    function getPoint(t, lineIdx) {
      const total   = params.curveLength + params.straightLength
      const curX    = -params.curveLength + t * total
      const spread  = (lineIdx / (params.lineCount - 1) - 0.5) * 2
      let y = 0, z = 0
      if (curX < 0) {
        const ratio   = (curX + params.curveLength) / params.curveLength
        let shape     = (Math.cos(ratio * Math.PI) + 1) / 2
        shape         = Math.pow(shape, params.curvePower)
        y             = spread * params.spreadHeight * shape
        z             = spread * params.spreadDepth  * shape
      }
      return new THREE.Vector3(curX, y, z)
    }

    const bgMat = new THREE.LineBasicMaterial({
      color: '#555555', transparent: true, opacity: params.lineOpacity, depthWrite: false,
    })
    const sigMat = new THREE.LineBasicMaterial({
      vertexColors: true, blending: THREE.AdditiveBlending, depthWrite: false, depthTest: false, transparent: true,
    })

    const c1 = new THREE.Color('#444444')
    const c2 = new THREE.Color('#888888')
    const c3 = new THREE.Color('#dddddd')
    const pickColor = () => [c1, c2, c3][Math.floor(Math.random() * 3)]

    const bgLines = []
    const signals = []

    for (let i = 0; i < params.lineCount; i++) {
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(segCount * 3), 3))
      const line = new THREE.Line(geo, bgMat)
      line.userData.id = i
      scene.add(line)
      bgLines.push(line)
    }

    const createSignal = () => {
      const maxTrail = 150
      const geo      = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(maxTrail * 3), 3))
      geo.setAttribute('color',    new THREE.BufferAttribute(new Float32Array(maxTrail * 3), 3))
      const mesh = new THREE.Line(geo, sigMat)
      mesh.frustumCulled = false
      scene.add(mesh)
      signals.push({
        mesh, laneIndex: Math.floor(Math.random() * params.lineCount),
        speed: 0.2 + Math.random() * 0.5, progress: Math.random(),
        history: [], assignedColor: pickColor(),
      })
    }
    for (let i = 0; i < params.signalCount; i++) createSignal()

    let raf
    const animate = () => {
      raf = requestAnimationFrame(animate)

      bgLines.forEach(line => {
        const pos = line.geometry.attributes.position.array
        for (let j = 0; j < segCount; j++) {
          const v = getPoint(j / (segCount - 1), line.userData.id)
          pos[j*3]=v.x; pos[j*3+1]=v.y; pos[j*3+2]=v.z
        }
        line.geometry.attributes.position.needsUpdate = true
      })

      signals.forEach(sig => {
        sig.progress += sig.speed * 0.005 * params.speedGlobal
        if (sig.progress > 1) {
          sig.progress    = 0
          sig.laneIndex   = Math.floor(Math.random() * params.lineCount)
          sig.history     = []
          sig.assignedColor = pickColor()
        }
        sig.history.push(getPoint(sig.progress, sig.laneIndex))
        if (sig.history.length > params.trailLength + 1) sig.history.shift()

        const pos    = sig.mesh.geometry.attributes.position.array
        const cols   = sig.mesh.geometry.attributes.color.array
        const draw   = Math.max(1, params.trailLength)
        const len    = sig.history.length
        for (let i = 0; i < draw; i++) {
          const idx  = Math.max(0, len - 1 - i)
          const p    = sig.history[idx] || new THREE.Vector3()
          pos[i*3]=p.x; pos[i*3+1]=p.y; pos[i*3+2]=p.z
          const a    = Math.max(0, 1 - i / params.trailLength)
          cols[i*3]  = sig.assignedColor.r * a
          cols[i*3+1]= sig.assignedColor.g * a
          cols[i*3+2]= sig.assignedColor.b * a
        }
        sig.mesh.geometry.setDrawRange(0, draw)
        sig.mesh.geometry.attributes.position.needsUpdate = true
        sig.mesh.geometry.attributes.color.needsUpdate    = true
      })

      // Project DOM icon positions
      for (let i = 0; i < params.lineCount; i++) {
        const v = getPoint(0, i).project(camera)
        const x = (v.x * 0.5 + 0.5) * w
        const y = (-v.y * 0.5 + 0.5) * h
        const el = iconRefs.current[i]
        if (el) { el.style.left = `${x}px`; el.style.top = `${y}px` }
      }

      if (receiverRef.current) {
        const v = getPoint(1, 0).project(camera)
        const x = (v.x * 0.5 + 0.5) * w
        const y = (-v.y * 0.5 + 0.5) * h
        receiverRef.current.style.left = `${x}px`
        receiverRef.current.style.top  = `${y}px`
      }

      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      if (!container) return
      w = container.clientWidth; h = container.clientHeight
      camera.aspect = w / h; camera.updateProjectionMatrix()
      renderer.setSize(w, h)
      renderer.setPixelRatio(Math.min(devicePixelRatio, w < 768 ? 1 : 1.25))
      camera.position.set(0, 0, w < 768 ? 160 : 100)
    }
    window.addEventListener('resize', onResize)
    onResize()

    return () => {
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(raf)
      bgLines.forEach(l => l.geometry.dispose())
      bgMat.dispose()
      signals.forEach(s => s.mesh.geometry.dispose())
      sigMat.dispose()
      renderer.dispose()
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
    }
  }, [isVisible])

  return (
    <section className={styles.section} id="techstack" ref={sectionRef}>
      <motion.h2
        className="heading"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        My Tech <span>Stack</span>
      </motion.h2>

      <div className={styles.canvasWrap}>
        <div ref={canvasRef} className={styles.canvas} />

        {/* Floating tech icon nodes (left side) */}
        {TECH_NODES.map((node, i) => (
          <div
            key={i}
            ref={el => iconRefs.current[i] = el}
            className={styles.node}
          >
            {node.icon}
            <span className={styles.nodeLabel}>{node.label}</span>
          </div>
        ))}

        {/* Receiver ring (right side) */}
        <div ref={receiverRef} className={styles.receiver}>
          <svg className={styles.ringOuter} viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="48" fill="none" stroke="#888888" strokeWidth="0.5" strokeDasharray="4 6" />
          </svg>
          <svg className={styles.ringMid} viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="48" fill="none" stroke="#444444" strokeWidth="0.5" strokeDasharray="8 12" />
          </svg>
          <div className={styles.receiverCore}>
            <AnimatedLogo size="sm" />
          </div>
          <div className={styles.receiverDot} />
        </div>
      </div>

      {/* Extra chip row */}
      <motion.div
        className={styles.chips}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
      >
        {EXTRA_CHIPS.map(c => (
          <span key={c.label} className={styles.chip}>
            {c.icon} {c.label}
          </span>
        ))}
      </motion.div>
    </section>
  )
}
