import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import Logo from "@/assets/OakdaoLogo2.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";

interface SimpleHeaderProps {
  query: string;
  onQueryChange: (value: string) => void;
  onSearch?: (value: string) => void;
  className?: string;
}

export default function SimpleHeader({ query, onQueryChange, onSearch, className }: SimpleHeaderProps) {
  return (
    <>
      <header className={cn("fixed top-0 inset-x-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60", className)}>
        <div className="container mx-auto px-4 py-3 flex items-center gap-3">
          <Link to="/" aria-label="OakDAO Home" className="inline-flex items-center gap-2 shrink-0">
            <img src={Logo} alt="OakDAO logo" className="h-8 w-auto" />
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground dark:text-white">
              <span className="text-primary">Oak</span>DAO
            </h1>
          </Link>

          <form
            className="flex-1 min-w-0 flex items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              onSearch?.(query);
            }}
            role="search"
            aria-label="Search lessons"
          >
            <div className="relative flex-1 min-w-0">
              <span className="pointer-events-none absolute inset-y-0 left-3 inline-flex items-center text-muted-foreground">
                <Search className="h-4 w-4" />
              </span>
              <Input
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                placeholder="Search lessons..."
                aria-label="Search lessons"
                className="pl-9 h-10"
              />
            </div>
            <Button type="submit" className="h-10 px-3 sm:px-4" aria-label="Search lessons">
              <Search className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Search</span>
            </Button>
          </form>

          <div className="shrink-0">
            <ModeToggle />
          </div>
        </div>
      </header>
      {/* Spacer to offset fixed header height */}
      <div aria-hidden className="h-16" />
    </>
  );
}
