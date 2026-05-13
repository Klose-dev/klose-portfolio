import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { cn } from '../lib/utils'
import styles from './FireShader.module.css'

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform float time;
  uniform vec2  resolution;
  uniform float timescale;
  uniform float scaleX;
  uniform float scaleY;
  varying vec2 vUv;

  float rand(vec2 n) {
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 ip = floor(p);
    vec2 u  = fract(p);
    u = u * u * (3.0 - 2.0 * u);
    float res =
      mix(mix(rand(ip), rand(ip + vec2(1,0)), u.x),
          mix(rand(ip + vec2(0,1)), rand(ip + vec2(1,1)), u.x), u.y);
    return res * res;
  }

  float fbm(vec2 p) {
    float f = 0.0, a = 0.5;
    for (int i = 0; i < 6; i++) {
      f += a * noise(p);
      p *= 2.03;
      a *= 0.5;
    }
    return f;
  }

  void main() {
    vec2 uv = vUv;
    float t  = time * timescale * 0.6;

    vec2 q = vec2(fbm(uv * scaleX + vec2(0.0, t)),
                  fbm(uv * scaleX + vec2(5.2, 1.3)));

    vec2 r = vec2(fbm(uv * scaleX + 4.0 * q + vec2(1.7 + 0.15 * t, 9.2)),
                  fbm(uv * scaleX + 4.0 * q + vec2(8.3,  2.8 + 0.126 * t)));

    float f = fbm(uv * scaleX * 0.8 + 4.0 * r + vec2(0.0, t * 0.5));

    /* height fade — fire dies at top */
    float heightFade = pow(max(0.0, 1.0 - uv.y * scaleY), 1.6);
    f *= heightFade;
    f  = clamp(f * 2.5, 0.0, 1.0);

    /* Monochrome palette */
    vec3 c0 = vec3(0.05,   0.05,  0.05);
    vec3 c1 = vec3(0.18,   0.18,  0.18);
    vec3 c2 = vec3(0.42,   0.42,  0.42);
    vec3 c3 = vec3(0.72,   0.72,  0.72);
    vec3 c4 = vec3(0.96,   0.96,  0.96);

    vec3 col = c0;
    col = mix(col, c1, smoothstep(0.0,  0.25, f));
    col = mix(col, c2, smoothstep(0.2,  0.5,  f));
    col = mix(col, c3, smoothstep(0.45, 0.75, f));
    col = mix(col, c4, smoothstep(0.7,  1.0,  f));

    float alpha = smoothstep(0.0, 0.2, f) * 0.92;
    gl_FragColor = vec4(col, alpha);
  }
`

export default function FireShader({
  timescale = 0.5,
  scaleX    = 1.4,
  scaleY    = 0.35,
  className,
}) {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    let w = mount.clientWidth
    let h = mount.clientHeight

    const scene    = new THREE.Scene()
    const camera   = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)

    const geo = new THREE.PlaneGeometry(2, 2)
    const mat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        time:       { value: 0 },
        resolution: { value: new THREE.Vector2(w, h) },
        timescale:  { value: timescale },
        scaleX:     { value: scaleX },
        scaleY:     { value: scaleY },
      },
      transparent: true,
    })

    scene.add(new THREE.Mesh(geo, mat))

    let raf
    const start = Date.now()
    const tick  = () => {
      raf = requestAnimationFrame(tick)
      mat.uniforms.time.value = (Date.now() - start) * 0.001
      renderer.render(scene, camera)
    }
    tick()

    const onResize = () => {
      w = mount.clientWidth
      h = mount.clientHeight
      renderer.setSize(w, h)
      mat.uniforms.resolution.value.set(w, h)
    }
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(raf)
      geo.dispose(); mat.dispose(); renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [timescale, scaleX, scaleY])

  return <div ref={mountRef} className={cn(styles.fire, className)} />
}
