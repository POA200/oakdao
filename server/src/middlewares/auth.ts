import { Request, Response, NextFunction } from 'express'

export default function adminAuth(req: Request, res: Response, next: NextFunction) {
  const key = process.env.ADMIN_SECRET || ''
  const header = (req.headers['x-admin-key'] as string) || req.header('Authorization') || ''
  // Very small placeholder check: match header exactly to ADMIN_SECRET
  if (!key || header !== key) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  return next()
}
