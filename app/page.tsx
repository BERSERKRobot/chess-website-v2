import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ParallaxChessHero from "@/components/parallax-chess-hero"
import ChessLessonSection from "@/components/chess-lesson-section"
import TestimonialSection from "@/components/testimonial-section"
import PricingSection from "@/components/pricing-section"
import ContactSection from "@/components/contact-section"

export default function Home() {
  return (
    <main className="min-h-screen relative">
      {/* Hero Section with Canvas DNA Background */}
      <ParallaxChessHero />

      {/* About Section - ensure it's above the canvas */}
      <section className="py-20 px-4 bg-white relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Master the Game of Kings</h2>
          <p className="text-xl max-w-3xl mx-auto mb-12">
            Welcome to Piece Together Chess, where we bring the joy and benefits of chess to players of all ages. We
            specialize in teaching children, seniors, and establishing community chess programs throughout San Diego.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <Card>
              <CardHeader>
                <CardTitle>Youth Chess Programs</CardTitle>
                <CardDescription>For children ages 5-17</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Engaging chess instruction for kids in both group and individual settings. We make learning fun while
                  developing critical thinking, focus, and sportsmanship.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Senior Chess Clubs</CardTitle>
                <CardDescription>For adults 55+</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Chess is the perfect activity for keeping the mind sharp at any age. Our senior programs provide a
                  social, engaging environment with instruction tailored to all experience levels.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Community Programs</CardTitle>
                <CardDescription>For schools, libraries & organizations</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  We help establish and run chess programs in schools, libraries, and community centers. Build a chess
                  community with our curriculum, equipment, and instructor support.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Chess Lessons Section */}
      <ChessLessonSection />

      {/* Testimonials */}
      <TestimonialSection />

      {/* Pricing */}
      <PricingSection />

      {/* Contact */}
      <ContactSection />
    </main>
  )
}

