import { describe, it, expect } from 'vitest'
import { ObjectId } from 'mongodb'
import { planDigestImport, applyDigestImport } from '../../modules/library/services/importService.js'
import {
  PublishRefusedError,
  listConceptsForAdmin,
  listDigests,
  setConceptReviewed,
  setDigestVisibility,
} from '../../modules/library/services/adminLibraryService.js'

const concept = (key, overrides = {}) => ({
  key,
  chapter: 'Arrays',
  order: 0,
  title: key,
  summary: 's',
  why: 'w',
  detail: 'd',
  roles: ['beginner'],
  keep: true,
  ...overrides,
})

const importData = (keys) => ({
  source: { title: 'A Book' },
  promptVersion: 'v1',
  concepts: keys.map((k) => concept(k)),
})

// In-memory stand-ins for the two collections the services touch.
const fakeDb = ({ sources = [], concepts = [] } = {}) => {
  const calls = { libraryUpdates: [], conceptUpdates: [], inserted: [], bulk: null }
  const matches = (doc, filter) =>
    Object.entries(filter).every(([k, v]) => (v instanceof ObjectId ? String(doc[k]) === String(v) : doc[k] === v))

  const collections = {
    libraryResources: {
      findOne: async (filter) =>
        sources.find((s) => (filter._id ? String(s._id) === String(filter._id) : s.title === filter.title)) ?? null,
      find: (filter) => ({
        toArray: async () => sources.filter((s) => filter._id.$in.some((id) => String(id) === String(s._id))),
      }),
      insertOne: async (doc) => {
        const _id = new ObjectId()
        calls.inserted.push({ ...doc, _id })
        return { insertedId: _id }
      },
      updateOne: async (filter, update) => {
        calls.libraryUpdates.push({ filter, update })
        return { matchedCount: 1 }
      },
    },
    libraryConcepts: {
      find: (filter) => {
        const list = concepts.filter((c) => matches(c, filter))
        return { toArray: async () => list, sort: () => ({ toArray: async () => list }) }
      },
      aggregate: () => ({
        toArray: async () => {
          const groups = new Map()
          for (const c of concepts) {
            const g = groups.get(String(c.sourceId)) ?? { _id: c.sourceId, total: 0, reviewed: 0, kept: 0 }
            g.total += 1
            g.reviewed += c.reviewed ? 1 : 0
            g.kept += c.keep ? 1 : 0
            groups.set(String(c.sourceId), g)
          }
          return [...groups.values()]
        },
      }),
      countDocuments: async (filter) => concepts.filter((c) => matches(c, filter)).length,
      updateOne: async (filter, update) => {
        calls.conceptUpdates.push({ filter, update })
        return { matchedCount: concepts.filter((c) => matches(c, filter)).length }
      },
      bulkWrite: async (ops) => {
        calls.bulk = ops
        return { upsertedCount: ops.length, modifiedCount: 0 }
      },
    },
  }
  return { db: { collection: (name) => collections[name] }, calls }
}

describe('planDigestImport', () => {
  it('counts new, overwritten and kept concepts for an existing book', async () => {
    const sourceId = new ObjectId()
    const { db } = fakeDb({
      sources: [{ _id: sourceId, title: 'A Book' }],
      concepts: [{ sourceId, key: 'a' }],
    })
    const data = importData(['a', 'b', 'c'])
    data.concepts[2] = concept('c', { keep: false, dropReason: 'niche' })
    expect(await planDigestImport(db, data)).toEqual({
      sourceExists: true,
      total: 3,
      kept: 2,
      newCount: 2,
      overwrittenCount: 1,
    })
  })

  it('reports a missing book as to be created, with every concept new', async () => {
    const { db } = fakeDb()
    const plan = await planDigestImport(db, importData(['a', 'b']))
    expect(plan.sourceExists).toBe(false)
    expect(plan.newCount).toBe(2)
  })
})

describe('applyDigestImport', () => {
  it('creates the book when missing and writes concepts as unreviewed by default', async () => {
    const { db, calls } = fakeDb()
    await applyDigestImport(db, importData(['a']))
    expect(calls.inserted).toHaveLength(1)
    expect(calls.inserted[0].type).toBe('book')
    expect(calls.bulk[0].updateOne.update.$set.reviewed).toBe(false)
    expect(calls.bulk[0].updateOne.upsert).toBe(true)
  })

  it('writes reviewed: true only when asked', async () => {
    const { db, calls } = fakeDb({ sources: [{ _id: new ObjectId(), title: 'A Book' }] })
    await applyDigestImport(db, importData(['a']), { reviewed: true })
    expect(calls.inserted).toHaveLength(0)
    expect(calls.bulk[0].updateOne.update.$set.reviewed).toBe(true)
  })
})

describe('admin digest list', () => {
  it('treats a missing digestVisibility as admin-only and counts progress', async () => {
    const sourceId = new ObjectId()
    const { db } = fakeDb({
      sources: [{ _id: sourceId, title: 'A Book' }],
      concepts: [
        { sourceId, key: 'a', keep: true, reviewed: true },
        { sourceId, key: 'b', keep: false, reviewed: false },
      ],
    })
    const [digest] = await listDigests(db)
    expect(digest).toMatchObject({ title: 'A Book', digestVisibility: 'admin', total: 2, reviewed: 1, kept: 1 })
  })

  it('returns null concepts for an unknown library item', async () => {
    const { db } = fakeDb()
    expect(await listConceptsForAdmin(db, new ObjectId().toString())).toBeNull()
  })
})

describe('setConceptReviewed', () => {
  it('toggles reviewed and reports a missing concept', async () => {
    const sourceId = new ObjectId()
    const { db, calls } = fakeDb({ concepts: [{ sourceId, key: 'a' }] })
    expect(await setConceptReviewed(db, sourceId.toString(), 'a', true)).toBe(true)
    expect(calls.conceptUpdates[0].update.$set.reviewed).toBe(true)
    expect(await setConceptReviewed(db, sourceId.toString(), 'missing', true)).toBe(false)
  })
})

describe('setDigestVisibility', () => {
  it('refuses to publish while no kept concept is reviewed', async () => {
    const sourceId = new ObjectId()
    const { db, calls } = fakeDb({
      sources: [{ _id: sourceId, title: 'A Book' }],
      concepts: [
        { sourceId, key: 'a', keep: true, reviewed: false },
        { sourceId, key: 'b', keep: false, reviewed: true },
      ],
    })
    await expect(setDigestVisibility(db, sourceId.toString(), 'public')).rejects.toBeInstanceOf(PublishRefusedError)
    expect(calls.libraryUpdates).toHaveLength(0)
  })

  it('publishes once a kept concept is reviewed, and can always unpublish', async () => {
    const sourceId = new ObjectId()
    const { db, calls } = fakeDb({
      sources: [{ _id: sourceId, title: 'A Book' }],
      concepts: [{ sourceId, key: 'a', keep: true, reviewed: true }],
    })
    expect(await setDigestVisibility(db, sourceId.toString(), 'public')).toBe(true)
    expect(await setDigestVisibility(db, sourceId.toString(), 'admin')).toBe(true)
    expect(calls.libraryUpdates.map((u) => u.update.$set.digestVisibility)).toEqual(['public', 'admin'])
  })

  it('reports a missing library item', async () => {
    const { db } = fakeDb()
    expect(await setDigestVisibility(db, new ObjectId().toString(), 'admin')).toBe(false)
  })
})
