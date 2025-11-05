import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { BookOpen } from "lucide-react";

import { useMemo } from 'react';
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { 
  Card, 
  CardHeader, 
  CardContent, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import SimpleHeader from "@/components/layout/SimpleHeader";
import Footer from "@/components/layout/Footer";
import LessonPreviewImg from "@/assets/web1tostxLessonpreviw.png";

// --- NEW STATIC CONTENT IMPORTS ---
import { ALL_LESSONS } from '@/data/lessons';
// We must import the specific type used for the mapped cards:
import type { LessonCardData, StaticLesson } from "@/types/Lesson"; 


// Check the environment variable for dev links (Safety)
const IS_DEV_MODE = import.meta.env.VITE_ENABLE_DEV_LINKS === 'true';

// --- Helper function to safely format date strings ---
const formatDate = (dateString: string): string => {
    try {
        return new Date(dateString).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    } catch {
        return 'Date Unknown';
    }
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  // 1. Custom hook for local user progress
  const [completedLessons] = useLocalStorage<number[]>('completed_lessons', []);

  // 2. Directly map the static data to the card format and attach completion status
  // We explicitly type the source array for clarity:
  const lessonCardData: LessonCardData[] = (ALL_LESSONS as StaticLesson[])
    .map(lesson => ({
      id: lesson.id,
      title: lesson.title,
      slug: lesson.slug,
      summary: lesson.summary,
      createdAt: lesson.createdAt,
      // Logic from our local storage is applied here:
      isCompleted: completedLessons.includes(lesson.id),
    }));

  // --- Render Logic ---

  if (lessonCardData.length === 0) {
    return (
      <>
        <SimpleHeader query={searchQuery} onQueryChange={setSearchQuery} />
  <div className="container mx-auto py-12 px-4 sm:px-6 text-center min-h-screen flex flex-col justify-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4 dark:text-white">No Lessons Available</h1>
          <p className="text-lg text-muted-foreground">
            The learning modules are currently being prepared. Check back soon!
          </p>
          {/* CRITICAL: DEV ONLY Link */}
          {IS_DEV_MODE && (
            <Link to="/admin" className="text-primary hover:underline mt-4 block">
              Go to Admin Upload Portal (DEV ONLY)
            </Link>
          )}
        </div>
      </>
    );
  }

  const filteredLessons = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return lessonCardData;
    return lessonCardData.filter((l) =>
      l.title.toLowerCase().includes(q) ||
      l.summary.toLowerCase().includes(q) ||
      l.slug.toLowerCase().includes(q)
    );
  }, [lessonCardData, searchQuery]);

  const handleSearch = () => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return;
    const matches = lessonCardData.filter((l) =>
      l.title.toLowerCase().includes(q) ||
      l.summary.toLowerCase().includes(q) ||
      l.slug.toLowerCase().includes(q)
    );
    const exact = matches.find(
      (l) => l.slug.toLowerCase() === q || l.title.toLowerCase() === q
    );
    const target = exact ?? (matches.length === 1 ? matches[0] : undefined);
    if (target) {
      setSelectedSlug(target.slug);
    }
  };

  return (
    <>
      <SimpleHeader query={searchQuery} onQueryChange={setSearchQuery} onSearch={handleSearch} />
      <div className="min-h-screen w-full flex items-center justify-center px-4 sm:px-6 py-12">
        <div className="w-full flex flex-col items-center gap-8">
          <header className="text-center max-w-3xl">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2 text-foreground">Web3 Learning Platform!</h1>
            <p className="text-base sm:text-lg text-muted-foreground">
              Your friction-free path to Web3 fluency. Progress is tracked locally in your browser.
            </p>
          </header>

          {filteredLessons.map(lesson => (
            <Card
              key={lesson.id}
              className="w-full max-w-3xl sm:max-w-4xl lg:max-w-5xl min-h-[50vh] sm:min-h-[60vh] hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              <CardHeader>
                {/* Lesson preview image (16:8 / 2:1 aspect ratio, responsive) */}
                <div className="w-full rounded-md border overflow-hidden mb-4">
                  <div className="w-full" style={{ aspectRatio: '2 / 1' }} aria-label="Lesson preview image">
                    <img
                      src={LessonPreviewImg}
                      alt={`${lesson.title} preview`}
                      className="block h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 items-start justify-between">
                  <CardTitle className="text-2xl sm:text-3xl">{lesson.title}</CardTitle>
                  {/* Conditional Badge */}
                  {lesson.isCompleted && (
                    <Badge variant="default">Completed</Badge>
                  )}
                </div>
                <CardDescription className="pt-1 text-sm sm:text-base">{lesson.summary}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Safe date formatting */}
                <span className="text-xs text-muted-foreground">Uploaded: {formatDate(lesson.createdAt)}</span>
                <Button
                  size="lg"
                  onClick={() => setSelectedSlug(lesson.slug)}
                  className="cursor-pointer w-full sm:w-auto"
                  variant={lesson.isCompleted ? 'secondary' : 'default'}
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  {lesson.isCompleted ? 'Re-take Lesson' : 'Start Lesson'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
      {/* Table of Contents Modal */}
      <Dialog open={!!selectedSlug} onOpenChange={(o) => { if (!o) setSelectedSlug(null); }}>
  <DialogContent className="w-[90vw] max-w-xl sm:w-auto">
          <DialogHeader>
            <DialogTitle>Web3 Foundations — Table of Contents</DialogTitle>
            <DialogDescription>
              A quick overview before you dive in.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 max-h-[60vh] overflow-auto pr-1">
            <h3 className="font-semibold">Content</h3>
            <ul className="list-disc pl-5 text-sm">
              <li>The Evolution of the Internet</li>
              <li>Welcome to Web3</li>
              <li>Blockchain Fundamentals</li>
              <li>Understanding Bitcoin</li>
              <li>Introducing Stacks</li>
              <li>Key Projects in the Stacks Ecosystem</li>
              <li>Web3 Tools & Infrastructure</li>
              <li>Career Opportunities in Web3</li>
              <li>Staying Safe in Web3</li>
              <li>Hands-On Activities</li>
              <li>The Bigger Picture</li>
              <li>Thank You & Next Steps</li>
            </ul>
          </div>
          <DialogFooter className="mt-4">
            <Button onClick={() => { if (selectedSlug) { const s = selectedSlug; setSelectedSlug(null); navigate(`/lesson/${s}`); } }} className="w-full">
              Continue to lesson page
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}