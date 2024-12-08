'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { courses } from './CourseList'
import { format, addDays, startOfWeek, isSameDay } from 'date-fns'

interface CourseScheduleProps {
  enrolledCourses: string[]
}

export function CourseSchedule({ enrolledCourses }: CourseScheduleProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  
  const enrolledCoursesData = courses.filter(course => enrolledCourses.includes(course.code))
  
  const timeSlots = Array.from({ length: 10 }, (_, i) => i + 12) // 12pm to 9pm
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 })
  const weekDays = Array.from({ length: 5 }, (_, i) => addDays(weekStart, i))

  const getTimePosition = (timeString: string) => {
    if (!timeString) return 0;
    const [hours, minutes] = timeString.split(':').map(Number);
    if (isNaN(hours) || isNaN(minutes)) return 0;
    return (hours + minutes / 60 - 12) * 60; // Convert to pixels (1 hour = 60px)
  }

  const parseCourseTime = (time: string) => {
    if (!time) {
      return { day: '', start: 0, end: 0 };
    }
    const [day, timeRange] = time.split(' ');
    if (!timeRange) {
      return { day: day.toLowerCase(), start: 0, end: 0 };
    }
    const [start, end] = timeRange.split(' - ');
    return {
      day: day.toLowerCase(),
      start: getTimePosition(start),
      end: getTimePosition(end),
    }
  }

  const dayMap: { [key: string]: number } = {
    'mon': 1,
    'tue': 2,
    'wed': 3,
    'thu': 4,
    'fri': 5,
  }

  const previousWeek = () => {
    setCurrentDate(prev => addDays(prev, -7))
  }

  const nextWeek = () => {
    setCurrentDate(prev => addDays(prev, 7))
  }

  return (
    <Card className="mt-6 p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <Button variant="ghost" size="sm" onClick={previousWeek} className="text-gray-600 hover:text-gray-900 h-9 w-9 p-0">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h3 className="text-2xl font-semibold text-gray-900">Course Schedule</h3>
        <Button variant="ghost" size="sm" onClick={nextWeek} className="text-gray-600 hover:text-gray-900 h-9 w-9 p-0">
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="relative">
        {/* Header */}
        <div className="grid grid-cols-6 gap-4 mb-4 border-b border-gray-200 pb-2">
          <div className="w-16"></div> {/* Time column */}
          {weekDays.map((date, i) => (
            <div 
              key={i}
              className={`text-center py-2 ${
                isSameDay(date, currentDate) 
                  ? 'text-blue-600 font-semibold' 
                  : 'text-gray-600'
              }`}
            >
              <div className="text-base">{format(date, 'EEE')}</div>
              <div className="text-xl font-medium">{format(date, 'd')}</div>
            </div>
          ))}
        </div>

        {/* Time slots */}
        <div className="relative" style={{ height: '600px' }}>
          {timeSlots.map((hour) => (
            <div 
              key={hour} 
              className="absolute w-full grid grid-cols-6 gap-4 border-t border-gray-100"
              style={{ top: `${(hour - 12) * 60}px` }}
            >
              <div className="text-sm text-gray-400 -mt-2 flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {hour === 12 ? '12pm' : `${hour % 12}pm`}
              </div>
              {[0, 1, 2, 3, 4].map((day) => (
                <div key={day} className="relative"></div>
              ))}
            </div>
          ))}

          {/* Course blocks */}
          {enrolledCoursesData.map((course) => {
            const { day, start, end } = parseCourseTime(course.time);
            const dayIndex = dayMap[day];
            if (!dayIndex || start === end) return null;

            return (
              <div
                key={course.code}
                className="absolute rounded-lg p-2 text-xs text-primary-foreground bg-gradient-to-br from-primary to-primary/80 overflow-hidden shadow-sm"
                style={{
                  top: `${start}px`,
                  height: `${end - start}px`,
                  left: `${dayIndex * 16.66}%`,
                  width: '15%',
                }}
              >
                <div className="font-semibold truncate text-base">{course.name}</div>
                <div className="truncate text-sm text-primary-foreground/90">{course.instructor}</div>
                <div className="truncate text-sm text-primary-foreground/90">{course.location}</div>
              </div>
            )
          })}
        </div>
      </div>
    </Card>
  )
}

