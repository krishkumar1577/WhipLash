"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { X, Send, Paperclip, Mic, Music } from "lucide-react"
import { motion } from "framer-motion"

type Message = {
  id: number
  text: string
  sender: "user" | "match"
  timestamp: Date
}

type User = {
  id: number
  name: string
  age: number
  photos: string[]
  topArtists: string[]
}

type ChatWindowProps = {
  user: User
  onClose: () => void
  isMobile: boolean
}

export default function ChatWindow({ user, onClose, isMobile }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: `Hey there! I noticed we both like ${user.topArtists[0]}. What's your favorite song by them?`,
      sender: "match",
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return

    const userMessage: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages([...messages, userMessage])
    setNewMessage("")

    // Simulate response after 1-3 seconds
    setTimeout(
      () => {
        const responses = [
          `That's awesome! Have you seen ${user.topArtists[0]} live before?`,
          `I love their music too! What other artists are you into?`,
          `Cool! We should definitely check out some new music together sometime.`,
          `I've been listening to them non-stop lately. Any recommendations for similar artists?`,
        ]

        const matchResponse: Message = {
          id: messages.length + 2,
          text: responses[Math.floor(Math.random() * responses.length)],
          sender: "match",
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, matchResponse])
      },
      1000 + Math.random() * 2000,
    )
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <motion.div
      initial={isMobile ? { y: "100%" } : { x: "100%" }}
      animate={isMobile ? { y: 0 } : { x: 0 }}
      exit={isMobile ? { y: "100%" } : { x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className={`fixed ${
        isMobile ? "inset-0 z-50" : "top-0 right-0 bottom-0 w-96 z-40"
      } bg-zinc-900 border-l border-zinc-800 flex flex-col shadow-xl`}
    >
      {/* Header */}
      <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src={user.photos[0] || "/placeholder.svg"}
            alt={user.name}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <div className="font-semibold flex items-center gap-2">
              {user.name}, {user.age}
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
            </div>
            <div className="text-xs text-zinc-400">Online now</div>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="text-center">
          <Badge variant="outline" className="border-zinc-700 text-zinc-400">
            {new Date().toLocaleDateString([], { month: "long", day: "numeric" })}
          </Badge>
        </div>

        <div className="text-center mb-6">
          <div className="bg-zinc-800 inline-block rounded-full px-4 py-2 text-sm">
            <span>You matched with {user.name} based on your music taste</span>
          </div>
        </div>

        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                message.sender === "user"
                  ? "bg-green-500 text-black rounded-tr-none"
                  : "bg-zinc-800 text-white rounded-tl-none"
              }`}
            >
              <p>{message.text}</p>
              <div className={`text-xs mt-1 ${message.sender === "user" ? "text-black/70" : "text-zinc-400"}`}>
                {formatTime(message.timestamp)}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Responses */}
      <div className="px-4 py-2 overflow-x-auto whitespace-nowrap flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="border-zinc-700 text-zinc-300"
          onClick={() => setNewMessage("What's your favorite concert you've been to?")}
        >
          Favorite concert?
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="border-zinc-700 text-zinc-300"
          onClick={() => setNewMessage(`I love ${user.topArtists[0]} too! What's your favorite album?`)}
        >
          Favorite album?
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="border-zinc-700 text-zinc-300"
          onClick={() => setNewMessage("Want to share a playlist with me?")}
        >
          Share playlist?
        </Button>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-zinc-800 flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-zinc-400">
          <Paperclip className="h-5 w-5" />
        </Button>
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="bg-zinc-800 border-zinc-700 focus-visible:ring-green-500"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSendMessage()
          }}
        />
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="text-zinc-400">
            <Music className="h-5 w-5" />
          </Button>
          {newMessage ? (
            <Button
              onClick={handleSendMessage}
              size="icon"
              className="bg-green-500 hover:bg-green-400 text-black rounded-full"
            >
              <Send className="h-5 w-5" />
            </Button>
          ) : (
            <Button variant="ghost" size="icon" className="text-zinc-400">
              <Mic className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
