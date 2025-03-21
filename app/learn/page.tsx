import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, MapPin, Users, CheckCircle, School, Heart, BookOpen } from "lucide-react"

export default function LearnPage() {
  const programTypes = [
    {
      id: "youth-individual",
      title: "Individual Youth Lessons",
      description: "One-on-one chess instruction for children ages 5-17",
      image: "/placeholder.svg?height=200&width=400",
      benefits: [
        "Personalized instruction tailored to your child's learning style",
        "Flexible pacing based on individual progress",
        "Focused attention on areas needing improvement",
        "Build confidence in a supportive environment",
        "Develop critical thinking and problem-solving skills",
        "Convenient scheduling for busy families",
      ],
      featured: true,
      icon: <School className="h-8 w-8 text-primary mb-2" />,
    },
    {
      id: "youth-group",
      title: "Youth Group Classes",
      description: "Small group chess instruction for children ages 5-17",
      image: "/placeholder.svg?height=200&width=400",
      benefits: [
        "Learn in a social, collaborative environment",
        "Develop sportsmanship and social skills",
        "Friendly competition to motivate improvement",
        "More affordable than individual lessons",
        "Make friends with shared interests",
        "Group activities and mini-tournaments",
      ],
      groupSizes: "4-8 students per group, grouped by age and skill level",
      icon: <Users className="h-8 w-8 text-primary mb-2" />,
    },
    {
      id: "senior-programs",
      title: "Senior Chess Programs",
      description: "Chess instruction and clubs for adults 55+",
      image: "/placeholder.svg?height=200&width=400",
      benefits: [
        "Keep the mind active and engaged",
        "Social interaction with peers",
        "Instruction paced appropriately for adult learners",
        "Both beginners and experienced players welcome",
        "Improve cognitive function and memory",
        "Relaxed, enjoyable atmosphere",
      ],
      locations: ["Senior centers", "Retirement communities", "Community centers", "Private residences"],
      icon: <Heart className="h-8 w-8 text-primary mb-2" />,
    },
    {
      id: "community-programs",
      title: "Community Chess Programs",
      description: "Establish chess in schools, libraries, and community centers",
      image: "/placeholder.svg?height=200&width=400",
      benefits: [
        "Complete program setup and ongoing support",
        "Curriculum development tailored to your organization",
        "Equipment provision and maintenance",
        "Instructor training for staff members",
        "Regular tournaments and special events",
        "Build community through chess",
      ],
      programTypes: [
        "After-school programs",
        "Library chess clubs",
        "Community center programs",
        "School chess teams",
        "Chess in the classroom integration",
      ],
      icon: <BookOpen className="h-8 w-8 text-primary mb-2" />,
    },
  ]

  const ageGroups = [
    {
      id: "elementary",
      title: "Elementary School (5-10)",
      description: "Fun, engaging introduction to chess",
      approach: [
        "Game-based learning with stories and characters",
        "Simple puzzles and challenges",
        "Focus on basic rules and piece movement",
        "Short attention spans accommodated",
        "Emphasis on having fun while learning",
      ],
    },
    {
      id: "middle-school",
      title: "Middle School (11-13)",
      description: "Developing strategic thinking",
      approach: [
        "Introduction to tactics and planning",
        "Basic opening principles",
        "Simple endgame techniques",
        "Focus on pattern recognition",
        "Introduction to tournament play",
      ],
    },
    {
      id: "high-school",
      title: "High School (14-17)",
      description: "Advanced concepts and competition",
      approach: [
        "Deeper strategic understanding",
        "Advanced tactical patterns",
        "Opening theory and preparation",
        "Tournament preparation and psychology",
        "Team chess and leadership development",
      ],
    },
    {
      id: "seniors",
      title: "Seniors (55+)",
      description: "Chess for cognitive health and enjoyment",
      approach: [
        "Patient, clear instruction at an appropriate pace",
        "Focus on enjoyment and social aspects",
        "Mental exercise and cognitive benefits",
        "Adaptable to physical limitations",
        "Both beginners and returning players welcome",
      ],
    },
  ]

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <Link href="/" className="inline-flex items-center text-white mb-8 hover:underline">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Chess Programs</h1>
          <p className="text-xl max-w-3xl">
            We offer specialized chess instruction for children, seniors, and community organizations. Our programs are
            designed to make chess accessible, enjoyable, and beneficial for all ages and skill levels.
          </p>
        </div>
      </div>

      {/* Program Types */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Programs</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {programTypes.map((program) => (
            <Card
              key={program.id}
              className={`overflow-hidden h-full ${program.featured ? "border-primary ring-2 ring-primary ring-opacity-20" : ""}`}
            >
              <div className="relative">
                <img
                  src={program.image || "/placeholder.svg"}
                  alt={program.title}
                  className="w-full h-48 object-cover"
                />
                {program.featured && (
                  <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold py-1 px-3 rounded-full">
                    Most Popular
                  </div>
                )}
              </div>
              <CardHeader>
                <div className="flex flex-col items-center md:items-start">
                  {program.icon}
                  <CardTitle className="text-2xl">{program.title}</CardTitle>
                  <CardDescription className="text-base">{program.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Benefits:</h4>
                  <ul className="space-y-1">
                    {program.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {program.groupSizes && (
                  <div>
                    <h4 className="font-medium mb-2">Group Size:</h4>
                    <p className="text-sm">{program.groupSizes}</p>
                  </div>
                )}

                {program.locations && (
                  <div>
                    <h4 className="font-medium mb-2">Available Locations:</h4>
                    <ul className="space-y-1">
                      {program.locations.map((location, index) => (
                        <li key={index} className="flex items-start">
                          <MapPin className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                          <span className="text-sm">{location}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {program.programTypes && (
                  <div>
                    <h4 className="font-medium mb-2">Program Types:</h4>
                    <ul className="space-y-1">
                      {program.programTypes.map((type, index) => (
                        <li key={index} className="flex items-start">
                          <BookOpen className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                          <span className="text-sm">{type}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Link href="/checkout" className="w-full">
                  <Button className={`w-full ${program.featured ? "bg-primary" : ""}`}>Schedule Program</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Age Groups */}
        <h2 className="text-3xl font-bold mb-8 text-center">Age-Specific Approaches</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {ageGroups.map((group) => (
            <Card key={group.id} className="h-full">
              <CardHeader>
                <CardTitle>{group.title}</CardTitle>
                <CardDescription>{group.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <h4 className="font-medium mb-2">Our approach:</h4>
                <ul className="space-y-1">
                  {group.approach.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pricing Information */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 mb-16">
          <h2 className="text-2xl font-bold mb-4 text-center">Program Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">$70</div>
              <div className="text-lg">Individual Lesson</div>
              <div className="text-sm text-gray-500">60-minute one-on-one instruction</div>
            </div>
            <div className="text-center bg-primary/5 p-4 rounded-lg border border-primary/20">
              <div className="text-3xl font-bold text-primary">$325</div>
              <div className="text-lg">5 Lesson Package</div>
              <div className="text-sm text-primary">$65 per lesson (Save $25)</div>
              <div className="text-sm text-gray-500 mt-1">Our most popular option</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">$600</div>
              <div className="text-lg">10 Lesson Package</div>
              <div className="text-sm text-primary">$60 per lesson (Save $100)</div>
              <div className="text-sm text-gray-500 mt-1">Best value for serious students</div>
            </div>
          </div>
          <div className="mt-8 border-t pt-6">
            <h3 className="text-xl font-bold mb-4 text-center">Group & Community Programs</h3>
            <p className="text-center mb-4">
              Group and community program pricing varies based on group size, frequency, and specific requirements.
              Please contact us for a customized quote for your school, senior center, or community organization.
            </p>
          </div>
          <div className="text-center mt-6">
            <Link href="/checkout">
              <Button size="lg">Schedule Your Program</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-lg mb-2">What ages do you teach?</h3>
              <p>
                We teach chess to all ages! Our youth programs start as young as 5 years old, and we have special
                programs for seniors. Everyone can learn and enjoy chess!
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-lg mb-2">How do you handle different skill levels in group settings?</h3>
              <p>
                We group students by both age and skill level. Beginners learn fundamentals while more experienced
                players work on advanced concepts, all in an encouraging environment.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-lg mb-2">How do I start a chess program at my school or organization?</h3>
              <p>
                Contact us to schedule a consultation. We'll discuss your needs, space, budget, and goals to create a
                customized program plan for your community.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-lg mb-2">Do you provide chess equipment?</h3>
              <p>
                Yes! For community programs, we provide all necessary chess equipment. For individual lessons, students
                are encouraged to have their own chess set for practice, but we can provide equipment during lessons.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-lg mb-2">Is chess appropriate for young children?</h3>
              <p>
                We adapt our teaching methods for young learners, using stories, games, and fun activities to introduce
                chess concepts in an age-appropriate way.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-lg mb-2">How do senior programs differ from youth programs?</h3>
              <p>
                Our senior programs focus on cognitive benefits, social interaction, and enjoyment. We adjust the pace,
                provide clear instruction, and create a welcoming environment for adult learners.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Bring Chess to Your Community?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Whether you're looking for lessons for your child, a program for seniors, or want to establish chess in your
            school or community center, we're here to help.
          </p>
          <Link href="/checkout">
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
              Get Started Today
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}

