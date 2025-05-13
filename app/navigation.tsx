"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Home, Users, User, Music, Crown, MessageCircle, X } from "lucide-react"

export default function Navigation() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const routes = [
    { name: "Home", path: "/", icon: Home },
    { name: "Matches", path: "/matches", icon: Users },
    { name: "Profile", path: "/account", icon: User },
    { name: "Premium", path: "/premium", icon: Crown },
    { name: "Spotify Connect", path: "/spotify-connect", icon: Music },
  ]

  const isActive = (path: string) => pathname === path

  return (
    <>
      {/* Mobile Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-zinc-900 border-t border-zinc-800 p-2 md:hidden">
        <div className="flex justify-between items-center">
          {routes.slice(0, 4).map((route) => (
            <Link key={route.path} href={route.path} className="flex-1">
              <Button
                variant="ghost"
                className={`w-full h-14 flex flex-col items-center justify-center rounded-lg gap-1 ${
                  isActive(route.path) ? "text-green-500" : "text-zinc-400"
                }`}
              >
                <route.icon className="h-5 w-5" />
                <span className="text-xs">{route.name}</span>
              </Button>
            </Link>
          ))}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="flex-1 h-14 flex flex-col items-center justify-center rounded-lg gap-1 text-zinc-400"
              >
                <Menu className="h-5 w-5" />
                <span className="text-xs">More</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="bg-zinc-900 text-white border-t border-zinc-800 rounded-t-xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Menu</h3>
                <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {routes.map((route) => (
                  <Link key={route.path} href={route.path} onClick={() => setOpen(false)}>
                    <Button
                      variant="ghost"
                      className={`w-full h-20 flex flex-col items-center justify-center rounded-lg gap-2 ${
                        isActive(route.path) ? "text-green-500 bg-zinc-800" : "text-zinc-400"
                      }`}
                    >
                      <route.icon className="h-6 w-6" />
                      <span className="text-xs">{route.name}</span>
                    </Button>
                  </Link>
                ))}
                <Link href="/login" onClick={() => setOpen(false)}>
                  <Button
                    variant="ghost"
                    className="w-full h-20 flex flex-col items-center justify-center rounded-lg gap-2 text-zinc-400"
                  >
                    <MessageCircle className="h-6 w-6" />
                    <span className="text-xs">Support</span>
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Desktop Navigation - only shown on non-home pages */}
      {pathname !== "/" && (
        <div className="hidden md:block fixed left-4 top-1/2 -translate-y-1/2 z-50">
          <div className="bg-zinc-900 border border-zinc-800 rounded-full py-4 px-3 flex flex-col gap-6">
            {routes.map((route) => (
              <Link key={route.path} href={route.path}>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-full ${
                    isActive(route.path) ? "text-green-500 bg-zinc-800" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <route.icon className="h-5 w-5" />
                </Button>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
