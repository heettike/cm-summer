"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shuffle, Zap } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Challenge {
  title: string
  description: string
  reward: string
  difficulty: "easy" | "medium" | "hard" | "insane"
}

const challenges: Challenge[] = [
  {
    title: "build a chrome extension in 24h",
    description:
      "create a browser extension that tracks and visualizes on-chain activity for any wallet address you visit.",
    reward: "25,000 $money",
    difficulty: "medium",
  },
  {
    title: "create a farcaster frame",
    description: "build a frame that lets users mint an nft directly from their farcaster feed.",
    reward: "30,000 $money",
    difficulty: "easy",
  },
  {
    title: "build a base chain explorer",
    description: "create a simplified block explorer for base with a focus on transaction visualization.",
    reward: "50,000 $money",
    difficulty: "hard",
  },
  {
    title: "24h no-sleep coding marathon",
    description: "stream yourself coding for 24 hours straight. community votes on what you build.",
    reward: "45,000 $money",
    difficulty: "insane",
  },
  {
    title: "create a $money dashboard",
    description: "build a dashboard that tracks token metrics, holder stats, and community activity.",
    reward: "35,000 $money",
    difficulty: "medium",
  },
]

export function ChallengeSpin() {
  const [currentChallenge, setCurrentChallenge] = useState<Challenge>(challenges[0])
  const [isSpinning, setIsSpinning] = useState(false)
  const [autoSpin, setAutoSpin] = useState(true)

  const spinChallenge = () => {
    if (isSpinning) return

    setIsSpinning(true)

    // Simulate spinning through challenges
    let spinCount = 0
    const maxSpins = 10 + Math.floor(Math.random() * 5)
    const spinInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * challenges.length)
      setCurrentChallenge(challenges[randomIndex])

      spinCount++
      if (spinCount >= maxSpins) {
        clearInterval(spinInterval)
        setIsSpinning(false)
      }
    }, 150)
  }

  useEffect(() => {
    if (!autoSpin) return

    // Auto spin every 10 seconds
    const autoSpinInterval = setInterval(() => {
      if (!isSpinning) {
        spinChallenge()
      }
    }, 10000)

    return () => clearInterval(autoSpinInterval)
  }, [isSpinning, autoSpin])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500/20 text-green-400 border-green-500/50"
      case "medium":
        return "bg-blue-500/20 text-blue-400 border-blue-500/50"
      case "hard":
        return "bg-amber-500/20 text-amber-400 border-amber-500/50"
      case "insane":
        return "bg-red-500/20 text-red-400 border-red-500/50"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/50"
    }
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentChallenge.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-gradient-to-br from-gray-900 to-gray-950 border-rose-500/50 overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-3xl -mr-16 -mt-16" />
            <CardHeader>
              <div className="flex justify-between items-start">
                <Badge variant="outline" className="bg-rose-500/10 text-rose-400 border-rose-500/50 mb-2">
                  challenge spinner
                </Badge>
                <Badge variant="outline" className={`${getDifficultyColor(currentChallenge.difficulty)}`}>
                  {currentChallenge.difficulty}
                </Badge>
              </div>
              <CardTitle className="text-2xl">{currentChallenge.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">{currentChallenge.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center border-t border-gray-800 pt-4">
              <div className="flex items-center">
                <Zap className="h-4 w-4 text-rose-400 mr-2" />
                <span className="text-rose-400 font-bold">{currentChallenge.reward}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-rose-500 text-rose-400 hover:bg-rose-500/20"
                onClick={spinChallenge}
                disabled={isSpinning}
              >
                <Shuffle className="mr-2 h-4 w-4" />
                {isSpinning ? "spinning..." : "spin challenge"}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
