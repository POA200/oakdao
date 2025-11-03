import pool from '../db/postgres'

export async function findAll() {
  try {
    const { rows } = await pool.query('SELECT * FROM lessons LIMIT 100')
    return rows
  } catch (err) {
    // In placeholder mode, return empty array
    return []
  }
}

export async function findById(id: string) {
  try {
    const { rows } = await pool.query('SELECT * FROM lessons WHERE id = $1 LIMIT 1', [id])
    return rows[0] || null
  } catch (err) {
    return null
  }
}

export async function create(data: { title?: string; description?: string; content?: string }) {
  // Placeholder: in a real app insert into DB and return created row
  return {
    id: 'placeholder-id',
    title: data.title || 'Untitled',
    description: data.description || null,
    content: data.content || null,
    createdAt: new Date().toISOString(),
  }
}
