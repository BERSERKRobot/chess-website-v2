"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import CanvasDnaBackground from "./canvas-dna-background"

export default function ParallaxChessHero() {
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div ref={heroRef} className="relative h-screen overflow-hidden flex items-center justify-center">
      {/* Canvas DNA Background */}
      <CanvasDnaBackground />

      {/* Chess board overlay - very subtle */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `repeating-conic-gradient(rgba(255, 255, 255, 0.03) 0% 25%, rgba(200, 200, 200, 0.03) 0% 50%) 50% / 80px 80px`,
          transform: `translateY(${scrollY * 0.05}px)`,
        }}
      />

      {/* Chess pieces moving across the board */}
      {/* White Rook */}
      <div
        className="absolute z-10"
        style={{
          top: "15%",
          left: "10%",
          transform: `translate(${scrollY * 0.2}px, ${scrollY * 0.05}px)`,
          transition: "transform 0.1s ease-out",
          color: "white",
          textShadow: "0 0 10px rgba(255, 255, 255, 0.7)",
        }}
      >
        <div className="text-8xl">♖</div>
      </div>

      {/* Black Knight */}
      <div
        className="absolute z-10"
        style={{
          top: "25%",
          right: "20%",
          transform: `translate(${scrollY * -0.15}px, ${scrollY * 0.1}px)`,
          transition: "transform 0.1s ease-out",
          color: "white",
          textShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
        }}
      >
        <div className="text-8xl">♞</div>
      </div>

      {/* White Queen */}
      <div
        className="absolute z-10"
        style={{
          bottom: "30%",
          left: "25%",
          transform: `translate(${scrollY * 0.1}px, ${scrollY * -0.15}px)`,
          transition: "transform 0.1s ease-out",
          color: "white",
          textShadow: "0 0 10px rgba(255, 255, 255, 0.7)",
        }}
      >
        <div className="text-8xl">♕</div>
      </div>

      {/* Black Bishop */}
      <div
        className="absolute z-10"
        style={{
          bottom: "20%",
          right: "15%",
          transform: `translate(${scrollY * -0.2}px, ${scrollY * -0.1}px)`,
          transition: "transform 0.1s ease-out",
          color: "white",
          textShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
        }}
      >
        <div className="text-8xl">♝</div>
      </div>

      {/* White Pawns */}
      {[...Array(4)].map((_, i) => (
        <div
          key={`white-pawn-${i}`}
          className="absolute z-10"
          style={{
            top: `${20 + i * 15}%`,
            left: `${10 + i * 20}%`,
            transform: `translate(${scrollY * (0.05 + i * 0.03)}px, ${scrollY * (0.02 + i * 0.02)}px)`,
            transition: "transform 0.1s ease-out",
            color: "white",
            textShadow: "0 0 8px rgba(255, 255, 255, 0.7)",
          }}
        >
          <div className="text-5xl">♙</div>
        </div>
      ))}

      {/* Black Pawns */}
      {[...Array(4)].map((_, i) => (
        <div
          key={`black-pawn-${i}`}
          className="absolute z-10"
          style={{
            bottom: `${20 + i * 15}%`,
            right: `${10 + i * 20}%`,
            transform: `translate(${scrollY * -(0.05 + i * 0.03)}px, ${scrollY * -(0.02 + i * 0.02)}px)`,
            transition: "transform 0.1s ease-out",
            color: "white",
            textShadow: "0 0 8px rgba(255, 255, 255, 0.5)",
          }}
        >
          <div className="text-5xl">♟</div>
        </div>
      ))}

      {/* Hero Content - improved contrast */}
      <div
        className="relative z-20 text-center px-4 max-w-4xl bg-black/70 backdrop-blur-md p-8 rounded-xl"
        style={{
          transform: `translateY(${scrollY * -0.2}px)`,
          opacity: Math.max(0, 1 - scrollY * 0.002),
          boxShadow: "0 0 30px rgba(0, 0, 0, 0.5)",
        }}
      >
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Master the Art of Chess</h1>
        <p className="text-xl md:text-2xl text-gray-100 mb-8">
          Chess instruction for kids, seniors, and community programs in San Diego
        </p>
        <div className="flex justify-center">
          <Link href="/learn">
            <Button size="lg" className="bg-white text-black hover:bg-gray-200 px-8">
              Book Lessons
            </Button>
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce z-20"
        style={{
          opacity: Math.max(0, 1 - scrollY * 0.01),
        }}
      >
        <div className="text-sm mb-2 font-semibold">Scroll Down</div>
        <svg
          className="w-6 h-6 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  )
}

