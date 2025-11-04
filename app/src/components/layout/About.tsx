import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, Users } from "lucide-react"

export default function About() {
  return (
    <section
      id="about"
      className="container mx-auto px-4 py-16 md:py-24 scroll-mt-24 md:scroll-mt-28"
    >
      <div className="max-w-5xl mx-auto text-center">
        <div className="mb-2 text-lg font-medium tracking-widest text-primary/70 uppercase">
          About
        </div>
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter">
          About OakDAO
        </h2>
        <p className="mt-3 text-foreground/70 max-w-2xl mx-auto">
          OakDAO is an open learning initiative focused on making Web3 education fast,
          simple, and free. We combine concise lessons with AI-assisted quizzes to help
          you learn efficiently—no accounts or sign-ups needed.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <Card className="bg-background/60">
          <CardHeader>
            <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Globe className="h-6 w-6" />
            </div>
            <CardTitle className="text-xl">Open & accessible</CardTitle>
            <CardDescription>Learn anytime with content that’s easy to follow.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-foreground/70">
            Our content is designed for clarity and speed, so you can grasp key concepts quickly
            without friction.
          </CardContent>
        </Card>

        <Card className="bg-background/60">
          <CardHeader>
            <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Users className="h-6 w-6" />
            </div>
            <CardTitle className="text-xl">Community-driven</CardTitle>
            <CardDescription>Shaped by builders and learners across the ecosystem.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-foreground/70">
            We iterate with feedback from the community to keep lessons practical and up to date.
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
