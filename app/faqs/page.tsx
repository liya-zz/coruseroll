import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function FAQsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
      <p className="text-gray-600 mb-8">
        Find answers to common questions about using CourseRoll for your course enrollment and management needs.
      </p>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>How can I track a full course?</AccordionTrigger>
          <AccordionContent>
            You can set up notifications to get real-time updates when seats become available. To do this, find the course you're interested in and click the &quot;Track Course&quot; button. You'll receive notifications when the course status changes or seats open up.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>How can I find courses that fit my schedule?</AccordionTrigger>
          <AccordionContent>
            Use the tool to check for time conflicts and compare courses that align with your availability. Our course catalog allows you to filter courses by time of day and day of the week. Additionally, when you add courses to your cart or try to enroll, CourseRoll automatically checks for time conflicts with your existing schedule.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>What does the AI assistant do?</AccordionTrigger>
          <AccordionContent>
            The AI assistant tracks courses, notifies you about updates, and helps organize your options for efficient enrollment. It can provide personalized course recommendations based on your academic history and preferences, alert you to important deadlines, and offer insights on course selection strategies.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>Can I compare multiple courses?</AccordionTrigger>
          <AccordionContent>
            Yes, the tool allows you to save and compare courses side by side for easier decision-making. You can select up to four courses at a time to compare their details, including course descriptions, prerequisites, instructor information, and scheduling. This feature helps you make informed decisions about which courses to enroll in.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger>How does this tool help with enrollment?</AccordionTrigger>
          <AccordionContent>
            CourseRoll simplifies course tracking, provides personalized recommendations, and streamlines the process for faster results. It helps you manage your course wishlist, alerts you to open seats in full courses, checks for scheduling conflicts, and provides a user-friendly interface for enrolling in courses. By centralizing all these features, CourseRoll makes the enrollment process more efficient and less stressful.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

