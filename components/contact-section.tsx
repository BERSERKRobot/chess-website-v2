"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, CheckCircle, Loader2 } from "lucide-react"
import { sendContactEmail, type ContactFormData } from "@/app/actions/contact"
import { useToast } from "@/hooks/use-toast"

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const { toast } = useToast()

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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData(e.currentTarget)
      const data: ContactFormData = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        subject: formData.get("subject") as string,
        message: formData.get("message") as string,
      }

      const result = await sendContactEmail(data)

      if (result.success) {
        toast({
          title: "Message sent!",
          description: "We'll get back to you as soon as possible.",
          variant: "default",
        })
        setFormSubmitted(true)
        formRef.current?.reset()
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to send message. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      ref={sectionRef}
      className="py-20 px-4 relative overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #1a1a2e, #16213e)",
      }}
    >
      {/* Chess board background with alternating squares */}
      <div className="absolute inset-0 z-0">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `repeating-conic-gradient(#ffffff10 0% 25%, #ffffff05 0% 50%) 50% / 60px 60px`,
            opacity: 0.2,
          }}
        />
      </div>

      {/* Moving chess pieces */}
      {/* White Queen */}
      <div
        className="absolute z-10"
        style={{
          top: "15%",
          left: "10%",
          transform: isVisible
            ? `translate(${(scrollPosition - sectionRef.current?.offsetTop || 0) * 0.03}px, ${(scrollPosition - sectionRef.current?.offsetTop || 0) * 0.01}px)`
            : "translate(0, 0)",
          transition: "transform 0.1s ease-out",
          color: "rgba(255, 255, 255, 0.2)",
        }}
      >
        <div className="text-7xl">♕</div>
      </div>

      {/* Black King */}
      <div
        className="absolute z-10"
        style={{
          top: "20%",
          right: "10%",
          transform: isVisible
            ? `translate(${(scrollPosition - sectionRef.current?.offsetTop || 0) * -0.03}px, ${(scrollPosition - sectionRef.current?.offsetTop || 0) * 0.01}px)`
            : "translate(0, 0)",
          transition: "transform 0.1s ease-out",
          color: "rgba(255, 255, 255, 0.2)",
        }}
      >
        <div className="text-7xl">♚</div>
      </div>

      {/* White Knight */}
      <div
        className="absolute z-10"
        style={{
          bottom: "15%",
          left: "15%",
          transform: isVisible
            ? `translate(${(scrollPosition - sectionRef.current?.offsetTop || 0) * 0.04}px, ${(scrollPosition - sectionRef.current?.offsetTop || 0) * -0.02}px)`
            : "translate(0, 0)",
          transition: "transform 0.1s ease-out",
          color: "rgba(255, 255, 255, 0.2)",
        }}
      >
        <div className="text-7xl">♘</div>
      </div>

      {/* Black Rook */}
      <div
        className="absolute z-10"
        style={{
          bottom: "20%",
          right: "15%",
          transform: isVisible
            ? `translate(${(scrollPosition - sectionRef.current?.offsetTop || 0) * -0.04}px, ${(scrollPosition - sectionRef.current?.offsetTop || 0) * -0.02}px)`
            : "translate(0, 0)",
          transition: "transform 0.1s ease-out",
          color: "rgba(255, 255, 255, 0.2)",
        }}
      >
        <div className="text-7xl">♜</div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-4xl font-bold mb-16 text-center text-white">Get in Touch</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"}`}
          >
            <div className="text-white">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <p className="text-gray-300 mb-8">
                Have questions about our chess lessons? Ready to start your journey to chess mastery? Reach out to us
                and we'll get back to you as soon as possible.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                  <div className="ml-4">
                    <h4 className="font-semibold">Email</h4>
                    <p className="text-gray-300">ChessinSD@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                  <div className="ml-4">
                    <h4 className="font-semibold">Phone</h4>
                    <p className="text-gray-300">(801)-635-4533</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                  <div className="ml-4">
                    <h4 className="font-semibold">Location</h4>
                    <p className="text-gray-300">San Diego, CA</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"}`}
          >
            <form ref={formRef} onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>

              {formSubmitted && (
                <div className="p-4 mb-6 rounded-md bg-green-50 text-green-800">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                    <p>Thank you for your message! We'll get back to you soon.</p>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input id="name" name="name" placeholder="Your name" required />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input id="email" name="email" type="email" placeholder="Your email" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input id="subject" name="subject" placeholder="Subject" required />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea id="message" name="message" placeholder="Your message" rows={5} required />
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

