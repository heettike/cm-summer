"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Trophy, ArrowUp, ArrowDown, Minus } from "lucide-react"
import Image from "next/image"

interface LeaderboardEntry {
  rank: number
  address: string
  displayName: string
  amount: string
  change: "up" | "down" | "none"
  changePercent: number
}

const initialLeaderboardData: LeaderboardEntry[] = [
  {
    rank: 1,
    address: "0x1a2...3b4c",
    displayName: "cryptochad.eth",
    amount: "250,000",
    change: "up",
    changePercent: 12.4,
  },
  {
    rank: 2,
    address: "0x5e6...7f8g",
    displayName: "moneypilled",
    amount: "175,500",
    change: "up",
    changePercent: 8.7,
  },
  {
    rank: 3,
    address: "0x9h0...1i2j",
    displayName: "basemaxi.eth",
    amount: "120,750",
    change: "down",
    changePercent: 5.2,
  },
  {
    rank: 4,
    address: "0x3k4...5l6m",
    displayName: "chaos_agent",
    amount: "98,250",
    change: "none",
    changePercent: 0,
  },
  {
    rank: 5,
    address: "0x7n8...9o0p",
    displayName: "tokenized_degen",
    amount: "75,100",
    change: "up",
    changePercent: 3.8,
  },
]

interface LeaderboardTableProps {
  autoUpdate?: boolean
}

export function LeaderboardTable({ autoUpdate = false }: LeaderboardTableProps) {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>(initialLeaderboardData)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    if (!autoUpdate) return

    const updateInterval = setInterval(() => {
      setIsUpdating(true)

      // Generate new random data
      const newData = [...leaderboardData].map((entry) => {
        const changeRoll = Math.random()
        let change: "up" | "down" | "none" = entry.change
        let changePercent = entry.changePercent

        if (changeRoll > 0.7) {
          change = "up"
          changePercent = +(Math.random() * 15).toFixed(1)
        } else if (changeRoll > 0.4) {
          change = "down"
          changePercent = +(Math.random() * 10).toFixed(1)
        } else {
          change = "none"
          changePercent = 0
        }

        // Randomly adjust amount
        const currentAmount = Number.parseInt(entry.amount.replace(/,/g, ""))
        const newAmount =
          change === "up"
            ? currentAmount + Math.floor(Math.random() * 10000)
            : change === "down"
              ? Math.max(currentAmount - Math.floor(Math.random() * 8000), 10000)
              : currentAmount

        return {
          ...entry,
          amount: newAmount.toLocaleString(),
          change,
          changePercent,
        }
      })

      // Sort by amount
      newData.sort((a, b) => {
        const amountA = Number.parseInt(a.amount.replace(/,/g, ""))
        const amountB = Number.parseInt(b.amount.replace(/,/g, ""))
        return amountB - amountA
      })

      // Update ranks
      newData.forEach((entry, index) => {
        entry.rank = index + 1
      })

      setLeaderboardData(newData)
      setIsUpdating(false)
    }, 10000) // Update every 10 seconds

    return () => clearInterval(updateInterval)
  }, [leaderboardData, autoUpdate])

  return (
    <div className={`grid gap-4 transition-opacity duration-300 ${isUpdating ? "opacity-80" : "opacity-100"}`}>
      {leaderboardData.map((entry) => (
        <Card key={entry.rank} className="bg-gray-900/60 border-gray-800 overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-center p-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 mr-4">
                {entry.rank === 1 ? (
                  <Trophy className="h-5 w-5 text-yellow-500" />
                ) : (
                  <span className="font-bold text-gray-300">{entry.rank}</span>
                )}
              </div>

              <div className="flex-1">
                <div className="font-bold">{entry.displayName}</div>
                <div className="text-sm text-gray-400">{entry.address}</div>
              </div>

              <div className="text-right">
                <div className="font-bold text-rose-400">{entry.amount} $MONEY</div>
                <div className="flex items-center justify-end text-sm">
                  {entry.change === "up" && (
                    <span className="text-green-400 flex items-center">
                      <ArrowUp className="h-3 w-3 mr-1" /> {entry.changePercent}%
                    </span>
                  )}
                  {entry.change === "down" && (
                    <span className="text-red-400 flex items-center">
                      <ArrowDown className="h-3 w-3 mr-1" /> {entry.changePercent}%
                    </span>
                  )}
                  {entry.change === "none" && (
                    <span className="text-gray-400 flex items-center">
                      <Minus className="h-3 w-3 mr-1" /> 0%
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="px-4 py-2 border-t border-gray-800 flex items-center">
              <div className="flex items-center gap-2">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/base%20wordm-FSSlvjvDdK8L9Fc86sy21VWrPHso0d.svg"
                  alt="Base"
                  width={50}
                  height={16}
                />
                <span className="text-xs text-gray-500">build on base</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
