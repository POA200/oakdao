import express from 'express'
import dotenv from 'dotenv'
import apiRouter from './routes'

dotenv.config()

const app = express()
app.use(express.json())

app.use('/api', apiRouter)

const port = process.env.PORT || 4000
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on http://localhost:${port}`)
})

export default app
