"use client"

import { useToast } from "@/components/ui/use-toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <div className="fixed top-0 right-0 p-4 space-y-4">
      {toasts.map((toast, index) => (
        <div
          key={index}
          className={`p-4 rounded-md shadow-md ${
            toast.variant === 'destructive' ? 'bg-red-500 text-white' : 'bg-gray-800 text-white'
          }`}
        >
          <h3 className="font-bold">{toast.title}</h3>
          <p>{toast.description}</p>
        </div>
      ))}
    </div>
  )
}

