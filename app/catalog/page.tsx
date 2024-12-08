"use client"

import { useState, useCallback } from "react"
import { CourseList, courses } from '../components/CourseList'
import { ShoppingCart } from '../components/ShoppingCart'
import { WaitlistSection } from '../components/WaitlistSection'
import { TrackingSection } from '../components/TrackingSection'
import { toast } from "@/components/ui/use-toast"

export default function Catalog() {
  const [cart, setCart] = useState<string[]>([]);
  const [waitlist, setWaitlist] = useState<string[]>([]);
  const [trackedCourses, setTrackedCourses] = useState<string[]>([]);
  const [selectedForComparison, setSelectedForComparison] = useState<string[]>([]);

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
  }, [cart]);

  const removeFromCart = useCallback((courseCode: string) => {
    setCart(prev => prev.filter(code => code !== courseCode));
    toast({
      title: "Removed from cart",
      description: `${courseCode} has been removed from your cart.`,
    });
  }, []);

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
  }, [waitlist]);

  const removeFromWaitlist = useCallback((courseCode: string) => {
    setWaitlist(prev => prev.filter(code => code !== courseCode));
    toast({
      title: "Removed from waitlist",
      description: `${courseCode} has been removed from your waitlist.`,
    });
  }, []);

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
  }, [trackedCourses]);

  const removeFromTracking = useCallback((courseCode: string) => {
    setTrackedCourses(prev => prev.filter(code => code !== courseCode));
    toast({
      title: "Course untracked",
      description: `You will no longer receive notifications for ${courseCode}.`,
    });
  }, []);

  const toggleCourseSelection = useCallback((courseCode: string) => {
    setSelectedForComparison(prev => 
      prev.includes(courseCode)
        ? prev.filter(code => code !== courseCode)
        : [...prev, courseCode]
    );
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-black mb-8">IDM Course Catalog</h1>
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
        maxComparison={4}
        enrolledCourses={[]}
        setIsComparisonPageOpen={() => {}}
        onViewDetails={() => {}}
      />
      <div className="mt-8 space-y-6">
        <TrackingSection 
          trackedCourses={trackedCourses} 
          removeFromTracking={removeFromTracking}
          notifyUser={() => {}}
        />
        <WaitlistSection 
          waitlist={waitlist} 
          removeFromWaitlist={removeFromWaitlist} 
        />
        <ShoppingCart 
          cart={cart} 
          removeFromCart={removeFromCart}
          enrollInCourse={() => {}}
          enrolledCourses={[]}
        />
      </div>
    </div>
  )
}

