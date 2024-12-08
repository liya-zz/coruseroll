import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Clock } from 'lucide-react'
import { courses } from './CourseList'  // Import courses directly

interface Course {
  id: string;
  code: string;
  name: string;
  instructor: string;
  time: string;
  location: string;
  credit: number;
  category: "IDM Core" | "IDM Elective" | "IDM Seminar";
  requiredSoftware: string[];
  status: "Open" | "Waitlist" | "Closed";
}

interface WaitlistSectionProps {
  waitlist: string[];
  removeFromWaitlist: (courseCode: string) => void;
}

export function WaitlistSection({ waitlist, removeFromWaitlist }: WaitlistSectionProps) {
  if (!waitlist || waitlist.length === 0) {
    return null;
  }

  const waitlistedCourses = courses.filter(course => waitlist.includes(course.code));

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Waitlist</CardTitle>
      </CardHeader>
      <CardContent>
        {waitlistedCourses.map(course => (
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
              onClick={() => removeFromWaitlist(course.code)}
              aria-label={`Remove ${course.name} from waitlist`}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

