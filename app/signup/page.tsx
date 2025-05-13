"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Music, Mail, Lock, User, Calendar, Loader2 } from "lucide-react"
import SpotifyConnect from "@/components/spotify-connect"

export default function SignupPage() {
  const [step, setStep] = useState(1)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [birthdate, setBirthdate] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showSpotifyConnect, setShowSpotifyConnect] = useState(false)
  const router = useRouter()

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1) {
      setStep(2)
    } else {
      setIsLoading(true)
      // Simulate signup process
      setTimeout(() => {
        setIsLoading(false)
        setShowSpotifyConnect(true)
      }, 1500)
    }
  }

  const handleSpotifyComplete = () => {
    // Redirect to matches page after Spotify connection
    router.push("/matches")
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="container mx-auto px-4 py-6">
        <Link href="/" className="flex items-center gap-2 mb-12">
          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
            <span className="font-bold text-black">SM</span>
          </div>
          <h1 className="text-xl font-bold">SpotifyMatch</h1>
        </Link>

        <div className="max-w-md mx-auto">
          {showSpotifyConnect ? (
            <SpotifyConnect onComplete={handleSpotifyComplete} />
          ) : (
            <>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">Create your account</h1>
                <p className="text-zinc-400">
                  Step {step} of 2: {step === 1 ? "Basic Information" : "Account Security"}
                </p>
              </div>

              <form onSubmit={handleNextStep} className="space-y-6">
                {step === 1 ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-5 w-5 text-zinc-400" />
                        <Input
                          id="name"
                          type="text"
                          placeholder="Your name"
                          className="bg-zinc-900 border-zinc-800 pl-10"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-zinc-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          className="bg-zinc-900 border-zinc-800 pl-10"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="birthdate">Date of Birth</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-5 w-5 text-zinc-400" />
                        <Input
                          id="birthdate"
                          type="date"
                          className="bg-zinc-900 border-zinc-800 pl-10"
                          value={birthdate}
                          onChange={(e) => setBirthdate(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-zinc-400" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="Create a strong password"
                          className="bg-zinc-900 border-zinc-800 pl-10"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      <p className="text-xs text-zinc-500">
                        Password must be at least 8 characters and include a number and special character
                      </p>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="terms"
                        className="mt-1 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                        required
                      />
                      <Label htmlFor="terms" className="text-sm font-normal">
                        I agree to the{" "}
                        <Link href="/terms" className="text-green-500 hover:text-green-400">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="text-green-500 hover:text-green-400">
                          Privacy Policy
                        </Link>
                      </Label>
                    </div>
                  </>
                )}

                <Button
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-400 text-black font-semibold"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating account...
                    </>
                  ) : step === 1 ? (
                    "Continue"
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>

              {step === 1 && (
                <>
                  <div className="relative my-8">
                    <Separator className="bg-zinc-800" />
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black px-2 text-xs text-zinc-500">
                      OR SIGN UP WITH
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <Button variant="outline" className="border-zinc-800 hover:bg-zinc-900">
                      <Image
                        src="/placeholder.svg?height=20&width=20"
                        alt="Google"
                        width={20}
                        height={20}
                        className="mr-2"
                      />
                      Google
                    </Button>
                    <Button variant="outline" className="border-zinc-800 hover:bg-zinc-900">
                      <Image
                        src="/placeholder.svg?height=20&width=20"
                        alt="Apple"
                        width={20}
                        height={20}
                        className="mr-2"
                      />
                      Apple
                    </Button>
                    <Button variant="outline" className="border-zinc-800 hover:bg-zinc-900">
                      <Music className="h-5 w-5 mr-2 text-green-500" />
                      Spotify
                    </Button>

                    <Link href="/matches" className="block w-full mt-4">
                      <Button type="button" className="w-full" variant="ghost">
                        Skip Signup (Demo Mode)
                      </Button>
                    </Link>
                  </div>
                </>
              )}

              <p className="text-center mt-8 text-zinc-400">
                Already have an account?{" "}
                <Link href="/login" className="text-green-500 hover:text-green-400">
                  Sign in
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
