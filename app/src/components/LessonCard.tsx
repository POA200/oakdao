import type { Lesson } from '@/types/Lesson'

export default function LessonCard({ lesson }: { lesson: Lesson }) {
  return (
    <article className="p-4 border rounded-md">
      <h3 className="text-lg font-semibold">{lesson.title}</h3>
      <p className="text-sm text-muted-foreground">{lesson.description}</p>
    </article>
  )
}
