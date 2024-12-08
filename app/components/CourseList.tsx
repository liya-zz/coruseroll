"use client"

import { useState, useCallback, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { User, BookOpen, Laptop, Calendar, MapPin, ShoppingCart, Clock, Bell, X, Search, Filter, Info } from 'lucide-react'
import { toast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


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

const courses: Course[] = [
  // IDM Core classes
  { id: "1", code: "DM-GY 6053", name: "Ideation & Prototyping", instructor: "Dr. Emily Chen", time: "Mon 18:00 - 20:50", location: "2 MetroTech Center, Room 811", credit: 3, category: "IDM Core", requiredSoftware: ["Adobe Creative Suite", "Figma"], status: "Open" },
  { id: "2", code: "DM-GY 6043", name: "Theories and Cultural Impact of Media & Technology", instructor: "Prof. Michael Rodriguez", time: "Tue 18:00 - 20:50", location: "370 Jay St, Room 1201", credit: 3, category: "IDM Core", requiredSoftware: ["Zotero"], status: "Waitlist" },
  { id: "3", code: "DM-GY 6063", name: "Creative Coding", instructor: "Dr. Sarah Johnson", time: "Wed 18:00 - 20:50", location: "370 Jay St, Room 304", credit: 3, category: "IDM Core", requiredSoftware: ["Processing", "p5.js"], status: "Closed" },
  { id: "4", code: "DM-GY 7033", name: "Media Law", instructor: "Prof. David Lee", time: "Thu 18:00 - 20:50", location: "370 Jay St, Room 204", credit: 3, category: "IDM Core", requiredSoftware: ["LexisNexis"], status: "Open" },
  { id: "5", code: "DM-GY 9963", name: "Research Methods", instructor: "Dr. Rachel Thompson", time: "Fri 15:00 - 17:50", location: "2 MetroTech Center, Room 811", credit: 3, category: "IDM Core", requiredSoftware: ["SPSS", "NVivo"], status: "Open" },
  { id: "6", code: "DM-GY 9973", name: "Thesis in Design & Media", instructor: "Prof. Alexandra Kim", time: "Thu 15:00 - 17:50", location: "370 Jay St, Room 1201", credit: 3, category: "IDM Core", requiredSoftware: ["Various based on project"], status: "Open" },
  
  // IDM Elective Classes
  { id: "7", code: "DM-GY 6133", name: "Mobile Augmented Reality Studio", instructor: "Dr. Jason Wong", time: "Mon 15:00 - 17:50", location: "370 Jay St, Room 304", credit: 3, category: "IDM Elective", requiredSoftware: ["Unity", "ARKit", "ARCore"], status: "Open" },
  { id: "8", code: "DM-GY 7133", name: "User Experience Design", instructor: "Prof. Olivia Martinez", time: "Tue 15:00 - 17:50", location: "2 MetroTech Center, Room 811", credit: 3, category: "IDM Elective", requiredSoftware: ["Sketch", "InVision"], status: "Waitlist" },
  { id: "9", code: "DM-GY 6103", name: "Live Performance Studio", instructor: "Dr. Daniel Brown", time: "Wed 18:00 - 20:50", location: "370 Jay St, Room 204", credit: 3, category: "IDM Elective", requiredSoftware: ["Max/MSP", "Ableton Live"], status: "Open" },
  { id: "10", code: "DM-GY 6113", name: "Sound Studio", instructor: "Prof. Sophia Lee", time: "Thu 18:00 - 20:50", location: "2 MetroTech Center, Room 811", credit: 3, category: "IDM Elective", requiredSoftware: ["Pro Tools", "Audacity"], status: "Closed" },
  { id: "11", code: "DM-GY 9103-A", name: "Project Development Studio", instructor: "Dr. Robert Taylor", time: "Fri 18:00 - 20:50", location: "370 Jay St, Room 1201", credit: 3, category: "IDM Elective", requiredSoftware: ["Various based on project"], status: "Open" },
  { id: "12", code: "DM-GY 6143", name: "Interaction Design Studio", instructor: "Prof. Emma Wilson", time: "Mon 18:00 - 20:50", location: "370 Jay St, Room 304", credit: 3, category: "IDM Elective", requiredSoftware: ["Adobe XD", "Principle"], status: "Waitlist" },
  { id: "13", code: "DM-GY 6153", name: "Game Design Studio", instructor: "Dr. Christopher Davis", time: "Tue 18:00 - 20:50", location: "2 MetroTech Center, Room 811", credit: 3, category: "IDM Elective", requiredSoftware: ["Unity", "Unreal Engine"], status: "Open" },
  { id: "14", code: "DM-GY 9103-B", name: "Accessibility As Creative Practice", instructor: "Prof. Natalie Green", time: "Wed 15:00 - 17:50", location: "370 Jay St, Room 204", credit: 3, category: "IDM Elective", requiredSoftware: ["NVDA", "JAWS"], status: "Open" },
  { id: "15", code: "DM-GY 9103-C", name: "Future of UX & AI", instructor: "Dr. Andrew Park", time: "Thu 15:00 - 17:50", location: "2 MetroTech Center, Room 811", credit: 3, category: "IDM Elective", requiredSoftware: ["TensorFlow", "PyTorch"], status: "Waitlist" },
  { id: "16", code: "DM-GY 9103-D", name: "Museum Access and Accessible Interpretation", instructor: "Prof. Laura Adams", time: "Fri 15:00 - 17:50", location: "370 Jay St, Room 1201", credit: 3, category: "IDM Elective", requiredSoftware: ["SketchUp", "AutoCAD"], status: "Open" },
  { id: "17", code: "DM-GY 9103-E", name: "Affective Interfaces", instructor: "Dr. Katherine Isbister", time: "Mon 15:00 - 17:50", location: "370 Jay St, Room 310", credit: 3, category: "IDM Elective", requiredSoftware: ["Arduino IDE", "Processing"], status: "Open" },
  { id: "18", code: "DM-GY 9103-F", name: "Tech, Media & Democracy", instructor: "Prof. Meredith Broussard", time: "Tue 18:00 - 20:50", location: "2 MetroTech Center, Room 901", credit: 3, category: "IDM Elective", requiredSoftware: ["R", "Python"], status: "Open" },
  { id: "19", code: "DM-GY 9103-G", name: "Bio Design Studio", instructor: "Dr. William Myers", time: "Wed 15:00 - 17:50", location: "370 Jay St, Room 410", credit: 3, category: "IDM Elective", requiredSoftware: ["Fusion 360", "Rhino"], status: "Open" },
  { id: "20", code: "DM-GY 9102", name: "Restorative Spaces", instructor: "Prof. Carla Leitao", time: "Thu 15:00 - 17:50", location: "2 MetroTech Center, Room 811", credit: 3, category: "IDM Elective", requiredSoftware: ["SketchUp", "V-Ray"], status: "Open" },
  { id: "21", code: "DM-GY 9103-H", name: "Deep Learning For Media", instructor: "Dr. Aaron Hertzmann", time: "Fri 18:00 - 20:50", location: "370 Jay St, Room 304", credit: 3, category: "IDM Elective", requiredSoftware: ["TensorFlow", "PyTorch", "CUDA"], status: "Open" },
  { id: "22", code: "DM-GY 9103-I", name: "Better Storytelling Through Humor and Game Engines", instructor: "Prof. Winnie Song", time: "Mon 18:00 - 20:50", location: "2 MetroTech Center, Room 901", credit: 3, category: "IDM Elective", requiredSoftware: ["Unity", "Twine"], status: "Open" },
  { id: "23", code: "DM-GY 9103-J", name: "Reuse, Rethink, Resilience", instructor: "Dr. Tega Brain", time: "Tue 15:00 - 17:50", location: "370 Jay St, Room 410", credit: 3, category: "IDM Elective", requiredSoftware: ["Arduino IDE", "Fusion 360"], status: "Open" },
  { id: "24", code: "DM-GY 9103-K", name: "VR Studio", instructor: "Prof. Jesse Ayala", time: "Wed 18:00 - 20:50", location: "2 MetroTech Center, Room 811", credit: 3, category: "IDM Elective", requiredSoftware: ["Unity", "Oculus SDK"], status: "Open" },
  { id: "25", code: "DM-GY 9103-L", name: "Looking Forward", instructor: "Dr. Marina Zurkow", time: "Thu 18:00 - 20:50", location: "370 Jay St, Room 310", credit: 3, category: "IDM Elective", requiredSoftware: ["Adobe Creative Suite", "Blender"], status: "Open" },
  { id: "26", code: "DM-GY 9103-M", name: "Conservation of AI-Based Artworks", instructor: "Prof. Deena Engel", time: "Fri 15:00 - 17:50", location: "2 MetroTech Center, Room 901", credit: 3, category: "IDM Elective", requiredSoftware: ["Python", "TensorFlow"], status: "Open" },
  { id: "27", code: "DM-GY 9201", name: "Architectural Projection Mapping", instructor: "BRYANT", time: "Wed 14:00 - 16:50", location: "Building 22 Room 332", credit: 1.5, category: "IDM Elective", requiredSoftware: ["MadMapper", "After Effects"], status: "Closed" },
  { id: "28", code: "DM-GY 9201", name: "Virtual Production Cinematics", instructor: "BRYANT, TODD", time: "Wed 14:00 - 16:50", location: "Building 22 Room 332", credit: 1.5, category: "IDM Elective", requiredSoftware: ["Unreal Engine", "DaVinci Resolve"], status: "Waitlist" },
  
  // IDM Seminar Classes
  { id: "29", code: "DM-GY 9113-A", name: "Science, Technology, and Society", instructor: "Dr. Amanda Johnson", time: "Wed 18:00 - 20:50", location: "370 Jay St, Room 204", credit: 3, category: "IDM Seminar", requiredSoftware: ["Zotero", "Mendeley"], status: "Open" },
  { id: "30", code: "DM-GY 9113-B", name: "Histories, Theories & Practices of Haptics", instructor: "Prof. David Chen", time: "Thu 18:00 - 20:50", location: "2 MetroTech Center, Room 811", credit: 3, category: "IDM Seminar", requiredSoftware: ["Haptic simulation software"], status: "Waitlist" },
  { id: "31", code: "DM-GY 9113-C", name: "Race, Culture, Design & Technology", instructor: "Dr. Maria Rodriguez", time: "Fri 18:00 - 20:50", location: "370 Jay St, Room 1201", credit: 3, category: "IDM Seminar", requiredSoftware: ["Data analysis tools"], status: "Open" },
  { id: "32", code: "DM-GY 9113-D", name: "Design for Social Impact", instructor: "Prof. Sarah Thompson", time: "Mon 18:00 - 20:50", location: "370 Jay St, Room 304", credit: 3, category: "IDM Seminar", requiredSoftware: ["Design thinking tools"], status: "Closed" },
]

interface CourseListProps {
  cart: string[];
  addToCart: (courseCode: string) => void;
  removeFromCart: (courseCode: string) => void;
  waitlist: string[];
  addToWaitlist: (courseCode: string) => void;
  removeFromWaitlist: (courseCode: string) => void;
  trackedCourses: string[];
  addToTracking: (courseCode: string) => void;
  removeFromTracking: (courseCode: string) => void;
  selectedForComparison: string[];
  toggleCourseSelection: (courseCode: string) => void;
  maxComparison: number;
  enrolledCourses: string[];
  setIsComparisonPageOpen: (isOpen: boolean) => void; 
  onViewDetails: (courseCode: string) => void; 
}

export function CourseList({ 
  cart, 
  addToCart, 
  removeFromCart, 
  waitlist, 
  addToWaitlist, 
  removeFromWaitlist, 
  trackedCourses, 
  addToTracking, 
  removeFromTracking, 
  selectedForComparison, 
  toggleCourseSelection, 
  maxComparison,
  enrolledCourses,
  setIsComparisonPageOpen, 
  onViewDetails 
}: CourseListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [creditsFilter, setCreditsFilter] = useState("All");
  const [weekdayFilter, setWeekdayFilter] = useState("All");
  const [timeFilter, setTimeFilter] = useState("All");

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch = 
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = categoryFilter === "All" || course.category === categoryFilter;
      const matchesStatus = statusFilter === "All" || course.status === statusFilter;
      const matchesCredits = creditsFilter === "All" || course.credit.toString() === creditsFilter;
      const matchesWeekday = weekdayFilter === "All" || course.time.toLowerCase().startsWith(weekdayFilter.toLowerCase());

      const matchesTime = () => {
        if (timeFilter === "All") return true;
        const [, courseStartTime] = course.time.split(' ');
        const courseStartHour = parseInt(courseStartTime.split(':')[0], 10);
        
        switch (timeFilter) {
          case "Morning":
            return courseStartHour >= 8 && courseStartHour < 12;
          case "Afternoon":
            return courseStartHour >= 12 && courseStartHour < 17;
          case "Evening":
            return courseStartHour >= 17;
          default:
            return true;
        }
      };

      return matchesSearch && matchesCategory && matchesStatus && matchesCredits && matchesWeekday && matchesTime();
    });
  }, [searchTerm, categoryFilter, statusFilter, creditsFilter, weekdayFilter, timeFilter]);

  const categories = Array.from(new Set(filteredCourses.map(course => course.category)));

  const getStatusColor = (status: Course['status']) => {
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

  const getCategoryColor = (category: Course['category']) => {
    switch (category) {
      case 'IDM Core':
        return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'IDM Elective':
        return 'bg-purple-100 text-purple-800 border-purple-300'
      case 'IDM Seminar':
        return 'bg-orange-100 text-orange-800 border-orange-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const handleTrackingToggle = useCallback((courseCode: string) => {
    if (trackedCourses.includes(courseCode)) {
      removeFromTracking(courseCode);
    } else {
      addToTracking(courseCode);
    }
  }, [trackedCourses, addToTracking, removeFromTracking]);

  const handleToggleCourseSelection = (courseCode: string) => {
    if (selectedForComparison.includes(courseCode)) {
      toggleCourseSelection(courseCode);
    } else if (selectedForComparison.length < maxComparison) {
      toggleCourseSelection(courseCode);
    } else {
      toast({
        title: "Comparison limit reached",
        description: `You can compare up to ${maxComparison} courses at a time.`,
        variant: "destructive",
      });
    }
  };

  const handleAddToCart = (course: Course) => {
    addToCart(course.code);
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setCategoryFilter("All");
    setStatusFilter("All");
    setCreditsFilter("All");
    setWeekdayFilter("All");
    setTimeFilter("All");
  };

  const openComparisonPage = () => {
    if (selectedForComparison.length < 2) {
      toast({
        title: "Not enough courses selected",
        description: "Please select at least two courses to compare.",
        variant: "destructive",
      });
    } else if (selectedForComparison.length > maxComparison) {
      toast({
        title: "Too many courses selected",
        description: `You can compare up to ${maxComparison} courses at a time.`,
        variant: "destructive",
      });
    } else {
      setIsComparisonPageOpen(true);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm sticky top-0 z-20 backdrop-filter backdrop-blur-lg bg-opacity-90">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-900">IDM Course Catalog</h1>
            <Button 
              onClick={openComparisonPage} 
              disabled={selectedForComparison.length < 2}
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg"
              variant="default"
            >
              Compare Selected Courses ({selectedForComparison.length})
            </Button>
          </div>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Search courses by name, code, or instructor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full text-lg"
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category-filter" className="text-sm font-medium text-gray-700">Category</Label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger id="category-filter">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Categories</SelectItem>
                  <SelectItem value="IDM Core">IDM Core</SelectItem>
                  <SelectItem value="IDM Elective">IDM Elective</SelectItem>
                  <SelectItem value="IDM Seminar">IDM Seminar</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status-filter" className="text-sm font-medium text-gray-700">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger id="status-filter">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Statuses</SelectItem>
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="Waitlist">Waitlist</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="credits-filter" className="text-sm font-medium text-gray-700">Credits</Label>
              <Select value={creditsFilter} onValueChange={setCreditsFilter}>
                <SelectTrigger id="credits-filter">
                  <SelectValue placeholder="All Credits" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Credits</SelectItem>
                  <SelectItem value="1.5">1.5 Credits</SelectItem>
                  <SelectItem value="2">2 Credits</SelectItem>
                  <SelectItem value="3">3 Credits</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="weekday-filter" className="text-sm font-medium text-gray-700">Weekday</Label>
              <Select value={weekdayFilter} onValueChange={setWeekdayFilter}>
                <SelectTrigger id="weekday-filter">
                  <SelectValue placeholder="All Weekdays" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Weekdays</SelectItem>
                  <SelectItem value="Mon">Monday</SelectItem>
                  <SelectItem value="Tue">Tuesday</SelectItem>
                  <SelectItem value="Wed">Wednesday</SelectItem>
                  <SelectItem value="Thu">Thursday</SelectItem>
                  <SelectItem value="Fri">Friday</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="time-filter" className="text-sm font-medium text-gray-700">Time of Day</Label>
              <Select value={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger id="time-filter">
                  <SelectValue placeholder="All Times" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Times</SelectItem>
                  <SelectItem value="Morning">Morning (8:00 AM - 11:59 AM)</SelectItem>
                  <SelectItem value="Afternoon">Afternoon (12:00 PM - 4:59 PM)</SelectItem>
                  <SelectItem value="Evening">Evening (5:00 PM onwards)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 flex items-end">
              <Button onClick={clearAllFilters} className="w-full" variant="secondary">Clear All Filters</Button>
            </div>
          </div>
        </div>
      </div>
      <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
        {categories.map(category => (
          <div key={category} className="mb-12">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses
                .filter(course => course.category === category)
                .map(course => (
                  <Card key={course.id} className="flex flex-col hover:shadow-md transition-shadow duration-300 border-gray-200 overflow-hidden bg-white">
                    <CardHeader className="pb-2 bg-gradient-to-b from-gray-50 to-white">
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="outline" className="text-gray-700 border-gray-300 font-mono text-base">
                          {course.code}
                        </Badge>
                        <Badge 
                          variant="secondary" 
                          className={`${getStatusColor(course.status)} text-base`}
                        >
                          {course.status}
                        </Badge>
                      </div>
                      <CardTitle className="text-2xl text-gray-900 leading-tight mb-2">{course.name}</CardTitle>
                      <Badge 
                        variant="secondary" 
                        className={`${getCategoryColor(course.category)} text-sm`}
                      >
                        {course.category}
                      </Badge>
                    </CardHeader>
                    <CardContent className="flex-grow pt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2 text-base text-gray-600">
                          <User className="h-5 w-5 text-gray-400" />
                          <span className="truncate" title={course.instructor}>{course.instructor}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-base text-gray-600">
                          <Calendar className="h-5 w-5 text-gray-400" />
                          <span>{course.time}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-base text-gray-600">
                          <MapPin className="h-5 w-5 text-gray-400" />
                          <span className="truncate" title={course.location}>{course.location}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-base text-gray-600">
                          <BookOpen className="h-5 w-5 text-gray-400" />
                          <span>{course.credit} credits</span>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-base font-medium text-gray-700">
                          <Laptop className="h-5 w-5 text-gray-500" />
                          <span>Required Software:</span>
                        </div>
                        <ul className="list-disc list-inside text-base pl-5 space-y-1 text-gray-600">
                          {course.requiredSoftware.slice(0, 2).map((software, index) => (
                            <li key={index} className="truncate" title={software}>{software}</li>
                          ))}
                          {course.requiredSoftware.length > 2 && (
                            <li>
                              <span className="text-blue-600 cursor-pointer" onClick={() => onViewDetails(course.code)}>
                                +{course.requiredSoftware.length - 2} more...
                              </span>
                            </li>
                          )}
                        </ul>
                      </div>
                    </CardContent>
                    <CardFooter className="mt-auto flex flex-col bg-gradient-to-r from-white to-gray-50 pt-4">
                      <div className="flex space-x-2 w-full mb-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => onViewDetails(course.code)}
                          className="flex-1 bg-white hover:bg-gray-100 text-base"
                        >
                          <Info className="mr-2 h-5 w-5" />
                          View Details
                        </Button>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`compare-${course.code}`}
                            checked={selectedForComparison.includes(course.code)}
                            onCheckedChange={() => handleToggleCourseSelection(course.code)}
                          />
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handleToggleCourseSelection(course.code)}
                            className={`flex-1 ${
                              selectedForComparison.includes(course.code) ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-white hover:bg-gray-100'
                            } text-base`}
                          >
                            Compare
                          </Button>
                        </div>
                      </div>
                      <div className="flex space-x-2 w-full">
                        {course.status === 'Open' && (
                          <Button 
                            onClick={() => cart.includes(course.code) ? removeFromCart(course.code) : handleAddToCart(course)}
                            className="flex-1 text-base"
                            variant={cart.includes(course.code) ? "destructive" : "default"}
                          >
                            {cart.includes(course.code) ? (
                              <>
                                <X className="mr-2 h-5 w-5" />
                                Remove
                              </>
                            ) : (
                              <>
                                <ShoppingCart className="mr-2 h-5 w-5" />
                                Add to Cart
                              </>
                            )}
                          </Button>
                        )}
                        {course.status === 'Waitlist' && (
                          <Button 
                            onClick={() => addToWaitlist(course.code)}
                            className="flex-1 text-base"
                            variant="secondary"
                            disabled={waitlist.includes(course.code)}
                          >
                            <Clock className="mr-2 h-5 w-5" />
                            {waitlist.includes(course.code) ? 'On Waitlist' : 'Join Waitlist'}
                          </Button>
                        )}
                        {(course.status === 'Waitlist' || course.status === 'Closed') && (
                          <Button 
                            onClick={() => handleTrackingToggle(course.code)}
                            className="flex-1 text-base"
                            variant={trackedCourses.includes(course.code) ? "destructive" : "secondary"}
                          >
                            <Bell className="mr-2 h-5 w-5" />
                            {trackedCourses.includes(course.code) ? 'Untrack' : 'Track'}
                          </Button>
                        )}
                      </div>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  )
}

export { courses };

