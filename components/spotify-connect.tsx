"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Check, Music, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type SpotifyConnectProps = {
  onComplete: () => void
}

export default function SpotifyConnect({ onComplete }: SpotifyConnectProps) {
  const [step, setStep] = useState(1)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isImporting, setIsImporting] = useState(false)
  const [importProgress, setImportProgress] = useState(0)

  const handleConnect = () => {
    setIsConnecting(true)
    // Simulate Spotify connection
    setTimeout(() => {
      setIsConnecting(false)
      setStep(2)
    }, 2000)
  }

  const handleImport = () => {
    setIsImporting(true)

    // Simulate data import with progress
    const interval = setInterval(() => {
      setImportProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setStep(3)
          }, 500)
          return 100
        }
        return prev + 10
      })
    }, 400)
  }

  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
        <Music className="h-8 w-8 text-black" />
      </div>

      <h1 className="text-3xl font-bold mb-2">Connect with Spotify</h1>
      <p className="text-zinc-400 mb-8 max-w-sm mx-auto">
        Enhance your matches by connecting your Spotify account and importing your music preferences
      </p>

      <div className="mb-8">
        <div className="flex justify-between text-sm text-zinc-500 mb-2">
          <span>Connect</span>
          <span>Import Data</span>
          <span>Complete</span>
        </div>
        <div className="relative h-1 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="absolute h-full bg-green-500 transition-all duration-500 ease-in-out"
            style={{ width: step === 1 ? "0%" : step === 2 ? "50%" : "100%" }}
          ></div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-zinc-900 rounded-xl p-6 mb-6 border border-zinc-800">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1DB954] flex items-center justify-center">
                    <span className="font-bold text-black">S</span>
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold">Spotify</h3>
                    <p className="text-xs text-zinc-400">Music streaming service</p>
                  </div>
                </div>
                <Badge variant="outline" className="border-zinc-700">
                  Recommended
                </Badge>
              </div>

              <p className="text-sm text-zinc-300 text-left mb-4">Connect your Spotify account to import your:</p>

              <ul className="text-left space-y-2 mb-6">
                <li className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Top artists and tracks</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Favorite genres</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Playlists</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Listening history</span>
                </li>
              </ul>

              <Button
                onClick={handleConnect}
                className="w-full bg-[#1DB954] hover:bg-[#1ed760] text-black"
                disabled={isConnecting}
              >
                {isConnecting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Connecting...
                  </>
                ) : (
                  <>
                    <Music className="mr-2 h-5 w-5" /> Connect Spotify
                  </>
                )}
              </Button>
            </div>

            <Button variant="ghost" className="text-zinc-400" onClick={onComplete}>
              Skip for now
            </Button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-zinc-900 rounded-xl p-6 mb-6 border border-zinc-800">
              <div className="flex items-center gap-3 mb-6">
                <Image
                  src="/placeholder.svg?height=60&width=60"
                  alt="Spotify"
                  width={60}
                  height={60}
                  className="rounded-full"
                />
                <div className="text-left">
                  <h3 className="font-semibold">Spotify Connected</h3>
                  <p className="text-xs text-zinc-400">Connected as user123@example.com</p>
                </div>
              </div>

              {isImporting ? (
                <div className="space-y-4">
                  <p className="text-sm text-zinc-300">Importing your music data...</p>
                  <Progress value={importProgress} className="h-2" />
                  <p className="text-xs text-zinc-500">This may take a moment</p>
                </div>
              ) : (
                <>
                  <p className="text-sm text-zinc-300 text-left mb-6">
                    We'll analyze your Spotify data to find your perfect music matches. This helps us understand your
                    taste better.
                  </p>

                  <Button onClick={handleImport} className="w-full bg-[#1DB954] hover:bg-[#1ed760] text-black">
                    Import Music Data
                  </Button>
                </>
              )}
            </div>

            {!isImporting && (
              <Button variant="ghost" className="text-zinc-400" onClick={onComplete}>
                Skip for now
              </Button>
            )}
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-black" />
              </div>

              <h3 className="text-xl font-bold mb-2">All Set!</h3>
              <p className="text-zinc-300 mb-6">
                Your Spotify data has been successfully imported. We've analyzed your music taste and are ready to find
                your matches!
              </p>

              <div className="bg-zinc-800 rounded-lg p-4 mb-6">
                <h4 className="font-semibold mb-2">Your Top Genres</h4>
                <div className="flex flex-wrap gap-2">
                  {["Indie Rock", "Alternative", "Pop", "Electronic", "R&B"].map((genre, index) => (
                    <Badge key={index} className="bg-zinc-700">
                      {genre}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button onClick={onComplete} className="w-full bg-green-500 hover:bg-green-400 text-black">
                Start Finding Matches
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
