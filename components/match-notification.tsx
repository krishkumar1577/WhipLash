"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { MessageCircle, X } from "lucide-react"
import confetti from "canvas-confetti"

type User = {
  id: number
  name: string
  age: number
  photos: string[]
  compatibility: number
}

type MatchNotificationProps = {
  user: User
  onClose: () => void
  onChat: () => void
}

export default function MatchNotification({ user, onClose, onChat }: MatchNotificationProps) {
  const [showConfetti, setShowConfetti] = useState(true)

  // Trigger confetti effect
  if (showConfetti) {
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#22c55e", "#ffffff", "#18181b"],
      })
    }, 300)
    setShowConfetti(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-3xl p-8 text-center relative overflow-hidden"
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[100px] bg-green-500/20 blur-3xl rounded-full"></div>
      </div>

      <div className="relative z-10">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 text-zinc-400 hover:text-white"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>

        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-black"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </div>

        <h2 className="text-3xl font-bold mb-4">It's a Match!</h2>
        <p className="text-zinc-300 mb-6">
          You and {user.name} have a {user.compatibility}% music compatibility!
        </p>

        <div className="flex justify-center gap-4 mb-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-zinc-800">
              <Image
                src="/placeholder.svg?height=96&width=96"
                alt="Your profile"
                width={96}
                height={96}
                className="object-cover"
              />
            </div>
          </div>

          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-zinc-800">
              <Image
                src={user.photos[0] || "/placeholder.svg"}
                alt={user.name}
                width={96}
                height={96}
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-3">
          <Button className="w-full bg-green-500 hover:bg-green-400 text-black" onClick={onChat}>
            <MessageCircle className="h-5 w-5 mr-2" />
            Send a Message
          </Button>
          <Button variant="outline" className="w-full border-zinc-700" onClick={onClose}>
            Keep Swiping
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
