import { Button } from "@/components/ui/button"
import { MoveRight } from "lucide-react"
import { Link } from "react-router-dom"
import { Badge } from "@/components/ui/badge"

export default function Hero() {
  return (
    <section className="flex items-center justify-center p-4 m-auto">
      <div className="max-w-4xl text-center space-y-8">
        {/* Tagline/Feature Highlight */}
        <Badge className="inline-flex items-center rounded-lg bg-primary/20"
        variant={"secondary"}>
          👋 Welcome to OakDao Web3 Learning. Fast. Simple. Free.
        </Badge>

        {/* Main Headline */}
        <h2 className="text-3xl md:text-7xl font-extrabold tracking-tighter text-foreground leading-none">
          Your Web3 Guide<br className="hidden sm:inline" />
          <span className="text-primary">
            Without the Sign-Up.
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
          Dive into core concepts of Crypto, Blockchain, NFTs, and DeFi. Start learning instantly. Lessons followed by AI-generated quizzes.
        </p>

        {/* Primary Call To Action (CTA) */}
        <div className="pt-4">
          <Link to="/dashboard">
            <Button size="lg" className="cursor-pointer px-8 py-7 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
            variant={'default'}>
              Start Learning Now
              <MoveRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
