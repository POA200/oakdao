import { Button } from "@/components/ui/button"
import { MoveRight } from "lucide-react"
import { Link } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import HeroGradient from "@/assets/Herogradient.png"

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden flex items-center justify-center pt-24 pb-24">
      {/* Background gradient image filling the hero section */}
      <img
        src={HeroGradient}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 w-full h-full object-cover -z-10 opacity-40"
      />
      <div className="max-w-4xl text-center space-y-8">
        {/* Tagline/Feature Highlight */}
        <Badge className="inline-flex items-center rounded-lg bg-primary/20"
        variant={"secondary"}>
          👋 Welcome to OakDao Web3 Learning. Fast. Simple. Free.
        </Badge>

        {/* Main Headline */}
        <h2 className="text-3xl md:text-7xl font-extrabold tracking-tighter text-foreground leading-none">
          Your Web3 Guide
          <span className="block text-primary">
            Without the Sign-Up.
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-sm md:text-lg text-foreground/60 max-w-3xl mx-auto">
          Dive into core concepts of Crypto, Blockchain, NFTs, and DeFi. Start learning instantly. Lessons followed by AI-generated quizzes.
        </p>

        {/* Primary Call To Action (CTA) */}
        <div className="pt-1">
          <Link to="/dashboard">
            <Button size="lg" className="cursor-pointer px-8 py-7 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
            variant={'default'}>
              Start Learning Now
              <MoveRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Responsive hero image placeholder */}
        <div className="pt-2 m-4 md:m-1">
          <div className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-xl border bg-secondary/10 shadow-sm m-4 ">
            {/* Maintain a 16:9 rectangle that scales with width on all screens */}
            <div className="w-full" style={{ aspectRatio: '16 / 9' }} aria-label="Hero image placeholder">
              <div className="h-full w-full grid place-items-center bg-gradient-to-br from-primary/10 via-background to-primary/5 text-foreground/60">
                <span className="text-sm sm:text-base md:text-lg select-none">Hero Image</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
