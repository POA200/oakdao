import { Request, Response } from 'express'
import * as lessonService from '../services/lessonService'
import * as aiService from '../services/aiService'

export async function createLesson(req: Request, res: Response) {
  try {
    const { title, description, content } = req.body
    // Save lesson (placeholder)
    const lesson = await lessonService.create({ title, description, content })

    // Trigger AI quiz generation (placeholder)
    const quiz = await aiService.generateQuizFromLesson(content || '')

    res.status(201).json({ lesson, quiz })
  } catch (err) {
    res.status(500).json({ error: 'Failed to create lesson' })
  }
}
