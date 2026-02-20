import { useRef, useEffect, useMemo } from 'react'

interface ForestCanvasProps {
  totalSV: number
  biodiv: number
  isAttacked: boolean
  lowPower: boolean
}

// ── Data types ──

interface Tree {
  x: number      // normalized 0-1
  height: number  // pixels
  width: number   // pixels
  phase: number   // sway phase
}

interface Leaf {
  x: number
  y: number
  speed: number
  wobble: number
  phase: number
  size: number
}

interface Firefly {
  x: number
  y: number
  speed: number
  phase: number
  radius: number
}

// ── Procedural generation ──

function generateTrees(count: number, seed: number): Tree[] {
  const trees: Tree[] = []
  let rng = seed
  const rand = () => { rng = (rng * 16807 + 0) % 2147483647; return rng / 2147483647 }
  for (let i = 0; i < count; i++) {
    trees.push({
      x: rand(),
      height: 120 + rand() * 200,
      width: 30 + rand() * 50,
      phase: rand() * Math.PI * 2,
    })
  }
  return trees
}

function generateLeaves(count: number): Leaf[] {
  const leaves: Leaf[] = []
  for (let i = 0; i < count; i++) {
    leaves.push({
      x: Math.random(),
      y: Math.random(),
      speed: 0.015 + Math.random() * 0.025,
      wobble: 0.3 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2,
      size: 2 + Math.random() * 3,
    })
  }
  return leaves
}

function generateFireflies(count: number): Firefly[] {
  const flies: Firefly[] = []
  for (let i = 0; i < count; i++) {
    flies.push({
      x: 0.1 + Math.random() * 0.8,
      y: 0.4 + Math.random() * 0.5,
      speed: 0.2 + Math.random() * 0.4,
      phase: Math.random() * Math.PI * 2,
      radius: 0.02 + Math.random() * 0.05,
    })
  }
  return flies
}

// ── Draw helpers ──

function drawTreeSilhouette(
  ctx: CanvasRenderingContext2D,
  cx: number,
  baseY: number,
  w: number,
  h: number,
  sway: number,
) {
  const topX = cx + sway
  const trunkW = w * 0.12

  // Crown — layered triangles for spruce shape
  ctx.beginPath()
  ctx.moveTo(topX, baseY - h)
  ctx.lineTo(cx - w * 0.15, baseY - h * 0.65)
  ctx.lineTo(cx - w * 0.35, baseY - h * 0.35)
  ctx.lineTo(cx - w * 0.5, baseY - h * 0.05)
  ctx.lineTo(cx - trunkW, baseY)
  ctx.lineTo(cx + trunkW, baseY)
  ctx.lineTo(cx + w * 0.5, baseY - h * 0.05)
  ctx.lineTo(cx + w * 0.35, baseY - h * 0.35)
  ctx.lineTo(cx + w * 0.15, baseY - h * 0.65)
  ctx.closePath()
  ctx.fill()
}

function drawLayer(
  ctx: CanvasRenderingContext2D,
  trees: Tree[],
  w: number,
  h: number,
  color: string,
  swayAmount: number,
  time: number,
  yOffset: number,
) {
  ctx.fillStyle = color
  for (const tree of trees) {
    const cx = tree.x * w
    const baseY = h + yOffset
    const sway = Math.sin(time * 0.3 + tree.phase) * swayAmount
    drawTreeSilhouette(ctx, cx, baseY, tree.width, tree.height, sway)
  }
}

// ── Main canvas component ──

export default function ForestCanvas({ totalSV, biodiv, isAttacked, lowPower }: ForestCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)

  // Generate static forest data
  const density = totalSV > 100_000 ? 1.0 : totalSV > 10_000 ? 0.7 : 0.4
  const leafCount = lowPower ? 6 : Math.min(15, Math.floor(8 + biodiv * 0.06))
  const fireflyCount = lowPower ? 4 : Math.min(15, Math.floor(6 + biodiv * 0.08))

  const backTrees = useMemo(() => generateTrees(Math.floor(18 * density), 42), [density])
  const midTrees = useMemo(() => generateTrees(Math.floor(12 * density), 137), [density])
  const frontTrees = useMemo(() => generateTrees(Math.floor(7 * density), 256), [density])
  const leaves = useMemo(() => generateLeaves(leafCount), [leafCount])
  const fireflies = useMemo(() => generateFireflies(fireflyCount), [fireflyCount])

  // Colors based on state
  const backColor = isAttacked ? 'rgba(60,30,25,0.15)' : 'rgba(15,25,15,0.20)'
  const midColor = isAttacked ? 'rgba(45,35,20,0.25)' : 'rgba(10,20,10,0.30)'
  const frontColor = 'rgba(5,12,5,0.45)'
  const leafColor = isAttacked ? 'rgba(140,80,40,0.20)' : 'rgba(60,100,65,0.15)'
  const fogColor = isAttacked ? 'rgba(100,40,30,0.04)' : 'rgba(40,70,45,0.04)'

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let startTime = performance.now()
    let lastFrame = 0

    const render = (now: number) => {
      // Cap at ~30fps
      if (now - lastFrame < 33) {
        rafRef.current = requestAnimationFrame(render)
        return
      }
      lastFrame = now

      const t = (now - startTime) / 1000
      const w = canvas.width
      const h = canvas.height

      ctx.clearRect(0, 0, w, h)

      // ── Light rays ──
      const rayOpacity = 0.025 + Math.sin(t * 0.1) * 0.01
      ctx.save()
      ctx.fillStyle = `rgba(196,164,78,${rayOpacity})`
      for (let i = 0; i < 4; i++) {
        const rx = w * (0.15 + i * 0.22) + Math.sin(t * 0.05 + i * 1.3) * 20
        const rw = 8 + Math.sin(t * 0.08 + i * 0.9) * 3
        ctx.fillRect(rx, 0, rw, h)
      }
      ctx.restore()

      // ── Tree layers (back to front) ──
      drawLayer(ctx, backTrees, w, h, backColor, 6, t, 30)
      drawLayer(ctx, midTrees, w, h, midColor, 3, t, 15)
      drawLayer(ctx, frontTrees, w, h, frontColor, 1, t, 5)

      // ── Ground fog ──
      const fogY = h * 0.75
      const grad = ctx.createLinearGradient(0, fogY, 0, h)
      grad.addColorStop(0, 'rgba(0,0,0,0)')
      grad.addColorStop(0.4, fogColor)
      grad.addColorStop(1, fogColor.replace(/[\d.]+\)$/, m => `${parseFloat(m) * 1.5})`))
      ctx.fillStyle = grad
      ctx.fillRect(0, fogY, w, h - fogY)

      // ── Falling leaves ──
      ctx.fillStyle = leafColor
      for (const leaf of leaves) {
        let ly = (leaf.y + t * leaf.speed) % 1.2
        if (ly > 1.1) ly -= 1.2
        const lx = leaf.x + Math.sin(t * leaf.wobble + leaf.phase) * 0.03
        ctx.beginPath()
        ctx.ellipse(lx * w, ly * h, leaf.size, leaf.size * 0.6, t * 0.5 + leaf.phase, 0, Math.PI * 2)
        ctx.fill()
      }

      // ── Fireflies ──
      for (const fly of fireflies) {
        const brightness = (Math.sin(t * fly.speed * 3 + fly.phase) + 1) * 0.5
        if (brightness < 0.2) continue

        const fx = fly.x + Math.sin(t * fly.speed + fly.phase) * fly.radius
        const fy = fly.y + Math.cos(t * fly.speed * 0.7 + fly.phase) * fly.radius * 0.5
        const size = 1.5 + brightness * 1.5

        ctx.fillStyle = `rgba(196,164,78,${0.15 + brightness * 0.35})`
        ctx.beginPath()
        ctx.arc(fx * w, fy * h, size, 0, Math.PI * 2)
        ctx.fill()

        // Glow
        ctx.fillStyle = `rgba(196,164,78,${brightness * 0.08})`
        ctx.beginPath()
        ctx.arc(fx * w, fy * h, size * 4, 0, Math.PI * 2)
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(render)
    }

    // Handle resize
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5)
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener('resize', resize)
    rafRef.current = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [backTrees, midTrees, frontTrees, leaves, fireflies, backColor, midColor, frontColor, leafColor, fogColor])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%' }}
    />
  )
}
