"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, X, MessageCircle, Music, Info, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import ChatWindow from "@/components/chat-window"
import MatchNotification from "@/components/match-notification"
import { useMobile } from "@/hooks/use-mobile"
import { Progress } from "@/components/ui/progress"

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
    preview: "#",
  },
  {
    id: 2,
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    cover: "/placeholder.svg?height=400&width=400",
    genre: "Synth-pop",
    year: 2020,
    preview: "#",
  },
  {
    id: 3,
    title: "Bad Guy",
    artist: "Billie Eilish",
    album: "When We All Fall Asleep, Where Do We Go?",
    cover: "/placeholder.svg?height=400&width=400",
    genre: "Electropop",
    year: 2019,
    preview: "#",
  },
  {
    id: 4,
    title: "Bohemian Rhapsody",
    artist: "Queen",
    album: "A Night at the Opera",
    cover: "/placeholder.svg?height=400&width=400",
    genre: "Rock",
    year: 1975,
    preview: "#",
  },
  {
    id: 5,
    title: "Uptown Funk",
    artist: "Mark Ronson ft. Bruno Mars",
    album: "Uptown Special",
    cover: "/placeholder.svg?height=400&width=400",
    genre: "Funk",
    year: 2014,
    preview: "#",
  },
  {
    id: 6,
    title: "Redbone",
    artist: "Childish Gambino",
    album: "Awaken, My Love!",
    cover: "/placeholder.svg?height=400&width=400",
    genre: "Funk",
    year: 2016,
    preview: "#",
  },
  {
    id: 7,
    title: "Starboy",
    artist: "The Weeknd ft. Daft Punk",
    album: "Starboy",
    cover: "/placeholder.svg?height=400&width=400",
    genre: "R&B",
    year: 2016,
    preview: "#",
  },
  {
    id: 8,
    title: "Levitating",
    artist: "Dua Lipa",
    album: "Future Nostalgia",
    cover: "/placeholder.svg?height=400&width=400",
    genre: "Pop",
    year: 2020,
    preview: "#",
  },
  {
    id: 9,
    title: "Do I Wanna Know?",
    artist: "Arctic Monkeys",
    album: "AM",
    cover: "/placeholder.svg?height=400&width=400",
    genre: "Indie Rock",
    year: 2013,
    preview: "#",
  },
  {
    id: 10,
    title: "The Less I Know The Better",
    artist: "Tame Impala",
    album: "Currents",
    cover: "/placeholder.svg?height=400&width=400",
    genre: "Psychedelic Pop",
    year: 2015,
    preview: "#",
  },
  {
    id: 11,
    title: "Circles",
    artist: "Post Malone",
    album: "Hollywood's Bleeding",
    cover: "/placeholder.svg?height=400&width=400",
    genre: "Pop",
    year: 2019,
    preview: "#",
  },
  {
    id: 12,
    title: "Humble",
    artist: "Kendrick Lamar",
    album: "DAMN.",
    cover: "/placeholder.svg?height=400&width=400",
    genre: "Hip-Hop",
    year: 2017,
    preview: "#",
  },
  {
    id: 13,
    title: "Watermelon Sugar",
    artist: "Harry Styles",
    album: "Fine Line",
    cover: "/placeholder.svg?height=400&width=400",
    genre: "Pop Rock",
    year: 2019,
    preview: "#",
  },
  {
    id: 14,
    title: "Drivers License",
    artist: "Olivia Rodrigo",
    album: "SOUR",
    cover: "/placeholder.svg?height=400&width=400",
    genre: "Pop",
    year: 2021,
    preview: "#",
  },
]

// Sample user data
const users = [
  {
    id: 1,
    name: "Alex",
    age: 28,
    bio: "Music enthusiast with a passion for indie rock and electronic. Always looking for new artists and sounds.",
    distance: "5 miles away",
    compatibility: 87,
    photos: [
      "/placeholder.svg?height=500&width=400",
      "/placeholder.svg?height=500&width=400",
      "/placeholder.svg?height=500&width=400",
    ],
    topArtists: ["Arctic Monkeys", "Tame Impala", "The Strokes"],
    topSongs: ["Do I Wanna Know?", "The Less I Know The Better", "Last Nite"],
    favoriteGenres: ["Indie Rock", "Alternative", "Psychedelic Rock"],
  },
  {
    id: 2,
    name: "Jamie",
    age: 24,
    bio: "Concert lover and vinyl collector. Looking for someone to share playlists and go to shows with.",
    distance: "12 miles away",
    compatibility: 92,
    photos: [
      "/placeholder.svg?height=500&width=400",
      "/placeholder.svg?height=500&width=400",
      "/placeholder.svg?height=500&width=400",
    ],
    topArtists: ["Dua Lipa", "The Weeknd", "Billie Eilish"],
    topSongs: ["Levitating", "Blinding Lights", "Bad Guy"],
    favoriteGenres: ["Pop", "R&B", "Electronic"],
  },
  {
    id: 3,
    name: "Taylor",
    age: 26,
    bio: "80s synth-pop enthusiast and amateur DJ. Let's talk about our favorite albums and create a playlist together.",
    distance: "8 miles away",
    compatibility: 78,
    photos: [
      "/placeholder.svg?height=500&width=400",
      "/placeholder.svg?height=500&width=400",
      "/placeholder.svg?height=500&width=400",
    ],
    topArtists: ["Depeche Mode", "New Order", "The Cure"],
    topSongs: ["Enjoy The Silence", "Blue Monday", "Just Like Heaven"],
    favoriteGenres: ["Synth-pop", "New Wave", "Post-punk"],
  },
  {
    id: 4,
    name: "Jordan",
    age: 29,
    bio: "Hip-hop head and beatmaker. Looking for someone who appreciates good lyrics and smooth beats.",
    distance: "15 miles away",
    compatibility: 83,
    photos: [
      "/placeholder.svg?height=500&width=400",
      "/placeholder.svg?height=500&width=400",
      "/placeholder.svg?height=500&width=400",
    ],
    topArtists: ["Kendrick Lamar", "J. Cole", "Tyler, The Creator"],
    topSongs: ["HUMBLE.", "Middle Child", "EARFQUAKE"],
    favoriteGenres: ["Hip-Hop", "Rap", "R&B"],
  },
  {
    id: 5,
    name: "Riley",
    age: 27,
    bio: "Indie folk lover and guitarist. Looking for someone to jam with and explore new music.",
    distance: "7 miles away",
    compatibility: 89,
    photos: [
      "/placeholder.svg?height=500&width=400",
      "/placeholder.svg?height=500&width=400",
      "/placeholder.svg?height=500&width=400",
    ],
    topArtists: ["Bon Iver", "Fleet Foxes", "Sufjan Stevens"],
    topSongs: ["Holocene", "Helplessness Blues", "Mystery of Love"],
    favoriteGenres: ["Indie Folk", "Chamber Pop", "Alternative"],
  },
  {
    id: 6,
    name: "Morgan",
    age: 25,
    bio: "Jazz enthusiast and vinyl collector. Let's discuss the classics over coffee.",
    distance: "10 miles away",
    compatibility: 76,
    photos: [
      "/placeholder.svg?height=500&width=400",
      "/placeholder.svg?height=500&width=400",
      "/placeholder.svg?height=500&width=400",
    ],
    topArtists: ["Miles Davis", "John Coltrane", "Kamasi Washington"],
    topSongs: ["So What", "Giant Steps", "Truth"],
    favoriteGenres: ["Jazz", "Bebop", "Spiritual Jazz"],
  },
]

type AppState = "song-swiping" | "analyzing" | "profile-matching"

export default function MatchesPage() {
  // App state management
  const [appState, setAppState] = useState<AppState>("song-swiping")

  // Song swiping state
  const [currentSongBatch, setCurrentSongBatch] = useState<number[]>([])
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [songDirection, setSongDirection] = useState<string | null>(null)
  const [swipedSongs, setSwipedSongs] = useState<{ id: number; liked: boolean }[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [completedBatches, setCompletedBatches] = useState(0)

  // Analysis state
  const [analysisProgress, setAnalysisProgress] = useState(0)

  // Profile matching state
  const [currentUserIndex, setCurrentUserIndex] = useState(0)
  const [profileDirection, setProfileDirection] = useState<string | null>(null)
  const [photoIndex, setPhotoIndex] = useState(0)
  const [showInfo, setShowInfo] = useState(false)
  const [matches, setMatches] = useState<number[]>([])
  const [showMatch, setShowMatch] = useState(false)
  const [activeChat, setActiveChat] = useState<number | null>(null)
  const [showChatWindow, setShowChatWindow] = useState(false)

  const isMobile = useMobile()

  // Initialize song batch
  useEffect(() => {
    if (currentSongBatch.length === 0) {
      generateNewSongBatch()
    }
  }, [currentSongBatch])

  // Generate a new batch of 7 random songs
  const generateNewSongBatch = () => {
    const availableSongs = songs.filter(
      (song) => !currentSongBatch.includes(song.id) && !swipedSongs.some((s) => s.id === song.id),
    )

    // If we've used all songs, reset
    const songsToUse = availableSongs.length >= 7 ? availableSongs : songs

    // Get 7 random songs
    const randomSongs: number[] = []
    const tempSongs = [...songsToUse]

    for (let i = 0; i < 7; i++) {
      if (tempSongs.length === 0) break
      const randomIndex = Math.floor(Math.random() * tempSongs.length)
      randomSongs.push(tempSongs[randomIndex].id)
      tempSongs.splice(randomIndex, 1)
    }

    setCurrentSongBatch(randomSongs)
    setCurrentSongIndex(0)
  }

  const currentSong = songs.find((s) => s.id === currentSongBatch[currentSongIndex]) || songs[0]
  const currentUser = users[currentUserIndex % users.length]

  // Handle song swiping
  const handleSongSwipe = (liked: boolean) => {
    setSongDirection(liked ? "right" : "left")

    // Add to swiped songs
    setSwipedSongs([...swipedSongs, { id: currentSong.id, liked }])

    // Reset direction after animation completes
    setTimeout(() => {
      setSongDirection(null)

      // Check if we've reached 7 swipes in this batch
      if (currentSongIndex + 1 >= currentSongBatch.length) {
        setAppState("analyzing")
        runAnalysis()
      } else {
        // Move to next song in batch
        setCurrentSongIndex(currentSongIndex + 1)
      }
    }, 300)
  }

  // Run analysis animation
  const runAnalysis = () => {
    let progress = 0
    const interval = setInterval(() => {
      progress += 5
      setAnalysisProgress(progress)

      if (progress >= 100) {
        clearInterval(interval)
        setTimeout(() => {
          setAppState("profile-matching")
          // Set user index based on completed batches to show a different user each time
          setCurrentUserIndex(completedBatches % users.length)
        }, 500)
      }
    }, 100)
  }

  // Handle profile swiping
  const handleProfileSwipe = (liked: boolean) => {
    setProfileDirection(liked ? "right" : "left")

    // If liked, add to matches
    if (liked) {
      setMatches((prev) => {
        if (!prev.includes(currentUser.id)) {
          return [...prev, currentUser.id]
        }
        return prev
      })

      setTimeout(() => {
        setShowMatch(true)
      }, 500)
    } else {
      // Start over with new songs after animation completes
      setTimeout(() => {
        resetForNewBatch()
      }, 300)
    }
  }

  // Reset for a new batch of songs
  const resetForNewBatch = () => {
    setProfileDirection(null)
    setPhotoIndex(0)
    setShowInfo(false)
    setCompletedBatches(completedBatches + 1)
    setAppState("song-swiping")
    generateNewSongBatch()
  }

  const handleMatchClose = () => {
    setShowMatch(false)
    resetForNewBatch()
  }

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation()
    setPhotoIndex((photoIndex + 1) % currentUser.photos.length)
  }

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation()
    setPhotoIndex((photoIndex - 1 + currentUser.photos.length) % currentUser.photos.length)
  }

  const handleChatOpen = (userId: number) => {
    setActiveChat(userId)
    setShowChatWindow(true)
  }

  const handleChatClose = () => {
    setShowChatWindow(false)
    setActiveChat(null)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-6">
        <header className="flex justify-between items-center mb-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
              <span className="font-bold text-black">SM</span>
            </div>
            <h1 className="text-xl font-bold">SpotifyMatch</h1>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" className="text-zinc-400 hover:text-white">
                Home
              </Button>
            </Link>
            <Link href="/account">
              <Button variant="ghost" className="rounded-full size-10 p-0">
                <Image
                  src="/placeholder.svg?height=40&width=40"
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </Button>
            </Link>
          </div>
        </header>

        <Tabs defaultValue="discover" className="w-full">
          <TabsList className="bg-zinc-900 border-b border-zinc-800 w-full justify-center rounded-none p-0 h-auto mb-6">
            <TabsTrigger
              value="discover"
              className="py-3 px-6 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-green-500 rounded-none"
            >
              Discover
            </TabsTrigger>
            <TabsTrigger
              value="matches"
              className="py-3 px-6 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-green-500 rounded-none"
            >
              Matches
            </TabsTrigger>
          </TabsList>

          <TabsContent value="discover" className="mt-0">
            <div className="max-w-md mx-auto">
              {appState === "song-swiping" && currentSong && (
                <>
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-semibold">Discover Your Music Match</h2>
                    <p className="text-zinc-400 text-sm mt-1">Swipe on 7 songs to find your perfect match</p>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-zinc-400 mb-1">
                      <span>Song {currentSongIndex + 1} of 7</span>
                      <span>{Math.round((currentSongIndex / 7) * 100)}%</span>
                    </div>
                    <Progress value={(currentSongIndex / 7) * 100} className="h-2" />
                  </div>

                  <AnimatePresence>
                    <motion.div
                      key={currentSong.id}
                      initial={{ opacity: 1 }}
                      animate={{
                        x: songDirection === "left" ? -300 : songDirection === "right" ? 300 : 0,
                        opacity: songDirection ? 0 : 1,
                        rotateZ: songDirection === "left" ? -20 : songDirection === "right" ? 20 : 0,
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

                          <span className="text-xs text-zinc-500">0:35</span>
                        </div>

                        <div className="flex justify-between gap-4 mt-6">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-16 w-16 rounded-full border-2 border-red-500 text-red-500 hover:bg-red-500/10"
                            onClick={() => handleSongSwipe(false)}
                          >
                            <X className="h-8 w-8" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-16 w-16 rounded-full border-2 border-green-500 text-green-500 hover:bg-green-500/10"
                            onClick={() => handleSongSwipe(true)}
                          >
                            <Heart className="h-8 w-8" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  <div className="mt-8 text-center text-zinc-500 text-sm">
                    <p>Swipe right on songs you love, left on those you don't.</p>
                  </div>
                </>
              )}

              {appState === "analyzing" && (
                <div className="bg-zinc-900 rounded-3xl p-8 text-center">
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Music className="h-10 w-10 text-green-500" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Analyzing Your Music Taste</h2>
                  <p className="text-zinc-400 mb-8">
                    We're finding someone who shares your music preferences. This will only take a moment...
                  </p>
                  <Progress value={analysisProgress} className="h-2 mb-2" />
                  <p className="text-xs text-zinc-500">{analysisProgress}%</p>
                </div>
              )}

              {appState === "profile-matching" && (
                <>
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-semibold">Your Music Match</h2>
                    <p className="text-zinc-400 text-sm mt-1">
                      Based on your music taste, we found this potential match for you
                    </p>
                  </div>

                  <AnimatePresence>
                    {showMatch ? (
                      <MatchNotification
                        user={currentUser}
                        onClose={handleMatchClose}
                        onChat={() => handleChatOpen(currentUser.id)}
                      />
                    ) : (
                      <motion.div
                        key={currentUser.id}
                        initial={{ opacity: 1 }}
                        animate={{
                          x: profileDirection === "left" ? -300 : profileDirection === "right" ? 300 : 0,
                          opacity: profileDirection ? 0 : 1,
                          rotateZ: profileDirection === "left" ? -20 : profileDirection === "right" ? 20 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        className="relative"
                      >
                        <Card
                          className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 shadow-xl"
                          onClick={() => setShowInfo(!showInfo)}
                        >
                          <div className="relative">
                            <div className="aspect-[3/4] relative overflow-hidden">
                              <Image
                                src={currentUser.photos[photoIndex] || "/placeholder.svg"}
                                alt={`${currentUser.name}'s photo`}
                                fill
                                className="object-cover"
                              />

                              {/* Photo navigation */}
                              <div className="absolute top-0 left-0 right-0 flex justify-between p-2">
                                <div className="flex gap-1">
                                  {currentUser.photos.map((_, idx) => (
                                    <div
                                      key={idx}
                                      className={`h-1 rounded-full ${
                                        idx === photoIndex ? "bg-green-500 w-8" : "bg-white/50 w-6"
                                      }`}
                                    ></div>
                                  ))}
                                </div>
                              </div>

                              <Button
                                variant="ghost"
                                size="icon"
                                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 rounded-full h-10 w-10"
                                onClick={handlePrevPhoto}
                              >
                                <ChevronLeft className="h-6 w-6" />
                              </Button>

                              <Button
                                variant="ghost"
                                size="icon"
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 rounded-full h-10 w-10"
                                onClick={handleNextPhoto}
                              >
                                <ChevronRight className="h-6 w-6" />
                              </Button>

                              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
                                <div className="flex items-end justify-between">
                                  <div>
                                    <h3 className="text-2xl font-bold">
                                      {currentUser.name}, {currentUser.age}
                                    </h3>
                                    <p className="text-zinc-300 text-sm">{currentUser.distance}</p>
                                  </div>
                                  <Badge className="bg-green-500 text-black">{currentUser.compatibility}% Match</Badge>
                                </div>
                              </div>
                            </div>

                            <AnimatePresence>
                              {showInfo && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="bg-zinc-900 p-4 overflow-hidden"
                                >
                                  <div className="mb-4">
                                    <h4 className="font-semibold mb-2">About</h4>
                                    <p className="text-zinc-300">{currentUser.bio}</p>
                                  </div>

                                  <div className="mb-4">
                                    <h4 className="font-semibold mb-2">Top Artists</h4>
                                    <div className="flex flex-wrap gap-2">
                                      {currentUser.topArtists.map((artist, idx) => (
                                        <Badge key={idx} variant="outline" className="border-zinc-700">
                                          {artist}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>

                                  <div className="mb-4">
                                    <h4 className="font-semibold mb-2">Favorite Genres</h4>
                                    <div className="flex flex-wrap gap-2">
                                      {currentUser.favoriteGenres.map((genre, idx) => (
                                        <Badge key={idx} className="bg-zinc-800">
                                          {genre}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>

                                  <div>
                                    <h4 className="font-semibold mb-2">Top Songs</h4>
                                    <div className="space-y-2">
                                      {currentUser.topSongs.map((song, idx) => (
                                        <div key={idx} className="flex items-center gap-2 text-zinc-300">
                                          <Music className="h-4 w-4 text-green-500" />
                                          <span>{song}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </Card>

                        <div className="flex justify-center gap-6 mt-6">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-16 w-16 rounded-full border-2 border-red-500 text-red-500 hover:bg-red-500/10"
                            onClick={() => handleProfileSwipe(false)}
                          >
                            <X className="h-8 w-8" />
                          </Button>

                          <Button
                            variant="outline"
                            size="icon"
                            className="h-16 w-16 rounded-full border-2 border-green-500 text-green-500 hover:bg-green-500/10"
                            onClick={() => handleProfileSwipe(true)}
                          >
                            <Heart className="h-8 w-8" />
                          </Button>
                        </div>

                        <Button
                          variant="ghost"
                          className="absolute bottom-[80px] left-1/2 -translate-x-1/2 text-zinc-400 hover:text-white"
                          onClick={(e) => {
                            e.stopPropagation()
                            setShowInfo(!showInfo)
                          }}
                        >
                          <Info className="h-5 w-5 mr-2" />
                          {showInfo ? "Hide" : "Show"} Profile
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </div>
          </TabsContent>

          <TabsContent value="matches" className="mt-0">
            <div className="max-w-2xl mx-auto">
              {matches.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {matches.map((matchId) => {
                    const matchedUser = users.find((u) => u.id === matchId)
                    if (!matchedUser) return null

                    return (
                      <div
                        key={matchId}
                        className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 cursor-pointer hover:border-green-500 transition-colors"
                        onClick={() => handleChatOpen(matchId)}
                      >
                        <div className="relative h-40">
                          <Image
                            src={matchedUser.photos[0] || "/placeholder.svg"}
                            alt={matchedUser.name}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                          <div className="absolute bottom-0 left-0 right-0 p-3">
                            <div className="flex items-end justify-between">
                              <div>
                                <h3 className="text-xl font-bold">
                                  {matchedUser.name}, {matchedUser.age}
                                </h3>
                                <p className="text-zinc-300 text-sm">{matchedUser.distance}</p>
                              </div>
                              <Badge className="bg-green-500 text-black">{matchedUser.compatibility}%</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="p-3 flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Music className="h-4 w-4 text-green-500" />
                            <span className="text-sm text-zinc-400">
                              Likes {matchedUser.topArtists[0]}, {matchedUser.topArtists[1]}
                            </span>
                          </div>
                          <Button size="sm" variant="ghost" className="rounded-full">
                            <MessageCircle className="h-5 w-5 text-green-500" />
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8 text-zinc-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">No matches yet</h3>
                  <p className="text-zinc-400 max-w-md mx-auto">
                    Start swiping on songs to find people who share your music taste. Your matches will appear here.
                  </p>
                  <Button
                    className="mt-6 bg-green-500 hover:bg-green-400 text-black"
                    onClick={() => {
                      setAppState("song-swiping")
                      generateNewSongBatch()
                    }}
                  >
                    Start Swiping
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {showChatWindow && activeChat && (
          <ChatWindow user={users.find((u) => u.id === activeChat)!} onClose={handleChatClose} isMobile={isMobile} />
        )}
      </AnimatePresence>
    </div>
  )
}
