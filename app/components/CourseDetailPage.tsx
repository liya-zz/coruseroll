import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { courses } from './CourseList'
import Link from 'next/link'

interface CourseDetailPageProps {
  courseCode: string;
  onBack: () => void;
  addToCart: (courseCode: string) => void;
  removeFromCart: (courseCode: string) => void;
  addToWaitlist: (courseCode: string) => void;
  removeFromWaitlist: (courseCode: string) => void;
  addToTracking: (courseCode: string) => void;
  removeFromTracking: (courseCode: string) => void;
  cart: string[];
  waitlist: string[];
  trackedCourses: string[];
}

export function CourseDetailPage({
  courseCode,
  onBack,
  addToCart,
  removeFromCart,
  addToWaitlist,
  removeFromWaitlist,
  addToTracking,
  removeFromTracking,
  cart,
  waitlist,
  trackedCourses
}: CourseDetailPageProps) {
  const course = courses.find(c => c.code === courseCode);

  if (!course) {
    return <div>Course not found</div>;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'bg-green-500 text-white'
      case 'Waitlist':
        return 'bg-yellow-500 text-white'
      case 'Closed':
        return 'bg-red-500 text-white'
      default:
        return 'bg-gray-500 text-white'
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Button 
        onClick={onBack} 
        variant="ghost" 
        className="mb-6 hover:bg-gray-100"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Course List
      </Button>

      <h1 className="text-3xl font-bold mb-8">{course.code}: {course.name}</h1>

      <div className="grid gap-6 md:grid-cols-[2fr,1fr]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <div className="flex justify-between">
                  <span className="font-semibold">Instructor:</span>
                  <span>{course.instructor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Schedule:</span>
                  <span>{course.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Credits:</span>
                  <span>{course.credit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Category:</span>
                  <span>{course.category}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Status:</span>
                  <Badge className={getStatusColor(course.status)}>
                    {course.status}
                  </Badge>
                </div>
              </div>
              <div className="pt-4">
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-gray-600">
                  This course focuses on the process of creating new ideas and turning them into
                  tangible prototypes. Students will learn various ideation techniques and prototyping
                  methodologies while developing their creative thinking and problem-solving skills.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Professor Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <div className="flex justify-between">
                  <span className="font-semibold">Name:</span>
                  <span>{course.instructor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Email:</span>
                  <Link href={`mailto:${course.instructor.toLowerCase().replace(/\s/g, '')}@university.edu`} className="text-blue-600 hover:underline">
                    {course.instructor.toLowerCase().replace(/\s/g, '')}@university.edu
                  </Link>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Office:</span>
                  <span>{course.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Office Hours:</span>
                  <span>Monday and Wednesday, 2:00 PM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Personal Web:</span>
                  <Link href={`https://${course.instructor.toLowerCase().replace(/\s/g, '')}.university.edu`} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                    {course.instructor.toLowerCase().replace(/\s/g, '')}.university.edu
                    <ExternalLink className="inline-block ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold mb-2">Required Software</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                {course.requiredSoftware.map((software, index) => (
                  <li key={index}>{software}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Previous Course Materials</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Previous Course Web:</span>
                <Button variant="link" asChild>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    View <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold">Previous Course Syllabus:</span>
                <Button variant="link" asChild>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    Download PDF <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                {course.status === 'Open' 
                  ? 'This course is open for enrollment.'
                  : course.status === 'Waitlist'
                    ? 'This course is currently full. You can join the waitlist.'
                    : 'This course is closed for enrollment.'}
              </p>
              <div className="flex flex-col space-y-2">
                {course.status === 'Open' && (
                  <Button 
                    onClick={() => cart.includes(course.code) ? removeFromCart(course.code) : addToCart(course.code)}
                    variant={cart.includes(course.code) ? "destructive" : "default"}
                  >
                    {cart.includes(course.code) ? 'Remove from Cart' : 'Add to Cart'}
                  </Button>
                )}
                {course.status === 'Waitlist' && (
                  <Button 
                    onClick={() => waitlist.includes(course.code) ? removeFromWaitlist(course.code) : addToWaitlist(course.code)}
                    variant="secondary"
                  >
                    {waitlist.includes(course.code) ? 'Leave Waitlist' : 'Join Waitlist'}
                  </Button>
                )}
                {(course.status === 'Waitlist' || course.status === 'Closed') && (
                  <Button 
                    onClick={() => trackedCourses.includes(course.code) ? removeFromTracking(course.code) : addToTracking(course.code)}
                    variant={trackedCourses.includes(course.code) ? "destructive" : "outline"}
                  >
                    {trackedCourses.includes(course.code) ? 'Untrack' : 'Track Course'}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

