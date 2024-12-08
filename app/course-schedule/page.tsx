"use client"

import { useState } from "react"
import { format, startOfWeek, addDays, addWeeks, subWeeks } from "date-fns"
import { CalendarIcon, ChevronLeft, ChevronRight, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"

// Mock enrolled courses data (in a real app, this would come from your backend)
const enrolledCourses = [
  {
    id: 1,
    code: "DM-GY 6053",
    name: "Ideation & Prototyping",
    instructor: "Dr. Emily Chen",
    time: "Mon 18:00 - 20:50",
    location: "2 MetroTech Center, Room 811",
    color: "bg-blue-500"
  },
  {
    id: 2,
    code: "DM-GY 7033",
    name: "Media Law",
    instructor: "Prof. David Lee",
    time: "Thu 18:00 - 20:50",
    location: "370 Jay St, Room 204",
    color: "bg-purple-500"
  },
  {
    id: 3,
    code: "DM-GY 9963",
    name: "Research Methods",
    instructor: "Dr. Rachel Thompson",
    time: "Fri 15:00 - 17:50",
    location: "2 MetroTech Center, Room 811",
    color: "bg-green-500"
  }
]

export default function CourseSchedulePage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<"week" | "month">("week")
  const [date, setDate] = useState<Date>()

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 })
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))
  const timeSlots = Array.from({ length: 12 }, (_, i) => i + 9) // 9am to 8pm

  const getTimePosition = (timeString: string) => {
    const [, time] = timeString.split(" ")
    const [start] = time.split(" - ")
    const [hours, minutes] = start.split(":").map(Number)
    return (hours + minutes / 60 - 9) * 60 // Convert to pixels (1 hour = 60px)
  }

  const getDayIndex = (day: string) => {
    const days = { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 0 }
    return days[day as keyof typeof days] || 0
  }

  const previousPeriod = () => {
    setCurrentDate(prev => view === "week" ? subWeeks(prev, 1) : subWeeks(prev, 4))
  }

  const nextPeriod = () => {
    setCurrentDate(prev => view === "week" ? addWeeks(prev, 1) : addWeeks(prev, 4))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Course Schedule</h1>
        <div className="flex items-center gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate) => {
                  setDate(newDate)
                  if (newDate) {
                    setCurrentDate(newDate)
                  }
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Select value={view} onValueChange={(v) => setView(v as "week" | "month")}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select view" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Week View</SelectItem>
              <SelectItem value="month">Month View</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle>
              {format(weekStart, "MMMM d, yyyy")} - {format(addDays(weekStart, 6), "MMMM d, yyyy")}
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={previousPeriod} className="h-9 w-9 p-0">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={nextPeriod} className="h-9 w-9 p-0">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-8 gap-4">
            {/* Time column */}
            <div className="space-y-[56px] pt-[88px]">
              {timeSlots.map((hour) => (
                <div key={hour} className="text-sm text-gray-500 h-[60px] -mt-3">
                  {format(new Date().setHours(hour, 0), "ha")}
                </div>
              ))}
            </div>

            {/* Days columns */}
            {weekDays.map((day, index) => (
              <div key={index} className="relative">
                <div className="text-sm font-medium text-gray-500 mb-4 text-center">
                  <div>{format(day, "EEE")}</div>
                  <div className={cn(
                    "text-lg font-semibold",
                    format(day, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd")
                      ? "text-primary"
                      : "text-gray-900"
                  )}>
                    {format(day, "d")}
                  </div>
                </div>
                <div className="border-l border-gray-200 h-[720px]">
                  {/* Hour markers */}
                  {timeSlots.map((hour) => (
                    <div
                      key={hour}
                      className="border-t border-gray-200 h-[60px]"
                    />
                  ))}
                  
                  {/* Course blocks */}
                  {enrolledCourses.map((course) => {
                    const [dayName] = course.time.split(" ")
                    if (getDayIndex(dayName) === index) {
                      return (
                        <div
                          key={course.id}
                          className={cn(
                            "absolute w-[90%] left-[5%] rounded-lg p-2",
                            course.color,
                            "text-white shadow-sm"
                          )}
                          style={{
                            top: `${getTimePosition(course.time)}px`,
                            height: "170px", // Assuming all classes are ~3 hours
                          }}
                        >
                          <div className="font-medium text-sm">{course.code}</div>
                          <div className="text-sm truncate">{course.name}</div>
                          <div className="text-xs mt-1 opacity-90">{course.instructor}</div>
                          <div className="text-xs mt-1 opacity-90">
                            <Clock className="inline-block w-3 h-3 mr-1" />
                            {course.time.split(" ").slice(1).join(" ")}
                          </div>
                          <div className="text-xs mt-1 opacity-90 truncate">
                            {course.location}
                          </div>
                        </div>
                      )
                    }
                    return null
                  })}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

