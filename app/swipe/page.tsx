"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Heart, X, Play, Pause, Volume2, VolumeX } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Sample song data
const songs = [
  {
    id: 1,
    title: "Midnight City",
    artist: "M83",
    album: "Hurry Up, We're Dreaming",
    cover: "/placeholder.svg?height=400&width=400",
    genre: "Electronic",
    year: 2011,
  },
  {
    id: 2,
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    cover: "/placeholder.svg?height=400&width=400",
    genre: "Synth-pop",
    year: 2020,
  },
  {
    id: 3,
    title: "Bad Guy",
    artist: "Billie Eilish",
    album: "When We All Fall Asleep, Where Do We Go?",
    cover: "/placeholder.svg?height=400&width=400",
    genre: "Electropop",
    year: 2019,
  },
  {
    id: 4,
    title: "Bohemian Rhapsody",
    artist: "Queen",
    album: "A Night at the Opera",
    cover: "/placeholder.svg?height=400&width=400",
    genre: "Rock",
    year: 1975,
  },
  {
    id: 5,
    title: "Uptown Funk",
    artist: "Mark Ronson ft. Bruno Mars",
    album: "Uptown Special",
    cover: "/placeholder.svg?height=400&width=400",
    genre: "Funk",
    year: 2014,
  },
  {
    id: 6,
    title: "Redbone",
    artist: "Childish Gambino",
    album: "Awaken, My Love!",
    cover: "/placeholder.svg?height=400&width=400",
    genre: "Funk",
    year: 2016,
  },
  {
    id: 7,
    title: "Starboy",
    artist: "The Weeknd ft. Daft Punk",
    album: "Starboy",
    cover: "/placeholder.svg?height=400&width=400",
    genre: "R&B",
    year: 2016,
  },
  {
    id: 8,
    title: "Levitating",
    artist: "Dua Lipa",
    album: "Future Nostalgia",
    cover: "/placeholder.svg?height=400&width=400",
    genre: "Pop",
    year: 2020,
  },
]

export default function SwipePage() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [swipedCount, setSwipedCount] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showMatch, setShowMatch] = useState(false)
  const [direction, setDirection] = useState<string | null>(null)

  const handleSwipe = (liked: boolean) => {
    setDirection(liked ? "right" : "left")

    // Reset direction after animation completes
    setTimeout(() => {
      setDirection(null)

      // Update counts and indexes
      const newSwipedCount = swipedCount + 1
      setSwipedCount(newSwipedCount)

      // Check if we've reached 7 swipes
      if (newSwipedCount === 7) {
        setShowMatch(true)
      } else {
        setCurrentSongIndex((currentSongIndex + 1) % songs.length)
      }
    }, 300)
  }

  const currentSong = songs[currentSongIndex]
  const progress = (swipedCount / 7) * 100

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
              <span className="font-bold text-black">SM</span>
            </div>
            <h1 className="text-xl font-bold">SpotifyMatch</h1>
          </div>
          <Button variant="ghost" className="text-zinc-400 hover:text-white">
            Skip
          </Button>
        </header>

        <div className="max-w-md mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold">Discover Your Music Match</h2>
            <p className="text-zinc-400 text-sm mt-1">Swipe on 7 songs to find your perfect match</p>
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-sm text-zinc-400 mb-1">
              <span>Song {swipedCount + 1} of 7</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <AnimatePresence>
            {showMatch ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-3xl p-8 text-center"
              >
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-2">It's a Match!</h2>
                <p className="text-zinc-400 mb-6">Based on your music taste, we found 3 potential matches for you!</p>

                <div className="grid gap-4 mb-8">
                  {[1, 2, 3].map((match) => (
                    <div key={match} className="flex items-center gap-4 bg-zinc-800/50 p-3 rounded-xl">
                      <Image
                        src={`/placeholder.svg?height=60&width=60`}
                        alt="Match profile"
                        width={60}
                        height={60}
                        className="rounded-full"
                      />
                      <div className="text-left">
                        <div className="font-semibold">Alex, 28</div>
                        <div className="text-sm text-zinc-400">87% music compatibility</div>
                      </div>
                      <Button size="sm" className="ml-auto bg-green-500 hover:bg-green-400 text-black">
                        View
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="grid gap-3">
                  <Button className="w-full bg-green-500 hover:bg-green-400 text-black">Connect with Matches</Button>
                  <Button variant="outline" className="w-full border-zinc-700">
                    Continue Swiping
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={currentSong.id}
                initial={{ opacity: 1 }}
                animate={{
                  x: direction === "left" ? -300 : direction === "right" ? 300 : 0,
                  opacity: direction ? 0 : 1,
                  rotateZ: direction === "left" ? -20 : direction === "right" ? 20 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 shadow-xl"
              >
                <div className="aspect-square relative">
                  <Image
                    src={currentSong.cover || "/placeholder.svg"}
                    alt={`${currentSong.title} album cover`}
                    width={500}
                    height={500}
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold">{currentSong.title}</h3>
                    <p className="text-zinc-300">{currentSong.artist}</p>
                    <div className="flex items-center gap-2 text-sm text-zinc-400 mt-1">
                      <span>{currentSong.album}</span>
                      <span>•</span>
                      <span>{currentSong.year}</span>
                    </div>

                    <div className="mt-4 flex items-center gap-3">
                      <div className="bg-zinc-800/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                        {currentSong.genre}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-full"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                    </Button>

                    <div className="flex-1 bg-zinc-800 h-1 rounded-full">
                      <div className="bg-green-500 h-1 w-[35%] rounded-full"></div>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-full"
                      onClick={() => setIsMuted(!isMuted)}
                    >
                      {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                    </Button>
                  </div>

                  <div className="flex justify-between gap-4 mt-6">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-16 w-16 rounded-full border-2 border-red-500 text-red-500 hover:bg-red-500/10"
                      onClick={() => handleSwipe(false)}
                    >
                      <X className="h-8 w-8" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-16 w-16 rounded-full border-2 border-green-500 text-green-500 hover:bg-green-500/10"
                      onClick={() => handleSwipe(true)}
                    >
                      <Heart className="h-8 w-8" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-8 text-center text-zinc-500 text-sm">
            <p>Swipe right on songs you love, left on those you don't.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
