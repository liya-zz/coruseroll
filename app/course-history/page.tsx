"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from 'lucide-react'

// Mock course history data (in a real app, this would come from your backend)
const courseHistory = [
  {
    term: "Fall 2023",
    courses: [
      {
        code: "DM-GY 6053",
        name: "Ideation & Prototyping",
        instructor: "Dr. Emily Chen",
        credits: 3,
        grade: "A",
        status: "Completed"
      },
      {
        code: "DM-GY 7033",
        name: "Media Law",
        instructor: "Prof. David Lee",
        credits: 3,
        grade: "A-",
        status: "Completed"
      }
    ]
  },
  {
    term: "Spring 2023",
    courses: [
      {
        code: "DM-GY 6043",
        name: "Theories and Cultural Impact",
        instructor: "Prof. Michael Rodriguez",
        credits: 3,
        grade: "B+",
        status: "Completed"
      },
      {
        code: "DM-GY 6063",
        name: "Creative Coding",
        instructor: "Dr. Sarah Johnson",
        credits: 3,
        grade: "A",
        status: "Completed"
      }
    ]
  },
  {
    term: "Fall 2022",
    courses: [
      {
        code: "DM-GY 9963",
        name: "Research Methods",
        instructor: "Dr. Rachel Thompson",
        credits: 3,
        grade: "A",
        status: "Completed"
      },
      {
        code: "DM-GY 6133",
        name: "Mobile AR Studio",
        instructor: "Dr. Jason Wong",
        credits: 3,
        grade: "A-",
        status: "Completed"
      }
    ]
  }
]

export default function CourseHistoryPage() {
  const [selectedTerm, setSelectedTerm] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredHistory = courseHistory.filter(term => {
    if (selectedTerm !== "all" && term.term !== selectedTerm) return false
    
    if (searchQuery) {
      return term.courses.some(course =>
        course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    return true
  })

  const totalCredits = courseHistory.reduce((acc, term) => 
    acc + term.courses.reduce((termAcc, course) => termAcc + course.credits, 0)
  , 0)

  const gpaPoints = {
    'A': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D+': 1.3, 'D': 1.0, 'F': 0.0
  }

  const calculateGPA = () => {
    let totalPoints = 0
    let totalCredits = 0

    courseHistory.forEach(term => {
      term.courses.forEach(course => {
        const points = gpaPoints[course.grade as keyof typeof gpaPoints]
        if (points !== undefined) {
          totalPoints += points * course.credits
          totalCredits += course.credits
        }
      })
    })

    return (totalPoints / totalCredits).toFixed(2)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Course History</h1>
          <div className="text-gray-600">
            Total Credits: {totalCredits} • Current GPA: {calculateGPA()}
          </div>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-[300px]"
            />
          </div>
          <Select value={selectedTerm} onValueChange={setSelectedTerm}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select term" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Terms</SelectItem>
              {courseHistory.map(term => (
                <SelectItem key={term.term} value={term.term}>
                  {term.term}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredHistory.map((term) => (
        <Card key={term.term} className="mb-6">
          <CardHeader>
            <CardTitle>{term.term}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course Code</TableHead>
                  <TableHead>Course Name</TableHead>
                  <TableHead>Instructor</TableHead>
                  <TableHead>Credits</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {term.courses.map((course) => (
                  <TableRow key={course.code}>
                    <TableCell className="font-medium">{course.code}</TableCell>
                    <TableCell>{course.name}</TableCell>
                    <TableCell>{course.instructor}</TableCell>
                    <TableCell>{course.credits}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-mono">
                        {course.grade}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="secondary" 
                        className="bg-green-100 text-green-800 border-green-300"
                      >
                        {course.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

