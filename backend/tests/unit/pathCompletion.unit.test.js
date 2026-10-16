import { describe, it, expect, vi } from 'vitest'
import { ObjectId } from 'mongodb'
import { isPathComplete } from '../../modules/capstone/lib/pathCompletion.js'

// Tiny fake db: records the layer filter and returns canned rows.
const fakeDb = (layerIds, passed) => {
  const find = vi.fn(() => ({
    sort: () => ({ toArray: async () => layerIds.map((layerId) => ({ layerId })) }),
  }))
  const db = {
    collection: (name) =>
      name === 'roadmap_layers' ? { find } : { distinct: async () => passed },
  }
  return { db, find }
}

describe('isPathComplete', () => {
  const userId = new ObjectId().toString()

  it('only asks for required layers, so optional ones never block a capstone', async () => {
    const { db, find } = fakeDb(['t-1', 't-2'], ['t-1', 't-2'])
    const result = await isPathComplete(db, userId, 't')
    expect(find.mock.calls[0][0]).toEqual({ trackId: 't', required: { $ne: false } })
    expect(result).toMatchObject({ complete: true, passed: 2, total: 2 })
  })

  it('reports missing required layers in order', async () => {
    const { db } = fakeDb(['t-1', 't-2', 't-3'], ['t-2'])
    const result = await isPathComplete(db, userId, 't')
    expect(result).toMatchObject({ complete: false, passed: 1, total: 3, missing: ['t-1', 't-3'] })
  })
})
