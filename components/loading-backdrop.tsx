"use client"

import type React from "react"

import { useEffect } from "react"
import { Loader2 } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const backdropVariants = cva(
  "fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm transition-opacity",
  {
    variants: {
      variant: {
        default: "bg-background/80",
        dark: "bg-background/90",
        light: "bg-white/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface LoadingBackdropProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof backdropVariants> {
  isLoading: boolean
  message?: string
  spinnerSize?: number
}

export function LoadingBackdrop({
  className,
  variant,
  isLoading,
  message = "Loading...",
  spinnerSize = 24,
  ...props
}: LoadingBackdropProps) {
  // Prevent scrolling when backdrop is visible
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isLoading])

  if (!isLoading) return null

  return (
    <div className={cn(backdropVariants({ variant }), className)} role="alert" aria-live="assertive" {...props}>
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="animate-spin text-primary" size={spinnerSize} />
        {message && <p className="text-center font-medium">{message}</p>}
      </div>
    </div>
  )
}
