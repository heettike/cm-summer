"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Play, Coins, Users, Tv, Shuffle } from "lucide-react"
import { AnimatedBackground } from "@/components/animated-background"
import { NoiseOverlay } from "@/components/noise-overlay"
import { GlitchText } from "@/components/glitch-text"
import { CountdownTimer } from "@/components/countdown-timer"
import { ChallengeSpin } from "@/components/challenge-spin"
import { PastAuctions } from "@/components/past-auctions"
import { ZoraPosts } from "@/components/zora-posts"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"

export default function LandingPage() {
  const [mintClicked, setMintClicked] = useState(false)
  const launchDate = new Date("May 1, 2025 12:00:00 GMT+0800")

  const handleMintClick = () => {
    setMintClicked(true)

    // Play sound
    const audio = new Audio("/mint-sound.mp3")
    audio.volume = 0.5
    audio.play().catch((e) => console.log("Audio play failed:", e))

    // Trigger confetti
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
    })

    // Reset after animation
    setTimeout(() => setMintClicked(false), 2000)
  }

  return (
    <div className="relative min-h-screen text-white overflow-hidden bg-black">
      <div className="absolute inset-0 bg-black/70"></div>
      <AnimatedBackground />
      <NoiseOverlay />

      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto py-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image src="/castmoney-logo.jpg" alt="castmoney" width={40} height={40} className="rounded-full" />
            <span className="font-bold text-xl tracking-tight">castmoney</span>
          </div>
          <div className="flex gap-4">
            <Button variant="ghost" className="text-white hover:text-rose-400 hover:bg-black/20">
              about
            </Button>
            <Button variant="ghost" className="text-white hover:text-rose-400 hover:bg-black/20">
              token
            </Button>
            <Button variant="ghost" className="text-white hover:text-rose-400 hover:bg-black/20">
              stream
            </Button>
            <Button variant="outline" className="border-rose-500 text-rose-400 hover:bg-rose-500/20">
              connect
            </Button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto py-16 md:py-24 text-center">
          <div className="flex flex-col md:flex-row gap-8 items-center justify-center mb-12">
            <div className="flex-1 text-left md:text-center lg:text-left">
              <Badge variant="outline" className="mb-6 border-rose-500 text-rose-400 px-4 py-1 text-sm">
                summer 2025
              </Badge>
              <GlitchText className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight tracking-tighter">
                1 house. 4 builders. 30 days. 1 token.
              </GlitchText>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">no script. no sleep. just chaos.</h2>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10">
                a 24/7 livestream of building, trading, shipping, failing — all in public. you're not just watching the
                next unicorn get built — you're betting on it.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-start md:justify-center lg:justify-start mb-8">
                <Button size="lg" className="bg-rose-500 hover:bg-rose-600 text-white">
                  <Play className="mr-2 h-4 w-4" /> watch the stream
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className={`border-rose-500 text-rose-400 hover:bg-rose-500/20 transition-all ${mintClicked ? "animate-pulse bg-rose-500/30" : ""}`}
                  onClick={handleMintClick}
                >
                  <Coins className="mr-2 h-4 w-4" /> buy $money
                </Button>
              </div>

              <div className="flex flex-wrap gap-4 justify-start md:justify-center lg:justify-start">
                <div className="flex items-center gap-2">
                  <Image src="/base-logo.svg" alt="Base" width={80} height={20} />
                  <span className="text-sm text-gray-400">build on base</span>
                </div>
                <div className="flex items-center gap-2">
                  <Image src="/farcaster-logo.png" alt="Farcaster" width={24} height={24} className="w-6 h-6" />
                  <span className="text-sm text-gray-400">build on farcaster</span>
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-6">
              <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-gray-800">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&mute=1&controls=0&showinfo=0&rel=0"
                  title="castmoney Summer Stream"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              <Card className="bg-gray-900/60 border-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">chaos begins in:</CardTitle>
                </CardHeader>
                <CardContent>
                  <CountdownTimer targetDate={launchDate} size="large" />
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mt-12 mb-6">
            <Badge
              variant="outline"
              className="border-rose-500 border-2 text-rose-400 px-6 py-3 text-lg bg-black/50 shadow-[0_0_15px_rgba(244,63,94,0.5)] hover:shadow-[0_0_20px_rgba(244,63,94,0.7)] transition-all"
            >
              <Tv className="mr-2 h-5 w-5" /> 4 builders
            </Badge>
            <Badge
              variant="outline"
              className="border-rose-500 border-2 text-rose-400 px-6 py-3 text-lg bg-black/50 shadow-[0_0_15px_rgba(244,63,94,0.5)] hover:shadow-[0_0_20px_rgba(244,63,94,0.7)] transition-all"
            >
              <Tv className="mr-2 h-5 w-5" /> 24/7 livestream
            </Badge>
            <Badge
              variant="outline"
              className="border-rose-500 border-2 text-rose-400 px-6 py-3 text-lg bg-black/50 shadow-[0_0_15px_rgba(244,63,94,0.5)] hover:shadow-[0_0_20px_rgba(244,63,94,0.7)] transition-all"
            >
              <Coins className="mr-2 h-5 w-5" /> $money token
            </Badge>
          </div>
        </section>

        {/* What is this? Section */}
        <section className="container mx-auto py-20 border-t border-gray-800">
          <div className="max-w-5xl mx-auto">
            <motion.h2
              className="text-3xl md:text-5xl font-bold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-300 to-indigo-400 drop-shadow-[0_0_15px_rgba(244,114,182,0.5)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              this is not a startup. it's a streamable fever dream.
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 lg:gap-8">
              <motion.div
                className="bg-gray-900/60 border border-gray-800 p-6 rounded-lg transform rotate-[-1deg]"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <Tv className="h-10 w-10 text-rose-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">reality-show x hacker house x tokenized game</h3>
                <p className="text-gray-400">
                  not just another crypto project. a full-blown social experiment with real builders, real stakes, and
                  real drama.
                </p>
                <div className="mt-4 flex items-center">
                  <Image
                    src="/castmoney-logo.jpg"
                    alt="castmoney"
                    width={24}
                    height={24}
                    className="rounded-full mr-2"
                  />
                </div>
              </motion.div>

              <motion.div
                className="bg-gray-900/60 border border-gray-800 p-6 rounded-lg transform rotate-[1deg]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <Users className="h-10 w-10 text-rose-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">team lives together, everything is streamed</h3>
                <p className="text-gray-400">
                  four builders. one house. every moment captured. from morning standups to late-night coding sessions
                  to inevitable conflicts.
                </p>
                <div className="mt-4 flex items-center">
                  <Image
                    src="/castmoney-logo.jpg"
                    alt="castmoney"
                    width={24}
                    height={24}
                    className="rounded-full mr-2"
                  />
                </div>
              </motion.div>

              <motion.div
                className="bg-gray-900/60 border border-gray-800 p-6 rounded-lg transform rotate-[-0.5deg]"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <Coins className="h-10 w-10 text-rose-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">daily episode. daily reels.</h3>
                <p className="text-gray-400">
                  distributed across x, farcaster & youtube! the $money token powers everything. tip builders, vote on
                  features, submit challenges, and speculate on outcomes.
                </p>
                <div className="mt-4 flex items-center">
                  <Image
                    src="/castmoney-logo.jpg"
                    alt="castmoney"
                    width={24}
                    height={24}
                    className="rounded-full mr-2"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why this works Section */}
        <section className="container mx-auto py-20 border-t border-gray-800">
          <div className="max-w-5xl mx-auto">
            <motion.h2
              className="text-3xl md:text-5xl font-bold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-300 to-indigo-400 drop-shadow-[0_0_15px_rgba(244,114,182,0.5)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              because crypto doesn't have its own survivor yet.
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
              <motion.div
                className="flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <div className="text-rose-400 text-6xl font-bold mb-4 transform -rotate-3">01</div>
                <h3 className="text-2xl font-bold mb-2">nothing like this exists in crypto</h3>
                <p className="text-gray-400">
                  we've seen hackathons. we've seen livestreams. we've seen tokens. but never all three combined into a
                  chaotic, addictive experience.
                </p>
                <div className="mt-6 flex items-center">
                  <Image
                    src="/castmoney-logo.jpg"
                    alt="castmoney"
                    width={24}
                    height={24}
                    className="rounded-full mr-2"
                  />
                </div>
              </motion.div>

              <motion.div
                className="flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <div className="text-rose-400 text-6xl font-bold mb-4 transform rotate-2">02</div>
                <h3 className="text-2xl font-bold mb-2">it's content, narrative, distribution</h3>
                <p className="text-gray-400">
                  the perfect storm of entertainment, technology, and financial incentives. a new model for building in
                  public.
                </p>
                <div className="mt-6 flex items-center">
                  <Image
                    src="/castmoney-logo.jpg"
                    alt="castmoney"
                    width={24}
                    height={24}
                    className="rounded-full mr-2"
                  />
                </div>
              </motion.div>

              <motion.div
                className="flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <div className="text-rose-400 text-6xl font-bold mb-4 transform -rotate-1">03</div>
                <h3 className="text-2xl font-bold mb-2">base & farcaster need more chaos</h3>
                <p className="text-gray-400">
                  the ecosystem is ready for something wild. something that breaks the mold and creates a new cultural
                  moment.
                </p>
                <div className="mt-6 flex items-center">
                  <Image
                    src="/castmoney-logo.jpg"
                    alt="castmoney"
                    width={24}
                    height={24}
                    className="rounded-full mr-2"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* How it works Section */}
        <section className="container mx-auto py-20 border-t border-gray-800">
          <div className="max-w-5xl mx-auto">
            <motion.h2
              className="text-3xl md:text-5xl font-bold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-300 to-indigo-400 drop-shadow-[0_0_15px_rgba(244,114,182,0.5)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              you don't watch. you bet. you don't build. you broadcast.
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                className="bg-gray-900/60 border border-gray-800 p-6 rounded-lg transform rotate-[-1deg]"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <Coins className="h-8 w-8 text-rose-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">$money launches on day 0</h3>
                <p className="text-gray-400">
                  tip, vote, challenge, speculate. the token is your access pass to the entire ecosystem.
                </p>
                <div className="mt-4 flex items-center">
                  <Image
                    src="/castmoney-logo.jpg"
                    alt="castmoney"
                    width={24}
                    height={24}
                    className="rounded-full mr-2"
                  />
                </div>
              </motion.div>

              <motion.div
                className="bg-gray-900/60 border border-gray-800 p-6 rounded-lg transform rotate-[1deg]"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <Tv className="h-8 w-8 text-rose-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">daily episodes</h3>
                <p className="text-gray-400">
                  new build sprints, new chaos, new drama. each day brings fresh content and opportunities.
                </p>
                <div className="mt-4 flex items-center">
                  <Image
                    src="/castmoney-logo.jpg"
                    alt="castmoney"
                    width={24}
                    height={24}
                    className="rounded-full mr-2"
                  />
                </div>
              </motion.div>

              <motion.div
                className="bg-gray-900/60 border border-gray-800 p-6 rounded-lg transform rotate-[0.5deg]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <Zap className="h-8 w-8 text-rose-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">clips = virality</h3>
                <p className="text-gray-400">
                  the best moments spread across social media, bringing in new viewers and holders.
                </p>
                <div className="mt-4 flex items-center">
                  <Image
                    src="/castmoney-logo.jpg"
                    alt="castmoney"
                    width={24}
                    height={24}
                    className="rounded-full mr-2"
                  />
                </div>
              </motion.div>

              <motion.div
                className="bg-gray-900/60 border border-gray-800 p-6 rounded-lg transform rotate-[-0.5deg]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <Users className="h-8 w-8 text-rose-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">community-fueled madness</h3>
                <p className="text-gray-400">
                  $money holders submit challenges via{" "}
                  <Link href="https://qrcoin.fun/" className="text-rose-400 hover:underline" target="_blank">
                    qrcoin
                  </Link>{" "}
                  auctions. the community decides what gets built next.
                </p>
                <div className="mt-4 flex items-center">
                  <Image
                    src="/castmoney-logo.jpg"
                    alt="castmoney"
                    width={24}
                    height={24}
                    className="rounded-full mr-2"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Challenge Spinner Section */}
        <section className="container mx-auto py-20 border-t border-gray-800">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-10">
              <motion.h2
                className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-300 to-indigo-400 drop-shadow-[0_0_15px_rgba(244,114,182,0.5)]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                daily chaos challenge
              </motion.h2>
              <Shuffle className="h-8 w-8 text-rose-400" />
            </div>

            <ChallengeSpin />
          </div>
        </section>

        {/* Past Auctions Section */}
        <section className="container mx-auto py-20 border-t border-gray-800">
          <div className="max-w-5xl mx-auto">
            <motion.h2
              className="text-3xl md:text-5xl font-bold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-300 to-indigo-400 drop-shadow-[0_0_15px_rgba(244,114,182,0.5)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              past auctions
            </motion.h2>

            <PastAuctions />
          </div>
        </section>

        {/* Zora Posts Section */}
        <section className="container mx-auto py-20 border-t border-gray-800">
          <div className="max-w-5xl mx-auto">
            <motion.h2
              className="text-3xl md:text-5xl font-bold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-300 to-indigo-400 drop-shadow-[0_0_15px_rgba(244,114,182,0.5)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              mintable moments
            </motion.h2>

            <ZoraPosts />
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="container mx-auto py-20 border-t border-gray-800">
          <div className="max-w-5xl mx-auto text-center">
            <motion.h2
              className="text-4xl md:text-6xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-300 to-indigo-400 drop-shadow-[0_0_15px_rgba(244,114,182,0.5)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              start the stream. mint the chaos. <br />
              bet on the builders.
            </motion.h2>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-rose-500 hover:bg-rose-600 text-white" onClick={handleMintClick}>
                <Coins className="mr-2 h-4 w-4" /> buy $money
              </Button>
              <Button size="lg" variant="outline" className="border-rose-500 text-rose-400 hover:bg-rose-500/20">
                <Play className="mr-2 h-4 w-4" /> watch chaos live
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-6 mt-12">
              <div className="flex items-center gap-2">
                <Image src="/base-logo.svg" alt="Base" width={80} height={20} />
                <span className="text-sm text-gray-400">build on base</span>
              </div>
              <div className="flex items-center gap-2">
                <Image src="/farcaster-logo.png" alt="Farcaster" width={24} height={24} className="w-6 h-6" />
                <span className="text-sm text-gray-400">build on farcaster</span>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto py-10 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <span className="font-bold text-lg text-rose-400">castmoney</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2025 castmoney summer. all rights reserved. this is chaos, not financial advice.
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
