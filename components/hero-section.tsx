"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

type HeroSectionProps = {
  showDemoButton?: boolean
}

export default function HeroSection({ showDemoButton = false }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const testimonials = [
    {
      name: "Alex",
      age: 28,
      quote: "I found my concert buddy and now we're dating! Our shared love for indie rock brought us together.",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Jamie",
      age: 24,
      quote:
        "SpotifyMatch connected me with someone who loves the same obscure bands. We've been together for 6 months!",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Taylor",
      age: 26,
      quote: "Who knew my obsession with 80s synth-pop would lead me to my perfect match? Thanks SpotifyMatch!",
      image: "/placeholder.svg?height=80&width=80",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-black to-zinc-900 py-20">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-500/20 via-transparent to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Find Your Perfect Match Through
              <span className="text-green-500"> Music</span>
            </h1>
            <p className="text-xl text-zinc-300">
              Connect with people who share your musical taste. Swipe on songs, match with compatible profiles, and
              start conversations that flow naturally.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/signup">
                <Button size="lg" className="bg-green-500 hover:bg-green-400 text-black font-bold">
                  Get Started
                </Button>
              </Link>
              {showDemoButton && (
                <Link href="/matches">
                  <Button size="lg" className="bg-zinc-800 hover:bg-zinc-700">
                    Try Demo
                  </Button>
                </Link>
              )}
              <Link href="/how-it-works">
                <Button size="lg" variant="outline" className="border-green-500 text-green-500 hover:bg-green-500/10">
                  Learn More
                </Button>
              </Link>
            </div>

            <div className="pt-8">
              <p className="text-zinc-400 mb-4">Loved by music enthusiasts:</p>
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-zinc-800/50 backdrop-blur-sm p-4 rounded-xl border border-zinc-700"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={testimonials[currentSlide].image || "/placeholder.svg"}
                    alt={testimonials[currentSlide].name}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <div>
                    <div className="font-semibold">
                      {testimonials[currentSlide].name}, {testimonials[currentSlide].age}
                    </div>
                    <p className="text-zinc-400 text-sm">"{testimonials[currentSlide].quote}"</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="lg:w-1/2 relative">
            <div className="relative w-full max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-b from-green-500/20 to-purple-500/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-xl">
                <div className="p-4 bg-zinc-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-sm font-medium">SpotifyMatch</div>
                  <div className="w-16"></div>
                </div>
                <div className="p-6">
                  <div className="text-center mb-4">
                    <div className="text-sm text-zinc-400">Song 3 of 7</div>
                    <div className="h-1 w-full bg-zinc-800 mt-2">
                      <div className="h-1 bg-green-500 w-[42.8%]"></div>
                    </div>
                  </div>

                  <div className="aspect-square bg-zinc-800 rounded-xl overflow-hidden relative mb-4">
                    <Image
                      src="/placeholder.svg?height=400&width=400"
                      alt="Album cover"
                      width={400}
                      height={400}
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <div className="font-bold text-lg">Midnight City</div>
                      <div className="text-zinc-400">M83</div>
                    </div>
                  </div>

                  <div className="flex justify-between gap-4 mt-6">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-14 w-14 rounded-full border-2 border-red-500 text-red-500 hover:bg-red-500/10"
                    >
                      ✕
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-14 w-14 rounded-full border-2 border-green-500 text-green-500 hover:bg-green-500/10"
                    >
                      ♥
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
