import Link from "next/link"
import { Button } from "@/components/ui/button"
import HeroSection from "@/components/hero-section"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <header className="container mx-auto py-4 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
            <span className="font-bold text-black">SM</span>
          </div>
          <h1 className="text-xl font-bold">SpotifyMatch</h1>
        </div>
        <div className="flex gap-4">
          <Link href="/login">
            <Button variant="ghost" className="text-white hover:text-green-400">
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-green-500 hover:bg-green-400 text-black">Sign Up</Button>
          </Link>
          <Link href="/matches">
            <Button variant="outline" className="border-green-500 text-green-500 hover:bg-green-500/10">
              Try Demo
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <HeroSection showDemoButton={true} />

        <section className="container mx-auto py-16 px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-zinc-900 p-6 rounded-xl">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mb-4">
                <span className="font-bold text-black text-xl">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Connect Spotify</h3>
              <p className="text-zinc-400">
                Link your Spotify account to import your music taste, artists, and listening history.
              </p>
            </div>
            <div className="bg-zinc-900 p-6 rounded-xl">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mb-4">
                <span className="font-bold text-black text-xl">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Get Matched</h3>
              <p className="text-zinc-400">Our algorithm finds people who share your music taste and preferences.</p>
            </div>
            <div className="bg-zinc-900 p-6 rounded-xl">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mb-4">
                <span className="font-bold text-black text-xl">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Connect & Chat</h3>
              <p className="text-zinc-400">
                Start conversations with your matches and discover more about your shared musical interests.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-b from-zinc-900 to-black py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Premium Features</h2>
            <p className="text-center text-zinc-400 mb-12 max-w-2xl mx-auto">
              Upgrade your experience with exclusive features designed for music lovers.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-zinc-800 p-8 rounded-xl border border-zinc-700">
                <h3 className="text-2xl font-bold mb-4">Free</h3>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-green-500"></div>
                    <span>Basic Spotify integration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-green-500"></div>
                    <span>Limited daily matches</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-green-500"></div>
                    <span>Basic matching algorithm</span>
                  </li>
                </ul>
                <Button className="w-full bg-zinc-700 hover:bg-zinc-600">Current Plan</Button>
              </div>

              <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 p-8 rounded-xl border border-green-500 shadow-lg shadow-green-500/20">
                <div className="absolute -mt-12 bg-green-500 text-black font-bold py-1 px-4 rounded-full">
                  RECOMMENDED
                </div>
                <h3 className="text-2xl font-bold mb-4">Premium</h3>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-green-500"></div>
                    <span>Advanced Spotify data analysis</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-green-500"></div>
                    <span>Unlimited matches</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-green-500"></div>
                    <span>See who liked your profile</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-green-500"></div>
                    <span>Exclusive music-themed virtual dates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-green-500"></div>
                    <span>Concert buddy matching</span>
                  </li>
                </ul>
                <Button className="w-full bg-green-500 hover:bg-green-400 text-black">Upgrade Now</Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-zinc-900 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                <span className="font-bold text-black">SM</span>
              </div>
              <h1 className="text-xl font-bold">SpotifyMatch</h1>
            </div>
            <div className="flex gap-6">
              <Link href="#" className="text-zinc-400 hover:text-white">
                About
              </Link>
              <Link href="#" className="text-zinc-400 hover:text-white">
                Privacy
              </Link>
              <Link href="#" className="text-zinc-400 hover:text-white">
                Terms
              </Link>
              <Link href="#" className="text-zinc-400 hover:text-white">
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-8 text-center text-zinc-500 text-sm">
            © {new Date().getFullYear()} SpotifyMatch. Not affiliated with Spotify. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
