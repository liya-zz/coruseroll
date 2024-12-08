'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function EnrollmentForm() {
  const [studentId, setStudentId] = useState('')
  const [selectedCourse, setSelectedCourse] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the enrollment data to your backend
    console.log('Enrolling:', { studentId, selectedCourse })
    // Reset form
    setStudentId('')
    setSelectedCourse('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Enroll in a Course</h2>
      <div>
        <Label htmlFor="studentId">Student ID</Label>
        <Input
          id="studentId"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="course">Select Course</Label>
        <Select value={selectedCourse} onValueChange={setSelectedCourse}>
          <SelectTrigger id="course">
            <SelectValue placeholder="Select a course" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="CS101">CS101: Introduction to Computer Science</SelectItem>
            <SelectItem value="CS201">CS201: Data Structures and Algorithms</SelectItem>
            <SelectItem value="CS301">CS301: Web Development</SelectItem>
            <SelectItem value="CS401">CS401: Database Systems</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit">Enroll</Button>
    </form>
  )
}

