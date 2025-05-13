"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Music, Heart, MessageSquare, Crown, ChevronRight, Edit, LogOut } from "lucide-react"

export default function AccountPage() {
  const [isPremium, setIsPremium] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
              <span className="font-bold text-black">SM</span>
            </div>
            <h1 className="text-xl font-bold">SpotifyMatch</h1>
          </Link>
          <Button variant="ghost" className="text-zinc-400 hover:text-white">
            <LogOut className="h-5 w-5 mr-2" />
            Sign Out
          </Button>
        </header>

        <div className="max-w-4xl mx-auto">
          <div className="relative mb-20">
            <div className="h-40 bg-gradient-to-r from-green-500/30 to-purple-500/30 rounded-t-xl"></div>
            <div className="absolute -bottom-16 left-8 flex items-end">
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=128&width=128"
                  alt="Profile picture"
                  width={128}
                  height={128}
                  className="rounded-full border-4 border-black"
                />
                <Button
                  size="icon"
                  className="absolute bottom-0 right-0 rounded-full bg-green-500 hover:bg-green-400 h-8 w-8"
                >
                  <Edit className="h-4 w-4 text-black" />
                </Button>
              </div>
              <div className="ml-4 mb-4">
                <h2 className="text-2xl font-bold">Jamie Smith</h2>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-green-500 text-green-500">
                    {isPremium ? "Premium" : "Free"}
                  </Badge>
                  <span className="text-zinc-400 text-sm">Member since 2023</span>
                </div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="profile" className="mt-8">
            <TabsList className="bg-zinc-900 border-b border-zinc-800 w-full justify-start rounded-none p-0 h-auto">
              <TabsTrigger
                value="profile"
                className="py-3 px-6 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-green-500 rounded-none"
              >
                Profile
              </TabsTrigger>
              <TabsTrigger
                value="matches"
                className="py-3 px-6 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-green-500 rounded-none"
              >
                Matches
              </TabsTrigger>
              <TabsTrigger
                value="preferences"
                className="py-3 px-6 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-green-500 rounded-none"
              >
                Music Preferences
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="py-3 px-6 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-green-500 rounded-none"
              >
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-zinc-900 border-zinc-800">
                  <CardHeader>
                    <CardTitle>About Me</CardTitle>
                    <CardDescription>Tell others about yourself and your music taste</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-zinc-300">
                      Music enthusiast with a passion for indie rock and electronic. Always looking for new artists and
                      sounds. Let's connect if you're into The Strokes, Tame Impala, or Daft Punk!
                    </p>
                    <Button variant="outline" className="mt-4 border-zinc-700">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Bio
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-zinc-900 border-zinc-800">
                  <CardHeader>
                    <CardTitle>Top Artists</CardTitle>
                    <CardDescription>Your most listened to artists</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {["Arctic Monkeys", "Dua Lipa", "The Weeknd", "Tame Impala", "Billie Eilish"].map(
                        (artist, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
                              {index + 1}
                            </div>
                            <span>{artist}</span>
                          </div>
                        ),
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-zinc-900 border-zinc-800">
                  <CardHeader>
                    <CardTitle>Top Genres</CardTitle>
                    <CardDescription>Music genres you love the most</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {["Indie Rock", "Pop", "Electronic", "R&B", "Alternative", "Hip-Hop", "Dance"].map(
                        (genre, index) => (
                          <Badge key={index} variant="secondary" className="bg-zinc-800 hover:bg-zinc-700">
                            {genre}
                          </Badge>
                        ),
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-zinc-900 border-zinc-800">
                  <CardHeader>
                    <CardTitle>Subscription</CardTitle>
                    <CardDescription>Manage your SpotifyMatch subscription</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <Crown className={`h-5 w-5 ${isPremium ? "text-green-500" : "text-zinc-500"}`} />
                        <span className="font-medium">{isPremium ? "Premium" : "Free Plan"}</span>
                      </div>
                      <Switch
                        checked={isPremium}
                        onCheckedChange={setIsPremium}
                        className="data-[state=checked]:bg-green-500"
                      />
                    </div>

                    <Button
                      className={`w-full ${isPremium ? "bg-zinc-800 hover:bg-zinc-700" : "bg-green-500 hover:bg-green-400 text-black"}`}
                      onClick={() => setIsPremium(!isPremium)}
                    >
                      {isPremium ? "Manage Subscription" : "Upgrade to Premium"}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="matches" className="mt-6">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle>Your Matches</CardTitle>
                  <CardDescription>People who share your music taste</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((match) => (
                      <div
                        key={match}
                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-zinc-800 transition-colors"
                      >
                        <Image
                          src={`/placeholder.svg?height=60&width=60`}
                          alt="Match profile"
                          width={60}
                          height={60}
                          className="rounded-full"
                        />
                        <div>
                          <div className="font-semibold">Alex, 28</div>
                          <div className="text-sm text-zinc-400">87% music compatibility</div>
                          <div className="flex items-center gap-1 text-xs text-zinc-500 mt-1">
                            <Music className="h-3 w-3" />
                            <span>Likes Arctic Monkeys, The Strokes</span>
                          </div>
                        </div>
                        <Button size="sm" className="ml-auto" variant="ghost">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 text-center">
                    <Button variant="outline" className="border-zinc-700">
                      Find More Matches
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences" className="mt-6">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle>Music Preferences</CardTitle>
                  <CardDescription>Customize your music taste profile</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Favorite Genres</h3>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "Indie Rock",
                          "Pop",
                          "Electronic",
                          "R&B",
                          "Alternative",
                          "Hip-Hop",
                          "Dance",
                          "Jazz",
                          "Classical",
                          "Metal",
                        ].map((genre, index) => (
                          <Badge
                            key={index}
                            variant={index < 5 ? "default" : "outline"}
                            className={index < 5 ? "bg-green-500 hover:bg-green-400 text-black" : "border-zinc-700"}
                          >
                            {genre}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-3">Liked Songs</h3>
                      <div className="space-y-2">
                        {["Midnight City - M83", "Blinding Lights - The Weeknd", "Bad Guy - Billie Eilish"].map(
                          (song, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-800"
                            >
                              <div className="flex items-center gap-3">
                                <Heart className="h-4 w-4 text-green-500" />
                                <span>{song}</span>
                              </div>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </div>
                          ),
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-3">Connect Music Services</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-800">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                              <span className="font-bold text-black">S</span>
                            </div>
                            <span>Spotify</span>
                          </div>
                          <Badge variant="outline" className="border-green-500 text-green-500">
                            Connected
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-800">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
                              <span className="font-bold text-black">Y</span>
                            </div>
                            <span>YouTube Music</span>
                          </div>
                          <Button size="sm" variant="outline" className="border-zinc-700">
                            Connect
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="mt-6">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Email Notifications</Label>
                        <p className="text-sm text-zinc-400">Receive emails about new matches and messages</p>
                      </div>
                      <Switch defaultChecked className="data-[state=checked]:bg-green-500" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Push Notifications</Label>
                        <p className="text-sm text-zinc-400">Receive push notifications on your device</p>
                      </div>
                      <Switch defaultChecked className="data-[state=checked]:bg-green-500" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Dark Mode</Label>
                        <p className="text-sm text-zinc-400">Always use dark mode</p>
                      </div>
                      <Switch defaultChecked className="data-[state=checked]:bg-green-500" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Profile Visibility</Label>
                        <p className="text-sm text-zinc-400">Allow others to see your profile</p>
                      </div>
                      <Switch defaultChecked className="data-[state=checked]:bg-green-500" />
                    </div>

                    <div className="pt-4">
                      <Button variant="destructive" className="w-full bg-red-500/20 text-red-500 hover:bg-red-500/30">
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
