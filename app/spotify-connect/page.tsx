"use client"

import { useRouter } from "next/navigation"
import SpotifyConnect from "@/components/spotify-connect"

export default function SpotifyConnectPage() {
  const router = useRouter()

  const handleComplete = () => {
    router.push("/matches")
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <SpotifyConnect onComplete={handleComplete} />
        </div>
      </div>
    </div>
  )
}
