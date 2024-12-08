import { useState } from 'react'

interface ToastProps {
  title: string;
  description: string;
  variant?: 'default' | 'destructive';
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const toast = ({ title, description, variant = 'default' }: ToastProps) => {
    setToasts(prev => [...prev, { title, description, variant }])
    setTimeout(() => {
      setToasts(prev => prev.slice(1))
    }, 3000)
  }

  return { toast, toasts }
}

export const toast = ({ title, description, variant = 'default' }: ToastProps) => {
  console.log(`Toast: ${title} - ${description} (${variant})`)
}

