import { describe, it, expect } from 'vitest'
import { ObjectId } from 'mongodb'
import { conceptInputSchema, digestImportSchema } from '../../modules/library/schemas/digest.schemas.js'
import { getDigestService, setConceptKnownService } from '../../modules/library/services/digestService.js'

const concept = (overrides = {}) => ({
  key: 'array-types',
  chapter: 'Arrays',
  order: 0,
  title: 'Typing an array',
  summary: 'Put [] after the element type.',
  why: 'Every list is an array.',
  detail: 'More detail.',
  roles: ['beginner'],
  keep: true,
  ...overrides,
})

const source = {
  title: 'A Book',
  author: 'An Author',
  description: 'About the book.',
  url: 'https://example.com/book',
  is_free: false,
  difficulty: 'beginner',
  paths: ['Frontend Developer'],
  topics: ['typescript'],
  layerIds: ['frontend-dev-6'],
}

describe('conceptInputSchema', () => {
  it('accepts a complete concept', () => {
    expect(conceptInputSchema.safeParse(concept()).success).toBe(true)
  })

  it('requires a dropReason when a concept is dropped', () => {
    expect(conceptInputSchema.safeParse(concept({ keep: false })).success).toBe(false)
    expect(conceptInputSchema.safeParse(concept({ keep: false, dropReason: 'Rarely matters' })).success).toBe(true)
  })

  it('rejects unknown roles, bad keys and oversize text', () => {
    expect(conceptInputSchema.safeParse(concept({ roles: ['wizard'] })).success).toBe(false)
    expect(conceptInputSchema.safeParse(concept({ key: 'Not A Slug' })).success).toBe(false)
    expect(conceptInputSchema.safeParse(concept({ summary: 'x'.repeat(501) })).success).toBe(false)
  })
})

describe('digestImportSchema', () => {
  it('rejects duplicate concept keys', () => {
    const file = { source, promptVersion: 'v1', concepts: [concept(), concept()] }
    expect(digestImportSchema.safeParse(file).success).toBe(false)
  })

  it('rejects a layer id that is not a roadmap slug', () => {
    const file = { source: { ...source, layerIds: ['Bad Layer'] }, promptVersion: 'v1', concepts: [concept()] }
    expect(digestImportSchema.safeParse(file).success).toBe(false)
  })
})

// In-memory db covering only what the digest service calls.
const fakeDb = ({ role = 'user', digestVisibility, concepts = [], known = [] } = {}) => {
  const sourceId = new ObjectId()
  const states = [...known]
  const collections = {
    users: { findOne: async () => ({ role }) },
    libraryResources: { findOne: async () => ({ _id: sourceId, digestVisibility }) },
    libraryConcepts: {
      find: (filter) => ({
        sort: () => ({
          toArray: async () =>
            concepts.filter((c) => filter.reviewed === undefined || c.reviewed === filter.reviewed),
        }),
      }),
      findOne: async (filter) => concepts.find((c) => c.key === filter.key) ?? null,
    },
    libraryConceptChecks: { find: () => ({ toArray: async () => [] }) },
    libraryConceptStates: {
      find: () => ({ toArray: async () => states.map((conceptKey) => ({ conceptKey })) }),
      updateOne: async (filter) => {
        if (!states.includes(filter.conceptKey)) states.push(filter.conceptKey)
      },
      deleteOne: async (filter) => {
        const i = states.indexOf(filter.conceptKey)
        if (i >= 0) states.splice(i, 1)
      },
    },
  }
  return { db: { collection: (name) => collections[name] }, states, sourceId }
}

const doc = (key, reviewed) => ({ ...concept({ key }), reviewed, sourceId: 'x', promptVersion: 'v1' })
const userId = new ObjectId().toString()

describe('getDigestService visibility', () => {
  it('hides a digest from non-admins until its source is public', async () => {
    const { db, sourceId } = fakeDb({ concepts: [doc('a', true)] })
    expect(await getDigestService(db, sourceId.toString(), userId)).toBeNull()
  })

  it('shows an admin every concept, reviewed or not, on a non-public digest', async () => {
    const { db, sourceId } = fakeDb({ role: 'admin', concepts: [doc('a', true), doc('b', false)] })
    const result = await getDigestService(db, sourceId.toString(), userId)
    expect(result.visibility).toBe('admin')
    expect(result.concepts.map((c) => c.id)).toEqual(['a', 'b'])
  })

  it('shows non-admins only reviewed concepts once the source is public', async () => {
    const { db, sourceId } = fakeDb({ digestVisibility: 'public', concepts: [doc('a', true), doc('b', false)] })
    const result = await getDigestService(db, sourceId.toString(), userId)
    expect(result.concepts.map((c) => c.id)).toEqual(['a'])
  })

  it('does not leak server-side fields and returns the learner\'s known concepts', async () => {
    const { db, sourceId } = fakeDb({ digestVisibility: 'public', concepts: [doc('a', true)], known: ['a'] })
    const result = await getDigestService(db, sourceId.toString(), userId)
    expect(result.concepts[0]).not.toHaveProperty('sourceId')
    expect(result.concepts[0]).not.toHaveProperty('promptVersion')
    expect(result.known).toEqual(['a'])
  })

  it('returns null when the book has no concepts', async () => {
    const { db, sourceId } = fakeDb({ role: 'admin', concepts: [] })
    expect(await getDigestService(db, sourceId.toString(), userId)).toBeNull()
  })
})

describe('setConceptKnownService', () => {
  it('marks and unmarks a concept', async () => {
    const { db, states, sourceId } = fakeDb({ digestVisibility: 'public', concepts: [doc('a', true)] })
    await setConceptKnownService(db, sourceId.toString(), 'a', userId, true)
    expect(states).toEqual(['a'])
    await setConceptKnownService(db, sourceId.toString(), 'a', userId, false)
    expect(states).toEqual([])
  })

  it('refuses an unknown concept and a digest the user cannot see', async () => {
    const visible = fakeDb({ digestVisibility: 'public', concepts: [doc('a', true)] })
    expect(await setConceptKnownService(visible.db, visible.sourceId.toString(), 'nope', userId, true)).toBeNull()
    const hidden = fakeDb({ concepts: [doc('a', true)] })
    expect(await setConceptKnownService(hidden.db, hidden.sourceId.toString(), 'a', userId, true)).toBeNull()
    expect(hidden.states).toEqual([])
  })
})
