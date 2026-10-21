import { describe, it, expect } from 'vitest'
import { ObjectId } from 'mongodb'
import { executeTool, toolDefinitions } from '../../modules/ai-agent/services/agentTools.js'

// Records the filters the tool builds and returns canned rows.
const fakeDb = ({ resources = [], concepts = [] } = {}) => {
  const calls = { resourceFilter: null, conceptFilter: null, limit: null }
  const cursor = (rows, onFind) => ({
    find: (filter) => {
      onFind(filter)
      const chain = {
        project: () => chain,
        sort: () => chain,
        limit: (n) => {
          calls.limit = n
          return chain
        },
        toArray: async () => rows,
      }
      return chain
    },
  })
  const collections = {
    libraryResources: cursor(resources, (f) => (calls.resourceFilter = f)),
    libraryConcepts: cursor(concepts, (f) => (calls.conceptFilter = f)),
  }
  return { db: { collection: (name) => collections[name] }, calls }
}

const search = (args, db) => executeTool('search_library', args, { db })

describe('search_library tool', () => {
  it('declares an optional layer filter and asks the model to cite sources', () => {
    const def = toolDefinitions.find((t) => t.function.name === 'search_library').function
    expect(def.parameters.properties.layer).toBeDefined()
    expect(def.parameters.required).toBeUndefined()
    expect(def.description).toContain('Source: <title>')
  })

  it('filters by a valid layer id', async () => {
    const { db, calls } = fakeDb()
    await search({ layer: 'mern-2' }, db)
    expect(calls.resourceFilter).toEqual({ layerIds: 'mern-2' })
  })

  it('ignores an invalid layer and requires a keyword or layer', async () => {
    const { db, calls } = fakeDb()
    expect(await search({ layer: { $ne: 'x' } }, db)).toEqual({ error: 'keyword or layer is required' })
    expect(calls.resourceFilter).toBeNull()
  })

  it('combines keyword and layer, escapes the keyword and caps the limit', async () => {
    const { db, calls } = fakeDb()
    await search({ keyword: 'a.b', layer: 'mern-5', limit: 50 }, db)
    expect(calls.resourceFilter.layerIds).toBe('mern-5')
    expect(calls.resourceFilter.$or[0].title.$regex).toBe('a\\.b')
    expect(calls.limit).toBe(10)
  })

  it('returns ids and layer ids so the mentor can cite', async () => {
    const _id = new ObjectId()
    const { db } = fakeDb({ resources: [{ _id, title: 'Book', type: 'book', layerIds: ['mern-2'] }] })
    const [row] = await search({ keyword: 'book' }, db)
    expect(row._id).toBe(_id)
    expect(row.layerIds).toEqual(['mern-2'])
    expect(row.concepts).toEqual([])
  })

  it('only asks for reviewed, kept concepts of public digests', async () => {
    const publicId = new ObjectId()
    const adminId = new ObjectId()
    const { db, calls } = fakeDb({
      resources: [
        { _id: publicId, title: 'Public', digestVisibility: 'public' },
        { _id: adminId, title: 'Private' },
      ],
    })
    await search({ keyword: 'x' }, db)
    expect(calls.conceptFilter).toEqual({ sourceId: { $in: [publicId] }, reviewed: true, keep: true })
  })

  it('skips the concept query entirely when no result has a public digest', async () => {
    const { db, calls } = fakeDb({ resources: [{ _id: new ObjectId(), title: 'Private' }] })
    await search({ keyword: 'x' }, db)
    expect(calls.conceptFilter).toBeNull()
  })

  it('attaches at most three concepts per book and hides internal fields', async () => {
    const sourceId = new ObjectId()
    const concepts = ['a', 'b', 'c', 'd'].map((key) => ({ sourceId, key, title: key, summary: `about ${key}` }))
    const { db } = fakeDb({
      resources: [{ _id: sourceId, title: 'Book', digestVisibility: 'public' }],
      concepts,
    })
    const [row] = await search({ keyword: 'book' }, db)
    expect(row.concepts).toEqual([
      { key: 'a', title: 'a', summary: 'about a' },
      { key: 'b', title: 'b', summary: 'about b' },
      { key: 'c', title: 'c', summary: 'about c' },
    ])
    expect(row).not.toHaveProperty('digestVisibility')
  })
})
