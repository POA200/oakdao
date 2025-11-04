// app/src/types/Lesson.ts (Verify this file is saved correctly!)

export interface QuizQuestion { // <-- MUST HAVE 'export'
  id: number;
  question: string;
  options: string[]; 
  correctAnswerIndex: number; 
}

export interface StaticLesson { // <-- MUST HAVE 'export'
  id: number;
  title: string;
  slug: string;
  summary: string;
  contentPath: string; 
  createdAt: string;
  quizJson: QuizQuestion[]; 
}

export interface LessonCardData extends Omit<StaticLesson, 'contentPath' | 'quizJson'> { // <-- MUST HAVE 'export'
  isCompleted: boolean; 
}