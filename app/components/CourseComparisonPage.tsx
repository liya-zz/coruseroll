import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ShoppingCart, Clock, Bell, ArrowLeft } from 'lucide-react'
import { courses } from './CourseList'
import { toast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"

interface CourseComparisonPageProps {
  selectedCourses: string[];
  addToCart: (courseCode: string) => void;
  addToWaitlist: (courseCode: string) => void;
  addToTracking: (courseCode: string) => void;
  enrollInCourse: (courseCode: string) => void;
  cart: string[];
  waitlist: string[];
  trackedCourses: string[];
  onClose: () => void;
}

export function CourseComparisonPage({ 
  selectedCourses, 
  addToCart, 
  addToWaitlist, 
  addToTracking,
  enrollInCourse,
  cart,
  waitlist,
  trackedCourses,
  onClose
}: CourseComparisonPageProps) {
  const selectedCoursesData = courses.filter(course => selectedCourses.includes(course.code));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'bg-green-100 text-green-800 border-green-300'
      case 'Waitlist':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'Closed':
        return 'bg-red-100 text-red-800 border-red-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button onClick={onClose} variant="outline" className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Course List
      </Button>
      <h1 className="text-3xl font-bold mb-6">Course Comparison</h1>
      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="min-w-[1000px]">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border text-left font-semibold w-1/5">Course Details</th>
                {selectedCoursesData.map(course => (
                  <th key={course.code} className="p-2 border text-left font-semibold w-1/5">{course.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border font-semibold">Course Code</td>
                {selectedCoursesData.map(course => (
                  <td key={course.code} className="p-2 border">{course.code}</td>
                ))}
              </tr>
              <tr>
                <td className="p-2 border font-semibold">Instructor</td>
                {selectedCoursesData.map(course => (
                  <td key={course.code} className="p-2 border">{course.instructor}</td>
                ))}
              </tr>
              <tr>
                <td className="p-2 border font-semibold">Time</td>
                {selectedCoursesData.map(course => (
                  <td key={course.code} className="p-2 border">{course.time}</td>
                ))}
              </tr>
              <tr>
                <td className="p-2 border font-semibold">Location</td>
                {selectedCoursesData.map(course => (
                  <td key={course.code} className="p-2 border">{course.location}</td>
                ))}
              </tr>
              <tr>
                <td className="p-2 border font-semibold">Credits</td>
                {selectedCoursesData.map(course => (
                  <td key={course.code} className="p-2 border">{course.credit}</td>
                ))}
              </tr>
              <tr>
                <td className="p-2 border font-semibold">Category</td>
                {selectedCoursesData.map(course => (
                  <td key={course.code} className="p-2 border">{course.category}</td>
                ))}
              </tr>
              <tr>
                <td className="p-2 border font-semibold">Required Software</td>
                {selectedCoursesData.map(course => (
                  <td key={course.code} className="p-2 border">
                    <ul className="list-disc list-inside">
                      {course.requiredSoftware.map((software, index) => (
                        <li key={index}>{software}</li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-2 border font-semibold">Status</td>
                {selectedCoursesData.map(course => (
                  <td key={course.code} className="p-2 border">
                    <Badge className={getStatusColor(course.status)}>{course.status}</Badge>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-2 border font-semibold">Actions</td>
                {selectedCoursesData.map(course => (
                  <td key={course.code} className="p-2 border space-y-2">
                    <div className="flex flex-col gap-2">
                      {course.status === 'Open' && (
                        <>
                          <Button
                            onClick={() => {
                              addToCart(course.code);
                              toast({
                                title: "Added to cart",
                                description: `${course.code} has been added to your cart.`,
                              });
                            }}
                            disabled={cart.includes(course.code)}
                            className="w-full mb-2"
                          >
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            {cart.includes(course.code) ? 'In Cart' : 'Add to Cart'}
                          </Button>
                          {cart.includes(course.code) && (
                            <Button
                              onClick={() => {
                                enrollInCourse(course.code);
                                toast({
                                  title: "Enrolled in course",
                                  description: `You have successfully enrolled in ${course.code}.`,
                                });
                              }}
                              className="w-full"
                            >
                              Enroll
                            </Button>
                          )}
                        </>
                      )}
                      {course.status === 'Waitlist' && (
                        <Button
                          onClick={() => {
                            addToWaitlist(course.code);
                            toast({
                              title: "Added to waitlist",
                              description: `${course.code} has been added to your waitlist.`,
                            });
                          }}
                          disabled={waitlist.includes(course.code)}
                          variant="secondary"
                          className="w-full"
                        >
                          <Clock className="mr-2 h-4 w-4" />
                          {waitlist.includes(course.code) ? 'On Waitlist' : 'Join Waitlist'}
                        </Button>
                      )}
                      {(course.status === 'Waitlist' || course.status === 'Closed') && (
                        <Button
                          onClick={() => {
                            addToTracking(course.code);
                            toast({
                              title: "Course tracked",
                              description: `You will be notified when ${course.code} becomes available.`,
                            });
                          }}
                          disabled={trackedCourses.includes(course.code)}
                          variant="outline"
                          className="w-full"
                        >
                          <Bell className="mr-2 h-4 w-4" />
                          {trackedCourses.includes(course.code) ? 'Tracking' : 'Track Course'}
                        </Button>
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </ScrollArea>
    </div>
  )
}

