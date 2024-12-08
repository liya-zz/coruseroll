import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, X, Clock } from 'lucide-react'
import { courses } from './CourseList'

interface TrackingSectionProps {
  trackedCourses: string[];
  removeFromTracking: (courseCode: string) => void;
  notifyUser: (courseCode: string) => void;
}

export function TrackingSection({ trackedCourses, removeFromTracking, notifyUser }: TrackingSectionProps) {
  if (!trackedCourses || trackedCourses.length === 0) {
    return null;
  }

  const trackedCoursesData = courses.filter(course => trackedCourses.includes(course.code));

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Tracked Courses</CardTitle>
      </CardHeader>
      <CardContent>
        {trackedCoursesData.map(course => (
          <div key={course.id} className="flex justify-between items-center mb-4 last:mb-0">
            <div>
              <h3 className="font-semibold">{course.name}</h3>
              <p className="text-sm text-gray-600">{course.code}</p>
              <div className="flex items-center mt-1 text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                <span>{course.time}</span>
              </div>
              <p className="text-sm text-gray-600">Status: {course.status}</p>
            </div>
            <div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => notifyUser(course.code)}
                className="mr-2"
              >
                Simulate Notification
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFromTracking(course.code)}
                aria-label={`Stop tracking ${course.name}`}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

