import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL || ''

const pool = new Pool({ connectionString })

export default pool
