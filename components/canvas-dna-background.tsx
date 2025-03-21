"use client"

import { useEffect, useRef } from "react"

export default function CanvasDnaBackground() {
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
    const handleScroll = () => {
      scrollY = window.scrollY
    }

    window.addEventListener("scroll", handleScroll)

    // Chess piece symbols - we'll use these instead of white blocks
    const whitePieces = ["♔", "♕", "♗", "♘", "♖", "♙"]
    const blackPieces = ["♚", "♛", "♝", "♞", "♜", "♟"]

    // Animation loop: draws the double helix with chess pieces
    let animationFrameId: number

    function draw() {
      if (!canvas || !ctx) return

      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Parameters for the helix - following the original design
      const numPieces = 30 // how many pairs along the helix
      const amplitude = canvas.width / 4 // horizontal spread of the helix
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const spacing = 40 // vertical spacing between pairs
      const rotationSpeed = 0.01 // factor to control how much scroll affects rotation
      const pieceSize = 30 // size of the chess pieces

      // Loop to draw each pair of chess pieces along the helix
      for (let i = 0; i < numPieces; i++) {
        // 't' acts as a parameter for the helix curve
        const t = i * 0.5
        // y position based on index and spacing, centered vertically
        const y = centerY + (i - numPieces / 2) * spacing
        // Calculate rotation angle influenced by scroll position
        const angle = t + scrollY * rotationSpeed
        // Calculate x positions for each strand (offset by π for the second strand)
        const x1 = centerX + amplitude * Math.cos(angle)
        const x2 = centerX + amplitude * Math.cos(angle + Math.PI)

        // Choose pieces for this pair
        const whitePiece = whitePieces[i % whitePieces.length]
        const blackPiece = blackPieces[i % blackPieces.length]

        // Draw first chess piece (white)
        ctx.save()
        ctx.translate(x1, y)
        ctx.font = `${pieceSize}px serif`
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)"
        // Add glow effect
        ctx.shadowColor = "rgba(255, 255, 255, 0.8)"
        ctx.shadowBlur = 10
        ctx.fillText(whitePiece, 0, 0)
        ctx.restore()

        // Draw second chess piece (black)
        ctx.save()
        ctx.translate(x2, y)
        ctx.font = `${pieceSize}px serif`
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillStyle = "rgba(150, 150, 150, 0.9)"
        ctx.fillText(blackPiece, 0, 0)
        ctx.restore()

        // Draw a connecting line between the two pieces
        ctx.beginPath()
        ctx.moveTo(x1, y)
        ctx.lineTo(x2, y)
        ctx.strokeStyle = "rgba(255, 255, 255, 0.3)"
        ctx.stroke()
      }

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

