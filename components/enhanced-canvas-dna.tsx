"use client"

import { useEffect, useRef } from "react"

export default function EnhancedCanvasDna() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Resize canvas to always fill the window
    function resizeCanvas() {
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Track scroll position to control rotation speed
    let scrollY = 0
    let lastScrollY = 0
    let scrollVelocity = 0
    const handleScroll = () => {
      lastScrollY = scrollY
      scrollY = window.scrollY
      scrollVelocity = scrollY - lastScrollY
    }

    window.addEventListener("scroll", handleScroll)

    // Chess piece symbols
    const whitePieces = ["♔", "♕", "♗", "♘", "♖", "♙"]
    const blackPieces = ["♚", "♛", "♝", "♞", "♜", "♟"]

    // Create multiple DNA strands
    const strands = []
    const numStrands = 3

    for (let i = 0; i < numStrands; i++) {
      strands.push({
        xOffset: (Math.random() - 0.5) * canvas.width * 0.5,
        yOffset: (Math.random() - 0.5) * canvas.height * 0.5,
        rotationOffset: Math.random() * Math.PI * 2,
        rotationSpeed: 0.005 + Math.random() * 0.01,
        scale: 0.5 + Math.random() * 1,
        density: 40 + Math.floor(Math.random() * 30),
        spacing: 15 + Math.random() * 15,
      })
    }

    // Animation loop: draws the double helix with chess pieces
    let animationFrameId: number
    let rotation = 0

    function draw() {
      if (!canvas || !ctx) return

      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update rotation based on scroll velocity
      rotation += 0.005 + Math.abs(scrollVelocity) * 0.0002

      // Draw each DNA strand
      strands.forEach((strand) => {
        const { xOffset, yOffset, rotationOffset, rotationSpeed, scale, density, spacing } = strand

        const centerX = canvas.width / 2 + xOffset
        const centerY = canvas.height / 2 + yOffset
        const amplitude = (canvas.width / 6) * scale

        // Calculate current rotation angle
        const currentRotation = rotation * rotationSpeed + rotationOffset + scrollY * 0.001

        // Draw the DNA structure using only chess pieces
        for (let i = 0; i < density; i++) {
          // 't' acts as a parameter for the helix curve
          const t = i * 0.2
          // y position based on index and spacing, centered vertically
          const y = centerY + (i - density / 2) * spacing

          // Calculate positions for pieces along the helix
          for (let j = 0; j < 6; j++) {
            const subAngle = currentRotation + t + (j * Math.PI) / 3
            const x = centerX + amplitude * Math.cos(subAngle)
            const z = amplitude * Math.sin(subAngle) // z-depth for scaling

            // Scale based on z position to create depth effect
            const depthScale = 0.3 + (z + amplitude) / (2 * amplitude)
            const finalScale = scale * depthScale
            const pieceSize = 30 * finalScale

            // Determine opacity based on z position
            const opacity = 0.2 + 0.8 * depthScale

            // Choose piece based on position
            const isPieceWhite = (i + j) % 2 === 0
            const pieceSet = isPieceWhite ? whitePieces : blackPieces
            const pieceIndex = (i + j) % pieceSet.length
            const piece = pieceSet[pieceIndex]

            // Draw the chess piece
            ctx.save()
            ctx.translate(x, y)
            ctx.font = `${pieceSize}px serif`
            ctx.textAlign = "center"
            ctx.textBaseline = "middle"

            // Add glow effect for white pieces
            if (isPieceWhite) {
              ctx.shadowColor = "rgba(100, 149, 237, 0.8)"
              ctx.shadowBlur = 15 * depthScale
            }

            ctx.fillStyle = isPieceWhite ? `rgba(255, 255, 255, ${opacity})` : `rgba(50, 50, 50, ${opacity})`
            ctx.fillText(piece, 0, 0)
            ctx.restore()
          }
        }
      })

      // Request the next frame
      animationFrameId = requestAnimationFrame(draw)
    }

    // Start the animation loop
    draw()

    // Cleanup function
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("scroll", handleScroll)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ background: "linear-gradient(to bottom, #111, #1a1a2e)" }}
    />
  )
}

