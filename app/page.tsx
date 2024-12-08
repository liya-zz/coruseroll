"use client"

import { useState, useCallback } from "react"
import { CourseList, courses } from './components/CourseList'
import { ShoppingCart } from './components/ShoppingCart'
import { WaitlistSection } from './components/WaitlistSection'
import { TrackingSection } from './components/TrackingSection'
import { EnrolledCoursesSection } from './components/EnrolledCoursesSection'
import { CourseComparisonPage } from './components/CourseComparisonPage'
import { CourseDetailPage } from './components/CourseDetailPage'
import { useToast } from "@/components/ui/use-toast"
import { checkTimeConflict } from "./utils/timeConflict"
import { CourseSchedule } from './components/CourseSchedule'
import HeroSection from './components/HeroSection'

const MAX_COURSES_TO_COMPARE = 4;

export default function Home() {
  const { toast } = useToast()
  const [cart, setCart] = useState<string[]>([]);
  const [waitlist, setWaitlist] = useState<string[]>([]);
  const [trackedCourses, setTrackedCourses] = useState<string[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]);
  const [selectedForComparison, setSelectedForComparison] = useState<string[]>([]);
  const [isComparisonPageOpen, setIsComparisonPageOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const addToCart = useCallback((courseCode: string) => {
    if (!cart.includes(courseCode)) {
      setCart(prev => [...prev, courseCode]);
      toast({
        title: "Added to cart",
        description: `${courseCode} has been added to your cart.`,
      });
    } else {
      toast({
        title: "Already in cart",
        description: `${courseCode} is already in your cart.`,
        variant: "destructive",
      });
    }
  }, [cart, toast]);

  const removeFromCart = useCallback((courseCode: string) => {
    setCart(prev => prev.filter(code => code !== courseCode));
    toast({
      title: "Removed from cart",
      description: `${courseCode} has been removed from your cart.`,
    });
  }, [toast]);

  const addToWaitlist = useCallback((courseCode: string) => {
    if (!waitlist.includes(courseCode)) {
      setWaitlist(prev => [...prev, courseCode]);
      toast({
        title: "Added to waitlist",
        description: `${courseCode} has been added to your waitlist.`,
      });
    } else {
      toast({
        title: "Already on waitlist",
        description: `${courseCode} is already on your waitlist.`,
        variant: "destructive",
      });
    }
  }, [waitlist, toast]);

  const removeFromWaitlist = useCallback((courseCode: string) => {
    setWaitlist(prev => prev.filter(code => code !== courseCode));
    toast({
      title: "Removed from waitlist",
      description: `${courseCode} has been removed from your waitlist.`,
    });
  }, [toast]);

  const addToTracking = useCallback((courseCode: string) => {
    if (!trackedCourses.includes(courseCode)) {
      setTrackedCourses(prev => [...prev, courseCode]);
      toast({
        title: "Course tracked",
        description: `You will be notified when ${courseCode} becomes available.`,
      });
    } else {
      toast({
        title: "Already tracking",
        description: `You are already tracking ${courseCode}.`,
        variant: "destructive",
      });
    }
  }, [trackedCourses, toast]);

  const removeFromTracking = useCallback((courseCode: string) => {
    setTrackedCourses(prev => prev.filter(code => code !== courseCode));
    toast({
      title: "Course untracked",
      description: `You will no longer receive notifications for ${courseCode}.`,
    });
  }, [toast]);

  const toggleCourseSelection = useCallback((courseCode: string) => {
    setSelectedForComparison(prev => 
      prev.includes(courseCode)
        ? prev.filter(code => code !== courseCode)
        : [...prev, courseCode]
    );
  }, []);

  const handleViewDetails = useCallback((courseCode: string) => {
    setSelectedCourse(courseCode);
  }, []);

  const notifyUser = useCallback((courseCode: string) => {
    const course = courses.find(c => c.code === courseCode);
    if (course) {
      toast({
        title: "Course Status Update",
        description: `${course.code}: ${course.name} is now open for registration!`,
      });
    }
  }, [toast]);

  const enrollInCourse = useCallback((courseCode: string) => {
    const courseToEnroll = courses.find(course => course.code === courseCode);
    if (!courseToEnroll) {
      toast({
        title: "Enrollment failed",
        description: `Course ${courseCode} not found.`,
        variant: "destructive",
      });
      return;
    }

    const conflictingCourse = enrolledCourses.find(enrolledCourseCode => {
      const enrolledCourse = courses.find(course => course.code === enrolledCourseCode);
      return enrolledCourse && checkTimeConflict(courseToEnroll.time, enrolledCourse.time);
    });

    if (conflictingCourse) {
      const conflictingCourseDetails = courses.find(course => course.code === conflictingCourse);
      toast({
        title: "Time conflict detected",
        description: `Unable to enroll in ${courseCode} due to a time conflict with ${conflictingCourse}: ${conflictingCourseDetails?.name}. Please review your schedule.`,
        variant: "destructive",
      });
    } else {
      setEnrolledCourses(prev => [...prev, courseCode]);
      setCart(prev => prev.filter(code => code !== courseCode));
      toast({
        title: "Enrolled in course",
        description: `You have successfully enrolled in ${courseCode}.`,
      });
    }
  }, [enrolledCourses, toast]);

  const unenrollFromCourse = useCallback((courseCode: string) => {
    setEnrolledCourses(prev => prev.filter(code => code !== courseCode));
    toast({
      title: "Unenrolled from course",
      description: `You have successfully unenrolled from ${courseCode}.`,
    });
  }, [toast]);

  if (isComparisonPageOpen) {
    return (
      <CourseComparisonPage
        selectedCourses={selectedForComparison}
        addToCart={addToCart}
        addToWaitlist={addToWaitlist}
        addToTracking={addToTracking}
        enrollInCourse={enrollInCourse}
        cart={cart}
        waitlist={waitlist}
        trackedCourses={trackedCourses}
        onClose={() => setIsComparisonPageOpen(false)}
      />
    );
  }

  if (selectedCourse) {
    return (
      <CourseDetailPage
        courseCode={selectedCourse}
        onBack={() => setSelectedCourse(null)}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        addToWaitlist={addToWaitlist}
        removeFromWaitlist={removeFromWaitlist}
        addToTracking={addToTracking}
        removeFromTracking={removeFromTracking}
        cart={cart}
        waitlist={waitlist}
        trackedCourses={trackedCourses}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <HeroSection />
      <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
        <h2 id="idm-course-catalog" className="text-3xl font-bold text-primary mb-8">
          CourseRoll: IDM Course Catalog
        </h2>
        <CourseList 
          cart={cart} 
          addToCart={addToCart} 
          removeFromCart={removeFromCart}
          waitlist={waitlist}
          addToWaitlist={addToWaitlist}
          removeFromWaitlist={removeFromWaitlist}
          trackedCourses={trackedCourses}
          addToTracking={addToTracking}
          removeFromTracking={removeFromTracking}
          selectedForComparison={selectedForComparison}
          toggleCourseSelection={toggleCourseSelection}
          maxComparison={MAX_COURSES_TO_COMPARE}
          enrolledCourses={enrolledCourses}
          setIsComparisonPageOpen={setIsComparisonPageOpen}
          onViewDetails={handleViewDetails}
        />
        <div className="mt-8 space-y-6">
          <TrackingSection 
            trackedCourses={trackedCourses} 
            removeFromTracking={removeFromTracking}
            notifyUser={notifyUser}
          />
          <WaitlistSection waitlist={waitlist} removeFromWaitlist={removeFromWaitlist} />
          <ShoppingCart 
            cart={cart} 
            removeFromCart={removeFromCart} 
            enrollInCourse={enrollInCourse} 
            enrolledCourses={enrolledCourses}
          />
          <EnrolledCoursesSection 
            enrolledCourses={enrolledCourses} 
            unenrollFromCourse={unenrollFromCourse} 
          />
          <CourseSchedule enrolledCourses={enrolledCourses} />
        </div>
      </main>
    </div>
  )
}

