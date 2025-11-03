import { Router } from 'express'
import * as lessonController from '../controllers/lessonController'
import * as adminController from '../controllers/adminController'
import adminAuth from '../middlewares/auth'

const router = Router()

router.get('/lessons', lessonController.getLessons)
router.get('/lesson/:id', lessonController.getLessonById)

// Protected admin route
router.post('/admin/lesson', adminAuth, adminController.createLesson)

export default router
