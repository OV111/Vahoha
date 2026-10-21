import { describe, it, expect } from 'vitest'
import {
  getResourcesService,
  getResourcesByLayerService,
} from '../../modules/library/services/libraryService.js'
import { isLayerId } from '../../utils/layerIds.js'

// A collection that records the filters the service builds.
const fakeDb = () => {
  const calls = { count: null, aggregate: null, find: null }
  const collection = {
    countDocuments: async (match) => {
      calls.count = match
      return 0
    },
    aggregate: (pipeline) => {
      calls.aggregate = pipeline
      return { toArray: async () => [] }
    },
    find: (filter) => {
      calls.find = filter
      return { sort: () => ({ toArray: async () => [] }) }
    },
  }
  return { db: { collection: () => collection }, calls }
}

describe('isLayerId', () => {
  it('accepts roadmap layer slugs', () => {
    expect(isLayerId('mern-2')).toBe(true)
    expect(isLayerId('api-dev-10')).toBe(true)
  })

  it('rejects operators, markup, uppercase, empty and non-strings', () => {
    for (const bad of [{ $ne: 1 }, ['mern-2'], '<script>', 'MERN-2', 'a b', '', null, undefined, 'x'.repeat(61)]) {
      expect(isLayerId(bad)).toBe(false)
    }
  })
})

describe('getResourcesService layer filter', () => {
  it('filters on the string layerIds field', async () => {
    const { db, calls } = fakeDb()
    await getResourcesService(db, { layer: 'mern-2' })
    expect(calls.count).toEqual({ layerIds: 'mern-2' })
  })

  it('ignores an invalid layer instead of querying with it', async () => {
    const { db, calls } = fakeDb()
    await getResourcesService(db, { layer: { $ne: 'x' } })
    expect(calls.count).toEqual({})
  })

  it('combines with the other filters', async () => {
    const { db, calls } = fakeDb()
    await getResourcesService(db, { layer: 'mern-2', type: 'book', difficulty: 'beginner' })
    expect(calls.count).toEqual({ layerIds: 'mern-2', type: { $in: ['book'] }, difficulty: 'beginner' })
  })
})

describe('getResourcesByLayerService', () => {
  it('looks resources up by the string layer id', async () => {
    const { db, calls } = fakeDb()
    await getResourcesByLayerService(db, 'mern-5')
    expect(calls.find).toEqual({ layerIds: 'mern-5' })
  })

  it('rejects an invalid layer id', async () => {
    const { db } = fakeDb()
    await expect(getResourcesByLayerService(db, '507f1f77bcf86cd799439011 ')).rejects.toThrow('Invalid layer id')
  })
})
