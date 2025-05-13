"use client"

import { useState } from "react"

interface StrengthIndicatorProps {
  value: number
  label: string
  color?: string
  size?: "sm" | "md" | "lg"
  animated?: boolean
}

export default function StrengthIndicator({
  value = 95,
  label = "RESUME STRENGTH",
  color = "#2E8B57",
  size = "md",
  animated = true,
}: StrengthIndicatorProps) {
  const [currentValue, setCurrentValue] = useState(animated ? 0 : value)

  // Calculate the circle's properties
  const radius = 40
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (currentValue / 100) * circumference
  if(value > 79){
    color = '#2E8B57';
  }else if(value > 59){
    color = '#FFA500';
  }else{
    color = '#FF0000';
  }
  // Size classes
  const sizeClasses = {
    sm: "w-20 h-20 text-xl",
    md: "w-28 h-28 text-3xl",
    lg: "w-36 h-36 text-4xl",
  }

  // Animate the progress when component mounts
  if (animated && currentValue < value) {
    setTimeout(() => {
      setCurrentValue((prev) => Math.min(prev + 1, value))
    }, 20)
  }

  return (
    <div className="flex flex-col items-center py-4">
      <div className={`relative flex items-center justify-center ${sizeClasses[size]}`}>
        {/* Background circle */}
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={radius} fill="transparent" stroke="#e6e6e6" strokeWidth="8" />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
          />
        </svg>
        {/* Value text */}
        <div className="absolute font-bold text-gray-700">{currentValue}</div>
      </div>
      {/* Label */}
      <div className="mt-2 text-xl font-semibold text-gray-600 uppercase tracking-wide">{label}</div>
    </div>
  )
}
