import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export default function PremiumPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-12">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
              <span className="font-bold text-black">SM</span>
            </div>
            <h1 className="text-xl font-bold">SpotifyMatch</h1>
          </Link>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="ghost" className="text-white hover:text-green-400">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-green-500 hover:bg-green-400 text-black">Sign Up</Button>
            </Link>
          </div>
        </header>

        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Upgrade Your Dating Experience</h1>
          <p className="text-xl text-zinc-300 max-w-2xl mx-auto">
            Get premium features that help you find your perfect music match faster and more effectively.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-2">Free</h2>
              <div className="text-3xl font-bold mb-6">
                $0 <span className="text-zinc-400 text-lg font-normal">/month</span>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-500 mt-0.5" />
                  <span>7 daily song swipes</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-500 mt-0.5" />
                  <span>Basic matching algorithm</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-500 mt-0.5" />
                  <span>Limited chat features</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-500 mt-0.5" />
                  <span>Standard profile customization</span>
                </li>
              </ul>

              <Button className="w-full bg-zinc-800 hover:bg-zinc-700">Current Plan</Button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl border border-green-500 overflow-hidden relative shadow-lg shadow-green-500/20">
            <div className="absolute top-0 left-0 right-0 bg-green-500 text-center py-1">
              <span className="text-black font-bold text-sm">MOST POPULAR</span>
            </div>
            <div className="p-8 pt-12">
              <h2 className="text-2xl font-bold mb-2">Premium</h2>
              <div className="text-3xl font-bold mb-6">
                $9.99 <span className="text-zinc-400 text-lg font-normal">/month</span>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-500 mt-0.5" />
                  <span>
                    <strong>Unlimited</strong> song swipes
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-500 mt-0.5" />
                  <span>
                    <strong>Advanced</strong> matching algorithm with genre weighting
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-500 mt-0.5" />
                  <span>See who liked your profile</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-500 mt-0.5" />
                  <span>Priority in match queue</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-500 mt-0.5" />
                  <span>Exclusive music-themed virtual dates</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-500 mt-0.5" />
                  <span>Concert buddy matching</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-500 mt-0.5" />
                  <span>Ad-free experience</span>
                </li>
              </ul>

              <Button className="w-full bg-green-500 hover:bg-green-400 text-black">Upgrade Now</Button>
            </div>
          </div>
        </div>

        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div className="bg-zinc-900 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-2">How does the matching algorithm work?</h3>
              <p className="text-zinc-300">
                Our algorithm analyzes your music preferences based on the songs you swipe on. It considers genres,
                artists, release years, and more to find people with compatible music taste.
              </p>
            </div>

            <div className="bg-zinc-900 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-2">Can I cancel my premium subscription anytime?</h3>
              <p className="text-zinc-300">
                Yes, you can cancel your premium subscription at any time. Your premium benefits will continue until the
                end of your billing cycle.
              </p>
            </div>

            <div className="bg-zinc-900 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-2">What are music-themed virtual dates?</h3>
              <p className="text-zinc-300">
                These are exclusive interactive experiences for premium users where you can join virtual concerts,
                listening parties, and music quizzes with your matches.
              </p>
            </div>

            <div className="bg-zinc-900 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-2">Do I need a Spotify account to use SpotifyMatch?</h3>
              <p className="text-zinc-300">
                While connecting your Spotify account enhances your experience by importing your listening history, it's
                not required. You can still use SpotifyMatch by manually swiping on songs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
