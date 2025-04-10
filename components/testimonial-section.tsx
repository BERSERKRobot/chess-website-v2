"use client"

import { useRef, useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

export default function TestimonialSection() {
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

  const testimonials = [
    {
      name: "Gabby F",
      role: "Parent of 6-year-old student",
      content:
        "“If you’re looking for a chess teacher who is truly amazing look no further! Aaron is amazing. Not only is he skilled at chess but he is able to break down strategies. He’s patient and makes my son feel supported and encouraged throughout his lesson. Aaron is knowledgeable, kind, patient and dedicated. My son has learned so much!”",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Warren H",
      role: "Senior Chess Club Member, 73",
      content:
        "I've known Aaron for years. Through the years, Aaron has taught me so many different ideas and concepts about chess. I've noticed a marked improvement in my cognition because of his instruction. I think learning chess is an amazing thing, especially for seniors, and Aaron has helped so much in that regard.",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Maria Rodriguez",
      role: "Parent of an 8-year old student",
      content:
        "The chess lessons he provides my daughter have been a huge success. My daughter is engaged, has learned valuable skills, and we've seen improvements in focus and behavior across the board.",
      avatar: "/placeholder.svg?height=100&width=100",
    },
  ]

  return (
    <section ref={sectionRef} className="py-20 px-4 relative overflow-hidden">
      {/* Chess board background with alternating squares */}
      <div className="absolute inset-0 z-0">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `repeating-conic-gradient(#f9f9f9 0% 25%, #d1d1d1 0% 50%) 50% / 60px 60px`,
            opacity: 0.3,
            transform: `rotate(45deg)`,
          }}
        />
      </div>

      {/* Moving chess pieces */}
      {/* White Knight */}
      <div
        className="absolute z-10"
        style={{
          top: "20%",
          left: "5%",
          transform: isVisible
            ? `translate(${(scrollPosition - sectionRef.current?.offsetTop || 0) * 0.05}px, ${Math.sin((scrollPosition - sectionRef.current?.offsetTop || 0) * 0.01) * 20}px)`
            : "translate(0, 0)",
          transition: "transform 0.1s ease-out",
        }}
      >
        <div className="text-7xl">♘</div>
      </div>

      {/* Black Knight */}
      <div
        className="absolute z-10"
        style={{
          bottom: "20%",
          right: "5%",
          transform: isVisible
            ? `translate(${(scrollPosition - sectionRef.current?.offsetTop || 0) * -0.05}px, ${Math.sin((scrollPosition - sectionRef.current?.offsetTop || 0) * 0.01) * 20}px)`
            : "translate(0, 0)",
          transition: "transform 0.1s ease-out",
        }}
      >
        <div className="text-7xl">♞</div>
      </div>

      {/* White Pawn moving diagonally */}
      <div
        className="absolute z-10"
        style={{
          top: "40%",
          left: "10%",
          transform: isVisible
            ? `translate(${(scrollPosition - sectionRef.current?.offsetTop || 0) * 0.03}px, ${(scrollPosition - sectionRef.current?.offsetTop || 0) * 0.03}px)`
            : "translate(0, 0)",
          transition: "transform 0.1s ease-out",
        }}
      >
        <div className="text-5xl">♙</div>
      </div>

      {/* Black Pawn moving diagonally */}
      <div
        className="absolute z-10"
        style={{
          bottom: "40%",
          right: "10%",
          transform: isVisible
            ? `translate(${(scrollPosition - sectionRef.current?.offsetTop || 0) * -0.03}px, ${(scrollPosition - sectionRef.current?.offsetTop || 0) * -0.03}px)`
            : "translate(0, 0)",
          transition: "transform 0.1s ease-out",
        }}
      >
        <div className="text-5xl">♟</div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-4xl font-bold mb-16 text-center text-white">What Our Community Says</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <Card className="h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-center mb-4">
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 flex-grow">{testimonial.content}</p>
                  <div className="flex mt-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

