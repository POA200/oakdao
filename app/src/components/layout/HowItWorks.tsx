import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="container mx-auto px-4 py-16 md:py-24 scroll-mt-24 md:scroll-mt-28"
    >
      <div className="max-w-5xl mx-auto text-center">
        <div className="mb-2 text-md font-medium tracking-widest text-primary/70 uppercase">
          How it works
        </div>
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter">
          Everything you need to learn
        </h2>
        <p className="mt-3 text-foreground/70 max-w-2xl mx-auto">
          Learn Web3 in focused lessons, then reinforce with quick AI quizzes. Your
          progress is stored locally, no sign-up required.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-background/60">
          <CardHeader>
            <CardDescription className="mb-4">
            {/* Image placeholder above the title */}
            <div className="w-full overflow-hidden rounded-lg border bg-secondary/10">
              <div
                className="w-full"
                style={{ aspectRatio: '16 / 9' }}
                aria-label="Pick a lesson image placeholder"
              >
                <div className="h-full w-full grid place-items-center bg-gradient-to-br from-primary/10 via-background to-primary/5 text-foreground/60">
                  <span className="text-[0.8rem] select-none">Pick a lesson</span>
                </div>
              </div>
            </div>
            </CardDescription>
            <CardTitle className="text-xl">Pick a lesson</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-foreground/70">
            Choose a topic in Blockchain, NFTs, DeFi and more.
          </CardContent>
        </Card>

        <Card className="bg-background/60">
          <CardHeader>
            <CardDescription className="mb-4">
            {/* Image placeholder above the title */}
            <div className="w-full overflow-hidden rounded-lg border bg-secondary/10">
              <div
                className="w-full"
                style={{ aspectRatio: '16 / 9' }}
                aria-label="Pick a lesson image placeholder"
              >
                <div className="h-full w-full grid place-items-center bg-gradient-to-br from-primary/10 via-background to-primary/5 text-foreground/60">
                  <span className="text-[0.8rem] select-none">Learn fast</span>
                </div>
              </div>
            </div>
            </CardDescription>
            <CardTitle className="text-xl">Learn fast</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-foreground/70">
            Read concise, practical content designed for speed.
          </CardContent>
        </Card>

        <Card className="bg-background/60">
          <CardHeader>
            <CardDescription className="mb-4">
            {/* Image placeholder above the title */}
            <div className="w-full overflow-hidden rounded-lg border bg-secondary/10">
              <div
                className="w-full"
                style={{ aspectRatio: '16 / 9' }}
                aria-label="Pick a lesson image placeholder"
              >
                <div className="h-full w-full grid place-items-center bg-gradient-to-br from-primary/10 via-background to-primary/5 text-foreground/60">
                  <span className="text-[0.8rem] select-none">Quiz & reinforce</span>
                </div>
              </div>
            </div>
            </CardDescription>
            <CardTitle className="text-xl">Quiz & reinforce</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-foreground/70">
            Take an AI-generated quiz to lock in your understanding.
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
