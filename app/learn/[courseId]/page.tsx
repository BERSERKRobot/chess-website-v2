import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, Clock, BookOpen, Award, Users, CheckCircle, Play, FileText, Download } from "lucide-react"

export default function CourseDetailPage({ params }: { params: { courseId: string } }) {
  // This would typically come from a database or API
  const courseDetails = {
    id: params.courseId,
    title: getCourseTitle(params.courseId),
    description: "Master the critical aspects of chess with our comprehensive curriculum",
    level: getCourseLevel(params.courseId),
    duration: "8-12 weeks",
    lessons: 16,
    students: 1240,
    rating: 4.8,
    reviews: 156,
    instructor: {
      name: "GM Alexander Peterson",
      title: "International Grandmaster",
      bio: "Alexander is a chess Grandmaster with over 20 years of teaching experience. He has coached multiple national champions and is known for his clear, methodical teaching approach.",
      image: "/placeholder.svg?height=100&width=100",
    },
    overview:
      "This comprehensive course will take you through all the essential concepts and techniques needed to master this critical aspect of chess. Through video lessons, interactive exercises, and personalized feedback, you'll develop the skills needed to significantly improve your game.",
    curriculum: [
      {
        title: "Module 1: Fundamentals",
        lessons: [
          { title: "Introduction and Course Overview", duration: "15 min", type: "video" },
          { title: "Core Principles and Concepts", duration: "45 min", type: "video" },
          { title: "Common Patterns and Structures", duration: "30 min", type: "video" },
          { title: "Assessment and Practice", duration: "1 hour", type: "exercise" },
        ],
      },
      {
        title: "Module 2: Intermediate Concepts",
        lessons: [
          { title: "Advanced Techniques", duration: "45 min", type: "video" },
          { title: "Strategic Planning", duration: "1 hour", type: "video" },
          { title: "Analysis of Master Games", duration: "1.5 hours", type: "video" },
          { title: "Practical Application", duration: "1 hour", type: "exercise" },
        ],
      },
      {
        title: "Module 3: Advanced Applications",
        lessons: [
          { title: "Complex Positions", duration: "1 hour", type: "video" },
          { title: "Calculation and Visualization", duration: "45 min", type: "video" },
          { title: "Tournament Preparation", duration: "1 hour", type: "video" },
          { title: "Final Assessment", duration: "2 hours", type: "exercise" },
        ],
      },
    ],
    image: "/placeholder.svg?height=400&width=800",
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Course Header */}
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <Link href="/learn" className="inline-flex items-center text-white mb-8 hover:underline">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Courses
          </Link>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{courseDetails.title}</h1>
              <p className="text-xl mb-6">{courseDetails.description}</p>
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center">
                  <Award className="mr-2 h-5 w-5" />
                  <span>{courseDetails.level}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  <span>{courseDetails.duration}</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5" />
                  <span>{courseDetails.lessons} lessons</span>
                </div>
                <div className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  <span>{courseDetails.students.toLocaleString()} students</span>
                </div>
              </div>
              <div className="flex gap-4">
                <Link href="/checkout">
                  <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                    Enroll Now
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Preview Course
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src={courseDetails.image || "/placeholder.svg"}
                alt={courseDetails.title}
                className="rounded-lg shadow-lg"
                width={400}
                height={225}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
            <TabsTrigger value="instructor">Instructor</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold mb-4">About This Course</h2>
                <p className="text-gray-700 mb-6">{courseDetails.overview}</p>

                <h3 className="text-xl font-bold mb-3">What You'll Learn</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Master fundamental concepts and techniques</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Develop strategic thinking and planning</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Analyze and learn from master games</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Apply concepts in practical situations</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Improve calculation and visualization</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Prepare effectively for tournaments</span>
                  </li>
                </ul>

                <h3 className="text-xl font-bold mb-3">Requirements</h3>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Basic knowledge of chess rules and piece movement</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>A chess set for practice (physical or digital)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Dedication to complete exercises and assignments</span>
                  </li>
                </ul>
              </div>

              <div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-6">
                  <h3 className="font-bold text-lg mb-4">Course Includes</h3>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center">
                      <Play className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                      <span>16 video lessons (12+ hours)</span>
                    </li>
                    <li className="flex items-center">
                      <FileText className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                      <span>Comprehensive course materials</span>
                    </li>
                    <li className="flex items-center">
                      <Download className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                      <span>Downloadable resources</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                      <span>Interactive exercises</span>
                    </li>
                    <li className="flex items-center">
                      <Users className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                      <span>Community discussion</span>
                    </li>
                    <li className="flex items-center">
                      <Award className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                      <span>Certificate of completion</span>
                    </li>
                  </ul>
                  <div className="mb-4">
                    <div className="text-2xl font-bold">
                      $70 <span className="text-sm font-normal text-gray-500">per lesson</span>
                    </div>
                    <div className="text-sm text-primary">
                      Save with our packages: 5 lessons for $325 ($65/lesson) or 10 lessons for $600 ($60/lesson)
                    </div>
                  </div>
                  <Link href="/checkout" className="w-full">
                    <Button className="w-full mb-3">Enroll Now</Button>
                  </Link>
                  <p className="text-xs text-center text-gray-500">30-day money-back guarantee</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="curriculum" className="mt-0">
            <h2 className="text-2xl font-bold mb-6">Course Curriculum</h2>
            <div className="space-y-6">
              {courseDetails.curriculum.map((module, moduleIndex) => (
                <div key={moduleIndex} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 p-4 font-medium">{module.title}</div>
                  <div className="divide-y divide-gray-200">
                    {module.lessons.map((lesson, lessonIndex) => (
                      <div key={lessonIndex} className="p-4 flex justify-between items-center">
                        <div className="flex items-center">
                          {lesson.type === "video" ? (
                            <Play className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                          ) : (
                            <FileText className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                          )}
                          <span>{lesson.title}</span>
                        </div>
                        <div className="text-sm text-gray-500">{lesson.duration}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="instructor" className="mt-0">
            <h2 className="text-2xl font-bold mb-6">Meet Your Instructor</h2>
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <img
                src={courseDetails.instructor.image || "/placeholder.svg"}
                alt={courseDetails.instructor.name}
                className="rounded-full w-32 h-32 object-cover"
              />
              <div>
                <h3 className="text-xl font-bold">{courseDetails.instructor.name}</h3>
                <p className="text-primary mb-4">{courseDetails.instructor.title}</p>
                <p className="text-gray-700">{courseDetails.instructor.bio}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-0">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Student Reviews</h2>
              <div className="flex items-center">
                <div className="text-3xl font-bold mr-2">{courseDetails.rating}</div>
                <div>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <div className="text-sm text-gray-500">{courseDetails.reviews} reviews</div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Sample reviews - in a real app, these would come from a database */}
              <div className="border-b border-gray-200 pb-6">
                <div className="flex justify-between mb-2">
                  <div className="font-medium">Michael T.</div>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700">
                  This course transformed my understanding of chess. The instructor explains complex concepts in a way
                  that's easy to grasp and apply.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <div className="flex justify-between mb-2">
                  <div className="font-medium">Sarah K.</div>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4"
                        fill={i < 4 ? "currentColor" : "none"}
                        stroke={i < 4 ? "none" : "currentColor"}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700">
                  Great content but I wish there were more practice exercises. The video lessons are excellent and very
                  informative.
                </p>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <div className="font-medium">David R.</div>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700">
                  Worth every penny! I've tried many chess courses, and this is by far the most comprehensive and
                  well-structured. My rating has improved by 200 points since completing it.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Call to Action */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Master {courseDetails.title}?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of students who have transformed their chess game with our expert-led courses.
          </p>
          <Link href="/checkout">
            <Button size="lg" className="bg-primary text-white">
              Enroll Now
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}

function getCourseTitle(courseId: string): string {
  const titles = {
    beginners: "Beginner's Fundamentals",
    "tactical-vision": "Tactical Vision Training",
    "strategic-mastery": "Strategic Mastery",
    "endgame-essentials": "Endgame Essentials",
    "opening-repertoire": "Building Your Opening Repertoire",
    "tournament-preparation": "Tournament Preparation",
  }

  return titles[courseId as keyof typeof titles] || "Chess Course"
}

function getCourseLevel(courseId: string): string {
  const levels = {
    beginners: "Beginner",
    "tactical-vision": "Intermediate",
    "strategic-mastery": "Advanced",
    "endgame-essentials": "Intermediate",
    "opening-repertoire": "All Levels",
    "tournament-preparation": "Advanced",
  }

  return levels[courseId as keyof typeof levels] || "All Levels"
}

