import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Clock, Bell } from 'lucide-react'
import { courses } from './CourseList'
import { toast } from "@/components/ui/use-toast"

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCourses: string[];
  addToCart: (courseCode: string) => void;
  addToWaitlist: (courseCode: string) => void;
  addToTracking: (courseCode: string) => void;
  cart: string[];
  waitlist: string[];
  trackedCourses: string[];
}

export function ComparisonModal({ 
  isOpen, 
  onClose, 
  selectedCourses, 
  addToCart, 
  addToWaitlist, 
  addToTracking,
  cart,
  waitlist,
  trackedCourses
}: ComparisonModalProps) {
  const selectedCoursesData = courses.filter(course => selectedCourses.includes(course.code));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Course Comparison</DialogTitle>
          <DialogDescription>Compare the selected courses side by side</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[600px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Feature</TableHead>
                {selectedCoursesData.map(course => (
                  <TableHead key={course.code}>{course.name}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Course Code</TableCell>
                {selectedCoursesData.map(course => (
                  <TableCell key={course.code}>{course.code}</TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Instructor</TableCell>
                {selectedCoursesData.map(course => (
                  <TableCell key={course.code}>{course.instructor}</TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Time</TableCell>
                {selectedCoursesData.map(course => (
                  <TableCell key={course.code}>{course.time}</TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Location</TableCell>
                {selectedCoursesData.map(course => (
                  <TableCell key={course.code}>{course.location}</TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Credits</TableCell>
                {selectedCoursesData.map(course => (
                  <TableCell key={course.code}>{course.credit}</TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Category</TableCell>
                {selectedCoursesData.map(course => (
                  <TableCell key={course.code}>{course.category}</TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Required Software</TableCell>
                {selectedCoursesData.map(course => (
                  <TableCell key={course.code}>
                    <ul className="list-disc list-inside">
                      {course.requiredSoftware.map((software, index) => (
                        <li key={index}>{software}</li>
                      ))}
                    </ul>
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Status</TableCell>
                {selectedCoursesData.map(course => (
                  <TableCell key={course.code}>{course.status}</TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Actions</TableCell>
                {selectedCoursesData.map(course => (
                  <TableCell key={course.code}>
                    {course.status === 'Open' && (
                      <Button
                        onClick={() => {
                          addToCart(course.code);
                          toast({
                            title: "Added to cart",
                            description: `${course.code} has been added to your cart.`,
                          });
                        }}
                        disabled={cart.includes(course.code)}
                        className="w-full mb-2"
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        {cart.includes(course.code) ? 'In Cart' : 'Add to Cart'}
                      </Button>
                    )}
                    {course.status === 'Waitlist' && (
                      <Button
                        onClick={() => {
                          addToWaitlist(course.code);
                          toast({
                            title: "Added to waitlist",
                            description: `${course.code} has been added to your waitlist.`,
                          });
                        }}
                        disabled={waitlist.includes(course.code)}
                        variant="secondary"
                        className="w-full mb-2"
                      >
                        <Clock className="mr-2 h-4 w-4" />
                        {waitlist.includes(course.code) ? 'On Waitlist' : 'Join Waitlist'}
                      </Button>
                    )}
                    {(course.status === 'Waitlist' || course.status === 'Closed') && (
                      <Button
                        onClick={() => {
                          addToTracking(course.code);
                          toast({
                            title: "Course tracked",
                            description: `You will be notified when ${course.code} becomes available.`,
                          });
                        }}
                        disabled={trackedCourses.includes(course.code)}
                        variant="outline"
                        className="w-full"
                      >
                        <Bell className="mr-2 h-4 w-4" />
                        {trackedCourses.includes(course.code) ? 'Tracking' : 'Track Course'}
                      </Button>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

