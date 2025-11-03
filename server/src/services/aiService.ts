/**
 * Placeholder AI service. Replace with real integration (OpenAI, Gemini, etc.).
 */
export async function generateQuizFromLesson(content: string) {
  // Return a mocked quiz structure
  return {
    questions: [
      {
        id: 'q1',
        question: 'Placeholder question based on lesson content',
        choices: ['A', 'B', 'C', 'D'],
        answer: 0,
      },
    ],
    generatedAt: new Date().toISOString(),
    sourceLength: content.length,
  }
}

export default { generateQuizFromLesson }
