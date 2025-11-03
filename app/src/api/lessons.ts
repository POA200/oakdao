export async function fetchLessons() {
  const res = await fetch('/api/lessons')
  if (!res.ok) throw new Error('Failed to fetch lessons')
  return res.json()
}

export async function fetchLessonById(id: string) {
  const res = await fetch(`/api/lesson/${id}`)
  if (!res.ok) throw new Error('Failed to fetch lesson')
  return res.json()
}

export async function submitQuiz(lessonId: string, answers: any) {
  const res = await fetch(`/api/lesson/${lessonId}/quiz`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ answers }),
  })
  if (!res.ok) throw new Error('Failed to submit quiz')
  return res.json()
}
