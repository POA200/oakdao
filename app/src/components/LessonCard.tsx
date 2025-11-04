import type { StaticLesson } from '@/types/Lesson'

export default function LessonCard({ lesson }: { lesson: StaticLesson }) {
  return (
    <article className="p-4 border rounded-md">
      <h3 className="text-lg font-semibold">{lesson.title}</h3>
      <p className="text-sm text-muted-foreground">{lesson.summary}</p>
    </article>
  )
}
