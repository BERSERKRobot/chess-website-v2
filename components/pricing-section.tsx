"use client"

import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

export default function PricingSection() {
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

  const plans = [
    {
      name: "Individual Lessons",
      price: "$70",
      description: "One-on-one instruction",
      features: [
        "Personalized attention",
        "Customized lesson plan",
        "For children or seniors",
        "Flexible scheduling",
        "In-person or online options",
      ],
    },
    {
      name: "5 Lesson Package",
      price: "$325",
      pricePerLesson: "$65 per lesson",
      description: "Our most popular option",
      features: [
        "Personalized attention",
        "Progress tracking",
        "Homework assignments",
        "Email support between lessons",
        "Discounted rate",
      ],
      popular: true,
    },
    {
      name: "Group & Community",
      price: "Custom",
      description: "For schools, centers & organizations",
      features: [
        "Youth group classes (4-8 students)",
        "Senior chess clubs",
        "School chess programs",
        "Community center programs",
        "Equipment provided",
        "Custom curriculum development",
      ],
    },
  ]

  return (
    <section ref={sectionRef} className="py-20 px-4 relative overflow-hidden bg-gray-50">
      {/* Chess board background with alternating squares */}
      <div className="absolute inset-0 z-0">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `repeating-conic-gradient(#f9f9f9 0% 25%, #d1d1d1 0% 50%) 50% / 60px 60px`,
            opacity: 0.3,
            transform: `rotate(-45deg)`,
          }}
        />
      </div>

      {/* Moving chess pieces */}
      {/* White King */}
      <div
        className="absolute z-10"
        style={{
          top: "15%",
          left: "10%",
          transform: isVisible
            ? `translate(${(scrollPosition - sectionRef.current?.offsetTop || 0) * 0.02}px, ${(scrollPosition - sectionRef.current?.offsetTop || 0) * 0.01}px)`
            : "translate(0, 0)",
          transition: "transform 0.1s ease-out",
        }}
      >
        <div className="text-6xl">♔</div>
      </div>

      {/* Black Queen */}
      <div
        className="absolute z-10"
        style={{
          top: "20%",
          right: "10%",
          transform: isVisible
            ? `translate(${(scrollPosition - sectionRef.current?.offsetTop || 0) * -0.02}px, ${(scrollPosition - sectionRef.current?.offsetTop || 0) * 0.01}px)`
            : "translate(0, 0)",
          transition: "transform 0.1s ease-out",
        }}
      >
        <div className="text-6xl">♛</div>
      </div>

      {/* White Rook */}
      <div
        className="absolute z-10"
        style={{
          bottom: "15%",
          left: "15%",
          transform: isVisible
            ? `translate(${(scrollPosition - sectionRef.current?.offsetTop || 0) * 0.03}px, ${(scrollPosition - sectionRef.current?.offsetTop || 0) * -0.01}px)`
            : "translate(0, 0)",
          transition: "transform 0.1s ease-out",
        }}
      >
        <div className="text-6xl">♖</div>
      </div>

      {/* Black Bishop */}
      <div
        className="absolute z-10"
        style={{
          bottom: "20%",
          right: "15%",
          transform: isVisible
            ? `translate(${(scrollPosition - sectionRef.current?.offsetTop || 0) * -0.03}px, ${(scrollPosition - sectionRef.current?.offsetTop || 0) * -0.01}px)`
            : "translate(0, 0)",
          transition: "transform 0.1s ease-out",
        }}
      >
        <div className="text-6xl">♝</div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-4xl font-bold mb-16 text-center">Program Options</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <Card className={`h-full ${plan.popular ? "border-primary shadow-lg relative" : ""}`}>
                {plan.popular && (
                  <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 bg-primary text-white text-xs font-bold py-1 px-3 rounded-full">
                    Most Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.pricePerLesson && (
                      <div className="text-sm text-primary font-medium mt-1">{plan.pricePerLesson}</div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="ml-2">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/checkout" className="w-full">
                    <Button className={`w-full ${plan.popular ? "bg-primary" : ""}`}>Get Started</Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

