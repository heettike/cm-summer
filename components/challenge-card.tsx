import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Zap } from "lucide-react"
import { CountdownTimer } from "./countdown-timer"

interface ChallengeCardProps {
  title: string
  description: string
  reward: string
  timeRemaining: string
  endDate?: Date
}

export function ChallengeCard({
  title,
  description,
  reward,
  timeRemaining,
  endDate = new Date(Date.now() + 24 * 60 * 60 * 1000), // Default to 24 hours from now
}: ChallengeCardProps) {
  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-950 border-rose-500/50 overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-3xl -mr-16 -mt-16" />
      <CardHeader>
        <div className="flex justify-between items-start">
          <Badge variant="outline" className="bg-rose-500/10 text-rose-400 border-rose-500/50 mb-2">
            DAILY CHALLENGE
          </Badge>
          <Badge variant="outline" className="bg-gray-800 text-gray-300 border-gray-700 flex items-center">
            <Clock className="mr-1 h-3 w-3" /> LIVE
          </Badge>
        </div>
        <CardTitle className="text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-400">{description}</p>

        <div className="bg-gray-900/80 rounded-lg p-4 border border-gray-800">
          <div className="text-center mb-2 text-sm text-gray-400">Challenge ends in:</div>
          <CountdownTimer targetDate={endDate} />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center border-t border-gray-800 pt-4">
        <div className="flex items-center">
          <Zap className="h-4 w-4 text-rose-400 mr-2" />
          <span className="text-rose-400 font-bold">{reward}</span>
        </div>
        <Badge className="bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 cursor-pointer">Vote on outcome</Badge>
      </CardFooter>
    </Card>
  )
}
