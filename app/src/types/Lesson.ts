
/**
 * Placeholder `Lesson` type.
 *
 * This file is intentionally minimal so frontend imports don't fail.
 * Extend fields to match your backend schema as needed.
 */
export interface Lesson {
	/** Unique identifier (string or UUID) */
	id: string
	/** Short title shown in lists/cards */
	title: string
	/** Short description / summary */
	description?: string
	/** Full lesson content (HTML/markdown/plain) */
	content?: string
	/** Optional tags */
	tags?: string[]
	/** ISO timestamp */
	createdAt?: string
}

export type { Lesson as ILesson } // named alias if some code expects different import styles
