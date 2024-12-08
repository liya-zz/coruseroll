import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, ShoppingCartIcon, Clock, AlertTriangle, Info } from 'lucide-react'
import { courses } from './CourseList'
import { checkTimeConflict } from "../utils/timeConflict"
import { toast } from "@/components/ui/use-toast"
import { useState, useEffect } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface ShoppingCartProps {
  cart: string[];
  removeFromCart: (courseCode: string) => void;
  enrollInCourse: (courseCode: string) => void;
  enrolledCourses: string[];
}

export function ShoppingCart({ cart, removeFromCart, enrollInCourse, enrolledCourses }: ShoppingCartProps) {
  const [conflictingCourses, setConflictingCourses] = useState<Record<string, string[]>>({});

  useEffect(() => {
    const newConflictingCourses: Record<string, string[]> = {};
    cart.forEach(cartCourseCode => {
      const cartCourse = courses.find(c => c.code === cartCourseCode);
      if (cartCourse && cartCourse.time) {
        const conflicts = enrolledCourses.filter(enrolledCourseCode => {
          const enrolledCourse = courses.find(c => c.code === enrolledCourseCode);
          return enrolledCourse && enrolledCourse.time && checkTimeConflict(cartCourse.time, enrolledCourse.time);
        });
        if (conflicts.length > 0) {
          newConflictingCourses[cartCourseCode] = conflicts;
        }
      }
    });
    setConflictingCourses(newConflictingCourses);
  }, [cart, enrolledCourses]);

  if (!cart || cart.length === 0) {
    return null;
  }

  const cartCourses = courses.filter(course => cart.includes(course.code));

  const handleEnroll = (courseCode: string) => {
    if (conflictingCourses[courseCode]) {
      const conflictingCourseDetails = conflictingCourses[courseCode].map(code => {
        const course = courses.find(c => c.code === code);
        return `${code}: ${course?.name}`;
      }).join(', ');
      toast({
        title: "Time Conflict Detected",
        description: `Unable to enroll in ${courseCode} due to time conflicts with: ${conflictingCourseDetails}. Please review your schedule.`,
        variant: "destructive",
      });
    } else {
      enrollInCourse(courseCode);
    }
  };

  return (
    <Card className="mt-12">
      <CardHeader>
        <CardTitle>Shopping Cart</CardTitle>
      </CardHeader>
      <CardContent>
        {cartCourses.map(course => (
          <div key={course.id} className="flex justify-between items-start mb-4 last:mb-0 p-4 rounded-lg bg-gray-50">
            <div>
              <h3 className="font-semibold">{course.name}</h3>
              <p className="text-sm text-gray-600">{course.code}</p>
              <div className="flex items-center mt-1 text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                <span>{course.time || 'Time not specified'}</span>
              </div>
              {conflictingCourses[course.code] && (
                <div className="flex items-center mt-1 text-sm text-red-500">
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  <span>Conflicts with {conflictingCourses[course.code].join(', ')}</span>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={conflictingCourses[course.code] ? "outline" : "default"}
                      size="sm"
                      onClick={() => conflictingCourses[course.code] ? handleEnroll(course.code) : enrollInCourse(course.code)}
                      aria-label={`Enroll in ${course.name}`}
                      className={conflictingCourses[course.code] ? "border-red-500 text-red-500" : "bg-primary text-primary-foreground hover:bg-primary/90"}
                    >
                      <ShoppingCartIcon className="h-4 w-4 mr-2" />
                      {conflictingCourses[course.code] ? "Conflict" : "Enroll"}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {conflictingCourses[course.code] 
                      ? "This course conflicts with your current schedule. Click to see details."
                      : "Enroll in this course"}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFromCart(course.code)}
                aria-label={`Remove ${course.name} from cart`}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-start">
            <Info className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
            <p className="text-sm text-blue-700">
              Courses with time conflicts are highlighted. You can still enroll in conflicting courses, but please ensure you can manage the schedule before proceeding.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

