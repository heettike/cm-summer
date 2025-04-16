"use client"

import { type ReactNode, useState, useEffect } from "react"
import { motion } from "framer-motion"

interface GlitchTextProps {
  children: ReactNode
  className?: string
}

export function GlitchText({ children, className = "" }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    // Random glitch effect
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setIsGlitching(true)
        setTimeout(() => setIsGlitching(false), 200)
      }
    }, 2000)

    return () => clearInterval(glitchInterval)
  }, [])

  return (
    <div className={`relative ${className}`}>
      <motion.div
        animate={{
          x: isGlitching ? [0, -3, 5, -2, 0] : 0,
          opacity: isGlitching ? [1, 0.8, 0.9, 0.7, 1] : 1,
        }}
        transition={{ duration: 0.2 }}
        className="relative"
      >
        <div className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-300 to-indigo-400 drop-shadow-[0_0_15px_rgba(244,114,182,0.5)]">
          {children}
        </div>

        {isGlitching && (
          <>
            <div className="absolute top-0 left-0 w-full h-full text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 transform translate-x-[2px] translate-y-[-2px] opacity-70">
              {children}
            </div>
            <div className="absolute top-0 left-0 w-full h-full text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-red-500 transform translate-x-[-2px] translate-y-[2px] opacity-70">
              {children}
            </div>
          </>
        )}
      </motion.div>
    </div>
  )
}
