import { Request, Response } from 'express'
import * as lessonService from '../services/lessonService'

export async function getLessons(_req: Request, res: Response) {
  try {
    const lessons = await lessonService.findAll()
    res.json(lessons)
  } catch (err) {
    res.status(500).json({ error: 'Failed to load lessons' })
  }
}

export async function getLessonById(req: Request, res: Response) {
  try {
    const { id } = req.params
    const lesson = await lessonService.findById(id)
    if (!lesson) return res.status(404).json({ error: 'Not found' })
    res.json(lesson)
  } catch (err) {
    res.status(500).json({ error: 'Failed to load lesson' })
  }
}
