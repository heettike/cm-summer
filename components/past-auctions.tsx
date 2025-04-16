"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { motion } from "framer-motion"
import Link from "next/link"

interface AuctionEntry {
  id: number
  task: string
  winningBid: string
  bidder: string
  bidderAvatar: string
}

const pastAuctionsData: AuctionEntry[] = [
  {
    id: 40,
    task: "Build a Chrome Extension",
    winningBid: "110M $QR ($481.25)",
    bidder: "@seacasa",
    bidderAvatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 39,
    task: "Create a Farcaster Frame",
    winningBid: "85M $QR ($372.30)",
    bidder: "@0xmongo",
    bidderAvatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 38,
    task: "Build a Token Dashboard",
    winningBid: "120M $QR ($525.60)",
    bidder: "@basemaxi.eth",
    bidderAvatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 37,
    task: "24h No-Sleep Coding Marathon",
    winningBid: "200M $QR ($876.00)",
    bidder: "@chaos_agent",
    bidderAvatar: "/placeholder.svg?height=40&width=40",
  },
]

export function PastAuctions() {
  const [visibleAuctions, setVisibleAuctions] = useState<AuctionEntry[]>(pastAuctionsData.slice(0, 3))
  const [showAll, setShowAll] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  const toggleShowAll = () => {
    setShowAll(!showAll)
    setVisibleAuctions(showAll ? pastAuctionsData.slice(0, 3) : pastAuctionsData)
  }

  // Auto-refresh every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshKey((prev) => prev + 1)
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-4">
      {visibleAuctions.map((auction, index) => (
        <motion.div
          key={`${auction.id}-${refreshKey}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <Card className="bg-gray-900/60 border-gray-800 overflow-hidden hover:border-rose-500/50 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center">
                  <div className="text-xl font-bold text-rose-400">#{auction.id}</div>
                </div>

                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <p className="text-lg font-medium">{auction.task}</p>
                      <div className="flex items-center mt-1">
                        <Badge variant="outline" className="bg-rose-500/10 text-rose-400 border-rose-500/50">
                          {auction.winningBid}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-800">
                        <Image
                          src={auction.bidderAvatar || "/placeholder.svg"}
                          alt={auction.bidder}
                          width={24}
                          height={24}
                        />
                      </div>
                      <span className="text-gray-300">{auction.bidder}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}

      <div className="text-center">
        <Link href="https://qrcoin.fun/" target="_blank" rel="noopener noreferrer">
          <Badge
            variant="outline"
            className="bg-gray-900/60 text-rose-400 border-rose-500/50 px-4 py-2 cursor-pointer hover:bg-gray-800/60"
          >
            view all on qrcoin.fun
          </Badge>
        </Link>
      </div>
    </div>
  )
}
