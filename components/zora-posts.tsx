"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play } from "lucide-react"
import { motion } from "framer-motion"

interface ZoraPost {
  id: number
  title: string
  day: number
}

const zoraPosts: ZoraPost[] = [
  {
    id: 1,
    title: "forgot to deploy. $money still pumped.",
    day: 1,
  },
  {
    id: 2,
    title: "built a chrome extension in 6h.",
    day: 2,
  },
  {
    id: 3,
    title: "farcaster frame went live. 300 people voted to kick me out.",
    day: 3,
  },
  {
    id: 4,
    title: "someone sent 2 ETH to the wrong address. we're calling it a 'community burn'.",
    day: 4,
  },
  {
    id: 5,
    title: "4am coding session. built a token gating system while everyone slept.",
    day: 5,
  },
  {
    id: 6,
    title: "two builders got in a fight about tabs vs spaces. livestream views doubled.",
    day: 6,
  },
]

export function ZoraPosts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {zoraPosts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="relative group"
        >
          <Card className="bg-gray-900/60 border-gray-800 overflow-hidden h-40 hover:border-rose-500/50 transition-all">
            <CardContent className="p-4 flex flex-col justify-between h-full">
              <div className="flex justify-between items-start">
                <Badge variant="outline" className="bg-rose-500/10 text-rose-400 border-rose-500/50">
                  day {post.day}
                </Badge>
              </div>

              <p className="text-sm mt-2">{post.title}</p>

              <div className="flex justify-between items-end">
                <Badge variant="outline" className="bg-gray-800/60 text-gray-400 border-gray-700">
                  mintable
                </Badge>
              </div>
            </CardContent>

            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <div className="bg-rose-500 rounded-full p-3 transform scale-90 group-hover:scale-100 transition-transform">
                <Play className="h-6 w-6 text-white" />
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
