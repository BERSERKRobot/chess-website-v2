"use client"

import { useEffect, useState } from "react"

interface DNAStrand {
  id: number
  depth: number // 1-10, 10 being closest
  xPosition: number // percentage across screen
  yOffset: number // starting y position
  rotation: number // initial rotation
  rotationSpeed: number // speed of rotation
  scale: number // size of the strand
}

export default function ChessDNABackground() {
  const [scrollY, setScrollY] = useState(0)
  const [strands, setStrands] = useState<DNAStrand[]>([])

  // Chess pieces for DNA
  const whitePieces = ["♙", "♖", "♘", "♗", "♕", "♔"]
  const blackPieces = ["♟", "♜", "♞", "♝", "♛", "♚"]

  useEffect(() => {
    // Generate random DNA strands
    const generatedStrands: DNAStrand[] = []
    for (let i = 0; i < 6; i++) {
      generatedStrands.push({
        id: i,
        depth: Math.floor(Math.random() * 10) + 1,
        xPosition: Math.random() * 80 + 10, // Keep away from edges
        yOffset: Math.random() * 300,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 0.1 + 0.05,
        scale: 0.5 + Math.random() * 1.5,
      })
    }
    setStrands(generatedStrands)

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Number of base pairs in each DNA strand
  const basePairs = 12

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none perspective-[1000px]">
      {strands.map((strand) => (
        <div
          key={strand.id}
          className="absolute"
          style={{
            left: `${strand.xPosition}%`,
            top: `${strand.yOffset}px`,
            height: "100%",
            zIndex: strand.depth,
            opacity: 0.2 + strand.depth * 0.08, // More opacity for closer strands
            perspective: "1000px",
            transformStyle: "preserve-3d",
          }}
        >
          {/* DNA Helix */}
          <div
            className="relative h-[800px] w-[150px]"
            style={{
              transform: `
                translateZ(${strand.depth * 10}px) 
                rotateY(${strand.rotation + scrollY * strand.rotationSpeed}deg)
                scale(${strand.scale})
              `,
              transformStyle: "preserve-3d",
              transition: "transform 0.1s ease-out",
            }}
          >
            {/* Left backbone (sugar-phosphate) */}
            <div
              className="absolute left-0 h-full w-[2px] bg-gray-400/30"
              style={{
                transform: "translateZ(10px)",
                transformStyle: "preserve-3d",
              }}
            />

            {/* Right backbone (sugar-phosphate) */}
            <div
              className="absolute right-0 h-full w-[2px] bg-gray-400/30"
              style={{
                transform: "translateZ(10px)",
                transformStyle: "preserve-3d",
              }}
            />

            {/* Generate base pairs of chess pieces to form DNA structure */}
            {Array.from({ length: basePairs }).map((_, index) => {
              const angle = index * (360 / basePairs)
              const yPos = index * (100 / basePairs) + "%"
              const zOffset = 20 * Math.sin((angle * Math.PI) / 180)
              const xOffset = 20 * Math.cos((angle * Math.PI) / 180)

              return (
                <div
                  key={index}
                  className="absolute left-0 w-full"
                  style={{
                    top: yPos,
                    transform: `translateY(-50%) rotateY(${angle}deg)`,
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Left side of DNA */}
                  <div
                    className="absolute left-0"
                    style={{
                      fontSize: `${1.5 + strand.depth * 0.15}rem`,
                      transform: `translateX(${10 + xOffset}px) translateZ(${zOffset}px)`,
                      transformStyle: "preserve-3d",
                      color: index % 2 === 0 ? "#000" : "#444",
                    }}
                  >
                    {whitePieces[index % whitePieces.length]}
                  </div>

                  {/* Right side of DNA */}
                  <div
                    className="absolute right-0"
                    style={{
                      fontSize: `${1.5 + strand.depth * 0.15}rem`,
                      transform: `translateX(${-10 - xOffset}px) translateZ(${-zOffset}px)`,
                      transformStyle: "preserve-3d",
                      color: index % 2 === 0 ? "#444" : "#000",
                    }}
                  >
                    {blackPieces[index % blackPieces.length]}
                  </div>

                  {/* Connecting line (base pair) */}
                  <div
                    className="absolute top-1/2 left-1/2 h-[2px] bg-gray-400/50"
                    style={{
                      width: `${100 - Math.abs(xOffset)}px`,
                      transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${zOffset / 2}px)`,
                      transformStyle: "preserve-3d",
                    }}
                  />
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

