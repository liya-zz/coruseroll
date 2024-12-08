"use client"

import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Header() {
  return (
    <>
      <div className="w-full bg-primary text-primary-foreground text-center py-2 px-4">
        <p className="text-sm">
          Get 40% off during Black Friday sale! Use code "BF40" at checkout.
        </p>
      </div>
      <header className="bg-background border-b border-border">
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-primary text-primary-foreground font-bold text-xl rounded-lg w-10 h-10 flex items-center justify-center">
                CR
              </div>
              <span className="text-2xl font-bold text-foreground">CourseRoll</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6 text-lg">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center space-x-1 text-lg text-muted-foreground hover:text-primary">
                  <span>Courses</span>
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link
                      href="#"
                      className="w-full cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        const catalogSection = document.getElementById('idm-course-catalog');
                        if (catalogSection) {
                          catalogSection.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                    >
                      Course Catalog
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/course-schedule" className="w-full cursor-pointer">
                      Course Schedule
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/course-history" className="w-full cursor-pointer">
                      Course History
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Link href="/community" className="text-muted-foreground hover:text-primary">
                Community
              </Link>
              <Link href="/faqs" className="text-muted-foreground hover:text-primary">
                FAQs
              </Link>
            </nav>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Log in to academy
          </Button>
        </div>
      </header>
    </>
  )
}

