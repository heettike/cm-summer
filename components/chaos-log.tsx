"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

interface LogEntry {
  day: number
  content: string
  tag: string
}

const chaosLogData: LogEntry[] = [
  {
    day: 1,
    content: "forgot to deploy. $money still pumped.",
    tag: "fail",
  },
  {
    day: 2,
    content: "built a chrome extension in 6h.",
    tag: "ship",
  },
  {
    day: 3,
    content: "farcaster frame went live. 300 people voted to kick me out.",
    tag: "drama",
  },
  {
    day: 4,
    content: "someone sent 2 ETH to the wrong address. we're calling it a 'community burn'.",
    tag: "fail",
  },
  {
    day: 5,
    content: "4am coding session. built a token gating system while everyone slept.",
    tag: "ship",
  },
  {
    day: 6,
    content: "two builders got in a fight about tabs vs spaces. livestream views doubled.",
    tag: "drama",
  },
  {
    day: 7,
    content: "launched on base mainnet. gas fees were more than our marketing budget.",
    tag: "ship",
  },
]

export function ChaosLog() {
  const [visibleLogs, setVisibleLogs] = useState<LogEntry[]>(chaosLogData.slice(0, 4))
  const [showAll, setShowAll] = useState(false)

  const toggleShowAll = () => {
    setShowAll(!showAll)
    setVisibleLogs(showAll ? chaosLogData.slice(0, 4) : chaosLogData)
  }

  const getTagColor = (tag: string) => {
    switch (tag) {
      case "ship":
        return "bg-green-500/20 text-green-400 border-green-500/50"
      case "fail":
        return "bg-red-500/20 text-red-400 border-red-500/50"
      case "drama":
        return "bg-amber-500/20 text-amber-400 border-amber-500/50"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/50"
    }
  }

  return (
    <div className="space-y-4">
      {visibleLogs.map((log, index) => (
        <motion.div
          key={log.day}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <Card className="bg-gray-900/60 border-gray-800 overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className="text-2xl font-bold text-rose-400">{log.day}</div>
                  <div className="text-xs text-gray-500">day</div>
                </div>

                <div className="flex-1">
                  <p className="text-lg">{log.content}</p>
                </div>

                <Badge variant="outline" className={`${getTagColor(log.tag)}`}>
                  {log.tag}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}

      <div className="text-center">
        <button onClick={toggleShowAll} className="text-rose-400 hover:text-rose-300 text-sm font-medium">
          {showAll ? "show less" : "show all chaos"}
        </button>
      </div>
    </div>
  )
}
