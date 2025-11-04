import AppLayout from '@/components/layout/AppLayout'
import LessonCard from '@/components/LessonCard'

export default function Dashboard() {
  const lessons = [] as any[]
  return (
    <AppLayout>
      <h2 className="text-2xl font-semibold text-foreground/60">Courses Coming Soon</h2>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {lessons.map((l) => (
          <LessonCard key={l.id} lesson={l} />
        ))}
      </div>
    </AppLayout>
  )
}
