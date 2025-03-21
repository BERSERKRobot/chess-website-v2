"use client"

import { useRef, useEffect, useState } from "react"
import { ChevronRight } from "lucide-react"

export default function ChessLessonSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY)

      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setIsVisible(true)
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section ref={sectionRef} className="py-20 px-4 relative overflow-hidden bg-white">
      {/* Chess board background with alternating squares */}
      <div className="absolute inset-0 z-0">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `repeating-conic-gradient(#f9f9f9 0% 25%, #d1d1d1 0% 50%) 50% / 60px 60px`,
            opacity: 0.3,
          }}
        />
      </div>

      {/* Moving chess pieces */}
      {/* White King */}
      <div
        className="absolute z-10"
        style={{
          top: "10%",
          left: "5%",
          transform: isVisible
            ? `translate(${(scrollPosition - sectionRef.current?.offsetTop || 0) * 0.1}px, 0)`
            : "translate(0, 0)",
          transition: "transform 0.1s ease-out",
        }}
      >
        <div className="text-7xl">♔</div>
      </div>

      {/* Black Queen */}
      <div
        className="absolute z-10"
        style={{
          top: "15%",
          right: "5%",
          transform: isVisible
            ? `translate(${(scrollPosition - sectionRef.current?.offsetTop || 0) * -0.1}px, 0)`
            : "translate(0, 0)",
          transition: "transform 0.1s ease-out",
        }}
      >
        <div className="text-7xl">♛</div>
      </div>

      {/* White Bishop */}
      <div
        className="absolute z-10"
        style={{
          bottom: "10%",
          left: "10%",
          transform: isVisible
            ? `translate(${(scrollPosition - sectionRef.current?.offsetTop || 0) * 0.08}px, ${(scrollPosition - sectionRef.current?.offsetTop || 0) * -0.05}px)`
            : "translate(0, 0)",
          transition: "transform 0.1s ease-out",
        }}
      >
        <div className="text-7xl">♗</div>
      </div>

      {/* Black Rook */}
      <div
        className="absolute z-10"
        style={{
          bottom: "15%",
          right: "10%",
          transform: isVisible
            ? `translate(${(scrollPosition - sectionRef.current?.offsetTop || 0) * -0.08}px, ${(scrollPosition - sectionRef.current?.offsetTop || 0) * -0.05}px)`
            : "translate(0, 0)",
          transition: "transform 0.1s ease-out",
        }}
      >
        <div className="text-7xl">♜</div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-4xl font-bold mb-16 text-center">Our Chess Curriculum</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"}`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="bg-white p-8 rounded-lg shadow-lg h-full">
              <h3 className="text-2xl font-bold mb-4">Opening Principles</h3>
              <p className="text-gray-600 mb-6">
                Master the critical first phase of the game. Learn how to develop pieces efficiently, control the
                center, and set up a strong position for the middlegame.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Classical opening principles</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Popular openings for White and Black</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Opening traps to avoid</span>
                </li>
              </ul>
            </div>
          </div>

          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"}`}
            style={{ transitionDelay: "400ms" }}
          >
            <div className="bg-white p-8 rounded-lg shadow-lg h-full">
              <h3 className="text-2xl font-bold mb-4">Tactical Patterns</h3>
              <p className="text-gray-600 mb-6">
                Develop your tactical vision and calculation skills. Learn to spot combinations, sacrifices, and forcing
                sequences that win material or lead to checkmate.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Pins, forks, and skewers</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Discovered attacks and double checks</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Mating patterns and combinations</span>
                </li>
              </ul>
            </div>
          </div>

          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"}`}
            style={{ transitionDelay: "600ms" }}
          >
            <div className="bg-white p-8 rounded-lg shadow-lg h-full">
              <h3 className="text-2xl font-bold mb-4">Strategic Concepts</h3>
              <p className="text-gray-600 mb-6">
                Understand the deeper principles that guide chess decisions. Learn positional play, pawn structures, and
                long-term planning to outmaneuver your opponents.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Piece coordination and activity</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Pawn structure analysis</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Weak squares and outposts</span>
                </li>
              </ul>
            </div>
          </div>

          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"}`}
            style={{ transitionDelay: "800ms" }}
          >
            <div className="bg-white p-8 rounded-lg shadow-lg h-full">
              <h3 className="text-2xl font-bold mb-4">Endgame Technique</h3>
              <p className="text-gray-600 mb-6">
                Perfect your endgame skills to convert advantages and save difficult positions. Learn theoretical
                positions and practical techniques for the final phase.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>King and pawn endgames</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Rook endgames and the Lucena position</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Opposition and zugzwang</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

