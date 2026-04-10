import { useEffect, useRef } from 'react'

export default function MouseTrail() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf
    let w, h, dpr

    const resize = () => {
      dpr = window.devicePixelRatio || 1
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const mouse = { x: -300, y: -300 }
    const glow = { x: -300, y: -300 }
    let lastEmit = 0
    const particles = []
    const LIFE = 1200

    const getColor = (x) => {
      const t = Math.max(0, Math.min(1, x / w))
      if (t < 0.5) {
        const p = t * 2
        return [124 + (79 - 124) * p, 58 + (159 - 58) * p, 237 + (255 - 237) * p]
      }
      const p = (t - 0.5) * 2
      return [79 + (0 - 79) * p, 159 + (212 - 159) * p, 255]
    }

    const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY }
    const onLeave = () => { mouse.x = -300; mouse.y = -300 }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)

    const draw = (time) => {
      raf = requestAnimationFrame(draw)
      ctx.clearRect(0, 0, w, h)
      glow.x += (mouse.x - glow.x) * 0.1
      glow.y += (mouse.y - glow.y) * 0.1

      if (mouse.x > 0 && time - lastEmit > 20) {
        const color = getColor(mouse.x)
        particles.push({ x: mouse.x + (Math.random() - 0.5) * 4, y: mouse.y + (Math.random() - 0.5) * 4, vx: (Math.random() - 0.5) * 0.3, vy: -0.4 - Math.random() * 0.4, size: 12 + Math.random() * 8, born: time, r: color[0], g: color[1], b: color[2] })
        lastEmit = time
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        const age = time - p.born
        if (age > LIFE) { particles.splice(i, 1); continue }
        p.x += p.vx; p.y += p.vy
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        const age = time - p.born
        const t = age / LIFE
        const indexRatio = particles.length > 1 ? i / (particles.length - 1) : 1
        const cometScale = 0.4 + indexRatio * 0.6
        const cometAlpha = 0.3 + indexRatio * 0.7
        const ageFade = (1 - t) * (1 - t)
        const alpha = ageFade * cometAlpha * 0.7
        const size = p.size * cometScale * (1 - t * 0.2)
        if (alpha < 0.005) continue

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size)
        grad.addColorStop(0, `rgba(${p.r | 0}, ${p.g | 0}, ${p.b | 0}, ${alpha * 0.5})`)
        grad.addColorStop(0.4, `rgba(${p.r | 0}, ${p.g | 0}, ${p.b | 0}, ${alpha * 0.15})`)
        grad.addColorStop(1, 'transparent')
        ctx.beginPath(); ctx.arc(p.x, p.y, size, 0, Math.PI * 2); ctx.fillStyle = grad; ctx.fill()
        ctx.beginPath(); ctx.arc(p.x, p.y, size * 0.25, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${Math.min(255, (p.r | 0) + 60)}, ${Math.min(255, (p.g | 0) + 60)}, ${Math.min(255, (p.b | 0) + 60)}, ${alpha * 0.9})`; ctx.fill()
      }

      if (glow.x > 0) {
        const c = getColor(glow.x)
        const g = ctx.createRadialGradient(glow.x, glow.y, 0, glow.x, glow.y, 60)
        g.addColorStop(0, `rgba(${c[0] | 0}, ${c[1] | 0}, ${c[2] | 0}, 0.15)`)
        g.addColorStop(0.35, `rgba(${c[0] | 0}, ${c[1] | 0}, ${c[2] | 0}, 0.06)`)
        g.addColorStop(0.7, `rgba(${c[0] | 0}, ${c[1] | 0}, ${c[2] | 0}, 0.02)`)
        g.addColorStop(1, 'transparent')
        ctx.beginPath(); ctx.arc(glow.x, glow.y, 60, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill()
      }
    }

    resize(); raf = requestAnimationFrame(draw)
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseleave', onLeave); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 2 }} />
}
