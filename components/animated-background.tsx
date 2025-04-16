"use client"

import { useEffect, useRef } from "react"

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Create orbs
    const orbs: Orb[] = []
    const orbCount = 15
    const colors = ["#f43f5e", "#d946ef", "#8b5cf6", "#ec4899", "#10b981", "#3b82f6"]

    class Orb {
      x: number
      y: number
      radius: number
      color: string
      xSpeed: number
      ySpeed: number
      alpha: number
      alphaSpeed: number
      pulseSize: number
      pulseDirection: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.radius = Math.random() * 100 + 50
        this.color = colors[Math.floor(Math.random() * colors.length)]
        this.xSpeed = (Math.random() - 0.5) * 0.3
        this.ySpeed = (Math.random() - 0.5) * 0.3
        this.alpha = Math.random() * 0.2 + 0.1
        this.alphaSpeed = Math.random() * 0.01 - 0.005
        this.pulseSize = 0
        this.pulseDirection = 1
      }

      update() {
        this.x += this.xSpeed
        this.y += this.ySpeed

        // Bounce off edges
        if (this.x < -this.radius) this.x = canvas.width + this.radius
        if (this.x > canvas.width + this.radius) this.x = -this.radius
        if (this.y < -this.radius) this.y = canvas.height + this.radius
        if (this.y > canvas.height + this.radius) this.y = -this.radius

        // Pulse alpha
        this.alpha += this.alphaSpeed
        if (this.alpha <= 0.05 || this.alpha >= 0.2) {
          this.alphaSpeed = -this.alphaSpeed
        }

        // Pulse size
        this.pulseSize += 0.02 * this.pulseDirection
        if (this.pulseSize >= 1 || this.pulseSize <= 0) {
          this.pulseDirection *= -1
        }
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()

        // Add pulsing effect to radius
        const pulseRadius = this.radius * (1 + this.pulseSize * 0.1)

        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, pulseRadius)
        gradient.addColorStop(
          0,
          `${this.color}${Math.round(this.alpha * 255)
            .toString(16)
            .padStart(2, "0")}`,
        )
        gradient.addColorStop(1, `${this.color}00`)
        ctx.fillStyle = gradient
        ctx.arc(this.x, this.y, pulseRadius, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Initialize orbs
    for (let i = 0; i < orbCount; i++) {
      orbs.push(new Orb())
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw background
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw orbs
      orbs.forEach((orb) => {
        orb.update()
        orb.draw()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 opacity-40" />
}
