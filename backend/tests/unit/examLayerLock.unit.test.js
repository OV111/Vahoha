import { describe, it, expect } from 'vitest'
import { ObjectId } from 'mongodb'
import { generateAttempt } from '../../modules/exams/services/examEngineService.js'

// Fake db with just the collections the lock check reads. Anything else the
// engine touches afterwards (attempt limits, question bank) is not reached when
// the layer is locked, and returns "no bank" (404) when it is not.
const fakeDb = ({ layers, progress }) => ({
  collection: (name) => {
    if (name === 'roadmap_layers') {
      return {
        findOne: async (q) =>
          layers.find((l) =>
            q.layerId ? l.layerId === q.layerId : l.trackId === q.trackId && l.order === q.order,
          ) ?? null,
        find: (q) => ({
          toArray: async () => layers.filter((l) => q.layerId.$in.includes(l.layerId)),
        }),
      }
    }
    if (name === 'userProgress') return { findOne: async () => progress }
    return { countDocuments: async () => 0, findOne: async () => null, createIndex: async () => 'ok', find: () => ({ toArray: async () => [] }) }
  },
})

const track = [
  { layerId: 't-1', trackId: 't', order: 1, title: 'One' },
  { layerId: 't-2', trackId: 't', order: 2, title: 'Two' },
  { layerId: 't-3', trackId: 't', order: 3, title: 'Three', requires: ['t-1', 't-2'] },
]
const userId = new ObjectId().toString()

describe('generateAttempt layer lock', () => {
  it('rejects a layer whose previous layer is not done (403)', async () => {
    const db = fakeDb({ layers: track, progress: { layerProgress: {} } })
    await expect(generateAttempt(db, userId, 'p', 't-2')).rejects.toMatchObject({ status: 403 })
  })

  it('names the layer you must pass first', async () => {
    const db = fakeDb({ layers: track, progress: null })
    await expect(generateAttempt(db, userId, 'p', 't-2')).rejects.toThrow(/One/)
  })

  it('requires every id in `requires`', async () => {
    const db = fakeDb({ layers: track, progress: { layerProgress: { 't-1': 'done' } } })
    await expect(generateAttempt(db, userId, 'p', 't-3')).rejects.toMatchObject({ status: 403 })
  })

  it('lets a first layer through to the next check (no bank -> 404, not 403)', async () => {
    const db = fakeDb({ layers: track, progress: null })
    await expect(generateAttempt(db, userId, 'p', 't-1')).rejects.toMatchObject({ status: 404 })
  })

  it('lets a layer through once its prerequisites are done', async () => {
    const db = fakeDb({ layers: track, progress: { layerProgress: { 't-1': 'done', 't-2': 'done' } } })
    await expect(generateAttempt(db, userId, 'p', 't-3')).rejects.toMatchObject({ status: 404 })
  })

  it('fails open for a layer the roadmap does not know', async () => {
    const db = fakeDb({ layers: [], progress: null })
    await expect(generateAttempt(db, userId, 'p', 'unseeded-9')).rejects.toMatchObject({ status: 404 })
  })
})
