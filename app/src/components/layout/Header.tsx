import { Link } from "react-router-dom"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import Logo from "@/assets/OakdaoLogo2.png"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

export default function Header() {
  const [open, setOpen] = useState(false)

  const toggle = () => setOpen((v) => !v)
  const close = () => setOpen(false)

  return (
    <>
    <header className="fixed top-0 inset-x-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" aria-label="OakDAO Home" className="inline-flex items-center gap-2" onClick={close}>
          <img src={Logo} alt="OakDAO logo" className="h-8 w-auto" />
          <h1 className="text-2xl font-bold tracking-tight text-foreground dark:text-white">
            <span className="text-primary">Oak</span>DAO
          </h1>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-3">
          <nav aria-label="Primary" className="flex items-center gap-2 text-sm">
            <Button asChild variant="link" size="sm">
              <Link to="/#hero">Home</Link>
            </Button>
            <Button asChild variant="link" size="sm">
              <Link to="/#how-it-works">How it works</Link>
            </Button>
            <Button asChild variant="link" size="sm">
              <Link to="/dashboard">Courses</Link>
            </Button>
            <Button asChild variant="link" size="sm">
              <Link to="/#about">About</Link>
            </Button>
          </nav>
          <ModeToggle />
        </div>

        {/* Mobile controls: theme toggle + menu button */}
        <div className="md:hidden inline-flex items-center gap-2">
          <ModeToggle />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border hover:bg-foreground/5 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-controls="mobile-nav"
            aria-expanded={open}
            onClick={toggle}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {/* Mobile nav panel */}
      <div className="container mx-auto px-4">
        <div
          id="mobile-nav"
          className={`md:hidden overflow-hidden transition-[max-height] duration-300 ${open ? 'max-h-64' : 'max-h-0'}`}
        >
          <nav className="mt-3 flex flex-col gap-1 text-sm">
            <Button asChild variant="link" size="default" className="justify-start">
              <Link to="/" onClick={close}>Home</Link>
            </Button>
            <Button asChild variant="link" size="default" className="justify-start">
              <Link to="/#how-it-works" onClick={close}>How it works</Link>
            </Button>
            <Button asChild variant="link" size="default" className="justify-start">
              <Link to="/dashboard" onClick={close}>Courses</Link>
            </Button>
            <Button asChild variant="link" size="default" className="justify-start">
              <Link to="/#about" onClick={close}>About</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
    {/* Spacer to offset fixed header height */}
    <div aria-hidden className="h-16" />
    </>
  )
}
