import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function HeroSection() {
  return (
    <div className="bg-[#F8F6FF] py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex justify-center gap-3 mb-6">
          <Badge className="bg-primary/20 text-primary hover:bg-primary/30 px-4 py-1 rounded-full text-sm font-medium">
            Interactive Digital Media
          </Badge>
          <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 px-4 py-1 rounded-full text-sm font-medium">
            Spring 2025
          </Badge>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Master Interactive Digital Media with CourseRoll
        </h1>
        <p className="text-gray-600 text-xl mb-8 max-w-2xl mx-auto">
          Discover your perfect IDM course with CourseRoll! Our personalized enrollment assistance ensures you explore options effortlessly, helping you choose the best fit with maximum efficiency.
        </p>
        <div className="flex justify-center gap-4">
          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => {
              const catalogSection = document.getElementById('idm-course-catalog');
              if (catalogSection) {
                catalogSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="border-primary text-primary hover:bg-primary/10"
          >
            Explore Courses
          </Button>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Get Personalized Assistance
          </Button>
        </div>
      </div>
    </div>
  )
}

