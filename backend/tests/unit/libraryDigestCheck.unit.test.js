import { describe, it, expect } from 'vitest'
import { ObjectId } from 'mongodb'
import { conceptInputSchema, checkBodySchema } from '../../modules/library/schemas/digest.schemas.js'
import { getDigestService } from '../../modules/library/services/digestService.js'
import { submitConceptCheckService } from '../../modules/library/services/checkService.js'

const check = { question: 'What is number[][]?', options: ['A grid', 'A tuple', 'A string'], answerIndex: 0, explanation: 'Each [] adds a level.' }

const concept = (overrides = {}) => ({
  key: 'multi',
  chapter: 'Arrays',
  order: 0,
  title: 'Arrays of arrays',
  summary: 'Each level adds [].',
  why: 'Grids.',
  detail: 'Detail.',
  roles: ['beginner'],
  keep: true,
  check,
  ...overrides,
})

// In-memory db for the digest + check services. Any collection not listed
// (XP ledger, mastery, layer progress, exams) throws if touched.
const fakeDb = ({ role = 'user', digestVisibility = 'public', concepts = [] } = {}) => {
  const sourceId = new ObjectId()
  const checks = new Map() // conceptKey -> row
  const touched = new Set()
  const collections = {
    users: { findOne: async () => ({ role }) },
    libraryResources: { findOne: async () => ({ _id: sourceId, digestVisibility }) },
    libraryConcepts: {
      find: () => ({ sort: () => ({ toArray: async () => concepts }) }),
      findOne: async (filter) =>
        concepts.find((c) => c.key === filter.key && (filter.reviewed === undefined || c.reviewed === filter.reviewed)) ?? null,
    },
    libraryConceptStates: { find: () => ({ toArray: async () => [] }) },
    libraryConceptChecks: {
      find: (filter) => ({
        toArray: async () =>
          [...checks.entries()]
            .filter(([, row]) => filter.everCorrect === undefined || row.everCorrect === filter.everCorrect)
            .map(([conceptKey]) => ({ conceptKey })),
      }),
      updateOne: async (filter, update) => {
        const row = checks.get(filter.conceptKey) ?? { ...update.$setOnInsert, attempts: 0 }
        Object.assign(row, update.$set)
        row.attempts += update.$inc.attempts
        checks.set(filter.conceptKey, row)
      },
    },
  }
  const db = {
    collection: (name) => {
      touched.add(name)
      if (!collections[name]) throw new Error(`unexpected collection: ${name}`)
      return collections[name]
    },
  }
  return { db, checks, touched, sourceId: sourceId.toString() }
}

const userId = new ObjectId().toString()
const reviewed = (c) => ({ ...c, reviewed: true })

describe('check schema', () => {
  it('accepts a concept with a valid check', () => {
    expect(conceptInputSchema.safeParse(concept()).success).toBe(true)
  })

  it('rejects an answerIndex outside the options', () => {
    expect(conceptInputSchema.safeParse(concept({ check: { ...check, answerIndex: 3 } })).success).toBe(false)
  })

  it('needs 2 to 4 options', () => {
    expect(conceptInputSchema.safeParse(concept({ check: { ...check, options: ['only'] } })).success).toBe(false)
    expect(conceptInputSchema.safeParse(concept({ check: { ...check, options: ['a', 'b', 'c', 'd', 'e'] } })).success).toBe(false)
  })

  it('validates the answer body', () => {
    expect(checkBodySchema.safeParse({ answerIndex: 1 }).success).toBe(true)
    expect(checkBodySchema.safeParse({ answerIndex: -1 }).success).toBe(false)
    expect(checkBodySchema.safeParse({ answerIndex: '1' }).success).toBe(false)
  })
})

describe('digest payload', () => {
  it('never sends the answer or explanation to the client', async () => {
    const { db, sourceId } = fakeDb({ concepts: [reviewed(concept())] })
    const result = await getDigestService(db, sourceId, userId)
    expect(result.concepts[0].check).toEqual({ question: check.question, options: check.options })
    expect(JSON.stringify(result)).not.toContain('answerIndex')
    expect(JSON.stringify(result)).not.toContain(check.explanation)
  })

  it('lists the concepts this learner has answered correctly', async () => {
    const { db, sourceId } = fakeDb({ concepts: [reviewed(concept())] })
    await submitConceptCheckService(db, sourceId, 'multi', userId, 0)
    const result = await getDigestService(db, sourceId, userId)
    expect(result.checked).toEqual(['multi'])
  })
})

describe('submitConceptCheckService', () => {
  it('grades a right answer and returns the explanation', async () => {
    const { db, sourceId, checks } = fakeDb({ concepts: [reviewed(concept())] })
    const result = await submitConceptCheckService(db, sourceId, 'multi', userId, 0)
    expect(result).toEqual({ correct: true, answerIndex: 0, explanation: check.explanation })
    expect(checks.get('multi')).toMatchObject({ lastCorrect: true, everCorrect: true, attempts: 1 })
  })

  it('grades a wrong answer and still reveals the right one', async () => {
    const { db, sourceId, checks } = fakeDb({ concepts: [reviewed(concept())] })
    const result = await submitConceptCheckService(db, sourceId, 'multi', userId, 2)
    expect(result.correct).toBe(false)
    expect(result.answerIndex).toBe(0)
    expect(checks.get('multi')).toMatchObject({ lastCorrect: false, everCorrect: false, attempts: 1 })
  })

  it('keeps everCorrect once earned, even after a later wrong answer', async () => {
    const { db, sourceId, checks } = fakeDb({ concepts: [reviewed(concept())] })
    await submitConceptCheckService(db, sourceId, 'multi', userId, 0)
    await submitConceptCheckService(db, sourceId, 'multi', userId, 1)
    expect(checks.get('multi')).toMatchObject({ lastCorrect: false, everCorrect: true, attempts: 2 })
  })

  it('returns null for a digest the user cannot see', async () => {
    const { db, sourceId, checks } = fakeDb({ digestVisibility: 'admin', concepts: [reviewed(concept())] })
    expect(await submitConceptCheckService(db, sourceId, 'multi', userId, 0)).toBeNull()
    expect(checks.size).toBe(0)
  })

  it('returns null for an unreviewed concept on a public digest, and for one without a check', async () => {
    const unreviewed = fakeDb({ concepts: [concept({ reviewed: false })] })
    expect(await submitConceptCheckService(unreviewed.db, unreviewed.sourceId, 'multi', userId, 0)).toBeNull()
    const noCheck = fakeDb({ concepts: [reviewed(concept({ check: undefined }))] })
    expect(await submitConceptCheckService(noCheck.db, noCheck.sourceId, 'multi', userId, 0)).toBeNull()
  })

  it('only touches library collections: no XP, mastery, progress or exams', async () => {
    const { db, sourceId, touched } = fakeDb({ concepts: [reviewed(concept())] })
    await submitConceptCheckService(db, sourceId, 'multi', userId, 0)
    expect([...touched].sort()).toEqual(['libraryConceptChecks', 'libraryConcepts', 'libraryResources', 'users'])
  })
})
