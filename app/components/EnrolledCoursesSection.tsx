import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Clock } from 'lucide-react'
import { courses } from './CourseList'

interface EnrolledCoursesSectionProps {
  enrolledCourses: string[];
  unenrollFromCourse: (courseCode: string) => void;
}

export function EnrolledCoursesSection({ enrolledCourses, unenrollFromCourse }: EnrolledCoursesSectionProps) {
  if (!enrolledCourses || enrolledCourses.length === 0) {
    return null;
  }

  const enrolledCoursesData = courses.filter(course => enrolledCourses.includes(course.code));

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Enrolled Courses</CardTitle>
      </CardHeader>
      <CardContent>
        {enrolledCoursesData.map(course => (
          <div key={course.id} className="flex justify-between items-center mb-4 last:mb-0">
            <div>
              <h3 className="font-semibold">{course.name}</h3>
              <p className="text-sm text-gray-600">{course.code}</p>
              <div className="flex items-center mt-1 text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                <span>{course.time}</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => unenrollFromCourse(course.code)}
              aria-label={`Unenroll from ${course.name}`}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

