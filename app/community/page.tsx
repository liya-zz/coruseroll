"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Reply, Share2 } from 'lucide-react'

interface Discussion {
  id: number
  title: string
  content: string
  author: {
    name: string
    avatar: string
  }
  postedAt: string
}

const recentDiscussions: Discussion[] = [
  {
    id: 1,
    title: "Discussion Topic 1",
    content: "This is a sample discussion post. It could be about course material, study groups, or general IDM topics.",
    author: {
      name: "User1",
      avatar: "/placeholder.svg"
    },
    postedAt: "2 hours ago"
  },
  {
    id: 2,
    title: "Discussion Topic 2",
    content: "Another interesting discussion about Interactive Digital Media and course-related topics.",
    author: {
      name: "User2",
      avatar: "/placeholder.svg"
    },
    postedAt: "3 hours ago"
  }
]

export default function Community() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle post submission
    console.log({ title, content })
    setTitle("")
    setContent("")
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-4xl font-bold mb-8">IDM Community</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-[1fr,300px] gap-6">
        <div className="space-y-6">
          {/* Create Post Section */}
          <Card>
            <CardHeader>
              <CardTitle>Create a Post</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full"
                />
                <Textarea
                  placeholder="Share your thoughts, questions, or ideas..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[120px]"
                />
                <Button 
                  type="submit"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Post
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Recent Discussions */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Discussions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {recentDiscussions.map((discussion) => (
                <div key={discussion.id} className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <Avatar>
                      <AvatarImage src={discussion.author.avatar} alt={discussion.author.name} />
                      <AvatarFallback>{discussion.author.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{discussion.title}</h3>
                      <p className="text-sm text-gray-500">
                        Posted by {discussion.author.name} • {discussion.postedAt}
                      </p>
                      <p className="mt-2 text-gray-700">{discussion.content}</p>
                      <div className="flex space-x-4 mt-4">
                        <Button variant="ghost" size="sm" className="text-gray-600">
                          <Reply className="w-4 h-4 mr-2" />
                          Reply
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-600">
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </div>
                  {discussion.id !== recentDiscussions.length && (
                    <div className="border-b border-gray-200" />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Community Stats */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Community Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Members:</span>
              <span className="font-semibold">1,234</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Online:</span>
              <span className="font-semibold">56</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Posts:</span>
              <span className="font-semibold">5,678</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Active since:</span>
              <span className="font-semibold">2020</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

