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
import { Music, Mail, Lock, Loader2 } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Always redirect to matches page after 1.5 seconds
    // (simulating login without backend)
    setTimeout(() => {
      setIsLoading(false)
      router.push("/matches")
    }, 1500)
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
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
            <p className="text-zinc-400">Sign in to continue finding your music matches</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
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
              <div className="flex justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="text-sm text-green-500 hover:text-green-400">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-zinc-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="bg-zinc-900 border-zinc-800 pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
              />
              <Label htmlFor="remember" className="text-sm font-normal">
                Remember me for 30 days
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-400 text-black font-semibold"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </Button>

            <div className="text-center">
              <span className="text-zinc-500 text-sm">or</span>
            </div>

            <Link href="/matches" className="block w-full">
              <Button type="button" className="w-full" variant="outline">
                Skip Login (Demo Mode)
              </Button>
            </Link>
          </form>

          <div className="relative my-8">
            <Separator className="bg-zinc-800" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black px-2 text-xs text-zinc-500">
              OR CONTINUE WITH
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <Button variant="outline" className="border-zinc-800 hover:bg-zinc-900">
              <Image src="/placeholder.svg?height=20&width=20" alt="Google" width={20} height={20} className="mr-2" />
              Google
            </Button>
            <Button variant="outline" className="border-zinc-800 hover:bg-zinc-900">
              <Image src="/placeholder.svg?height=20&width=20" alt="Apple" width={20} height={20} className="mr-2" />
              Apple
            </Button>
            <Button variant="outline" className="border-zinc-800 hover:bg-zinc-900">
              <Music className="h-5 w-5 mr-2 text-green-500" />
              Spotify
            </Button>
          </div>

          <p className="text-center mt-8 text-zinc-400">
            Don't have an account?{" "}
            <Link href="/signup" className="text-green-500 hover:text-green-400">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
