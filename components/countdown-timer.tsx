"use client"

import { useEffect, useState } from "react"

interface CountdownTimerProps {
  targetDate: Date
  onComplete?: () => void
  size?: "normal" | "large"
}

export function CountdownTimer({ targetDate, onComplete, size = "normal" }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  function calculateTimeLeft() {
    const difference = targetDate.getTime() - new Date().getTime()

    if (difference <= 0) {
      if (onComplete) onComplete()
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft()
      setTimeLeft(newTimeLeft)

      // Check if countdown is complete
      if (newTimeLeft.days === 0 && newTimeLeft.hours === 0 && newTimeLeft.minutes === 0 && newTimeLeft.seconds === 0) {
        clearInterval(timer)
        if (onComplete) onComplete()
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate, onComplete])

  const sizeClasses = {
    normal: {
      container: "gap-2 text-sm",
      box: "px-2 py-1",
      number: "text-base",
      label: "text-xs",
    },
    large: {
      container: "gap-4 text-base",
      box: "px-3 py-2",
      number: "text-2xl",
      label: "text-sm",
    },
  }

  const classes = sizeClasses[size]

  return (
    <div className={`flex items-center justify-center ${classes.container}`}>
      <div className="flex flex-col items-center">
        <div className={`bg-gray-800 rounded-md ${classes.box} font-mono font-bold`}>
          {timeLeft.days.toString().padStart(2, "0")}
        </div>
        <span className={`${classes.label} text-gray-400 mt-1`}>days</span>
      </div>
      <div className="text-gray-500 font-bold">:</div>
      <div className="flex flex-col items-center">
        <div className={`bg-gray-800 rounded-md ${classes.box} font-mono font-bold`}>
          {timeLeft.hours.toString().padStart(2, "0")}
        </div>
        <span className={`${classes.label} text-gray-400 mt-1`}>hrs</span>
      </div>
      <div className="text-gray-500 font-bold">:</div>
      <div className="flex flex-col items-center">
        <div className={`bg-gray-800 rounded-md ${classes.box} font-mono font-bold`}>
          {timeLeft.minutes.toString().padStart(2, "0")}
        </div>
        <span className={`${classes.label} text-gray-400 mt-1`}>min</span>
      </div>
      <div className="text-gray-500 font-bold">:</div>
      <div className="flex flex-col items-center">
        <div className={`bg-gray-800 rounded-md ${classes.box} font-mono font-bold animate-pulse`}>
          {timeLeft.seconds.toString().padStart(2, "0")}
        </div>
        <span className={`${classes.label} text-gray-400 mt-1`}>sec</span>
      </div>
    </div>
  )
}
